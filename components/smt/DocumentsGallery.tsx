"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { DOCUMENTS } from "@/lib/data";

type Doc = (typeof DOCUMENTS)[number];

/** SMT-style documents gallery with in-page lightbox (no new tab, no download). */
export function DocumentsGallery() {
  const [active, setActive] = useState<Doc | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const close = useCallback(() => setActive(null), []);

  useEffect(() => {
    if (!active) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
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
      <ul className="grid gap-6 sm:grid-cols-2">
        {DOCUMENTS.map((doc) => (
          <li key={doc.src}>
            <button
              type="button"
              onClick={() => setActive(doc)}
              aria-haspopup="dialog"
              aria-label={`Открыть документ: ${doc.label}`}
              className="smt-card is-link flex h-full w-full flex-col overflow-hidden text-left"
            >
              <span className="relative block aspect-[4/3]" style={{ background: "var(--smt-grey)" }}>
                <Image src={doc.src} alt={doc.label} fill sizes="(max-width:768px) 100vw, 45vw" className="object-contain p-2" />
              </span>
              <span className="flex flex-1 flex-col smt-card-pad">
                <span className="smt-h3">{doc.label}</span>
                <span className="mt-2 flex-1 text-[15px] smt-muted">{doc.desc}</span>
                <span className="smt-link mt-4 inline-flex">Смотреть документ →</span>
              </span>
            </button>
          </li>
        ))}
      </ul>

      {active ? (
        <div role="dialog" aria-modal="true" aria-labelledby="smt-doc-title" onClick={close} className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm sm:p-8">
          <div onClick={(e) => e.stopPropagation()} className="flex max-h-[92vh] w-full max-w-3xl flex-col overflow-hidden rounded-[15px] bg-white shadow-xl">
            <div className="flex items-center justify-between gap-4 border-b px-5 py-4" style={{ borderColor: "var(--smt-border)" }}>
              <h3 id="smt-doc-title" className="smt-h3">{active.label}</h3>
              <button ref={closeRef} type="button" onClick={close} aria-label="Закрыть" className="flex h-10 w-10 flex-none items-center justify-center rounded-[12px]" style={{ color: "var(--smt-dark)" }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden><path d="M6 6l12 12M18 6L6 18" /></svg>
              </button>
            </div>
            <div className="overflow-auto p-3 sm:p-5" style={{ background: "var(--smt-grey)" }}>
              <Image src={active.src} alt={active.label} width={1200} height={1600} sizes="(max-width:768px) 92vw, 768px" className="mx-auto h-auto w-full max-w-full rounded-[10px]" />
            </div>
            <p className="border-t px-5 py-3 text-[13px] smt-muted" style={{ borderColor: "var(--smt-border)" }}>{active.desc}</p>
          </div>
        </div>
      ) : null}
    </>
  );
}
