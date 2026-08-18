"use client";

import {
  Area,
  CartesianGrid,
  ComposedChart,
  Line,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { SectionHead } from "@/components/hc/SectionHead";
import { CHART_AXIS, CHART_TOOLTIP_STYLE, PALETTE } from "@/lib/chart-palette";
import { headcountTrendDetail, trendEvents } from "@/lib/wa-headcount-trend";

const ribuan = (v: number) => v.toLocaleString("id-ID");

/** Garis aktual 36 bulan + proyeksi 7 bulan dengan pita keyakinan dan penanda peristiwa. */
export function TrendMainChart() {
  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-3 pt-3"
      style={{ "--d": "40ms" } as React.CSSProperties}
    >
      <SectionHead title="Headcount Aktual & Proyeksi" />
      <p className="mt-[3px] text-[9px] text-ink-500">
        Jun 2023 – Mei 2026 aktual · Jun – Des 2026 proyeksi (pita = rentang keyakinan 80%)
      </p>

      <div className="mt-1.5 min-h-0 w-full flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart
            data={headcountTrendDetail}
            margin={{ top: 14, right: 12, bottom: 0, left: -2 }}
          >
            <defs>
              <linearGradient id="wa-hcd-fill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={PALETTE.green} stopOpacity="0.2" />
                <stop offset="100%" stopColor={PALETTE.green} stopOpacity="0.02" />
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
              domain={[58000, 74000]}
              ticks={[58000, 62000, 66000, 70000, 74000]}
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 8.5, fill: CHART_AXIS.tick }}
              tickFormatter={(v: number) => `${v / 1000}K`}
              width={40}
            />
            <Tooltip
              contentStyle={CHART_TOOLTIP_STYLE}
              formatter={(v: number | [number, number], n: string) => {
                if (n === "band") return [null, null] as unknown as [string, string];
                return [ribuan(v as number), n === "value" ? "Aktual" : "Proyeksi"];
              }}
            />
            {trendEvents.map((e) => (
              <ReferenceLine
                key={e.month}
                x={e.month}
                stroke="#94a3b8"
                strokeDasharray="3 3"
                label={{
                  value: `${e.label} ${e.delta}`,
                  position: "insideTopLeft",
                  fontSize: 8,
                  fill: "#64748b",
                }}
              />
            ))}
            <Area
              dataKey="band"
              stroke="none"
              fill={PALETTE.blue}
              fillOpacity={0.12}
              isAnimationActive={false}
            />
            <Area
              type="linear"
              dataKey="value"
              stroke={PALETTE.green}
              strokeWidth={1.8}
              fill="url(#wa-hcd-fill)"
              dot={false}
              activeDot={{ r: 4 }}
              isAnimationActive={false}
            />
            <Line
              type="linear"
              dataKey="forecast"
              stroke={PALETTE.blue}
              strokeWidth={1.6}
              strokeDasharray="4 3"
              dot={false}
              isAnimationActive={false}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1">
        <span className="flex items-center gap-1 text-[8.5px] text-ink-500">
          <span className="h-[3px] w-[12px] rounded-full bg-ptpn-green" /> Aktual
        </span>
        <span className="flex items-center gap-1 text-[8.5px] text-ink-500">
          <span className="h-[3px] w-[12px] rounded-full bg-[#3b7ded]" /> Proyeksi
        </span>
        {trendEvents.map((e) => (
          <span key={e.month} className="text-[9px] text-ink-500">
            {e.month}: {e.note}
          </span>
        ))}
      </div>
    </div>
  );
}
