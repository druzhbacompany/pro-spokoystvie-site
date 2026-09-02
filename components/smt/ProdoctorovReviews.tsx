"use client";

import Script from "next/script";
import { useEffect, useRef, useState } from "react";

/**
 * Виджет отзывов ПроДокторов (общий по клинике, ЛПУ 112791) — с загрузкой по клику.
 *
 * Пока юридические документы сайта не описывают сторонние виджеты, внешний
 * сервис не должен получать данные посетителя без его действия. Поэтому до
 * клика на странице нет ничего с домена prodoctorov.ru: ни скрипта площадки,
 * ни её логотипа, ни запросов к её API — только наша заглушка с кнопкой.
 *
 * После клика монтируется вендорная разметка (id, data-lpu и ссылки — как в
 * коде из кабинета ПроДокторов) и через next/script подключается скрипт
 * площадки; он сам наполняет `#pd_widget_big_content` и снимает `hidden`.
 * React содержимым виджета не управляет — оно приходит извне.
 *
 * Если скрипт не загрузился (блокировщик, нет сети, сбой площадки), остаётся
 * ссылка на страницу клиники: пустого блока не появляется.
 *
 * Рейтинг и тексты отзывов не дублируются в коде — только то, что отдаёт виджет.
 */

const PD_LPU_URL = "https://prodoctorov.ru/ekaterinburg/lpu/112791-medicinskiy-centr-pro-spokoystvie/#otzivi";

type Mode = "idle" | "loading" | "ready" | "unavailable";

export function ProdoctorovReviews() {
  const widgetRef = useRef<HTMLDivElement>(null);
  const [mode, setMode] = useState<Mode>("idle");

  useEffect(() => {
    if (mode === "idle" || mode === "ready") return;
    const el = widgetRef.current;
    if (!el) return;

    const check = () => {
      const content = el.querySelector("#pd_widget_big_content");
      if (!el.hasAttribute("hidden") || (content?.childNodes.length ?? 0) > 0) {
        setMode("ready");
        return true;
      }
      return false;
    };

    if (check()) return;

    const observer = new MutationObserver(() => {
      if (check()) observer.disconnect();
    });
    observer.observe(el, {
      attributes: true,
      attributeFilter: ["hidden"],
      childList: true,
      subtree: true,
    });

    // Ждём площадку только на первой попытке; дальше остаётся ссылка-заглушка,
    // но наблюдение продолжается — виджет может приехать и позже.
    const timer = mode === "loading" ? window.setTimeout(() => setMode("unavailable"), 6000) : undefined;

    return () => {
      observer.disconnect();
      if (timer) window.clearTimeout(timer);
    };
  }, [mode]);

  return (
    <section className="smt-section" aria-labelledby="otzyvy-title">
      <div className="smt-container">
        <p className="smt-eyebrow">Отзывы</p>
        <h2 id="otzyvy-title" className="smt-h2 mt-2">Отзывы о клинике</h2>
        <p className="mt-3 max-w-[68ch] smt-body smt-muted-strong">
          Отзывы публикуются на независимой площадке ПроДокторов — мы не редактируем их
          на своей стороне.
        </p>

        <div className="pd-widget-shell mt-8 smt-card smt-card-pad md:!p-7">
          {mode === "idle" ? (
            <div className="max-w-[68ch]">
              <p className="smt-body smt-muted-strong">
                Отзывы загружаются с сайта ПроДокторов. Если нажать кнопку, браузер обратится
                к сервису prodoctorov.ru и передаст ему технические данные соединения —
                IP-адрес, сведения о браузере и адрес этой страницы.
              </p>
              <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center">
                <button
                  type="button"
                  className="smt-btn smt-btn-ghost"
                  onClick={() => setMode("loading")}
                >
                  Показать отзывы ПроДокторов
                </button>
                <a
                  className="smt-link"
                  target="_blank"
                  rel="noopener noreferrer"
                  href={PD_LPU_URL}
                >
                  Открыть отзывы на ПроДокторов →
                </a>
              </div>
            </div>
          ) : null}

          {/* Вендорная разметка ПроДокторов — монтируется только после клика.
              data-lpu, id и ссылки площадки оставлены без изменений. */}
          {mode !== "idle" ? (
            <>
              <div ref={widgetRef} id="pd_widget_big" data-lpu="112791" hidden>
                <div className="pd_rate_header">
                  Отзывы о медицинском центре «Про спокойствие»
                  <br />
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    className="pd_rate_new"
                    href="https://prodoctorov.ru/new/rate/lpu/112791/"
                  >
                    Оставить отзыв
                  </a>
                </div>
                <div id="pd_widget_big_content" />
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href={PD_LPU_URL}
                  className="pd_read_all"
                >
                  Читать все отзывы
                </a>
                <span id="pd_powered_by">
                  <a target="_blank" rel="noopener noreferrer" href="https://prodoctorov.ru">
                    {/* eslint-disable-next-line @next/next/no-img-element -- логотип площадки, отдаётся с домена ПроДокторов */}
                    <img
                      className="pd_logo"
                      src="https://prodoctorov.ru/static/_v1/pd/logos/logo-pd-widget.png"
                      alt="ПроДокторов"
                    />
                  </a>
                </span>
              </div>

              {mode === "loading" ? (
                <p className="smt-body smt-muted" aria-live="polite">Загружаем отзывы с ПроДокторов…</p>
              ) : null}

              {/* Виджет не отрисовался — вместо пустого блока даём прямую ссылку. */}
              {mode === "unavailable" ? (
                <div className="smt-body smt-muted-strong" aria-live="polite">
                  <p>Не удалось загрузить виджет отзывов. Отзывы о клинике доступны на площадке.</p>
                  <a
                    className="smt-link mt-3 inline-flex"
                    target="_blank"
                    rel="noopener noreferrer"
                    href={PD_LPU_URL}
                  >
                    Читать отзывы на ПроДокторов →
                  </a>
                </div>
              ) : null}

              <Script
                src="https://prodoctorov.ru/static/js/widget_big.js?v07"
                strategy="afterInteractive"
                onError={() => setMode("unavailable")}
              />
            </>
          ) : null}
        </div>
      </div>
    </section>
  );
}
