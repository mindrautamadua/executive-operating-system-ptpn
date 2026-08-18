"use client";

import {
  Area,
  AreaChart,
  CartesianGrid,
  ReferenceDot,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { ChevronDown, ChevronRight } from "lucide-react";
import { headcountTrend } from "@/lib/sdm-data";
import { CHART_AXIS, CHART_TOOLTIP_STYLE, PALETTE } from "@/lib/chart-palette";
import { Delta } from "../ui/Delta";

const last = headcountTrend[headcountTrend.length - 1];

export function HeadcountTrend() {
  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-2.5 pt-3"
      style={{ "--d": "60ms" } as React.CSSProperties}
    >
      <div className="flex items-start justify-between">
        <div>
          <h3 className="card-title-navy">HEADCOUNT TREND</h3>
          <p className="mt-[3px] text-[9.5px] text-ink-500">YTD 2026</p>
        </div>
        <button className="select-chip whitespace-nowrap px-2.5 py-[5px] text-[10px]">
          YTD 2026 <ChevronDown size={12} />
        </button>
      </div>

      <div className="mt-2 flex items-center gap-2">
        <span className="text-[9.5px] text-ink-500">Pertumbuhan jumlah karyawan</span>
      </div>
      <Delta value="2,15%" trend="up" size={11} className="mt-[3px]" />

      <div className="mt-1 min-h-0 w-full flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={headcountTrend} margin={{ top: 14, right: 26, bottom: 0, left: -14 }}>
            <defs>
              <linearGradient id="hc-fill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={PALETTE.greenSoft} stopOpacity="0.22" />
                <stop offset="100%" stopColor={PALETTE.greenSoft} stopOpacity="0" />
              </linearGradient>
            </defs>
            <CartesianGrid stroke={CHART_AXIS.grid} vertical={false} />
            <XAxis
              dataKey="name"
              tickLine={false}
              axisLine={{ stroke: CHART_AXIS.axis }}
              tick={{ fontSize: 8, fill: CHART_AXIS.tick }}
              interval={0}
            />
            <YAxis
              domain={[60000, 72000]}
              ticks={[60000, 62000, 64000, 66000, 68000, 70000, 72000]}
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 8, fill: CHART_AXIS.tick }}
              tickFormatter={(v: number) => `${v / 1000}K`}
              width={34}
            />
            <Tooltip
              formatter={(v: number) => [v.toLocaleString("id-ID"), "Karyawan"]}
              contentStyle={CHART_TOOLTIP_STYLE}
            />
            <Area isAnimationActive={false}
              type="monotone"
              dataKey="value"
              stroke={PALETTE.greenSoft}
              strokeWidth={1.8}
              fill="url(#hc-fill)"
              dot={{ r: 2.6, fill: PALETTE.greenSoft, strokeWidth: 0 }}
              activeDot={{ r: 4 }}
            />
            {/* anotasi nilai akhir — menempel pada koordinat data, bukan posisi px */}
            <ReferenceDot
              x={last.name}
              y={last.value}
              r={4}
              fill={PALETTE.green}
              stroke="#fff"
              strokeWidth={1.5}
              label={{
                value: "70.142",
                position: "top",
                offset: 8,
                fontSize: 9,
                fontWeight: 700,
                fill: PALETTE.green,
              }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <button className="link-more mt-1 flex cursor-pointer items-center gap-0.5">
        Lihat analitik lengkap <ChevronRight size={12} />
      </button>
    </div>
  );
}
