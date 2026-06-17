import Image from "next/image";
import Link from "next/link";
import { SiteHeader } from "./SiteHeader";
import { SiteFooter } from "./SiteFooter";
import { Breadcrumbs } from "./Breadcrumbs";
import { Cta } from "./Cta";
import { PhotoPlaceholder, TextPlaceholder } from "./Placeholder";
import { CLINIC, type Doctor, SERVICES } from "@/lib/data";

/** SMT-style doctor profile (identity → services → credentials → placeholders → price → CTA). */
export function DoctorProfile({ doctor }: { doctor: Doctor }) {
  // Services this doctor is profiled for (crosslink врач→услуга).
  const doctorServices = SERVICES.filter((s) => s.hasPage && s.doctorSlugs?.includes(doctor.slug));

  return (
    <div className="smt">
      <SiteHeader active="Врачи" />
      <Breadcrumbs items={[{ label: "Главная", href: "/" }, { label: "Врачи", href: "/vrachi/" }, { label: doctor.shortName }]} />

      <main id="main">
        {/* Identity block */}
        <section className="smt-section">
          <div className="smt-container grid items-start gap-8 md:grid-cols-[340px_1fr] md:gap-12">
            <div>
              {doctor.photo ? (
                <div className="relative aspect-[3/4] overflow-hidden rounded-[15px]" style={{ background: "var(--smt-grey)" }}>
                  <Image src={doctor.photo} alt={`${doctor.name}, ${doctor.specialty}`} fill sizes="(max-width:768px) 100vw, 340px" priority className="object-cover object-top" />
                </div>
              ) : (
                <PhotoPlaceholder ratio="3/4" />
              )}
            </div>
            <div>
              {doctor.role === "chief" ? (
                <span className="smt-chip mb-3 w-fit" style={{ background: "var(--smt-blue)", color: "#fff" }}>{doctor.statusBadge ?? "Главный врач"}</span>
              ) : null}
              <h1 className="smt-h1">{doctor.name}</h1>
              <p className="smt-lead mt-2">{doctor.specialty}</p>
              <p className="mt-1 text-[14px] smt-muted">Клиника «{CLINIC.name}», Екатеринбург</p>

              <dl className="mt-5 grid max-w-md grid-cols-2 gap-3">
                <div className="smt-card smt-card-pad !p-4">
                  <dt className="text-[13px] smt-muted">Стаж</dt>
                  <dd className="text-[15px]" style={{ color: "var(--smt-dark)" }}>Данные уточняются</dd>
                </div>
                <div className="smt-card smt-card-pad !p-4">
                  <dt className="text-[13px] smt-muted">Приём</dt>
                  <dd className="text-[15px] font-semibold" style={{ color: "var(--smt-dark)" }}>{doctor.firstVisit ? doctor.firstVisit.price : "по телефону"}</dd>
                </div>
              </dl>

              <div className="mt-5 flex flex-wrap gap-2">
                {doctor.helps.map((h) => (<span key={h} className="smt-chip">{h}</span>))}
              </div>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <Link href="#zayavka" className="smt-btn smt-btn-primary">Записаться к врачу</Link>
                <a href={CLINIC.phoneHref} className="smt-btn smt-btn-ghost">{CLINIC.phone}</a>
              </div>
            </div>
          </div>
        </section>

        {/* Services of the doctor (crosslink) */}
        <section className="smt-section smt-section-alt">
          <div className="smt-container">
            <h2 className="smt-h2">С чем помогает</h2>
            {doctorServices.length ? (
              <ul className="mt-6 flex flex-wrap gap-3">
                {doctorServices.map((s) => (
                  <li key={s.slug}>
                    <Link href={`/uslugi/${s.slug}/`} className="smt-chip is-link" style={{ background: "#fff", border: "1px solid var(--smt-border)" }}>
                      {s.catalogTitle} →
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <ul className="mt-6 flex flex-wrap gap-3">
                {doctor.helps.map((h) => (<li key={h}><span className="smt-chip">{h}</span></li>))}
              </ul>
            )}
          </div>
        </section>

        {/* Approach / bio (clinic-voice, honest placeholder for personal text) */}
        <section className="smt-section">
          <div className="smt-container max-w-[68ch]">
            <h2 className="smt-h2">Подход к работе</h2>
            <div className="smt-body mt-4 space-y-4 smt-muted">
              <p>Первая встреча — спокойный диалог, а не экзамен. Специалист сначала разбирается в ситуации, без оценок и спешки. В клинике работают методами с доказанной эффективностью.</p>
            </div>
            <p className="mt-4 text-[13px] smt-muted">Личный рассказ специалиста о подходе — информация готовится.</p>
          </div>
        </section>

        {/* Education / credentials — honest placeholders */}
        <section className="smt-section smt-section-alt">
          <div className="smt-container grid gap-8 md:grid-cols-2">
            <div>
              <h2 className="smt-h2">Образование и квалификация</h2>
              <div className="mt-4"><TextPlaceholder label="Данные уточняются" /></div>
              <p className="mt-3 text-[14px] smt-muted">Квалификация подтверждается лицензией клиники Минздрава Свердловской области.</p>
            </div>
            <div>
              <h2 className="smt-h2">Награды и отзывы</h2>
              <div className="mt-4 grid gap-3">
                <TextPlaceholder label="Награды — будет добавлено после согласования" />
                <TextPlaceholder label="Отзывы — информация готовится" />
                <TextPlaceholder label="Видео-визитка — фото готовится" />
              </div>
            </div>
          </div>
        </section>

        {/* Price */}
        <section className="smt-section">
          <div className="smt-container">
            <h2 className="smt-h2">Стоимость приёма</h2>
            <div className="mt-6 max-w-xl smt-card smt-card-pad flex items-center justify-between gap-4">
              <div>
                <p className="smt-h3">{doctor.firstVisit ? doctor.firstVisit.name : "Первичный приём"}</p>
                {doctor.firstVisit ? <p className="text-[14px] smt-muted">{doctor.firstVisit.duration}</p> : null}
              </div>
              <span className="text-[18px] font-bold tabular-nums" style={{ color: "var(--smt-dark)" }}>
                {doctor.firstVisit ? doctor.firstVisit.price : "уточняется"}
              </span>
            </div>
            <p className="mt-3 text-[13px] smt-muted">
              Полный прайс — <Link href="/tseny/" className="smt-link">на странице цен</Link>.
            </p>
          </div>
        </section>

        <Cta title={`Записаться к ${doctor.shortName}`} doctor={doctor.slug} alt />
      </main>
      <SiteFooter />
    </div>
  );
}
