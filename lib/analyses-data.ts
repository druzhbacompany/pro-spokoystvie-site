import raw from "@/data/helix/ekaterinburg-analyses.json";
import type { CatalogItem } from "@/lib/analyses";

/**
 * Данные каталога партнёрской лаборатории Хеликс (Екатеринбург),
 * выгрузка: data/helix/ekaterinburg-analyses.json.
 *
 * ТОЛЬКО ДЛЯ СЕРВЕРНЫХ КОМПОНЕНТОВ. Модуль статически импортирует ~578 КБ
 * JSON; любой импорт из компонента с "use client" утянет всю выгрузку в
 * браузерный бандл. Клиентским частям нужен lib/analyses.ts (типы и формат).
 */

type RawItem = {
  type: string;
  code: string;
  title: string;
  price: number | null;
  turnaround_time: string | null;
  scraped_at: string | null;
};

/** Хвост срока повторяется в 1000+ записей — выносим его в текст секции. */
const TERM_NOTE_RE = /\.\s*Указанный срок не включает день взятия биоматериала\.?\s*$/;

function toShortTerm(value: string | null): string {
  if (!value) return "";
  return value.replace(TERM_NOTE_RE, "").trim();
}

const items: CatalogItem[] = (raw as RawItem[])
  .filter((x): x is RawItem & { price: number } => typeof x.price === "number")
  .map((x) => ({
    code: x.code,
    title: x.title,
    type: x.type === "complex" ? "complex" : "analysis",
    price: x.price,
    term: toShortTerm(x.turnaround_time),
  }));

/** Позиции каталога. Порядок — как в выгрузке лаборатории. */
export function getAnalyses(): CatalogItem[] {
  return items;
}

export const ANALYSES_STATS = {
  total: items.length,
  analyses: items.filter((x) => x.type === "analysis").length,
  complexes: items.filter((x) => x.type === "complex").length,
} as const;

/** Дата выгрузки каталога (из scraped_at), формат ДД.ММ.ГГГГ. */
export const CATALOG_UPDATED: string = (() => {
  const stamps = (raw as RawItem[]).map((x) => x.scraped_at).filter(Boolean) as string[];
  const latest = stamps.sort().at(-1);
  const d = latest ? new Date(latest) : new Date();
  return new Intl.DateTimeFormat("ru-RU", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    timeZone: "Europe/Moscow",
  }).format(d);
})();

/** Обязательный дисклеймер страницы (цены, сроки, доступность). */
export const CATALOG_DISCLAIMER =
  `Каталог обновлён: ${CATALOG_UPDATED}. Стоимость, сроки выполнения и доступность ` +
  "исследований могут изменяться и уточняются при записи. Лабораторные исследования " +
  "выполняются партнёрской лабораторией Хеликс.";
