# TASK: Add favicon for ПРО Спокойствие

Project:
Next.js 14 App Router website for clinic ПРО Спокойствие.

Working folder:
/Users/glebkoroteev/projects/Глеб (Проспокойствие)/pro-spokoystvie-release-work/pro-spokoystvie-site-prod-20260704_015914

Current branch:
main

## Goal

Add a real favicon so browser tabs no longer show the default/empty icon.

Production issue:
https://pro-spokoystvie.ru currently shows no custom favicon in the browser tab.

## Brand assets

Inspect existing logo assets first:

- public/assets/logo/pro-spokoystvie-logo.svg

Use the real ПРО Спокойствие logo/brand style.

Do not invent a new unrelated icon.

## Requirements

1. Add favicon using the existing clinic logo/brand asset.
2. Prefer a compact logo mark suitable for a browser tab, not the full wide wordmark.
3. If the SVG logo contains a separate mark, reuse/extract that mark.
4. Add proper Next.js App Router favicon integration.
5. Prefer:
   - public/favicon.svg
   - app/icon.svg if appropriate
   - app/apple-icon.png only if it can be generated reliably
6. Update app/layout.tsx metadata.icons if the current project pattern requires it.
7. Do not change homepage content.
8. Do not change forms.
9. Do not change /analizy.
10. Do not change sitemap.
11. Do not change server/nginx/deploy files.
12. Do not add heavy dependencies.

## Validation

Run:

npm run typecheck
npm run lint
npm run build

## Manual verification

After local dev start, check:

http://localhost:3000/
http://localhost:3000/analizy

The browser tab should show the ПРО Спокойствие favicon after hard refresh.

Browser cache note:
Favicon can be cached aggressively. Use hard refresh, incognito, or direct open:

http://localhost:3000/favicon.svg

## Do not

- Do not commit.
- Do not push.
- Do not rewrite unrelated files.

## Final report

Report:
- files changed
- favicon files created
- whether app/layout.tsx was changed
- validation results
- how to verify in browser
