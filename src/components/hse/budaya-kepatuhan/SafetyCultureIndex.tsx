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
import { safetyCultureIndex, safetyCultureMeta } from "@/lib/hse-data";
import { CHART_AXIS, CHART_TOOLTIP_STYLE, PALETTE } from "@/lib/chart-palette";
import { SectionHead } from "@/components/hc/SectionHead";
import { ScopeNote } from "@/components/ui/ScopeNote";

const skor = (v: number) => v.toLocaleString("id-ID", { minimumFractionDigits: 1 });

/** Radar 5 dimensi indeks budaya keselamatan vs target 4,0. */
export function SafetyCultureIndex() {
  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-2.5 pt-3"
      style={{ "--d": "120ms" } as React.CSSProperties}
    >
      <SectionHead title="Indeks Budaya Keselamatan" action="Lihat Detail" badge={<ScopeNote />} />
      <p className="mt-[3px] text-[9px] text-ink-500">
        Skor Komposit {skor(safetyCultureMeta.skorKomposit)}/5 vs Target{" "}
        {skor(safetyCultureMeta.target)} · {safetyCultureMeta.periode} ·{" "}
        {safetyCultureMeta.responden.toLocaleString("id-ID")} responden di{" "}
        {safetyCultureMeta.unitDisurvei} unit
      </p>

      <div className="mt-1 min-h-0 w-full flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart data={safetyCultureIndex} margin={{ top: 8, right: 24, bottom: 4, left: 24 }}>
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
              formatter={(v: number, name: string) => [skor(v), name]}
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
              name="Skor Survei"
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
        Pelaporan (3,1) adalah dimensi terlemah dan pembelajaran (3,3) menyusul — keduanya menjelaskan
        rasio near-miss 7,6:1 yang masih di bawah praktik terbaik.
      </p>
    </div>
  );
}
