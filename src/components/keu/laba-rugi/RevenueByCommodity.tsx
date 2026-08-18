"use client";

import { useState } from "react";
import { revenueByCommodity } from "@/lib/kpl-data";
import { fmtId } from "@/lib/keu-core";
import { DonutChart } from "../../ui/DonutChart";
import { SectionHead } from "../../hc/SectionHead";
import { ScopeNote } from "@/components/ui/ScopeNote";

/** Donut porsi pendapatan per komoditas (CPO 58% dominan). */
export function RevenueByCommodity() {
  const [active, setActive] = useState<number | null>(null);
  const data = revenueByCommodity.map((d) => ({ name: d.name, value: d.pct, color: d.color }));

  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-3 pt-3"
      style={{ "--d": "300ms" } as React.CSSProperties}
    >
      <SectionHead title="Revenue by Commodity" badge={<ScopeNote />} />
      <p className="mt-[3px] text-[9px] text-ink-500">Porsi Pendapatan YTD per Komoditas</p>

      <div className="flex min-h-0 flex-1 items-center gap-3">
        <DonutChart
          data={data}
          size={138}
          thickness={23}
          centerValue="24,6"
          centerCaption="Rp T"
          valueFormatter={(v) => `${fmtId(v, 0)}%`}
          onHover={setActive}
        />
        <div className="min-w-0 flex-1">
          {revenueByCommodity.map((d, i) => (
            <div
              key={d.name}
              className="flex items-center gap-1.5 py-[3px] transition-opacity"
              style={{ opacity: active === null || active === i ? 1 : 0.4 }}
            >
              <span
                className="h-[8px] w-[8px] shrink-0 rounded-[2px]"
                style={{ backgroundColor: d.color }}
              />
              <span className="min-w-0 flex-1 truncate text-[9px] font-medium text-ink-700">
                {d.name}
              </span>
              <span className="shrink-0 text-[9.5px] font-bold tabular-nums text-ink-900">
                {fmtId(d.valueRpT, 1)} T
              </span>
              <span className="w-[30px] shrink-0 text-right text-[9px] tabular-nums text-ink-500">
                {d.pct}%
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
