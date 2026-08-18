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
import { ArrowRight, ChevronDown } from "lucide-react";
import { trenKehadiran } from "@/lib/absensi-data";
import { CHART_AXIS, CHART_TOOLTIP_STYLE, PALETTE } from "@/lib/chart-palette";

const idn = (v: number) => v.toFixed(1).replace(".", ",");

export function TrenKehadiran() {
  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-2.5 pt-3"
      style={{ "--d": "60ms" } as React.CSSProperties}
    >
      <div className="flex items-start justify-between gap-2">
        <h3 className="card-title-navy">Tren Tingkat Kehadiran (%)</h3>
        <button className="select-chip whitespace-nowrap px-2.5 py-[5px] text-[9.5px]">
          6 Bulan Terakhir <ChevronDown size={11} />
        </button>
      </div>

      <div className="mt-1.5 min-h-0 w-full flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={trenKehadiran}
            margin={{ top: 22, right: 22, bottom: 0, left: -12 }}
          >
            <defs>
              <linearGradient id="abs-tren-fill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={PALETTE.blue} stopOpacity="0.2" />
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
            {/* Domain rapat & tick seragam agar variasi 92-96% terbaca */}
            <YAxis
              domain={[85, 100]}
              ticks={[85, 90, 95, 100]}
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 9, fill: CHART_AXIS.tick }}
              width={38}
            />
            <Tooltip
              formatter={(v: number) => [`${idn(v)}%`, "Tingkat Kehadiran"]}
              contentStyle={CHART_TOOLTIP_STYLE}
            />
            <Area isAnimationActive={false}
              type="linear"
              dataKey="value"
              stroke={PALETTE.blue}
              strokeWidth={1.8}
              fill="url(#abs-tren-fill)"
              dot={{ r: 3, fill: "#fff", stroke: PALETTE.blue, strokeWidth: 2 }}
              activeDot={{ r: 4.5 }}
            >
              <LabelList
                dataKey="value"
                position="top"
                offset={9}
                formatter={idn}
                style={{ fontSize: 9, fill: "#334155", fontWeight: 700 }}
              />
            </Area>
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <button className="link-more mt-1 flex items-center gap-1">
        Lihat tren lengkap <ArrowRight size={11} />
      </button>
    </div>
  );
}
