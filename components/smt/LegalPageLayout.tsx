import type { ReactNode } from "react";
import { SiteHeader } from "@/components/smt/SiteHeader";
import { SiteFooter } from "@/components/smt/SiteFooter";
import { Breadcrumbs } from "@/components/smt/Breadcrumbs";
import { LegalNav } from "@/components/smt/LegalNav";

interface Props {
  title: string;
  breadcrumb: string;
  children: ReactNode;
  updatedNote?: string;
}

export function LegalPageLayout({ title, breadcrumb, children, updatedNote }: Props) {
  return (
    <div className="smt">
      <SiteHeader />
      <Breadcrumbs
        items={[
          { label: "Главная", href: "/" },
          { label: "Документы", href: "/dokumenty" },
          { label: breadcrumb },
        ]}
      />
      <main id="main">
        <section className="smt-section">
          <div className="smt-container">
            <div className="grid gap-12 lg:grid-cols-[220px_1fr]">
              <aside className="hidden lg:block">
                <div className="sticky top-8">
                  <LegalNav />
                </div>
              </aside>
              <div className="min-w-0">
                <p className="smt-eyebrow">Правовые документы · МЦ «ПРО Спокойствие»</p>
                <h1 className="smt-h1 mt-2">{title}</h1>
                {updatedNote && (
                  <p className="mt-3 text-[14px] smt-muted">{updatedNote}</p>
                )}
                <p className="mt-3 text-[13px] rounded-[10px] px-4 py-3 smt-muted" style={{ background: "var(--smt-alt-bg, #f5f3ee)" }}>
                  Черновик документа. Актуальность подтверждается юристом перед публикацией.
                </p>
                <div className="legal-prose mt-8">
                  {children}
                </div>
                <div className="mt-10 block lg:hidden">
                  <p className="smt-eyebrow mb-4">Другие документы</p>
                  <LegalNav />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
