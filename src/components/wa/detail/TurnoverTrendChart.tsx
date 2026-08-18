"use client";

import {
  Area,
  AreaChart,
  CartesianGrid,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { SectionHead } from "@/components/hc/SectionHead";
import { CHART_AXIS, CHART_TOOLTIP_STYLE, PALETTE } from "@/lib/chart-palette";
import { turnoverTrend } from "@/lib/wa-data";

/** Tren turnover 36 bulan terhadap ambang toleransi grup 7,5%. */
export function TurnoverTrendChart() {
  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-3 pt-3"
      style={{ "--d": "40ms" } as React.CSSProperties}
    >
      <SectionHead title="Tren Turnover 36 Bulan" />
      <p className="mt-[3px] text-[9px] text-ink-500">
        Turun <span className="font-bold text-ptpn-green">2,8 pp</span> sejak Jun 2023 · garis =
        ambang toleransi 7,5%
      </p>

      <div className="mt-1 min-h-0 w-full flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={turnoverTrend} margin={{ top: 12, right: 10, bottom: 0, left: -22 }}>
            <defs>
              <linearGradient id="wa-to-fill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={PALETTE.blue} stopOpacity="0.2" />
                <stop offset="100%" stopColor={PALETTE.blue} stopOpacity="0.02" />
              </linearGradient>
            </defs>
            <CartesianGrid stroke={CHART_AXIS.grid} vertical={false} />
            <XAxis
              dataKey="name"
              tickLine={false}
              axisLine={{ stroke: CHART_AXIS.axis }}
              tick={{ fontSize: 8, fill: CHART_AXIS.tick }}
              interval={2}
              tickFormatter={(v: string) => v.replace(" 20", " ")}
            />
            <YAxis
              domain={[5, 11]}
              ticks={[5, 7, 9, 11]}
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 8, fill: CHART_AXIS.tick }}
              unit="%"
            />
            <Tooltip
              contentStyle={CHART_TOOLTIP_STYLE}
              formatter={(v: number) => [`${v.toString().replace(".", ",")}%`, "Turnover"]}
            />
            <ReferenceLine y={7.5} stroke="#ef4444" strokeDasharray="3 3" />
            <Area
              type="linear"
              dataKey="value"
              stroke={PALETTE.blue}
              strokeWidth={1.8}
              fill="url(#wa-to-fill)"
              dot={false}
              activeDot={{ r: 4 }}
              isAnimationActive={false}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
