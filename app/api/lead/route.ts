import { NextResponse } from "next/server";

/**
 * Lead intake endpoint for booking forms.
 *
 * Delivery: email via Resend when RESEND_API_KEY is set.
 *   - recipient: LEAD_EMAIL_TO   (fallback info@pro-spokoystvie.ru)
 *   - sender:    LEAD_EMAIL_FROM (fallback noreply@pro-spokoystvie.ru)
 * Before credentials/domain mail are connected, the lead is logged
 * server-side and the endpoint returns { ok: true, mode: "log-only" }
 * so forms never fail. See docs/project-memory/EMAIL_LEADS_SETUP.md.
 */

const LEAD_EMAIL_TO = process.env.LEAD_EMAIL_TO || "info@pro-spokoystvie.ru";
const LEAD_EMAIL_FROM = process.env.LEAD_EMAIL_FROM || "noreply@pro-spokoystvie.ru";
const EMAIL_SUBJECT = "Новая заявка с сайта ПРО Спокойствие";

type LeadPayload = {
  name?: string;
  phone?: string;
  time?: string;
  doctor?: string;
  topic?: string;
  direction?: string;
  consent?: boolean;
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

/** Ordered, human-labelled field list for email + logs. */
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
    ["Дата/время заявки", receivedAt],
  ];
}

const escapeHtml = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

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
  const fields = leadFields(body, receivedAt);
  const text = fields.map(([k, v]) => `${k}: ${v}`).join("\n");

  // No credentials yet → safe fallback: log only, never fail the form.
  if (!process.env.RESEND_API_KEY) {
    console.info("[LEAD log-only]\n" + text);
    return NextResponse.json({ ok: true, mode: "log-only" });
  }

  // Send via Resend.
  try {
    const { Resend } = await import("resend");
    const resend = new Resend(process.env.RESEND_API_KEY);
    const html =
      `<h2>${escapeHtml(EMAIL_SUBJECT)}</h2><table cellpadding="6" style="border-collapse:collapse;font-family:Arial,sans-serif;font-size:14px">` +
      fields
        .map(
          ([k, v]) =>
            `<tr><td style="color:#6b7280">${escapeHtml(k)}</td><td><strong>${escapeHtml(v)}</strong></td></tr>`,
        )
        .join("") +
      `</table>`;

    const { error } = await resend.emails.send({
      from: LEAD_EMAIL_FROM,
      to: LEAD_EMAIL_TO,
      subject: EMAIL_SUBJECT,
      text,
      html,
    });

    if (error) {
      console.error("[LEAD email error]", error, "\n" + text);
      // Don't fail the user's form; lead is preserved in logs.
      return NextResponse.json({ ok: true, mode: "email-failed-logged" });
    }
    return NextResponse.json({ ok: true, mode: "email" });
  } catch (err) {
    console.error("[LEAD email exception]", err, "\n" + text);
    return NextResponse.json({ ok: true, mode: "email-failed-logged" });
  }
}
