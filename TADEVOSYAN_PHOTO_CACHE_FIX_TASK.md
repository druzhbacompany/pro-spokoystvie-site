# TASK: Force update Tadevosyan photo with a new asset filename

Project:
Next.js 14 App Router website for clinic «ПРО Спокойствие».

Working folder:
`/Users/glebkoroteev/projects/Глеб (Проспокойствие)/pro-spokoystvie-release-work/pro-spokoystvie-site-prod-20260704_015914`

Important workflow:
- Work only inside the current project folder.
- Do not commit.
- Do not push.
- Do not deploy.
- Stop after implementation and provide a report.

## Problem

The replacement photo for doctor **Тадевосян Нарек Самвелович** was deployed under the same public path:

`/assets/doctors/tadevosyan.png`

But the public site still visually shows the old image in the doctor card / neurology section.

Likely reason:
Next.js image optimization and/or browser cache may keep serving the old optimized image when the public asset path is unchanged.

## Goal

Force the website to use the new Tadevosyan photo by assigning it a new unique filename/path.

## Source photo

Use the provided local source photo from:

`.local-input/doctor-photos-source/Тадевосян Нарек Самвелович.png`

If this source file exists, use it as the source of truth.

Do not use the currently rendered public site image as a source.
Do not generate a new photo.
Do not edit/retouch the person.

## Required implementation

1. Copy the source photo to a new final asset filename, for example:

`public/assets/doctors/tadevosyan-202608.png`

2. Update the doctor data entry for:

`Тадевосян Нарек Самвелович`

in `lib/data.ts` so the `photo` path becomes:

`/assets/doctors/tadevosyan-202608.png`

3. Make sure all pages/cards that use the shared doctor data now render the new path.

4. Do not change:
- doctor name
- specialty
- experience
- tags
- prices
- SEO text
- layout/design
- unrelated doctors

5. Do not touch the postponed leads/email/SMTP task. Specifically do not touch:
- `app/api/lead/route.ts`
- `package.json`
- `package-lock.json`
- `.env.example`
- `LEADS_P0_TASK.md`

6. Keep the old file `public/assets/doctors/tadevosyan.png` for now unless it is clearly safe to delete. Report whether old references remain.

## Validation

Run:

```bash
npm run typecheck
npm run lint
npm run build
```

## Local visual check

Check locally:

- `/vrachi`
- `/vrachi/tadevosyan-ns`
- `/uslugi/nevrologiya`

Verify that the rendered image URL/path now contains:

`tadevosyan-202608.png`

The old path `/assets/doctors/tadevosyan.png` must no longer be used for this doctor in `lib/data.ts`.

## Final report

Report:

1. files changed
2. source file used
3. old photo path
4. new photo path
5. where `lib/data.ts` was updated
6. validation results: typecheck/lint/build
7. whether any old `tadevosyan.png` references remain
8. whether the leads/email/SMTP files were untouched

## Stop condition

After finishing:
- do not commit
- do not push
- do not deploy

Stop and wait for confirmation.
