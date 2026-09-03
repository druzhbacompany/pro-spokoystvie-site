import Script from "next/script";

/**
 * Круглая кнопка онлайн-записи МедФлекс — сквозной виджет сайта.
 *
 * Код взят из личного кабинета МедФлекс без изменений: контейнер с
 * `id="medflexRoundWidgetData"` и `data-src` + внешний скрипт площадки.
 * Скрипт сам читает `data-src`, рисует кнопку и открывает окно записи;
 * разметкой кнопки мы не управляем и не переопределяем её стили.
 *
 * Монтируется один раз в `app/layout.tsx` — layout переживает клиентские
 * переходы App Router, поэтому дублей контейнера и повторной загрузки
 * скрипта не возникает. `next/script` дополнительно гарантирует, что
 * `round_widget_button.js` подключается ровно один раз за сессию.
 *
 * В отличие от виджета отзывов ПроДокторов (загрузка по клику) кнопка
 * записи нужна на каждой странице, поэтому загружается автоматически —
 * после интерактива, чтобы не тормозить первую отрисовку. Обращение к
 * booking.medflex.ru и состав передаваемых технических данных раскрыты
 * в /privacy и /cookies.
 */

const MEDFLEX_BOOKING_SRC =
  "https://booking.medflex.ru/?user=955425b146d698a2d318a05c8e69867c&isRoundWidget=true";

export function MedflexRoundWidget() {
  return (
    <>
      <div id="medflexRoundWidgetData" data-src={MEDFLEX_BOOKING_SRC} />
      <Script
        id="medflex-round-widget-script"
        src="https://booking.medflex.ru/components/round/round_widget_button.js"
        strategy="afterInteractive"
        charSet="utf-8"
      />
    </>
  );
}
