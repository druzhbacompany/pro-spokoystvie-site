import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/smt/SiteHeader";
import { SiteFooter } from "@/components/smt/SiteFooter";
import { Breadcrumbs } from "@/components/smt/Breadcrumbs";
import { Cta } from "@/components/smt/Cta";
import { PROGRAMS } from "@/lib/data";

export const metadata: Metadata = {
  title: "Программы лечения — клиника «ПРО спокойствие» в Екатеринбурге",
  description:
    "Комплексные программы клиники «ПРО спокойствие»: работа с тревогой, восстановление сна, поддержка ремиссии, восстановление после стресса. Состав уточняется.",
};

export default function ProgramsIndexPage() {
  return (
    <div className="smt">
      <SiteHeader active="Программы" />
      <Breadcrumbs items={[{ label: "Главная", href: "/" }, { label: "Программы" }]} />
      <main id="main">
        <section className="smt-section">
          <div className="smt-container">
            <p className="smt-eyebrow">Комплексная помощь</p>
            <h1 className="smt-h1 mt-2">Программы</h1>
            <p className="smt-lead mt-4 max-w-[68ch] smt-muted">
              Комплексные программы — это путь из нескольких шагов с понятным горизонтом. Состав и стоимость программ уточняются; оставьте заявку — расскажем подробно и подберём формат.
            </p>
            <ul className="mt-10 grid gap-6 sm:grid-cols-2">
              {PROGRAMS.map((p) => (
                <li key={p.slug}>
                  <Link href={`/programmy/${p.slug}/`} className="smt-card smt-card-pad is-link flex h-full flex-col" aria-label={`Подробнее: ${p.title}`}>
                    <h2 className="smt-h3">{p.title}</h2>
                    <p className="mt-2 text-[14px]" style={{ color: "var(--smt-blue)" }}>{p.forWhom}</p>
                    <p className="mt-3 flex-1 text-[15px] leading-relaxed smt-muted">{p.blurb}</p>
                    <span className="smt-link mt-4 inline-flex">Подробнее →</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
        <Cta title="Узнать о программах" sourceBlock="programmy-index" alt />
      </main>
      <SiteFooter />
    </div>
  );
}
