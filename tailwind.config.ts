import type { Config } from "tailwindcss";

/**
 * Tailwind theme bridges to the frozen "Тихий горизонт" design tokens.
 * Colors reference CSS variables (semantic layer) so light/dark themes
 * are switched centrally in globals.css. No raw hex in components.
 */
const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "var(--color-bg)",
        "bg-alt": "var(--color-bg-alt)",
        surface: "var(--color-surface)",
        "surface-strong": "var(--color-surface-strong)",
        "surface-warm": "var(--color-surface-warm)",
        brand: "var(--color-brand)",
        "brand-hover": "var(--color-brand-hover)",
        "brand-soft": "var(--color-brand-soft)",
        clay: "var(--color-clay)",
        "text-primary": "var(--color-text-primary)",
        "text-secondary": "var(--color-text-secondary)",
        "text-muted": "var(--color-text-muted)",
        border: "var(--color-border)",
        success: "var(--color-success)",
        error: "var(--color-error)",
        "pine-100": "var(--color-pine-100)",
        "pine-700": "var(--color-pine-700)",
      },
      fontFamily: {
        serif: "var(--font-serif)",
        sans: "var(--font-sans)",
      },
      borderRadius: {
        tag: "8px",
        control: "12px",
        card: "16px",
        "card-lg": "20px",
        media: "16px",
      },
      boxShadow: {
        xs: "0 1px 2px rgba(20,50,46,.04)",
        sm: "0 2px 8px rgba(20,50,46,.04)",
        md: "0 8px 24px rgba(20,50,46,.06)",
        lg: "0 16px 48px rgba(20,50,46,.10)",
      },
      maxWidth: {
        container: "1200px",
        measure: "68ch",
      },
      transitionTimingFunction: {
        calm: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
