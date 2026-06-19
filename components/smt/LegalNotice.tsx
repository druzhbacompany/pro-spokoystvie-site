/** SMT-style legal notice card for sensitive price sections (remission-only framing). */

const FULL =
  "Услуги данного раздела оказываются только после очной консультации специалиста, при наличии медицинских показаний и вне острого состояния. Клиника работает с пациентами на этапе стабилизации состояния, поддержки ремиссии и профилактики срыва. Экстренная помощь, помощь при острой интоксикации, абстинентном состоянии и состояниях, требующих неотложного медицинского вмешательства, не оказывается.";

const SHORT =
  "Услуги оказываются по медицинским показаниям, после консультации специалиста, только вне острого состояния — на этапе стабилизации, поддержки ремиссии и профилактики срыва. Экстренная помощь и помощь при состояниях, требующих неотложного вмешательства, не оказывается.";

export function LegalNotice({ variant = "full" }: { variant?: "full" | "short" }) {
  return (
    <div
      role="note"
      className="mt-5 flex gap-3 rounded-[15px] border p-4 sm:p-5"
      style={{ borderColor: "var(--smt-border)", background: "var(--smt-grey)" }}
    >
      <svg
        width="22" height="22" viewBox="0 0 24 24" fill="none"
        stroke="var(--smt-blue)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"
        className="mt-0.5 flex-none" aria-hidden
      >
        <circle cx="12" cy="12" r="9" />
        <path d="M12 8h.01M11 12h1v4h1" />
      </svg>
      <p className="text-[14px] leading-relaxed" style={{ color: "var(--smt-text)" }}>
        {variant === "short" ? SHORT : FULL}
      </p>
    </div>
  );
}
