import Image from "next/image";
import { CLINIC } from "@/lib/data";

/**
 * Hero V4 — fidelity repair (structure = approved V3). Locked message.
 * Phase 1 real logo (TopBarV4). Phase 2 donor wave (ribbon-1.svg, not inline).
 * Phase 3 best human assets (Dvornikova+Selkina real-doctor row) + license scan
 * surfaced as a visible artifact; clinic-first interior + chief accountability.
 * Phase 4 motion: line draw, reveal-mask, ambient wave drift, depth.
 */
type ChipIcon = "shield" | "check" | "spectrum";
const TRUST: { label: string; icon: ChipIcon }[] = [
  { label: "Лицензия Минздрава", icon: "shield" },
  { label: "Без постановки на учёт", icon: "check" },
  { label: "Психиатрия · психотерапия · неврология · терапия", icon: "spectrum" },
];

export function HeroV4() {
  return (
    <section className="relative overflow-hidden" style={{ background: "linear-gradient(177deg, var(--v2-blue-pale-2) 0%, var(--v2-bg) 60%)" }}>
      {/* Donor wave motif (real ribbon-1.svg), ambient drift, behind media */}
      <div className="pointer-events-none absolute right-[-8%] top-[6%] hidden h-[86%] w-[64%] lg:block">
        <Image src="/donor-assets-v2/graphics/ribbon-1.svg" alt="" aria-hidden fill className="v4-drift object-contain object-right-top" style={{ opacity: 0.6 }} />
      </div>

      <div className="v2-container relative grid items-center gap-12 pb-16 pt-12 lg:min-h-[calc(100dvh-80px)] lg:grid-cols-[57fr_43fr] lg:gap-14 lg:pb-24 lg:pt-14">
        {/* LEFT — editorial column */}
        <div className="v4-rise max-w-[40ch] lg:max-w-none">
          <p className="v2-eyebrow mb-4">Лицензированная клиника · Екатеринбург</p>

          <h1 className="v2-h1 max-w-[19ch] lg:max-w-[23ch]">Не нужно угадывать, к какому специалисту идти</h1>

          <span className="v2-hairline v4-draw my-6" aria-hidden />

          <div className="max-w-[60ch] space-y-3">
            <p className="v2-lead">Лицензированная клиника в Екатеринбурге: психиатр, психотерапевт, психолог и невролог работают вместе.</p>
            <p className="v2-lead">Начните с одной консультации — врач разберётся в ситуации и определит, какая помощь вам нужна. Решения и темп остаются за вами. Конфиденциально, без постановки на учёт.</p>
          </div>

          <ul className="mt-7 flex flex-wrap gap-2.5">
            {TRUST.map((t) => (
              <li key={t.label} className="v2-trustchip"><ChipIconEl name={t.icon} /><span>{t.label}</span></li>
            ))}
          </ul>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a href="#zayavka" className="v2-btn v2-btn-primary">Начать с консультации</a>
            <a href={CLINIC.phoneHref} className="v2-btn v2-btn-ghost">Позвонить</a>
          </div>

          {/* best real human assets — real doctor photos as quiet social proof */}
          <div className="mt-8 flex items-center gap-3">
            <div className="flex -space-x-3">
              <span className="v4-avatar"><Image src="/donor-assets-v2/doctors/dvornikova.jpg" alt="Дворникова Е.А." fill sizes="40px" className="object-cover object-top" /></span>
              <span className="v4-avatar"><Image src="/donor-assets-v2/doctors/selkina.jpg" alt="Селькина Е.О." fill sizes="40px" className="object-cover object-top" /></span>
              <span className="v4-avatar"><Image src="/donor-assets-v2/doctors/romanovsky.jpg" alt="Романовский В.О." fill sizes="40px" className="object-cover object-top" data-temp-asset="true" /></span>
            </div>
            <p className="text-[13px] leading-snug" style={{ color: "var(--v2-text-mid)" }}>
              Реальные врачи клиники — <span className="font-semibold" style={{ color: "var(--v2-blue-deep)" }}>6 специалистов</span>
            </p>
          </div>
        </div>

        {/* RIGHT — layered media scene */}
        <div className="relative mx-auto w-full max-w-[420px] lg:max-w-none">
          <div className="v4-depth relative aspect-[4/5] overflow-hidden rounded-[22px]" style={{ boxShadow: "var(--v2-shadow-lg)", border: "1px solid var(--v2-border)" }}>
            <Image
              src="/donor-assets-v2/clinic/interior-1.jpg"
              alt="Кабинет клиники «ПРО спокойствие»"
              fill
              sizes="(max-width: 1024px) 90vw, 43vw"
              priority
              className="v4-mask object-cover"
              style={{ objectPosition: "30% 50%", filter: "saturate(0.9) sepia(0.12) brightness(1.04) contrast(0.97)" }}
              data-temp-asset="true"
            />
            <span className="pointer-events-none absolute inset-0" aria-hidden style={{ background: "linear-gradient(145deg, rgba(125,100,77,0.34) 0%, rgba(125,100,77,0.08) 42%, rgba(56,80,96,0.12) 100%)", mixBlendMode: "multiply" }} />
            <span className="pointer-events-none absolute inset-0" aria-hidden style={{ background: "radial-gradient(120% 80% at 20% 10%, rgba(216,205,187,0.22), transparent 55%)" }} />
            <span className="pointer-events-none absolute inset-0 rounded-[22px]" aria-hidden style={{ boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.18)" }} />
          </div>

          {/* license scan card — REAL scan surfaced as a visible trust artifact */}
          <div className="v2-card v4-depth v4-rise v4-rise-3 absolute -bottom-5 -left-3 flex w-[252px] items-center gap-3 p-3 sm:-left-6 sm:w-[290px]" style={{ boxShadow: "var(--v2-shadow-lg)" }}>
            <span className="relative h-14 w-11 flex-none overflow-hidden rounded-md" style={{ border: "1px solid var(--v2-border)" }}>
              <Image src="/donor-assets-v2/documents/license.jpg" alt="Скан лицензии Минздрава" fill sizes="44px" className="object-cover object-top" />
            </span>
            <div>
              <p className="text-[13px] font-semibold leading-snug" style={{ color: "var(--v2-blue-deep)" }}>Лицензия Минздрава</p>
              <p className="text-[11.5px] leading-snug" style={{ color: "var(--v2-text-mid)" }}>№{CLINIC.license}</p>
              <a href={CLINIC.licenseCheckUrl} target="_blank" rel="noopener noreferrer" className="mt-0.5 inline-block text-[12px] font-semibold" style={{ color: "var(--v2-blue)" }}>Проверить →</a>
            </div>
          </div>

          {/* chief physician accountability chip (kept — canon) */}
          <div className="v2-card v4-rise v4-rise-2 absolute -right-2 top-5 flex items-center gap-2 py-2 pl-2 pr-3 sm:-right-5" style={{ boxShadow: "var(--v2-shadow-md)" }}>
            <span className="relative h-9 w-9 flex-none overflow-hidden rounded-full" style={{ border: "1px solid var(--v2-border)" }}>
              <Image src="/donor-assets-v2/doctors/romanovsky.jpg" alt="Главный врач Романовский В.О." fill sizes="36px" className="object-cover object-top" data-temp-asset="true" />
            </span>
            <span className="text-[12px] leading-tight" style={{ color: "var(--v2-text)" }}>
              <span className="block font-semibold" style={{ color: "var(--v2-blue-deep)" }}>Главный врач</span>
              Романовский В.О.
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

function ChipIconEl({ name }: { name: ChipIcon }) {
  if (name === "shield")
    return (<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M12 4l7 2.5V12c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6.5L12 4M9 12l2 2 4-4" /></svg>);
  if (name === "check")
    return (<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M5 12.5l4.5 4.5L19 7" /></svg>);
  return (<svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden><circle cx="7" cy="7" r="2.4" /><circle cx="17" cy="7" r="2.4" /><circle cx="7" cy="17" r="2.4" /><circle cx="17" cy="17" r="2.4" /></svg>);
}
