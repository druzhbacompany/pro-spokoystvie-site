# Helix Екатеринбург analyses export

Generated: 2026-08-02T07:17:09.253Z

## Source

- Catalog: https://helix.ru/ekaterinburg/catalog/190-vse-analizy
- City: Екатеринбург
- Category: Все анализы
- Public structure used: Helix Angular HTML with embedded TransferState; API endpoint discovered: https://helixru-webapi-prod.medindex.ru/api/catalog/items/list/v2

## Summary

- Pages processed: 90
- Items collected: 1070
- Duplicates found: 0

## Fetch methods

- html-transfer-state-cache: 90

## Fields filled

- source: 1070/1070
- city: 1070/1070
- category: 1070/1070
- type: 1070/1070
- code: 1070/1070
- title: 1070/1070
- price: 1070/1070
- biomaterial_price: 0/1070
- turnaround_time: 1070/1070
- url: 1070/1070
- scraped_at: 1070/1070

## Errors/skips

- none

## 10 sample records

- 02-011 | complex | Проба Реберга (клиренс эндогенного креатинина) | 405 | До 2 суток. Указанный срок не включает день взятия биоматериала | https://helix.ru/catalog/item/02-011
- 02-003 | analysis | Микроскопическое исследование отделяемого мочеполовых органов женщин (микрофлора), 3 локализации | 480 | До 00:00 следующего дня | https://helix.ru/catalog/item/02-003
- 02-001 | analysis | Анализ кала на скрытую кровь | 340 | До 2 суток. Указанный срок не включает день взятия биоматериала | https://helix.ru/catalog/item/02-001
- 02-010 | analysis | Анализ кала на яйца гельминтов | 340 | До 2 суток. Указанный срок не включает день взятия биоматериала | https://helix.ru/catalog/item/02-010
- 02-009 | analysis | Копрограмма | 500 | До 2 суток. Указанный срок не включает день взятия биоматериала | https://helix.ru/catalog/item/02-009
- 02-005 | complex | Клинический анализ крови (с лейкоцитарной формулой) | 475 | До 00:00 следующего дня. Указанный срок не включает день взятия биоматериала | https://helix.ru/catalog/item/02-005
- 02-012 | analysis | Анализ кала на цисты простейших | 460 | До 2 суток. Указанный срок не включает день взятия биоматериала | https://helix.ru/catalog/item/02-012
- 02-006 | analysis | Общий анализ мочи с микроскопией | 305 | До 00:00 следующего дня. Указанный срок не включает день взятия биоматериала | https://helix.ru/catalog/item/02-006
- 02-002 | analysis | Анализ мочи по Нечипоренко | 290 | До 00:00 следующего дня. Указанный срок не включает день взятия биоматериала | https://helix.ru/catalog/item/02-002
- 02-007 | analysis | Скорость оседания эритроцитов (СОЭ) | 225 | До 00:00 следующего дня. Указанный срок не включает день взятия биоматериала | https://helix.ru/catalog/item/02-007

## Limitations

- Only catalog-list fields were collected: codes, titles, prices, complex/analysis type, turnaround text, and item URLs.
- biomaterial_price is null because it is not present in the category list API/HTML used for this export.
- Detailed item pages were not crawled to avoid collecting long medical descriptions, preparation text, indications, FAQ, or other copyrighted medical content.
- Prices and turnaround times are Helix Екатеринбург values at export time and should be refreshed before publishing.

## Recommendations for future /analizy page

- Treat this dataset as source-derived reference data, not as medical advice.
- Show source attribution and last update date.
- Add a refresh workflow before release, because prices and availability can change.
- Keep detailed medical preparation and interpretation content out of the page unless separately licensed or authored by the clinic.
- Consider adding clinic-specific service notes: ПРО Спокойствие accepts biomaterial and transfers it to Helix laboratory.
