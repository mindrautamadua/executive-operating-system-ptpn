"use client";

import { ArrowRight } from "lucide-react";
import {
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { dimensiEngagement, overallScore } from "@/lib/engagement-data";
import { CHART_TOOLTIP_STYLE, PALETTE } from "@/lib/chart-palette";

const SKOR = new Map(dimensiEngagement.map((d) => [d.dimensi, d.skor]));

interface TickProps {
  x?: number;
  y?: number;
  textAnchor?: "start" | "middle" | "end" | "inherit";
  payload?: { value: string };
}

/** label sumbu: nama dimensi + skornya — warna via CSS var agar aman dark mode */
function AxisTick({ x = 0, y = 0, textAnchor = "middle", payload }: TickProps) {
  const name = payload?.value ?? "";
  const skor = SKOR.get(name);
  return (
    <text x={x} y={y} textAnchor={textAnchor} dominantBaseline="middle">
      <tspan style={{ fontSize: 9, fill: "var(--chart-tick)" }}>{name}</tspan>
      <tspan dx={5} style={{ fontSize: 9, fill: "var(--text-1)", fontWeight: 700 }}>
        {skor}
      </tspan>
    </text>
  );
}

export function EngagementOverview() {
  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-2.5 pt-3"
      style={{ "--d": "100ms" } as React.CSSProperties}
    >
      <h3 className="card-title-navy">Engagement Score Overview</h3>
      <p className="mt-[3px] text-[9.5px] text-ink-500">Skor Engagement per Dimensi — Q2 vs Q1</p>

      <div className="relative mt-1 min-h-0 flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart
            data={dimensiEngagement}
            outerRadius="66%"
            margin={{ top: 4, right: 4, bottom: 4, left: 4 }}
          >
            <PolarGrid stroke="#e6ecf2" />
            <PolarAngleAxis dataKey="dimensi" tick={<AxisTick />} />
            <PolarRadiusAxis domain={[60, 92]} tick={false} axisLine={false} />
            {/* overlay benchmark kuartal sebelumnya */}
            <Radar isAnimationActive={false}
              name="Q1 2026"
              dataKey="skorQ1"
              stroke={PALETTE.slate}
              strokeWidth={1.2}
              strokeDasharray="4 3"
              fill={PALETTE.slate}
              fillOpacity={0.06}
              animationDuration={900}
            />
            <Radar isAnimationActive={false}
              name="Q2 2026"
              dataKey="skor"
              stroke={PALETTE.green}
              strokeWidth={1.8}
              fill={PALETTE.greenSoft}
              fillOpacity={0.18}
              dot={{ r: 2.4, fill: PALETTE.green, strokeWidth: 0 }}
              animationDuration={900}
            />
            <Tooltip contentStyle={CHART_TOOLTIP_STYLE} />
          </RadarChart>
        </ResponsiveContainer>

        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <span className="flex h-[54px] w-[54px] flex-col items-center justify-center rounded-full border border-[#e6ecf2] bg-white shadow-card">
            <span className="text-[15px] font-extrabold leading-none text-ink-900">
              {overallScore}
            </span>
            <span className="mt-[2px] text-[9px] leading-none text-ink-500">Overall</span>
          </span>
        </div>
      </div>

      <div className="mt-0.5 flex items-center justify-between">
        <button className="link-more flex items-center gap-1">
          Lihat analisis dimensi <ArrowRight size={11} />
        </button>
        <span className="flex items-center gap-3 text-[9px] text-ink-500">
          <span className="flex items-center gap-1">
            <span className="h-[3px] w-[12px] rounded-full" style={{ background: PALETTE.green }} />
            Q2 2026
          </span>
          <span className="flex items-center gap-1">
            <span
              className="h-0 w-[12px] border-t-[2px] border-dashed"
              style={{ borderColor: PALETTE.slate }}
            />
            Q1 2026
          </span>
        </span>
      </div>
    </div>
  );
}
