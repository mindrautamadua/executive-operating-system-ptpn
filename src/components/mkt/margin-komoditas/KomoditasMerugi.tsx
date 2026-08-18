"use client";

import { Sparkles, TriangleAlert } from "lucide-react";
import { komoditasMerugi } from "@/lib/hilir-stok-margin-data";
import { ToneBadge } from "@/components/shared/ToneBadge";
import { filterBySubholding } from "@/lib/subholding";
import { useSubholding } from "@/components/SubholdingProvider";
import { ScopeEmpty, commodityScope } from "@/components/ui/CommodityScope";
import { SectionHead } from "../../hc/SectionHead";

const pct = (v: number) =>
  `${v < 0 ? "−" : ""}${Math.abs(v).toLocaleString("id-ID", { minimumFractionDigits: 1 })}%`;

/**
 * Diagnosis komoditas merugi/margin tipis (teh & karet) + opsi penanganan.
 * Teh & karet keduanya milik SupportingCo (PTPN I), sehingga pada cakupan
 * PalmCo/SugarCo tidak ada komoditas merugi yang tersisa.
 */
export function KomoditasMerugi() {
  const { active, def } = useSubholding();
  const rows = filterBySubholding(komoditasMerugi, active, (k) => commodityScope(k.komoditas));

  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-3 pt-3"
      style={{ "--d": "240ms" } as React.CSSProperties}
    >
      <SectionHead title="Diagnosis Komoditas Merugi & Margin Tipis" action="Lihat Detail" />
      <p className="mt-[3px] text-[9px] text-ink-500">
        Akar masalah, opsi penanganan &amp; rekomendasi struktural — teh (merugi) dan karet (margin
        tipis)
      </p>

      {rows.length === 0 ? (
        <ScopeEmpty label={def.fullLabel} />
      ) : (
      <div className="mt-2 grid min-h-0 flex-1 grid-cols-2 gap-3">
        {rows.map((k) => (
          <div
            key={k.komoditas}
            className="flex min-w-0 flex-col rounded-lg border border-[#eef2f6] bg-[#fbfcfd] px-3 py-2.5"
          >
            <div className="flex items-center justify-between gap-2">
              <span className="flex items-center gap-1.5 text-[10px] font-extrabold text-ink-900">
                <TriangleAlert
                  size={12}
                  className={k.marginPct < 0 ? "text-[#ef4444]" : "text-[#d98b06]"}
                />
                {k.komoditas}
              </span>
              <ToneBadge
                label={`Margin ${pct(k.marginPct)}`}
                tone={k.marginPct < 0 ? "bad" : "warn"}
              />
            </div>

            <ul className="mt-1.5 flex flex-col gap-[3px]">
              {k.akarMasalah.map((m) => (
                <li key={m} className="flex items-start gap-1.5 text-[8.5px] leading-snug text-ink-500">
                  <span className="mt-[5px] h-[3px] w-[3px] shrink-0 rounded-full bg-ink-400" />
                  {m}
                </li>
              ))}
            </ul>

            <div className="mt-2 grid grid-cols-[minmax(0,1.5fr)_minmax(0,1.15fr)_64px] gap-x-2 text-[7.5px] font-semibold uppercase tracking-[0.04em] text-ink-400">
              <span>Opsi</span>
              <span>Dampak</span>
              <span className="text-right">Horizon</span>
            </div>
            <ul className="mt-1 flex flex-col gap-1">
              {k.opsi.map((o) => (
                <li
                  key={o.opsi}
                  className="grid grid-cols-[minmax(0,1.5fr)_minmax(0,1.15fr)_64px] items-center gap-x-2 rounded-md border border-[#eef2f6] bg-white px-2 py-1"
                >
                  <span className="truncate text-[8.5px] font-bold text-ink-900" title={o.opsi}>
                    {o.opsi}
                  </span>
                  <span className="truncate text-[8.5px] text-ink-500" title={o.dampak}>
                    {o.dampak}
                  </span>
                  <span className="text-right text-[9px] font-semibold text-ink-500">
                    {o.horizon}
                  </span>
                </li>
              ))}
            </ul>

            <p className="mt-auto flex items-start gap-1 pt-2 text-[8.5px] leading-snug text-ink-700">
              <Sparkles size={9} className="mt-[1px] shrink-0 text-ptpn-green" />
              <span>
                <span className="font-bold text-ptpn-green">Rekomendasi:</span> {k.rekomendasi}
              </span>
            </p>
          </div>
        ))}
      </div>
      )}
    </div>
  );
}
