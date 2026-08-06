# TASK: Homepage P1 audit and cleanup for ПРО Спокойствие

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

## Current context

Recently completed and deployed:
- `/analizy` page with Helix catalogue.
- favicon.
- missing doctor photos.
- Tadevosyan photo cache fix via `/assets/doctors/tadevosyan-202608.png`.

Important: there is a separate unfinished lead/email/SMTP task kept outside this scope. Do not touch it.

## Goal

Clean up the homepage (`/`) from risky, weak, duplicate, or outdated blocks and make it safer and clearer without redesigning the site.

This is an editorial/legal/UX cleanup task for the homepage and the components/data directly used by the homepage.

## Scope

Allowed:
- `app/page.tsx`
- homepage components imported by `app/page.tsx`
- shared homepage/service data if it directly affects homepage content
- small style/class adjustments only where needed for homepage readability

Not allowed:
- Do not touch email/lead/SMTP/MedLock code.
- Do not touch `app/api/lead/route.ts`.
- Do not touch `package.json` or `package-lock.json`.
- Do not touch `.env.example`.
- Do not touch doctor photo assets.
- Do not touch `/analizy` implementation except linking to it from homepage if needed.
- Do not touch server/nginx/deploy files.
- Do not redesign the whole site.
- Do not delete pages/routes unless explicitly required and clearly safe.

## What to inspect first

Before editing, inspect:
- `app/page.tsx`
- all components directly imported by the homepage
- related data in `lib/data.ts` or equivalent files
- any homepage-specific legacy components actually rendered on `/`

Also check whether these legacy routes/components are actually used on the current homepage:
- `/old-home`
- `/hero-v2`
- `/hero-v3`
- `/hero-v4`
- `components/v4/*`

Do not edit legacy files unless they are actually imported by the current homepage.

## Required homepage cleanup

### 1. Remove or rewrite risky public wording

Find and remove/rewrite from the current homepage any wording that is risky for public medical positioning.

Forbidden or risky on homepage:
- `наркология`
- `нарколог`
- `психиатр-нарколог`
- `вывод из запоя`
- `детокс` in narcological/addiction sense
- `лечение зависимости` as a direct promise
- `вылечим`
- `избавим`
- `гарантируем`
- `100% результат`
- `круглосуточно`
- `24/7`
- unconditional `анонимно`
- unconditional `конфиденциально` if phrased as a guarantee
- `без постановки на учёт` / `без постановки на учет`
- any promise that a patient will definitely avoid registration/accounting/specific legal consequences

Safer alternatives:
- `бережно`
- `деликатно`
- `с соблюдением врачебной тайны`
- `по показаниям`
- `после очной консультации`
- `врач оценивает состояние и рекомендует план помощи`
- `индивидуальный план лечения`
- `при наличии показаний`

### 2. Rewrite or remove weak trust badges

Homepage currently may contain weak/awkward badges such as:
- `НАСТОЯЩАЯ ЛИЦЕНЗИРОВАННАЯ КЛИНИКА`
- `КАРТЫ И НАЛИЧНЫЕ`
- `НАСТРОЕНИЕ И СОСТОЯНИЕ`

Handle them as follows:
- Remove or rewrite `НАСТОЯЩАЯ ЛИЦЕНЗИРОВАННАЯ КЛИНИКА` into a calmer phrase if the block is valuable, for example `Медицинская помощь по лицензии`.
- Remove `КАРТЫ И НАЛИЧНЫЕ` from trust/benefit badges unless it is part of a practical payment section.
- Replace `НАСТРОЕНИЕ И СОСТОЯНИЕ` with a clearer patient-language phrase, or remove it if it is vague.

Do not invent unsupported awards, rankings, guarantees, or regalia.

### 3. Remove homepage duplication

Check whether the homepage duplicates sections like:
- `С чем мы помогаем`
- `Направления помощи`

If both exist and overlap, simplify:
- keep the clearer/stronger block;
- remove or merge the weaker duplicate;
- preserve important links to services;
- do not make the homepage feel empty.

### 4. Review `Кто вас примет`

If the homepage has a block `Кто вас примет` that duplicates the doctors block and adds little value:
- remove it, or
- simplify it into a short transition to `/vrachi`, or
- keep it only if it has distinct useful content.

Do not remove the actual `/vrachi` page or doctor data.

### 5. Make analyses visible from homepage if missing

The `/analizy` page exists and is deployed. Check whether the homepage has a clear path to it.

If there is no clear homepage entry for analyses, add a small, safe entry/link in the most appropriate services/sections area.

Safe wording for analyses:
- `Анализы`
- `Сдать анализы по каталогу партнёрской лаборатории Хеликс`
- `Принимаем биоматериал по предварительной записи и передаём в лабораторию для выполнения исследований`
- `Стоимость, сроки и доступность уточняются при записи`

Do not say:
- `мы выполняем все анализы`
- `собственная лаборатория`, unless supported by existing verified content
- guaranteed prices or guaranteed turnaround time

Link to:
- `/analizy`

### 6. Neurology homepage entry

Check how neurology is represented on homepage.

Preferred public entry:
- `Мигрень и головная боль`

Use existing working route only. Do not create a new route in this task unless it already exists and needs a link fix.

If homepage currently shows neurology too broadly or vaguely, adjust the homepage card/label to be clearer and safer.

### 7. IV therapy / procedural cabinet wording

If homepage mentions IV therapy, infusions, or procedural cabinet, keep wording medically safe.

Allowed positioning:
- `Процедурный кабинет`
- `Инфузионная терапия по назначению врача`
- `Восстановительная поддержка при наличии показаний`
- `После очной консультации специалиста`

Avoid:
- `детокс` in addiction sense
- `вывод из запоя`
- `очищение организма`
- unsupported promises of recovery or weight loss

### 8. Text readability

If homepage body text / article cards / muted text are too pale, make small targeted contrast improvements.

Rules:
- Do not globally change the design system unless necessary.
- Prefer targeted class changes in homepage components.
- Keep existing visual style.

## Required checks after editing

Run:

```bash
npm run typecheck
npm run lint
npm run build
```

Also run a forbidden-term scan on the homepage-related code you changed and on current rendered homepage if possible.

Suggested grep:

```bash
grep -RInE "нарколог|наркология|психиатр-нарколог|вывод из запоя|детокс|вылечим|избавим|гарантируем|100%|круглосуточно|24/7|анонимно|постановк[аи] на уч[её]т|без постановки" app components lib public --exclude-dir=node_modules --exclude-dir=.next || true
```

Important: if matches are in old legal docs, task files, comments, or legacy unused files, report them separately instead of blindly editing.

## Visual check

After implementation, check locally:
- `/`
- `/analizy` only to make sure it was not broken by a homepage link
- `/vrachi` only to make sure doctor sections still render
- mobile width around 375px
- desktop width around 1280px

Check that:
- homepage still looks coherent;
- no section is visually broken;
- navigation still works;
- analyses link is reachable if added;
- duplicate blocks are reduced;
- risky words are not visible on homepage.

## Final report

Report:
1. files changed
2. which homepage sections were changed
3. exact risky/weak phrases removed or rewritten
4. whether duplicate blocks were removed/merged
5. whether analyses entry was added/confirmed
6. how neurology is now represented on homepage
7. how IV/procedural cabinet is now worded, if touched
8. forbidden-term scan results
9. validation results:
   - typecheck
   - lint
   - build
10. pages visually checked
11. any remaining risks or ambiguous legacy content

## Stop condition

After finishing:
- do not commit
- do not push
- do not deploy
- stop and wait for confirmation
