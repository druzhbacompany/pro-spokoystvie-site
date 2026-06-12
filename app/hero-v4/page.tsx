import type { Metadata } from "next";
import { TopBarV4 } from "@/components/v4/TopBarV4";
import { HeroV4 } from "@/components/v4/HeroV4";

export const metadata: Metadata = {
  title: "Hero V4 — preview",
  robots: { index: false, follow: false },
};

/** Isolated preview: TopBar + Hero V4 only (fidelity repair). Donor tokens via .theme-v2. */
export default function HeroV4Preview() {
  return (
    <div className="theme-v2" style={{ minHeight: "100dvh", background: "var(--v2-bg)" }}>
      <TopBarV4 />
      <main>
        <HeroV4 />
      </main>
    </div>
  );
}
