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
import {
  targetPerempuanManajemen,
  trajectoryPerempuanManajemen,
  trajectoryRingkas,
} from "@/lib/di-data";
import { CHART_AXIS, CHART_TOOLTIP_STYLE, PALETTE } from "@/lib/chart-palette";

const pct = (v: number) => `${v.toFixed(1).replace(".", ",")}%`;

export function TargetTrajectory() {
  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-2.5 pt-3"
      style={{ "--d": "60ms" } as React.CSSProperties}
    >
      <div className="flex items-start justify-between gap-2">
        <div>
          <h3 className="card-title-navy">Trajectory Target: Perempuan di Manajemen</h3>
          <p className="mt-[3px] text-[9px] text-ink-500">Aktual vs proyeksi menuju 30% (2028)</p>
        </div>
        <span className="tone-amber shrink-0 whitespace-nowrap rounded px-1.5 py-[2px] text-[9px] font-bold">
          {trajectoryRingkas.status}
        </span>
      </div>

      <div className="mt-1 min-h-0 w-full flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={trajectoryPerempuanManajemen}
            margin={{ top: 14, right: 12, bottom: 0, left: -14 }}
          >
            <defs>
              <linearGradient id="di-traj-fill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={PALETTE.purple} stopOpacity="0.20" />
                <stop offset="100%" stopColor={PALETTE.purple} stopOpacity="0.02" />
              </linearGradient>
            </defs>
            <CartesianGrid stroke={CHART_AXIS.grid} vertical={false} />
            <XAxis
              dataKey="tahun"
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
              formatter={(v: number, name: string) => [
                pct(v),
                name === "aktual" ? "Aktual" : "Proyeksi",
              ]}
              contentStyle={CHART_TOOLTIP_STYLE}
            />
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
            <Area
              type="monotone"
              dataKey="aktual"
              stroke={PALETTE.purple}
              strokeWidth={1.8}
              fill="url(#di-traj-fill)"
              dot={{ r: 3, fill: "#fff", stroke: PALETTE.purple, strokeWidth: 2 }}
              activeDot={{ r: 4.5 }}
            />
            {/* segmen proyeksi: putus-putus, tanpa fill */}
            <Area
              type="monotone"
              dataKey="proyeksi"
              stroke={PALETTE.purple}
              strokeWidth={1.8}
              strokeDasharray="5 4"
              fill="none"
              dot={{ r: 3, fill: "#fff", stroke: PALETTE.slate, strokeWidth: 2 }}
              activeDot={{ r: 4.5 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-1 flex items-center gap-3 rounded-lg bg-[#f6f9fc] px-2.5 py-[6px]">
        <div className="shrink-0 leading-tight">
          <div className="text-[9px] text-ink-500">Proyeksi 2028</div>
          <div className="text-[12px] font-extrabold tabular-nums text-ink-900">
            {trajectoryRingkas.proyeksi2028}
          </div>
        </div>
        <div className="shrink-0 leading-tight">
          <div className="text-[9px] text-ink-500">Gap vs Target</div>
          <div className="text-[12px] font-extrabold tabular-nums text-[#ef4444]">
            {trajectoryRingkas.gap}
          </div>
        </div>
        <div className="shrink-0 leading-tight">
          <div className="text-[9px] text-ink-500">Prob. Tercapai</div>
          <div className="text-[12px] font-extrabold tabular-nums text-ink-900">
            {trajectoryRingkas.probabilitas}
          </div>
        </div>
        <p className="min-w-0 flex-1 text-[9px] leading-[1.35] text-ink-500">
          {trajectoryRingkas.catatan}
        </p>
      </div>
    </div>
  );
}
