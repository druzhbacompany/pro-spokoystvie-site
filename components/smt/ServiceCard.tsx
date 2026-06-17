import Link from "next/link";
import type { Service } from "@/lib/data";

/** SMT-style service card. Title + blurb + link (or phone note). */
export function ServiceCard({ s }: { s: Service }) {
  const inner = (
    <>
      <h3 className="smt-h3">{s.catalogTitle}</h3>
      <p className="mt-2 flex-1 text-[15px] leading-relaxed smt-muted">{s.catalogBlurb}</p>
      <span className={s.hasPage ? "smt-link mt-4 inline-flex" : "mt-4 inline-flex text-[14px] smt-muted"}>
        {s.hasPage ? "Подробнее →" : "Запись по телефону"}
      </span>
    </>
  );
  const cls = "smt-card smt-card-pad flex h-full flex-col";
  return s.hasPage ? (
    <Link href={`/uslugi/${s.slug}/`} className={`${cls} is-link`} aria-label={`Подробнее: ${s.catalogTitle}`}>{inner}</Link>
  ) : (
    <div className={cls}>{inner}</div>
  );
}
