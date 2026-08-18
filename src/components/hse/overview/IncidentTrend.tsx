"use client";

import {
  Bar,
  CartesianGrid,
  ComposedChart,
  Legend,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { incidentTrend } from "@/lib/hse-data";
import { CHART_AXIS, CHART_TOOLTIP_STYLE, PALETTE } from "@/lib/chart-palette";
import { SectionHead } from "@/components/hc/SectionHead";
import { ScopeNote } from "@/components/ui/ScopeNote";

const num = (v: number) => v.toLocaleString("id-ID");
const ltifrLabel = (v: number) => v.toLocaleString("id-ID", { minimumFractionDigits: 2 });

/** Kecelakaan per tingkat keparahan (bar bertumpuk) + garis LTIFR rolling 12 bulan. */
export function IncidentTrend() {
  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-2.5 pt-3"
      style={{ "--d": "90ms" } as React.CSSProperties}
    >
      <SectionHead title="Tren Insiden & LTIFR" action="Lihat Detail" badge={<ScopeNote />} />
      <p className="mt-[3px] text-[9px] text-ink-500">
        Kecelakaan per Tingkat Keparahan &amp; LTIFR Rolling 12 Bulan · Jun 2025 – Mei 2026
      </p>

      <div className="mt-1.5 min-h-0 w-full flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={incidentTrend} margin={{ top: 8, right: 4, bottom: 0, left: -14 }}>
            <CartesianGrid stroke={CHART_AXIS.grid} vertical={false} />
            <XAxis
              dataKey="bulan"
              tickLine={false}
              axisLine={{ stroke: CHART_AXIS.axis }}
              tick={{ fontSize: 8.5, fill: CHART_AXIS.tick }}
              interval={0}
            />
            <YAxis
              yAxisId="left"
              domain={[0, 24]}
              ticks={[0, 6, 12, 18, 24]}
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 8, fill: CHART_AXIS.tick }}
              width={34}
            />
            <YAxis
              yAxisId="right"
              orientation="right"
              domain={[1.3, 1.7]}
              ticks={[1.3, 1.4, 1.5, 1.6, 1.7]}
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 8, fill: CHART_AXIS.tick }}
              tickFormatter={ltifrLabel}
              width={30}
            />
            <Tooltip
              cursor={{ fill: "rgba(148,163,184,0.08)" }}
              contentStyle={CHART_TOOLTIP_STYLE}
              formatter={(v: number, name: string) =>
                name === "LTIFR" ? [ltifrLabel(v), name] : [`${num(v)} kasus`, name]
              }
            />
            <Legend
              verticalAlign="top"
              align="right"
              height={16}
              iconType="circle"
              iconSize={6}
              wrapperStyle={{ fontSize: 8, color: CHART_AXIS.tick }}
            />
            <Bar isAnimationActive={false}
              yAxisId="left"
              name="Ringan"
              dataKey="ringan"
              stackId="s"
              fill={PALETTE.greenSoft}
              barSize={14}
            />
            <Bar isAnimationActive={false}
              yAxisId="left"
              name="Sedang"
              dataKey="sedang"
              stackId="s"
              fill={PALETTE.amber}
              barSize={14}
            />
            <Bar isAnimationActive={false}
              yAxisId="left"
              name="Berat & Fatal"
              dataKey="berat"
              stackId="s"
              fill={PALETTE.red}
              barSize={14}
              radius={[3, 3, 0, 0]}
            />
            <Line isAnimationActive={false}
              yAxisId="right"
              name="LTIFR"
              type="monotone"
              dataKey="ltifr"
              stroke={PALETTE.navy}
              strokeWidth={1.9}
              dot={{ r: 2.2 }}
              activeDot={{ r: 4 }}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      <p className="pb-1 text-[9px] leading-snug text-ink-500">
        LTIFR ditampilkan sebagai rolling 12 bulan sehingga tidak sensitif terhadap fluktuasi bulanan;
        tren menurun sejak Agu 2025 (1,61 → 1,42) namun jumlah kasus berat/fatal bertahan 2 per bulan.
      </p>
    </div>
  );
}
