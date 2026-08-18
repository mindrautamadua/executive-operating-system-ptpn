"use client";

import { ermKpi } from "@/lib/risk-data-detail";
import { useSubholding } from "@/components/SubholdingProvider";
import { ScopeNote } from "@/components/ui/ScopeNote";

const TONES: Record<string, string> = {
  blue: "bg-[#e8f1fd] text-[#2f6fe4]",
  green: "bg-ptpn-greenLight text-ptpn-green",
  teal: "bg-[#e6f6f5] text-[#0d9488]",
  red: "bg-[#fdecec] text-[#ef4444]",
  amber: "bg-[#fdf3e0] text-[#d98b06]",
};

/** KPI strip halaman Asuransi, Mitigasi & ERM (4 kartu). */
export function ErmKpiStrip() {
  const { isFiltered } = useSubholding();
  return (
    <>
      {isFiltered && (
        <div className="mb-2 flex justify-end">
          <ScopeNote />
        </div>
      )}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-3">
        {ermKpi.map((k, i) => (
          <div
            key={k.label}
            className="card anim-rise px-3 pb-3 pt-3"
            style={{ "--d": `${40 * i}ms` } as React.CSSProperties}
          >
            <div className="flex items-center gap-2">
              <span className={`h-[6px] w-[6px] shrink-0 rounded-full ${TONES[k.tone]}`} />
              <span className="min-w-0 text-[9px] font-semibold leading-[1.25] text-ink-500">
                {k.label}
              </span>
            </div>
            <div className="mt-2.5 flex items-baseline gap-[2px] whitespace-nowrap">
              <span className="text-[21px] font-extrabold leading-none tracking-[-0.01em] text-ink-900">
                {k.value}
              </span>
              {k.valueSuffix && (
                <span className="text-[10px] font-bold text-ink-500">{k.valueSuffix}</span>
              )}
            </div>
            <div
              className={`mt-[6px] text-[8.5px] leading-[1.35] ${k.subDanger ? "text-[#ef4444]" : "text-ink-500"}`}
            >
              {k.sub}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
