"use client";

import {
  Bar,
  CartesianGrid,
  Cell,
  ComposedChart,
  Line,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { SectionHead } from "@/components/hc/SectionHead";
import { CHART_AXIS, CHART_TOOLTIP_STYLE } from "@/lib/chart-palette";
import { driverPareto, FAMILY_COLOR, type DriverFamily } from "@/lib/prr-drivers";

/** Pareto 10 driver teratas — batang kontribusi + garis kumulatif 80%. */
export function DriverPareto() {
  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-3 pt-3"
      style={{ "--d": "40ms" } as React.CSSProperties}
    >
      <SectionHead title="Pareto Driver (Top 10)" />
      <p className="mt-[3px] text-[9px] text-ink-500">
        10 driver teratas menjelaskan{" "}
        <span className="font-bold text-ink-900">
          {driverPareto[driverPareto.length - 1].cumulative}%
        </span>{" "}
        total eksposur
      </p>

      <div className="mt-1 min-h-0 w-full flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={driverPareto} margin={{ top: 8, right: 4, bottom: 0, left: -26 }}>
            <CartesianGrid stroke={CHART_AXIS.grid} vertical={false} />
            <XAxis
              dataKey="short"
              tickLine={false}
              axisLine={{ stroke: CHART_AXIS.axis }}
              tick={{ fontSize: 8.5, fill: CHART_AXIS.tick }}
              interval={0}
              angle={-32}
              textAnchor="end"
              height={44}
            />
            <YAxis
              yAxisId="left"
              domain={[0, 12]}
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 8, fill: CHART_AXIS.tick }}
            />
            <YAxis
              yAxisId="right"
              orientation="right"
              domain={[0, 100]}
              ticks={[0, 50, 80, 100]}
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 8, fill: CHART_AXIS.tick }}
              width={26}
            />
            <Tooltip
              contentStyle={CHART_TOOLTIP_STYLE}
              formatter={(v: number, n: string) => [
                `${v}%`,
                n === "pct" ? "Kontribusi" : "Kumulatif",
              ]}
            />
            <ReferenceLine
              yAxisId="right"
              y={80}
              stroke="#94a3b8"
              strokeDasharray="3 3"
              label={{ value: "80%", position: "right", fontSize: 8.5, fill: "#94a3b8" }}
            />
            <Bar yAxisId="left" dataKey="pct" radius={[3, 3, 0, 0]} isAnimationActive={false}>
              {driverPareto.map((d) => (
                <Cell key={d.name} fill={FAMILY_COLOR[d.family as DriverFamily]} />
              ))}
            </Bar>
            <Line
              yAxisId="right"
              type="linear"
              dataKey="cumulative"
              stroke="#1b3a6b"
              strokeWidth={1.5}
              dot={{ r: 2, fill: "#1b3a6b", strokeWidth: 0 }}
              isAnimationActive={false}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
