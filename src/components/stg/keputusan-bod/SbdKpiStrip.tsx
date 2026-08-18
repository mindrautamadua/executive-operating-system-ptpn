"use client";

import { AlarmClock, Clock3, Gauge, Gavel, Target, type LucideIcon } from "lucide-react";
import { Delta } from "@/components/ui/Delta";
import { overdueDetail, sbdKpi } from "@/lib/sbd-data";
import type { StgKpi } from "@/lib/stg-core";
import { ScopeNote } from "@/components/ui/ScopeNote";
import { useSubholding } from "@/components/SubholdingProvider";
import { filterBySubholding } from "@/lib/subholding";

const ICONS: Partial<Record<StgKpi["icon"], LucideIcon>> = {
  decision: Gavel,
  target: Target,
  clock: Clock3,
  late: AlarmClock,
  score: Gauge,
};

const TONES: Record<StgKpi["tone"], string> = {
  blue: "bg-[#e8f1fd] text-[#2f6fe4]",
  green: "bg-ptpn-greenLight text-ptpn-green",
  teal: "bg-[#e6f6f5] text-[#0d9488]",
  red: "bg-[#fdecec] text-[#ef4444]",
  purple: "bg-[#f1ecfd] text-[#8b5cf6]",
  amber: "bg-[#fdf3e0] text-[#d98b06]",
};

/**
 * Strip 5 KPI keputusan direksi & dewan komisaris.
 * Hanya tile Overdue yang punya rincian per baris (PIC/judul menyebut
 * subholding) sehingga bisa dihitung ulang; sisanya angka induk YTD tingkat
 * grup dan ditandai <ScopeNote /> saat filter aktif.
 */
export function SbdKpiStrip() {
  const { active, isFiltered, def } = useSubholding();
  const overdueRows = filterBySubholding(overdueDetail, active, (d) => `${d.title} ${d.pic}`);

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-3">
      {sbdKpi.map((k, i) => {
        const Icon = ICONS[k.icon] ?? Gavel;
        // Tile Overdue mengikuti cakupan; delta bulanan tidak dapat diturunkan
        // per subholding sehingga disembunyikan saat difilter.
        const derived = k.icon === "late" && isFiltered;
        const value = derived ? String(overdueRows.length) : k.value;
        const sub = derived ? `Cakupan ${def.label}` : k.sub;
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
              {value}
              {k.valueSuffix && (
                <span className="text-[10px] font-bold text-ink-500">{k.valueSuffix}</span>
              )}
            </div>
            <div
              className={`mt-[4px] truncate text-[8.5px] ${k.subDanger ? "text-[#ef4444]" : "text-ink-500"}`}
              title={sub}
            >
              {sub}
            </div>
            <div className="mt-2 flex items-center gap-1.5">
              {!derived && k.delta && k.trend ? (
                <>
                  <Delta value={k.delta} trend={k.trend} tone={k.deltaTone} size={10} />
                  <span className="truncate text-[8.5px] text-ink-400">{k.compare}</span>
                </>
              ) : (
                <span className="truncate text-[8.5px] font-semibold text-ink-400">
                  {derived ? "Dari 3 keputusan overdue grup" : k.compare}
                </span>
              )}
              {!derived && <ScopeNote className="ml-auto" />}
            </div>
          </div>
        );
      })}
    </div>
  );
}
