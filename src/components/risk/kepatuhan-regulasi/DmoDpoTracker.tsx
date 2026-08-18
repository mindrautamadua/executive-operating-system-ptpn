"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { dmoTracker } from "@/lib/risk-data-detail";
import { CHART_AXIS, CHART_TOOLTIP_STYLE, PALETTE } from "@/lib/chart-palette";
import { SectionHead } from "@/components/hc/SectionHead";
import { ScopeNote } from "@/components/ui/ScopeNote";

/** Pemenuhan kewajiban pasar domestik (DMO) CPO: alokasi vs realisasi bulanan. */
export function DmoDpoTracker() {
  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-2 pt-3"
      style={{ "--d": "180ms" } as React.CSSProperties}
    >
      <SectionHead title="DMO/DPO Tracker CPO" badge={<ScopeNote />} />
      <p className="mt-[3px] text-[9px] text-ink-500">
        Alokasi Kewajiban vs Realisasi Pasokan Domestik (Ribu Ton) — Pemenuhan 100% YTD
      </p>

      <div className="mt-1.5 min-h-0 w-full flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={dmoTracker} margin={{ top: 16, right: 10, bottom: 0, left: -16 }}>
            <CartesianGrid stroke={CHART_AXIS.grid} vertical={false} />
            <XAxis
              dataKey="bulan"
              tickLine={false}
              axisLine={{ stroke: CHART_AXIS.axis }}
              tick={{ fontSize: 8, fill: CHART_AXIS.tick }}
            />
            <YAxis
              domain={[0, 40]}
              ticks={[0, 10, 20, 30, 40]}
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 8.5, fill: CHART_AXIS.tick }}
              width={32}
            />
            <Tooltip
              contentStyle={CHART_TOOLTIP_STYLE}
              cursor={{ fill: "var(--chart-grid)" }}
              formatter={(v: number, n: string) => [`${v} rb ton`, n]}
            />
            <Legend
              verticalAlign="bottom"
              height={16}
              iconSize={7}
              wrapperStyle={{ fontSize: 8.5, color: "var(--chart-tick)" }}
            />
            <Bar isAnimationActive={false}
              dataKey="kewajibanRbTon"
              name="Kewajiban"
              fill={PALETTE.slate}
              radius={[3, 3, 0, 0]}
              maxBarSize={26}
            />
            <Bar isAnimationActive={false}
              dataKey="realisasiRbTon"
              name="Realisasi"
              fill={PALETTE.green}
              radius={[3, 3, 0, 0]}
              maxBarSize={26}
            >
              <LabelList
                dataKey="pct"
                position="top"
                formatter={(v: number) => `${v}%`}
                style={{ fontSize: 8.5, fill: "var(--chart-tick)", fontWeight: 700 }}
              />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
