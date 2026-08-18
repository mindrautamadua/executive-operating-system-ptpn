import { ChevronRight, FlaskConical, Info, Sparkles } from "lucide-react";
import { SectionHead } from "../hc/SectionHead";
import { outcomeLoop } from "@/lib/pm-data";

/** Closed-loop outcome tracking: Assess → Diagnose → Intervene → Measure → Learn. */
export function OutcomeTrackingCard() {
  return (
    <div
      className="card anim-rise px-4 pb-3 pt-3"
      style={{ "--d": "120ms" } as React.CSSProperties}
    >
      <div className="flex items-center justify-between gap-3">
        <SectionHead title="Intervention Outcome Tracking (Closed Loop)" />
        <div className="flex shrink-0 items-center gap-1">
          {outcomeLoop.stages.map((s, i) => (
            <span key={s} className="flex items-center gap-1">
              <span className="rounded-md bg-[#e8f1fd] px-1.5 py-[2px] text-[9px] font-bold text-[#2f6fe4]">
                {s}
              </span>
              {i < outcomeLoop.stages.length - 1 && (
                <ChevronRight size={9} className="text-ink-400" />
              )}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-2.5 flex items-center gap-1.5 text-[9px] font-bold text-ink-700">
        <FlaskConical size={11} className="shrink-0 text-ptpn-green" />
        {outcomeLoop.pilotLabel}
      </div>

      <div className="mt-2 flex items-stretch gap-1.5">
        {outcomeLoop.steps.map((s, i) => (
          <div key={s.tahap} className="flex min-w-0 flex-1 items-center gap-1.5">
            <div className="min-w-0 flex-1 rounded-xl border border-[#eef2f6] bg-[#f8fafb] px-2.5 py-2">
              <div className="truncate text-[9px] font-bold uppercase tracking-[0.04em] text-ink-500">
                {s.tahap}
              </div>
              <div className="mt-1 truncate text-[10.5px] font-extrabold text-ink-900" title={s.nilai}>
                {s.nilai}
              </div>
              <div className="mt-[3px] truncate text-[9px] leading-snug text-ink-500" title={s.detail}>
                {s.detail}
              </div>
            </div>
            {i < outcomeLoop.steps.length - 1 && (
              <ChevronRight size={11} className="shrink-0 text-ink-400" />
            )}
          </div>
        ))}
      </div>

      <div className="mt-2.5 flex items-start gap-2 rounded-xl bg-ptpn-greenLight px-3 py-2.5">
        <Sparkles size={13} className="mt-[1px] shrink-0 text-ptpn-green" />
        <p className="text-[9.5px] leading-[1.45] text-ink-900">
          <span className="font-bold text-ptpn-green">Learning: </span>
          {outcomeLoop.learning}
        </p>
      </div>

      <div className="mt-2 flex items-center gap-2 rounded-lg border border-[#eef2f6] bg-[#f8fafb] px-3 py-2">
        <Info size={12} className="shrink-0 text-ink-500" />
        <span className="text-[8.5px] font-medium text-ink-500">{outcomeLoop.catatan}</span>
      </div>
    </div>
  );
}
