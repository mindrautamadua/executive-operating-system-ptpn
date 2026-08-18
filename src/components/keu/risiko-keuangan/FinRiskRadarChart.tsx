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
import { krkRadar } from "@/lib/krk-data";
import { CHART_TOOLTIP_STYLE, PALETTE } from "@/lib/chart-palette";
import { SectionHead } from "@/components/hc/SectionHead";
import { ScopeNote } from "@/components/ui/ScopeNote";

interface TickProps {
  x?: number;
  y?: number;
  textAnchor?: "start" | "middle" | "end" | "inherit";
  payload?: { value: string };
}

function AxisTick({ x = 0, y = 0, textAnchor = "middle", payload }: TickProps) {
  const words = (payload?.value ?? "").split(" ");
  const mid = Math.ceil(words.length / 2);
  const lines =
    words.length > 2
      ? [words.slice(0, mid).join(" "), words.slice(mid).join(" ")]
      : [words.join(" ")];
  return (
    <text x={x} y={y} textAnchor={textAnchor} dominantBaseline="middle">
      {lines.map((line, i) => (
        <tspan
          key={line}
          x={x}
          dy={i === 0 ? (lines.length > 1 ? -4 : 0) : 9}
          style={{ fontSize: 8.5, fill: "var(--chart-tick)", fontWeight: 600 }}
        >
          {line}
        </tspan>
      ))}
    </text>
  );
}

export function FinRiskRadarChart() {
  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-3 pt-3"
      style={{ "--d": "60ms" } as React.CSSProperties}
    >
      <SectionHead title="Financial Risk Radar" badge={<ScopeNote />} />
      <p className="mt-[3px] text-[9px] text-ink-500">Tingkat Risiko vs Ambang Toleransi</p>

      <div className="min-h-0 w-full flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart
            data={krkRadar}
            outerRadius="68%"
            margin={{ top: 18, right: 46, bottom: 10, left: 46 }}
          >
            <PolarGrid stroke="var(--chart-grid)" />
            <PolarAngleAxis dataKey="axis" tick={<AxisTick />} />
            <PolarRadiusAxis
              domain={[0, 100]}
              tickCount={5}
              angle={90}
              tick={{ fontSize: 8, fill: "var(--chart-tick)" }}
              axisLine={false}
            />
            <Radar isAnimationActive={false}
              name="Toleransi"
              dataKey="tolerance"
              stroke={PALETTE.slate}
              strokeWidth={1.2}
              fill={PALETTE.slate}
              fillOpacity={0.06}
              dot={false}
              animationDuration={900}
            />
            <Radar isAnimationActive={false}
              name="Tingkat Risiko"
              dataKey="level"
              stroke={PALETTE.red}
              strokeWidth={1.6}
              fill={PALETTE.red}
              fillOpacity={0.12}
              dot={{ r: 2.5, fill: PALETTE.red, strokeWidth: 0 }}
              animationDuration={900}
            />
            <Tooltip contentStyle={CHART_TOOLTIP_STYLE} />
          </RadarChart>
        </ResponsiveContainer>
      </div>

      <div className="flex items-center justify-center gap-4">
        <span className="flex items-center gap-1.5 text-[8.5px] text-ink-500">
          <span className="h-[7px] w-[7px] rounded-full" style={{ background: PALETTE.red }} />
          Tingkat Risiko
        </span>
        <span className="flex items-center gap-1.5 text-[8.5px] text-ink-500">
          <span className="h-[7px] w-[7px] rounded-full" style={{ background: PALETTE.slate }} />
          Ambang Toleransi
        </span>
      </div>
    </div>
  );
}
