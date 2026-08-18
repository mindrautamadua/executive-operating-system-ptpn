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
import { yieldTrend, yieldTrendNote } from "@/lib/apd-data";
import { CHART_AXIS, CHART_TOOLTIP_STYLE, PALETTE } from "@/lib/chart-palette";
import { SectionHead } from "@/components/hc/SectionHead";
import { useSubholding } from "@/components/SubholdingProvider";

const num = (v: number) =>
  v.toLocaleString("id-ID", { minimumFractionDigits: 1, maximumFractionDigits: 2 });

/** Tren yield TBS, OER & CPO per ha lima tahun terakhir. */
export function YieldTrend() {
  const { active } = useSubholding();
  // Pemetaan domain: yield TBS, OER & CPO/ha adalah metrik sawit — cakupan PalmCo.
  const outOfScope = active !== "all" && active !== "palmco";

  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-2.5 pt-3"
      style={{ "--d": "120ms" } as React.CSSProperties}
    >
      <SectionHead title="Tren Produktivitas 5 Tahun" action="Lihat Detail" />
      <p className="mt-[3px] text-[9px] text-ink-500">
        {outOfScope
          ? "Tren yield TBS, OER & CPO/ha hanya untuk PalmCo"
          : "Yield TBS & CPO per Ha (t/ha) vs OER (%) · 2022–2026"}
      </p>

      <div
        className="mt-1.5 min-h-0 w-full flex-1 transition-opacity"
        style={{ opacity: outOfScope ? 0.25 : 1 }}
      >
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={yieldTrend} margin={{ top: 10, right: 6, bottom: 0, left: -16 }}>
            <CartesianGrid stroke={CHART_AXIS.grid} vertical={false} />
            <XAxis
              dataKey="tahun"
              tickLine={false}
              axisLine={{ stroke: CHART_AXIS.axis }}
              tick={{ fontSize: 8, fill: CHART_AXIS.tick }}
            />
            <YAxis
              yAxisId="left"
              domain={[0, 24]}
              ticks={[0, 6, 12, 18, 24]}
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 8, fill: CHART_AXIS.tick }}
              width={34}
            />
            <YAxis
              yAxisId="right"
              orientation="right"
              domain={[21.5, 23]}
              ticks={[21.5, 22, 22.5, 23]}
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 8, fill: CHART_AXIS.tick }}
              tickFormatter={(v: number) => `${num(v)}%`}
              width={36}
            />
            <Tooltip
              contentStyle={CHART_TOOLTIP_STYLE}
              formatter={(v: number, n: string) => [
                n === "OER" ? `${num(v)}%` : `${num(v)} t/ha`,
                n,
              ]}
            />
            <Legend
              verticalAlign="top"
              align="right"
              height={16}
              iconType="circle"
              iconSize={7}
              wrapperStyle={{ fontSize: 8.5, color: CHART_AXIS.tick }}
            />
            <Line isAnimationActive={false}
              yAxisId="left"
              type="monotone"
              dataKey="yieldTonHa"
              name="Yield TBS"
              stroke={PALETTE.green}
              strokeWidth={1.8}
              dot={{ r: 2.4 }}
            />
            <Line isAnimationActive={false}
              yAxisId="left"
              type="monotone"
              dataKey="cpoPerHaTon"
              name="CPO/Ha"
              stroke={PALETTE.blue}
              strokeWidth={1.8}
              dot={{ r: 2.4 }}
            />
            <Line isAnimationActive={false}
              yAxisId="right"
              type="monotone"
              dataKey="oerPct"
              name="OER"
              stroke={PALETTE.amber}
              strokeWidth={1.6}
              strokeDasharray="5 4"
              dot={{ r: 2.2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <p className="pb-1 text-[9px] leading-snug text-ink-500">{yieldTrendNote}</p>
    </div>
  );
}
