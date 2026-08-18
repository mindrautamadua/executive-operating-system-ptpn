"use client";

import { ChevronDown } from "lucide-react";
import { breakdownPtpnIv } from "@/lib/produktivitas-data";
import { SEMANTIC } from "@/lib/chart-palette";
import { useSubholding } from "@/components/SubholdingProvider";
import { ScopeEmpty } from "../ui/CommodityScope";

const INDEX_MAX = 130;

function toneIndex(index: number) {
  if (index >= 110) return SEMANTIC.good;
  if (index >= 100) return SEMANTIC.goodSoft;
  if (index >= 95) return SEMANTIC.warn;
  return SEMANTIC.bad;
}

/** Drill-down unit kerja; seluruh isinya milik PTPN IV (PalmCo). */
export function BreakdownProduktivitas() {
  const { active, def } = useSubholding();
  // Kartu ini sepenuhnya milik PalmCo — pada cakupan subholding lain tidak ada
  // baris yang tersisa, jadi tampilkan placeholder alih-alih angka PalmCo.
  const outOfScope = active !== "all" && active !== "palmco";

  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-3 pt-3"
      style={{ "--d": "300ms" } as React.CSSProperties}
    >
      <div className="flex items-start justify-between gap-2">
        <div>
          <h3 className="card-title-navy">5. Breakdown Produktivitas (Drill Down)</h3>
          <p className="mt-[3px] text-[9.5px] text-ink-500">PTPN IV</p>
        </div>
        <button className="select-chip whitespace-nowrap px-2.5 py-[5px] text-[9.5px]">
          PTPN IV <ChevronDown size={11} />
        </button>
      </div>

      {outOfScope ? (
        <ScopeEmpty label={def.label} />
      ) : (
      <div className="mt-1.5 min-h-0 flex-1">
        <div className="scroll-thin overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-[#eef2f6] text-[8.5px] font-semibold text-ink-500">
              <th className="pb-[6px] text-left font-semibold">Unit Kerja</th>
              <th className="pb-[6px] text-right font-semibold">
                Revenue /<br />Employee
              </th>
              <th className="pb-[6px] text-right font-semibold">
                Production /<br />Employee (Ton)
              </th>
              <th className="pb-[6px] text-right font-semibold">
                Labor Cost /<br />Ton (Rp)
              </th>
              <th className="pb-[6px] pl-3 text-left font-semibold">
                Productivity<br />Index
              </th>
            </tr>
          </thead>
          <tbody>
            {breakdownPtpnIv.map((u) => (
              <tr
                key={u.unit}
                className={`border-b border-[#f5f8fa] transition-colors last:border-0 hover:bg-[#f5f8fa] ${
                  u.total ? "bg-[#f7f9fb]" : ""
                }`}
              >
                <td
                  className={`whitespace-nowrap py-[6px] text-[9.5px] text-ink-900 ${
                    u.total ? "font-bold" : "font-semibold"
                  }`}
                >
                  {u.unit}
                </td>
                <td
                  className={`py-[6px] text-right text-[9.5px] tabular-nums text-ink-700 ${
                    u.total ? "font-bold text-ink-900" : "font-medium"
                  }`}
                >
                  {u.revenue}
                </td>
                <td
                  className={`py-[6px] text-right text-[9.5px] tabular-nums text-ink-700 ${
                    u.total ? "font-bold text-ink-900" : "font-medium"
                  }`}
                >
                  {u.produksi}
                </td>
                <td
                  className={`py-[6px] text-right text-[9.5px] tabular-nums text-ink-700 ${
                    u.total ? "font-bold text-ink-900" : "font-medium"
                  }`}
                >
                  {u.laborCostPerTon}
                </td>
                <td className="py-[6px] pl-3">
                  <div className="flex items-center gap-2">
                    <span
                      className={`w-6 shrink-0 text-[9.5px] tabular-nums text-ink-900 ${
                        u.total ? "font-bold" : "font-semibold"
                      }`}
                    >
                      {u.index}
                    </span>
                    <span className="h-[6px] w-full max-w-[52px] overflow-hidden rounded-full bg-[#eef2f6]">
                      <span
                        className="block h-full rounded-full"
                        style={{
                          width: `${(u.index / INDEX_MAX) * 100}%`,
                          background: toneIndex(u.index),
                        }}
                      />
                    </span>
                  </div>
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
