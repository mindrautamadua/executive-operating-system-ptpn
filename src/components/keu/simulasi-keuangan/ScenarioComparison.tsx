"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { scenarios } from "@/lib/ksk-data";
import { CHART_AXIS, CHART_TOOLTIP_STYLE, PALETTE } from "@/lib/chart-palette";
import { fmtId, fmtRpT } from "@/lib/keu-core";
import { SectionHead } from "@/components/hc/SectionHead";
import { ScopeNote } from "@/components/ui/ScopeNote";

const TONE_DOT: Record<string, string> = {
  bad: PALETTE.red,
  neutral: PALETTE.blue,
  good: PALETTE.green,
};

const data = scenarios.map((s) => ({
  name: s.recommended ? `${s.name} ★` : s.name,
  ebitda: s.ebitdaRpT,
  laba: s.labaRpT,
}));

export function ScenarioComparison() {
  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-2.5 pt-3"
      style={{ "--d": "120ms" } as React.CSSProperties}
    >
      <SectionHead title="Scenario Comparison" badge={<ScopeNote />} />
      <p className="mt-[3px] text-[9px] text-ink-500">
        EBITDA &amp; Laba Bersih FY 2026 per Skenario (Rp T) — ★ outlook direkomendasikan
      </p>

      <div className="mt-1.5 min-h-0 w-full flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 14, right: 4, bottom: 0, left: -18 }} barGap={4}>
            <CartesianGrid stroke={CHART_AXIS.grid} vertical={false} />
            <XAxis
              dataKey="name"
              tickLine={false}
              axisLine={{ stroke: CHART_AXIS.axis }}
              tick={{ fontSize: 8.5, fill: CHART_AXIS.tick }}
            />
            <YAxis
              domain={[0, 20]}
              ticks={[0, 5, 10, 15, 20]}
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 8.5, fill: CHART_AXIS.tick }}
              width={30}
            />
            <Tooltip
              cursor={{ fill: "rgba(148,163,184,0.08)" }}
              contentStyle={CHART_TOOLTIP_STYLE}
              formatter={(v: number, name: string) => [
                fmtRpT(v, 1),
                name === "ebitda" ? "EBITDA FY" : "Laba Bersih FY",
              ]}
            />
            <Bar isAnimationActive={false} dataKey="ebitda" fill={PALETTE.green} radius={[2, 2, 0, 0]} maxBarSize={34}>
              <LabelList
                dataKey="ebitda"
                position="top"
                offset={4}
                formatter={(v: number) => fmtId(v, 1)}
                style={{ fontSize: 8.5, fill: "#334155", fontWeight: 700 }}
              />
            </Bar>
            <Bar isAnimationActive={false} dataKey="laba" fill={PALETTE.blue} radius={[2, 2, 0, 0]} maxBarSize={34}>
              <LabelList
                dataKey="laba"
                position="top"
                offset={4}
                formatter={(v: number) => fmtId(v, 1)}
                style={{ fontSize: 8.5, fill: "#334155", fontWeight: 700 }}
              />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-2 pb-1">
        {scenarios.map((s) => (
          <div key={s.name} className="flex items-start gap-1.5">
            <span
              className="mt-[3px] h-[7px] w-[7px] shrink-0 rounded-full"
              style={{ background: TONE_DOT[s.tone] }}
            />
            <div className="min-w-0">
              <span className="text-[8.5px] font-bold text-ink-900">
                {s.name}
                <span className="ml-1 font-semibold text-ink-400">
                  ND/EBITDA {fmtId(s.netDebtEbitda, 1)}x
                </span>
              </span>
              <p className="truncate text-[9px] leading-snug text-ink-500" title={s.asumsi}>
                {s.asumsi}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
