import { BookingForm } from "./BookingForm";

/** SMT-style booking CTA section. Carries the site-wide #zayavka anchor. */
export function Cta({
  title = "Записаться на приём",
  lead = "Оставьте номер — перезвоним и подберём удобное время. Конфиденциально, без постановки на учёт.",
  topic,
  doctor,
  alt = false,
}: {
  title?: string;
  lead?: string;
  topic?: string;
  doctor?: string;
  alt?: boolean;
}) {
  return (
    <section id="zayavka" className={`smt-section ${alt ? "smt-section-alt" : ""}`} style={{ scrollMarginTop: "88px" }}>
      <div className="smt-container">
        <div className="mx-auto max-w-[720px]">
          <div className="mb-6 text-center">
            <h2 className="smt-h2">{title}</h2>
            <p className="smt-lead mt-3 smt-muted">{lead}</p>
          </div>
          <BookingForm topic={topic} doctor={doctor} />
        </div>
      </div>
    </section>
  );
}
