import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/smt/SiteHeader";
import { SiteFooter } from "@/components/smt/SiteFooter";
import { Breadcrumbs } from "@/components/smt/Breadcrumbs";
import { Cta } from "@/components/smt/Cta";
import { IV_GROUPS, IV_DISCLAIMER, CLINIC } from "@/lib/data";

export const metadata: Metadata = {
  title: "IV-терапия (капельницы) — цены и программы | «ПРО спокойствие», Екатеринбург",
  description:
    "Оздоровительные капельницы в клинике «ПРО спокойствие»: восстановление и энергия, антистресс, иммунитет, красота, спорт. По назначению врача, цены по прайсу. Имеются противопоказания.",
};

/** Хаб IV-терапии (P0). Витринные названия утверждены собственником; цены = PRICELIST раздел 05. */
export default function IvTherapyPage() {
  return (
    <div className="smt">
      <SiteHeader active="IV-терапия" />
      <Breadcrumbs items={[{ label: "Главная", href: "/" }, { label: "Услуги", href: "/uslugi/" }, { label: "IV-терапия" }]} />
      <main id="main">
        {/* Hero */}
        <section className="smt-section smt-section-alt">
          <div className="smt-container max-w-[68ch]">
            <p className="smt-eyebrow">Оздоровительные капельницы · Екатеринбург</p>
            <h1 className="smt-h1 mt-2">IV-терапия</h1>
            <p className="smt-lead mt-4 smt-muted">
              Внутривенные витаминно-минеральные программы для поддержки организма: восстановление, антистресс, иммунитет, красота и спорт. Проводятся в процедурном кабинете клиники по назначению врача.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              <span className="smt-chip">По назначению врача</span>
              <span className="smt-chip">Состав подбирается индивидуально</span>
              <span className="smt-chip">от 2 500 ₽</span>
            </div>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Link href="#zayavka" className="smt-btn smt-btn-primary">Записаться на консультацию</Link>
              <a href={CLINIC.phoneHref} className="smt-btn smt-btn-ghost">{CLINIC.phone}</a>
            </div>
          </div>
        </section>

        {/* Как проходит */}
        <section className="smt-section">
          <div className="smt-container">
            <h2 className="smt-h2">Как проходит</h2>
            <ol className="mt-8 grid gap-5 md:grid-cols-3">
              {[
                { title: "Консультация врача", text: "Врач оценивает состояние, показания и противопоказания, подбирает состав." },
                { title: "Назначение программы", text: "Индивидуальный план: программа, количество процедур, при необходимости — анализы." },
                { title: "Процедура 40–60 минут", text: "Капельница в процедурном кабинете под наблюдением медицинского персонала." },
              ].map((step, i) => (
                <li key={step.title} className="smt-card smt-card-pad">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full text-[15px] font-bold" style={{ background: "var(--smt-blue-bg)", color: "var(--smt-dark)" }}>{i + 1}</span>
                  <h3 className="mt-3 text-[16px] font-semibold" style={{ color: "var(--smt-dark)" }}>{step.title}</h3>
                  <p className="mt-2 text-[14px] smt-muted">{step.text}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Программы по целям */}
        <section className="smt-section smt-section-alt">
          <div className="smt-container">
            <h2 className="smt-h2">Программы IV-терапии</h2>
            <p className="smt-lead mt-3 max-w-[68ch] smt-muted">
              {IV_GROUPS.reduce((n, g) => n + g.items.length, 0)} программ в {IV_GROUPS.length} направлениях. Цены соответствуют утверждённому прайсу клиники.
            </p>
            <div className="mt-10 space-y-12">
              {IV_GROUPS.map((group) => (
                <div key={group.title}>
                  <h3 className="smt-h3">{group.title}</h3>
                  <p className="mt-1 text-[15px] smt-muted">{group.blurb}</p>
                  <ul className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {group.items.map((item) => (
                      <li key={item.code} className="smt-card smt-card-pad flex h-full flex-col">
                        <div className="flex items-start justify-between gap-3">
                          <h4 className="text-[16px] font-semibold" style={{ color: "var(--smt-dark)" }}>{item.title}</h4>
                          <span className="whitespace-nowrap text-[16px] font-bold tabular-nums" style={{ color: "var(--smt-dark)" }}>{item.price}</span>
                        </div>
                        <p className="mt-2 flex-1 text-[14px] smt-muted">{item.forWhat}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <Link href="/tseny/" className="smt-link mt-8 inline-flex">Полный прайс клиники →</Link>
          </div>
        </section>

        {/* Дисклеймер */}
        <section className="smt-section">
          <div className="smt-container max-w-[68ch] smt-card smt-card-pad md:!p-7">
            <h2 className="smt-h3">Важно знать</h2>
            <p className="mt-4 smt-body smt-muted">{IV_DISCLAIMER}</p>
            <p className="mt-4 text-[15px] font-semibold" style={{ color: "var(--smt-dark)" }}>
              Имеются противопоказания. Необходима консультация специалиста.
            </p>
          </div>
        </section>

        <Cta title="Записаться на IV-терапию" topic="IV-терапия" alt />
      </main>
      <SiteFooter />
    </div>
  );
}
