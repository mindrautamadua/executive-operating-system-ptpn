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
import { hkmRiskRadar } from "@/lib/hkm-data";
import { CHART_AXIS, CHART_TOOLTIP_STYLE, PALETTE } from "@/lib/chart-palette";
import { SectionHead } from "@/components/hc/SectionHead";
import { ScopeNote } from "@/components/ui/ScopeNote";

export function HkmRiskRadar() {
  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-2.5 pt-3"
      style={{ "--d": "60ms" } as React.CSSProperties}
    >
      <SectionHead title="Radar Risiko Hukum" action="Lihat Detail" badge={<ScopeNote />} />
      <p className="mt-[3px] text-[9px] text-ink-500">
        Skor Kesehatan 0–100 vs Target Internal 2027 · 6 sumbu
      </p>

      <div className="mt-1 min-h-0 w-full flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart data={hkmRiskRadar} margin={{ top: 8, right: 24, bottom: 4, left: 24 }}>
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
            <Radar isAnimationActive={false}
              name="Target 2027"
              dataKey="target"
              stroke={PALETTE.amber}
              strokeWidth={1.4}
              strokeDasharray="4 3"
              fill={PALETTE.amber}
              fillOpacity={0.05}
            />
            <Radar isAnimationActive={false}
              name="Skor 2026"
              dataKey="score"
              stroke={PALETTE.green}
              strokeWidth={1.8}
              fill={PALETTE.green}
              fillOpacity={0.18}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>

      <p className="pb-1 text-[9px] leading-snug text-ink-500">
        Korporasi &amp; GCG (91) terkuat; Pertanahan &amp; HGU (55) dan Litigasi (62) menjadi dua
        sumbu dengan gap terbesar ke target.
      </p>
    </div>
  );
}
