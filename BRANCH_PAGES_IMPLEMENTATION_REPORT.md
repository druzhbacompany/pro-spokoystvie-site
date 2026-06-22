# BRANCH PAGES IMPLEMENTATION REPORT

**Date:** 2026-06-22
**Status:** COMPLETE — typecheck ✅ · lint ✅ · build ✅ · browser verified ✅
**Mode:** RUFLO / MINIMAL DIFF

---

## 1. ФАЙЛЫ ИЗМЕНЕНЫ

### Изменены
- `lib/data.ts` — расширен тип `Branch`: добавлены `slug`, `routeUrl`, `mapEmbedUrl`, `description?`, `howToFind?`. Добавлены хелперы `mapEmbed()` и `mapRoute()`. Заполнены оба филиала. Добавлен экспорт `branchBySlug()`.
- `components/smt/Branches.tsx` — из карточки убрана галерея; карточка сделана кликабельной (stretched-link на заголовке → страница филиала); кнопки заменены на «Записаться» / «Подробнее о филиале» / «Построить маршрут». В `BranchMapPanel` ссылка «Яндекс.Карты →» заменена на «Подробнее →» (на страницу филиала).

### Созданы
- `app/filialy/[slug]/page.tsx` — динамическая страница филиала (SSG для обоих slug).
- `BRANCH_PAGES_IMPLEMENTATION_REPORT.md` (этот файл).

### Не тронуты
Врачи, цены, legal pages, формы (BookingForm), cookie banner, программы — без изменений.

---

## 2. ЧТО УБРАНО С КАРТОЧЕК /kontakty

- **Блок «Фотографии»** (сетка 3×2 миниатюр) полностью удалён из `BranchCard`.
- Кнопка **«Открыть в Яндекс.Картах»** убрана из карточки (доступна на странице филиала и в карте-панели).

Карточка теперь краткая: иконка-пин, название (ссылка), адрес, режим работы, телефон, краткое описание (note), 3 кнопки. Прежний SMT-вид сохранён (спокойная карточка, округления, сетка 2 колонки).

Проверено через DOM: `galleryImgCount: 0` на /kontakty; ссылки `/filialy/kosmonavtov` и `/filialy/gromova` присутствуют в каждой карточке.

---

## 3. СОЗДАННЫЕ СТРАНИЦЫ ФИЛИАЛОВ

Реализованы через единый динамический маршрут `app/filialy/[slug]/page.tsx` с `generateStaticParams()` → обе страницы пререндерятся статически (● SSG в build).

| URL | Slug | H1 |
|---|---|---|
| `/filialy/kosmonavtov` | `kosmonavtov` | Филиал на Космонавтов |
| `/filialy/gromova` | `gromova` | Филиал на Громова |

**Космонавтов** — hero (адрес, режим, телефон, кнопки), «О филиале», «Как пройти и ориентиры» (3 ориентира), встроенная карта, «Фотографии филиала» (6 фото), CTA «Записаться».

**Громова** — hero, «О филиале» (текст: контактные данные общие, подробности уточняются), встроенная карта, CTA. Галерея **не показывается** (фото нет) — секция отсутствует в DOM. Блок «Как пройти» отсутствует (нет ориентиров).

---

## 4. ГДЕ ПОКАЗЫВАЕТСЯ ГАЛЕРЕЯ

- Только на `/filialy/kosmonavtov` — блок «Фотографии филиала», 6 фото:
  `reception-2.jpg`, `hall-2.jpg`, `doctor-office-2.jpg`, `procedure-room-1.jpg`, `procedure-room-2.jpg`, `office-4.jpg` (из `public/assets/clinic/kosmonavtov/`).
- Сетка адаптивная: `repeat(auto-fit, minmax(220px, 1fr))`, соотношение 4:3, округления 12px.
- На `/kontakty` и `/filialy/gromova` галереи **нет**.

---

## 5. ГДЕ ВСТРОЕНА КАРТА

- На обеих страницах филиалов — секция «На карте», `<iframe>` Яндекс.Карт (`https://yandex.ru/map-widget/v1/?text=<адрес>&z=17`), height 420, `loading="lazy"`.
- Под картой — ссылки «Открыть в Яндекс.Картах →» и «Построить маршрут →».
- Проверено: карта Космонавтов показывает корректный пин «проспект Космонавтов, 101Б».

---

## 6. РЕЗУЛЬТАТЫ ПРОВЕРОК

```
npx tsc --noEmit   → чисто (нет вывода)
npx next lint      → ✔ No ESLint warnings or errors
npx next build     → ✓ Compiled successfully
                     ● /filialy/[slug]  →  /filialy/kosmonavtov, /filialy/gromova
```

---

## 7. GIT STATUS --SHORT

```
 M components/smt/Branches.tsx
 M lib/data.ts
?? app/filialy/
?? BRANCH_PAGES_IMPLEMENTATION_REPORT.md
```

(также в рабочем дереве остаются неотслеживаемые `CLINIC_BRANCH_PHOTOS_REPORT.md` и папка-источник «1. Сбор для заполнения сайта/» из предыдущих задач.)

---

**STOPPED BEFORE COMMIT. STOPPED BEFORE PUSH.**
