import type { Metadata, Viewport } from "next";
import { Lora, Onest, Manrope } from "next/font/google";
import "./globals.css";
import { CLINIC } from "@/lib/data";
import { CookieBanner } from "@/components/smt/CookieBanner";
import { MedflexRoundWidget } from "@/components/smt/MedflexRoundWidget";

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

const SITE_URL = "https://pro-spokoystvie.ru";
const OG_IMAGE = "/assets/hero/home-hero-team-checkup.png";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "ПРО Спокойствие — психиатрия, психотерапия, психология и неврология в Екатеринбурге",
    template: "%s — ПРО Спокойствие",
  },
  description:
    "Медицинский центр «ПРО Спокойствие» в Екатеринбурге: консультации психиатра, психотерапевта, психолога и невролога. Спокойный приём, медицинская лицензия, очные консультации.",
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    locale: "ru_RU",
    siteName: "ПРО Спокойствие",
    url: SITE_URL,
    title: "ПРО Спокойствие — психиатрия, психотерапия, психология и неврология в Екатеринбурге",
    description:
      "Медицинский центр «ПРО Спокойствие» в Екатеринбурге: консультации психиатра, психотерапевта, психолога и невролога. Медицинская лицензия, очные консультации.",
    images: [
      {
        url: OG_IMAGE,
        width: 1672,
        height: 941,
        alt: "Команда медицинского центра «ПРО Спокойствие»",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ПРО Спокойствие — психиатрия, психотерапия, психология и неврология в Екатеринбурге",
    description:
      "Медицинский центр в Екатеринбурге: психиатр, психотерапевт, психолог и невролог. Очные консультации, медицинская лицензия.",
    images: [OG_IMAGE],
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
  "@id": `${SITE_URL}/#clinic`,
  name: "Медицинский центр «ПРО Спокойствие»",
  legalName: CLINIC.legalName,
  url: SITE_URL,
  // Валидные значения MedicalSpecialty schema.org; психотерапия/психология/терапия отражены в knowsAbout.
  medicalSpecialty: ["Psychiatric", "Neurologic"],
  knowsAbout: [
    "Психиатрия",
    "Психотерапия",
    "Психология",
    "Неврология",
    "Терапия",
    "IV-терапия по назначению врача",
    "Поддержка ремиссии",
  ],
  telephone: CLINIC.phone,
  email: CLINIC.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: "проспект Космонавтов, 101-Б",
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

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  name: "ПРО Спокойствие",
  url: SITE_URL,
  inLanguage: "ru-RU",
  publisher: { "@id": `${SITE_URL}/#clinic` },
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        {children}
        <CookieBanner />
        {/* Сквозная круглая кнопка онлайн-записи МедФлекс — на всех страницах сайта. */}
        <MedflexRoundWidget />
      </body>
    </html>
  );
}
