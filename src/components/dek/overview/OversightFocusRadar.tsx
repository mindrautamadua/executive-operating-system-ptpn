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
import { oversightFocusRadar } from "@/lib/dek-data";
import { CHART_AXIS, CHART_TOOLTIP_STYLE, PALETTE } from "@/lib/chart-palette";
import { SectionHead } from "@/components/hc/SectionHead";
import { ScopeNote } from "@/components/ui/ScopeNote";

/** Radar 6 bidang pengawasan: bobot perhatian Dekom vs intensitas pembahasan. */
export function OversightFocusRadar() {
  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-2.5 pt-3"
      style={{ "--d": "60ms" } as React.CSSProperties}
    >
      <SectionHead title="Fokus Pengawasan per Bidang" action="Lihat Detail" badge={<ScopeNote />} />
      <p className="mt-[3px] text-[9px] text-ink-500">
        Skor Perhatian vs Intensitas Pembahasan 0–100 · selisih besar = kurang porsi agenda
      </p>

      <div className="mt-1 min-h-0 w-full flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart data={oversightFocusRadar} margin={{ top: 8, right: 24, bottom: 4, left: 24 }}>
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
              name="Perhatian Pengawasan"
              dataKey="perhatian"
              stroke={PALETTE.navy}
              strokeWidth={1.8}
              fill={PALETTE.navy}
              fillOpacity={0.16}
            />
            <Radar isAnimationActive={false}
              name="Intensitas Pembahasan"
              dataKey="intensitas"
              stroke={PALETTE.amber}
              strokeWidth={1.4}
              strokeDasharray="4 3"
              fill={PALETTE.amber}
              fillOpacity={0.06}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>

      <p className="pb-1 text-[9px] leading-snug text-ink-500">
        SDM &amp; Suksesi (68 vs 54) dan Keberlanjutan (62 vs 46) menyimpan selisih terbesar —
        keduanya kurang porsi agenda dibanding bobot perhatian pengawasannya.
      </p>
    </div>
  );
}
