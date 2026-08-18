"use client";

import { ArrowDown, Crosshair } from "lucide-react";
import { alignmentFlowKinerja, alignmentIndexKinerja } from "@/lib/kinerja-data";
import { ScopeNote } from "@/components/ui/ScopeNote";

/** Line of sight: Corporate Strategy → Unit → Individual → Performance. */
export function GoalAlignment() {
  return (
    <div className="card anim-rise flex h-full flex-col px-4 pb-2.5 pt-3">
      <div className="flex items-start justify-between gap-2">
        <div>
          <h3 className="card-title-navy flex min-w-0 items-center gap-1.5"><span>STRATEGY → INDIVIDUAL ALIGNMENT</span><ScopeNote /></h3>
          <p className="mt-[3px] text-[9.5px] text-ink-500">Performance Line of Sight</p>
        </div>
        <Crosshair size={14} className="shrink-0 text-ptpn-green" />
      </div>

      <div className="mt-2 flex min-h-0 flex-1 flex-col justify-around">
        {alignmentFlowKinerja.map((s, i) => (
          <div key={s.label}>
            {i > 0 && (
              <div className="flex justify-center py-[1px]">
                <ArrowDown size={9} className="text-ink-400" />
              </div>
            )}
            <div className="flex items-center justify-between rounded-lg bg-[#f7f9fb] px-3 py-[5px]">
              <span className="text-[9.5px] text-ink-700">{s.label}</span>
              <span className="flex items-baseline gap-1.5">
                <span className="text-[10px] font-extrabold tabular-nums text-ink-900">
                  {s.value}
                </span>
                <span className="text-[9px] text-ink-500">{s.sub}</span>
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-1.5 flex items-center justify-between border-t border-[#f0f3f6] pt-1.5">
        <span className="text-[8.5px] text-ink-500">
          Strategy Alignment Index{" "}
          <span className="font-extrabold text-ptpn-green">{alignmentIndexKinerja.value}</span>{" "}
          <span className="text-ink-400">/ target {alignmentIndexKinerja.target}</span>
        </span>
        <span className="truncate pl-2 text-[9px] text-ink-500">{alignmentIndexKinerja.note}</span>
      </div>
    </div>
  );
}
