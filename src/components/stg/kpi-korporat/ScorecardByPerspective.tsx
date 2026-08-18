"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  LabelList,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { perspectives } from "@/lib/skc-data";
import { CHART_AXIS, CHART_TOOLTIP_STYLE, PALETTE } from "@/lib/chart-palette";
import { SectionHead } from "@/components/hc/SectionHead";
import { ScopeNote } from "@/components/ui/ScopeNote";

const COLORS = [PALETTE.green, PALETTE.blue, PALETTE.teal, PALETTE.purple];

const DATA = perspectives.map((p) => ({
  name: p.perspective,
  score: p.score,
  weight: p.weight,
}));

/** Skor per 4 perspektif balanced scorecard vs ambang target 85. */
export function ScorecardByPerspective() {
  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-2.5 pt-3"
      style={{ "--d": "60ms" } as React.CSSProperties}
    >
      <SectionHead title="Scorecard per Perspektif" action="Lihat Detail" badge={<ScopeNote />} />
      <p className="mt-[3px] text-[9px] text-ink-500">
        Skor Komposit 4 Perspektif · Bobot 35/30/15/20% · Ambang Target 85
      </p>

      <div className="mt-1.5 min-h-0 w-full flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={DATA} margin={{ top: 18, right: 8, bottom: 4, left: -14 }} barCategoryGap="28%">
            <CartesianGrid stroke={CHART_AXIS.grid} vertical={false} />
            <XAxis
              dataKey="name"
              tickLine={false}
              axisLine={{ stroke: CHART_AXIS.axis }}
              tick={{ fontSize: 8.5, fill: CHART_AXIS.tick }}
              interval={0}
            />
            <YAxis
              domain={[70, 100]}
              ticks={[70, 80, 85, 90, 100]}
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 8.5, fill: CHART_AXIS.tick }}
              width={38}
            />
            <Tooltip
              cursor={{ fill: "rgba(148,163,184,0.08)" }}
              contentStyle={CHART_TOOLTIP_STYLE}
              formatter={(v: number, _n: string, item: { payload?: { weight?: number } }) => [
                `${v.toLocaleString("id-ID")} · bobot ${item.payload?.weight ?? 0}%`,
                "Skor",
              ]}
            />
            <ReferenceLine
              y={85}
              stroke={PALETTE.red}
              strokeDasharray="3 3"
              strokeWidth={1.2}
            />
            <Bar dataKey="score" radius={[3, 3, 0, 0]} maxBarSize={42}>
              {DATA.map((d, i) => (
                <Cell key={d.name} fill={COLORS[i % COLORS.length]} />
              ))}
              <LabelList
                dataKey="score"
                position="top"
                offset={5}
                style={{ fontSize: 8, fill: "#334155", fontWeight: 700 }}
              />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
