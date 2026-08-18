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
import { executionRiskRadar } from "@/lib/stg-data";
import { CHART_AXIS, CHART_TOOLTIP_STYLE, PALETTE } from "@/lib/chart-palette";
import { SectionHead } from "@/components/hc/SectionHead";
import { ScopeNote } from "@/components/ui/ScopeNote";

const AMBANG = 60;

const radarData = executionRiskRadar.map((r) => ({ ...r, ambang: AMBANG }));

/** Radar 6 sumbu eksposur risiko eksekusi strategi (skor 0-100). */
export function ExecutionRiskRadar() {
  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-2.5 pt-3"
      style={{ "--d": "180ms" } as React.CSSProperties}
    >
      <SectionHead title="Execution Risk Radar" action="Lihat Detail" badge={<ScopeNote />} />
      <p className="mt-[3px] text-[9px] text-ink-500">
        Eksposur Risiko Eksekusi 0–100 vs Ambang Toleransi {AMBANG} · 6 Dimensi
      </p>

      <div className="mt-1 min-h-0 w-full flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart data={radarData} margin={{ top: 6, right: 24, bottom: 2, left: 24 }}>
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
            <Radar
              name="Ambang Toleransi"
              dataKey="ambang"
              stroke={PALETTE.slate}
              strokeWidth={1.4}
              strokeDasharray="4 3"
              fill={PALETTE.slate}
              fillOpacity={0.05}
            />
            <Radar
              name="Eksposur Risiko"
              dataKey="score"
              stroke={PALETTE.red}
              strokeWidth={1.8}
              fill={PALETTE.red}
              fillOpacity={0.18}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>

      <p className="pb-1 text-[9px] leading-snug text-ink-500">
        Perizinan &amp; lahan (71) dan regulasi (66) melewati ambang — dominan pada tema Swasembada
        Gula dan EBT.
      </p>
    </div>
  );
}
