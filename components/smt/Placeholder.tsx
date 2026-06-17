/** Elegant placeholders for missing PRO data/assets (Phase 3). Never invents facts. */

export function TextPlaceholder({ label = "Информация готовится" }: { label?: string }) {
  return <p className="smt-placeholder !justify-start !text-left">{label}</p>;
}

export function PhotoPlaceholder({
  label = "Фото готовится",
  ratio = "3/4",
  className = "",
}: {
  label?: string;
  ratio?: "3/4" | "4/3" | "1/1" | "16/9";
  className?: string;
}) {
  const aspect =
    ratio === "4/3" ? "aspect-[4/3]" : ratio === "1/1" ? "aspect-square" : ratio === "16/9" ? "aspect-video" : "aspect-[3/4]";
  return (
    <div className={`smt-placeholder ${aspect} ${className}`} role="img" aria-label={label}>
      <span className="flex flex-col items-center gap-2">
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden>
          <rect x="3" y="5" width="18" height="14" rx="2" />
          <circle cx="8.5" cy="10" r="1.5" />
          <path d="M21 16l-5-5L5 19" />
        </svg>
        {label}
      </span>
    </div>
  );
}
