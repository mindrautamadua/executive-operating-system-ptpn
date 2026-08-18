"use client";

import { topDrivers } from "@/lib/svc-data";
import { SectionHead } from "@/components/hc/SectionHead";
import { ToneBadge, type BadgeTone } from "@/components/shared/ToneBadge";
import { useSubholding } from "@/components/SubholdingProvider";
import { filterBySubholding } from "@/lib/subholding";

const fmt = (v: number) =>
  v.toLocaleString("id-ID", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

function progressTone(pct: number): { tone: BadgeTone; label: string; bar: string } {
  if (pct >= 25) return { tone: "good", label: "On Track", bar: "bg-ptpn-green" };
  if (pct >= 10) return { tone: "warn", label: "Tertinggal", bar: "bg-[#f5a524]" };
  return { tone: "bad", label: "Kritis", bar: "bg-[#ef4444]" };
}

/** 8 inisiatif kontributor nilai terbesar: target 2029 vs realisasi YTD. */
export function TopValueDrivers() {
  const { active, isFiltered, def } = useSubholding();
  // `owner` (PalmCo / SGN / PTPN I) adalah dimensi subholding inisiatif ini.
  const rows = filterBySubholding(topDrivers, active, (d) => d.owner);

  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-2.5 pt-3"
      style={{ "--d": "240ms" } as React.CSSProperties}
    >
      <SectionHead title="Kontributor Nilai Terbesar" action="Lihat 28 Inisiatif" />
      <p className="mt-[3px] text-[9px] text-ink-500">
        {isFiltered
          ? `${rows.length} Inisiatif ${def.label} dari 8 Target Uplift 2029 Tertinggi · Konversi Realisasi YTD 2026`
          : "8 Inisiatif dengan Target Uplift 2029 Tertinggi · Konversi Realisasi YTD 2026"}
      </p>

      <div className="scroll-thin mt-1.5 min-h-0 flex-1 overflow-y-auto">
        <div className="scroll-thin overflow-x-auto">
        <table className="w-full border-separate border-spacing-0">
          <thead className="sticky top-0 bg-[var(--surface)]">
            <tr className="text-left text-[7.5px] font-extrabold uppercase tracking-[0.05em] text-ink-400">
              <th className="border-b border-[#eef2f6] pb-1.5 pr-2">ID</th>
              <th className="border-b border-[#eef2f6] pb-1.5 pr-2">Inisiatif</th>
              <th className="border-b border-[#eef2f6] pb-1.5 pr-2">Owner</th>
              <th className="border-b border-[#eef2f6] pb-1.5 pr-2 text-right">Target 2029</th>
              <th className="border-b border-[#eef2f6] pb-1.5 pr-2 text-right">Realisasi YTD</th>
              <th className="w-[104px] border-b border-[#eef2f6] pb-1.5 pr-2">Konversi</th>
              <th className="border-b border-[#eef2f6] pb-1.5">Status</th>
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 && (
              <tr>
                <td colSpan={7} className="py-[6px] text-[8.5px] text-ink-400">
                  Tidak ada inisiatif untuk cakupan ini.
                </td>
              </tr>
            )}
            {rows.map((d) => {
              const pct = (d.realisasiYtdRpT / d.target2029RpT) * 100;
              const t = progressTone(pct);
              return (
                <tr key={d.id} className="align-middle">
                  <td className="whitespace-nowrap border-b border-[#f3f6f9] py-[6px] pr-2 text-[9px] font-bold text-ink-500">
                    {d.id}
                  </td>
                  <td className="border-b border-[#f3f6f9] py-[6px] pr-2 text-[8.5px] font-bold leading-snug text-ink-900">
                    {d.name}
                  </td>
                  <td className="whitespace-nowrap border-b border-[#f3f6f9] py-[6px] pr-2 text-[9px] text-ink-500">
                    {d.owner}
                  </td>
                  <td className="whitespace-nowrap border-b border-[#f3f6f9] py-[6px] pr-2 text-right text-[8.5px] tabular-nums text-ink-700">
                    Rp {fmt(d.target2029RpT)} T
                  </td>
                  <td className="whitespace-nowrap border-b border-[#f3f6f9] py-[6px] pr-2 text-right text-[8.5px] font-semibold tabular-nums text-ink-900">
                    Rp {fmt(d.realisasiYtdRpT)} T
                  </td>
                  <td className="border-b border-[#f3f6f9] py-[6px] pr-2">
                    <div className="flex items-center gap-1.5">
                      <div className="h-[5px] w-full overflow-hidden rounded-full bg-[#eef2f6]">
                        <div
                          className={`h-full rounded-full ${t.bar}`}
                          style={{ width: `${Math.min(pct, 100)}%` }}
                        />
                      </div>
                      <span className="w-[26px] shrink-0 text-right text-[7.5px] font-bold text-ink-500">
                        {Math.round(pct)}%
                      </span>
                    </div>
                  </td>
                  <td className="border-b border-[#f3f6f9] py-[6px]">
                    <ToneBadge label={t.label} tone={t.tone} />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        </div>
      </div>
    </div>
  );
}
