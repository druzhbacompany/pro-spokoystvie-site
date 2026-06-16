import { NextResponse } from "next/server";

/**
 * Lead intake endpoint for booking forms.
 *
 * Day-1: validates + logs the lead server-side and returns success, so the
 * form never silently does nothing. No real delivery channel is wired yet.
 *
 * TODO(owner): connect a real delivery channel before production launch:
 *   - Telegram: POST to https://api.telegram.org/bot<TOKEN>/sendMessage
 *     (env: TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID)
 *   - or email (e.g. Resend / SMTP) — env: LEAD_EMAIL_TO
 *   Until then leads are only written to server logs (NOT persisted).
 */

type LeadPayload = {
  name?: string;
  phone?: string;
  time?: string;
  doctor?: string;
  topic?: string;
  consent?: boolean;
  company?: string; // honeypot
};

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

  // Day-1 delivery: server log only. Replace with Telegram/email (see TODO above).
  console.info("[LEAD]", {
    name,
    phone,
    time: body.time ?? null,
    doctor: body.doctor ?? null,
    topic: body.topic ?? null,
    receivedAt: new Date().toISOString(),
  });

  return NextResponse.json({ ok: true });
}
