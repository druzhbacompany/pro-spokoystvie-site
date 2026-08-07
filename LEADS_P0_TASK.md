# TASK: P0 safe lead delivery for ПРО Спокойствие

Project:
Next.js 14 App Router website for clinic ПРО Спокойствие.

Working folder:
/Users/glebkoroteev/projects/Глеб (Проспокойствие)/pro-spokoystvie-release-work/pro-spokoystvie-site-prod-20260704_015914

Current branch:
main

## Problem

The current lead form route app/api/lead/route.ts works in log-only mode when no delivery API key is configured.

Current behavior risk:
- Personal data from submitted lead forms can be printed into PM2 logs.
- Leads can appear successful to users while no email/CRM delivery is configured.

This must be fixed urgently.

## Goal

Make lead handling safer and production-ready for email delivery.

## Requirements

1. Inspect current app/api/lead/route.ts and existing form behavior.
2. Do NOT change frontend form design unless strictly necessary.
3. Remove logging of personal data:
   - no full names in logs
   - no full phone numbers in logs
   - no raw request body in logs
   - no detailed lead text in logs
4. Keep only safe technical logs:
   - event type
   - timestamp
   - sourceBlock/page if non-sensitive
   - masked phone if needed, for example +7******1234
   - delivery status
5. Add SMTP email delivery support using environment variables.

Use env names:

SMTP_HOST
SMTP_PORT
SMTP_SECURE
SMTP_USER
SMTP_PASS
LEAD_EMAIL_TO
LEAD_EMAIL_FROM

6. Email content may contain the full lead details, because email is the intended delivery channel.
7. If SMTP is not configured, return a server error response instead of pretending success.
8. The user-facing response should be safe and simple:
   - success when email was sent
   - error when delivery is not configured or failed
9. Do not connect MedLock in this task.
10. Do not use Resend unless already installed and clearly used; this task should support SMTP.
11. Avoid adding heavy dependencies. If SMTP requires a dependency, prefer nodemailer.
12. Do not commit.
13. Do not push.

## Validation

Run:

npm run typecheck
npm run lint
npm run build

## Manual checks

After implementation, verify:
- no personal data is printed to console/logs when SMTP is missing;
- API returns non-OK when SMTP is missing;
- build passes;
- route still accepts the existing form payload shape;
- frontend does not break.

## Important

Do not put real SMTP passwords into code.
Do not create .env with secrets committed to git.
If a local example is needed, create or update .env.example only with placeholder values.

## Final report

Report:
- files changed
- what changed in app/api/lead/route.ts
- whether a dependency was added
- what env variables are required on the server
- how to test safely
- what checks passed
