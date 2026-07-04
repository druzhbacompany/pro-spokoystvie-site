import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/smt/SiteHeader";
import { SiteFooter } from "@/components/smt/SiteFooter";
import { Breadcrumbs } from "@/components/smt/Breadcrumbs";
import { Cta } from "@/components/smt/Cta";
import { PRICELIST, CLINIC } from "@/lib/data";

export const metadata: Metadata = {
  title: "Процедурный кабинет — инъекции и инфузии | «ПРО спокойствие», Екатеринбург",
  description:
    "Процедурный кабинет клиники «ПРО спокойствие»: внутримышечные и внутривенные инъекции, инфузии по назначению врача. Цены по прайсу. Имеются противопоказания.",
};

/** Страница процедурного кабинета (P0). Данные — напрямую из PRICELIST (раздел 06), без дублирования. */
export default function ProcedureRoomPage() {
  const section = PRICELIST.find((s) => s.id === "procedurnyy");
  return (
    <div className="smt">
      <SiteHeader active="Услуги" />
      <Breadcrumbs items={[{ label: "Главная", href: "/" }, { label: "Услуги", href: "/uslugi/" }, { label: "Процедурный кабинет" }]} />
      <main id="main">
        {/* Hero */}
        <section className="smt-section smt-section-alt">
          <div className="smt-container max-w-[68ch]">
            <p className="smt-eyebrow">Манипуляции · Екатеринбург</p>
            <h1 className="smt-h1 mt-2">Процедурный кабинет</h1>
            <p className="smt-lead mt-4 smt-muted">
              Внутримышечные и внутривенные инъекции, инфузии — по назначению врача клиники или по назначению вашего лечащего врача (при наличии назначения).
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              <span className="smt-chip">По назначению врача</span>
              <span className="smt-chip">от 300 ₽</span>
            </div>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Link href="#zayavka" className="smt-btn smt-btn-primary">Записаться</Link>
              <a href={CLINIC.phoneHref} className="smt-btn smt-btn-ghost">{CLINIC.phone}</a>
            </div>
          </div>
        </section>

        {/* Прайс раздела */}
        <section className="smt-section">
          <div className="smt-container">
            <h2 className="smt-h2">Стоимость</h2>
            {section?.groups.map((group) => (
              <div key={group.title} className="mt-8">
                <h3 className="smt-h3">{group.title}</h3>
                <div className="mt-4 max-w-2xl space-y-3">
                  {group.items.map((row) => (
                    <div key={row.code} className="smt-card smt-card-pad flex items-center justify-between gap-4">
                      <p className="text-[15px] font-semibold" style={{ color: "var(--smt-dark)" }}>{row.name}</p>
                      <span className="whitespace-nowrap text-[17px] font-bold tabular-nums" style={{ color: "var(--smt-dark)" }}>{row.price}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
            {section?.note ? <p className="mt-6 max-w-2xl text-[13px] smt-muted">{section.note}</p> : null}
            <Link href="/tseny/" className="smt-link mt-4 inline-flex">Полный прайс клиники →</Link>
          </div>
        </section>

        {/* Дисклеймер */}
        <section className="smt-section smt-section-alt">
          <div className="smt-container max-w-[68ch] smt-card smt-card-pad md:!p-7">
            <h2 className="smt-h3">Важно знать</h2>
            <ul className="mt-4 space-y-3 smt-body smt-muted">
              <li>· Инъекции и инфузии выполняются по назначению врача.</li>
              <li>· Где указано «без стоимости препарата» — лекарство оплачивается отдельно.</li>
              <li>· Возьмите с собой назначение врача, если процедура назначена вне нашей клиники.</li>
            </ul>
            <p className="mt-4 text-[15px] font-semibold" style={{ color: "var(--smt-dark)" }}>
              Имеются противопоказания. Необходима консультация специалиста.
            </p>
          </div>
        </section>

        <Cta title="Записаться в процедурный кабинет" topic="Процедурный кабинет" alt />
      </main>
      <SiteFooter />
    </div>
  );
}
