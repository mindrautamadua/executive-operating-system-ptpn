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
import { complianceAreas, COMPLIANCE_BAND, statusOfScore } from "@/lib/rc-data";
import { CHART_TOOLTIP_STYLE, PALETTE } from "@/lib/chart-palette";
import { SectionHead } from "../hc/SectionHead";

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
    words.length > 2 ? [words.slice(0, mid).join(" "), words.slice(mid).join(" ")] : [words.join(" ")];
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

interface DotProps {
  cx?: number;
  cy?: number;
  payload?: { score: number };
}

/** Titik radar diwarnai sesuai band skor (Patuh hijau, Parsial amber, Kritis merah). */
function BandDot({ cx = 0, cy = 0, payload }: DotProps) {
  const color = COMPLIANCE_BAND[statusOfScore(payload?.score ?? 0)];
  return <circle cx={cx} cy={cy} r={3} fill={color} stroke="#fff" strokeWidth={1.2} />;
}

const LEGEND = [
  { label: "Patuh (85-100)", color: PALETTE.green },
  { label: "Parsial (70-84)", color: PALETTE.amber },
  { label: "Kritis (0-69)", color: PALETTE.red },
];

export function ComplianceRadarChart() {
  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-3 pt-3"
      style={{ "--d": "60ms" } as React.CSSProperties}
    >
      <SectionHead title="Compliance Radar" />
      <p className="mt-[3px] text-[9px] text-ink-500">Skor Kepatuhan per Area</p>

      <div className="min-h-0 w-full flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart
            data={complianceAreas}
            outerRadius="68%"
            margin={{ top: 18, right: 46, bottom: 10, left: 46 }}
          >
            <PolarGrid stroke="var(--chart-grid)" />
            <PolarAngleAxis dataKey="short" tick={<AxisTick />} />
            <PolarRadiusAxis
              domain={[0, 100]}
              tickCount={5}
              angle={90}
              tick={{ fontSize: 8, fill: "var(--chart-tick)" }}
              axisLine={false}
            />
            <Radar
              name="Compliance Score"
              dataKey="score"
              stroke={PALETTE.green}
              strokeWidth={1.6}
              fill={PALETTE.green}
              fillOpacity={0.1}
              dot={<BandDot />}
              animationDuration={900}
            />
            <Tooltip
              formatter={(v: number) => [v, "Compliance Score"]}
              contentStyle={CHART_TOOLTIP_STYLE}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>

      <div className="flex items-center justify-center gap-4">
        {LEGEND.map((l) => (
          <span key={l.label} className="flex items-center gap-1.5 text-[8.5px] text-ink-500">
            <span className="h-[7px] w-[7px] rounded-full" style={{ background: l.color }} />
            {l.label}
          </span>
        ))}
      </div>
    </div>
  );
}
