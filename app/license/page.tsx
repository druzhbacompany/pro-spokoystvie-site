import type { Metadata } from "next";
import { LegalPageLayout } from "@/components/smt/LegalPageLayout";
import { CLINIC } from "@/lib/data";

export const metadata: Metadata = {
  title: "Сведения о лицензии — ПРО спокойствие",
  description: "Сведения о медицинской лицензии ООО «Ромис-В», МЦ «ПРО Спокойствие».",
};

export default function LicensePage() {
  return (
    <LegalPageLayout title="Сведения о медицинской лицензии" breadcrumb="Лицензия">
      <div className="legal-prose">
        <h2>Реквизиты лицензии</h2>
        <table>
          <tbody>
            <tr><td><strong>Номер лицензии</strong></td><td>Л041-01021-66/04064884</td></tr>
            <tr><td><strong>Дата предоставления</strong></td><td>24.12.2025</td></tr>
            <tr><td><strong>Срок действия</strong></td><td>Бессрочно</td></tr>
            <tr><td><strong>Лицензиат</strong></td><td>ООО «Ромис-В»</td></tr>
            <tr><td><strong>Лицензирующий орган</strong></td><td>Министерство здравоохранения Свердловской области</td></tr>
            <tr><td><strong>Адрес деятельности</strong></td><td>620058, Свердловская область, г. Екатеринбург, проспект Космонавтов, д. 101-Б</td></tr>
            <tr><td><strong>Реквизиты решения</strong></td><td>Приказ № 1499-Л от 24.12.2025</td></tr>
          </tbody>
        </table>

        <h2>Перечень работ (услуг)</h2>
        <p>При оказании первичной доврачебной медико-санитарной помощи в амбулаторных условиях по:</p>
        <ul>
          <li>медицинскому массажу;</li>
          <li>сестринскому делу.</li>
        </ul>
        <p>При оказании первичной врачебной медико-санитарной помощи в амбулаторных условиях по:</p>
        <ul>
          <li>терапии.</li>
        </ul>
        <p>При оказании первичной специализированной медико-санитарной помощи в амбулаторных условиях по:</p>
        <ul>
          <li>неврологии;</li>
          <li>психиатрии;</li>
          <li>психотерапии.</li>
        </ul>

        <h2>Выписка из реестра лицензий</h2>
        <p>Актуальные сведения о лицензии доступны в Едином реестре лицензий на сайте Росздравнадзора.</p>
        <a
          href={CLINIC.licenseCheckUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="smt-link"
        >
          Проверить лицензию в Росздравнадзоре →
        </a>
      </div>
    </LegalPageLayout>
  );
}
