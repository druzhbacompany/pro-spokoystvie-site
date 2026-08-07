# TASK: Legacy routes only — redirect old homepage versions

Project: PRO Спокойствие site, Next.js 14 App Router.
Branch: `main`.

## Main rule

This task is ONLY about closing legacy homepage routes.

Do not do any broad cleanup. Do not touch price lists, services, doctors, mail, leads, analyses, or content that is not directly required for redirects.

## Current safe baseline

Current good commit before this task:

`284c855 Clean risk wording on live pages`

The previous broad attempt was reverted. Do not recreate it.

## Absolute forbidden areas

Do NOT touch these files/areas:

- `app/tseny/page.tsx`
- `components/smt/PriceTable.tsx`
- any `PRICELIST` / `PUBLIC_PRICELIST` logic
- price names, price groups, DOCX price link, `public/documents/*`
- `lib/data.ts`, except if you only need to verify that legacy links are not in navigation. Prefer no changes to `lib/data.ts`.
- doctor education/specialties, including Khudashov
- `app/api/lead/route.ts`
- `package.json`
- `package-lock.json`
- `.env.example`
- `public/assets/doctors/*`
- `/analizy` implementation/data: `app/analizy`, `components/analizy`, `lib/analyses*`, Helix data
- server/nginx/deploy files

## Goal

Close these legacy routes so old homepage versions are not publicly served:

- `/old-home`
- `/hero-v2`
- `/hero-v3`
- `/hero-v4`

Preferred implementation:

- Add permanent redirects in `next.config.mjs` from each legacy route to `/`.
- Keep the old page files in place. Do NOT delete `app/old-home/page.tsx`, `app/hero-v2/page.tsx`, `app/hero-v3/page.tsx`, `app/hero-v4/page.tsx`.
- Do not edit old legacy components. They can remain dead/legacy code as long as requests redirect before rendering.

Allowed optional change:

- If `app/robots.ts` explicitly disallows `/old-home`, `/hero-v2`, `/hero-v3`, `/hero-v4`, remove ONLY those exact disallow entries so crawlers can see the redirects. Do not otherwise rewrite robots.

Do not change `app/sitemap.ts` unless these legacy routes are actually present there. If they are not present, leave sitemap unchanged.

## Required checks

After changes, run:

```bash
npm run typecheck
npm run lint
npm run build
```

Then run local production server and verify:

```bash
npm run start
```

In another terminal, verify:

```bash
curl -I http://127.0.0.1:3000/old-home
curl -I http://127.0.0.1:3000/hero-v2
curl -I http://127.0.0.1:3000/hero-v3
curl -I http://127.0.0.1:3000/hero-v4
curl -I http://127.0.0.1:3000/
curl -I http://127.0.0.1:3000/tseny
```

Expected:

- legacy routes return redirect to `/` (308/301 is acceptable)
- `/` returns 200
- `/tseny` returns 200 and its content is unchanged by this task

Also verify changed files:

```bash
git diff --name-only
```

Expected changed files should be ONLY:

- `next.config.mjs`
- optionally `app/robots.ts`
- this task file

If any price, doctor, analyses, leads, package, DOCX, or `lib/data.ts` file appears in diff, stop and revert those changes.

## Report format

Do not commit, push, or deploy.

Report:

1. Files changed.
2. Exact redirects added.
3. Whether `app/robots.ts` was changed and why.
4. Confirmation that price page and `lib/data.ts` were not touched.
5. Results of typecheck/lint/build.
6. Local curl results for 4 legacy routes, `/`, and `/tseny`.
7. Any remaining risk.
