"use client";

import { opexInitiatives } from "@/lib/biaya-opex-data";
import type { OpexInitiative } from "@/lib/biaya-opex-data";
import { SectionHead } from "@/components/hc/SectionHead";
import { ToneBadge, type BadgeTone } from "@/components/shared/ToneBadge";
import { useSubholding } from "@/components/SubholdingProvider";
import { commodityScope, ScopeEmpty } from "@/components/ui/CommodityScope";
import { filterBySubholding } from "@/lib/subholding";

const STATUS_TONE: Record<OpexInitiative["status"], BadgeTone> = {
  Hijau: "good",
  Kuning: "warn",
  Merah: "bad",
};

const BAR_TONE: Record<OpexInitiative["status"], string> = {
  Hijau: "bg-ptpn-green",
  Kuning: "bg-[#f5a524]",
  Merah: "bg-[#ef4444]",
};

export function InitiativePortfolio() {
  const { active, def } = useSubholding();
  // Program OPEX umumnya lintas komoditas; hanya inisiatif yang menyebut unit
  // komoditas (mis. "36 PKS", "losses PKS", "logistik TBS" → PalmCo) yang ikut
  // disaring, sisanya tetap tampil di semua cakupan.
  const rows = filterBySubholding(opexInitiatives, active, (ini) =>
    commodityScope(`${ini.inisiatif} ${ini.workstream}`),
  );

  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-2.5 pt-3"
      style={{ "--d": "60ms" } as React.CSSProperties}
    >
      <SectionHead title="Portofolio Inisiatif OPEX" action="Lihat 24 Inisiatif" />
      <p className="mt-[3px] text-[9px] text-ink-500">
        12 Inisiatif Terbesar (Dampak Rp 680 M YTD) — Status RAG per Mei 2026
      </p>

      {rows.length === 0 ? (
        <ScopeEmpty label={def.fullLabel} />
      ) : (
      <div className="scroll-thin mt-1.5 min-h-0 flex-1 overflow-y-auto">
        <div className="scroll-thin overflow-x-auto">
        <table className="w-full border-separate border-spacing-0">
          <thead className="sticky top-0 bg-[var(--surface)]">
            <tr className="text-left text-[7.5px] font-extrabold uppercase tracking-[0.05em] text-ink-400">
              <th className="border-b border-[#eef2f6] pb-1.5 pr-2">Inisiatif</th>
              <th className="border-b border-[#eef2f6] pb-1.5 pr-2">Workstream</th>
              <th className="border-b border-[#eef2f6] pb-1.5 pr-2 text-right">Dampak</th>
              <th className="w-[92px] border-b border-[#eef2f6] pb-1.5 pr-2">Progress</th>
              <th className="border-b border-[#eef2f6] pb-1.5 pr-2">Status</th>
              <th className="border-b border-[#eef2f6] pb-1.5">Owner</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((ini) => (
              <tr key={ini.inisiatif} className="align-middle">
                <td className="border-b border-[#f3f6f9] py-[5px] pr-2 text-[8.5px] font-bold leading-snug text-ink-900">
                  {ini.inisiatif}
                </td>
                <td className="border-b border-[#f3f6f9] py-[5px] pr-2 text-[9px] text-ink-500">
                  {ini.workstream}
                </td>
                <td className="whitespace-nowrap border-b border-[#f3f6f9] py-[5px] pr-2 text-right text-[8.5px] font-bold text-ink-900">
                  Rp {ini.dampakRpM} M
                </td>
                <td className="border-b border-[#f3f6f9] py-[5px] pr-2">
                  <div className="flex items-center gap-1.5">
                    <div className="h-[5px] w-full overflow-hidden rounded-full bg-[#eef2f6]">
                      <div
                        className={`h-full rounded-full ${BAR_TONE[ini.status]}`}
                        style={{ width: `${ini.progressPct}%` }}
                      />
                    </div>
                    <span className="w-[24px] shrink-0 text-right text-[7.5px] font-bold text-ink-500">
                      {ini.progressPct}%
                    </span>
                  </div>
                </td>
                <td className="border-b border-[#f3f6f9] py-[5px] pr-2">
                  <ToneBadge label={ini.status} tone={STATUS_TONE[ini.status]} />
                </td>
                <td className="whitespace-nowrap border-b border-[#f3f6f9] py-[5px] text-[9px] text-ink-500">
                  {ini.owner}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      </div>
      )}
    </div>
  );
}
