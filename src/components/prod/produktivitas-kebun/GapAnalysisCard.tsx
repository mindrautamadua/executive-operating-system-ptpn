"use client";

import { gapAnalysis } from "@/lib/produksi-data";
import { SectionHead } from "../../hc/SectionHead";
import { useSubholding } from "@/components/SubholdingProvider";
import { inScope, ScopeEmpty } from "@/components/ui/CommodityScope";

const num = (v: number) =>
  v.toLocaleString("id-ID", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

const BAR = ["bg-[#ef4444]", "bg-[#f5a524]", "bg-[#3b7ded]", "bg-[#0d9488]"];

export function GapAnalysisCard() {
  const { active, def } = useSubholding();
  // Dekomposisi gap yield TBS kebun sawit -> seluruh kartu milik PalmCo.
  const milikScope = inScope(active, "kebun sawit TBS");

  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-3 pt-3"
      style={{ "--d": "120ms" } as React.CSSProperties}
    >
      <SectionHead title="Gap Analysis vs Benchmark" action="Lihat Detail" />
      <p className="mt-[3px] text-[9px] text-ink-500">
        Dekomposisi Gap Yield 2,1 t/ha (grup 21,9 vs benchmark swasta 24,0)
      </p>

      {!milikScope && <ScopeEmpty label={def.fullLabel} />}

      {milikScope && (
        <ul className="mt-2 flex min-h-0 flex-1 flex-col justify-between gap-1.5">
        {gapAnalysis.map((g, i) => (
          <li key={g.faktor} className="leading-[1.3]">
            <div className="flex items-baseline justify-between gap-2">
              <span className="truncate text-[9px] font-bold text-ink-900">{g.faktor}</span>
              <span className="shrink-0 text-[9px] font-extrabold text-ink-900">
                {num(g.gapTonHa)} t/ha
                <span className="ml-1 text-[9px] font-semibold text-ink-500">
                  ({g.kontribusiPct}%)
                </span>
              </span>
            </div>
            <div className="mt-[4px] flex items-center gap-1.5">
              <span className="h-[7px] min-w-0 flex-1 overflow-hidden rounded-full bg-[#eef2f6]">
                <span
                  className={`block h-full rounded-full ${BAR[i]}`}
                  style={{ width: `${g.kontribusiPct}%` }}
                />
              </span>
            </div>
            <p className="mt-[2px] truncate text-[7.5px] text-ink-500">
              <span className="font-bold text-ptpn-green">Aksi:</span> {g.aksi}
            </p>
          </li>
        ))}
      </ul>
      )}
    </div>
  );
}
