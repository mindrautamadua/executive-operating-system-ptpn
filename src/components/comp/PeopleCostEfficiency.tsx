"use client";

import { TrendingUp } from "lucide-react";
import { affordability, costEfficiency } from "@/lib/comp-data";
import { ScopeNote } from "@/components/ui/ScopeNote";

/**
 * People Cost Efficiency: kompensasi relatif terhadap revenue/EBITDA/opex
 * plus uji affordability — apakah kenaikan payroll sepadan dengan
 * pertumbuhan business value.
 */
export function PeopleCostEfficiency() {
  const maxGrowth = Math.max(...affordability.bars.map((b) => b.value));
  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-3 pt-3"
      style={{ "--d": "320ms" } as React.CSSProperties}
    >
      <div className="flex items-start justify-between gap-2">
        <h3 className="card-title-navy flex items-center gap-1.5">
          <TrendingUp size={13} className="text-[#1b3a6b]" />
          People Cost Efficiency
          <ScopeNote />
        </h3>
        <span className="shrink-0 rounded px-1.5 py-[2px] text-[9px] font-bold leading-none tone-green">
          Affordable
        </span>
      </div>

      <div className="mt-2.5 grid grid-cols-2 gap-2">
        {costEfficiency.map((c) => (
          <div key={c.label} className="rounded-xl border border-[#eef2f6] px-2.5 py-2">
            <div className="flex items-center justify-between gap-1">
              <span className="text-[12px] font-extrabold leading-none text-ink-900">{c.value}</span>
              <span className={`rounded px-1 py-[1px] text-[9px] font-bold leading-none tone-${c.tone}`}>
                KPI
              </span>
            </div>
            <div className="mt-[3px] truncate text-[7.5px] font-semibold leading-tight text-ink-600">
              {c.label}
            </div>
            <div className="text-[9px] leading-tight text-ink-500">{c.note}</div>
          </div>
        ))}
      </div>

      <ul className="mt-2.5 flex min-h-0 flex-1 flex-col justify-center gap-[5px]">
        {affordability.bars.map((b) => (
          <li key={b.label} className="flex items-center gap-2">
            <span className="w-[112px] shrink-0 truncate text-[9px] font-semibold text-ink-600">
              {b.label}
            </span>
            <div className="h-[7px] min-w-0 flex-1 overflow-hidden rounded-full bg-[var(--chart-grid)]">
              <div
                className="h-full rounded-full"
                style={{ width: `${(b.value / maxGrowth) * 100}%`, background: b.color }}
              />
            </div>
            <span className="w-[34px] shrink-0 text-right text-[8.5px] font-extrabold text-ink-900">
              +{b.value.toString().replace(".", ",")}%
            </span>
          </li>
        ))}
      </ul>

      <p className="border-t border-[#eef2f6] pt-1.5 text-[9px] leading-snug text-ink-500">
        {affordability.narasi}
      </p>
    </div>
  );
}
