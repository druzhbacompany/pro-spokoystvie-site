import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/smt/SiteHeader";
import { HeroPromoSlider } from "@/components/home/HeroPromoSlider";
import { SiteFooter } from "@/components/smt/SiteFooter";
import { Cta } from "@/components/smt/Cta";
import { DoctorCard } from "@/components/smt/DoctorCard";
import { ServiceCard } from "@/components/smt/ServiceCard";
import { BranchesSection } from "@/components/smt/Branches";
import { DOCTORS, SERVICES, SERVICE_CATEGORIES, CLINIC } from "@/lib/data";

export const metadata: Metadata = {
  // absolute — чтобы шаблон layout (%s — ПРО Спокойствие) не создавал дубль бренда.
  title: { absolute: "ПРО Спокойствие — психиатрия, психотерапия, психология и неврология в Екатеринбурге" },
  description:
    "Медицинский центр «ПРО Спокойствие» в Екатеринбурге: консультации психиатра, психотерапевта, психолога и невролога. Спокойный приём, медицинская лицензия, очные консультации.",
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <div className="smt">
      <SiteHeader />
      <main id="main">
        {/* [1] Hero — промо-слайдер (утверждён владельцем, 2026-07-05).
            Статусная строка → сохранённый H1 → карточка-слайдер (HeroPromoSlider). */}
        <section className="smt-section smt-section-alt !pt-8 md:!pt-10">
          <div className="smt-container">
            <p className="smt-eyebrow">Сеть профильных медицинских клиник</p>
            {/* H1 full-width: заголовок страницы над карточкой, без пустоты справа.
                2026-08-05 (P1-аудит): безусловное «конфиденциально» в H1 заменено на
                «бережно и деликатно» — обещание конфиденциальности не выносим в оффер. */}
            <h1 className="smt-h1 mt-3">Психиатрия, психотерапия и психология — спокойно и деликатно</h1>
            <div className="mt-6">
              <HeroPromoSlider />
            </div>
          </div>
        </section>

        {/* [2] Service routing by category.
            2026-08-05 (P1-аудит): на главной было два конкурирующих заголовка одного
            блока — надзаголовок «С чем мы помогаем» и H2 «Направления помощи».
            Оставлен один понятный H2, надзаголовок сведён к короткой метке раздела. */}
        <section className="smt-section">
          <div className="smt-container">
            <p className="smt-eyebrow">Направления</p>
            <h2 className="smt-h2 mt-2">С чем мы помогаем</h2>
            <p className="mt-3 max-w-[68ch] smt-body smt-muted-strong">
              Выберите близкую тему — или позвоните: администратор поможет подобрать специалиста.
              План помощи врач предлагает после очной консультации.
            </p>
            <div className="mt-8 space-y-10">
              {SERVICE_CATEGORIES.map((cat) => {
                const items = SERVICES.filter((s) => s.category === cat);
                if (!items.length) return null;
                return (
                  <div key={cat}>
                    <h3 className="smt-h3 mb-4">{cat}</h3>
                    <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                      {items.map((s) => (<li key={s.slug}><ServiceCard s={s} /></li>))}
                    </ul>
                  </div>
                );
              })}
            </div>

            {/* Лабораторная диагностика — вход в каталог /analizy/ с главной.
                Формулировки строго по позиционированию страницы: клиника — точка
                приёма биоматериала, исследования выполняет партнёрская лаборатория. */}
            <div className="mt-10 smt-card smt-card-pad md:!p-7 flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
              <div className="max-w-[70ch]">
                <h3 className="smt-h3">Анализы</h3>
                <p className="mt-2 smt-body smt-muted-strong">
                  Сдать анализы по каталогу партнёрской лаборатории Хеликс. Принимаем биоматериал
                  по предварительной записи и передаём в лабораторию для выполнения исследований.
                </p>
                <p className="mt-2 text-[14px] smt-muted-strong">
                  Стоимость, сроки и доступность уточняются при записи.
                </p>
              </div>
              <Link href="/analizy/" className="smt-btn smt-btn-ghost md:flex-none">Каталог анализов</Link>
            </div>

            <Link href="/uslugi/" className="smt-link mt-8 inline-flex">Все услуги и цены →</Link>
          </div>
        </section>

        {/* [3] Doctors */}
        <section className="smt-section smt-section-alt">
          <div className="smt-container">
            <p className="smt-eyebrow">Специалисты</p>
            <h2 className="smt-h2 mt-2">Команда клиники</h2>
            <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {DOCTORS.slice(0, 6).map((d) => (<li key={d.slug}><DoctorCard d={d} /></li>))}
            </ul>
            <Link href="/vrachi/" className="smt-link mt-8 inline-flex">Все врачи →</Link>
          </div>
        </section>

        {/* [4] Programs — блок убран с главной (решение собственника, 2026-07-04).
            Раздел /programmy и данные PROGRAMS сохранены, страницы доступны напрямую. */}

        {/* [5] Trust / license */}
        <section className="smt-section smt-section-alt">
          <div className="smt-container grid gap-8 md:grid-cols-[1fr_1fr] md:items-center">
            <div>
              <p className="smt-eyebrow">Документы</p>
              {/* 2026-08-05 (P1-аудит): «Настоящая лицензированная клиника» —
                  оборонительная и слабая формулировка; заменена на нейтральный факт. */}
              <h2 className="smt-h2 mt-2">Медицинская помощь по лицензии</h2>
              <p className="smt-body mt-4 smt-muted-strong">
                Деятельность клиники лицензирована {CLINIC.licenseAuthority}. Лицензия №{CLINIC.license}. {CLINIC.legalName} · ИНН {CLINIC.inn} · ОГРН {CLINIC.ogrn}.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link href="/dokumenty/" className="smt-btn smt-btn-primary">Документы и лицензия</Link>
                <a href={CLINIC.licenseCheckUrl} target="_blank" rel="noopener noreferrer" className="smt-btn smt-btn-ghost">Проверить в Росздравнадзоре</a>
              </div>
            </div>
            {/* 2026-08-05 (P1-аудит): убраны безусловные «Конфиденциально» и «Без учёта»
                (обещание правовых последствий) и «Карты и наличные» (не элемент доверия);
                режим работы не дублируем — он в блоке единого контакта и в подвале. */}
            <ul className="grid gap-3 sm:grid-cols-2">
              <li><span className="smt-chip">С соблюдением врачебной тайны</span></li>
              <li><span className="smt-chip">Документы в открытом доступе</span></li>
              <li><span className="smt-chip">Приём по предварительной записи</span></li>
              <li><span className="smt-chip">Помощь — по показаниям</span></li>
            </ul>
          </div>
        </section>

        {/* [6] Branches (SMT-like clinic locations) */}
        <BranchesSection title="Филиалы клиники" alt />
        <section className="smt-section">
          <div className="smt-container flex flex-wrap items-center justify-between gap-4">
            <div>
              <h2 className="smt-h2">Единый контакт для всех филиалов</h2>
              <p className="mt-2 smt-body smt-muted-strong">
                <a href={CLINIC.phoneHref} className="smt-link">{CLINIC.phone}</a> · <a href={CLINIC.telegramHref} target="_blank" rel="noopener noreferrer" className="smt-link">Telegram {CLINIC.telegram}</a> · {CLINIC.hoursWeek} · {CLINIC.hoursWeekend}
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link href="/kontakty/" className="smt-btn smt-btn-ghost">Посмотреть контакты</Link>
              <Link href="#zayavka" className="smt-btn smt-btn-primary">Записаться</Link>
            </div>
          </div>
        </section>

        {/* 2026-08-05 (P1-аудит): лид формы на главной переопределён — из дефолта Cta
            убраны безусловное «Конфиденциально» и обещание «без постановки на учёт». */}
        <Cta
          alt
          lead="Оставьте номер — перезвоним и подберём удобное время. Бережно, с соблюдением врачебной тайны."
        />
      </main>
      <SiteFooter />
    </div>
  );
}
