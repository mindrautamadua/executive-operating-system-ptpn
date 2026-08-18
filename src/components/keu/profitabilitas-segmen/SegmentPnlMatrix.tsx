"use client";

import { segmentPnlMatrix } from "@/lib/kps-data";
import { fmtId } from "@/lib/keu-core";
import { ToneBadge } from "@/components/shared/ToneBadge";
import { useSubholding } from "@/components/SubholdingProvider";
import { filterBySubholding } from "@/lib/subholding";
import { SectionHead } from "../../hc/SectionHead";

const TONE_LABEL = { good: "Sehat", warn: "Membaik", bad: "Tertekan" } as const;

/** Matriks P&L segmen: revenue, EBITDA, margin, ROIC + catatan naratif. */
export function SegmentPnlMatrix() {
  const { active, isFiltered, def } = useSubholding();
  // `segment` (PalmCo / SGN / PTPN I) adalah dimensi subholding baris ini.
  const rows = filterBySubholding(segmentPnlMatrix, active, (s) => s.segment);

  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-3 pt-3"
      style={{ "--d": "60ms" } as React.CSSProperties}
    >
      <SectionHead title="Segment P&L Matrix" action="Lihat Detail" />
      <p className="mt-[3px] text-[9px] text-ink-500">
        {isFiltered
          ? `Pendapatan · EBITDA · Margin · ROIC ${def.label} (YTD)`
          : "Pendapatan · EBITDA · Margin · ROIC per Subholding (YTD)"}
      </p>

      <div className="mt-2 min-h-0 flex-1">
        <div className="scroll-thin overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-[#eef2f6] text-[8.5px] font-semibold text-ink-500">
              <th className="pb-[6px] text-left font-semibold">Segmen</th>
              <th className="pb-[6px] text-right font-semibold">
                Pendapatan
                <br />
                (Rp T)
              </th>
              <th className="pb-[6px] text-right font-semibold">
                EBITDA
                <br />
                (Rp T)
              </th>
              <th className="pb-[6px] text-right font-semibold">Margin</th>
              <th className="pb-[6px] text-right font-semibold">ROIC</th>
              <th className="pb-[6px] text-right font-semibold">
                Share
                <br />
                Pendapatan
              </th>
              <th className="pb-[6px] pl-3 text-left font-semibold">Status</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((s) => (
              <tr
                key={s.segment}
                className="border-b border-[#f5f8fa] transition-colors last:border-0 hover:bg-[#f5f8fa]"
              >
                <td className="py-[6px] pr-2">
                  <div className="whitespace-nowrap text-[9.5px] font-bold text-ink-900">
                    {s.segment}
                  </div>
                  <div className="max-w-[240px] truncate text-[9px] text-ink-500" title={s.note}>
                    {s.note}
                  </div>
                </td>
                <td className="py-[6px] text-right text-[9.5px] font-medium tabular-nums text-ink-700">
                  {fmtId(s.revenue, 1)}
                </td>
                <td className="py-[6px] text-right text-[9.5px] font-semibold tabular-nums text-ink-900">
                  {fmtId(s.ebitda, 2)}
                </td>
                <td className="py-[6px] text-right text-[9.5px] font-medium tabular-nums text-ink-700">
                  {fmtId(s.marginPct, 1)}%
                </td>
                <td className="py-[6px] text-right text-[9.5px] font-medium tabular-nums text-ink-700">
                  {fmtId(s.roicPct, 1)}%
                </td>
                <td className="py-[6px] text-right text-[9.5px] font-semibold tabular-nums text-ink-900">
                  {fmtId(s.revenueSharePct, 1)}%
                </td>
                <td className="py-[6px] pl-3">
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
          ? `Baris ${def.label} dari matriks 3 subholding; ROIC annualized vs hurdle rate grup 9,5%.`
          : "ROIC annualized; hurdle rate grup 9,5% — hanya PalmCo yang berada di atas biaya modal."}
      </p>
    </div>
  );
}
