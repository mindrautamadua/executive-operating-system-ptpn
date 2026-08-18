"use client";

import { ChevronDown, ChevronRight } from "lucide-react";
import {
  CartesianGrid,
  LabelList,
  Line,
  LineChart,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { timeToFillTrend, ttfBenchmark } from "@/lib/rekrutmen-data";
import { CHART_AXIS, CHART_TOOLTIP_STYLE, PALETTE, SEMANTIC } from "@/lib/chart-palette";

const fmt = (n: number) => n.toFixed(1).replace(".", ",");

export function TimeToFillTrend() {
  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-2.5 pt-3"
      style={{ "--d": "120ms" } as React.CSSProperties}
    >
      <div className="flex items-start justify-between gap-2">
        <h3 className="card-title-navy">Time to Fill Trend</h3>
        <button className="select-chip whitespace-nowrap px-2.5 py-[5px] text-[9.5px] transition-colors hover:bg-[#f7f9fb]">
          6 Bulan Terakhir <ChevronDown size={11} />
        </button>
      </div>

      <div className="mt-1 min-h-0 w-full flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={timeToFillTrend} margin={{ top: 20, right: 14, bottom: 0, left: -16 }}>
            <CartesianGrid stroke={CHART_AXIS.grid} vertical={false} />
            <XAxis
              dataKey="name"
              tickLine={false}
              axisLine={{ stroke: CHART_AXIS.axis }}
              tick={{ fontSize: 9, fill: CHART_AXIS.tick }}
              interval={0}
            />
            {/* domain sempit [25, 35] agar penurunan 32,8 → 28,6 terlihat;
               sumbu terpotong hanya aman untuk line, bukan area fill */}
            <YAxis
              domain={[25, 35]}
              ticks={[25, 27, 29, 31, 33, 35]}
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 9, fill: CHART_AXIS.tick }}
              width={32}
            />
            <Tooltip
              formatter={(v: number) => [`${fmt(v)} hari`, "Time to Fill"]}
              contentStyle={CHART_TOOLTIP_STYLE}
            />
            <ReferenceLine
              y={ttfBenchmark}
              stroke={SEMANTIC.warn}
              strokeDasharray="5 4"
              label={{
                value: `Benchmark ${ttfBenchmark} hari`,
                position: "insideTopRight",
                fontSize: 9,
                fill: SEMANTIC.warn,
                fontWeight: 600,
              }}
            />
            <Line isAnimationActive={false}
              type="linear"
              dataKey="value"
              stroke={PALETTE.green}
              strokeWidth={1.8}
              dot={{ r: 3, fill: PALETTE.green, strokeWidth: 0 }}
              activeDot={{ r: 4.5 }}
              animationDuration={900}
            >
              <LabelList
                dataKey="value"
                position="top"
                offset={8}
                formatter={(v: number) => fmt(v)}
                style={{ fontSize: 9, fill: "var(--text-3)", fontWeight: 600 }}
              />
            </Line>
          </LineChart>
        </ResponsiveContainer>
      </div>

      <button className="link-more mt-1 flex items-center gap-1 self-start">
        Lihat analitik lengkap <ChevronRight size={11} />
      </button>
    </div>
  );
}
