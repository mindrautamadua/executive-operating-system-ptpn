"use client";

import { priceTicker } from "@/lib/pemasaran-data";
import { PALETTE } from "@/lib/chart-palette";
import { filterBySubholding } from "@/lib/subholding";
import { SectionHead } from "@/components/hc/SectionHead";
import { useSubholding } from "@/components/SubholdingProvider";
import { commodityScope, ScopeEmpty } from "@/components/ui/CommodityScope";
import { Delta } from "@/components/ui/Delta";
import { Sparkline } from "@/components/ui/Sparkline";

/** Papan harga 6 komoditas: spot, rata-rata YTD, delta vs Des 2025, tren 12 bulan. */
export function PriceTickerBoard() {
  const { active, def } = useSubholding();
  // Komoditas menentukan pemilik: CPO/PKO → PalmCo, gula/tetes → SugarCo,
  // karet & teh → SupportingCo.
  const rows = filterBySubholding(priceTicker, active, (p) => commodityScope(p.komoditas));

  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-3 pt-3"
      style={{ "--d": "60ms" } as React.CSSProperties}
    >
      <SectionHead title="Price Ticker Board" action="Lihat Detail" />
      <p className="mt-[3px] text-[9px] text-ink-500">
        Harga Spot per 31 Mei 2026 — Delta vs Akhir Des 2025, Tren 12 Bulan
      </p>

      {rows.length === 0 && <ScopeEmpty label={def.fullLabel} />}

      {rows.length > 0 && (
        <>
      <div className="mt-2 grid grid-cols-[minmax(0,1fr)_88px_92px_64px_96px] items-center gap-x-2 border-b border-[#f0f3f6] pb-1.5 text-[9px] font-bold uppercase tracking-[0.05em] text-ink-500">
        <span>Komoditas</span>
        <span className="text-right">Spot</span>
        <span className="text-right">Avg YTD</span>
        <span className="text-right">Δ vs Des&#39;25</span>
        <span className="text-right">12 Bulan</span>
      </div>

      <div className="flex min-h-0 flex-1 flex-col justify-between divide-y divide-[#f0f3f6]">
        {rows.map((p) => (
          <div
            key={p.komoditas}
            className="grid grid-cols-[minmax(0,1fr)_88px_92px_64px_96px] items-center gap-x-2 py-[7px]"
          >
            <div className="min-w-0">
              <div className="truncate text-[9.5px] font-bold text-ink-900">{p.komoditas}</div>
              <div className="text-[9px] text-ink-500">{p.unit}</div>
            </div>
            <div className="whitespace-nowrap text-right text-[10.5px] font-extrabold tracking-[-0.01em] text-ink-900">
              {p.spotLabel}
            </div>
            <div
              className="truncate text-right text-[8.5px] text-ink-500"
              title={p.ytdAvgLabel}
            >
              {p.ytdAvgLabel.replace("Avg YTD ", "")}
            </div>
            <div className="text-right">
              <Delta
                value={p.delta.replace(/^[+-]/, "")}
                trend={p.trend}
                tone={p.trend === "up" ? "good" : "bad"}
                size={9.5}
              />
            </div>
            <Sparkline
              data={p.series}
              color={p.trend === "up" ? PALETTE.green : PALETTE.red}
              width={96}
              height={24}
              strokeWidth={1.4}
              endDot
            />
          </div>
        ))}
      </div>
        </>
      )}
    </div>
  );
}
