import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { SiteHeader } from "@/components/smt/SiteHeader";
import { SiteFooter } from "@/components/smt/SiteFooter";
import { Breadcrumbs } from "@/components/smt/Breadcrumbs";
import { Cta } from "@/components/smt/Cta";
import { BRANCHES, branchBySlug, CLINIC } from "@/lib/data";

export function generateStaticParams() {
  return BRANCHES.map((b) => ({ slug: b.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const b = branchBySlug(params.slug);
  if (!b) return {};
  return {
    title: `${b.title} — адрес, карта, режим работы`,
    description: `${b.title}: ${b.address}. ${b.hoursWeek}, ${b.hoursWeekend}. Запись: ${CLINIC.phone}.`,
  };
}

export default function BranchPage({ params }: { params: { slug: string } }) {
  const b = branchBySlug(params.slug);
  if (!b) notFound();

  return (
    <div className="smt">
      <SiteHeader active="Контакты" />
      <Breadcrumbs
        items={[
          { label: "Главная", href: "/" },
          { label: "Контакты", href: "/kontakty/" },
          { label: b.title },
        ]}
      />
      <main id="main">
        {/* Hero */}
        <section className="smt-section smt-section-alt">
          <div className="smt-container max-w-[72ch]">
            <p className="smt-eyebrow">Филиал · Екатеринбург</p>
            <h1 className="smt-h1 mt-2">{b.title}</h1>
            <p className="smt-lead mt-4 smt-muted">{b.address}</p>
            <ul className="mt-5 space-y-1.5 smt-body smt-muted">
              <li>{b.hoursWeek} · {b.hoursWeekend}</li>
              <li><a href={b.phoneHref} className="smt-link">{b.phone}</a></li>
            </ul>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Link href="#zayavka" className="smt-btn smt-btn-primary">Записаться на приём</Link>
              <a href={b.routeUrl} target="_blank" rel="noopener noreferrer" className="smt-btn smt-btn-ghost">Построить маршрут</a>
            </div>
          </div>
        </section>

        {/* Description */}
        {b.description && (
          <section className="smt-section">
            <div className="smt-container grid gap-10 md:grid-cols-2">
              <div>
                <h2 className="smt-h2">О филиале</h2>
                <p className="mt-4 smt-body smt-muted">{b.description}</p>
              </div>
              {b.howToFind && b.howToFind.length > 0 && (
                <div>
                  <h2 className="smt-h2">Как пройти и ориентиры</h2>
                  <ul className="mt-4 flex flex-col gap-2">
                    {b.howToFind.map((item) => (
                      <li key={item} className="flex gap-3 smt-body smt-muted">
                        <span
                          className="mt-[8px] h-[7px] w-[7px] shrink-0 rounded-full"
                          style={{ background: "var(--smt-blue)", opacity: 0.7 }}
                          aria-hidden="true"
                        />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </section>
        )}

        {/* Embedded Yandex map */}
        <section className="smt-section smt-section-alt">
          <div className="smt-container">
            <h2 className="smt-h2">На карте</h2>
            <div
              className="mt-6 overflow-hidden rounded-[15px] border"
              style={{ borderColor: "var(--smt-border)" }}
            >
              <iframe
                src={b.mapEmbedUrl}
                title={`Карта: ${b.title}, ${b.address}`}
                width="100%"
                height="420"
                loading="lazy"
                style={{ border: 0, display: "block", width: "100%" }}
                allowFullScreen
              />
            </div>
            <div className="mt-4 flex flex-wrap gap-4">
              <a href={b.yandexMaps} target="_blank" rel="noopener noreferrer" className="smt-link">Открыть в Яндекс.Картах →</a>
              <a href={b.routeUrl} target="_blank" rel="noopener noreferrer" className="smt-link">Построить маршрут →</a>
            </div>
          </div>
        </section>

        {/* Gallery */}
        {b.gallery && b.gallery.length > 0 && (
          <section className="smt-section">
            <div className="smt-container">
              <h2 className="smt-h2">Фотографии филиала</h2>
              <ul
                className="mt-8"
                style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "16px" }}
              >
                {b.gallery.map((photo) => (
                  <li
                    key={photo.src}
                    style={{ position: "relative", aspectRatio: "4 / 3", overflow: "hidden", borderRadius: "12px", background: "var(--smt-grey)" }}
                  >
                    <Image
                      src={photo.src}
                      alt={photo.alt}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover"
                    />
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}

        <Cta title={`Записаться · ${b.title}`} sourceBlock={`filial-${b.slug}`} alt />
      </main>
      <SiteFooter />
    </div>
  );
}
