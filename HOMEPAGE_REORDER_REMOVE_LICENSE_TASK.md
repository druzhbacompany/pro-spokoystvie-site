# TASK: Remove homepage license block and move branches above directions

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

The homepage P1 cleanup has just been deployed. Now the owner wants a small layout correction on the homepage.

Screenshots from production show:
1. A homepage block with eyebrow `Документы` and H2 `Медицинская помощь по лицензии`.
2. A homepage block `Филиалы клиники` with two branch cards:
   - `Филиал на Космонавтов`
   - `Филиал на Громова`
3. The directions section:
   - eyebrow `Направления`
   - H2 `С чем мы помогаем`
   - text `Выберите близкую тему — или позвоните: администратор поможет подобрать специалиста. План помощи врач предлагает после очной консультации.`

## Goal

Make two homepage changes:

1. Completely remove the homepage license/documents promo block:
   - eyebrow `Документы`
   - H2 `Медицинская помощь по лицензии`
   - license paragraph
   - buttons `Документы и лицензия` and `Проверить в Росздравнадзоре`
   - chips: `С соблюдением врачебной тайны`, `Документы в открытом доступе`, `Приём по предварительной записи`, `Помощь — по показаниям`

2. Move the homepage `Филиалы клиники` block above the `Направления / С чем мы помогаем` section.

## Required final homepage order

The top of the homepage should become:

1. Hero section / promo slider.
2. `Филиалы клиники` section.
3. `Направления` / `С чем мы помогаем` section.
4. Other existing homepage sections after that, preserving their existing order as much as possible.

## Scope

This task is only about homepage structure/order.

Allowed:
- `app/page.tsx`
- only directly necessary imports/types if needed

Possibly allowed only if the existing component requires a tiny safe adjustment:
- components directly used by the homepage branch block

Do not change:
- app/api/lead/route.ts
- package.json
- package-lock.json
- .env.example
- doctor photo assets
- public/assets/doctors/*
- `/analizy` implementation
- `/uslugi/nevrologiya` implementation
- nginx/server/deploy files
- SEO/robots/sitemap unless absolutely required, which should not be needed for this task

## Important content rules

- Do not delete the real documents/license pages.
- Do not remove `Документы` from the site header/footer navigation.
- Only remove the homepage promotional license block.
- Do not create a new replacement block.
- Do not duplicate the branch block. It must appear once, above directions.
- Keep the branch block content and buttons as they are unless moving it requires tiny markup changes.
- Keep the `Направления / С чем мы помогаем` content as already cleaned in the previous P1 task.

## Visual requirements

- The transition from Hero → Branches → Directions should look natural.
- No large broken whitespace after removing the license block.
- Desktop and mobile should not have horizontal overflow.
- Existing spacing between sections should stay consistent with the site design.

## Validation

Run:

```bash
npm run typecheck
npm run lint
npm run build
```

## Visual verification

Check locally after implementation:

- `/` desktop width around 1280px
- `/` mobile width around 375px

Confirm:

1. The `Медицинская помощь по лицензии` block is gone from the homepage.
2. The `Филиалы клиники` block appears above `Направления / С чем мы помогаем`.
3. The `Филиалы клиники` block still has both cards and buttons.
4. The `С чем мы помогаем` section still contains the cleaned directions and the `Анализы` entry.
5. Header/footer still contain normal navigation including `Документы`.
6. No unrelated pages were changed.

## Safety checks

After changes, run:

```bash
git diff --name-only
```

Make sure the diff does not include:

- app/api/lead/route.ts
- package.json
- package-lock.json
- .env.example
- public/assets/doctors/*

## Final report

Report:

1. files changed
2. which homepage block was removed
3. where the branch block was moved
4. final homepage section order
5. typecheck/lint/build results
6. visual checks performed
7. any remaining risks

Do not commit.
Do not push.
Do not deploy.
