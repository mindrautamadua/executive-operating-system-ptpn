import { ShieldAlert } from "lucide-react";
import { wpRisk } from "@/lib/wp-data";
import { SectionHead } from "../hc/SectionHead";

/**
 * Workforce Continuity Risk: overlay dari People Risk Radar & Succession —
 * apakah rencana workforce benar-benar bisa dieksekusi.
 */
export function WorkforceRiskOverlay() {
  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-3 pt-3"
      style={{ "--d": "480ms" } as React.CSSProperties}
    >
      <div className="flex items-start justify-between gap-2">
        <SectionHead title="Workforce Continuity Risk" />
        <span className="flex shrink-0 items-center gap-1 rounded-md bg-[#fdecec] px-2 py-[3px] text-[9px] font-extrabold text-[#ef4444]">
          <ShieldAlert size={11} />
          {wpRisk.level}
        </span>
      </div>
      <p className="mt-[3px] text-[9px] text-ink-500">
        Kemampuan mengeksekusi rencana 3.714 — bukan sekadar angka kebutuhan
      </p>

      <div className="mt-2 flex min-h-0 flex-1 flex-col justify-center gap-[6px]">
        {wpRisk.items.map((it) => (
          <div
            key={it.name}
            className="flex items-center justify-between gap-2 rounded-lg bg-[#f8fafc] px-3 py-[6px]"
          >
            <span className="flex min-w-0 items-center gap-1.5 text-[9px] font-semibold text-ink-700">
              <span className="h-[6px] w-[6px] shrink-0 rounded-full bg-[#ef4444]" />
              <span className="truncate">{it.name}</span>
            </span>
            <span className="shrink-0 text-[9.5px] font-extrabold text-ink-900">{it.value}</span>
          </div>
        ))}
      </div>

      <p className="mt-2 shrink-0 text-[9px] leading-[1.5] text-ink-500">{wpRisk.note}</p>
    </div>
  );
}
