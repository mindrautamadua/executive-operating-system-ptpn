"use client";

import { fraudHeat } from "@/lib/risk-data-detail";
import { SectionHead } from "@/components/hc/SectionHead";
import { useSubholding } from "@/components/SubholdingProvider";
import { filterBySubholding } from "@/lib/subholding";

const MAX = Math.max(...fraudHeat.map((r) => r.laporan));

const rateColor = (pct: number) =>
  pct >= 45 ? "#ef4444" : pct >= 35 ? "#f5a524" : "#1a9c5b";

/** Konsentrasi laporan & kerugian fraud per subholding/regional. */
export function FraudTriangleHeat() {
  const { active, isFiltered, def } = useSubholding();
  // `name` (PalmCo / SGN / PTPN I (SupportingCo)) adalah dimensi subholding.
  const rows = filterBySubholding(fraudHeat, active, (r) => r.name);

  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-3 pt-3"
      style={{ "--d": "60ms" } as React.CSSProperties}
    >
      <SectionHead title="Konsentrasi Fraud per Subholding" />
      <p className="mt-[3px] text-[9px] text-ink-500">
        {isFiltered
          ? `Laporan & Kerugian Teridentifikasi YTD — ${def.label}`
          : "Laporan, Tingkat Terbukti & Kerugian Teridentifikasi YTD"}
      </p>

      <div className="scroll-thin mt-2 min-h-0 flex-1 overflow-y-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-[#eef2f6] text-left">
              {["Entitas", "Laporan", "Terbukti", "Rate", "Kerugian"].map((h) => (
                <th
                  key={h}
                  className="py-[5px] text-[9px] font-extrabold uppercase tracking-[0.04em] text-ink-500"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => {
              const rate = Math.round((r.substantiated / r.laporan) * 100);
              return (
                <tr key={r.name} className="border-b border-[#f4f7f9] last:border-0">
                  <td className="py-[7px] pr-2 text-[9px] font-bold text-ink-900">{r.name}</td>
                  <td className="py-[7px] pr-2">
                    <span className="flex items-center gap-1.5">
                      <span className="h-[8px] w-[54px] shrink-0 overflow-hidden rounded-full bg-[#eef2f6]">
                        <span
                          className="anim-grow-x block h-full rounded-full bg-[#3b7ded]"
                          style={{ width: `${(r.laporan / MAX) * 100}%` }}
                        />
                      </span>
                      <span className="text-[9.5px] font-extrabold text-ink-900">{r.laporan}</span>
                    </span>
                  </td>
                  <td className="py-[7px] pr-2 text-[9px] font-semibold text-ink-700">
                    {r.substantiated}
                  </td>
                  <td className="py-[7px] pr-2">
                    <span
                      className="text-[9.5px] font-extrabold"
                      style={{ color: rateColor(rate) }}
                    >
                      {rate}%
                    </span>
                  </td>
                  <td className="py-[7px] text-[9.5px] font-extrabold text-[#ef4444]">{r.loss}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <p className="mt-1.5 rounded-md bg-[#f8fafc] px-2 py-[5px] text-[9px] leading-[1.4] text-ink-500">
        {isFiltered
          ? `Baris ${def.label} dari konsentrasi fraud 3 subholding; basis 43 laporan grup YTD.`
          : "PalmCo memegang 45% laporan dan 45% kerugian — proporsional terhadap skala operasi, bukan anomali tata kelola."}
      </p>
    </div>
  );
}
