"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { SectionHead } from "@/components/hc/SectionHead";
import { CHART_AXIS, CHART_TOOLTIP_STYLE } from "@/lib/chart-palette";
import { yoyGrowth, yoyNow } from "@/lib/wa-headcount-trend";

/** Pertumbuhan YoY 24 bulan — batang di atas 3% ditandai kuning (di luar rencana). */
export function YoyGrowthChart() {
  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-3 pt-3"
      style={{ "--d": "80ms" } as React.CSSProperties}
    >
      <SectionHead title="Pertumbuhan YoY" />
      <p className="mt-[3px] text-[9px] text-ink-500">
        Mei 2026 <span className="font-bold text-ink-900">{yoyNow.toString().replace(".", ",")}%</span>{" "}
        · rencana korporat 3,0%
      </p>

      <div className="mt-1 min-h-0 w-full flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={yoyGrowth} margin={{ top: 10, right: 8, bottom: 0, left: -22 }}>
            <CartesianGrid stroke={CHART_AXIS.grid} vertical={false} />
            <XAxis
              dataKey="name"
              tickLine={false}
              axisLine={{ stroke: CHART_AXIS.axis }}
              tick={{ fontSize: 8.5, fill: CHART_AXIS.tick }}
              interval={2}
              tickFormatter={(v: string) => v.replace(" 20", " ")}
            />
            <YAxis
              domain={[0, 12]}
              ticks={[0, 4, 8, 12]}
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 8, fill: CHART_AXIS.tick }}
              unit="%"
            />
            <Tooltip
              contentStyle={CHART_TOOLTIP_STYLE}
              formatter={(v: number) => [`${v.toString().replace(".", ",")}%`, "YoY"]}
            />
            <ReferenceLine y={3} stroke="#1a9c5b" strokeDasharray="3 3" />
            <Bar dataKey="yoy" radius={[2, 2, 0, 0]} isAnimationActive={false}>
              {yoyGrowth.map((d) => (
                <Cell key={d.name} fill={d.yoy > 3 ? "#f5a524" : "#1a9c5b"} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
