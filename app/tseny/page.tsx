import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/smt/SiteHeader";
import { SiteFooter } from "@/components/smt/SiteFooter";
import { Breadcrumbs } from "@/components/smt/Breadcrumbs";
import { PriceTable } from "@/components/smt/PriceTable";
import { Cta } from "@/components/smt/Cta";
import { PRICELIST, PRICELIST_FILE, CLINIC } from "@/lib/data";

export const metadata: Metadata = {
  title: "Цены на услуги клиники в Екатеринбурге — прайс «ПРО спокойствие»",
  description:
    "Стоимость приёмов и услуг клиники «ПРО спокойствие»: психиатрия, психотерапия, психология, неврология. Прозрачный прайс. Окончательная стоимость определяется врачом на приёме.",
};

export default function PricesPage() {
  return (
    <div className="smt">
      <SiteHeader active="Цены" />
      <Breadcrumbs items={[{ label: "Главная", href: "/" }, { label: "Цены" }]} />
      <main id="main">
        <section className="smt-section">
          <div className="smt-container">
            <p className="smt-eyebrow">Прозрачно · Екатеринбург</p>
            <h1 className="smt-h1 mt-2">Цены на услуги</h1>
            <p className="smt-lead mt-4 max-w-[68ch] smt-muted">
              Открытый прайс клиники. Вы знаете стоимость заранее. Окончательный план и цену врач определяет на приёме — без скрытых доплат.
            </p>

            <ul className="mt-8 flex flex-wrap gap-3">
              {PRICELIST.map((sec) => (
                <li key={sec.id}>
                  <Link href={`#${sec.id}`} className="smt-chip is-link" style={{ background: "#fff", border: "1px solid var(--smt-border)" }}>
                    <span style={{ color: "var(--smt-blue)" }}>{sec.number}</span> {sec.title}
                  </Link>
                </li>
              ))}
            </ul>
            <a href={PRICELIST_FILE} download className="smt-btn smt-btn-ghost mt-6">Скачать полный прайс (DOCX)</a>

            <div className="mt-12"><PriceTable /></div>

            <div className="mt-12 max-w-[68ch] smt-card smt-card-pad md:!p-7">
              <h2 className="smt-h3">Важно о стоимости</h2>
              <ul className="mt-4 space-y-3 smt-body smt-muted">
                <li>· Окончательную стоимость лечения врач определяет на приёме.</li>
                <li>· Процедуры, инъекции, капельницы и IV-терапия — по назначению врача и по медицинским показаниям.</li>
                <li>· Где указано «без стоимости препарата» — лекарство оплачивается отдельно.</li>
                <li>· Прайс не является публичной офертой. Запись бесплатна и ни к чему не обязывает.</li>
              </ul>
              <p className="mt-4 text-[14px] smt-muted">Оплата: наличные и банковские карты. Телефон: <a href={CLINIC.phoneHref} className="smt-link">{CLINIC.phone}</a>.</p>
            </div>
          </div>
        </section>
        <Cta title="Записаться на приём" alt />
      </main>
      <SiteFooter />
    </div>
  );
}
