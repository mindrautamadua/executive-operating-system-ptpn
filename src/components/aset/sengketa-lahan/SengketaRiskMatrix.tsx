"use client";

import {
  CartesianGrid,
  Cell,
  LabelList,
  ResponsiveContainer,
  Scatter,
  ScatterChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { asgRiskMatrix } from "@/lib/asg-data";
import type { AstRiskLevel } from "@/lib/ast-core";
import { CHART_AXIS, CHART_TOOLTIP_STYLE, PALETTE } from "@/lib/chart-palette";
import { SectionHead } from "@/components/hc/SectionHead";
import { ScopeNote } from "@/components/ui/ScopeNote";

const LEVEL_COLOR: Record<AstRiskLevel, string> = {
  Ekstrem: PALETTE.red,
  Tinggi: PALETTE.amber,
  Sedang: PALETTE.blue,
  Rendah: PALETTE.green,
};

const data = asgRiskMatrix.map((r, i) => ({
  no: `R${i + 1}`,
  name: r.name,
  likelihood: r.likelihood,
  impact: r.impact,
  level: r.level,
}));

/** Matriks risiko sengketa: probabilitas (1–5) × dampak (1–5). */
export function SengketaRiskMatrix() {
  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-2.5 pt-3"
      style={{ "--d": "180ms" } as React.CSSProperties}
    >
      <SectionHead title="Matriks Risiko Sengketa" action="Lihat Detail" badge={<ScopeNote />} />
      <p className="mt-[3px] text-[9px] text-ink-500">
        Probabilitas × Dampak (skala 1–5) · 6 risiko utama
      </p>

      <div className="mt-1.5 min-h-0 w-full flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart margin={{ top: 12, right: 12, bottom: 0, left: -24 }}>
            <CartesianGrid stroke={CHART_AXIS.grid} />
            <XAxis
              type="number"
              dataKey="likelihood"
              domain={[1, 5]}
              ticks={[1, 2, 3, 4, 5]}
              tickLine={false}
              axisLine={{ stroke: CHART_AXIS.axis }}
              tick={{ fontSize: 8.5, fill: CHART_AXIS.tick }}
            />
            <YAxis
              type="number"
              dataKey="impact"
              domain={[1, 5]}
              ticks={[1, 2, 3, 4, 5]}
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 8.5, fill: CHART_AXIS.tick }}
            />
            <Tooltip
              cursor={{ strokeDasharray: "3 3" }}
              formatter={(v: number, name: string) =>
                name === "likelihood" ? [`${v}/5`, "Probabilitas"] : [`${v}/5`, "Dampak"]
              }
              labelFormatter={() => ""}
              contentStyle={CHART_TOOLTIP_STYLE}
            />
            <Scatter data={data}>
              {data.map((d) => (
                <Cell key={d.no} fill={LEVEL_COLOR[d.level]} fillOpacity={0.85} />
              ))}
              <LabelList
                dataKey="no"
                position="top"
                offset={5}
                style={{ fontSize: 8, fill: "var(--text-1)", fontWeight: 700 }}
              />
            </Scatter>
          </ScatterChart>
        </ResponsiveContainer>
      </div>

      <div className="mb-0.5 grid grid-cols-2 gap-x-2 gap-y-[2px]">
        {data.map((d) => (
          <span key={d.no} className="flex min-w-0 items-center gap-1 text-[7.5px] text-ink-500">
            <span
              className="h-[6px] w-[6px] shrink-0 rounded-full"
              style={{ background: LEVEL_COLOR[d.level] }}
            />
            <span className="shrink-0 font-bold text-ink-700">{d.no}</span>
            <span className="truncate" title={d.name}>
              {d.name}
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}
