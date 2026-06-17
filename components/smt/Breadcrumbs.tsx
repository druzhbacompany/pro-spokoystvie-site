import Link from "next/link";

type Crumb = { label: string; href?: string };

/** SMT-style 2-level breadcrumbs. Last item is current (not a link). */
export function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Хлебные крошки" className="smt-container pt-4">
      <ol className="flex flex-wrap items-center gap-2 text-[13px]" style={{ color: "var(--smt-muted)" }}>
        {items.map((item, i) => {
          const last = i === items.length - 1;
          return (
            <li key={item.label} className="flex items-center gap-2">
              {item.href && !last ? (
                <Link href={item.href} className="hover:opacity-80">{item.label}</Link>
              ) : (
                <span aria-current={last ? "page" : undefined} style={{ color: "var(--smt-dark)" }}>{item.label}</span>
              )}
              {!last ? <span aria-hidden>›</span> : null}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
