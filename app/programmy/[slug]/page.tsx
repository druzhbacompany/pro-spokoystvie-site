import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { SiteHeader } from "@/components/smt/SiteHeader";
import { SiteFooter } from "@/components/smt/SiteFooter";
import { Breadcrumbs } from "@/components/smt/Breadcrumbs";
import { Cta } from "@/components/smt/Cta";
import { TextPlaceholder } from "@/components/smt/Placeholder";
import { PROGRAMS, programBySlug, CLINIC } from "@/lib/data";

export function generateStaticParams() {
  return PROGRAMS.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const p = programBySlug(params.slug);
  if (!p) return {};
  return {
    title: `${p.title} — клиника «ПРО спокойствие»`,
    description: `${p.title}: ${p.forWhom} Состав программы уточняется. Запись: ${CLINIC.phone}.`,
  };
}

export default function ProgramPage({ params }: { params: { slug: string } }) {
  const p = programBySlug(params.slug);
  if (!p) notFound();

  return (
    <div className="smt">
      <SiteHeader active="Программы" />
      <Breadcrumbs items={[{ label: "Главная", href: "/" }, { label: "Программы", href: "/programmy/" }, { label: p.title }]} />
      <main id="main">
        <section className="smt-section smt-section-alt">
          <div className="smt-container max-w-[68ch]">
            <p className="smt-eyebrow">Программа</p>
            <h1 className="smt-h1 mt-2">{p.title}</h1>
            <p className="smt-lead mt-4 smt-muted">{p.forWhom}</p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Link href="#zayavka" className="smt-btn smt-btn-primary">Узнать о программе</Link>
              <a href={CLINIC.phoneHref} className="smt-btn smt-btn-ghost">{CLINIC.phone}</a>
            </div>
          </div>
        </section>

        <section className="smt-section">
          <div className="smt-container grid gap-8 md:grid-cols-2">
            <div>
              <h2 className="smt-h2">О программе</h2>
              <div className="mt-4"><TextPlaceholder label="Описание программы готовится" /></div>
            </div>
            <div>
              <h2 className="smt-h2">Состав программы</h2>
              <div className="mt-4"><TextPlaceholder label="Состав программы уточняется" /></div>
            </div>
          </div>
          <div className="smt-container mt-8">
            <p className="text-[13px] smt-muted">
              Подробности добавляются после согласования. Точный состав, длительность и стоимость подберёт врач на первичной консультации — без обещаний результата.
            </p>
            <Link href="/uslugi/" className="smt-link mt-4 inline-flex">Направления помощи →</Link>
          </div>
        </section>

        <Cta title={`Записаться · ${p.title}`} topic={p.title} sourceBlock="program" alt />
      </main>
      <SiteFooter />
    </div>
  );
}
