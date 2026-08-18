"use client";

import {
  Area,
  AreaChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { SectionHead } from "@/components/hc/SectionHead";
import { CHART_AXIS, CHART_TOOLTIP_STYLE } from "@/lib/chart-palette";
import { COMPOSITION_SERIES, compositionTrend } from "@/lib/wa-headcount-trend";

/** Komposisi status kerja 12 bulan — memisahkan pertumbuhan tetap vs tidak tetap. */
export function CompositionTrendChart() {
  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-3 pt-3"
      style={{ "--d": "120ms" } as React.CSSProperties}
    >
      <SectionHead title="Komposisi Status Kerja" />
      <p className="mt-[3px] text-[9px] text-ink-500">
        Porsi tidak tetap naik <span className="font-bold text-[#d98b06]">21,4% → 22,3%</span> dalam
        12 bulan
      </p>

      <div className="mt-1 min-h-0 w-full flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={compositionTrend} margin={{ top: 10, right: 8, bottom: 0, left: -12 }}>
            <CartesianGrid stroke={CHART_AXIS.grid} vertical={false} />
            <XAxis
              dataKey="name"
              tickLine={false}
              axisLine={{ stroke: CHART_AXIS.axis }}
              tick={{ fontSize: 8, fill: CHART_AXIS.tick }}
              interval={1}
            />
            <YAxis
              domain={[0, 75000]}
              ticks={[0, 25000, 50000, 75000]}
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 8, fill: CHART_AXIS.tick }}
              tickFormatter={(v: number) => `${v / 1000}K`}
              width={34}
            />
            <Tooltip
              contentStyle={CHART_TOOLTIP_STYLE}
              formatter={(v: number, n: string) => [
                v.toLocaleString("id-ID"),
                COMPOSITION_SERIES.find((s) => s.key === n)?.label ?? n,
              ]}
            />
            <Legend
              verticalAlign="bottom"
              height={18}
              iconSize={7}
              wrapperStyle={{ fontSize: 8.5 }}
              formatter={(v: string) => COMPOSITION_SERIES.find((s) => s.key === v)?.label ?? v}
            />
            {COMPOSITION_SERIES.map((s) => (
              <Area
                key={s.key}
                type="linear"
                dataKey={s.key}
                stackId="c"
                stroke={s.color}
                strokeWidth={1}
                fill={s.color}
                fillOpacity={0.75}
                isAnimationActive={false}
              />
            ))}
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
