"use client";

import { responseCapability } from "@/lib/hse-data-detail";
import type { HseRagStatus } from "@/lib/hse-data";
import { ToneBadge, type BadgeTone } from "@/components/shared/ToneBadge";
import { SectionHead } from "@/components/hc/SectionHead";
import { useSubholding } from "@/components/SubholdingProvider";

const STATUS_TONE: Record<HseRagStatus, BadgeTone> = {
  Hijau: "good",
  Amber: "warn",
  Merah: "bad",
};

const ribuan = (v: number) => v.toLocaleString("id-ID");

/** Kesiapan sumber daya pemadaman per regional. */
export function ResponseCapability() {
  const { active, isFiltered, def } = useSubholding();
  // Regu, menara & embung ini tersebar di Regional 1–7, wilayah operasi PalmCo
  // (PTPN IV); tidak ada pecahan untuk SugarCo/SupportingCo.
  const luarCakupan = isFiltered && active !== "palmco";

  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-3 pt-3"
      style={{ "--d": "120ms" } as React.CSSProperties}
    >
      <SectionHead title="Kapabilitas Respons per Regional" action="Lihat Detail" />
      <p className="mt-[3px] text-[9px] text-ink-500">
        {luarCakupan
          ? `Sumber daya pemadaman di regional PalmCo — di luar cakupan ${def.label}`
          : "96 Regu · 84 Menara · 121 Embung · 1.144 Personel Terlatih"}
      </p>

      <div
        className="mt-2 min-h-0 flex-1 overflow-hidden transition-opacity"
        style={luarCakupan ? { opacity: 0.25 } : undefined}
      >
        <div className="scroll-thin overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-[#eef2f6] text-[8.5px] font-semibold text-ink-500">
              <th className="pb-[6px] text-left font-semibold">Regional</th>
              <th className="pb-[6px] text-right font-semibold">Regu</th>
              <th className="pb-[6px] text-right font-semibold">Menara</th>
              <th className="pb-[6px] text-right font-semibold">Embung</th>
              <th className="pb-[6px] text-right font-semibold">Alat</th>
              <th className="pb-[6px] text-right font-semibold">Personel</th>
              <th className="pb-[6px] pl-3 text-left font-semibold">Kecukupan</th>
            </tr>
          </thead>
          <tbody>
            {responseCapability.map((r) => (
              <tr
                key={r.regional}
                className="border-b border-[#f5f8fa] transition-colors last:border-0 hover:bg-[#f5f8fa]"
              >
                <td className="whitespace-nowrap py-[6px] text-[9.5px] font-bold text-ink-900">
                  {r.regional}
                </td>
                <td className="py-[6px] text-right text-[9.5px] font-semibold tabular-nums text-ink-900">
                  {r.regu}
                </td>
                <td className="py-[6px] text-right text-[9.5px] font-medium tabular-nums text-ink-700">
                  {r.menara}
                </td>
                <td className="py-[6px] text-right text-[9.5px] font-medium tabular-nums text-ink-700">
                  {r.embung}
                </td>
                <td className="py-[6px] text-right text-[9.5px] font-medium tabular-nums text-ink-700">
                  {r.peralatan}
                </td>
                <td className="py-[6px] text-right text-[9.5px] font-medium tabular-nums text-ink-700">
                  {ribuan(r.personel)}
                </td>
                <td className="py-[6px] pl-3">
                  <ToneBadge label={`${r.kecukupanPct}%`} tone={STATUS_TONE[r.status]} />
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
