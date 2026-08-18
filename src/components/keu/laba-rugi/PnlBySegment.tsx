"use client";

import { pnlBySegment } from "@/lib/kpl-data";
import { EBITDA_HOLDING_ELIMINASI_RPT, fmtId } from "@/lib/keu-core";
import { ToneBadge } from "@/components/shared/ToneBadge";
import { useSubholding } from "@/components/SubholdingProvider";
import { filterBySubholding } from "@/lib/subholding";
import { SectionHead } from "../../hc/SectionHead";

const TONE_LABEL = { good: "Sehat", warn: "Membaik", bad: "Tertekan" } as const;

/** Mini P&L per subholding: pendapatan → laba bersih + tone kesehatan margin. */
export function PnlBySegment() {
  const { active, isFiltered, def } = useSubholding();
  // `segment` (PalmCo / SGN / PTPN I) adalah dimensi subholding baris ini.
  const rows = filterBySubholding(pnlBySegment, active, (s) => s.segment);

  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-3 pt-3"
      style={{ "--d": "240ms" } as React.CSSProperties}
    >
      <SectionHead title="P&L per Segmen" action="Lihat Detail" />
      <p className="mt-[3px] text-[9px] text-ink-500">
        {isFiltered ? `Mini P&L ${def.label}` : "Mini P&L 3 Subholding"} · Rp T (YTD)
      </p>

      <div className="mt-2 min-h-0 flex-1">
        <div className="scroll-thin overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-[#eef2f6] text-[8.5px] font-semibold text-ink-500">
              <th className="pb-[6px] text-left font-semibold">Segmen</th>
              <th className="pb-[6px] text-right font-semibold">Pendapatan</th>
              <th className="pb-[6px] text-right font-semibold">Laba Kotor</th>
              <th className="pb-[6px] text-right font-semibold">EBITDA</th>
              <th className="pb-[6px] text-right font-semibold">Margin</th>
              <th className="pb-[6px] text-right font-semibold">Laba Bersih</th>
              <th className="pb-[6px] pl-3 text-left font-semibold">Status</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((s) => (
              <tr
                key={s.segment}
                className="border-b border-[#f5f8fa] transition-colors last:border-0 hover:bg-[#f5f8fa]"
              >
                <td className="whitespace-nowrap py-[7px] text-[9.5px] font-bold text-ink-900">
                  {s.segment}
                </td>
                <td className="py-[7px] text-right text-[9.5px] font-medium tabular-nums text-ink-700">
                  {fmtId(s.revenue, 1)}
                </td>
                <td className="py-[7px] text-right text-[9.5px] font-medium tabular-nums text-ink-700">
                  {fmtId(s.grossProfit, 2)}
                </td>
                <td className="py-[7px] text-right text-[9.5px] font-semibold tabular-nums text-ink-900">
                  {fmtId(s.ebitda, 2)}
                </td>
                <td className="py-[7px] text-right text-[9.5px] font-medium tabular-nums text-ink-700">
                  {fmtId(s.ebitdaMarginPct, 1)}%
                </td>
                <td className="py-[7px] text-right text-[9.5px] font-semibold tabular-nums text-ink-900">
                  {fmtId(s.netIncome, 2)}
                </td>
                <td className="py-[7px] pl-3">
                  <ToneBadge label={TONE_LABEL[s.tone]} tone={s.tone} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      </div>

      <p className="mt-1 border-t border-[#f5f8fa] pt-1.5 text-[8.5px] leading-snug text-ink-500">
        {isFiltered
          ? `Baris ${def.label} dari matriks P&L 3 subholding; eliminasi antar-segmen tetap di tingkat grup.`
          : `EBITDA holding, eliminasi & non-segmen Rp ${fmtId(EBITDA_HOLDING_ELIMINASI_RPT, 2)} T — konsolidasi grup Rp 6,82 T.`}
      </p>
    </div>
  );
}
