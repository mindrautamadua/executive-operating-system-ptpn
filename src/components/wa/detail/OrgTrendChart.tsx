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
import { ORG_TREND_SERIES, orgTrend12 } from "@/lib/wa-detail-komposisi";

/** Tren headcount 12 bulan untuk empat subholding terbesar. */
export function OrgTrendChart() {
  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-3 pt-3"
      style={{ "--d": "40ms" } as React.CSSProperties}
    >
      <SectionHead title="Tren Headcount per Subholding" />
      <p className="mt-[3px] text-[9px] text-ink-500">
        12 bulan terakhir · lompatan Des 2025 = integrasi PTPN I
      </p>

      <div className="mt-1 min-h-0 w-full flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={orgTrend12} margin={{ top: 10, right: 10, bottom: 0, left: -8 }}>
            <CartesianGrid stroke={CHART_AXIS.grid} vertical={false} />
            <XAxis
              dataKey="name"
              tickLine={false}
              axisLine={{ stroke: CHART_AXIS.axis }}
              tick={{ fontSize: 8, fill: CHART_AXIS.tick }}
              interval={1}
            />
            <YAxis
              domain={[5000, 25000]}
              ticks={[5000, 10000, 15000, 20000, 25000]}
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 8, fill: CHART_AXIS.tick }}
              tickFormatter={(v: number) => `${v / 1000}K`}
              width={34}
            />
            <Tooltip
              contentStyle={CHART_TOOLTIP_STYLE}
              formatter={(v: number) => v.toLocaleString("id-ID")}
            />
            <Legend
              verticalAlign="bottom"
              height={18}
              iconSize={7}
              wrapperStyle={{ fontSize: 8 }}
            />
            {ORG_TREND_SERIES.map((s) => (
              <Line
                key={s.key}
                type="linear"
                dataKey={s.key}
                stroke={s.color}
                strokeWidth={1.6}
                dot={{ r: 2, fill: s.color, strokeWidth: 0 }}
                activeDot={{ r: 3.8 }}
                isAnimationActive={false}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
