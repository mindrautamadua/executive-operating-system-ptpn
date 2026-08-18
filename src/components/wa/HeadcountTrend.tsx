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
import { headcountTrend } from "@/lib/wa-data";
import { CHART_AXIS, CHART_TOOLTIP_STYLE, PALETTE } from "@/lib/chart-palette";
import { SectionHead } from "../hc/SectionHead";
import { ScopeNote } from "../ui/ScopeNote";

const ribuan = (v: number) => v.toLocaleString("id-ID");

export function HeadcountTrend() {
  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-2.5 pt-3"
      style={{ "--d": "60ms" } as React.CSSProperties}
    >
      <SectionHead
        title="Headcount Trend"
        action="Lihat Detail"
        href="/workforce-analytics/headcount-trend"
        badge={<ScopeNote />}
      />
      <p className="mt-[3px] text-[9px] text-ink-500">Perkembangan Headcount 36 Bulan Terakhir</p>

      <div className="mt-1.5 min-h-0 w-full flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={headcountTrend} margin={{ top: 20, right: 14, bottom: 0, left: -6 }}>
            <defs>
              <linearGradient id="wa-hc-fill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={PALETTE.green} stopOpacity="0.18" />
                <stop offset="100%" stopColor={PALETTE.green} stopOpacity="0.02" />
              </linearGradient>
            </defs>
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
              domain={[58000, 72000]}
              ticks={[58000, 62000, 66000, 70000]}
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 8.5, fill: CHART_AXIS.tick }}
              tickFormatter={(v: number) => `${v / 1000}K`}
              width={38}
            />
            <Tooltip
              formatter={(v: number) => [ribuan(v), "Headcount"]}
              contentStyle={CHART_TOOLTIP_STYLE}
            />
            <Area isAnimationActive={false}
              type="linear"
              dataKey="value"
              stroke={PALETTE.green}
              strokeWidth={1.8}
              fill="url(#wa-hc-fill)"
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
                  if (index !== headcountTrend.length - 1 || x == null || y == null) return null;
                  return (
                    <text
                      x={x}
                      y={y - 8}
                      textAnchor="end"
                      style={{ fontSize: 8.5, fill: "#334155", fontWeight: 700 }}
                    >
                      {ribuan(value ?? 0)}
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
