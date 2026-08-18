"use client";

import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { SectionHead } from "@/components/hc/SectionHead";
import { CHART_AXIS, CHART_TOOLTIP_STYLE, PALETTE } from "@/lib/chart-palette";
import { riskLevelTrend } from "@/lib/prr-registry";

const SERIES = [
  { key: "Critical", color: PALETTE.red },
  { key: "High", color: "#f97316" },
  { key: "Medium", color: PALETTE.amber },
  { key: "Low", color: PALETTE.green },
];

export function RiskLevelTrend() {
  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-3 pt-3"
      style={{ "--d": "120ms" } as React.CSSProperties}
    >
      <SectionHead title="Risk Trend (6 Months)" />

      <div className="mt-1 min-h-0 w-full flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={riskLevelTrend} margin={{ top: 10, right: 8, bottom: 0, left: -22 }}>
            <CartesianGrid stroke={CHART_AXIS.grid} vertical={false} />
            <XAxis
              dataKey="name"
              tickLine={false}
              axisLine={{ stroke: CHART_AXIS.axis }}
              tick={{ fontSize: 8.5, fill: CHART_AXIS.tick }}
            />
            <YAxis
              domain={[0, 20]}
              ticks={[0, 5, 10, 15, 20]}
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 8, fill: CHART_AXIS.tick }}
            />
            <Tooltip contentStyle={CHART_TOOLTIP_STYLE} />
            <Legend
              verticalAlign="bottom"
              height={18}
              iconSize={7}
              wrapperStyle={{ fontSize: 8.5 }}
            />
            {SERIES.map((s) => (
              <Line
                key={s.key}
                type="linear"
                dataKey={s.key}
                stroke={s.color}
                strokeWidth={1.6}
                dot={{ r: 2.2, fill: s.color, strokeWidth: 0 }}
                activeDot={{ r: 4 }}
                isAnimationActive={false}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
