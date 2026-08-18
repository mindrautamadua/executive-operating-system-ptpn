"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { incidentTrend } from "@/lib/tik-data";
import { CHART_AXIS, CHART_TOOLTIP_STYLE, PALETTE } from "@/lib/chart-palette";
import { SectionHead } from "@/components/hc/SectionHead";
import { ScopeNote } from "@/components/ui/ScopeNote";

/** Tren insiden siber 12 bulan, bar bertumpuk per tingkat severity. */
export function IncidentTrend() {
  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-2.5 pt-3"
      style={{ "--d": "60ms" } as React.CSSProperties}
    >
      <SectionHead title="Tren Insiden Siber per Severity" action="Lihat Detail" badge={<ScopeNote />} />
      <p className="mt-[3px] text-[9px] text-ink-500">
        Jumlah Insiden 12 Bulan · YTD 2026 34 insiden (2 kritis · 11 tinggi · 21 sedang)
      </p>

      <div className="mt-1.5 min-h-0 w-full flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={incidentTrend} margin={{ top: 4, right: 14, bottom: 0, left: -22 }}>
            <CartesianGrid stroke={CHART_AXIS.grid} vertical={false} />
            <XAxis
              dataKey="bulan"
              tickLine={false}
              axisLine={{ stroke: CHART_AXIS.axis }}
              tick={{ fontSize: 8.5, fill: CHART_AXIS.tick }}
              interval={0}
            />
            <YAxis
              domain={[0, 8]}
              ticks={[0, 2, 4, 6, 8]}
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 8.5, fill: CHART_AXIS.tick }}
              width={34}
            />
            <Tooltip
              cursor={{ fill: "rgba(148,163,184,0.08)" }}
              contentStyle={CHART_TOOLTIP_STYLE}
              formatter={(v: number, name: string) => [`${v} insiden`, name]}
            />
            <Legend
              verticalAlign="top"
              align="right"
              height={16}
              iconSize={8}
              wrapperStyle={{ fontSize: 8.5 }}
            />
            <Bar name="Sedang" dataKey="sedang" stackId="s" fill={PALETTE.amber} barSize={13} />
            <Bar name="Tinggi" dataKey="tinggi" stackId="s" fill={PALETTE.purple} barSize={13} />
            <Bar
              name="Kritis"
              dataKey="kritis"
              stackId="s"
              fill={PALETTE.red}
              barSize={13}
              radius={[3, 3, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <p className="pb-1 text-[9px] leading-snug text-ink-500">
        Volume bulanan 2026 (rata-rata 6,8) hampir dua kali paruh kedua 2025 (3,4) — kenaikan
        terkonsentrasi pada severity sedang dan tinggi.
      </p>
    </div>
  );
}
