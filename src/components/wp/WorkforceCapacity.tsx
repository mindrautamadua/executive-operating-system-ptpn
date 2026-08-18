import { Gauge } from "lucide-react";
import { kapasitasGap, kapasitasRows } from "@/lib/wp-data";
import { SectionHead } from "../hc/SectionHead";

/**
 * Workforce Capacity: membedakan headcount vs kapasitas produktif
 * (FTE-equivalent) dan gap kapasitas terhadap kebutuhan 2028.
 */
export function WorkforceCapacity() {
  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-3 pt-3"
      style={{ "--d": "180ms" } as React.CSSProperties}
    >
      <SectionHead title="Workforce Capacity" />
      <p className="mt-[3px] text-[9px] text-ink-500">Kapasitas produktif, bukan sekadar jumlah orang</p>

      <div className="mt-2 flex min-h-0 flex-1 flex-col justify-center gap-[6px]">
        {kapasitasRows.map((r) => (
          <div
            key={r.label}
            className="flex items-center justify-between gap-2 rounded-lg bg-[#f8fafc] px-3 py-[6px]"
          >
            <span className="truncate text-[9px] font-semibold text-ink-500">{r.label}</span>
            <span className="shrink-0 whitespace-nowrap text-[10px] font-extrabold text-ink-900">
              {r.value}
              {r.sub && <span className="ml-1 text-[7.5px] font-medium text-ink-400">{r.sub}</span>}
            </span>
          </div>
        ))}

        <div className="flex items-center justify-between gap-2 rounded-lg border border-[#f8d7d7] bg-[#fdecec] px-3 py-[7px]">
          <span className="flex items-center gap-1.5 text-[9px] font-bold text-[#b91c1c]">
            <Gauge size={12} />
            {kapasitasGap.label}
          </span>
          <span className="shrink-0 text-[11px] font-extrabold text-[#ef4444]">
            {kapasitasGap.value}
          </span>
        </div>
      </div>

      <p className="mt-2 shrink-0 text-[9px] leading-[1.5] text-ink-500">{kapasitasGap.note}</p>
    </div>
  );
}
