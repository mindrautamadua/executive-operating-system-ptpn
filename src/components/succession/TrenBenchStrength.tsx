"use client";

import Link from "next/link";
import {
  Area,
  AreaChart,
  CartesianGrid,
  LabelList,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { ChevronDown, ChevronRight } from "lucide-react";
import { trenBenchStrength } from "@/lib/succession-data";
import { CHART_AXIS, CHART_TOOLTIP_STYLE, PALETTE } from "@/lib/chart-palette";

const satu = (v: number) => v.toFixed(1).replace(".", ",");

export function TrenBenchStrength() {
  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-2.5 pt-3"
      style={{ "--d": "660ms" } as React.CSSProperties}
    >
      <div className="flex items-start justify-between gap-2">
        <h3 className="card-title-navy">Tren Bench Strength (Rata-rata)</h3>
        <button className="select-chip whitespace-nowrap px-2.5 py-[5px] text-[9.5px]">
          6 Bulan Terakhir <ChevronDown size={11} />
        </button>
      </div>

      <div className="mt-1.5 min-h-0 w-full flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={trenBenchStrength}
            margin={{ top: 20, right: 22, bottom: 0, left: -12 }}
          >
            <defs>
              <linearGradient id="sp-bench-fill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={PALETTE.blue} stopOpacity="0.20" />
                <stop offset="100%" stopColor={PALETTE.blue} stopOpacity="0.02" />
              </linearGradient>
            </defs>
            <CartesianGrid stroke={CHART_AXIS.grid} vertical={false} />
            <XAxis
              dataKey="name"
              tickLine={false}
              axisLine={{ stroke: CHART_AXIS.axis }}
              tick={{ fontSize: 8.5, fill: CHART_AXIS.tick }}
              interval={0}
            />
            {/* domain dirapatkan ke rentang data (1,2-1,6) agar tren terbaca */}
            <YAxis
              domain={[0.8, 1.8]}
              ticks={[0.8, 1, 1.2, 1.4, 1.6, 1.8]}
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 8.5, fill: CHART_AXIS.tick }}
              tickFormatter={satu}
              width={36}
            />
            <Tooltip
              formatter={(v: number) => [satu(v), "Bench Strength"]}
              contentStyle={CHART_TOOLTIP_STYLE}
            />
            {/* ambang sehat 1,0 */}
            <ReferenceLine
              y={1}
              stroke={PALETTE.amber}
              strokeDasharray="4 3"
              label={{
                value: "Target 1,0",
                position: "insideBottomRight",
                fontSize: 8.5,
                fill: PALETTE.amber,
              }}
            />
            <Area isAnimationActive={false}
              type="monotone"
              dataKey="value"
              stroke={PALETTE.blue}
              strokeWidth={1.8}
              fill="url(#sp-bench-fill)"
              dot={{ r: 3, fill: "#fff", stroke: PALETTE.blue, strokeWidth: 2 }}
              activeDot={{ r: 4.5 }}
            >
              <LabelList
                dataKey="value"
                position="top"
                offset={9}
                formatter={satu}
                style={{ fontSize: 9, fill: "#334155", fontWeight: 700 }}
              />
            </Area>
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <Link href="/succession-planning/bench-strength" className="link-more mt-1 flex cursor-pointer items-center gap-0.5">
        Lihat tren lengkap <ChevronRight size={12} />
      </Link>
    </div>
  );
}
