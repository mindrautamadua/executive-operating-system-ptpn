"use client";

import {
  Legend,
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { categoryRadar } from "@/lib/risk-data";
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

/** Radar skor residual per kategori risiko dibanding ambang risk appetite. */
export function RiskCategoryRadar() {
  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-2 pt-3"
      style={{ "--d": "180ms" } as React.CSSProperties}
    >
      <SectionHead title="Profil Risiko per Kategori" action="Risk Appetite" badge={<ScopeNote />} />
      <p className="mt-[3px] text-[9px] text-ink-500">
        Skor Residual vs Ambang Appetite (Skala 0–100)
      </p>

      <div className="min-h-0 w-full flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart
            data={categoryRadar}
            outerRadius="66%"
            margin={{ top: 16, right: 46, bottom: 4, left: 46 }}
          >
            <PolarGrid stroke="var(--chart-grid)" />
            <PolarAngleAxis dataKey="kategori" tick={<AxisTick />} />
            <PolarRadiusAxis
              domain={[0, 100]}
              tickCount={5}
              angle={90}
              tick={{ fontSize: 8, fill: "var(--chart-tick)" }}
              axisLine={false}
            />
            <Radar
              name="Residual"
              dataKey="residual"
              stroke={PALETTE.red}
              strokeWidth={1.6}
              fill={PALETTE.red}
              fillOpacity={0.12}
              animationDuration={900}
            />
            <Radar
              name="Appetite"
              dataKey="appetite"
              stroke={PALETTE.green}
              strokeWidth={1.4}
              strokeDasharray="4 3"
              fill={PALETTE.green}
              fillOpacity={0.06}
              animationDuration={900}
            />
            <Legend
              verticalAlign="bottom"
              height={16}
              iconSize={7}
              wrapperStyle={{ fontSize: 8.5, color: "var(--chart-tick)" }}
            />
            <Tooltip contentStyle={CHART_TOOLTIP_STYLE} />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
