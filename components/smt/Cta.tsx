import { BookingForm } from "./BookingForm";

/** SMT-style booking CTA section. Carries the site-wide #zayavka anchor + context. */
export function Cta({
  title = "Записаться на приём",
  /* 2026-08-07 (чистка формулировок): из дефолтного лида убраны безусловное
     «Конфиденциально» и обещание «без постановки на учёт» — это маркетинговые
     обещания, а не то, что клиника может гарантировать. Дефолт виден на всех
     страницах, где Cta вызывается без своего lead. */
  lead = "Оставьте номер — перезвоним и подберём удобное время. Бережно, с соблюдением врачебной тайны.",
  topic,
  doctor,
  sourceBlock = "cta",
  alt = false,
}: {
  title?: string;
  lead?: string;
  topic?: string;
  doctor?: string;
  sourceBlock?: string;
  alt?: boolean;
}) {
  return (
    <section id="zayavka" className={`smt-section ${alt ? "smt-section-alt" : ""}`} style={{ scrollMarginTop: "88px" }}>
      <div className="smt-container">
        <div className="mx-auto max-w-[720px]">
          <div className="mb-6 text-center">
            <h2 className="smt-h2">{title}</h2>
            <p className="smt-lead mt-3 smt-muted-strong">{lead}</p>
          </div>
          <BookingForm topic={topic} doctor={doctor} sourceBlock={sourceBlock} />
        </div>
      </div>
    </section>
  );
}
