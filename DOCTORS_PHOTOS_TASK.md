# TASK: Add and replace doctor photos on ПРО Спокойствие site

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

## Context

The website currently has doctor cards with placeholder image blocks saying «Фото готовится».
The owner has provided real local portrait files for doctors.
The source files have been copied into a local project-only input folder:

`./.local-input/doctor-photos-source/`

Use these source files only as input. Do not commit this local input folder.

## Goal

Update doctor photos on the site.

### A. Replace placeholders with real photos

For the following doctors, replace the placeholder image with the correct real portrait:

1. Караваева Анастасия Алексеевна
2. Преображенская Татьяна Александровна
3. Мадалиева Мария Павловна

### B. Replace existing photo

For the following doctor, replace the current existing photo with the new provided portrait:

4. Тадевосян Нарек Самвелович

## Source-file matching

The source files in `./.local-input/doctor-photos-source/` should be matched by doctor name in the filename.

Expected name patterns may include:

- `Караваева Анастасия Алексеевна.*`
- `Преображенская Татьяна Александровна.*`
- `Мадалиева Мария Павловна.*`
- `Тадевосян Нарек Самвелович.*`

If exact extensions or names differ, inspect the files carefully and match by filename and visual content.
If any mapping is ambiguous, stop and report the ambiguity before making risky changes.

## What to inspect before editing

Before changing files, inspect:

1. Current doctor data source.
2. Existing doctor image path fields.
3. Existing public asset folders for doctor photos.
4. Doctor card component(s).
5. Individual doctor page(s), if they use the same image fields.
6. Homepage / doctors sections, if these doctors appear there.

Likely files/areas to inspect:

- `lib/data.ts`
- `components/**`
- `app/vrachi/**`
- `public/**`

Do not assume the architecture. Verify it from the code.

## Implementation requirements

1. Use the project’s existing image convention and location for doctor portraits.
2. Put final web-ready image assets into the appropriate `public` folder used by the project.
3. Update data mappings/usages so the photos appear everywhere the doctors are rendered.
4. Preserve the existing card design and layout.
5. Do not change doctor names, titles, experience, tags, prices, services, navigation, forms, lead route, email logic, sitemap, SEO package, or unrelated copy.
6. Do not touch the postponed lead/email work.
7. Do not commit `.local-input/doctor-photos-source/`.
8. Do not leave broken references to source files.

## Visual requirements

For every portrait:

- show the doctor clearly and professionally;
- avoid cutting off the head;
- avoid awkward crop;
- do not distort aspect ratio;
- preserve professional medical-site style;
- keep cards consistent with other doctors;
- use reasonable web optimization if needed;
- do not degrade image quality unnecessarily.

If the site uses `object-cover`, choose image dimensions/crops that work well with the existing card proportions.
Do not redesign the cards unless absolutely necessary.

## Required doctors and expected result

### Караваева Анастасия Алексеевна
- Before: placeholder «Фото готовится».
- After: real portrait from source folder.

### Преображенская Татьяна Александровна
- Before: placeholder «Фото готовится».
- After: real portrait from source folder.

### Мадалиева Мария Павловна
- Before: placeholder «Фото готовится».
- After: real portrait from source folder.

### Тадевосян Нарек Самвелович
- Before: existing current photo on site.
- After: replace with the new portrait from source folder.

## Validation commands

Run:

```bash
npm run typecheck
npm run lint
npm run build
```

All must pass.

## Manual visual verification

Run local dev or production preview and check at least:

- `/vrachi`
- individual doctor pages for affected doctors, if they exist
- homepage sections if affected doctors appear there
- neurology section/page for Тадевосян Нарек Самвелович

Confirm:

- no placeholder remains for the three doctors listed above;
- Тадевосян Нарек Самвелович displays the new portrait, not the old one;
- card crops look correct;
- no layout is broken on desktop and mobile widths.

## Final report

Report clearly:

1. Files changed.
2. Which source images from `.local-input/doctor-photos-source/` were used for each doctor.
3. Where final images were placed in the repo.
4. Which data entries / image mappings were updated.
5. Which pages/URLs were visually checked.
6. Results of:
   - `npm run typecheck`
   - `npm run lint`
   - `npm run build`
7. Whether any placeholder «Фото готовится» still remains anywhere on the site.
8. Whether any ambiguity remained in filename-to-doctor mapping.

## Stop condition

After completing the task:

- do not commit;
- do not push;
- do not deploy;
- wait for confirmation.
