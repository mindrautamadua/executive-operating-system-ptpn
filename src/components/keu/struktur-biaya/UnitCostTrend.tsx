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
import { unitCostTrend } from "@/lib/ksb-data";
import { CHART_AXIS, CHART_TOOLTIP_STYLE, PALETTE } from "@/lib/chart-palette";
import { SectionHead } from "../../hc/SectionHead";
import { ScopeNote } from "@/components/ui/ScopeNote";

const ribuan = (v: number) => v.toLocaleString("id-ID");

const SERIES = [
  { key: "hargaCpo", label: "Harga CPO", color: PALETTE.green, dash: undefined },
  { key: "hppCpo", label: "HPP CPO", color: PALETTE.red, dash: undefined },
  { key: "hargaGula", label: "Harga Gula", color: PALETTE.blue, dash: "4 3" },
  { key: "hppGula", label: "HPP Gula", color: PALETTE.amber, dash: "4 3" },
] as const;

/**
 * Jaws HPP vs harga jual 24 bulan. HPP gula putus (null) di luar musim
 * giling — connectNulls sengaja false agar putusnya terlihat.
 */
export function UnitCostTrend() {
  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-2.5 pt-3"
      style={{ "--d": "120ms" } as React.CSSProperties}
    >
      <SectionHead title="Unit Cost Trend 24 Bulan" badge={<ScopeNote />} />
      <div className="mt-[3px] flex items-center justify-between gap-2">
        <p className="text-[9px] text-ink-500">
          HPP vs Harga Jual · Rp/kg · HPP gula hanya saat musim giling
        </p>
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
          <LineChart data={unitCostTrend} margin={{ top: 8, right: 10, bottom: 0, left: -8 }}>
            <CartesianGrid stroke={CHART_AXIS.grid} vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={{ stroke: CHART_AXIS.axis }}
              tick={{ fontSize: 8.5, fill: CHART_AXIS.tick }}
              interval={3}
            />
            <YAxis
              domain={[6000, 16000]}
              ticks={[6000, 8500, 11000, 13500, 16000]}
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 8.5, fill: CHART_AXIS.tick }}
              tickFormatter={(v: number) => `${ribuan(v / 1000)}rb`}
              width={40}
            />
            <Tooltip
              contentStyle={CHART_TOOLTIP_STYLE}
              formatter={(v: number, name: string) => [
                `Rp ${ribuan(v)}/kg`,
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
                strokeDasharray={s.dash}
                dot={false}
                activeDot={{ r: 3.5 }}
                connectNulls={false}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
