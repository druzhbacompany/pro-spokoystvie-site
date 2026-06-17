import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DoctorProfile } from "@/components/smt/DoctorProfile";
import { bySlug } from "@/lib/data";

const doctor = bySlug("romanovsky-vo");

export const metadata: Metadata = {
  title: "Романовский В.О. — главный врач, психиатр и психотерапевт",
  description:
    "Романовский Владимир Олегович — главный врач клиники «ПРО спокойствие», врач-психиатр и психотерапевт. Спокойный подход без давления и осуждения. Запись на приём.",
};

export default function RomanovskyPage() {
  if (!doctor) notFound();
  return <DoctorProfile doctor={doctor} />;
}
