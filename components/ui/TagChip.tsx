import type { ReactNode } from "react";

/** Real chip element (AS-4): each tag is its own element, never a ·-separated string. */
export function TagChip({
  children,
  tone = "soft",
}: {
  children: ReactNode;
  tone?: "soft" | "verified";
}) {
  const cls =
    tone === "verified"
      ? "border-border bg-surface text-text-secondary"
      : "border-transparent bg-pine-100 text-pine-700";
  return (
    <span
      className={`inline-flex items-center rounded-tag border px-3 py-1.5 text-sm font-medium ${cls}`}
    >
      {children}
    </span>
  );
}
