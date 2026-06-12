import Link from "next/link";
import { Avatar } from "@/components/ui/Avatar";
import { TagChip } from "@/components/ui/TagChip";
import { Reveal } from "@/components/ui/Reveal";
import { Icon } from "@/components/ui/Icon";
import { DOCTORS, type Doctor } from "@/lib/data";

function DoctorCard({ d, lead }: { d: Doctor; lead: boolean }) {
  const hasPage = Boolean(d.href);
  const inner = (
    <>
      <Avatar doctor={d} ratio="3/4" sizes="(max-width: 768px) 100vw, 33vw" />
      {lead && d.statusBadge ? (
        <span className="mt-4 inline-flex items-center gap-1.5 rounded-tag bg-pine-100 px-3 py-1.5 text-sm font-medium text-pine-700">
          <Icon name="shield" size={16} />
          Главный врач
        </span>
      ) : null}
      <h3 className="type-h3 mt-3 font-serif">{d.name}</h3>
      <p className="type-caption mt-1">{d.specialty}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {d.helps.slice(0, 4).map((h) => (
          <TagChip key={h}>{h}</TagChip>
        ))}
      </div>
      {hasPage ? (
        <span className="mt-5 inline-flex items-center gap-1.5 font-medium text-brand">
          Подробнее <Icon name="arrow" size={18} />
        </span>
      ) : (
        <span className="mt-5 inline-flex items-center gap-1.5 font-medium text-text-muted">
          Запись по телефону
        </span>
      )}
    </>
  );

  const cardCls = `flex h-full flex-col rounded-card border border-border bg-surface p-6 transition-all duration-[200ms] ease-calm ${
    lead ? "shadow-md ring-1 ring-brand-soft" : "shadow-sm"
  } ${hasPage ? "hover:-translate-y-[3px] hover:shadow-md" : ""}`;

  return hasPage ? (
    <Link href={d.href!} className={cardCls} aria-label={`Подробнее о враче: ${d.name}`}>
      {inner}
    </Link>
  ) : (
    <div className={cardCls}>{inner}</div>
  );
}

/** Roster grid. Romanovsky is the lead card, first, with chief badge (DL-NO-DEMOTE). */
export function DoctorsGrid() {
  return (
    <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {DOCTORS.map((d, i) => (
        <Reveal key={d.slug} delay={(i % 3) * 60} as="li">
          <DoctorCard d={d} lead={d.role === "chief"} />
        </Reveal>
      ))}
    </ul>
  );
}
