"use client";

import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { trenProduktivitas } from "@/lib/produktivitas-data";
import { CHART_AXIS, CHART_TOOLTIP_STYLE, PALETTE } from "@/lib/chart-palette";
import { ScopeNote } from "../ui/ScopeNote";

const SERIES = [
  { key: "revenue", label: "Revenue per Employee (Jun '25 = 100)", color: PALETTE.green },
  { key: "produksi", label: "Production per Employee (Jun '25 = 100)", color: PALETTE.blue },
  { key: "index", label: "Productivity Index (Base 2024 = 100)", color: PALETTE.purple },
  { key: "laborCost", label: "Labor Cost per Ton (Jun '25 = 100)", color: PALETTE.amber },
] as const;

export function ProduktivitasTrend() {
  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-3 pt-3"
      style={{ "--d": "60ms" } as React.CSSProperties}
    >
      <h3 className="card-title-navy flex min-w-0 items-center gap-1.5">
        <span>1. Produktivitas Utama (Trend)</span>
        <ScopeNote />
      </h3>
      <p className="mt-[3px] text-[9.5px] text-ink-500">
        Perkembangan 12 Bulan Terakhir · seri operasional di-rebase Jun &apos;25 = 100
      </p>

      <div className="mt-1.5 min-h-0 w-full flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={trenProduktivitas} margin={{ top: 8, right: 12, bottom: 0, left: -18 }}>
            <CartesianGrid stroke={CHART_AXIS.grid} vertical={false} />
            <XAxis
              dataKey="name"
              tickLine={false}
              axisLine={{ stroke: CHART_AXIS.axis }}
              tick={{ fontSize: 8.5, fill: CHART_AXIS.tick }}
              interval={0}
            />
            <YAxis
              domain={[80, 140]}
              ticks={[80, 90, 100, 110, 120, 130, 140]}
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 9, fill: CHART_AXIS.tick }}
              width={40}
            />
            <Tooltip
              contentStyle={CHART_TOOLTIP_STYLE}
              formatter={(v: number, name: string) => [
                v,
                SERIES.find((s) => s.key === name)?.label ?? name,
              ]}
            />
            {SERIES.map((s) => (
              <Line isAnimationActive={false}
                key={s.key}
                type="monotone"
                dataKey={s.key}
                stroke={s.color}
                strokeWidth={1.8}
                dot={{ r: 2.4, fill: s.color, strokeWidth: 0 }}
                activeDot={{ r: 4 }}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-1.5 grid grid-cols-2 gap-x-3 gap-y-1">
        {SERIES.map((s) => (
          <span key={s.key} className="flex items-center gap-1.5 text-[8.5px] font-medium text-ink-600">
            <span className="h-[7px] w-[7px] shrink-0 rounded-full" style={{ background: s.color }} />
            {s.label}
          </span>
        ))}
      </div>
    </div>
  );
}
