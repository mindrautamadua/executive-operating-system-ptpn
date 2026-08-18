"use client";

import {
  CartesianGrid,
  Cell,
  ReferenceLine,
  ResponsiveContainer,
  Scatter,
  ScatterChart,
  Tooltip,
  XAxis,
  YAxis,
  ZAxis,
} from "recharts";
import { SectionHead } from "@/components/hc/SectionHead";
import { CHART_AXIS, CHART_TOOLTIP_STYLE } from "@/lib/chart-palette";
import { LEVEL_COLOR, priorityMatrix, type PriorityLevel } from "@/lib/prr-priority";

/**
 * Urgensi (minggu sampai dampak, makin kiri makin mendesak) vs dampak
 * finansial. Kuadran kiri-atas = tangani lebih dulu.
 */
export function PriorityMatrix() {
  const urgent = priorityMatrix.filter((r) => r.x <= 12 && r.y >= 15).length;

  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-3 pt-3"
      style={{ "--d": "40ms" } as React.CSSProperties}
    >
      <SectionHead title="Matriks Urgensi vs Dampak" />
      <p className="mt-[3px] text-[9px] text-ink-500">
        <span className="font-bold text-[#ef4444]">{urgent} risiko</span> mendesak & berdampak besar
      </p>

      <div className="mt-1 min-h-0 w-full flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart margin={{ top: 10, right: 12, bottom: 2, left: -22 }}>
            <CartesianGrid stroke={CHART_AXIS.grid} />
            <XAxis
              type="number"
              dataKey="x"
              domain={[0, 36]}
              ticks={[0, 12, 24, 36]}
              tickLine={false}
              axisLine={{ stroke: CHART_AXIS.axis }}
              tick={{ fontSize: 8.5, fill: CHART_AXIS.tick }}
              unit=" mg"
            />
            <YAxis
              type="number"
              dataKey="y"
              domain={[0, 50]}
              ticks={[0, 15, 30, 45]}
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 8.5, fill: CHART_AXIS.tick }}
            />
            <ZAxis type="number" dataKey="z" range={[26, 150]} />
            <ReferenceLine x={12} stroke="#94a3b8" strokeDasharray="3 3" />
            <ReferenceLine y={15} stroke="#94a3b8" strokeDasharray="3 3" />
            <Tooltip
              cursor={{ strokeDasharray: "3 3" }}
              contentStyle={CHART_TOOLTIP_STYLE}
              formatter={(v: number, n: string) =>
                n === "x"
                  ? [`${v} minggu`, "Waktu ke dampak"]
                  : n === "y"
                    ? [`Rp ${String(v).replace(".", ",")} M`, "Potensi dampak"]
                    : [`${v.toLocaleString("id-ID")} orang`, "Terdampak"]
              }
            />
            <Scatter data={priorityMatrix} isAnimationActive={false}>
              {priorityMatrix.map((r) => (
                <Cell key={r.name} fill={LEVEL_COLOR[r.level as PriorityLevel]} />
              ))}
            </Scatter>
          </ScatterChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-1 flex items-center justify-between text-[7.5px] font-semibold uppercase tracking-[0.04em] text-ink-400">
        <span>Makin mendesak</span>
        <span>Bulatan = pekerja terdampak</span>
        <span>Dampak Rp M</span>
      </div>
    </div>
  );
}
