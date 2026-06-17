"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { Icon } from "@/components/ui/Icon";
import { DOCUMENTS } from "@/lib/data";

type Doc = (typeof DOCUMENTS)[number];

/**
 * Documents gallery with in-page lightbox.
 * Clicking a card opens the scan in a modal (title + large image + close).
 * ESC / click-outside / close button dismiss. No new tab, no download.
 */
export function DocumentsGallery() {
  const [active, setActive] = useState<Doc | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  const close = useCallback(() => setActive(null), []);

  useEffect(() => {
    if (!active) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [active, close]);

  return (
    <>
      <ul className="mt-10 grid gap-8 sm:grid-cols-2">
        {DOCUMENTS.map((doc, i) => (
          <Reveal key={doc.src} delay={(i % 2) * 70} as="li">
            <button
              type="button"
              onClick={() => setActive(doc)}
              aria-haspopup="dialog"
              aria-label={`Открыть документ: ${doc.label}`}
              className="flex h-full w-full flex-col overflow-hidden rounded-card border border-border bg-surface text-left shadow-sm transition-all duration-[200ms] ease-calm hover:-translate-y-[2px] hover:shadow-md"
            >
              <span className="relative block aspect-[4/3] bg-bg-alt">
                <Image
                  src={doc.src}
                  alt={doc.label}
                  fill
                  sizes="(max-width: 768px) 100vw, 45vw"
                  className="object-contain object-center p-2"
                />
              </span>
              <span className="flex flex-1 flex-col p-6">
                <span className="type-h4">{doc.label}</span>
                <span className="type-body-sm mt-2 flex-1 text-text-secondary">{doc.desc}</span>
                <span className="mt-5 inline-flex items-center gap-1.5 font-medium text-brand">
                  Смотреть документ <Icon name="arrow" size={18} />
                </span>
              </span>
            </button>
          </Reveal>
        ))}
      </ul>

      {active ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="doc-modal-title"
          onClick={close}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm sm:p-8"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="flex max-h-[92vh] w-full max-w-3xl flex-col overflow-hidden rounded-card bg-surface shadow-lg"
          >
            <div className="flex items-center justify-between gap-4 border-b border-border px-5 py-4">
              <h3 id="doc-modal-title" className="type-h4">
                {active.label}
              </h3>
              <button
                ref={closeRef}
                type="button"
                onClick={close}
                aria-label="Закрыть"
                className="flex h-10 w-10 flex-none items-center justify-center rounded-control text-text-primary transition-colors hover:bg-bg-alt"
              >
                <Icon name="close" size={24} />
              </button>
            </div>
            <div className="overflow-auto bg-bg-alt p-3 sm:p-5">
              <Image
                src={active.src}
                alt={active.label}
                width={1200}
                height={1600}
                sizes="(max-width: 768px) 92vw, 768px"
                className="mx-auto h-auto w-full max-w-full rounded-media"
              />
            </div>
            <p className="border-t border-border px-5 py-3 type-caption text-text-secondary">
              {active.desc}
            </p>
          </div>
        </div>
      ) : null}
    </>
  );
}
