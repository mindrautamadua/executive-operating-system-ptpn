"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { balanceAssets, balanceFunding, balanceSummary } from "@/lib/knl-data";
import { fmtId } from "@/lib/keu-core";
import { CHART_AXIS, CHART_TOOLTIP_STYLE } from "@/lib/chart-palette";
import { SectionHead } from "../../hc/SectionHead";
import { ScopeNote } from "@/components/ui/ScopeNote";

/** Dua kolom stacked: sisi aset vs sisi liabilitas + ekuitas (balancing). */
const DATA = [
  Object.fromEntries([
    ["name", "Aset"],
    ...balanceAssets.map((b) => [b.label, b.value]),
  ]) as Record<string, string | number>,
  Object.fromEntries([
    ["name", "Liabilitas + Ekuitas"],
    ...balanceFunding.map((b) => [b.label, b.value]),
  ]) as Record<string, string | number>,
];

const BLOCKS = [...balanceAssets, ...balanceFunding];

export function BalanceSheetComposition() {
  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-3 pt-3"
      style={{ "--d": "60ms" } as React.CSSProperties}
    >
      <SectionHead title="Balance Sheet Composition" badge={<ScopeNote />} />
      <p className="mt-[3px] text-[9px] text-ink-500">
        Total Aset Rp {fmtId(balanceSummary.totalAsetRpT, 1)} T · Rp T
      </p>

      <div className="flex min-h-0 flex-1 items-stretch gap-2">
        <div className="min-h-0 w-[55%]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={DATA} margin={{ top: 10, right: 0, bottom: 0, left: -18 }} barCategoryGap="30%">
              <CartesianGrid stroke={CHART_AXIS.grid} vertical={false} />
              <XAxis
                dataKey="name"
                tickLine={false}
                axisLine={{ stroke: CHART_AXIS.axis }}
                tick={{ fontSize: 8.5, fill: CHART_AXIS.tick }}
                interval={0}
              />
              <YAxis
                domain={[0, 140]}
                ticks={[0, 35, 70, 105, 140]}
                tickLine={false}
                axisLine={false}
                tick={{ fontSize: 8.5, fill: CHART_AXIS.tick }}
                width={34}
              />
              <Tooltip
                cursor={{ fill: "rgba(148,163,184,0.08)" }}
                contentStyle={CHART_TOOLTIP_STYLE}
                formatter={(v: number, name: string) => [`Rp ${fmtId(v, 1)} T`, name]}
              />
              {BLOCKS.map((b) => (
                <Bar isAnimationActive={false} key={b.label} dataKey={b.label} stackId="bs" fill={b.color} maxBarSize={54} />
              ))}
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="flex min-w-0 flex-1 flex-col justify-center gap-[3px]">
          <div className="text-[9px] font-extrabold uppercase tracking-[0.05em] text-ink-500">
            Aset
          </div>
          {balanceAssets.map((b) => (
            <div key={b.label} className="flex items-center gap-1.5">
              <span className="h-[7px] w-[7px] shrink-0 rounded-[2px]" style={{ backgroundColor: b.color }} />
              <span className="min-w-0 flex-1 truncate text-[8.5px] font-medium text-ink-700">
                {b.label}
              </span>
              <span className="shrink-0 text-[9px] font-bold tabular-nums text-ink-900">
                {fmtId(b.value, 1)}
              </span>
            </div>
          ))}
          <div className="mt-1.5 text-[9px] font-extrabold uppercase tracking-[0.05em] text-ink-500">
            Pendanaan
          </div>
          {balanceFunding.map((b) => (
            <div key={b.label} className="flex items-center gap-1.5">
              <span className="h-[7px] w-[7px] shrink-0 rounded-[2px]" style={{ backgroundColor: b.color }} />
              <span className="min-w-0 flex-1 truncate text-[8.5px] font-medium text-ink-700">
                {b.label}
              </span>
              <span className="shrink-0 text-[9px] font-bold tabular-nums text-ink-900">
                {fmtId(b.value, 1)}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
