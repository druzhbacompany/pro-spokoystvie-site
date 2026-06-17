import type { Metadata } from "next";
import { SiteHeader } from "@/components/smt/SiteHeader";
import { SiteFooter } from "@/components/smt/SiteFooter";
import { Breadcrumbs } from "@/components/smt/Breadcrumbs";
import { ServiceCard } from "@/components/smt/ServiceCard";
import { Cta } from "@/components/smt/Cta";
import { SERVICES, SERVICE_CATEGORIES } from "@/lib/data";

export const metadata: Metadata = {
  title: "Услуги клиники — направления помощи в Екатеринбурге",
  description:
    "Направления помощи клиники «ПРО спокойствие»: тревога, панические атаки, депрессия, бессонница, ОКР, поддержка при зависимом поведении, неврология. Конфиденциально.",
};

export default function ServicesIndexPage() {
  return (
    <div className="smt">
      <SiteHeader active="Услуги" />
      <Breadcrumbs items={[{ label: "Главная", href: "/" }, { label: "Услуги" }]} />
      <main id="main">
        <section className="smt-section">
          <div className="smt-container">
            <p className="smt-eyebrow">С чем мы помогаем</p>
            <h1 className="smt-h1 mt-2">Направления помощи</h1>
            <p className="smt-lead mt-4 max-w-[68ch] smt-muted">
              Помогаем при тревоге, панических атаках, сниженном настроении, бессоннице и других состояниях — методами с доказанной эффективностью. Не уверены, что подойдёт? Оставьте заявку — подберём.
            </p>
            <div className="mt-10 space-y-12">
              {SERVICE_CATEGORIES.map((cat) => {
                const items = SERVICES.filter((s) => s.category === cat);
                if (!items.length) return null;
                return (
                  <div key={cat}>
                    <h2 className="smt-h2 mb-5">{cat}</h2>
                    <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                      {items.map((s) => (<li key={s.slug}><ServiceCard s={s} /></li>))}
                    </ul>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
        <Cta alt />
      </main>
      <SiteFooter />
    </div>
  );
}
