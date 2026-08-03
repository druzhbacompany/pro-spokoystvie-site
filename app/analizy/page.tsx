import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/smt/SiteHeader";
import { SiteFooter } from "@/components/smt/SiteFooter";
import { Breadcrumbs } from "@/components/smt/Breadcrumbs";
import { Cta } from "@/components/smt/Cta";
import { AnalysesCatalog } from "@/components/analizy/AnalysesCatalog";
import { getAnalyses, ANALYSES_STATS, CATALOG_DISCLAIMER } from "@/lib/analyses-data";
import { TERM_NOTE } from "@/lib/analyses";
import { CLINIC } from "@/lib/data";

/**
 * Каталог лабораторных исследований.
 *
 * Позиционирование: клиника — точка приёма биоматериала. Исследования выполняет
 * партнёрская лаборатория Хеликс. Цены из каталога справочные, окончательная
 * стоимость, сроки и доступность уточняются при записи (см. CATALOG_DISCLAIMER).
 * Никакой корзины/оформления заказа — только запись на приём.
 */

export const metadata: Metadata = {
  // absolute — чтобы не приклеивался шаблон layout и заголовок был точным.
  title: { absolute: "Анализы в Екатеринбурге | ПРО Спокойствие" },
  description:
    "Сдача анализов в Екатеринбурге по каталогу партнёрской лаборатории Хеликс. Приём биоматериала в клинике ПРО Спокойствие по предварительной записи.",
  alternates: { canonical: "/analizy" },
  robots: { index: true, follow: true },
};

const STEPS = [
  {
    title: "Записываетесь",
    text: "Оставляете заявку или звоните администратору. Уточняем нужное исследование, подготовку, актуальные сроки и стоимость.",
  },
  {
    title: "Сдаёте биоматериал в клинике",
    text: "Приходите в назначенное время: забор выполняет медицинская сестра процедурного кабинета. Филиал и время подтверждаем при записи.",
  },
  {
    title: "Биоматериал передаётся в лабораторию",
    text: "Мы передаём образцы в партнёрскую лабораторию Хеликс — исследования выполняет она.",
  },
  {
    title: "Получаете результат",
    text: "Срок готовности и способ получения результата уточняются при записи и определяются правилами лаборатории.",
  },
];

