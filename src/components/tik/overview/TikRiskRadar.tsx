"use client";

import {
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { tikRiskRadar } from "@/lib/tik-data";
import { CHART_AXIS, CHART_TOOLTIP_STYLE, PALETTE } from "@/lib/chart-palette";
import { SectionHead } from "@/components/hc/SectionHead";
import { ScopeNote } from "@/components/ui/ScopeNote";

/** Radar 6 sumbu risiko TI: skor residual vs ambang toleransi internal. */
export function TikRiskRadar() {
  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-2.5 pt-3"
      style={{ "--d": "60ms" } as React.CSSProperties}
    >
      <SectionHead title="Risk Radar Teknologi Informasi" action="Lihat Detail" badge={<ScopeNote />} />
      <p className="mt-[3px] text-[9px] text-ink-500">
        Skor Risiko Residual 0–100 vs Toleransi Internal 2026 · makin tinggi makin berisiko
      </p>

      <div className="mt-1 min-h-0 w-full flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart data={tikRiskRadar} margin={{ top: 8, right: 24, bottom: 4, left: 24 }}>
            <PolarGrid stroke={CHART_AXIS.grid} />
            <PolarAngleAxis dataKey="axis" tick={{ fontSize: 8.5, fill: CHART_AXIS.tick }} />
            <PolarRadiusAxis
              domain={[0, 100]}
              tickCount={5}
              tick={{ fontSize: 8, fill: CHART_AXIS.tick }}
              axisLine={false}
            />
            <Tooltip
              contentStyle={CHART_TOOLTIP_STYLE}
              formatter={(v: number, name: string) => [v.toLocaleString("id-ID"), name]}
            />
            <Radar
              name="Toleransi"
              dataKey="toleransi"
              stroke={PALETTE.amber}
              strokeWidth={1.4}
              strokeDasharray="4 3"
              fill={PALETTE.amber}
              fillOpacity={0.05}
            />
            <Radar
              name="Skor Residual"
              dataKey="skor"
              stroke={PALETTE.red}
              strokeWidth={1.8}
              fill={PALETTE.red}
              fillOpacity={0.18}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>

      <p className="pb-1 text-[9px] leading-snug text-ink-500">
        Keamanan siber (78 vs toleransi 45) adalah deviasi terbesar; utang teknis (68) dan delivery
        program (66) menyusul di urutan berikutnya.
      </p>
    </div>
  );
}
