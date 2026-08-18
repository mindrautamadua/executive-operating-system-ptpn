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
import { governanceMaturity } from "@/lib/tik-data-detail";
import { CHART_AXIS, CHART_TOOLTIP_STYLE, PALETTE } from "@/lib/chart-palette";
import { SectionHead } from "@/components/hc/SectionHead";
import { ScopeNote } from "@/components/ui/ScopeNote";

const radarData = governanceMaturity.map((r) => ({
  dimensi: r.dimensi
    .replace("Master & Reference Data", "Master Data")
    .replace("Arsitektur & Model Data", "Arsitektur Data")
    .replace("Keamanan & Privasi Data", "Keamanan Data"),
  skor: r.skor,
  target: r.target,
}));

export function GovernanceMaturity() {
  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-2.5 pt-3"
      style={{ "--d": "60ms" } as React.CSSProperties}
    >
      <SectionHead title="Maturitas Tata Kelola Data" action="Lihat Detail" badge={<ScopeNote />} />
      <p className="mt-[3px] text-[9px] text-ink-500">
        5 Dimensi DAMA (Skala 1–5) · Rata-rata 2,9 vs Target 2027: 4,0
      </p>

      <div className="mt-1 min-h-0 w-full flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart data={radarData} margin={{ top: 6, right: 24, bottom: 2, left: 24 }}>
            <PolarGrid stroke={CHART_AXIS.grid} />
            <PolarAngleAxis dataKey="dimensi" tick={{ fontSize: 8.5, fill: CHART_AXIS.tick }} />
            <PolarRadiusAxis
              domain={[0, 5]}
              tickCount={6}
              tick={{ fontSize: 8, fill: CHART_AXIS.tick }}
              axisLine={false}
            />
            <Tooltip
              contentStyle={CHART_TOOLTIP_STYLE}
              formatter={(v: number, name: string) => [v.toLocaleString("id-ID"), name]}
            />
            <Radar
              name="Target 2027"
              dataKey="target"
              stroke={PALETTE.amber}
              strokeWidth={1.4}
              strokeDasharray="4 3"
              fill={PALETTE.amber}
              fillOpacity={0.05}
            />
            <Radar
              name="Skor Maturitas"
              dataKey="skor"
              stroke={PALETTE.blue}
              strokeWidth={1.8}
              fill={PALETTE.blue}
              fillOpacity={0.18}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>

      <p className="pb-1 text-[9px] leading-snug text-ink-500">
        Master &amp; Reference Data terlemah (2,6) — persis penyebab tertundanya rollout ERP modul
        kebun.
      </p>
    </div>
  );
}
