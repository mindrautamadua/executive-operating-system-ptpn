"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  LabelList,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { opexImpactWaterfall } from "@/lib/biaya-opex-data";
import { CATEGORICAL, CHART_AXIS, CHART_TOOLTIP_STYLE, PALETTE } from "@/lib/chart-palette";
import { ScopeNote } from "@/components/ui/ScopeNote";
import { SectionHead } from "@/components/hc/SectionHead";

/** Waterfall: base transparan + nilai kumulatif per workstream, ditutup total. */
const waterfallData = (() => {
  let cum = 0;
  const steps = opexImpactWaterfall.map((s) => {
    const base = cum;
    cum += s.dampakRpM;
    return { name: s.workstream, base, value: s.dampakRpM, total: false };
  });
  return [...steps, { name: "Total", base: 0, value: cum, total: true }];
})();

export function ImpactWaterfall() {
  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-2.5 pt-3"
      style={{ "--d": "120ms" } as React.CSSProperties}
    >
      {/* Dampak EBITDA program OPEX dihitung agregat grup per workstream. */}
      <SectionHead title="Impact Waterfall EBITDA" action="Lihat Detail" badge={<ScopeNote />} />
      <p className="mt-[3px] text-[9px] text-ink-500">
        Dampak YTD per Workstream (Rp M) — Biaya Rp 412 M + Uplift Volume Rp 268 M
      </p>

      <div className="mt-1.5 min-h-0 w-full flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={waterfallData} margin={{ top: 16, right: 4, bottom: 0, left: -18 }}>
            <CartesianGrid stroke={CHART_AXIS.grid} vertical={false} />
            <XAxis
              dataKey="name"
              tickLine={false}
              axisLine={{ stroke: CHART_AXIS.axis }}
              tick={{ fontSize: 8.5, fill: CHART_AXIS.tick }}
              interval={0}
              tickFormatter={(v: string) => (v === "Digital & Data" ? "Digital" : v)}
            />
            <YAxis
              domain={[0, 720]}
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 8.5, fill: CHART_AXIS.tick }}
              width={34}
            />
            <Tooltip
              contentStyle={CHART_TOOLTIP_STYLE}
              formatter={(v: number, name: string) =>
                name === "Dampak" ? [`Rp ${v.toLocaleString("id-ID")} M`, name] : [null, null]
              }
            />
            <Bar dataKey="base" stackId="wf" fill="transparent" isAnimationActive={false} />
            <Bar dataKey="value" name="Dampak" stackId="wf" barSize={30} radius={[3, 3, 0, 0]}>
              {waterfallData.map((d, i) => (
                <Cell key={d.name} fill={d.total ? PALETTE.navy : CATEGORICAL[i]} />
              ))}
              <LabelList
                dataKey="value"
                content={(props) => {
                  const { x, y, width, value } = props as {
                    x?: number;
                    y?: number;
                    width?: number;
                    value?: number;
                  };
                  if (x == null || y == null || width == null) return null;
                  return (
                    <text
                      x={x + width / 2}
                      y={y - 5}
                      textAnchor="middle"
                      style={{ fontSize: 8.5, fill: "#64748b", fontWeight: 700 }}
                    >
                      {value}
                    </text>
                  );
                }}
              />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
