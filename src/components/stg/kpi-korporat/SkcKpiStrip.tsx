"use client";

import { CircleAlert, Gauge, type LucideIcon } from "lucide-react";
import { Delta } from "@/components/ui/Delta";
import { skcKpi } from "@/lib/skc-data";
import type { StgKpi } from "@/lib/stg-core";
import { toSubholdingId } from "@/lib/subholding";
import { useSubholding } from "@/components/SubholdingProvider";

const ICONS: Partial<Record<StgKpi["icon"], LucideIcon>> = {
  score: Gauge,
  red: CircleAlert,
};

const TONES: Record<StgKpi["tone"], string> = {
  blue: "bg-[#e8f1fd] text-[#2f6fe4]",
  green: "bg-ptpn-greenLight text-ptpn-green",
  teal: "bg-[#e6f6f5] text-[#0d9488]",
  red: "bg-[#fdecec] text-[#ef4444]",
  purple: "bg-[#f1ecfd] text-[#8b5cf6]",
  amber: "bg-[#fdf3e0] text-[#d98b06]",
};

/** Strip 5 KPI skor scorecard korporat. */
export function SkcKpiStrip() {
  const { active, isFiltered } = useSubholding();
  // Strip pembanding: tile subholding non-aktif diredupkan agar posisi relatif
  // antar entitas tetap terbaca; tile Group & KPI Merah selalu penuh.
  const dim = (label: string) => {
    const sub = toSubholdingId(label);
    return !isFiltered || sub === null || sub === active ? 1 : 0.25;
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-3">
      {skcKpi.map((k, i) => {
        const Icon = ICONS[k.icon] ?? Gauge;
        return (
          <div
            key={k.label}
            className="card anim-rise px-3 pb-3 pt-3 transition-opacity"
            style={{ "--d": `${40 * i}ms`, opacity: dim(k.label) } as React.CSSProperties}
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
            <div
              className={`mt-[4px] truncate text-[8.5px] ${k.subDanger ? "text-[#ef4444]" : "text-ink-500"}`}
              title={k.sub}
            >
              {k.sub}
            </div>
            <div className="mt-2 flex items-center gap-1.5">
              {k.delta && k.trend ? (
                <>
                  <Delta value={k.delta} trend={k.trend} tone={k.deltaTone} size={10} />
                  <span className="truncate text-[8.5px] text-ink-400">{k.compare}</span>
                </>
              ) : (
                <span className="truncate text-[8.5px] font-semibold text-ink-400">
                  {k.compare}
                </span>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
