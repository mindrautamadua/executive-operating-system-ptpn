"use client";

import {
  salesByKomoditas,
  salesByKomoditasTotal,
  type SalesRow,
} from "@/lib/pemasaran-data";
import { filterBySubholding } from "@/lib/subholding";
import { ToneBadge, type BadgeTone } from "@/components/shared/ToneBadge";
import { SectionHead } from "@/components/hc/SectionHead";
import { useSubholding } from "@/components/SubholdingProvider";
import { commodityScope, ScopeEmpty } from "@/components/ui/CommodityScope";
import { ScopeNote } from "@/components/ui/ScopeNote";

const statusOf = (pct: number): { label: string; tone: BadgeTone } =>
  pct >= 100
    ? { label: "On Track", tone: "good" }
    : pct >= 95
      ? { label: "Waspada", tone: "warn" }
      : { label: "Tertinggal", tone: "bad" };

const barColor = (pct: number) =>
  pct >= 100 ? "bg-ptpn-green" : pct >= 95 ? "bg-[#f5a524]" : "bg-[#ef4444]";

const pct = (v: number) =>
  `${v.toLocaleString("id-ID", { minimumFractionDigits: 1, maximumFractionDigits: 1 })}%`;

const TREN: Record<SalesRow["tren"], { glyph: string; cls: string }> = {
  up: { glyph: "▲", cls: "text-ptpn-green" },
  down: { glyph: "▼", cls: "text-[#ef4444]" },
  flat: { glyph: "—", cls: "text-ink-400" },
};

/** Tabel penjualan per komoditas: volume, ASP, nilai, capaian RKAP YTD. */
export function SalesByKomoditasTable() {
  const { active, def } = useSubholding();
  // CPO/PK & PKO → PalmCo, gula & tetes → SugarCo, karet & teh → SupportingCo;
  // produk hilir & lainnya lintas komoditas sehingga tetap tampil.
  const rows = filterBySubholding(salesByKomoditas, active, (r) => commodityScope(r.komoditas));

  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-3 pt-3"
      style={{ "--d": "120ms" } as React.CSSProperties}
    >
      <SectionHead title="Penjualan per Komoditas" action="Lihat Detail" />
      <p className="mt-[3px] text-[9px] text-ink-500">
        Volume, ASP &amp; nilai vs RKAP YTD Mei 2026
      </p>

      <div className="mt-2 grid grid-cols-[minmax(0,0.95fr)_64px_78px_60px_minmax(0,1fr)_66px] items-center gap-x-2 text-[9px] font-semibold uppercase tracking-[0.04em] text-ink-500">
        <span>Komoditas</span>
        <span className="text-right">Volume</span>
        <span className="text-right">ASP</span>
        <span className="text-right">Nilai</span>
        <span>% RKAP</span>
        <span className="text-right">Status</span>
      </div>

      {rows.length === 0 && <ScopeEmpty label={def.fullLabel} />}

      <ul className="mt-1 flex min-h-0 flex-1 flex-col justify-between gap-[3px]">
        {rows.map((r) => {
          const st = statusOf(r.rkapPct);
          const tren = TREN[r.tren];
          return (
            <li
              key={r.komoditas}
              className="grid grid-cols-[minmax(0,0.95fr)_64px_78px_60px_minmax(0,1fr)_66px] items-center gap-x-2 rounded-lg border border-[#eef2f6] bg-[#fbfcfd] px-2.5 py-[4px]"
            >
              <span className="flex min-w-0 items-center gap-1">
                <span className={`shrink-0 text-[9px] ${tren.cls}`}>{tren.glyph}</span>
                <span className="truncate text-[9.5px] font-extrabold text-ink-900">
                  {r.komoditas}
                </span>
              </span>
              <span className="text-right text-[9px] font-semibold text-ink-500">{r.volume}</span>
              <span className="text-right text-[9px] font-semibold text-ink-500">{r.asp}</span>
              <span className="text-right text-[9px] font-extrabold text-ink-900">{r.nilai}</span>
              <span className="flex items-center gap-1.5">
                <span className="h-[5px] min-w-0 flex-1 overflow-hidden rounded-full bg-[#eef2f6]">
                  <span
                    className={`block h-full rounded-full ${barColor(r.rkapPct)}`}
                    style={{ width: `${Math.min(r.rkapPct, 100)}%` }}
                  />
                </span>
                <span className="w-[34px] shrink-0 text-right text-[8.5px] font-bold text-ink-700">
                  {pct(r.rkapPct)}
                </span>
              </span>
              <span className="flex justify-end">
                <ToneBadge label={st.label} tone={st.tone} />
              </span>
            </li>
          );
        })}
      </ul>

      {/* Total & capaian RKAP hanya tersedia pada level konsolidasi grup. */}
      <div className="mt-1.5 flex items-center justify-between rounded-lg bg-[#eef2f6] px-2.5 py-[5px]">
        <span className="flex items-center gap-1.5 text-[8.5px] font-extrabold uppercase tracking-[0.04em] text-ink-500">
          Total
          <ScopeNote />
        </span>
        <span className="flex items-center gap-2">
          <span className="text-[9.5px] font-extrabold text-ink-900">
            {salesByKomoditasTotal.nilai}
          </span>
          <ToneBadge label={`${pct(salesByKomoditasTotal.rkapPct)} RKAP`} tone="good" />
        </span>
      </div>
    </div>
  );
}
