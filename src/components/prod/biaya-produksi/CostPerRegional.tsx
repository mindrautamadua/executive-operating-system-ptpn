"use client";

import { costPerRegional, HPP_CPO_RP_KG } from "@/lib/biaya-opex-data";
import { ToneBadge } from "@/components/shared/ToneBadge";
import { useSubholding } from "@/components/SubholdingProvider";
import { inScope, ScopeEmpty } from "@/components/ui/CommodityScope";
import { SectionHead } from "../../hc/SectionHead";

const rp = (v: number) => `Rp ${v.toLocaleString("id-ID")}`;

export function CostPerRegional() {
  const { active, def } = useSubholding();
  // Regional 1–7 adalah struktur kebun sawit dan HPP-nya HPP CPO — milik PalmCo.
  const dalamCakupan = inScope(active, "Regional 1 (sawit)");

  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-3 pt-3"
      style={{ "--d": "120ms" } as React.CSSProperties}
    >
      <SectionHead title="HPP per Regional" action="Lihat Detail" />
      <p className="mt-[3px] text-[9px] text-ink-500">
        HPP CPO 7 Regional (Rp/kg) · rata-rata grup {rp(HPP_CPO_RP_KG)} · outlier = deviasi &gt;5%
      </p>

      {!dalamCakupan ? (
        <ScopeEmpty label={def.fullLabel} />
      ) : (
        <>
      <div className="mt-2 grid grid-cols-[64px_72px_minmax(0,1fr)_58px] items-center gap-x-2 text-[9px] font-semibold uppercase tracking-[0.04em] text-ink-500">
        <span>Regional</span>
        <span className="text-right">HPP /kg</span>
        <span>Driver Utama</span>
        <span className="text-right">Status</span>
      </div>

      <ul className="mt-1 flex min-h-0 flex-1 flex-col justify-between gap-1">
        {costPerRegional.map((r) => (
          <li
            key={r.regional}
            className="grid grid-cols-[64px_72px_minmax(0,1fr)_58px] items-center gap-x-2 rounded-lg border border-[#eef2f6] bg-[#fbfcfd] px-2.5 py-1"
          >
            <span className="truncate text-[9px] font-extrabold text-ink-900">{r.regional}</span>
            <span
              className={`text-right text-[9.5px] font-extrabold ${
                r.outlier
                  ? "text-[#ef4444]"
                  : r.hppRpKg <= HPP_CPO_RP_KG
                    ? "text-ptpn-green"
                    : "text-ink-900"
              }`}
            >
              {r.hppRpKg.toLocaleString("id-ID")}
            </span>
            <span className="truncate text-[9px] text-ink-500">{r.driver}</span>
            <span className="flex justify-end">
              <ToneBadge
                label={r.outlier ? "Outlier" : r.hppRpKg <= HPP_CPO_RP_KG ? "Efisien" : "Normal"}
                tone={r.outlier ? "bad" : r.hppRpKg <= HPP_CPO_RP_KG ? "good" : "neutral"}
              />
            </span>
          </li>
        ))}
      </ul>
        </>
      )}
    </div>
  );
}
