"use client";

import { Users } from "lucide-react";
import { rater360, signal360 } from "@/lib/kinerja-data";
import { ScopeNote } from "@/components/ui/ScopeNote";

/** Multi-rater signal: manager, peer, self, stakeholder (skala 1-5). */
export function Signal360() {
  return (
    <div className="card anim-rise flex h-full flex-col px-4 pb-2.5 pt-3">
      <div className="flex items-start justify-between gap-2">
        <div>
          <h3 className="card-title-navy flex min-w-0 items-center gap-1.5"><span>360° PERFORMANCE SIGNAL</span><ScopeNote /></h3>
          <p className="mt-[3px] text-[9.5px] text-ink-500">
            {signal360.coverage} {signal360.coverageSub}
          </p>
        </div>
        <Users size={14} className="shrink-0 text-ptpn-green" />
      </div>

      <div className="mt-2 flex min-h-0 flex-1 flex-col justify-around">
        {rater360.map((r, i) => (
          <div key={r.label} className="flex items-center gap-2">
            <span className="w-[74px] shrink-0 text-[9.5px] text-ink-700">{r.label}</span>
            <div className="h-[7px] flex-1 overflow-hidden rounded-full bg-[#f1f5f8]">
              <div
                className="anim-grow-x h-full rounded-full"
                style={{
                  width: `${r.pct}%`,
                  backgroundColor: r.color,
                  "--d": `${i * 60}ms`,
                } as React.CSSProperties}
              />
            </div>
            <span className="w-[24px] shrink-0 text-right text-[9.5px] font-bold tabular-nums text-ink-900">
              {r.nilai}
            </span>
          </div>
        ))}
      </div>

      <div className="mt-1.5 flex items-center justify-between border-t border-[#f0f3f6] pt-1.5">
        <span className="text-[8.5px] text-ink-500">
          Rater Alignment{" "}
          <span className="font-extrabold tabular-nums text-ptpn-green">{signal360.alignment}</span>
          <span className="text-ink-400"> / 1,00</span>
        </span>
        <span className="truncate pl-2 text-[9px] text-ink-500">
          Self gap <span className="font-bold text-[#d98b06]">{signal360.gap}</span> —{" "}
          {signal360.gapNote}
        </span>
      </div>
    </div>
  );
}
