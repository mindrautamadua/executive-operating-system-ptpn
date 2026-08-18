"use client";

import { hcvAreas } from "@/lib/esg-data-detail";
import type { HcvArea } from "@/lib/esg-data-detail";
import { ToneBadge, type BadgeTone } from "@/components/shared/ToneBadge";
import { SectionHead } from "@/components/hc/SectionHead";
import { useSubholding } from "@/components/SubholdingProvider";

const PATROLI_TONE: Record<HcvArea["patroli"], BadgeTone> = {
  "Rutin (bulanan)": "good",
  "Rutin (triwulanan)": "info",
  "Perlu intensifikasi": "warn",
};

const TOTAL = hcvAreas.reduce((s, a) => s + a.luasRbHa, 0);

/** Kawasan High Conservation Value per regional: luas, patroli, dan temuan. */
export function HcvManagement() {
  const { active, def } = useSubholding();
  // Kawasan HCV dipetakan per Regional 1–7 (kebun sawit) — cakupan PalmCo.
  const outOfScope = active !== "all" && active !== "palmco";

  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-3 pt-3"
      style={{ "--d": "60ms" } as React.CSSProperties}
    >
      <SectionHead title="Pengelolaan Kawasan HCV" action="Lihat Detail" />
      <p className="mt-[3px] text-[9px] text-ink-500">
        {outOfScope ? (
          `Kawasan HCV dipetakan per regional kebun sawit PalmCo — di luar cakupan ${def.label}`
        ) : (
          <>
            {TOTAL.toLocaleString("id-ID", { minimumFractionDigits: 1 })} rb ha Dikelola · 128
            Spesies Dilindungi Teridentifikasi
          </>
        )}
      </p>

      <div
        className="mt-2 min-h-0 flex-1 overflow-hidden transition-opacity"
        style={{ opacity: outOfScope ? 0.25 : 1 }}
      >
        <div className="scroll-thin overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-[#eef2f6] text-[8.5px] font-semibold text-ink-500">
              <th className="pb-[6px] text-left font-semibold">Regional</th>
              <th className="pb-[6px] text-right font-semibold">Luas (rb ha)</th>
              <th className="pb-[6px] text-right font-semibold">Temuan YTD</th>
              <th className="pb-[6px] pl-3 text-left font-semibold">Status Patroli</th>
            </tr>
          </thead>
          <tbody>
            {hcvAreas.map((a) => (
              <tr
                key={a.regional}
                className="border-b border-[#f5f8fa] transition-colors last:border-0 hover:bg-[#f5f8fa]"
              >
                <td className="whitespace-nowrap py-[7px] text-[9.5px] font-bold text-ink-900">
                  {a.regional}
                </td>
                <td className="py-[7px] text-right text-[9.5px] font-semibold tabular-nums text-ink-900">
                  {a.luasRbHa.toLocaleString("id-ID", { minimumFractionDigits: 1 })}
                </td>
                <td className="py-[7px] text-right text-[9.5px] font-medium tabular-nums text-ink-700">
                  {a.temuanYtd}
                </td>
                <td className="py-[7px] pl-3">
                  <ToneBadge label={a.patroli} tone={PATROLI_TONE[a.patroli]} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      </div>
    </div>
  );
}
