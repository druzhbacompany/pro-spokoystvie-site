import type { Metadata } from "next";
import { TopBarV3 } from "@/components/v3/TopBarV3";
import { HeroV3 } from "@/components/v3/HeroV3";

export const metadata: Metadata = {
  title: "Hero V3 — preview",
  robots: { index: false, follow: false },
};

/** Isolated preview: TopBar + Hero V3 only. Donor-brand tokens via .theme-v2. */
export default function HeroV3Preview() {
  return (
    <div className="theme-v2" style={{ minHeight: "100dvh", background: "var(--v2-bg)" }}>
      <TopBarV3 />
      <main>
        <HeroV3 />
      </main>
    </div>
  );
}
