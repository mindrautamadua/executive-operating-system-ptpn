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
import { driverControlMatrix, FAMILY_COLOR, type DriverFamily } from "@/lib/prr-drivers";

/**
 * Kontribusi (Y) vs efektivitas kontrol (X). Kuadran kiri-atas = kontribusi
 * besar tapi kontrol lemah — prioritas intervensi grup.
 */
export function DriverControlMatrix() {
  const priority = driverControlMatrix.filter((d) => d.y >= 5 && d.x < 50).length;

  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-3 pt-3"
      style={{ "--d": "160ms" } as React.CSSProperties}
    >
      <SectionHead title="Kontrol vs Kontribusi" />
      <p className="mt-[3px] text-[9px] text-ink-500">
        <span className="font-bold text-[#ef4444]">{priority} driver</span> kontribusi tinggi, kontrol
        lemah
      </p>

      <div className="mt-1 min-h-0 w-full flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart margin={{ top: 10, right: 10, bottom: 2, left: -26 }}>
            <CartesianGrid stroke={CHART_AXIS.grid} />
            <XAxis
              type="number"
              dataKey="x"
              domain={[30, 75]}
              ticks={[30, 45, 60, 75]}
              tickLine={false}
              axisLine={{ stroke: CHART_AXIS.axis }}
              tick={{ fontSize: 8.5, fill: CHART_AXIS.tick }}
              unit="%"
            />
            <YAxis
              type="number"
              dataKey="y"
              domain={[0, 12]}
              ticks={[0, 4, 8, 12]}
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 8.5, fill: CHART_AXIS.tick }}
              unit="%"
            />
            <ZAxis type="number" dataKey="z" range={[24, 130]} />
            <ReferenceLine x={50} stroke="#94a3b8" strokeDasharray="3 3" />
            <ReferenceLine y={5} stroke="#94a3b8" strokeDasharray="3 3" />
            <Tooltip
              cursor={{ strokeDasharray: "3 3" }}
              contentStyle={CHART_TOOLTIP_STYLE}
              formatter={(v: number, n: string) =>
                n === "x"
                  ? [`${v}%`, "Efektivitas kontrol"]
                  : n === "y"
                    ? [`${v}%`, "Kontribusi"]
                    : [`${v} risiko`, "Terhubung"]
              }
              labelFormatter={() => ""}
            />
            <Scatter data={driverControlMatrix} isAnimationActive={false}>
              {driverControlMatrix.map((d) => (
                <Cell key={d.name} fill={FAMILY_COLOR[d.family as DriverFamily]} />
              ))}
            </Scatter>
          </ScatterChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-1 flex items-center justify-between text-[7.5px] font-semibold uppercase tracking-[0.04em] text-ink-400">
        <span>Kontrol lemah</span>
        <span>Ukuran bulatan = jumlah risiko</span>
        <span>Kontrol kuat</span>
      </div>
    </div>
  );
}
