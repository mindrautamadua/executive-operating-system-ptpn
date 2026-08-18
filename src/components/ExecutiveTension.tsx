import { CircleCheck, CircleAlert, Scale, Gavel } from "lucide-react";
import { executiveTensions } from "@/lib/ceo-data";

/**
 * Executive Tension — contradiction detection per domain: headline yang bagus
 * disandingkan dengan underlying yang tertekan, ditutup keputusan yang
 * menjembataninya. Prinsip: jangan baca headline tanpa kontradiksinya.
 */
export function ExecutiveTension() {
  return (
    <div className="card anim-rise mt-3 px-4 pb-3 pt-2.5">
      <div className="flex items-center gap-1.5">
        <Scale size={13} className="text-[#1b3a6b]" />
        <h3 className="card-title">EXECUTIVE TENSION</h3>
        <span className="text-[8.5px] italic text-ink-400">
          Jangan baca headline tanpa kontradiksinya.
        </span>
      </div>

      <div className="mt-2 grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-4">
        {executiveTensions.map((t) => (
          <div key={t.domain} className="rounded-xl border border-[#eef2f6] px-2.5 py-2">
            <div className="text-[9px] font-extrabold uppercase tracking-[0.05em] text-ink-500">
              {t.domain}
            </div>
            <p className="mt-1 flex items-start gap-1 text-[8.5px] leading-[1.35] text-ink-700">
              <CircleCheck size={10} className="mt-[1px] shrink-0 text-ptpn-green" />
              {t.good}
            </p>
            <p className="mt-[3px] flex items-start gap-1 text-[8.5px] leading-[1.35] text-ink-700">
              <CircleAlert size={10} className="mt-[1px] shrink-0 text-[#d98b06]" />
              <span>
                <span className="font-bold text-[#d98b06]">Tapi: </span>
                {t.concern}
              </span>
            </p>
            <p className="mt-[3px] flex items-start gap-1 text-[8.5px] leading-[1.35] text-ink-700">
              <Gavel size={10} className="mt-[1px] shrink-0 text-[#1b3a6b]" />
              <span>
                <span className="font-bold text-[#1b3a6b]">Keputusan: </span>
                {t.decision}
              </span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
