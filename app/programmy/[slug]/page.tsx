import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { SiteHeader } from "@/components/smt/SiteHeader";
import { SiteFooter } from "@/components/smt/SiteFooter";
import { Breadcrumbs } from "@/components/smt/Breadcrumbs";
import { Cta } from "@/components/smt/Cta";
import { PROGRAMS, DOCTORS, programBySlug, CLINIC } from "@/lib/data";

export function generateStaticParams() {
  return PROGRAMS.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const p = programBySlug(params.slug);
  if (!p) return {};
  return {
    title: `${p.title} — клиника «ПРО спокойствие»`,
    description: `${p.description ?? p.blurb} Запись: ${CLINIC.phone}.`,
  };
}

export default function ProgramPage({ params }: { params: { slug: string } }) {
  const p = programBySlug(params.slug);
  if (!p) notFound();

  const doctors = p.doctorSlugs
    ? p.doctorSlugs.map((s) => DOCTORS.find((d) => d.slug === s)).filter(Boolean)
    : [];

  return (
    <div className="smt">
      <SiteHeader active="Программы" />
      <Breadcrumbs
        items={[
          { label: "Главная", href: "/" },
          { label: "Программы", href: "/programmy/" },
          { label: p.title },
        ]}
      />
      <main id="main">
        {/* ── Hero ── */}
        <section className="smt-section smt-section-alt">
          <div className="smt-container max-w-[72ch]">
            <p className="smt-eyebrow">Программа</p>
            <h1 className="smt-h1 mt-2">{p.title}</h1>
            {p.subtitle && (
              <p className="smt-lead mt-3 smt-muted">{p.subtitle}</p>
            )}
            <p className="mt-4 text-[15px] leading-relaxed smt-muted">{p.forWhom}</p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Link href="#zayavka" className="smt-btn smt-btn-primary">
                {p.ctaText ?? "Записаться"}
              </Link>
              <a href={CLINIC.phoneHref} className="smt-btn smt-btn-ghost">
                {CLINIC.phone}
              </a>
            </div>
          </div>
        </section>

        {/* ── О программе + Кому подходит ── */}
        {(p.description || p.whoFor) && (
          <section className="smt-section">
            <div className="smt-container grid gap-10 md:grid-cols-2">
              {p.description && (
                <div>
                  <h2 className="smt-h2">О программе</h2>
                  <p className="mt-4 text-[15px] leading-relaxed smt-muted">{p.description}</p>
                </div>
              )}
              {p.whoFor && p.whoFor.length > 0 && (
                <div>
                  <h2 className="smt-h2">Кому подходит</h2>
                  <ul className="mt-4 flex flex-col gap-2">
                    {p.whoFor.map((item) => (
                      <li key={item} className="flex gap-3 text-[15px] leading-relaxed smt-muted">
                        <span
                          className="mt-[3px] h-[7px] w-[7px] shrink-0 rounded-full"
                          style={{ background: "var(--smt-blue)", opacity: 0.7 }}
                          aria-hidden="true"
                        />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </section>
        )}

        {/* ── Шаги программы ── */}
        {p.steps && p.steps.length > 0 && (
          <section className="smt-section smt-section-alt">
            <div className="smt-container">
              <h2 className="smt-h2">Как проходит программа</h2>
              <ol className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {p.steps.map((step, i) => (
                  <li key={step.title} className="smt-card smt-card-pad flex flex-col gap-2">
                    <span
                      className="text-[12px] font-semibold tracking-widest uppercase"
                      style={{ color: "var(--smt-blue)", opacity: 0.7 }}
                    >
                      Шаг {i + 1}
                    </span>
                    <h3 className="smt-h3">{step.title}</h3>
                    <p className="text-[14px] leading-relaxed smt-muted">{step.text}</p>
                  </li>
                ))}
              </ol>
            </div>
          </section>
        )}

        {/* ── Что включает + Ожидаемый результат ── */}
        {(p.includedServices || p.expectedResult) && (
          <section className="smt-section">
            <div className="smt-container grid gap-10 md:grid-cols-2">
              {p.includedServices && p.includedServices.length > 0 && (
                <div>
                  <h2 className="smt-h2">Что включает</h2>
                  <ul className="mt-4 flex flex-col gap-2">
                    {p.includedServices.map((svc) => (
                      <li key={svc} className="flex gap-3 text-[15px] leading-relaxed smt-muted">
                        <span
                          className="mt-[3px] h-[7px] w-[7px] shrink-0 rounded-full"
                          style={{ background: "var(--smt-blue)", opacity: 0.7 }}
                          aria-hidden="true"
                        />
                        {svc}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {p.expectedResult && (
                <div>
                  <h2 className="smt-h2">Чего ожидать</h2>
                  <p className="mt-4 text-[15px] leading-relaxed smt-muted">{p.expectedResult}</p>
                  {p.safetyNote && (
                    <p
                      className="mt-4 text-[13px] leading-relaxed"
                      style={{ color: "var(--smt-muted)" }}
                    >
                      {p.safetyNote}
                    </p>
                  )}
                </div>
              )}
            </div>
          </section>
        )}

        {/* ── Специалисты ── */}
        {doctors.length > 0 && (
          <section className="smt-section smt-section-alt">
            <div className="smt-container">
              <h2 className="smt-h2">Специалисты программы</h2>
              <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {doctors.map((doc) => {
                  if (!doc) return null;
                  return (
                    <li key={doc.slug}>
                      <Link
                        href={doc.href ?? `/vrachi/${doc.slug}/`}
                        className="smt-card smt-card-pad is-link flex h-full flex-col gap-2"
                        aria-label={`Подробнее о враче: ${doc.name}`}
                      >
                        <p className="font-semibold text-[15px]" style={{ color: "var(--smt-dark)" }}>
                          {doc.shortName}
                        </p>
                        <p className="text-[13px] smt-muted">{doc.specialty}</p>
                        {doc.experience && (
                          <p className="text-[13px]" style={{ color: "var(--smt-blue)" }}>
                            {doc.experience}
                          </p>
                        )}
                        <span className="smt-link mt-auto inline-flex text-[13px]">
                          Подробнее →
                        </span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
              <Link href="/vrachi/" className="smt-link mt-6 inline-flex">
                Все специалисты клиники →
              </Link>
            </div>
          </section>
        )}

        {/* ── FAQ ── */}
        {p.faq && p.faq.length > 0 && (
          <section className="smt-section">
            <div className="smt-container max-w-[72ch]">
              <h2 className="smt-h2">Частые вопросы</h2>
              <dl className="mt-8 flex flex-col gap-4">
                {p.faq.map((item) => (
                  <div
                    key={item.q}
                    className="smt-card smt-card-pad"
                    style={{ borderLeft: "3px solid var(--smt-blue)" }}
                  >
                    <dt className="font-semibold text-[15px]" style={{ color: "var(--smt-dark)" }}>
                      {item.q}
                    </dt>
                    <dd className="mt-2 text-[14px] leading-relaxed smt-muted">{item.a}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </section>
        )}

        {/* ── Safety note (standalone, if not shown above) ── */}
        {p.safetyNote && !p.expectedResult && (
          <section className="smt-section smt-section-alt">
            <div className="smt-container max-w-[68ch]">
              <p className="text-[13px] leading-relaxed smt-muted">{p.safetyNote}</p>
            </div>
          </section>
        )}

        <Cta title={p.ctaText ?? `Записаться · ${p.title}`} topic={p.title} sourceBlock="program" alt />
      </main>
      <SiteFooter />
    </div>
  );
}
