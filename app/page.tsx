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
  title: "ПРО спокойствие — психиатрия, психотерапия, психология и неврология в Екатеринбурге",
  description:
    "Лицензированная клиника в Екатеринбурге: психиатр, психотерапевт, психолог и невролог работают вместе. Спокойно и конфиденциально, без постановки на учёт.",
};

export default function HomePage() {
  return (
    <div className="smt">
      <SiteHeader />
      <main id="main">
        {/* [1] Hero — промо-слайдер (утверждён владельцем, 2026-07-05).
            Статусная строка → сохранённый H1 → карточка-слайдер (HeroPromoSlider). */}
        <section className="smt-section smt-section-alt">
          <div className="smt-container">
            <p className="smt-eyebrow">Сеть профильных медицинских клиник</p>
            <h1 className="smt-h1 mt-3 max-w-[26ch]">Психиатрия, психотерапия и психология — спокойно и конфиденциально</h1>
            <div className="mt-8">
              <HeroPromoSlider />
            </div>
          </div>
        </section>

        {/* [2] Service routing by category */}
        <section className="smt-section">
          <div className="smt-container">
            <p className="smt-eyebrow">С чем мы помогаем</p>
            <h2 className="smt-h2 mt-2">Направления помощи</h2>
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
            <Link href="/uslugi/" className="smt-link mt-8 inline-flex">Все направления →</Link>
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
              <h2 className="smt-h2 mt-2">Настоящая лицензированная клиника</h2>
              <p className="smt-body mt-4 smt-muted">
                Деятельность клиники лицензирована {CLINIC.licenseAuthority}. Лицензия №{CLINIC.license}. {CLINIC.legalName} · ИНН {CLINIC.inn} · ОГРН {CLINIC.ogrn}.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link href="/dokumenty/" className="smt-btn smt-btn-primary">Документы и лицензия</Link>
                <a href={CLINIC.licenseCheckUrl} target="_blank" rel="noopener noreferrer" className="smt-btn smt-btn-ghost">Проверить в Росздравнадзоре</a>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <span className="smt-chip">Конфиденциально</span>
              <span className="smt-chip">Без учёта</span>
              <span className="smt-chip">Карты и наличные</span>
              <span className="smt-chip">{CLINIC.hoursWeekend}</span>
            </div>
          </div>
        </section>

        {/* [6] Branches (SMT-like clinic locations) */}
        <BranchesSection title="Филиалы клиники" alt />
        <section className="smt-section">
          <div className="smt-container flex flex-wrap items-center justify-between gap-4">
            <div>
              <h2 className="smt-h2">Единый контакт для всех филиалов</h2>
              <p className="mt-2 smt-body smt-muted">
                <a href={CLINIC.phoneHref} className="smt-link">{CLINIC.phone}</a> · <a href={CLINIC.telegramHref} target="_blank" rel="noopener noreferrer" className="smt-link">Telegram {CLINIC.telegram}</a> · {CLINIC.hoursWeek} · {CLINIC.hoursWeekend}
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link href="/kontakty/" className="smt-btn smt-btn-ghost">Посмотреть контакты</Link>
              <Link href="#zayavka" className="smt-btn smt-btn-primary">Записаться</Link>
            </div>
          </div>
        </section>

        <Cta alt />
      </main>
      <SiteFooter />
    </div>
  );
}
