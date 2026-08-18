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
import { ArrowRight } from "lucide-react";
import { dimensiKualitas, dqScore } from "@/lib/data-analytics";
import { CHART_AXIS, CHART_TOOLTIP_STYLE, PALETTE } from "@/lib/chart-palette";
import { CountUp } from "../ui/CountUp";

/**
 * 6 skor dimensi yang saling independen — radar, bukan pie share
 * (skor-skor ini bukan bagian dari satu keseluruhan 100%).
 * Headline memakai dqScore: indeks komposit tertimbang, satu-satunya
 * angka payung kualitas data di seluruh halaman.
 */
export function DataQualityOverview() {
  return (
    <div className="card anim-rise flex h-full flex-col px-4 pb-2.5 pt-3">
      <div className="flex items-start justify-between gap-2">
        <h3 className="card-title-navy">Data Trust Index</h3>
        <div className="text-right leading-tight">
          <CountUp
            value={dqScore}
            className="block text-[15px] font-extrabold leading-none text-ink-900"
          />
          <span className="text-[9px] text-ink-500">Indeks Komposit</span>
        </div>
      </div>

      <div className="mt-1 min-h-0 w-full flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart data={dimensiKualitas} outerRadius="78%">
            <PolarGrid stroke={CHART_AXIS.grid} />
            <PolarAngleAxis
              dataKey="name"
              tick={{ fontSize: 9, fill: CHART_AXIS.tick }}
            />
            <PolarRadiusAxis
              domain={[80, 100]}
              tick={{ fontSize: 9, fill: CHART_AXIS.tick }}
              tickCount={3}
              axisLine={false}
            />
            <Tooltip
              formatter={(v: number) => [`${v.toFixed(1).replace(".", ",")}%`, "Skor"]}
              contentStyle={CHART_TOOLTIP_STYLE}
            />
            <Radar
              name="Skor"
              dataKey="share"
              stroke={PALETTE.blue}
              strokeWidth={1.8}
              fill={PALETTE.blue}
              fillOpacity={0.22}
              dot={{ r: 2.5, fill: PALETTE.blue, strokeWidth: 0 }}
              animationDuration={900}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>

      <button className="link-more mt-1 flex items-center gap-1">
        Lihat detail dimensi trust <ArrowRight size={11} />
      </button>
    </div>
  );
}
