"use client";

import {
  Area,
  AreaChart,
  CartesianGrid,
  LabelList,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { turnoverTrend } from "@/lib/wa-data";
import { CHART_AXIS, CHART_TOOLTIP_STYLE, PALETTE } from "@/lib/chart-palette";
import { SectionHead } from "../hc/SectionHead";
import { ScopeNote } from "../ui/ScopeNote";

const persen = (v: number) => `${v.toFixed(1).replace(".", ",")}%`;

export function TurnoverTrend() {
  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-2.5 pt-3"
      style={{ "--d": "120ms" } as React.CSSProperties}
    >
      <SectionHead
        title="Turnover Rate Trend"
        action="Lihat Detail"
        href="/workforce-analytics/turnover-trend"
        badge={<ScopeNote />}
      />
      <p className="mt-[3px] text-[9px] text-ink-500">Trend Turnover Rate 36 Bulan Terakhir</p>

      <div className="mt-1.5 min-h-0 w-full flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={turnoverTrend} margin={{ top: 18, right: 12, bottom: 0, left: -14 }}>
            <defs>
              <linearGradient id="wa-to-fill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={PALETTE.red} stopOpacity="0.12" />
                <stop offset="100%" stopColor={PALETTE.red} stopOpacity="0.02" />
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
              domain={[0, 12]}
              ticks={[0, 3, 6, 9, 12]}
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 8.5, fill: CHART_AXIS.tick }}
              tickFormatter={(v: number) => `${v}%`}
              width={34}
            />
            <Tooltip
              formatter={(v: number) => [persen(v), "Turnover Rate"]}
              contentStyle={CHART_TOOLTIP_STYLE}
            />
            <Area isAnimationActive={false}
              type="linear"
              dataKey="value"
              stroke={PALETTE.red}
              strokeWidth={1.8}
              fill="url(#wa-to-fill)"
              dot={false}
              activeDot={{ r: 4 }}
            >
              {/* Label hanya pada titik terakhir agar 36 titik tetap terbaca */}
              <LabelList
                dataKey="value"
                content={(props) => {
                  const { x, y, value, index } = props as {
                    x?: number;
                    y?: number;
                    value?: number;
                    index?: number;
                  };
                  if (index !== turnoverTrend.length - 1 || x == null || y == null) return null;
                  return (
                    <text
                      x={x}
                      y={y - 7}
                      textAnchor="end"
                      style={{ fontSize: 8.5, fill: "#334155", fontWeight: 700 }}
                    >
                      {persen(value ?? 0)}
                    </text>
                  );
                }}
              />
            </Area>
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
