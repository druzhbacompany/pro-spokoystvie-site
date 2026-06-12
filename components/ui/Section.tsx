import type { ReactNode } from "react";

/** Section wrapper enforcing the frozen rhythm (96–128px) and zebra tints. */
export function Section({
  id,
  children,
  alt = false,
  warmField = false,
  className = "",
}: {
  id?: string;
  children: ReactNode;
  alt?: boolean;
  warmField?: boolean;
  className?: string;
}) {
  return (
    <section
      id={id}
      className={`${alt ? "bg-bg-alt" : ""} ${warmField ? "warm-field" : ""} py-14 md:py-24 ${className}`}
      style={id ? { scrollMarginTop: "96px" } : undefined}
    >
      <div className="container-page">{children}</div>
    </section>
  );
}

/** Section opener: horizon hairline + optional eyebrow + heading. */
export function SectionHead({
  eyebrow,
  title,
  lead,
  display = false,
}: {
  eyebrow?: string;
  title: string;
  lead?: string;
  display?: boolean;
}) {
  return (
    <div className="max-w-measure">
      {eyebrow ? <p className="type-eyebrow mb-3">{eyebrow}</p> : null}
      <span className="horizon-line mb-5" aria-hidden />
      <h2 className={display ? "type-display" : "type-h2"}>{title}</h2>
      {lead ? <p className="type-lead mt-4">{lead}</p> : null}
    </div>
  );
}
