"use client";

import { komoditasScoreboard } from "@/lib/produksi-data";
import { SectionHead } from "@/components/hc/SectionHead";
import { ToneBadge, type BadgeTone } from "@/components/shared/ToneBadge";
import { useSubholding } from "@/components/SubholdingProvider";
import { filterBySubholding } from "@/lib/subholding";
import { commodityScope, ScopeEmpty } from "@/components/ui/CommodityScope";

const STATUS_TONE: Record<string, BadgeTone> = {
  "On Track": "good",
  Waspada: "warn",
  Tertinggal: "bad",
};

const BAR_CLS: Record<string, string> = {
  "On Track": "bg-ptpn-green",
  Waspada: "bg-[#f5a524]",
  Tertinggal: "bg-[#ef4444]",
};

const pct = (v: number) => v.toLocaleString("id-ID", { minimumFractionDigits: 1 });

/** Scoreboard capaian produksi 5 komoditas vs target YTD. */
export function KomoditasScoreboard() {
  const { active, def } = useSubholding();

  // Baris punya dimensi komoditas: TBS/CPO = PalmCo, Gula = SugarCo,
  // Karet & Teh = SupportingCo.
  const rows = filterBySubholding(komoditasScoreboard, active, (k) =>
    commodityScope(k.komoditas),
  );

  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-3.5 pt-3"
      style={{ "--d": "100ms" } as React.CSSProperties}
    >
      <SectionHead title="Komoditas Scoreboard" action="Lihat Detail" />
      <p className="mt-[3px] text-[9px] text-ink-500">Realisasi vs Target YTD per Komoditas</p>

      <div className="mt-2.5 grid grid-cols-[minmax(0,1fr)_44px_44px_44px_64px] items-center gap-x-2 border-b border-[#eef2f6] pb-1.5 text-[9px] font-semibold uppercase tracking-[0.04em] text-ink-500">
        <span>Komoditas</span>
        <span className="text-right">Tgt FY</span>
        <span className="text-right">Tgt YTD</span>
        <span className="text-right">Real</span>
        <span className="text-center">Status</span>
      </div>

      {rows.length === 0 && <ScopeEmpty label={def.fullLabel} />}

      <ul className="flex min-h-0 flex-1 flex-col justify-around gap-y-1 py-1">
        {rows.map((k) => (
          <li key={k.komoditas} className="shrink-0">
            <div className="grid grid-cols-[minmax(0,1fr)_44px_44px_44px_64px] items-center gap-x-2">
              <span className="min-w-0">
                <span
                  className="block truncate text-[9.5px] font-bold leading-tight text-ink-900"
                  title={k.note}
                >
                  {k.komoditas}
                </span>
                <span className="block text-[7.5px] leading-tight text-ink-500">{k.satuan}</span>
              </span>
              <span className="text-right text-[9px] font-semibold text-ink-500">{k.targetFy}</span>
              <span className="text-right text-[9px] font-semibold text-ink-500">{k.targetYtd}</span>
              <span className="text-right text-[9.5px] font-extrabold text-ink-900">
                {k.realisasiYtd}
              </span>
              <span className="flex justify-center">
                <ToneBadge label={k.status} tone={STATUS_TONE[k.status]} />
              </span>
            </div>
            <div className="mt-[4px] flex items-center gap-1.5">
              <div className="h-[5px] min-w-0 flex-1 overflow-hidden rounded-full bg-[#eef2f6]">
                <div
                  className={`h-full rounded-full ${BAR_CLS[k.status]}`}
                  style={{ width: `${Math.min(k.capaianPct, 100)}%` }}
                />
              </div>
              <span className="w-[38px] shrink-0 text-right text-[8.5px] font-bold text-ink-700">
                {pct(k.capaianPct)}%
              </span>
            </div>
          </li>
        ))}
      </ul>

      <p className="mt-1 text-[9px] leading-[1.4] text-ink-500">
        Capaian = realisasi vs target YTD. Gula mengikuti kurva ramp-up musim giling (mulai Mei).
      </p>
    </div>
  );
}
