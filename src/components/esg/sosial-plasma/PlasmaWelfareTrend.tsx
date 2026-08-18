"use client";

import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { welfareTrend } from "@/lib/esg-data-detail";
import { CHART_AXIS, CHART_TOOLTIP_STYLE, PALETTE } from "@/lib/chart-palette";
import { SectionHead } from "@/components/hc/SectionHead";
import { useSubholding } from "@/components/SubholdingProvider";

const rp = (v: number) => `Rp ${v.toLocaleString("id-ID", { minimumFractionDigits: 1 })} jt`;

/** Tren pendapatan bersih petani plasma vs UMP tertimbang wilayah operasi. */
export function PlasmaWelfareTrend() {
  const { active, def } = useSubholding();
  // Skema plasma/inti adalah konstruksi kebun sawit — kartu ini milik PalmCo.
  const outOfScope = active !== "all" && active !== "palmco";

  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-2.5 pt-3"
      style={{ "--d": "60ms" } as React.CSSProperties}
    >
      <SectionHead title="Kesejahteraan Plasma vs UMP" action="Lihat Detail" />
      <p className="mt-[3px] text-[9px] text-ink-500">
        {outOfScope
          ? `Kemitraan plasma sawit hanya di PalmCo — di luar cakupan ${def.label}`
          : "Pendapatan Bersih Rp jt/bln · Posisi 2026 ±1,6x UMP"}
      </p>

      <div
        className="mt-1.5 min-h-0 w-full flex-1 transition-opacity"
        style={{ opacity: outOfScope ? 0.25 : 1 }}
      >
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={welfareTrend} margin={{ top: 10, right: 12, bottom: 0, left: -14 }}>
            <CartesianGrid stroke={CHART_AXIS.grid} vertical={false} />
            <XAxis
              dataKey="year"
              tickLine={false}
              axisLine={{ stroke: CHART_AXIS.axis }}
              tick={{ fontSize: 8.5, fill: CHART_AXIS.tick }}
            />
            <YAxis
              domain={[2.5, 6.5]}
              ticks={[3, 4, 5, 6]}
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 8.5, fill: CHART_AXIS.tick }}
              width={30}
            />
            <Tooltip formatter={(v: number) => rp(v)} contentStyle={CHART_TOOLTIP_STYLE} />
            <Legend
              verticalAlign="top"
              align="right"
              height={16}
              iconType="circle"
              iconSize={7}
              wrapperStyle={{ fontSize: 8.5, color: CHART_AXIS.tick }}
            />
            <Line isAnimationActive={false}
              type="linear"
              dataKey="plasma"
              name="Pendapatan plasma"
              stroke={PALETTE.green}
              strokeWidth={2}
              dot={{ r: 2.5 }}
              activeDot={{ r: 4 }}
            />
            <Line isAnimationActive={false}
              type="linear"
              dataKey="ump"
              name="UMP wilayah operasi"
              stroke={PALETTE.slate}
              strokeWidth={1.8}
              strokeDasharray="4 3"
              dot={{ r: 2 }}
              activeDot={{ r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
