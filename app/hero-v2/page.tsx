import type { Metadata } from "next";
import { TopBarV2 } from "@/components/v2/TopBarV2";
import { HeroV2 } from "@/components/v2/HeroV2";

export const metadata: Metadata = {
  title: "Hero V2 — preview",
  robots: { index: false, follow: false },
};

/**
 * Isolated preview of TopBar + Hero V2 only (MODE: HERO V2 ONLY).
 * Wrapped in .theme-v2 so donor-brand tokens apply without touching
 * the existing pine homepage. No sections below the hero.
 */
export default function HeroV2Preview() {
  return (
    <div className="theme-v2" style={{ minHeight: "100dvh", background: "var(--v2-bg)" }}>
      <TopBarV2 />
      <main>
        <HeroV2 />
      </main>
    </div>
  );
}
