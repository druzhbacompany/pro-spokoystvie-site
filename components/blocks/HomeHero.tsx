import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { TagChip } from "@/components/ui/TagChip";
import { CLINIC } from "@/lib/data";

/**
 * Hero «Тёплый горизонт» (HOME PATCH §1). Warm light field + horizon line +
 * editorial display moment. Works without a real photo; interior is optional.
 * Verified chips, not a ·-strip. Soft CTA, not «Записаться».
 */
export function HomeHero() {
  return (
    <section className="warm-field relative overflow-hidden">
      <div className="container-page grid items-center gap-10 pb-16 pt-14 md:min-h-[calc(100dvh-80px)] md:grid-cols-[7fr_5fr] md:gap-12 md:pb-24 md:pt-20">
        <div className="settle is-in max-w-measure">
          <p className="type-caption mb-4 text-text-secondary">
            Клиника «ПРО спокойствие» в Екатеринбурге
          </p>
          <h1 className="type-display">
            Бережная помощь при тревоге, неврозах и зависимом поведении
          </h1>
          <p className="type-lead mt-6">
            Спокойно и конфиденциально, без постановки на учёт. Психиатрия и
            психотерапия с доказанной эффективностью.
          </p>

          <span className="horizon-line my-8" aria-hidden />

          <div className="mb-8 flex flex-wrap gap-2">
            <TagChip tone="verified">Лицензия Минздрава</TagChip>
            <TagChip tone="verified">Без постановки на учёт</TagChip>
            <TagChip tone="verified">{CLINIC.hoursWeek}</TagChip>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Button href="#napravleniya" withArrow>
              Понять, с чего начать
            </Button>
            <Button href={CLINIC.phoneHref} variant="ghost" external>
              Позвонить
            </Button>
          </div>
        </div>

        <div className="relative hidden md:block">
          <div className="relative aspect-[4/5] overflow-hidden rounded-media shadow-md">
            <Image
              src="/assets/clinic/interior-1.jpg"
              alt="Интерьер клиники «ПРО спокойствие»"
              fill
              priority
              sizes="(max-width: 768px) 100vw, 40vw"
              className="object-cover"
              data-temp-asset="true"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
