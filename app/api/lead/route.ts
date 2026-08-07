import { NextResponse } from "next/server";

/**
 * Lead intake endpoint for booking forms.
 *
 * Delivery channels, in order:
 *   1. SMTP  — when SMTP_HOST is set (SMTP_PORT / SMTP_SECURE / SMTP_USER / SMTP_PASS).
 *   2. Resend — when RESEND_API_KEY is set.
 * Recipient/sender: LEAD_EMAIL_TO / LEAD_EMAIL_FROM.
 *
 * If no channel is configured the endpoint answers 503 instead of pretending
 * success: a lead that nobody receives must not look delivered to the patient.
 *
 * Logging rule (152-ФЗ): personal data never reaches stdout/PM2 logs. Full lead
 * details exist only inside the email body, which is the intended channel.
 * Logs carry event, delivery status, masked phone and non-sensitive context.
 */

export const runtime = "nodejs";

const EMAIL_SUBJECT = "Новая заявка с сайта ПРО Спокойствие";
const SMTP_TIMEOUT_MS = 10_000;

type LeadPayload = {
  name?: string;
  phone?: string;
  time?: string;
  doctor?: string;
  topic?: string;
  direction?: string;
  consent?: boolean;
  consentSpecial?: boolean;
  consentMarketing?: boolean;
  company?: string; // honeypot
  // conversion context
  pageUrl?: string;
  pageTitle?: string;
  sourceBlock?: string;
  priceItem?: string;
  price?: string;
  ctaLabel?: string;
  branch?: string;
  branchAddress?: string;
};

const TIME_LABELS: Record<string, string> = {
  morning: "Утро 08:00–12:00",
  day: "День 12:00–16:00",
  evening: "Вечер 16:00–20:00",
};

/** Ordered, human-labelled field list. Email-only — never logged. */
function leadFields(body: LeadPayload, receivedAt: string): [string, string][] {
  return [
    ["Имя", body.name?.trim() || "—"],
    ["Телефон", body.phone?.trim() || "—"],
    ["Удобное время", (body.time && TIME_LABELS[body.time]) || body.time || "—"],
    ["Направление", body.direction || "—"],
    ["Услуга / тема", body.topic || "—"],
    ["Врач", body.doctor || "—"],
    ["Филиал", body.branch || "—"],
    ["Адрес филиала", body.branchAddress || "—"],
    ["Позиция прайса", body.priceItem || "—"],
    ["Цена", body.price || "—"],
    ["Страница", body.pageUrl || "—"],
    ["Заголовок страницы", body.pageTitle || "—"],
    ["Блок-источник", body.sourceBlock || "—"],
    ["CTA-кнопка", body.ctaLabel || "—"],
    ["Согласие на обработку ПДн", body.consent ? "да" : "нет"],
    ["Согласие на сведения о здоровье", body.consentSpecial ? "да" : "нет"],
    ["Согласие на рассылку", body.consentMarketing ? "да" : "нет"],
    ["Дата/время заявки", receivedAt],
  ];
}

const escapeHtml = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

/** +7******1234 — enough to match a call-back, not enough to identify a person. */
function maskPhone(raw: string): string {
  const digits = raw.replace(/\D/g, "");
  if (digits.length < 4) return "***";
  const ru = digits.length === 11 && (digits[0] === "7" || digits[0] === "8");
  return `${ru ? "+7" : ""}******${digits.slice(-4)}`;
}

/** Collapses client-supplied context into a single safe log token (no CRLF injection). */
function logToken(value: string | undefined, max = 64): string | undefined {
  if (!value) return undefined;
  const cleaned = value.replace(/\s+/g, "_").replace(/[^\w\-./:а-яёА-ЯЁ]/gu, "");
  return cleaned ? cleaned.slice(0, max) : undefined;
}

/** Technical failure signature only — never the error message, which may echo input. */
function failureCode(err: unknown): string {
  if (err && typeof err === "object") {
    const e = err as { code?: unknown; responseCode?: unknown; name?: unknown };
    const bits = [e.code, e.responseCode, e.name].filter(
      (v): v is string | number => typeof v === "string" || typeof v === "number",
    );
    if (bits.length) return logToken(bits.join("/")) ?? "unknown";
  }
  return "unknown";
}

function logLead(event: string, data: Record<string, string | undefined>) {
  const parts = Object.entries(data)
    .filter((entry): entry is [string, string] => Boolean(entry[1]))
    .map(([k, v]) => `${k}=${v}`);
  console.info(`[lead] event=${event} ${parts.join(" ")}`.trim());
}

