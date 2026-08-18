"use client";

import { efisiensiInisiatif } from "@/lib/biaya-opex-data";
import { ToneBadge } from "@/components/shared/ToneBadge";
import { useSubholding } from "@/components/SubholdingProvider";
import { commodityScope, ScopeEmpty } from "@/components/ui/CommodityScope";
import { filterBySubholding } from "@/lib/subholding";
import { SectionHead } from "../../hc/SectionHead";

// Skala bar tetap memakai nilai terbesar seluruh program agar panjang bar
// konsisten walau daftar sedang disaring.
const MAX_RP_M = Math.max(...efisiensiInisiatif.map((p) => p.kontribusiRpM));

export function EfisiensiInisiatif() {
  const { active, def } = useSubholding();
  // Program yang menyebut komoditas ikut cakupan (mis. "logistik TBS" → PalmCo);
  // program lintas komoditas tetap tampil di semua cakupan.
  const rows = filterBySubholding(efisiensiInisiatif, active, (p) => commodityScope(p.program));

  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-3 pt-3"
      style={{ "--d": "180ms" } as React.CSSProperties}
    >
      <SectionHead title="Inisiatif Efisiensi Biaya" action="Lihat Detail" />
      <p className="mt-[3px] text-[9px] text-ink-500">
        Kontribusi Penghematan YTD · Total <span className="font-bold text-ptpn-green">Rp 412 M</span>
      </p>

      {rows.length === 0 ? (
        <ScopeEmpty label={def.fullLabel} />
      ) : (
      <ul className="mt-2 flex min-h-0 flex-1 flex-col justify-between gap-1.5">
        {rows.map((p) => (
          <li key={p.program} className="leading-[1.3]">
            <div className="flex items-center justify-between gap-2">
              <span className="flex min-w-0 items-center gap-1.5">
                <span className="truncate text-[9px] font-bold text-ink-900">{p.program}</span>
                <ToneBadge label={p.status} tone={p.status === "On Track" ? "good" : "warn"} />
              </span>
              <span className="shrink-0 text-[9px] font-extrabold text-ink-900">
                Rp {p.kontribusiRpM} M
              </span>
            </div>
            <div className="mt-[4px] h-[6px] overflow-hidden rounded-full bg-[#eef2f6]">
              <span
                className={`block h-full rounded-full ${
                  p.status === "On Track" ? "bg-ptpn-green" : "bg-[#f5a524]"
                }`}
                style={{ width: `${(p.kontribusiRpM / MAX_RP_M) * 100}%` }}
              />
            </div>
          </li>
        ))}
      </ul>
      )}

      <p className="mt-1.5 truncate text-[9px] text-ink-500">
        Run-rate FY ± Rp 1,0 T — bagian dampak OPEX Rp 680 M EBITDA plus uplift volume.
      </p>
    </div>
  );
}
