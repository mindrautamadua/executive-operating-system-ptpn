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
import { ArrowRight, ChevronDown } from "lucide-react";
import { targetPerempuanManajemen, trenPerempuanManajemen } from "@/lib/di-data";
import { CHART_AXIS, CHART_TOOLTIP_STYLE, PALETTE } from "@/lib/chart-palette";

const pct = (v: number) => `${v.toFixed(1).replace(".", ",")}%`;

export function TrenPerempuanManajemen() {
  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-2.5 pt-3"
      style={{ "--d": "60ms" } as React.CSSProperties}
    >
      <div className="flex items-start justify-between gap-2">
        <div>
          <h3 className="card-title-navy">Tren Representasi Perempuan di Manajemen</h3>
          <p className="mt-[3px] text-[9px] text-ink-500">
            % Perempuan pada Level Manajemen
          </p>
        </div>
        <button className="select-chip whitespace-nowrap px-2.5 py-[5px] text-[9.5px]">
          6 Bulan Terakhir <ChevronDown size={11} />
        </button>
      </div>

      <div className="mt-1 min-h-0 w-full flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={trenPerempuanManajemen}
            margin={{ top: 14, right: 22, bottom: 0, left: -10 }}
          >
            <defs>
              <linearGradient id="di-tren-fill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={PALETTE.blue} stopOpacity="0.20" />
                <stop offset="100%" stopColor={PALETTE.blue} stopOpacity="0.02" />
              </linearGradient>
            </defs>
            <CartesianGrid stroke={CHART_AXIS.grid} vertical={false} />
            <XAxis
              dataKey="name"
              tickLine={false}
              axisLine={{ stroke: CHART_AXIS.axis }}
              tick={{ fontSize: 9, fill: CHART_AXIS.tick }}
              interval={0}
            />
            <YAxis
              domain={[0, 35]}
              ticks={[0, 10, 20, 30]}
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 9, fill: CHART_AXIS.tick }}
              tickFormatter={(v: number) => `${v}%`}
              width={38}
            />
            <Tooltip
              formatter={(v: number) => [pct(v), "Perempuan di Manajemen"]}
              contentStyle={CHART_TOOLTIP_STYLE}
            />
            {/* konteks target BUMN 30% */}
            <ReferenceLine
              y={targetPerempuanManajemen}
              stroke={PALETTE.amber}
              strokeDasharray="5 4"
              strokeWidth={1.4}
              label={{
                value: "Target BUMN 30%",
                position: "insideTopRight",
                fontSize: 9,
                fontWeight: 700,
                fill: PALETTE.amber,
              }}
            />
            <Area isAnimationActive={false}
              type="monotone"
              dataKey="value"
              stroke={PALETTE.blue}
              strokeWidth={1.8}
              fill="url(#di-tren-fill)"
              dot={{ r: 3, fill: "#fff", stroke: PALETTE.blue, strokeWidth: 2 }}
              activeDot={{ r: 4.5 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <button className="link-more mt-1 flex items-center gap-1">
        Lihat tren lengkap <ArrowRight size={11} />
      </button>
    </div>
  );
}
