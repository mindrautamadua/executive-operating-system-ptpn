"use client";

import { lossesBreakdown, lossesNote } from "@/lib/pabrik-data";
import { useSubholding } from "@/components/SubholdingProvider";
import { inScope, ScopeEmpty } from "@/components/ui/CommodityScope";
import { SectionHead } from "../../hc/SectionHead";

const MAX_PCT = 0.6; // skala bar horizontal

const num = (v: number) =>
  v.toLocaleString("id-ID", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

export function LossesBreakdown() {
  const { active, def } = useSubholding();
  // Seluruh kartu ini milik PalmCo: losses CPO diukur terhadap TBS sawit.
  const dalamCakupan = inScope(active, "CPO (sawit)");

  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-3 pt-3"
      style={{ "--d": "120ms" } as React.CSSProperties}
    >
      <SectionHead title="Losses Breakdown CPO" action="Lihat Detail" href="/produksi-operasi/kinerja-pabrik/detail#losses" />
      <p className="mt-[3px] text-[9px] text-ink-500">
        Aktual vs Norma per Komponen (% terhadap TBS) · Total 1,58% vs norma 1,65%
      </p>

      {!dalamCakupan ? (
        <ScopeEmpty label={def.fullLabel} />
      ) : (
        <>
      <ul className="mt-2 flex min-h-0 flex-1 flex-col justify-between gap-1.5">
        {lossesBreakdown.map((l) => {
          const overNorma = l.aktualPct > l.normaPct;
          return (
            <li key={l.komponen} className="leading-[1.3]">
              <div className="flex items-baseline justify-between gap-2">
                <span className="truncate text-[9px] font-bold text-ink-900">{l.komponen}</span>
                <span
                  className={`shrink-0 text-[9px] font-extrabold ${
                    overNorma ? "text-[#ef4444]" : "text-ptpn-green"
                  }`}
                >
                  {num(l.aktualPct)}%
                  <span className="ml-1 text-[9px] font-semibold text-ink-500">
                    / norma {num(l.normaPct)}%
                  </span>
                </span>
              </div>
              <div className="relative mt-[4px] h-[7px] overflow-hidden rounded-full bg-[#eef2f6]">
                <span
                  className={`block h-full rounded-full ${overNorma ? "bg-[#ef4444]" : "bg-ptpn-green"}`}
                  style={{ width: `${(l.aktualPct / MAX_PCT) * 100}%` }}
                />
                <span
                  className="absolute top-0 h-full w-[2px] bg-ink-400"
                  style={{ left: `${(l.normaPct / MAX_PCT) * 100}%` }}
                />
              </div>
            </li>
          );
        })}
      </ul>

      <p className="mt-2 line-clamp-2 text-[9px] leading-snug text-ink-500">{lossesNote}</p>
        </>
      )}
    </div>
  );
}
