import Link from "next/link";
import type { ReactNode } from "react";
import { Icon } from "./Icon";

type Variant = "primary" | "ghost" | "tertiary";

type Props = {
  href: string;
  children: ReactNode;
  variant?: Variant;
  withArrow?: boolean;
  fullWidth?: boolean;
  ariaLabel?: string;
  external?: boolean;
};

const base =
  "group inline-flex items-center justify-center gap-2 rounded-control font-sans font-medium " +
  "min-h-[52px] px-6 text-[1rem] transition-all duration-[180ms] ease-calm " +
  "active:scale-[0.98] focus-visible:outline-none";

const variants: Record<Variant, string> = {
  primary:
    "bg-brand text-[#fcfbf8] shadow-sm hover:bg-brand-hover hover:-translate-y-[2px] hover:shadow-md",
  ghost:
    "border border-border text-text-primary hover:bg-bg-alt hover:-translate-y-[1px]",
  tertiary: "text-brand hover:text-brand-hover underline-offset-4 hover:underline px-0 min-h-0",
};

/** CTA button. Trailing arrow nests in its own circle (soft-skill button-in-button). */
export function Button({
  href,
  children,
  variant = "primary",
  withArrow = false,
  fullWidth = false,
  ariaLabel,
  external = false,
}: Props) {
  const cls = `${base} ${variants[variant]} ${fullWidth ? "w-full" : ""}`;
  const inner = (
    <>
      <span>{children}</span>
      {withArrow ? (
        <span
          className="flex h-7 w-7 items-center justify-center rounded-full bg-black/[0.06] transition-transform duration-[180ms] ease-calm group-hover:translate-x-[2px] dark:bg-white/10"
          aria-hidden
        >
          <Icon name="arrow" size={16} />
        </span>
      ) : null}
    </>
  );

  if (external) {
    return (
      <a
        href={href}
        className={cls}
        aria-label={ariaLabel}
        target="_blank"
        rel="noopener noreferrer"
      >
        {inner}
      </a>
    );
  }
  return (
    <Link href={href} className={cls} aria-label={ariaLabel}>
      {inner}
    </Link>
  );
}
