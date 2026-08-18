"use client";

import { economicProfit } from "@/lib/svc-data";
import { SectionHead } from "@/components/hc/SectionHead";
import { ToneBadge, type BadgeTone } from "@/components/shared/ToneBadge";
import { useSubholding } from "@/components/SubholdingProvider";
import { filterBySubholding } from "@/lib/subholding";

const fmt1 = (v: number) =>
  v.toLocaleString("id-ID", { minimumFractionDigits: 1, maximumFractionDigits: 1 });
const fmt2 = (v: number) =>
  v.toLocaleString("id-ID", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

const signed = (v: number, f: (n: number) => string) => `${v > 0 ? "+" : v < 0 ? "−" : ""}${f(Math.abs(v))}`;

/** ROIC vs WACC Group dan spread EVA per subholding. */
export function EconomicProfitCard() {
  const { roicPct, waccPct, spreadPts, catatan, evaRows } = economicProfit;
  const { active, isFiltered, def } = useSubholding();
  // `entity` (PalmCo / SGN / PTPN I) adalah dimensi subholding baris EVA;
  // "Holding & Lainnya" tidak mengacu ke satu subholding sehingga selalu tampil.
  const rows = filterBySubholding(evaRows, active, (r) => r.entity);

  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-3 pt-3"
      style={{ "--d": "300ms" } as React.CSSProperties}
    >
      <SectionHead title="Economic Profit (ROIC vs WACC)" action="Lihat Metodologi" />
      <p className="mt-[3px] text-[9px] text-ink-500">
        {isFiltered
          ? `Spread Nilai Ekonomis Group (konsolidasi) & EVA Disetahunkan — Baris ${def.label}`
          : "Spread Nilai Ekonomis Group & EVA Disetahunkan per Subholding"}
      </p>

      <div className="mt-2 flex min-h-0 flex-1 gap-3">
        <div className="flex w-[236px] shrink-0 flex-col gap-2">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            <div className="rounded-lg border border-[#eef2f6] bg-[#f5f8fa] px-2 py-1.5">
              <div className="text-[9px] font-semibold text-ink-500">ROIC</div>
              <div className="mt-[3px] text-[14px] font-extrabold leading-none text-ink-900">
                {fmt1(roicPct)}%
              </div>
            </div>
            <div className="rounded-lg border border-[#eef2f6] bg-[#f5f8fa] px-2 py-1.5">
              <div className="text-[9px] font-semibold text-ink-500">WACC</div>
              <div className="mt-[3px] text-[14px] font-extrabold leading-none text-ink-900">
                {fmt1(waccPct)}%
              </div>
            </div>
            <div className="rounded-lg border border-[#f5d9d9] bg-[#fdecec] px-2 py-1.5">
              <div className="text-[9px] font-semibold text-[#ef4444]">Spread</div>
              <div className="mt-[3px] text-[14px] font-extrabold leading-none text-[#ef4444]">
                {signed(spreadPts, fmt1)}
              </div>
            </div>
          </div>
          <p className="text-[8.5px] leading-snug text-ink-500">{catatan}</p>
        </div>

        <div className="min-w-0 flex-1">
          <div className="scroll-thin overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-[#eef2f6] text-[9px] font-extrabold uppercase tracking-[0.05em] text-ink-500">
                <th className="pb-[6px] text-left font-extrabold">Entitas</th>
                <th className="pb-[6px] text-right font-extrabold">ROIC</th>
                <th className="pb-[6px] text-right font-extrabold">Spread vs WACC</th>
                <th className="pb-[6px] text-right font-extrabold">EVA (Rp T)</th>
                <th className="pb-[6px] pl-3 text-left font-extrabold">Status</th>
              </tr>
            </thead>
            <tbody>
              {rows.length === 0 && (
                <tr>
                  <td colSpan={5} className="py-[7px] text-[8.5px] text-ink-400">
                    Tidak ada baris EVA untuk cakupan ini.
                  </td>
                </tr>
              )}
              {rows.map((r) => {
                const tone: BadgeTone = r.spreadPts >= 0 ? "good" : r.spreadPts >= -3 ? "warn" : "bad";
                const label =
                  r.spreadPts >= 0 ? "Menciptakan Nilai" : r.spreadPts >= -3 ? "Marginal" : "Merusak Nilai";
                return (
                  <tr
                    key={r.entity}
                    className="border-b border-[#f5f8fa] transition-colors last:border-0 hover:bg-[#f5f8fa]"
                  >
                    <td className="whitespace-nowrap py-[7px] text-[9.5px] font-bold text-ink-900">
                      {r.entity}
                    </td>
                    <td className="py-[7px] text-right text-[9.5px] font-medium tabular-nums text-ink-700">
                      {fmt1(r.roicPct)}%
                    </td>
                    <td
                      className={`py-[7px] text-right text-[9.5px] font-semibold tabular-nums ${
                        r.spreadPts >= 0 ? "text-ptpn-green" : "text-[#ef4444]"
                      }`}
                    >
                      {signed(r.spreadPts, fmt1)} pts
                    </td>
                    <td
                      className={`py-[7px] text-right text-[9.5px] font-semibold tabular-nums ${
                        r.evaRpT >= 0 ? "text-ptpn-green" : "text-[#ef4444]"
                      }`}
                    >
                      {signed(r.evaRpT, fmt2)}
                    </td>
                    <td className="py-[7px] pl-3">
                      <ToneBadge label={label} tone={tone} />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          </div>
        </div>
      </div>
    </div>
  );
}
