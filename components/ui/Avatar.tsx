import Image from "next/image";
import type { Doctor } from "@/lib/data";

/**
 * Doctor portrait or dignified initials fallback (pine-100 / pine-700).
 * Initials are allowed ONLY in the catalogue, never as hero/featured.
 * Temp photos carry data-temp-asset for post-photoshoot replacement.
 */
export function Avatar({
  doctor,
  ratio = "3/4",
  className = "",
  sizes = "(max-width: 768px) 100vw, 33vw",
  priority = false,
}: {
  doctor: Doctor;
  ratio?: "3/4" | "4/5" | "1/1";
  className?: string;
  sizes?: string;
  priority?: boolean;
}) {
  const aspect =
    ratio === "1/1"
      ? "aspect-square"
      : ratio === "4/5"
        ? "aspect-[4/5]"
        : "aspect-[3/4]";

  if (doctor.photo) {
    return (
      <div
        className={`relative overflow-hidden rounded-media bg-bg-alt ${aspect} ${className}`}
        data-temp-asset={doctor.photoStatus === "temp" ? "true" : undefined}
      >
        <Image
          src={doctor.photo}
          alt={`Фото: ${doctor.name}, ${doctor.specialty}`}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover object-top"
        />
      </div>
    );
  }

  return (
    <div
      className={`flex items-center justify-center rounded-media bg-pine-100 ${aspect} ${className}`}
      role="img"
      aria-label={`${doctor.name}, ${doctor.specialty}`}
    >
      <span
        className="font-serif text-pine-700"
        style={{ fontSize: "clamp(2rem, 6vw, 3.5rem)" }}
        aria-hidden
      >
        {doctor.initials}
      </span>
    </div>
  );
}
