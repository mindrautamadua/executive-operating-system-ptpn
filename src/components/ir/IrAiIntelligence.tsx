import { MapPin, Sparkles, TrendingDown } from "lucide-react";
import { irAiHeadline, irAiImpact, irAiInterventions } from "@/lib/ir-intel-data";
import { SectionHead } from "../hc/SectionHead";

/**
 * AI Industrial Relations Intelligence: hotspot spesifik + rencana intervensi
 * bertahap (0–30 / 30–90 hari) + estimasi dampak, menggantikan rekomendasi generik.
 */
export function IrAiIntelligence() {
  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-3 pt-3"
      style={{ "--d": "180ms" } as React.CSSProperties}
    >
      <div className="flex items-center gap-1.5">
        <Sparkles size={12} className="text-[#8b5cf6]" />
        <SectionHead title="AI Industrial Relations Intelligence" />
      </div>

      <div className="mt-2 rounded-lg border border-[#f6d5d5] bg-[#fdf5f5] px-2.5 py-2">
        <div className="flex items-center gap-1.5">
          <MapPin size={11} className="shrink-0 text-[#ef4444]" />
          <span className="text-[9.5px] font-extrabold text-ink-900">{irAiHeadline.title}</span>
        </div>
        <p className="mt-1 text-[8.5px] leading-[1.4] text-ink-700">{irAiHeadline.body}</p>
      </div>

      <div className="mt-2 grid min-h-0 flex-1 grid-cols-2 gap-2">
        {irAiInterventions.map((iv) => (
          <div
            key={iv.horizon}
            className="flex flex-col rounded-lg border border-[#eef2f6] bg-[#fbfcfe] px-2.5 py-2"
          >
            <span className="text-[9px] font-extrabold uppercase tracking-[0.04em] text-ptpn-green">
              Intervensi {iv.horizon}
            </span>
            <ul className="mt-1 flex flex-1 flex-col justify-around">
              {iv.items.map((item) => (
                <li key={item} className="flex items-start gap-1.5 py-[2px]">
                  <span className="mt-[4px] h-[4px] w-[4px] shrink-0 rounded-full bg-ptpn-green" />
                  <span className="text-[8.5px] leading-[1.35] text-ink-700">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="mt-2 flex items-center gap-1.5 rounded-lg bg-ptpn-greenLight px-2.5 py-1.5">
        <TrendingDown size={11} className="shrink-0 text-ptpn-green" />
        <span className="text-[9px] font-bold leading-[1.35] text-ptpn-greenDark">{irAiImpact}</span>
      </div>
    </div>
  );
}
