"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { formatPrice, PRICE_HINT, type CatalogItem } from "@/lib/analyses";

/**
 * Каталог исследований: поиск, фильтр по типу, порционный вывод.
 *
 * Датасет — 1070 позиций, поэтому список рендерится порциями по PAGE_SIZE
 * («Показать ещё»), а фильтрация идёт по подготовленному индексу без
 * пересборки строк на каждое нажатие клавиши.
 *
 * Это НЕ магазин: корзины и оформления заказа нет — только запись на приём.
 * Каждая цена сопровождается пояснением PRICE_HINT.
 */

const PAGE_SIZE = 24;

type Filter = "all" | "analysis" | "complex";

const FILTERS: { id: Filter; label: string }[] = [
  { id: "all", label: "Все" },
  { id: "analysis", label: "Анализы" },
  { id: "complex", label: "Комплексы" },
];

const TYPE_LABEL: Record<CatalogItem["type"], string> = {
  analysis: "Анализ",
  complex: "Комплекс",
};

/** ё/Ё → е, нижний регистр: поиск не должен зависеть от раскладки написания. */
const normalize = (s: string) => s.toLowerCase().replace(/ё/g, "е").trim();
/** «02-011», «02 011», «02011» должны находить одну и ту же позицию. */
const digitsOnly = (s: string) => s.replace(/[^0-9a-zа-я]/gi, "").toLowerCase();

/** Ссылка на форму записи с контекстом позиции (паттерн прайса, /kontakty/). */
const bookHref = (item: CatalogItem) =>
  `/kontakty/?${new URLSearchParams({
    priceItem: `${item.title} (${item.code})`,
    price: `цена по каталогу ${formatPrice(item.price)} ₽`,
  }).toString()}#zayavka`;

export function AnalysesCatalog({ items }: { items: CatalogItem[] }) {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<Filter>("all");
  const [shown, setShown] = useState(PAGE_SIZE);

  // Поисковый индекс считается один раз, а не на каждый ввод символа.
  const indexed = useMemo(
    () => items.map((item) => ({ item, title: normalize(item.title), code: digitsOnly(item.code) })),
    [items],
  );

  const counts = useMemo(
    () => ({
      all: items.length,
      analysis: items.filter((x) => x.type === "analysis").length,
      complex: items.filter((x) => x.type === "complex").length,
    }),
    [items],
  );

  const found = useMemo(() => {
    const q = normalize(query);
    const qCode = digitsOnly(query);
    return indexed
      .filter(({ item }) => (filter === "all" ? true : item.type === filter))
      .filter(({ title, code }) => {
        if (!q) return true;
        if (title.includes(q)) return true;
        return qCode.length > 0 && code.includes(qCode);
      })
      .map(({ item }) => item);
  }, [indexed, query, filter]);

  const visible = found.slice(0, shown);
  const rest = found.length - visible.length;

  return (
    <div>
      {/* Поиск и фильтры */}
      <div className="smt-card smt-card-pad md:!p-6">
        <label htmlFor="analysis-search" className="block text-[15px] font-semibold" style={{ color: "var(--smt-dark)" }}>
          Поиск по названию или коду
        </label>
        <input
          id="analysis-search"
          type="search"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setShown(PAGE_SIZE);
          }}
          placeholder="Например: ферритин, витамин D или 02-011"
          autoComplete="off"
          className="smt-input mt-3"
        />

        <div role="group" aria-label="Фильтр по типу исследования" className="mt-4 flex flex-wrap gap-2">
          {FILTERS.map((f) => {
            const active = filter === f.id;
            return (
              <button
                key={f.id}
                type="button"
                aria-pressed={active}
                onClick={() => {
                  setFilter(f.id);
                  setShown(PAGE_SIZE);
                }}
                className="min-h-[40px] rounded-full px-4 text-[14px] font-medium transition-colors"
                style={
                  active
                    ? { background: "var(--smt-blue)", color: "#fff" }
                    : { background: "#fff", border: "1px solid var(--smt-border)", color: "var(--smt-dark)" }
                }
              >
                {f.label}{" "}
                <span className="tabular-nums" style={{ opacity: 0.7 }}>
                  {counts[f.id]}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <p aria-live="polite" className="mt-5 text-[14px] smt-muted">
        {found.length > 0
          ? `Найдено позиций: ${found.length} · показано ${visible.length}`
          : "Ничего не найдено"}
      </p>

      {/* Список позиций */}
      {found.length > 0 ? (
        <>
          <ul className="mt-4 space-y-3">
            {visible.map((item) => (
              <li key={item.code} className="smt-card px-4 py-4 sm:px-5 sm:py-5">
                <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between md:gap-8">
                  <div className="min-w-0 md:flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className={item.type === "complex" ? "smt-chip" : "smt-chip smt-chip-outline"}>
                        {TYPE_LABEL[item.type]}
                      </span>
                      <span className="text-[13px] tabular-nums smt-muted">№ {item.code}</span>
                    </div>
                    <h3 className="mt-2 text-[17px] font-semibold leading-snug" style={{ color: "var(--smt-dark)" }}>
                      {item.title}
                    </h3>
                    {item.term ? <p className="mt-2 text-[14px] smt-muted">Срок выполнения: {item.term}</p> : null}
                  </div>

                  <div className="md:w-[260px] md:shrink-0 md:text-right">
                    <p className="text-[13px] smt-muted">Цена по каталогу</p>
                    <p className="text-[20px] font-bold tabular-nums" style={{ color: "var(--smt-dark)" }}>
                      {formatPrice(item.price)} ₽
                    </p>
                    {/* Оговорка о цене — читаемым тоном, а не приглушённым: это существенное условие. */}
                    <p className="mt-1 text-balance text-[13px]" style={{ color: "var(--smt-text)" }}>
                      {PRICE_HINT}
                    </p>
                    <Link
                      href={bookHref(item)}
                      className="smt-btn smt-btn-ghost mt-3 w-full"
                      aria-label={`Записаться на исследование: ${item.title}, код ${item.code}`}
                    >
                      Записаться
                    </Link>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          {rest > 0 ? (
            <div className="mt-6 flex justify-center">
              <button type="button" onClick={() => setShown((v) => v + PAGE_SIZE)} className="smt-btn smt-btn-ghost">
                Показать ещё {Math.min(PAGE_SIZE, rest)} из {rest}
              </button>
            </div>
          ) : null}
        </>
      ) : (
        <div className="smt-card smt-card-pad mt-4 md:!p-6">
          <p className="smt-body" style={{ color: "var(--smt-dark)" }}>
            По этому запросу анализ не найден. Оставьте заявку — администратор уточнит возможность сдачи.
          </p>
          <Link href="#zayavka" className="smt-btn smt-btn-primary mt-4">
            Оставить заявку
          </Link>
        </div>
      )}
    </div>
  );
}
