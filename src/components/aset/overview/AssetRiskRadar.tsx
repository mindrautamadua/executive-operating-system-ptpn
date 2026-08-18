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
import { assetRiskRadar } from "@/lib/ast-data";
import { CHART_AXIS, CHART_TOOLTIP_STYLE, PALETTE } from "@/lib/chart-palette";
import { SectionHead } from "@/components/hc/SectionHead";
import { ScopeNote } from "@/components/ui/ScopeNote";

/** Radar 6 sumbu risiko aset: tingkat risiko saat ini vs ambang toleransi. */
export function AssetRiskRadar() {
  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-2.5 pt-3"
      style={{ "--d": "90ms" } as React.CSSProperties}
    >
      <SectionHead title="Asset Risk Radar" action="Lihat Detail" badge={<ScopeNote />} />
      <p className="mt-[3px] text-[9px] text-ink-500">
        Tingkat Risiko 0–100 vs Ambang Toleransi · 6 sumbu
      </p>

      <div className="mt-1 min-h-0 w-full flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart data={assetRiskRadar} margin={{ top: 8, right: 24, bottom: 4, left: 24 }}>
            <PolarGrid stroke={CHART_AXIS.grid} />
            <PolarAngleAxis dataKey="axis" tick={{ fontSize: 8, fill: CHART_AXIS.tick }} />
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
              name="Ambang Toleransi"
              dataKey="tolerance"
              stroke={PALETTE.slate}
              strokeWidth={1.4}
              strokeDasharray="4 3"
              fill={PALETTE.slate}
              fillOpacity={0.05}
            />
            <Radar isAnimationActive={false}
              name="Risiko Saat Ini"
              dataKey="level"
              stroke={PALETTE.red}
              strokeWidth={1.8}
              fill={PALETTE.red}
              fillOpacity={0.16}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>

      <p className="pb-1 text-[9px] leading-snug text-ink-500">
        Legal Lahan (76) dan Umur Tanaman (68) melampaui toleransi terjauh; hanya Lingkungan &amp;
        Perizinan yang masih di dalam ambang.
      </p>
    </div>
  );
}
