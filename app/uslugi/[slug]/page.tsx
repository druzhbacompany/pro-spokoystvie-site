import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { SiteHeader } from "@/components/smt/SiteHeader";
import { SiteFooter } from "@/components/smt/SiteFooter";
import { Breadcrumbs } from "@/components/smt/Breadcrumbs";
import { DoctorCard } from "@/components/smt/DoctorCard";
import { Cta } from "@/components/smt/Cta";
import { SERVICES, serviceBySlug, bySlug, CLINIC } from "@/lib/data";

export function generateStaticParams() {
  return SERVICES.filter((s) => s.hasPage).map((s) => ({ slug: s.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const s = serviceBySlug(params.slug);
  if (!s || !s.hasPage) return {};
  return { title: s.metaTitle, description: s.metaDescription };
}

export default function ServicePage({ params }: { params: { slug: string } }) {
  const s = serviceBySlug(params.slug);
  if (!s || !s.hasPage) notFound();
  const doctors = (s.doctorSlugs ?? []).map(bySlug).filter(Boolean) as NonNullable<ReturnType<typeof bySlug>>[];

  return (
    <div className="smt">
      <SiteHeader active="Услуги" />
      <Breadcrumbs items={[{ label: "Главная", href: "/" }, { label: "Услуги", href: "/uslugi/" }, { label: s.catalogTitle }]} />
      <main id="main">
        {/* Hero */}
        <section className="smt-section smt-section-alt">
          <div className="smt-container max-w-[68ch]">
            <p className="smt-eyebrow">Психическое здоровье · Екатеринбург</p>
            <h1 className="smt-h1 mt-2">{s.h1}</h1>
            <p className="smt-lead mt-4 smt-muted">{s.lead}</p>
            <div className="mt-6 flex flex-wrap gap-2">
              <span className="smt-chip">Конфиденциально</span>
              <span className="smt-chip">Без постановки на учёт</span>
              {s.priceFrom ? <span className="smt-chip">{s.priceFrom}</span> : null}
            </div>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Link href="#zayavka" className="smt-btn smt-btn-primary">Записаться</Link>
              <a href={CLINIC.phoneHref} className="smt-btn smt-btn-ghost">{CLINIC.phone}</a>
            </div>
          </div>
        </section>

        {/* Symptoms — это про вас */}
        {s.symptoms?.length ? (
          <section className="smt-section">
            <div className="smt-container">
              <h2 className="smt-h2">Это про вас?</h2>
              <ul className="mt-6 grid max-w-3xl gap-3 sm:grid-cols-2">
                {s.symptoms.map((x) => (
                  <li key={x} className="flex gap-2 smt-body smt-muted">
                    <span style={{ color: "var(--smt-blue)" }}>✓</span>{x}
                  </li>
                ))}
              </ul>
              {s.recognitionBridge ? <p className="smt-lead mt-6 max-w-[68ch]">{s.recognitionBridge}</p> : null}
            </div>
          </section>
        ) : null}

        {/* Grounding (panic) */}
        {s.grounding ? (
          <section className="smt-section smt-section-alt">
            <div className="smt-container max-w-[68ch] smt-card smt-card-pad md:!p-7">
              <h2 className="smt-h3">{s.grounding.title}</h2>
              <ul className="mt-4 space-y-3 smt-body smt-muted">
                {s.grounding.items.map((x) => (<li key={x}>{x}</li>))}
              </ul>
            </div>
          </section>
        ) : null}

        {/* How we help — steps + SEO */}
        {s.steps?.length ? (
          <section className="smt-section">
            <div className="smt-container">
              <h2 className="smt-h2">{s.treatmentTitle}</h2>
              {s.treatmentLead ? <p className="smt-lead mt-3 max-w-[68ch] smt-muted">{s.treatmentLead}</p> : null}
              <ol className="mt-8 grid gap-5 md:grid-cols-5">
                {s.steps.map((step, i) => (
                  <li key={step.title} className="smt-card smt-card-pad">
                    <span className="flex h-9 w-9 items-center justify-center rounded-full text-[15px] font-bold" style={{ background: "var(--smt-blue-bg)", color: "var(--smt-dark)" }}>{i + 1}</span>
                    <h3 className="mt-3 text-[16px] font-semibold" style={{ color: "var(--smt-dark)" }}>{step.title}</h3>
                    <p className="mt-2 text-[14px] smt-muted">{step.text}</p>
                  </li>
                ))}
              </ol>
              {s.treatmentNote ? <p className="smt-body mt-6 max-w-[68ch] smt-muted">{s.treatmentNote}</p> : null}

              {(s.causes?.length || s.manifestText || s.symptomsPsy) ? (
                <div className="mt-10 max-w-[68ch]">
                  {s.causesTitle ? <h3 className="smt-h3">{s.causesTitle}</h3> : null}
                  {s.icd ? <p className="mt-2 text-[13px] smt-muted">Код по МКБ-10: {s.icd}</p> : null}
                  <div className="mt-4 space-y-4 smt-body smt-muted">
                    {s.causes?.map((p) => (<p key={p}>{p}</p>))}
                  </div>
                  {s.symptomsPsy || s.symptomsPhys ? (
                    <div className="mt-6 grid gap-6 sm:grid-cols-2">
                      {s.symptomsPsy ? (<div><h4 className="text-[16px] font-semibold" style={{ color: "var(--smt-dark)" }}>Психологические</h4><ul className="mt-2 space-y-1 text-[14px] smt-muted">{s.symptomsPsy.map((x) => (<li key={x}>· {x}</li>))}</ul></div>) : null}
                      {s.symptomsPhys ? (<div><h4 className="text-[16px] font-semibold" style={{ color: "var(--smt-dark)" }}>Физические</h4><ul className="mt-2 space-y-1 text-[14px] smt-muted">{s.symptomsPhys.map((x) => (<li key={x}>· {x}</li>))}</ul></div>) : null}
                    </div>
                  ) : null}
                  {s.manifestText ? (<><h3 className="smt-h3 mt-6">{s.manifestTitle}</h3><p className="mt-3 smt-body smt-muted">{s.manifestText}</p></>) : null}
                  <p className="mt-5 text-[13px] smt-muted">Тексты раздела проходят финальную редактуру врачом. Информация готовится.</p>
                </div>
              ) : null}
            </div>
          </section>
        ) : null}

        {/* Related doctors */}
        {doctors.length ? (
          <section className="smt-section smt-section-alt">
            <div className="smt-container">
              <h2 className="smt-h2">Кто вас примет</h2>
              <ul className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {doctors.map((d) => (<li key={d.slug}><DoctorCard d={d} /></li>))}
              </ul>
            </div>
          </section>
        ) : null}

        {/* Price */}
        {s.pricing?.length ? (
          <section className="smt-section">
            <div className="smt-container">
              <h2 className="smt-h2">Стоимость</h2>
              <div className="mt-6 max-w-xl space-y-3">
                {s.pricing.map((row) => (
                  <div key={row.name} className="smt-card smt-card-pad flex items-center justify-between gap-4">
                    <div><p className="text-[16px] font-semibold" style={{ color: "var(--smt-dark)" }}>{row.name}</p><p className="text-[13px] smt-muted">{row.duration}</p></div>
                    <span className="text-[18px] font-bold tabular-nums" style={{ color: "var(--smt-dark)" }}>{row.price}</span>
                  </div>
                ))}
              </div>
              {s.pricingNote ? <p className="mt-3 max-w-xl text-[13px] smt-muted">{s.pricingNote}</p> : null}
              <Link href="/tseny/" className="smt-link mt-3 inline-flex">Полный прайс →</Link>
            </div>
          </section>
        ) : null}

        {/* FAQ */}
        {s.faq?.length ? (
          <section className="smt-section smt-section-alt">
            <div className="smt-container max-w-[760px]">
              <h2 className="smt-h2 text-center">Частые вопросы</h2>
              <div className="mt-8 divide-y" style={{ borderColor: "var(--smt-border)" }}>
                {s.faq.map((q, i) => (
                  <details key={q.q} open={i < 2} className="border-b py-2" style={{ borderColor: "var(--smt-border)" }}>
                    <summary className="cursor-pointer list-none py-3 text-[17px] font-semibold" style={{ color: "var(--smt-dark)" }}>{q.q}</summary>
                    <p className="pb-3 smt-body smt-muted">{q.a}</p>
                  </details>
                ))}
              </div>
            </div>
          </section>
        ) : null}

        <Cta title="Записаться на консультацию" topic={s.catalogTitle} />

        {/* Related links */}
        {s.related?.length ? (
          <section className="smt-section smt-section-alt">
            <div className="smt-container">
              <h2 className="smt-h3">Смотрите также</h2>
              <ul className="mt-4 flex flex-wrap gap-4">
                {s.related.map((r) => (<li key={r.href}><Link href={r.href} className="smt-link">{r.label} →</Link></li>))}
              </ul>
            </div>
          </section>
        ) : null}
      </main>
      <SiteFooter />
    </div>
  );
}
