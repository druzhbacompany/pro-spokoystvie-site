import type { Metadata, Viewport } from "next";
import { Lora, Onest, Manrope } from "next/font/google";
import "./globals.css";
import { CLINIC } from "@/lib/data";
import { CookieBanner } from "@/components/smt/CookieBanner";

const lora = Lora({
  subsets: ["latin", "cyrillic"],
  weight: ["500", "600"],
  variable: "--font-lora",
  display: "swap",
});

const onest = Onest({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600"],
  variable: "--font-onest",
  display: "swap",
});

// V2 donor brand font
const manrope = Manrope({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://pro-spokoystvie.ru"),
  title: {
    default: "ПРО спокойствие — психиатрия и психотерапия в Екатеринбурге",
    template: "%s — ПРО спокойствие",
  },
  description:
    "Бережная помощь при тревоге, неврозах и зависимом поведении. Спокойно и конфиденциально, без постановки на учёт. Психиатрия и психотерапия с доказанной эффективностью.",
  openGraph: {
    type: "website",
    locale: "ru_RU",
    siteName: "ПРО спокойствие",
    title: "ПРО спокойствие — психиатрия и психотерапия в Екатеринбурге",
    description:
      "Бережная помощь при тревоге, неврозах и зависимом поведении. Конфиденциально, без постановки на учёт.",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#10231f",
};

const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": "MedicalClinic",
  name: "ПРО спокойствие",
  legalName: CLINIC.legalName,
  medicalSpecialty: ["Psychiatric", "Psychotherapy"],
  telephone: CLINIC.phone,
  email: CLINIC.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: "пр-кт Космонавтов, 101б",
    addressLocality: "Екатеринбург",
    addressCountry: "RU",
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "08:00",
      closes: "20:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Saturday", "Sunday"],
      opens: "09:00",
      closes: "17:00",
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru" className={`${lora.variable} ${onest.variable} ${manrope.variable}`}>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-control focus:bg-brand focus:px-4 focus:py-2 focus:text-[#fcfbf8]"
        >
          К основному содержанию
        </a>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
        {children}
        <CookieBanner />
      </body>
    </html>
  );
}
