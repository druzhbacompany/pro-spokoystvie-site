TASK: Helix Екатеринбург analyses catalog exporter for PRO Спокойствие

Project:
Next.js 14 App Router website for clinic ПРО Спокойствие.

Current working folder:
/Users/glebkoroteev/projects/Глеб (Проспокойствие)/pro-spokoystvie-release-work/pro-spokoystvie-site-prod-20260704_015914

Current production commit:
5177dfc870a641912583e267715dba80d0a5dee9

Current branch:
feature/helix-analyses-export

Goal:
Create a data exporter for Helix Екатеринбург analyses catalog from:
https://helix.ru/ekaterinburg/catalog/190-vse-analizy

Important:
Do NOT change existing website pages.
Do NOT change design.
Do NOT change forms.
Do NOT change SEO metadata.
Do NOT commit.
Do NOT push.
Do NOT download images.
Do NOT log in.
Do NOT submit forms.
Do NOT bypass protections.
Do NOT collect personal data.
Do NOT copy full medical descriptions, preparation texts, indications, FAQ, or long copyrighted content.

Clinic context:
ПРО Спокойствие accepts biomaterial for laboratory studies and transfers it to Helix laboratory.
For now we need only structured catalog data for future page /analizy.

Collect these fields for each catalog item:
source
city
category
type
code
title
price
biomaterial_price
turnaround_time
url
scraped_at

If a field is not available, keep it empty/null.

Create:
scripts/export-helix-ekb-analyses.mjs
data/helix/ekaterinburg-analyses.csv
data/helix/ekaterinburg-analyses.json
data/helix/ekaterinburg-analyses-report.md
data/helix/cache/

Script command:
node scripts/export-helix-ekb-analyses.mjs

Required behavior:
1. First do read-only reconnaissance of the Helix catalog structure.
2. Check page HTML, pagination, embedded JSON, and possible public internal API.
3. Prefer stable public JSON/API if available.
4. Otherwise use fetch + HTML parsing.
5. Use cache in data/helix/cache/ so repeated runs do not hit Helix again.
6. Use polite delay between requests, at least 1000-1500 ms.
7. Use retry for temporary errors.
8. Deduplicate by code/url/title.
9. Save CSV and JSON.
10. Generate markdown report.

Report must include:
pages processed
items collected
fields filled
duplicates found
errors/skips
10 sample records
limitations
recommendations for future /analizy page

Validation:
After implementation run:
node scripts/export-helix-ekb-analyses.mjs
wc -l data/helix/ekaterinburg-analyses.csv
node -e "const d=require('./data/helix/ekaterinburg-analyses.json'); console.log(d.length); console.log(d.slice(0,3));"
npm run typecheck
npm run lint
npm run build

Final answer:
Report what files were created, how many analyses were collected, how many pages processed, what fields are filled, what limitations remain, and whether we can proceed to building /analizy.
