import Link from "next/link";
import type { Service } from "@/lib/data";

/**
 * SMT-style service card. Always has a working action:
 * - explicit catalogHref (существующий раздел) → "Подробнее"
 * - has detail page → "Подробнее" → /uslugi/[slug]/
 * - no detail page → "Записаться" → contacts form prefilled with service context.
 */
export function ServiceCard({ s }: { s: Service }) {
  const detailHref = s.catalogHref ?? (s.hasPage ? `/uslugi/${s.slug}/` : null);
  const href = detailHref ?? `/kontakty/?service=${encodeURIComponent(s.catalogTitle)}#zayavka`;
  const action = detailHref ? "Подробнее" : "Записаться";

  return (
    <Link href={href} className="smt-card smt-card-pad is-link flex h-full flex-col" aria-label={`${action}: ${s.catalogTitle}`}>
      <h3 className="smt-h3">{s.catalogTitle}</h3>
      <p className="mt-2 flex-1 text-[15px] leading-relaxed smt-muted-strong">{s.catalogBlurb}</p>
      <span className="smt-link mt-4 inline-flex">{action} →</span>
    </Link>
  );
}
