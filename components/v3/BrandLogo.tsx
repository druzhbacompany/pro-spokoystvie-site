/**
 * Crisp double-ring brand mark + Manrope wordmark (high contrast).
 * Replaces V2's low-contrast raster logo. Blue + beige interlocking rings
 * = donor DNA. Uses currentColor-independent token strokes.
 */
export function BrandLogo({ className = "", white = false }: { className?: string; white?: boolean }) {
  const blue = white ? "#FFFFFF" : "var(--v2-blue)";
  const beige = white ? "#D8CDBB" : "var(--v2-beige)";
  const text = white ? "#FFFFFF" : "var(--v2-blue-deep)";
  const sub = white ? "rgba(255,255,255,.8)" : "var(--v2-blue)";
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`} aria-label="ПРО спокойствие">
      <svg width="34" height="34" viewBox="0 0 40 40" fill="none" aria-hidden className="flex-none">
        <ellipse cx="16" cy="20" rx="10.5" ry="13.5" stroke={blue} strokeWidth="3.4" transform="rotate(-16 16 20)" />
        <ellipse cx="24" cy="20" rx="10.5" ry="13.5" stroke={beige} strokeWidth="3.4" transform="rotate(-16 24 20)" />
      </svg>
      <span className="flex flex-col leading-none">
        <span className="font-[700] tracking-tight" style={{ color: text, fontSize: "1.05rem", lineHeight: 1.05 }}>
          ПРО&nbsp;спокойствие
        </span>
        <span className="mt-0.5 text-[10px] font-medium uppercase tracking-[0.14em]" style={{ color: sub }}>
          медицинский центр
        </span>
      </span>
    </span>
  );
}
