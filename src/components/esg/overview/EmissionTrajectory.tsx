"use client";

import {
  Area,
  CartesianGrid,
  ComposedChart,
  Legend,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { emissionTrajectory } from "@/lib/esg-data";
import { CHART_AXIS, CHART_TOOLTIP_STYLE, PALETTE } from "@/lib/chart-palette";
import { SectionHead } from "@/components/hc/SectionHead";
import { ScopeNote } from "@/components/ui/ScopeNote";

const angka = (v: number) => v.toLocaleString("id-ID", { minimumFractionDigits: 2 });

export function EmissionTrajectory() {
  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-2.5 pt-3"
      style={{ "--d": "90ms" } as React.CSSProperties}
    >
      <SectionHead title="Jalur Dekarbonisasi menuju -30%" action="Lihat Detail" badge={<ScopeNote />} />
      <p className="mt-[3px] text-[9px] text-ink-500">
        Intensitas Emisi tCO2e/ton CPO · Aktual vs Jalur Target 2019–2030
      </p>

      <div className="mt-1.5 min-h-0 w-full flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart
            data={emissionTrajectory}
            margin={{ top: 12, right: 14, bottom: 0, left: -12 }}
          >
            <defs>
              <linearGradient id="esg-traj-fill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={PALETTE.teal} stopOpacity="0.18" />
                <stop offset="100%" stopColor={PALETTE.teal} stopOpacity="0.02" />
              </linearGradient>
            </defs>
            <CartesianGrid stroke={CHART_AXIS.grid} vertical={false} />
            <XAxis
              dataKey="year"
              tickLine={false}
              axisLine={{ stroke: CHART_AXIS.axis }}
              tick={{ fontSize: 8, fill: CHART_AXIS.tick }}
            />
            <YAxis
              domain={[1.4, 2.2]}
              ticks={[1.4, 1.6, 1.8, 2.0, 2.2]}
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 8.5, fill: CHART_AXIS.tick }}
              tickFormatter={(v: number) => angka(v)}
              width={44}
            />
            <Tooltip
              contentStyle={CHART_TOOLTIP_STYLE}
              formatter={(v: number, name: string) => [angka(v), name]}
            />
            <Legend
              verticalAlign="top"
              align="right"
              height={16}
              iconSize={8}
              wrapperStyle={{ fontSize: 8.5 }}
            />
            <Area isAnimationActive={false}
              name="Aktual"
              type="monotone"
              dataKey="aktual"
              stroke={PALETTE.teal}
              strokeWidth={1.9}
              fill="url(#esg-traj-fill)"
              dot={{ r: 2 }}
              activeDot={{ r: 4 }}
              connectNulls={false}
            />
            <Line isAnimationActive={false}
              name="Jalur Target"
              type="monotone"
              dataKey="target"
              stroke={PALETTE.amber}
              strokeWidth={1.6}
              strokeDasharray="4 3"
              dot={false}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      <p className="pb-1 text-[9px] leading-snug text-ink-500">
        Aktual 1,82 vs jalur 1,71 pada 2026 — gap 0,11 tCO2e/ton yang setara dampak penuh biogas
        batch-3.
      </p>
    </div>
  );
}
