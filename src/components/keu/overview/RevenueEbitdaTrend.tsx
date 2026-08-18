"use client";

import {
  Bar,
  CartesianGrid,
  ComposedChart,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { revenueEbitdaMonthly } from "@/lib/keu-data";
import { fmtRpT } from "@/lib/keu-core";
import { CHART_AXIS, CHART_TOOLTIP_STYLE, PALETTE } from "@/lib/chart-palette";
import { SectionHead } from "@/components/hc/SectionHead";
import { ScopeNote } from "@/components/ui/ScopeNote";

const LEGEND = [
  { label: "Pendapatan (bar)", color: PALETTE.blue },
  { label: "EBITDA (line)", color: PALETTE.green },
];

export function RevenueEbitdaTrend() {
  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-2.5 pt-3"
      style={{ "--d": "60ms" } as React.CSSProperties}
    >
      <SectionHead title="Revenue & EBITDA Trend" action="Lihat Detail" badge={<ScopeNote />} />
      <p className="mt-[3px] text-[9px] text-ink-500">
        Pendapatan &amp; EBITDA Bulanan 12 Bulan Terakhir (Rp T)
      </p>

      <div className="mt-1.5 min-h-0 w-full flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={revenueEbitdaMonthly} margin={{ top: 8, right: 6, bottom: 0, left: -18 }}>
            <CartesianGrid stroke={CHART_AXIS.grid} vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={{ stroke: CHART_AXIS.axis }}
              tick={{ fontSize: 8.5, fill: CHART_AXIS.tick }}
              interval={0}
            />
            <YAxis
              domain={[0, 6]}
              ticks={[0, 2, 4, 6]}
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 8.5, fill: CHART_AXIS.tick }}
              tickFormatter={(v: number) => (v === 0 ? "0" : `${v} T`)}
              width={40}
            />
            <Tooltip
              cursor={{ fill: "rgba(34,164,93,0.06)" }}
              formatter={(v: number, name: string) => [fmtRpT(v, 2), name]}
              contentStyle={CHART_TOOLTIP_STYLE}
            />
            <Bar isAnimationActive={false}
              name="Pendapatan"
              dataKey="revenue"
              fill={PALETTE.blue}
              barSize={13}
              radius={[2, 2, 0, 0]}
            />
            <Line isAnimationActive={false}
              name="EBITDA"
              type="monotone"
              dataKey="ebitda"
              stroke={PALETTE.green}
              strokeWidth={1.8}
              dot={{ r: 2.4, fill: PALETTE.green, stroke: "#fff", strokeWidth: 1 }}
              activeDot={{ r: 4 }}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      <div className="mb-1 flex items-center justify-center gap-4">
        {LEGEND.map((l) => (
          <span key={l.label} className="flex items-center gap-1.5 text-[8.5px] text-ink-500">
            <span className="h-[7px] w-[7px] rounded-full" style={{ background: l.color }} />
            {l.label}
          </span>
        ))}
      </div>
    </div>
  );
}
