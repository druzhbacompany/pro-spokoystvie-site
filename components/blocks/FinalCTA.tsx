import { BookingForm } from "@/components/ui/BookingForm";
import { Reveal } from "@/components/ui/Reveal";

/** FinalCTA — the single booking form on a page (trust-before-form). */
export function FinalCTA({
  title = "Не знаете, с чего начать?",
  lead = "Оставьте номер — подберём специалиста и удобное время. Конфиденциально, без давления.",
  lockedDoctor,
  showDoctorSelect = true,
}: {
  title?: string;
  lead?: string;
  lockedDoctor?: string;
  showDoctorSelect?: boolean;
}) {
  return (
    <div id="zayavka" className="mx-auto max-w-[760px]" style={{ scrollMarginTop: "96px" }}>
      <Reveal>
        <div className="mb-8 text-center">
          <span className="horizon-line mx-auto mb-5" aria-hidden />
          <h2 className="type-h2">{title}</h2>
          <p className="type-lead mx-auto mt-4 max-w-xl">{lead}</p>
        </div>
        <BookingForm lockedDoctor={lockedDoctor} showDoctorSelect={showDoctorSelect} />
      </Reveal>
    </div>
  );
}
