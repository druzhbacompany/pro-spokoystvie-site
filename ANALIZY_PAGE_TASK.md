# TASK: Create integrated /analizy page for ПРО Спокойствие

Project:
Next.js 14 App Router website for clinic ПРО Спокойствие.

Working folder:
/Users/glebkoroteev/projects/Глеб (Проспокойствие)/pro-spokoystvie-release-work/pro-spokoystvie-site-prod-20260704_015914

Current branch:
feature/helix-analyses-export

Current base:
- main: 5177dfc — Add SEO GEO AI launch package
- current branch includes: cbd0d4e — Add Helix analyses catalog exporter

Existing data:
- data/helix/ekaterinburg-analyses.json
- data/helix/ekaterinburg-analyses.csv
- data/helix/ekaterinburg-analyses-report.md

Dataset:
- 1070 catalog items
- 878 analyses
- 192 complexes
- 90 Helix catalog pages processed
- no duplicates
- no parsing errors
- biomaterial_price is not available in public catalog list

## Goal

Create a new public page:

/analizy

The page must be fully integrated into the existing site structure, visual style, navigation, sitemap, and AI/SEO support files.

## Clinic positioning

ПРО Спокойствие принимает биоматериал для лабораторных исследований и передаёт его в партнёрскую лабораторию Хеликс.

The clinic is a biomaterial collection point. The laboratory diagnostics are performed by Helix.

Do NOT write:
- “Мы выполняем все анализы”
- “Собственная лаборатория”
- “Гарантированная цена”
- “Цена окончательная”
- “Все анализы всегда доступны”
- “В корзину”

Use safe wording:
- “В ПРО Спокойствие можно сдать анализы по каталогу партнёрской лаборатории Хеликс.”
- “Мы принимаем биоматериал по предварительной записи и передаём его в лабораторию для выполнения исследований.”
- “Стоимость, сроки и доступность исследований уточняются при записи.”

## Mandatory price disclaimer

Prices must NOT be presented as guaranteed final prices.

Every place where a price is shown must make it clear that it is reference/catalog data and must be уточнена при записи.

Preferred card wording:
- “Цена по каталогу: 405 ₽”
- “Итоговая стоимость уточняется при записи”

Mandatory page disclaimer:
“Каталог обновлён: 02.08.2026. Стоимость, сроки выполнения и доступность исследований могут изменяться и уточняются при записи. Лабораторные исследования выполняются партнёрской лабораторией Хеликс.”

If showing prices in cards, use:
- “Цена по каталогу: X ₽”

Do NOT show price as an unconditional final clinic price.

## Required page structure

Create:

app/analizy/page.tsx

If client-side search/filter is needed, create:

components/analizy/AnalysesCatalog.tsx

Page H1:
“Анализы в Екатеринбурге”

Hero text:
“В ПРО Спокойствие можно сдать анализы по каталогу партнёрской лаборатории Хеликс. Мы принимаем биоматериал по предварительной записи и передаём его в лабораторию для выполнения исследований.”

Required content blocks:
1. Hero section in existing site style.
2. Short explanation of how the process works:
   - пациент записывается;
   - сдаёт биоматериал в клинике;
   - биоматериал передаётся в лабораторию Хеликс;
   - результат, сроки и итоговая стоимость уточняются при записи / по правилам лаборатории.
3. Search by title and code.
4. Filters:
   - Все
   - Анализы
   - Комплексы
5. Catalog cards/list:
   For every item show:
   - type label: Анализ / Комплекс
   - code
   - title
   - catalog price
   - price clarification text
   - turnaround_time
   - CTA button: “Записаться”
6. “Показать ещё” instead of rendering a visually endless list.
7. Empty state:
   “По этому запросу анализ не найден. Оставьте заявку — администратор уточнит возможность сдачи.”
8. Bottom disclaimer with catalog update date and price clarification.
9. CTA block:
   “Не нашли нужный анализ?”
   Button: “Уточнить у администратора”

## UX requirements

- Do NOT copy Helix design one-to-one.
- Do NOT use “В корзину”.
- Do NOT create cart/ecommerce logic.
- Use existing ПРО Спокойствие style.
- Make text readable and dark enough.
- Mobile responsive.
- Dataset has 1070 items, so avoid uncontrolled huge rendering.
- Search/filter should be convenient.
- The page should look like a natural part of the clinic website, not like a pasted Helix page.

## Integration requirements

Add “Анализы” to main navigation.

Find the existing navigation source and add the item carefully in the same style as the current navigation.

Add /analizy to sitemap:
- inspect app/sitemap.ts
- add a proper URL entry for /analizy
- keep existing sitemap logic and no trailing slash style

Add /analizy to llms.txt:
- inspect public/llms.txt
- add page in the appropriate section
- keep existing tone and structure

Metadata:
Add page-specific metadata:
- title: “Анализы в Екатеринбурге | ПРО Спокойствие”
- description: “Сдача анализов в Екатеринбурге по каталогу партнёрской лаборатории Хеликс. Приём биоматериала в клинике ПРО Спокойствие по предварительной записи.”
- canonical: https://pro-spokoystvie.ru/analizy
- robots index/follow unless existing project pattern says otherwise

Do not change global metadata except where necessary for this new route.

robots.txt:
Inspect app/robots.ts. Do not change unless the current project requires explicit route handling. /analizy must not be disallowed.

## Legal / content restrictions

Do NOT copy detailed Helix medical descriptions, preparation instructions, indications, FAQ, or long copyrighted texts.

Use only existing structured data:
- code
- title
- type
- price
- turnaround_time
- url if needed

Do not present the page as medical advice.

Add clarification:
“Информация на странице носит справочный характер и не заменяет консультацию специалиста.”

## Forms / CTA

Do not rewrite form API logic in this task.

CTA buttons may open/use the existing site lead modal/form if such component exists.
If there is an existing CTA pattern, reuse it.
If not clear, use existing contact/appointment link pattern from current pages.

Do not connect MedLock in this task.

## Do not touch

- Do not change homepage blocks.
- Do not change hero slider.
- Do not change existing doctors pages.
- Do not change existing forms logic.
- Do not change server/nginx/deploy files.
- Do not commit.
- Do not push.

## Validation

Run:

npm run typecheck
npm run lint
npm run build

Also verify:
- /analizy route exists
- navigation includes “Анализы”
- sitemap includes /analizy
- llms.txt includes /analizy
- search works
- filters work
- show more works
- price disclaimer is visible
- mobile layout is acceptable

## Final report

At the end, report:
- files changed
- where /analizy was added
- how many analyses are loaded from JSON
- how price clarification is implemented
- whether sitemap was updated
- whether llms.txt was updated
- what checks passed
- any remaining risks or manual review items
