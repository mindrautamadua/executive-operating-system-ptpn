"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { securityCoverage, securityCoverageFootnote } from "@/lib/hse-data-detail";
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
const rasio = (v: number) => v.toLocaleString("id-ID", { minimumFractionDigits: 2 });

/** Cakupan pengamanan per regional: personel, rasio, pos jaga, dan CCTV. */
export function SecurityCoverage() {
  const { active, isFiltered, def } = useSubholding();
  // Rasio personel per 1.000 ha dihitung atas areal kebun Regional 1–7, wilayah
  // operasi PalmCo (PTPN IV).
  const luarCakupan = isFiltered && active !== "palmco";

  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-3 pt-3"
      style={{ "--d": "120ms" } as React.CSSProperties}
    >
      <SectionHead title="Cakupan Pengamanan per Regional" action="Lihat Detail" />
      <p className="mt-[3px] text-[9px] text-ink-500">
        {luarCakupan
          ? `Cakupan pengamanan regional PalmCo — di luar cakupan ${def.label}`
          : "1.240 Personel · 312 Pos Jaga · 632 CCTV · Rasio Grup 2,44/1.000 ha"}
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
              <th className="pb-[6px] text-right font-semibold">Personel</th>
              <th className="pb-[6px] text-right font-semibold">Per 1.000 ha</th>
              <th className="pb-[6px] text-right font-semibold">Pos Jaga</th>
              <th className="pb-[6px] text-right font-semibold">CCTV</th>
              <th className="pb-[6px] pl-3 text-left font-semibold">Status</th>
            </tr>
          </thead>
          <tbody>
            {securityCoverage.map((s) => (
              <tr
                key={s.regional}
                className="border-b border-[#f5f8fa] transition-colors last:border-0 hover:bg-[#f5f8fa]"
              >
                <td className="whitespace-nowrap py-[6px] text-[9.5px] font-bold text-ink-900">
                  {s.regional}
                </td>
                <td className="py-[6px] text-right text-[9.5px] font-semibold tabular-nums text-ink-900">
                  {ribuan(s.personel)}
                </td>
                <td className="py-[6px] text-right text-[9.5px] font-medium tabular-nums text-ink-700">
                  {rasio(s.rasioPer1000Ha)}
                </td>
                <td className="py-[6px] text-right text-[9.5px] font-medium tabular-nums text-ink-700">
                  {s.posJaga}
                </td>
                <td className="py-[6px] text-right text-[9.5px] font-medium tabular-nums text-ink-700">
                  {s.cctv}
                </td>
                <td className="py-[6px] pl-3">
                  <ToneBadge label={s.status} tone={STATUS_TONE[s.status]} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      </div>

      <p className="mt-1 border-t border-[#f5f8fa] pt-1.5 text-[8.5px] leading-snug text-ink-500">
        {securityCoverageFootnote}{" "}
        <Link
          href="/produksi-operasi/operational-excellence"
          className="inline-flex items-center gap-[2px] font-semibold text-ptpn-green hover:underline"
        >
          Operational Excellence
          <ArrowUpRight size={9} />
        </Link>
      </p>
    </div>
  );
}