type SmtpConfig = {
  host: string;
  port: number;
  secure: boolean;
  auth?: { user: string; pass: string };
};

/**
 * Read at request time, not module scope, so PM2 env changes apply on restart
 * without a rebuild.
 */
function readSmtpConfig(): SmtpConfig | null {
  const host = process.env.SMTP_HOST?.trim();
  if (!host) return null;

  const port = Number.parseInt(process.env.SMTP_PORT ?? "", 10) || 587;
  const secureRaw = process.env.SMTP_SECURE?.trim().toLowerCase();
  const secure = secureRaw ? secureRaw === "true" || secureRaw === "1" : port === 465;

  const user = process.env.SMTP_USER?.trim();
  const pass = process.env.SMTP_PASS;

  return { host, port, secure, auth: user && pass ? { user, pass } : undefined };
}

type Mail = { to: string; from: string; subject: string; text: string; html: string };

async function sendViaSmtp(cfg: SmtpConfig, mail: Mail): Promise<void> {
  const { createTransport } = await import("nodemailer");
  const transport = createTransport({
    host: cfg.host,
    port: cfg.port,
    secure: cfg.secure,
    auth: cfg.auth,
    connectionTimeout: SMTP_TIMEOUT_MS,
    greetingTimeout: SMTP_TIMEOUT_MS,
    socketTimeout: SMTP_TIMEOUT_MS,
  });
  try {
    await transport.sendMail(mail);
  } finally {
    transport.close();
  }
}

async function sendViaResend(apiKey: string, mail: Mail): Promise<void> {
  const { Resend } = await import("resend");
  const { error } = await new Resend(apiKey).emails.send(mail);
  if (error) throw error;
}

export async function POST(request: Request) {
  let body: LeadPayload;
  try {
    body = (await request.json()) as LeadPayload;
  } catch {
    return NextResponse.json({ ok: false, error: "bad_request" }, { status: 400 });
  }

  // Honeypot: silently accept bots without processing.
  if (body.company && body.company.length > 0) {
    return NextResponse.json({ ok: true });
  }

  const name = body.name?.trim();
  const phone = body.phone?.trim();
  if (!name || !phone) {
    return NextResponse.json({ ok: false, error: "name_phone_required" }, { status: 422 });
  }
  if (!body.consent) {
    return NextResponse.json({ ok: false, error: "consent_required" }, { status: 422 });
  }

  const receivedAt = new Date().toISOString();
  // Safe log context, reused for every outcome of this request.
  const ctx = {
    at: receivedAt,
    phone: maskPhone(phone),
    sourceBlock: logToken(body.sourceBlock),
    page: logToken(body.pageUrl?.split("?")[0], 120),
  };

  const smtp = readSmtpConfig();
  const resendKey = process.env.RESEND_API_KEY?.trim();
  if (!smtp && !resendKey) {
    logLead("rejected", { ...ctx, reason: "delivery_not_configured" });
    return NextResponse.json(
      { ok: false, error: "delivery_not_configured" },
      { status: 503 },
    );
  }

  const fields = leadFields(body, receivedAt);
  const mail: Mail = {
    to: process.env.LEAD_EMAIL_TO?.trim() || "info@pro-spokoystvie.ru",
    from: process.env.LEAD_EMAIL_FROM?.trim() || "noreply@pro-spokoystvie.ru",
    subject: EMAIL_SUBJECT,
    text: fields.map(([k, v]) => `${k}: ${v}`).join("\n"),
    html:
      `<h2>${escapeHtml(EMAIL_SUBJECT)}</h2><table cellpadding="6" style="border-collapse:collapse;font-family:Arial,sans-serif;font-size:14px">` +
      fields
        .map(
          ([k, v]) =>
            `<tr><td style="color:#6b7280">${escapeHtml(k)}</td><td><strong>${escapeHtml(v)}</strong></td></tr>`,
        )
        .join("") +
      `</table>`,
  };

  const channel = smtp ? "smtp" : "resend";
  try {
    if (smtp) await sendViaSmtp(smtp, mail);
    else if (resendKey) await sendViaResend(resendKey, mail);
    // Guarded above; never report success we cannot back with a real send.
    else throw new Error("no_channel");
  } catch (err) {
    logLead("delivery_failed", { ...ctx, channel, reason: failureCode(err) });
    return NextResponse.json({ ok: false, error: "delivery_failed" }, { status: 502 });
  }

  logLead("delivered", { ...ctx, channel });
  return NextResponse.json({ ok: true });
}
