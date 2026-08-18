"use client";

import {
  CartesianGrid,
  Cell,
  LabelList,
  ReferenceArea,
  ReferenceLine,
  ResponsiveContainer,
  Scatter,
  ScatterChart,
  Tooltip,
  XAxis,
  YAxis,
  ZAxis,
} from "recharts";
import { Lightbulb } from "lucide-react";
import { biayaVsIndex } from "@/lib/produktivitas-data";
import { CATEGORICAL, CHART_AXIS, CHART_TOOLTIP_STYLE, PALETTE, SEMANTIC } from "@/lib/chart-palette";
import { useSubholding } from "@/components/SubholdingProvider";
import { orgDim } from "../ui/OrgScope";

const ribuan = (v: number) => v.toLocaleString("id-ID");

/** Batas kuadran: biaya median ±Rp 2.600/Ton, index base Mei '25 = 106. */
const SPLIT_X = 2600;
const SPLIT_Y = 106;

const QUADRANTS = [
  { x1: 1500, x2: SPLIT_X, y1: SPLIT_Y, y2: 140, fill: SEMANTIC.good, label: "STAR", pos: "insideTopLeft" },
  { x1: SPLIT_X, x2: 3500, y1: SPLIT_Y, y2: 140, fill: SEMANTIC.warn, label: "COST WATCH", pos: "insideTopRight" },
  { x1: 1500, x2: SPLIT_X, y1: 80, y2: SPLIT_Y, fill: SEMANTIC.neutral, label: "OPPORTUNITY", pos: "insideBottomLeft" },
  { x1: SPLIT_X, x2: 3500, y1: 80, y2: SPLIT_Y, fill: SEMANTIC.bad, label: "TURNAROUND", pos: "insideBottomRight" },
] as const;

export function ProduktivitasBiaya() {
  const { active, isFiltered, def } = useSubholding();
  // Peta posisi antar entitas: bubble di luar subholding aktif diredupkan agar
  // kuadran tempat entitas tersebut berada tetap punya konteks pembanding.

  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-3 pt-3"
      style={{ "--d": "240ms" } as React.CSSProperties}
    >
      <h3 className="card-title-navy">4. Productivity Opportunity Map</h3>
      <p className="mt-[3px] text-[9.5px] text-ink-500">
        Labor Cost per Ton vs Productivity Index · ukuran bubble = headcount
        {isFiltered ? ` · ${def.label} disorot` : ""}
      </p>

      <div className="mt-1 min-h-0 w-full flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart margin={{ top: 14, right: 20, bottom: 14, left: -14 }}>
            <CartesianGrid stroke={CHART_AXIS.grid} />
            <XAxis
              type="number"
              dataKey="laborCostPerTon"
              domain={[1500, 3500]}
              ticks={[1500, 2000, 2500, 3000, 3500]}
              tickLine={false}
              axisLine={{ stroke: CHART_AXIS.axis }}
              tick={{ fontSize: 9, fill: CHART_AXIS.tick }}
              tickFormatter={ribuan}
              label={{
                value: "Labor Cost per Ton (Rp)",
                position: "insideBottom",
                offset: -10,
                style: { fontSize: 9, fill: "var(--chart-tick)" },
              }}
            />
            <YAxis
              type="number"
              dataKey="index"
              domain={[80, 140]}
              ticks={[80, 90, 100, 110, 120, 130, 140]}
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 9, fill: CHART_AXIS.tick }}
              label={{
                value: "Productivity Index (Base 100)",
                angle: -90,
                position: "insideLeft",
                offset: 24,
                style: { fontSize: 9, fill: "var(--chart-tick)", textAnchor: "middle" },
              }}
            />
            <ZAxis type="number" dataKey="headcount" range={[120, 420]} />
            {QUADRANTS.map((q) => (
              <ReferenceArea
                key={q.label}
                x1={q.x1}
                x2={q.x2}
                y1={q.y1}
                y2={q.y2}
                fill={q.fill}
                fillOpacity={0.05}
                stroke="none"
                label={{
                  value: q.label,
                  position: q.pos,
                  style: { fontSize: 8, fontWeight: 800, fill: q.fill, opacity: 0.85 },
                }}
              />
            ))}
            <ReferenceLine x={SPLIT_X} stroke={PALETTE.slate} strokeDasharray="4 4" />
            <ReferenceLine y={SPLIT_Y} stroke={PALETTE.slate} strokeDasharray="4 4" />
            <Tooltip
              contentStyle={CHART_TOOLTIP_STYLE}
              cursor={{ strokeDasharray: "3 3" }}
              formatter={(v: number, name: string) =>
                name === "laborCostPerTon"
                  ? [`Rp ${ribuan(v)}`, "Labor Cost / Ton"]
                  : name === "index"
                    ? [v, "Productivity Index"]
                    : [ribuan(v), "Headcount"]
              }
              labelFormatter={() => ""}
            />
            <Scatter isAnimationActive={false} data={biayaVsIndex} fillOpacity={0.85}>
              {biayaVsIndex.map((d, i) => (
                <Cell
                  key={d.unit}
                  fill={CATEGORICAL[i % CATEGORICAL.length]}
                  fillOpacity={0.85 * orgDim(active, d.unit)}
                />
              ))}
              <LabelList
                dataKey="unit"
                position="right"
                offset={8}
                style={{ fontSize: 8.5, fill: "var(--text-2)", fontWeight: 700 }}
              />
            </Scatter>
          </ScatterChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-1.5 flex items-start gap-2 rounded-lg bg-[#f2faf5] px-3 py-2">
        <Lightbulb size={13} className="mt-[1px] shrink-0 text-ptpn-green" />
        <p className="text-[9px] leading-[1.45] text-ink-700">
          STAR = produktif &amp; efisien (best practice) · COST WATCH = produktif tapi mahal ·
          TURNAROUND = prioritas intervensi (PTPN I Regional 1 &amp; PTPN IV Regional 4).
        </p>
      </div>
    </div>
  );
}
