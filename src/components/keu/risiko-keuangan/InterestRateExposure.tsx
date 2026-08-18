"use client";

import { useState } from "react";
import { Info } from "lucide-react";
import { interestSplit } from "@/lib/krk-data";
import { PALETTE } from "@/lib/chart-palette";
import { fmtId } from "@/lib/keu-core";
import { DonutChart } from "@/components/ui/DonutChart";
import { SectionHead } from "@/components/hc/SectionHead";
import { ScopeNote } from "@/components/ui/ScopeNote";

const donutData = [
  { name: "Bunga Tetap", value: interestSplit.fixedPct, color: PALETTE.green },
  { name: "Bunga Mengambang", value: interestSplit.floatingPct, color: PALETTE.amber },
];

export function InterestRateExposure() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-3 pt-3"
      style={{ "--d": "240ms" } as React.CSSProperties}
    >
      <SectionHead title="Interest Rate Exposure" badge={<ScopeNote />} />
      <p className="mt-[3px] text-[9px] text-ink-500">
        Komposisi Utang Berbunga Rp 28,4 T — Tetap vs Mengambang
      </p>

      <div className="flex min-h-0 flex-1 items-center gap-3">
        <DonutChart
          data={donutData}
          size={128}
          thickness={21}
          centerValue={`${interestSplit.fixedPct}%`}
          centerCaption="Tetap"
          valueFormatter={(v) => `${fmtId(v, 0)}%`}
          onHover={setActive}
        />
        <div className="min-w-0 flex-1">
          {donutData.map((d, i) => (
            <div
              key={d.name}
              className="flex items-center gap-1.5 py-[4px] transition-opacity"
              style={{ opacity: active === null || active === i ? 1 : 0.4 }}
            >
              <span
                className="h-[8px] w-[8px] shrink-0 rounded-[2px]"
                style={{ backgroundColor: d.color }}
              />
              <span className="min-w-0 flex-1 truncate text-[9px] font-medium text-ink-700">
                {d.name}
              </span>
              <span className="shrink-0 text-[9.5px] font-bold text-ink-900">
                {fmtId(d.value, 0)}%
              </span>
            </div>
          ))}
          <div className="mt-1.5 rounded-lg bg-[#f8fafc] px-2.5 py-2">
            <div className="text-[9px] text-ink-500">Saldo bunga mengambang</div>
            <div className="mt-[2px] text-[12px] font-extrabold text-ink-900">
              Rp {fmtId(interestSplit.floatingRpT, 1)} T
            </div>
            <div className="mt-[2px] text-[9px] text-ink-500">
              +100 bps ≈ Rp {interestSplit.dampak100BpsRpM} M beban bunga/thn
            </div>
          </div>
        </div>
      </div>

      <p className="flex items-start gap-1.5 pb-0.5 text-[9px] leading-snug text-ink-500">
        <Info size={9} className="mt-[1px] shrink-0" />
        {interestSplit.note}
      </p>
    </div>
  );
}
