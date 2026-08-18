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
import { workingCapitalTrend } from "@/lib/kas-data";
import { CHART_AXIS, CHART_TOOLTIP_STYLE, PALETTE } from "@/lib/chart-palette";
import { SectionHead } from "../../hc/SectionHead";
import { ScopeNote } from "@/components/ui/ScopeNote";

const SERIES = [
  { key: "dpo", label: "DPO", color: PALETTE.green },
  { key: "dio", label: "DIO", color: PALETTE.amber },
  { key: "dso", label: "DSO", color: PALETTE.blue },
] as const;

/** Tren modal kerja 12 bulan: DSO, DPO, DIO (hari). */
export function WorkingCapitalTrend() {
  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-2.5 pt-3"
      style={{ "--d": "180ms" } as React.CSSProperties}
    >
      <SectionHead title="Working Capital Trend" badge={<ScopeNote />} />
      <div className="mt-[3px] flex items-center justify-between gap-2">
        <p className="text-[9px] text-ink-500">DSO · DPO · DIO 12 Bulan (hari) · CCC 18 hari</p>
        <div className="flex shrink-0 items-center gap-2.5">
          {SERIES.map((s) => (
            <span key={s.key} className="flex items-center gap-1 text-[9px] font-semibold text-ink-500">
              <span className="h-[7px] w-[7px] rounded-full" style={{ backgroundColor: s.color }} />
              {s.label}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-1.5 min-h-0 w-full flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={workingCapitalTrend} margin={{ top: 8, right: 10, bottom: 0, left: -20 }}>
            <CartesianGrid stroke={CHART_AXIS.grid} vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={{ stroke: CHART_AXIS.axis }}
              tick={{ fontSize: 8.5, fill: CHART_AXIS.tick }}
              interval={1}
            />
            <YAxis
              domain={[20, 60]}
              ticks={[20, 30, 40, 50, 60]}
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 8.5, fill: CHART_AXIS.tick }}
              width={34}
            />
            <Tooltip
              contentStyle={CHART_TOOLTIP_STYLE}
              formatter={(v: number, name: string) => [
                `${v} hari`,
                SERIES.find((s) => s.key === name)?.label ?? name,
              ]}
            />
            {SERIES.map((s) => (
              <Line
                key={s.key}
                type="monotone"
                dataKey={s.key}
                stroke={s.color}
                strokeWidth={1.8}
                dot={false}
                activeDot={{ r: 3.5 }}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
