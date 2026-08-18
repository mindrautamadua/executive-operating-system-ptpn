"use client";

import {
  CircleAlert,
  FileCheck2,
  Gauge,
  Target,
  TrendingDown,
  type LucideIcon,
} from "lucide-react";
import { Delta } from "@/components/ui/Delta";
import { evaluasiKpi } from "@/lib/dek-data-detail";
import type { DekTone } from "@/lib/dek-data";
import { useSubholding } from "@/components/SubholdingProvider";
import { ScopeNote } from "@/components/ui/ScopeNote";

const ICONS: LucideIcon[] = [Gauge, CircleAlert, TrendingDown, Target, FileCheck2];

const TONES: Record<DekTone, string> = {
  blue: "bg-[#e8f1fd] text-[#2f6fe4]",
  green: "bg-ptpn-greenLight text-ptpn-green",
  teal: "bg-[#e6f6f5] text-[#0d9488]",
  red: "bg-[#fdecec] text-[#ef4444]",
  purple: "bg-[#f1ecfd] text-[#8b5cf6]",
  amber: "bg-[#fdf3e0] text-[#d98b06]",
};

/** Strip 5 KPI penilaian kolektif Direksi oleh Dewan Komisaris. */
export function EvaluasiKpiStrip() {
  const { isFiltered } = useSubholding();

  return (
    <>
      {isFiltered && (
        <div className="mb-1.5 flex justify-end">
          <ScopeNote />
        </div>
      )}
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-3">
        {evaluasiKpi.map((k, i) => {
          const Icon = ICONS[i] ?? Gauge;
          return (
            <div
              key={k.label}
              className="card anim-rise px-3 pb-3 pt-3"
              style={{ "--d": `${40 * i}ms` } as React.CSSProperties}
            >
              <div className="flex items-center gap-2">
                <span
                  className={`flex h-[26px] w-[26px] shrink-0 items-center justify-center rounded-lg ${TONES[k.tone]}`}
                >
                  <Icon size={14} strokeWidth={1.9} />
                </span>
                <span className="min-w-0 text-[9px] font-semibold leading-[1.25] text-ink-500">
                  {k.label}
                </span>
              </div>
              <div className="mt-2.5 flex items-baseline gap-[3px] whitespace-nowrap text-[19px] font-extrabold leading-none tracking-[-0.01em] text-ink-900">
                {k.value}
                {k.valueSuffix && (
                  <span className="text-[10px] font-bold text-ink-500">{k.valueSuffix}</span>
                )}
              </div>
              <div className="mt-[4px] truncate text-[8.5px] text-ink-500" title={k.sub}>
                {k.sub}
              </div>
              <div className="mt-2 flex items-center gap-1.5">
                {k.delta && k.trend ? (
                  <>
                    <Delta value={k.delta} trend={k.trend} tone={k.deltaTone} size={10} />
                    <span className="truncate text-[8.5px] text-ink-400">vs triwulan lalu</span>
                  </>
                ) : (
                  <span className="truncate text-[8.5px] font-semibold text-ink-400">
                    Posisi s.d. 31 Mei 2026
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
