"use client";

import { useState } from "react";
import { revenueByKomoditas } from "@/lib/pemasaran-data";
import { filterBySubholding } from "@/lib/subholding";
import { DonutChart } from "@/components/ui/DonutChart";
import { SectionHead } from "@/components/hc/SectionHead";
import { useSubholding } from "@/components/SubholdingProvider";
import { commodityScope, ScopeEmpty } from "@/components/ui/CommodityScope";

const fmtRpT = (v: number) =>
  `Rp ${v.toLocaleString("id-ID", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} T`;

/** Komposisi nilai penjualan YTD per komoditas (donut + legend nilai). */
export function RevenueByKomoditas() {
  const [active, setActive] = useState<number | null>(null);
  const { active: scope, def } = useSubholding();
  // CPO/PK & PKO → PalmCo, gula & tetes → SugarCo, karet & teh → SupportingCo;
  // produk hilir & lainnya tidak terikat komoditas sehingga tetap tampil.
  const slices = filterBySubholding(revenueByKomoditas, scope, (c) => commodityScope(c.name));
  const total = slices.reduce((s, d) => s + d.value, 0);

  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-3 pt-3"
      style={{ "--d": "90ms" } as React.CSSProperties}
    >
      <SectionHead title="Revenue by Komoditas" action="Lihat Detail" />
      <p className="mt-[3px] text-[9px] text-ink-500">
        Komposisi Nilai Penjualan YTD per Komoditas
      </p>

      {slices.length === 0 && <ScopeEmpty label={def.fullLabel} />}

      {slices.length > 0 && (
      <div className="flex min-h-0 flex-1 items-center gap-3">
        <DonutChart
          data={slices}
          size={150}
          thickness={25}
          centerValue={total.toLocaleString("id-ID", {
            minimumFractionDigits: 1,
            maximumFractionDigits: 1,
          })}
          centerCaption="Rp Triliun"
          valueFormatter={fmtRpT}
          onHover={setActive}
        />
        <div className="min-w-0 flex-1">
          {slices.map((c, i) => (
            <div
              key={c.name}
              className="flex items-center gap-1.5 py-[3px] transition-opacity"
              style={{ opacity: active === null || active === i ? 1 : 0.4 }}
            >
              <span
                className="h-[8px] w-[8px] shrink-0 rounded-[2px]"
                style={{ backgroundColor: c.color }}
              />
              <span className="min-w-0 flex-1 truncate text-[9.5px] font-medium text-ink-700">
                {c.name}
              </span>
              <span className="shrink-0 text-[9.5px] font-bold text-ink-900">{fmtRpT(c.value)}</span>
              <span className="w-[40px] shrink-0 text-right text-[9px] text-ink-500">
                (
                {((c.value / total) * 100).toLocaleString("id-ID", {
                  minimumFractionDigits: 1,
                  maximumFractionDigits: 1,
                })}
                %)
              </span>
            </div>
          ))}
        </div>
      </div>
      )}
    </div>
  );
}
