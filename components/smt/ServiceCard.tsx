import Link from "next/link";
import type { Service } from "@/lib/data";

/**
 * SMT-style service card. Always has a working action:
 * - has detail page → "Подробнее" → /uslugi/[slug]/
 * - no detail page → "Записаться" → contacts form prefilled with service context.
 */
export function ServiceCard({ s }: { s: Service }) {
  const href = s.hasPage
    ? `/uslugi/${s.slug}/`
    : `/kontakty/?service=${encodeURIComponent(s.catalogTitle)}#zayavka`;
  const label = s.hasPage ? "Подробнее →" : "Записаться →";

  return (
    <Link href={href} className="smt-card smt-card-pad is-link flex h-full flex-col" aria-label={`${s.hasPage ? "Подробнее" : "Записаться"}: ${s.catalogTitle}`}>
      <h3 className="smt-h3">{s.catalogTitle}</h3>
      <p className="mt-2 flex-1 text-[15px] leading-relaxed smt-muted">{s.catalogBlurb}</p>
      <span className="smt-link mt-4 inline-flex">{label}</span>
    </Link>
  );
}
