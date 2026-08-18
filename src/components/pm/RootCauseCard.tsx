import { Wrench } from "lucide-react";
import { SectionHead } from "../hc/SectionHead";
import { rootCause } from "@/lib/pm-data";

const IMPACT_BADGE: Record<string, string> = {
  High: "bg-[#fdecec] text-[#ef4444]",
  Medium: "bg-[#fdf3e0] text-[#d98b06]",
  Low: "bg-[#eef2f6] text-ink-500",
};

export function RootCauseCard() {
  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-3 pt-3"
      style={{ "--d": "120ms" } as React.CSSProperties}
    >
      <SectionHead title="HPI Root Cause Analysis (Berdasarkan Gap Tertinggi)" />
      <div className="mt-2.5 rounded-lg border border-[#f8e3bd] bg-[#fdf3e0] px-3 py-2 text-[9.5px] font-bold text-[#b97407]">
        {rootCause.header}
      </div>

      <div className="mt-2 min-h-0 flex-1">
        <div className="flex items-center justify-between border-b border-[#f0f3f6] pb-1.5">
          <span className="text-[8.5px] font-bold uppercase tracking-[0.04em] text-ink-400">
            Faktor Penyebab Utama
          </span>
          <span className="flex gap-6 text-[8.5px] font-bold uppercase tracking-[0.04em] text-ink-400">
            <span>Impact</span>
            <span>Population Affected</span>
          </span>
        </div>
        <div className="divide-y divide-[#f6f8fa]">
          {rootCause.rows.map((r) => (
            <div key={r.faktor} className="flex items-center justify-between gap-2 py-[7.5px]">
              <span className="min-w-0 flex-1 truncate text-[9.5px] font-medium text-ink-700">
                {r.faktor}
              </span>
              <span
                className={`w-[54px] shrink-0 rounded-md px-1.5 py-[2px] text-center text-[8.5px] font-bold ${IMPACT_BADGE[r.impact]}`}
              >
                {r.impact}
              </span>
              <span className="w-[86px] shrink-0 text-right text-[9.5px] font-bold text-ink-900">
                {r.populasi}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div
        className="flex items-center gap-2 rounded-lg border border-[#eef2f6] bg-[#f8fafb] px-3 py-2"
        title={rootCause.metodologi}
      >
        <Wrench size={12} className="shrink-0 text-ink-500" />
        <span className="text-[9px] font-medium text-ink-700">
          {rootCause.catatan}{" "}
          <span className="font-bold text-ptpn-greenDark">{rootCause.catatanHighlight}</span>
          <span className="ml-1 text-[9px] text-ink-500">(estimasi model — belum tervalidasi)</span>
        </span>
      </div>
    </div>
  );
}
