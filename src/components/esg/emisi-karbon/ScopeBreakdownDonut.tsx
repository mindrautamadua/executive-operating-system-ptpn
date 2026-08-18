"use client";

import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { scopeBreakdown } from "@/lib/esg-data";
import { CHART_TOOLTIP_STYLE } from "@/lib/chart-palette";
import { SectionHead } from "@/components/hc/SectionHead";
import { ScopeNote } from "@/components/ui/ScopeNote";

const total = scopeBreakdown.reduce((s, d) => s + d.value, 0);
const angka = (v: number) => v.toLocaleString("id-ID", { minimumFractionDigits: 1 });

export function ScopeBreakdownDonut() {
  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-3 pt-3"
      style={{ "--d": "60ms" } as React.CSSProperties}
    >
      <SectionHead title="Emisi per Scope" action="Lihat Detail" badge={<ScopeNote />} />
      <p className="mt-[3px] text-[9px] text-ink-500">
        Setahunkan (jt tCO2e) · Total {angka(total)} jt tCO2e
      </p>

      <div className="flex min-h-0 flex-1 items-center gap-2">
        <div className="h-full w-[132px] shrink-0">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie isAnimationActive={false}
                data={scopeBreakdown}
                dataKey="value"
                nameKey="name"
                innerRadius="58%"
                outerRadius="86%"
                paddingAngle={2}
                stroke="none"
              >
                {scopeBreakdown.map((d) => (
                  <Cell key={d.name} fill={d.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={CHART_TOOLTIP_STYLE}
                formatter={(v: number, name: string) => [`${angka(v)} jt tCO2e`, name]}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="min-w-0 flex-1">
          {scopeBreakdown.map((d) => (
            <div key={d.name} className="flex items-center gap-1.5 py-[4px]">
              <span
                className="h-[8px] w-[8px] shrink-0 rounded-[2px]"
                style={{ backgroundColor: d.color }}
              />
              <span className="min-w-0 flex-1 truncate text-[9.5px] font-medium text-ink-700">
                {d.name}
              </span>
              <span className="shrink-0 text-[9.5px] font-bold text-ink-900">{angka(d.value)}</span>
              <span className="w-[38px] shrink-0 text-right text-[9px] text-ink-500">
                ({Math.round((d.value / total) * 100)}%)
              </span>
            </div>
          ))}
        </div>
      </div>

      <p className="text-[9px] leading-snug text-ink-500">
        Scope 1 mendominasi 58% total jejak; Scope 3 masih estimasi kategori 1, 4, dan 10.
      </p>
    </div>
  );
}
