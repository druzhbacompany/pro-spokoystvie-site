import { Avatar } from "@/components/ui/Avatar";
import { Button } from "@/components/ui/Button";
import { TagChip } from "@/components/ui/TagChip";
import { Reveal } from "@/components/ui/Reveal";
import { bySlug } from "@/lib/data";

/**
 * Home Featured doctor (HOME PATCH §4). Day-1 visual featured = Dvornikova
 * (real photo). Chief anchor line keeps Romanovsky readable as medical lead
 * (DL-CHIEF) without his large portrait until reshoot.
 */
export function FeaturedDoctor() {
  const featured = bySlug("dvornikova-ea");
  const chief = bySlug("romanovsky-vo");
  if (!featured || !chief) return null;

  return (
    <div className="grid items-center gap-10 md:grid-cols-[5fr_7fr] md:gap-14">
      <Reveal>
        <div className="mx-auto w-full max-w-sm">
          <Avatar doctor={featured} ratio="3/4" priority={false} />
        </div>
      </Reveal>

      <Reveal delay={80}>
        <div className="max-w-measure">
          <p className="type-eyebrow mb-3">Познакомьтесь ближе</p>
          <span className="horizon-line mb-5" aria-hidden />
          <h3 className="type-h2 font-serif">{featured.name}</h3>
          <p className="type-lead mt-2">{featured.specialty}</p>

          <div className="mt-5 flex flex-wrap gap-2">
            {featured.helps.map((h) => (
              <TagChip key={h}>{h}</TagChip>
            ))}
          </div>

          <blockquote className="type-lead mt-6 border-l-2 border-brand-soft pl-5 italic text-text-secondary">
            «Тревога — не слабость характера. У неё есть причины, и с ними можно
            работать спокойно, в вашем темпе.»
          </blockquote>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <Button href="/vrachi/" variant="ghost" withArrow>
              Все специалисты
            </Button>
          </div>

          <p className="type-caption mt-8 rounded-card border border-border bg-surface p-4">
            Клинику возглавляет главный врач{" "}
            <strong className="font-medium text-text-primary">
              {chief.shortName}
            </strong>{" "}
            — {chief.specialty.toLowerCase()}. Он задаёт стандарт помощи каждого
            специалиста.{" "}
            <a href="/vrachi/romanovsky-vo/" className="text-brand hover:underline">
              О главном враче →
            </a>
          </p>
        </div>
      </Reveal>
    </div>
  );
}
