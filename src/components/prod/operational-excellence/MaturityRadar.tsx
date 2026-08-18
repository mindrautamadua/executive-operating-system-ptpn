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
import { OPEX_MATURITY_TARGET, opexMaturity } from "@/lib/biaya-opex-data";
import { CHART_AXIS, CHART_TOOLTIP_STYLE, PALETTE } from "@/lib/chart-palette";
import { ScopeNote } from "@/components/ui/ScopeNote";
import { SectionHead } from "@/components/hc/SectionHead";

const radarData = opexMaturity.map((r) => ({
  regional: r.regional.replace("Regional ", "R"),
  skor: r.skor,
  target: OPEX_MATURITY_TARGET,
}));

export function MaturityRadar() {
  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-2.5 pt-3"
      style={{ "--d": "60ms" } as React.CSSProperties}
    >
      {/* Skor maturitas program OPEX bersifat enterprise, belum dipecah per subholding. */}
      <SectionHead title="Maturity OPEX per Regional" action="Lihat Detail" badge={<ScopeNote />} />
      <p className="mt-[3px] text-[9px] text-ink-500">
        Skor Maturitas 1–5 vs Target 2026: {OPEX_MATURITY_TARGET.toLocaleString("id-ID")}
      </p>

      <div className="mt-1 min-h-0 w-full flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart data={radarData} margin={{ top: 6, right: 20, bottom: 2, left: 20 }}>
            <PolarGrid stroke={CHART_AXIS.grid} />
            <PolarAngleAxis
              dataKey="regional"
              tick={{ fontSize: 8.5, fill: CHART_AXIS.tick }}
            />
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
              name="Target 2026"
              dataKey="target"
              stroke={PALETTE.amber}
              strokeWidth={1.4}
              strokeDasharray="4 3"
              fill={PALETTE.amber}
              fillOpacity={0.05}
            />
            <Radar
              name="Skor Maturity"
              dataKey="skor"
              stroke={PALETTE.green}
              strokeWidth={1.8}
              fill={PALETTE.green}
              fillOpacity={0.18}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>

      <p className="pb-1 text-[9px] leading-snug text-ink-500">
        Regional 1–2 sudah di atas target (3,5–3,6); Regional 6–7 masih 2,5–2,6 — replikasi
        playbook regional matang.
      </p>
    </div>
  );
}
