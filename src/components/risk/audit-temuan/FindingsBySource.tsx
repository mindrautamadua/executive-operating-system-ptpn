"use client";

import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { bySource } from "@/lib/risk-data-detail";
import { CHART_TOOLTIP_STYLE } from "@/lib/chart-palette";
import { SectionHead } from "@/components/hc/SectionHead";
import { ScopeNote } from "@/components/ui/ScopeNote";

const TOTAL = bySource.reduce((s, r) => s + r.total, 0);
const OPEN = bySource.reduce((s, r) => s + r.open, 0);

export function FindingsBySource() {
  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-3 pt-3"
      style={{ "--d": "60ms" } as React.CSSProperties}
    >
      <SectionHead title="Temuan per Sumber Audit" badge={<ScopeNote />} />
      <p className="mt-[3px] text-[9px] text-ink-500">
        {TOTAL} Temuan YTD · {OPEN} Masih Terbuka
      </p>

      <div className="flex min-h-0 flex-1 items-center gap-2">
        <div className="h-full w-[132px] shrink-0">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={bySource}
                dataKey="total"
                nameKey="source"
                innerRadius="58%"
                outerRadius="86%"
                paddingAngle={2}
                stroke="none"
              >
                {bySource.map((r) => (
                  <Cell key={r.source} fill={r.color} />
                ))}
              </Pie>
              <Tooltip
                formatter={(v: number, n: string) => [`${v} temuan`, n]}
                contentStyle={CHART_TOOLTIP_STYLE}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <ul className="min-w-0 flex-1">
          {bySource.map((r) => (
            <li key={r.source} className="border-b border-[#f2f5f8] py-[6px] last:border-0">
              <div className="flex items-center gap-1.5">
                <span
                  className="h-[8px] w-[8px] shrink-0 rounded-[2px]"
                  style={{ backgroundColor: r.color }}
                />
                <span className="min-w-0 flex-1 truncate text-[9.5px] font-semibold text-ink-700">
                  {r.source}
                </span>
                <span className="shrink-0 text-[10px] font-extrabold text-ink-900">{r.total}</span>
              </div>
              <div className="mt-[2px] pl-[14px] text-[9px] text-ink-500">
                Closed {r.closed} · Terbuka{" "}
                <span className="font-bold text-[#ef4444]">{r.open}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <p className="mt-1 rounded-md bg-[#f8fafc] px-2 py-[5px] text-[9px] leading-[1.4] text-ink-500">
        Opini audit LK 2025 WTP; 6 temuan KAP seluruhnya bersifat rekomendasi pengendalian internal.
      </p>
    </div>
  );
}
