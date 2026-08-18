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
import { CHART_AXIS, CHART_TOOLTIP_STYLE } from "@/lib/chart-palette";
import { DRIVER_FAMILIES, driverFamilyTrend, FAMILY_COLOR } from "@/lib/prr-drivers";

/** Pergeseran kontribusi antar family selama 6 bulan (poin persentase). */
export function DriverFamilyTrend() {
  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-3 pt-3"
      style={{ "--d": "120ms" } as React.CSSProperties}
    >
      <SectionHead title="Pergeseran Driver (6 Bulan)" />

      <div className="mt-1 min-h-0 w-full flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={driverFamilyTrend} margin={{ top: 10, right: 8, bottom: 0, left: -24 }}>
            <CartesianGrid stroke={CHART_AXIS.grid} vertical={false} />
            <XAxis
              dataKey="name"
              tickLine={false}
              axisLine={{ stroke: CHART_AXIS.axis }}
              tick={{ fontSize: 8.5, fill: CHART_AXIS.tick }}
            />
            <YAxis
              domain={[0, 30]}
              ticks={[0, 10, 20, 30]}
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 8, fill: CHART_AXIS.tick }}
            />
            <Tooltip contentStyle={CHART_TOOLTIP_STYLE} formatter={(v: number) => `${v}%`} />
            <Legend
              verticalAlign="bottom"
              height={26}
              iconSize={7}
              wrapperStyle={{ fontSize: 8.5 }}
            />
            {DRIVER_FAMILIES.map((f) => (
              <Line
                key={f}
                type="linear"
                dataKey={f}
                stroke={FAMILY_COLOR[f]}
                strokeWidth={1.5}
                dot={{ r: 2, fill: FAMILY_COLOR[f], strokeWidth: 0 }}
                activeDot={{ r: 3.6 }}
                isAnimationActive={false}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
