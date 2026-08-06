# TASK: Clean risky wording on live public pages for ПРО Спокойствие

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

Already completed and deployed:
- `/analizy` page with Helix catalogue.
- favicon.
- missing doctor photos.
- Tadevosyan photo cache fix via `/assets/doctors/tadevosyan-202608.png`.
- homepage P1 cleanup.
- homepage reorder: removed homepage license promo block and moved `Филиалы клиники` above `С чем мы помогаем`.

There is a separate unfinished lead/email/SMTP task kept in git stash. Do not touch it.

## Goal

Clean risky, legally weak, or outdated wording on **live public pages other than the homepage**.

The homepage `/` was already cleaned in the previous task. This task should focus on the remaining live public pages and shared components/data used by those pages.

## Pages/components in scope

Inspect and clean only live public pages and shared text that appears on them:

- `/o-klinike`
- `/kontakty`
- `/uslugi`
- `/uslugi/[slug]`
- `/uslugi/iv-terapiya`
- `/uslugi/protsedurnyy-kabinet`
- `/uslugi/nevrologiya`
- `/vrachi`
- `/vrachi/[slug]`
- `/tseny`
- `/filialy/[slug]`
- shared SMT components used by those pages, especially default CTA text
- `lib/data.ts` entries used by live pages, services, doctors, meta descriptions, service blurbs

## Out of scope

Do not edit in this task:

- email/lead/SMTP/MedLock logic
- `app/api/lead/route.ts`
- `package.json`
- `package-lock.json`
- `.env.example`
- doctor photo assets
- `/analizy` implementation/data
- server/nginx/deploy files
- legacy route removal or noindex work

Important: legacy pages such as `/old-home`, `/hero-v2`, `/hero-v3`, `/hero-v4`, and `components/v2|v3|v4` may contain old wording. Do not rewrite them in this task unless they are imported by live pages. Report them separately as legacy leftovers.

## Risk wording to remove or rewrite

Find and clean public-facing uses of:

- `без постановки на учёт`
- `без постановки на учет`
- `постановка на учёт`
- `постановка на учет`
- unconditional `конфиденциально` when used as marketing promise
- unconditional `анонимно`
- `без учёта`
- `без учета`
- `наркология`
- `нарколог`
- `психиатр-нарколог`
- `вывод из запоя`
- `запой`
- narcological `детокс`
- `кодирование`, unless it is in an explicitly approved safe/legal context
- `вылечим`
- `избавим`
- `гарантируем`
- `100% результат`
- `круглосуточно`
- `24/7`

Allowed legal/document names:
- `Политика конфиденциальности` as the title/link of a legal document is allowed.

## Safe replacement language

Use safe medical wording consistent with the project:

- `с соблюдением врачебной тайны`
- `бережно и деликатно`
- `без осуждения`
- `по показаниям`
- `по назначению врача`
- `после очной консультации`
- `врач оценивает состояние и предлагает план помощи`
- `может быть рекомендовано`
- `индивидуальный план лечения`
- `поддержка ремиссии`
- `поддержка при риске срыва`
- `поддержка человека и его близких`

For addictive behavior/remission positioning:
- keep focus on support outside acute phase;
- do not position the clinic as narcology;
- do not use `наркология`, `нарколог`, `вывод из запоя`, `детокс`.

For IV/procedures:
- use `восстановительная инфузионная терапия`, `процедурный кабинет`, `по назначению врача`, `по показаниям`, `после очной консультации`.
- do not use detox/addiction/alcohol wording.

## Required implementation process

1. First run an inventory grep over live page sources and shared data/components:

```bash
grep -RniE "без постановки|постановк|конфиденциально|аноним|нарколог|детокс|запо|кодирован|гарант|вылеч|избав|24/7|круглосуточ|без уч[её]та" app components lib --exclude-dir=.next --exclude-dir=node_modules
```

2. Categorize findings:
   - live public page / must fix now;
   - legal document title / allowed;
   - factual credential or education / report before changing if ambiguous;
   - legacy unused route/component / report separately, do not touch unless imported by live pages;
   - comments/internal technical / may leave if not rendered, but report.

3. Rewrite live public wording using safe language.

4. Update the default CTA text if it still says `Конфиденциально, без постановки на учёт` or similar. Use safe default:

`Бережно, с соблюдением врачебной тайны.`

5. Preserve design and layout. This is a wording/legal cleanup task, not a redesign.

6. Do not remove pages unless explicitly required.

7. Do not change medical service prices, doctor names, addresses, phone, license number, or legal entity data.

## Validation

Run:

```bash
npm run typecheck
npm run lint
npm run build
```

Run grep after changes:

```bash
echo "=== LIVE SOURCE RISK SCAN ==="
grep -RniE "без постановки|постановк|конфиденциально|аноним|нарколог|детокс|запо|кодирован|гарант|вылеч|избав|24/7|круглосуточ|без уч[её]та" app components lib --exclude-dir=.next --exclude-dir=node_modules || true
```

Also check rendered pages where possible, especially:

- `/o-klinike`
- `/kontakty`
- `/uslugi`
- representative service page: `/uslugi/priem-psikhiatra`
- `/uslugi/iv-terapiya`
- `/uslugi/protsedurnyy-kabinet`
- `/vrachi`
- representative doctor page: `/vrachi/romanovsky-vo`

## Final report

At the end, report:

1. files changed
2. exact pages/components cleaned
3. list of risky phrases removed/replaced
4. list of remaining grep matches and why they remain
5. whether legacy pages still contain risky terms
6. whether default CTA text was fixed
7. typecheck/lint/build results
8. pages visually or text-verified
9. risks or ambiguities that require owner approval

Do not commit.
Do not push.
Do not deploy.
