import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/smt/SiteHeader";
import { SiteFooter } from "@/components/smt/SiteFooter";
import { Breadcrumbs } from "@/components/smt/Breadcrumbs";
import { Cta } from "@/components/smt/Cta";
import { DoctorCard } from "@/components/smt/DoctorCard";
import { PhotoPlaceholder, TextPlaceholder } from "@/components/smt/Placeholder";
import { BranchesSection } from "@/components/smt/Branches";
import { CLINIC, bySlug, DOCTORS } from "@/lib/data";

export const metadata: Metadata = {
  title: "О клинике — «ПРО спокойствие» в Екатеринбурге",
  description:
    "Медицинский центр «ПРО спокойствие»: психиатрия, психотерапия, психология и неврология. Лицензия Минздрава, единый стандарт помощи, конфиденциально и без постановки на учёт.",
};

const chief = bySlug("romanovsky-vo");

export default function AboutPage() {
  return (
    <div className="smt">
      <SiteHeader active="О клинике" />
      <Breadcrumbs items={[{ label: "Главная", href: "/" }, { label: "О клинике" }]} />
      <main id="main">
        {/* Hero */}
        <section className="smt-section smt-section-alt">
          <div className="smt-container grid items-center gap-10 md:grid-cols-2">
            <div>
              <p className="smt-eyebrow">О клинике · Екатеринбург</p>
              <h1 className="smt-h1 mt-2">Спокойная и настоящая клиника</h1>
              <p className="smt-lead mt-4 smt-muted">
                «ПРО спокойствие» — медицинский центр в Екатеринбурге. Психиатр, психотерапевт, психолог и невролог работают вместе под единым стандартом помощи: спокойно, конфиденциально, без постановки на учёт.
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                <span className="smt-chip">Лицензия Минздрава</span>
                <span className="smt-chip">Без постановки на учёт</span>
                <span className="smt-chip">Конфиденциально</span>
              </div>
            </div>
            <PhotoPlaceholder ratio="4/3" label="Фото клиники готовится" />
          </div>
        </section>

        {/* About + numbers (placeholders for verified figures) */}
        <section className="smt-section">
          <div className="smt-container">
            <h2 className="smt-h2">О нас</h2>
            <p className="mt-4 max-w-[68ch] smt-body smt-muted">
              Мы помогаем людям возвращать спокойствие — при тревоге, панических атаках, сниженном настроении, бессоннице и других состояниях. Работаем методами с доказанной эффективностью, бережно и в комфортном темпе.
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {["Лет работы", "Специалистов", "Направлений помощи"].map((k) => (
                <div key={k} className="smt-card smt-card-pad">
                  <p className="text-[14px] smt-muted">{k}</p>
                  <p className="mt-1 text-[18px] font-bold" style={{ color: "var(--smt-dark)" }}>Данные уточняются</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Chief / medical leadership */}
        {chief ? (
          <section className="smt-section smt-section-alt">
            <div className="smt-container">
              <p className="smt-eyebrow">Медицинское руководство</p>
              <h2 className="smt-h2 mt-2">Главный врач</h2>
              <div className="mt-6 grid gap-6 md:grid-cols-3">
                <div className="md:col-span-1"><DoctorCard d={chief} /></div>
                <div className="md:col-span-2 smt-card smt-card-pad md:!p-7">
                  <p className="smt-body smt-muted">
                    Стандарт помощи в клинике задаёт главный врач — {chief.shortName}. Он отвечает за то, чтобы каждый специалист работал бережно, без давления и осуждения, минимально достаточными средствами.
                  </p>
                  <blockquote className="mt-4 border-l-2 pl-4 italic smt-body" style={{ borderColor: "var(--smt-blue)", color: "var(--smt-dark)" }}>
                    «Моя задача — чтобы человек ушёл от нас спокойнее, чем пришёл.»
                  </blockquote>
                  <Link href="/vrachi/romanovsky-vo/" className="smt-link mt-4 inline-flex">Подробнее о главном враче →</Link>
                </div>
              </div>
            </div>
          </section>
        ) : null}

        {/* Team standard */}
        <section className="smt-section">
          <div className="smt-container">
            <h2 className="smt-h2">Единый стандарт помощи</h2>
            <ul className="mt-6 grid gap-4 sm:grid-cols-2">
              {[
                "Вас выслушают без спешки и без оценок",
                "Объяснят простыми словами, без жаргона",
                "Конфиденциально — без постановки на учёт",
                "Минимально достаточная помощь, без избыточного лечения",
              ].map((t) => (
                <li key={t} className="smt-card smt-card-pad flex gap-3 smt-body smt-muted">
                  <span style={{ color: "var(--smt-blue)" }}>✓</span>{t}
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <Link href="/vrachi/" className="smt-link">Все специалисты ({DOCTORS.length}) →</Link>
            </div>
          </div>
        </section>

        {/* Branches */}
        <BranchesSection title="Филиалы клиники" />

        {/* License + documents crosslink */}
        <section className="smt-section smt-section-alt">
          <div className="smt-container grid gap-8 md:grid-cols-2 md:items-center">
            <div>
              <p className="smt-eyebrow">Документы</p>
              <h2 className="smt-h2 mt-2">Лицензия и реквизиты</h2>
              <p className="smt-body mt-4 smt-muted">
                Деятельность клиники лицензирована {CLINIC.licenseAuthority}. Лицензия №{CLINIC.license}. {CLINIC.legalName} · ИНН {CLINIC.inn} · ОГРН {CLINIC.ogrn}.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link href="/dokumenty/" className="smt-btn smt-btn-primary">Документы и лицензия</Link>
                <a href={CLINIC.licenseCheckUrl} target="_blank" rel="noopener noreferrer" className="smt-btn smt-btn-ghost">Проверить в Росздравнадзоре</a>
              </div>
            </div>
            <div>
              <h3 className="smt-h3">Адрес и режим</h3>
              <ul className="mt-3 space-y-2 smt-body">
                <li>{CLINIC.address}</li>
                <li><a href={CLINIC.phoneHref} className="smt-link">{CLINIC.phone}</a></li>
                <li className="smt-muted">{CLINIC.hoursWeek} · {CLINIC.hoursWeekend}</li>
              </ul>
              <div className="mt-4"><TextPlaceholder label="Фотографии интерьера готовятся" /></div>
            </div>
          </div>
        </section>

        <Cta title="Записаться в клинику" sourceBlock="o-klinike" />
      </main>
      <SiteFooter />
    </div>
  );
}
