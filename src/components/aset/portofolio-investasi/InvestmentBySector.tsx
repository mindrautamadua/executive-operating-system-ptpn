"use client";

import { useState } from "react";
import { investmentBySector, investmentBySectorNote, INV_PIPELINE_RP_T } from "@/lib/inv-data";
import { CATEGORICAL } from "@/lib/chart-palette";
import { DonutChart } from "@/components/ui/DonutChart";
import { SectionHead } from "@/components/hc/SectionHead";
import { ScopeNote } from "@/components/ui/ScopeNote";

const num = (v: number) =>
  v.toLocaleString("id-ID", { minimumFractionDigits: 1, maximumFractionDigits: 1 });

const rows = investmentBySector.map((s, i) => ({ ...s, color: CATEGORICAL[i] }));

/** Komposisi pipeline investasi per sektor. */
export function InvestmentBySector() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-2.5 pt-3"
      style={{ "--d": "120ms" } as React.CSSProperties}
    >
      <SectionHead title="Investasi per Sektor" badge={<ScopeNote />} />
      <p className="mt-[3px] text-[9px] text-ink-500">Porsi Pipeline per Sektor Investasi</p>

      <div className="flex min-h-0 flex-1 items-center gap-3">
        <DonutChart
          data={rows.map((r) => ({ name: r.sektor, value: r.pct, color: r.color }))}
          size={126}
          thickness={21}
          centerValue={num(INV_PIPELINE_RP_T)}
          centerCaption="Rp T"
          valueFormatter={(v) => `${v}%`}
          onHover={setActive}
        />
        <div className="min-w-0 flex-1">
          {rows.map((r, i) => (
            <div
              key={r.sektor}
              className="flex items-center gap-1.5 py-[3px] transition-opacity"
              style={{ opacity: active === null || active === i ? 1 : 0.4 }}
            >
              <span
                className="h-[8px] w-[8px] shrink-0 rounded-[2px]"
                style={{ backgroundColor: r.color }}
              />
              <span className="min-w-0 flex-1 truncate text-[9px] font-medium text-ink-700">
                {r.sektor}
              </span>
              <span className="shrink-0 text-[9.5px] font-bold tabular-nums text-ink-900">
                {num(r.nilaiRpT)} T
              </span>
              <span className="w-[28px] shrink-0 text-right text-[9px] tabular-nums text-ink-500">
                {r.pct}%
              </span>
            </div>
          ))}
        </div>
      </div>

      <p className="pt-1 text-[9px] leading-snug text-ink-500">{investmentBySectorNote}</p>
    </div>
  );
}
