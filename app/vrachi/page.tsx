import type { Metadata } from "next";
import { SiteHeader } from "@/components/smt/SiteHeader";
import { SiteFooter } from "@/components/smt/SiteFooter";
import { Breadcrumbs } from "@/components/smt/Breadcrumbs";
import { DoctorCard } from "@/components/smt/DoctorCard";
import { Cta } from "@/components/smt/Cta";
import { DOCTORS, type Doctor } from "@/lib/data";

export const metadata: Metadata = {
  title: "Врачи клиники — психиатры, психотерапевты, психологи, невролог",
  description:
    "Специалисты клиники «ПРО спокойствие»: психиатры, психотерапевты, психологи и невролог. Главный врач — Романовский В.О. Реальные врачи, лицензия Минздрава.",
};

const GROUPS: { title: string; match: (d: Doctor) => boolean }[] = [
  { title: "Психиатрия и психотерапия", match: (d) => /психиатр|психотерапевт/i.test(d.specialty) },
  { title: "Психология", match: (d) => /психолог/i.test(d.specialty) && !/психиатр/i.test(d.specialty) },
  { title: "Неврология", match: (d) => /невролог/i.test(d.specialty) },
];

export default function DoctorsIndexPage() {
  const used = new Set<string>();
  return (
    <div className="smt">
      <SiteHeader active="Врачи" />
      <Breadcrumbs items={[{ label: "Главная", href: "/" }, { label: "Врачи" }]} />
      <main id="main">
        <section className="smt-section">
          <div className="smt-container">
            <p className="smt-eyebrow">Наши специалисты</p>
            <h1 className="smt-h1 mt-2">Врачи клиники</h1>
            <p className="smt-lead mt-4 max-w-[68ch] smt-muted">
              Психиатры, психотерапевты, психологи и невролог работают вместе под единым стандартом помощи. Реальные врачи, лицензия Минздрава.
            </p>

            <div className="mt-10 space-y-12">
              {GROUPS.map((g) => {
                const list = DOCTORS.filter((d) => g.match(d) && !used.has(d.slug));
                list.forEach((d) => used.add(d.slug));
                if (!list.length) return null;
                return (
                  <div key={g.title}>
                    <h2 className="smt-h2 mb-5">{g.title}</h2>
                    <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                      {list.map((d) => (<li key={d.slug}><DoctorCard d={d} /></li>))}
                    </ul>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
        <Cta alt />
      </main>
      <SiteFooter />
    </div>
  );
}
