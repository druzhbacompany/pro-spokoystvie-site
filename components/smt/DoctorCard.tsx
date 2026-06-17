import Image from "next/image";
import Link from "next/link";
import type { Doctor } from "@/lib/data";
import { PhotoPlaceholder } from "./Placeholder";

/** SMT-style doctor card. Photo (or placeholder) + name + role + specialty + chips. */
export function DoctorCard({ d }: { d: Doctor }) {
  const inner = (
    <>
      <div className="relative overflow-hidden rounded-[12px]">
        {d.photo ? (
          <div className="relative aspect-[3/4] bg-[var(--smt-grey)]">
            <Image src={d.photo} alt={`${d.name}, ${d.specialty}`} fill sizes="(max-width:768px) 50vw, 25vw" className="object-cover object-top" />
          </div>
        ) : (
          <PhotoPlaceholder ratio="3/4" />
        )}
      </div>
      {d.role === "chief" ? (
        <span className="smt-chip mt-3 w-fit" style={{ background: "var(--smt-blue)", color: "#fff" }}>Главный врач</span>
      ) : null}
      <h3 className="smt-h3 mt-3">{d.name}</h3>
      <p className="mt-1 text-[14px] smt-muted">{d.specialty}</p>
      <div className="mt-3 flex flex-wrap gap-2">
        {d.helps.slice(0, 3).map((h) => (
          <span key={h} className="smt-chip">{h}</span>
        ))}
      </div>
      <span className="smt-link mt-4 inline-flex items-center gap-1.5">
        {d.href ? "Подробнее →" : "Запись по телефону"}
      </span>
    </>
  );

  const cls = "smt-card smt-card-pad flex h-full flex-col";
  return d.href ? (
    <Link href={d.href} className={`${cls} is-link`} aria-label={`Подробнее о враче: ${d.name}`}>{inner}</Link>
  ) : (
    <div className={cls}>{inner}</div>
  );
}
