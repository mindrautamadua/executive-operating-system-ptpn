"use client";

import { useState } from "react";
import { tjslAllocation } from "@/lib/esg-data-detail";
import { DonutChart } from "@/components/ui/DonutChart";
import { SectionHead } from "@/components/hc/SectionHead";
import { ScopeNote } from "@/components/ui/ScopeNote";

const TOTAL = tjslAllocation.reduce((s, t) => s + t.rpM, 0);

/** Donut alokasi penyaluran TJSL YTD per pilar TJSL BUMN. */
export function TjslAllocation() {
  const [active, setActive] = useState<number | null>(null);
  const data = tjslAllocation.map((d) => ({ name: d.pilar, value: d.rpM, color: d.color }));

  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-3 pt-3"
      style={{ "--d": "180ms" } as React.CSSProperties}
    >
      <SectionHead title="Alokasi TJSL per Pilar" badge={<ScopeNote />} />
      <p className="mt-[3px] text-[9px] text-ink-500">Penyaluran YTD · 4 Pilar TJSL BUMN</p>

      <div className="flex min-h-0 flex-1 items-center gap-3">
        <DonutChart
          data={data}
          size={124}
          thickness={22}
          centerValue={String(TOTAL)}
          centerCaption="Rp M"
          valueFormatter={(v) => `Rp ${v} M`}
          onHover={setActive}
        />
        <div className="min-w-0 flex-1">
          {tjslAllocation.map((d, i) => (
            <div
              key={d.pilar}
              className="flex items-center gap-1.5 py-[3px] transition-opacity"
              style={{ opacity: active === null || active === i ? 1 : 0.4 }}
            >
              <span
                className="h-[8px] w-[8px] shrink-0 rounded-[2px]"
                style={{ backgroundColor: d.color }}
              />
              <span className="min-w-0 flex-1 truncate text-[9px] font-medium text-ink-700">
                {d.pilar}
              </span>
              <span className="shrink-0 text-[9.5px] font-bold tabular-nums text-ink-900">
                {d.rpM} M
              </span>
              <span className="w-[30px] shrink-0 text-right text-[9px] tabular-nums text-ink-500">
                {Math.round((d.rpM / TOTAL) * 100)}%
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
