import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";
import { CLINIC } from "@/lib/data";

/**
 * Hero V3 (refined) — composed scene, locked message (HERO_MESSAGE_LOCK_V1).
 * Refinement pass: unified ring+wave motif (one system, replaces random arc);
 * 2-paragraph lead rhythm; premium iconed trust chips; warmer media grade/crop.
 * Keeps: H1, one filled primary, ghost secondary, topbar, chief chip, license
 * card, Manrope, blue/beige, responsive line counts.
 */
type ChipIcon = "shield" | "check" | "spectrum";
const TRUST: { label: string; icon: ChipIcon }[] = [
  { label: "Лицензия Минздрава", icon: "shield" },
  { label: "Без постановки на учёт", icon: "check" },
  { label: "Психиатрия · психотерапия · неврология · терапия", icon: "spectrum" },
];

export function HeroV3() {
  return (
    <section
      className="relative overflow-hidden"
      style={{ background: "linear-gradient(177deg, var(--v2-blue-pale-2) 0%, var(--v2-bg) 60%)" }}
    >
      {/* Unified brand motif: double-ring as the SOURCE, wave flowing out of it.
          One visual system, quiet but intentional. Behind the right media. */}
      <svg
        className="pointer-events-none absolute right-[-70px] top-[8%] hidden h-[78%] w-[58%] lg:block"
        viewBox="0 0 360 300"
        fill="none"
        aria-hidden
        preserveAspectRatio="xMidYMid meet"
      >
        <g opacity="0.45">
          {/* waves flowing right from the rings */}
          <path d="M70 150 C 120 108, 168 196, 218 150 S 320 108, 372 150" stroke="var(--v2-wave)" strokeWidth="11" strokeLinecap="round" />
          <path d="M58 182 C 112 138, 168 224, 224 182 S 332 138, 386 182" stroke="var(--v2-wave)" strokeWidth="8" strokeLinecap="round" opacity="0.75" />
          {/* double ring = origin */}
          <ellipse cx="78" cy="132" rx="40" ry="54" stroke="var(--v2-blue)" strokeWidth="10" transform="rotate(-16 78 132)" />
          <ellipse cx="112" cy="132" rx="40" ry="54" stroke="var(--v2-beige)" strokeWidth="10" transform="rotate(-16 112 132)" />
        </g>
      </svg>

      <div className="v2-container relative grid items-center gap-12 pb-16 pt-12 lg:min-h-[calc(100dvh-80px)] lg:grid-cols-[57fr_43fr] lg:gap-14 lg:pb-24 lg:pt-14">
        {/* LEFT — editorial column */}
        <Reveal>
          <div className="max-w-[40ch] lg:max-w-none">
            <p className="v2-eyebrow mb-4">Лицензированная клиника · Екатеринбург</p>

            <h1 className="v2-h1 max-w-[19ch] lg:max-w-[23ch]">
              Не нужно угадывать, к какому специалисту идти
            </h1>

            <span className="v2-hairline my-6" aria-hidden />

            {/* 2-paragraph lead — same locked meaning, better rhythm */}
            <div className="max-w-[60ch] space-y-3">
              <p className="v2-lead">
                Лицензированная клиника в Екатеринбурге: психиатр, психотерапевт,
                психолог и невролог работают вместе.
              </p>
              <p className="v2-lead">
                Начните с одной консультации — врач разберётся в ситуации и
                определит, какая помощь вам нужна. Решения и темп остаются за
                вами. Конфиденциально, без постановки на учёт.
              </p>
            </div>

            <ul className="mt-7 flex flex-wrap gap-2.5">
              {TRUST.map((t) => (
                <li key={t.label} className="v2-trustchip">
                  <ChipIconEl name={t.icon} />
                  <span>{t.label}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a href="#zayavka" className="v2-btn v2-btn-primary">Начать с консультации</a>
              <a href={CLINIC.phoneHref} className="v2-btn v2-btn-ghost">Позвонить</a>
            </div>
          </div>
        </Reveal>

        {/* RIGHT — layered media scene */}
        <Reveal delay={90}>
          <div className="relative mx-auto w-full max-w-[420px] lg:max-w-none">
            <div
              className="relative aspect-[4/5] overflow-hidden rounded-[22px]"
              style={{ boxShadow: "var(--v2-shadow-lg)", border: "1px solid var(--v2-border)" }}
            >
              <Image
                src="/donor-assets-v2/clinic/interior-1.jpg"
                alt="Кабинет клиники «ПРО спокойствие»"
                fill
                sizes="(max-width: 1024px) 90vw, 43vw"
                priority
                className="object-cover"
                style={{ objectPosition: "30% 50%", filter: "saturate(0.9) sepia(0.12) brightness(1.04) contrast(0.97)" }}
                data-temp-asset="true"
              />
              {/* warmer grade — beige wash favouring the plant/wood side */}
              <span
                className="pointer-events-none absolute inset-0"
                aria-hidden
                style={{
                  background:
                    "linear-gradient(145deg, rgba(125,100,77,0.34) 0%, rgba(125,100,77,0.08) 42%, rgba(56,80,96,0.12) 100%)",
                  mixBlendMode: "multiply",
                }}
              />
              {/* soft warm top vignette + inner highlight */}
              <span className="pointer-events-none absolute inset-0" aria-hidden style={{ background: "radial-gradient(120% 80% at 20% 10%, rgba(216,205,187,0.22), transparent 55%)" }} />
              <span className="pointer-events-none absolute inset-0 rounded-[22px]" aria-hidden style={{ boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.18)" }} />
            </div>

            {/* floating license card */}
            <div className="v2-card absolute -bottom-5 -left-3 w-[224px] p-4 sm:-left-6 sm:w-[264px]" style={{ boxShadow: "var(--v2-shadow-lg)" }}>
              <div className="flex items-start gap-2.5">
                <span className="mt-0.5 flex h-8 w-8 flex-none items-center justify-center rounded-full" style={{ background: "var(--v2-blue-pale)", color: "var(--v2-blue)" }} aria-hidden>
                  <Shield />
                </span>
                <div>
                  <p className="text-[13px] font-semibold leading-snug" style={{ color: "var(--v2-blue-deep)" }}>Лицензия Минздрава</p>
                  <p className="text-[12px] leading-snug" style={{ color: "var(--v2-text-mid)" }}>№{CLINIC.license}</p>
                  <a href={CLINIC.licenseCheckUrl} target="_blank" rel="noopener noreferrer" className="mt-1 inline-block text-[12px] font-semibold" style={{ color: "var(--v2-blue)" }}>Проверить →</a>
                </div>
              </div>
            </div>

            {/* chief physician accountability chip */}
            <div className="v2-card absolute -right-2 top-5 flex items-center gap-2 py-2 pl-2 pr-3 sm:-right-5" style={{ boxShadow: "var(--v2-shadow-md)" }}>
              <span className="relative h-9 w-9 flex-none overflow-hidden rounded-full" style={{ border: "1px solid var(--v2-border)" }}>
                <Image src="/donor-assets-v2/doctors/romanovsky.jpg" alt="Главный врач Романовский В.О." fill sizes="36px" className="object-cover object-top" data-temp-asset="true" />
              </span>
              <span className="text-[12px] leading-tight" style={{ color: "var(--v2-text)" }}>
                <span className="block font-semibold" style={{ color: "var(--v2-blue-deep)" }}>Главный врач</span>
                Романовский В.О.
              </span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function ChipIconEl({ name }: { name: ChipIcon }) {
  if (name === "shield") return <Shield />;
  if (name === "check")
    return (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <path d="M5 12.5l4.5 4.5L19 7" />
      </svg>
    );
  // spectrum — four soft dots = several disciplines as one system
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <circle cx="7" cy="7" r="2.4" /><circle cx="17" cy="7" r="2.4" /><circle cx="7" cy="17" r="2.4" /><circle cx="17" cy="17" r="2.4" />
    </svg>
  );
}

function Shield() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M12 4l7 2.5V12c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6.5L12 4M9 12l2 2 4-4" />
    </svg>
  );
}
