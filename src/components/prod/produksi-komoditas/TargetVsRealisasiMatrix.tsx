"use client";

import { komoditasScoreboard } from "@/lib/produksi-data";
import { ToneBadge, type BadgeTone } from "@/components/shared/ToneBadge";
import { SectionHead } from "../../hc/SectionHead";
import { useSubholding } from "@/components/SubholdingProvider";
import { filterBySubholding } from "@/lib/subholding";
import { commodityScope, ScopeEmpty } from "@/components/ui/CommodityScope";

const STATUS_TONE: Record<string, BadgeTone> = {
  "On Track": "good",
  Waspada: "warn",
  Tertinggal: "bad",
};

const barColor = (pct: number) =>
  pct >= 100 ? "bg-ptpn-green" : pct >= 95 ? "bg-[#f5a524]" : "bg-[#ef4444]";

const pct = (v: number) =>
  `${v.toLocaleString("id-ID", { minimumFractionDigits: 1, maximumFractionDigits: 1 })}%`;

export function TargetVsRealisasiMatrix() {
  const { active, def } = useSubholding();

  // Baris punya dimensi komoditas: TBS/CPO = PalmCo, Gula = SugarCo,
  // Karet & Teh = SupportingCo.
  const rows = filterBySubholding(komoditasScoreboard, active, (k) =>
    commodityScope(k.komoditas),
  );

  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-3 pt-3"
      style={{ "--d": "60ms" } as React.CSSProperties}
    >
      <SectionHead title="Target vs Realisasi YTD" action="Lihat Detail" href="/produksi-operasi/produksi-komoditas/detail#target" />
      <p className="mt-[3px] text-[9px] text-ink-500">
        Capaian 5 Komoditas terhadap Target YTD Mei 2026
      </p>

      <div className="mt-2 grid grid-cols-[minmax(0,1.15fr)_56px_56px_minmax(0,1.3fr)_70px] items-center gap-x-2 text-[9px] font-semibold uppercase tracking-[0.04em] text-ink-500">
        <span>Komoditas</span>
        <span className="text-right">Target</span>
        <span className="text-right">Realisasi</span>
        <span>Capaian</span>
        <span className="text-right">Status</span>
      </div>

      {rows.length === 0 && <ScopeEmpty label={def.fullLabel} />}

      <ul className="mt-1 flex min-h-0 flex-1 flex-col justify-between gap-1">
        {rows.map((k) => (
          <li
            key={k.komoditas}
            className="grid grid-cols-[minmax(0,1.15fr)_56px_56px_minmax(0,1.3fr)_70px] items-center gap-x-2 rounded-lg border border-[#eef2f6] bg-[#fbfcfd] px-2.5 py-1.5"
          >
            <span className="min-w-0 leading-[1.25]">
              <span className="block truncate text-[9.5px] font-extrabold text-ink-900">
                {k.komoditas}
              </span>
              <span className="block text-[9px] text-ink-500">{k.satuan} · FY {k.targetFy}</span>
            </span>
            <span className="text-right text-[9.5px] font-semibold text-ink-500">{k.targetYtd}</span>
            <span className="text-right text-[9.5px] font-extrabold text-ink-900">
              {k.realisasiYtd}
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-[6px] min-w-0 flex-1 overflow-hidden rounded-full bg-[#eef2f6]">
                <span
                  className={`block h-full rounded-full ${barColor(k.capaianPct)}`}
                  style={{ width: `${Math.min(k.capaianPct, 100)}%` }}
                />
              </span>
              <span className="w-[34px] shrink-0 text-right text-[8.5px] font-bold text-ink-700">
                {pct(k.capaianPct)}
              </span>
            </span>
            <span className="flex justify-end">
              <ToneBadge label={k.status} tone={STATUS_TONE[k.status]} />
            </span>
          </li>
        ))}
      </ul>

      <p className="mt-1.5 truncate text-[9px] text-ink-500">
        Gula: musim giling baru mulai Mei — YTD kecil sesuai kurva ramp-up giling.
      </p>
    </div>
  );
}
