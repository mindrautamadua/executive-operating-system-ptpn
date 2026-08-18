"use client";

import Link from "next/link";
import { korporasiKpi } from "@/lib/hkm-data-detail";
import { Delta } from "@/components/ui/Delta";
import { useSubholding } from "@/components/SubholdingProvider";
import { ScopeNote } from "@/components/ui/ScopeNote";

const TONES: Record<string, string> = {
  blue: "bg-[#e8f1fd] text-[#2f6fe4]",
  green: "bg-ptpn-greenLight text-ptpn-green",
  teal: "bg-[#e6f6f5] text-[#0d9488]",
  red: "bg-[#fdecec] text-[#ef4444]",
  purple: "bg-[#f1ecfd] text-[#8b5cf6]",
  amber: "bg-[#fdf3e0] text-[#d98b06]",
  slate: "bg-[#eef2f6] text-ink-500",
};

/** KPI strip halaman Korporasi & Anak Usaha (6 kartu). */
export function KorporasiKpiStrip() {
  const { isFiltered } = useSubholding();

  return (
    <>
      {isFiltered && (
        <div className="mb-1.5 flex justify-end">
          <ScopeNote />
        </div>
      )}
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-3">
        {korporasiKpi.map((k, i) => (
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
              className={`mt-[6px] text-[8.5px] leading-[1.35] ${
                k.subDanger ? "text-[#ef4444]" : "text-ink-500"
              }`}
            >
              {k.sub}
            </div>
            {k.delta && k.trend && (
              <div className="mt-1.5">
                <Delta value={k.delta} trend={k.trend} tone={k.deltaTone} size={10} />
              </div>
            )}
            {k.href && k.hrefLabel && (
              <Link
                href={k.href}
                className="mt-1.5 block truncate text-[9px] font-semibold text-ptpn-green hover:underline"
                title={k.hrefLabel}
              >
                {k.hrefLabel}
              </Link>
            )}
          </div>
        ))}
      </div>
    </>
  );
}
