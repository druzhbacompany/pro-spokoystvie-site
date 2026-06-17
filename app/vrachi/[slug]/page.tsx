import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DoctorProfile } from "@/components/smt/DoctorProfile";
import { DOCTORS, bySlug } from "@/lib/data";

export function generateStaticParams() {
  return DOCTORS.filter((d) => d.role !== "chief").map((d) => ({ slug: d.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const d = bySlug(params.slug);
  if (!d || d.role === "chief") return {};
  return {
    title: `${d.shortName} — ${d.specialty} в Екатеринбурге`,
    description: `${d.name} — ${d.specialty.toLowerCase()} клиники «ПРО спокойствие». Помогает при: ${d.helps.join(", ").toLowerCase()}. Конфиденциально, без постановки на учёт.`,
  };
}

export default function DoctorPage({ params }: { params: { slug: string } }) {
  const doctor = bySlug(params.slug);
  if (!doctor || doctor.role === "chief") notFound();
  return <DoctorProfile doctor={doctor} />;
}
