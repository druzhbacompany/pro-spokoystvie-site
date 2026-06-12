import Image from "next/image";
import { CLINIC } from "@/lib/data";

/**
 * Hero V2 — a SCENE, not a 50/50 split (VISUAL_SYSTEM_MASTER §5).
 * Left: editorial column. Right: layered media (interior frame +
 * floating license card + chief chip), over wave + faint double-ring.
 * Donor brand DNA: blue/beige, Manrope, ring, wave. Legal-safe copy.
 */
export function HeroV2() {
  return (
    <section
      className="relative overflow-hidden"
      style={{
        background:
          "linear-gradient(180deg, var(--v2-blue-pale-2) 0%, var(--v2-bg) 62%)",
      }}
    >
      {/* faint double-ring brand motif (decor, opacity <= .06) */}
      <svg
        className="pointer-events-none absolute -right-24 -top-16 hidden h-[520px] w-[520px] md:block"
        viewBox="0 0 200 200"
        fill="none"
        aria-hidden
        style={{ opacity: 0.06 }}
      >
        <ellipse cx="78" cy="100" rx="56" ry="74" stroke="var(--v2-blue)" strokeWidth="14" transform="rotate(-18 78 100)" />
        <ellipse cx="120" cy="100" rx="56" ry="74" stroke="var(--v2-beige)" strokeWidth="14" transform="rotate(-18 120 100)" />
      </svg>

      {/* wave "floor" graphic, low contrast, behind content */}
      <Image
        src="/donor-assets-v2/graphics/ribbon-1.svg"
        alt=""
        aria-hidden
        width={1345}
        height={517}
        className="pointer-events-none absolute inset-x-0 bottom-0 w-full select-none"
        style={{ opacity: 0.5 }}
      />

      <div className="v2-container relative grid items-center gap-10 pb-16 pt-12 md:min-h-[calc(100dvh-80px)] md:grid-cols-[58fr_42fr] md:gap-12 md:pb-24 md:pt-16">
        {/* LEFT — editorial column */}
        <div className="max-w-[60ch]">
          <p className="v2-eyebrow mb-4">Лицензированная клиника · Екатеринбург</p>
          <h1 className="v2-h1">Не нужно угадывать, к какому специалисту идти</h1>

          <span className="v2-hairline my-6" aria-hidden />

          <p className="v2-lead">
            Начните с одной консультации — врач разберётся в ситуации, определит
            маршрут помощи и подключит нужных специалистов клиники: психиатра,
            психотерапевта, психолога или невролога. Вы не собираете лечение по
            кусочкам — решения и темп остаются за вами. Конфиденциально, без
            постановки на учёт.
          </p>

          <div className="mt-7 flex flex-wrap gap-2">
            <span className="v2-chip">
              <Dot /> Лицензия Минздрава
            </span>
            <span className="v2-chip">
              <Dot /> Без постановки на учёт
            </span>
            <span className="v2-chip">
              <Dot /> Пн–Пт 08:00–20:00
            </span>
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a href="#zayavka" className="v2-btn v2-btn-primary">
              Начать с консультации
            </a>
            <a href={CLINIC.phoneHref} className="v2-btn v2-btn-ghost">
              Позвонить
            </a>
          </div>
        </div>

        {/* RIGHT — layered media scene */}
        <div className="relative mx-auto w-full max-w-md md:max-w-none">
          {/* interior photo frame */}
          <div
            className="relative aspect-[4/5] overflow-hidden rounded-[20px]"
            style={{ boxShadow: "var(--v2-shadow-lg)", border: "1px solid var(--v2-border)" }}
          >
            <Image
              src="/donor-assets-v2/clinic/interior-1.jpg"
              alt="Интерьер клиники «ПРО спокойствие»"
              fill
              sizes="(max-width: 768px) 90vw, 42vw"
              priority
              className="object-cover"
              data-temp-asset="true"
            />
          </div>

          {/* floating license card (overlaps bottom-left corner) */}
          <div
            className="v2-card absolute -bottom-5 -left-3 w-[220px] p-4 sm:-left-6 sm:w-[260px]"
            style={{ boxShadow: "var(--v2-shadow-lg)" }}
          >
            <div className="flex items-start gap-2.5">
              <span
                className="mt-0.5 flex h-8 w-8 flex-none items-center justify-center rounded-full"
                style={{ background: "var(--v2-blue-pale)", color: "var(--v2-blue)" }}
                aria-hidden
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 4l7 2.5V12c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6.5L12 4M9 12l2 2 4-4" />
                </svg>
              </span>
              <div>
                <p className="text-[13px] font-semibold leading-snug" style={{ color: "var(--v2-blue-deep)" }}>
                  Лицензия Минздрава
                </p>
                <p className="text-[12px] leading-snug" style={{ color: "var(--v2-text-mid)" }}>
                  №{CLINIC.license}
                </p>
                <a
                  href={CLINIC.licenseCheckUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1 inline-block text-[12px] font-semibold"
                  style={{ color: "var(--v2-blue)" }}
                >
                  Проверить →
                </a>
              </div>
            </div>
          </div>

          {/* chief physician accountability chip (top-right) */}
          <div
            className="v2-card absolute -right-2 top-5 flex items-center gap-2 py-2 pl-2 pr-3 sm:-right-5"
            style={{ boxShadow: "var(--v2-shadow-md)" }}
          >
            <span className="relative h-9 w-9 flex-none overflow-hidden rounded-full" style={{ border: "1px solid var(--v2-border)" }}>
              <Image
                src="/donor-assets-v2/doctors/romanovsky.jpg"
                alt="Главный врач Романовский В.О."
                fill
                sizes="36px"
                className="object-cover object-top"
                data-temp-asset="true"
              />
            </span>
            <span className="text-[12px] leading-tight" style={{ color: "var(--v2-text)" }}>
              <span className="block font-semibold" style={{ color: "var(--v2-blue-deep)" }}>
                Главный врач
              </span>
              Романовский В.О.
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

function Dot() {
  return (
    <span
      className="inline-block h-1.5 w-1.5 flex-none rounded-full"
      style={{ background: "var(--v2-blue)" }}
      aria-hidden
    />
  );
}
