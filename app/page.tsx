import type { Metadata } from "next";
import { TopBarV4 } from "@/components/v4/TopBarV4";
import { HeroV4 } from "@/components/v4/HeroV4";
import {
  ProcessSection, ConditionsSection, DirectionsSection, TeamSection, ChiefSection,
  LicenseSection, ProgramsSection, PricingSection, FaqSection, ContactsSection,
} from "@/components/v4/HomeSectionsV4";
import { FooterV4 } from "@/components/v4/FooterV4";

export const metadata: Metadata = {
  title: "ПРО спокойствие — психотерапия, психология, психиатрия и неврология в Екатеринбурге",
  description:
    "Лицензированная клиника в Екатеринбурге: психиатр, психотерапевт, психолог и невролог работают вместе. Начните с одной консультации — конфиденциально, без постановки на учёт.",
};

/** Homepage V1 — V4 visual language, ASSET_CANON_V2, donor brand. Isolated route for review. */
export default function HomeV1() {
  return (
    <div className="theme-v2" style={{ minHeight: "100dvh", background: "var(--v2-bg)" }}>
      <TopBarV4 />
      <main id="main">
        <HeroV4 />
        <ProcessSection />
        <ConditionsSection />
        <DirectionsSection />
        <TeamSection />
        <ChiefSection />
        <LicenseSection />
        <ProgramsSection />
        <PricingSection />
        <FaqSection />
        <ContactsSection />
      </main>
      <FooterV4 />
    </div>
  );
}
