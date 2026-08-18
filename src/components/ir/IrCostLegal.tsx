import { Banknote, Scale } from "lucide-react";
import { PALETTE } from "@/lib/chart-palette";
import { irCostRows, irCostTotals, legalExposure } from "@/lib/ir-intel-data";
import { SectionHead } from "../hc/SectionHead";

/**
 * Cost of Industrial Relations + Legal Exposure: konsekuensi ekonomi & hukum
 * dari pengelolaan hubungan industrial (YTD).
 */
export function IrCostLegal() {
  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-3 pt-3"
      style={{ "--d": "180ms" } as React.CSSProperties}
    >
      <div className="flex items-baseline justify-between gap-2">
        <SectionHead title="IR Cost & Legal Exposure" />
        <span className="flex items-center gap-1 text-[9px] font-extrabold text-ink-900">
          <Banknote size={11} className="text-ptpn-green" />
          Total {irCostTotals.total}
          <span className="font-medium text-ink-400">(YTD)</span>
        </span>
      </div>

      <ul className="mt-2 flex flex-col gap-1.5">
        {irCostRows.map((c) => (
          <li key={c.label} className="flex items-center gap-2">
            <span className="w-[148px] shrink-0 truncate text-[8.5px] font-semibold text-ink-700" title={c.label}>
              {c.label}
            </span>
            <span className="h-[7px] min-w-0 flex-1 overflow-hidden rounded-full bg-[#eef2f6]">
              <span
                className="anim-grow-x block h-full rounded-full"
                style={{ width: `${c.pct}%`, background: PALETTE.green }}
              />
            </span>
            <span className="w-[52px] shrink-0 text-right text-[9px] font-extrabold text-ink-900">
              {c.value}
            </span>
          </li>
        ))}
      </ul>

      <div className="mt-1.5 flex items-center gap-2">
        <span className="rounded-md bg-[#f8fafc] px-2 py-[3px] text-[9px] font-bold text-ink-700 ring-1 ring-[#eef2f6]">
          {irCostTotals.perCase}
        </span>
        <span className="rounded-md bg-[#f8fafc] px-2 py-[3px] text-[9px] font-bold text-ink-700 ring-1 ring-[#eef2f6]">
          {irCostTotals.perEmployee}
        </span>
      </div>

      <div className="mt-2 flex min-h-0 flex-1 flex-col justify-around border-t border-[#eef2f6] pt-1.5">
        <div className="flex items-center gap-1.5">
          <Scale size={11} className="text-[#d98b06]" />
          <span className="text-[9px] font-extrabold uppercase tracking-[0.04em] text-ink-500">
            Legal Exposure — Kasus PHK & PHI
          </span>
        </div>
        {legalExposure.map((l) => (
          <div key={l.label} className="flex items-center justify-between gap-2">
            <span className="text-[8.5px] font-medium text-ink-600">{l.label}</span>
            <span className="text-[9px] font-extrabold text-ink-900">{l.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
