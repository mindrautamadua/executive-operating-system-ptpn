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
import { ermSpider } from "@/lib/risk-data-detail";
import { CHART_AXIS, CHART_TOOLTIP_STYLE, PALETTE } from "@/lib/chart-palette";
import { SectionHead } from "@/components/hc/SectionHead";
import { ScopeNote } from "@/components/ui/ScopeNote";

export function ErmMaturitySpider() {
  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-2.5 pt-3"
      style={{ "--d": "120ms" } as React.CSSProperties}
    >
      <SectionHead title="Maturitas ERM — 8 Dimensi" badge={<ScopeNote />} />
      <p className="mt-[3px] text-[9px] text-ink-500">
        Skor Asesmen vs Target 2027 (skala 1–5) · Komposit 3,42
      </p>

      <div className="mt-1 min-h-0 w-full flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart data={ermSpider} outerRadius="72%">
            <PolarGrid stroke={CHART_AXIS.grid} />
            <PolarAngleAxis dataKey="dimensi" tick={{ fontSize: 8, fill: CHART_AXIS.tick }} />
            <PolarRadiusAxis domain={[0, 5]} tick={false} axisLine={false} />
            <Tooltip
              formatter={(v: number, n: string) => [String(v).replace(".", ","), n]}
              contentStyle={CHART_TOOLTIP_STYLE}
            />
            <Radar isAnimationActive={false}
              name="Target"
              dataKey="target"
              stroke={PALETTE.slate}
              strokeWidth={1.4}
              strokeDasharray="3 3"
              fill={PALETTE.slate}
              fillOpacity={0.06}
            />
            <Radar isAnimationActive={false}
              name="Skor 2026"
              dataKey="skor"
              stroke={PALETTE.green}
              strokeWidth={1.8}
              fill={PALETTE.green}
              fillOpacity={0.16}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>

      <p className="mt-1 rounded-md bg-[#fdf3e0] px-2 py-[5px] text-[9px] leading-[1.4] text-[#a26a05]">
        Dimensi terlemah: Kuantifikasi Risiko 2,9 &amp; Budaya Risiko 3,0 — penahan utama menuju
        target 4,0.
      </p>
    </div>
  );
}