export default function AnalysesPage() {
  const items = getAnalyses();

  return (
    <div className="smt">
      <SiteHeader active="Анализы" />
      <Breadcrumbs items={[{ label: "Главная", href: "/" }, { label: "Анализы" }]} />
      <main id="main">
        {/* Hero */}
        <section className="smt-section smt-section-alt">
          <div className="smt-container max-w-[72ch]">
            <p className="smt-eyebrow">Лабораторная диагностика · Екатеринбург</p>
            <h1 className="smt-h1 mt-2">Анализы в Екатеринбурге</h1>
            <p className="smt-lead mt-4 smt-muted">
              В ПРО Спокойствие можно сдать анализы по каталогу партнёрской лаборатории Хеликс. Мы принимаем биоматериал
              по предварительной записи и передаём его в лабораторию для выполнения исследований.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              <span className="smt-chip">{ANALYSES_STATS.total} позиций каталога</span>
              <span className="smt-chip">{ANALYSES_STATS.analyses} анализов</span>
              <span className="smt-chip">{ANALYSES_STATS.complexes} комплексов</span>
              <span className="smt-chip smt-chip-outline">По предварительной записи</span>
            </div>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Link href="#zayavka" className="smt-btn smt-btn-primary">
                Записаться на сдачу анализов
              </Link>
              <a href={CLINIC.phoneHref} className="smt-btn smt-btn-ghost">
                {CLINIC.phone}
              </a>
            </div>
            {/* Обязательная оговорка — читаемым тоном, не приглушённым. */}
            <p className="mt-6 text-[14px]" style={{ color: "var(--smt-text)" }}>
              Стоимость, сроки и доступность исследований уточняются при записи.
            </p>
          </div>
        </section>

        {/* Как это работает */}
        <section className="smt-section">
          <div className="smt-container">
            <h2 className="smt-h2">Как это работает</h2>
            <p className="smt-lead mt-3 max-w-[68ch] smt-muted">
              Клиника принимает биоматериал и передаёт его в лабораторию. Лабораторные исследования выполняет партнёрская
              лаборатория Хеликс.
            </p>
            <ol className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {STEPS.map((step, i) => (
                <li key={step.title} className="smt-card smt-card-pad">
                  <span
                    className="flex h-9 w-9 items-center justify-center rounded-full text-[15px] font-bold"
                    style={{ background: "var(--smt-blue-bg)", color: "var(--smt-dark)" }}
                  >
                    {i + 1}
                  </span>
                  <h3 className="mt-3 text-[16px] font-semibold" style={{ color: "var(--smt-dark)" }}>
                    {step.title}
                  </h3>
                  <p className="mt-2 text-[14px] smt-muted">{step.text}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Каталог */}
        <section className="smt-section smt-section-alt">
          <div className="smt-container">
            <h2 className="smt-h2">Каталог исследований</h2>
            <p className="smt-lead mt-3 max-w-[68ch] smt-muted">
              Справочный каталог партнёрской лаборатории для Екатеринбурга. Найдите исследование по названию или коду —
              и запишитесь, администратор подтвердит актуальную стоимость, сроки и доступность.
            </p>
            <p className="mt-3 max-w-[68ch] text-[14px] smt-muted">{TERM_NOTE}</p>

            <div className="mt-8">
              <AnalysesCatalog items={items} />
            </div>
          </div>
        </section>

        {/* Дисклеймер */}
        <section className="smt-section">
          <div className="smt-container">
            <div className="smt-card smt-card-pad max-w-[72ch] md:!p-7">
              <h2 className="smt-h3">Важно о ценах и сроках</h2>
              <p className="mt-4 smt-body" style={{ color: "var(--smt-text)" }}>
                {CATALOG_DISCLAIMER}
              </p>
              <ul className="mt-4 space-y-3 smt-body smt-muted">
                <li>· Цены в каталоге справочные и не являются публичной офертой.</li>
                <li>· Клиника принимает биоматериал; исследования выполняет партнёрская лаборатория Хеликс.</li>
                <li>· Подготовка к исследованию и правила выдачи результата уточняются при записи.</li>
              </ul>
              <p className="mt-4 text-[14px] smt-muted">
                Информация на странице носит справочный характер и не заменяет консультацию специалиста.
              </p>
              <p className="mt-4 text-[15px] font-semibold" style={{ color: "var(--smt-dark)" }}>
                Имеются противопоказания. Необходима консультация специалиста.
              </p>
            </div>
          </div>
        </section>

        {/* Не нашли нужный анализ */}
        <section className="smt-section smt-section-alt">
          <div className="smt-container">
            <div className="smt-card smt-card-pad mx-auto max-w-[720px] text-center md:!p-8">
              <h2 className="smt-h2">Не нашли нужный анализ?</h2>
              <p className="smt-lead mt-3 smt-muted">
                Каталог обновляется. Напишите или позвоните — администратор уточнит, можно ли сдать исследование в
                клинике, сколько это стоит и в какие сроки будет готов результат.
              </p>
              <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
                <Link href="#zayavka" className="smt-btn smt-btn-primary">
                  Уточнить у администратора
                </Link>
                <a href={CLINIC.phoneHref} className="smt-btn smt-btn-ghost">
                  {CLINIC.phone}
                </a>
              </div>
            </div>
          </div>
        </section>

        <Cta
          title="Записаться на сдачу анализов"
          lead="Оставьте номер — перезвоним, уточним подготовку, актуальную стоимость и сроки выполнения."
          topic="Анализы"
          sourceBlock="analizy-cta"
        />
      </main>
      <SiteFooter />
    </div>
  );
}
