"use client";

import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { priceIndexTrend } from "@/lib/pgd-data";
import { CHART_AXIS, CHART_TOOLTIP_STYLE, PALETTE } from "@/lib/chart-palette";
import { SectionHead } from "@/components/hc/SectionHead";
import { ScopeNote } from "@/components/ui/ScopeNote";

const SERIES = [
  { key: "npk", name: "Pupuk NPK", color: PALETTE.green },
  { key: "urea", name: "Pupuk Urea", color: PALETTE.teal },
  { key: "solar", name: "BBM Solar", color: PALETTE.blue },
  { key: "bahanKimia", name: "Bahan Kimia", color: PALETTE.purple },
];

export function PriceIndexTrend() {
  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-2.5 pt-3"
      style={{ "--d": "60ms" } as React.CSSProperties}
    >
      <SectionHead title="Indeks Harga Komoditas" action="Lihat Detail" badge={<ScopeNote />} />
      <p className="mt-[3px] text-[9px] text-ink-500">
        24 Bulan · 100 = Asumsi RKAP 2026 · komposit tertimbang +4,8%
      </p>

      <div className="mt-1 min-h-0 w-full flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={priceIndexTrend} margin={{ top: 10, right: 10, bottom: 0, left: -10 }}>
            <CartesianGrid stroke={CHART_AXIS.grid} vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={{ stroke: CHART_AXIS.axis }}
              tick={{ fontSize: 8, fill: CHART_AXIS.tick }}
              interval={3}
            />
            <YAxis
              domain={[92, 108]}
              ticks={[92, 96, 100, 104, 108]}
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 8.5, fill: CHART_AXIS.tick }}
              width={30}
            />
            <Tooltip
              contentStyle={CHART_TOOLTIP_STYLE}
              formatter={(v: number, name: string) => [
                v.toLocaleString("id-ID", { minimumFractionDigits: 1 }),
                name,
              ]}
            />
            <Legend
              verticalAlign="top"
              align="right"
              height={16}
              iconSize={7}
              wrapperStyle={{ fontSize: 8.5 }}
            />
            <ReferenceLine
              y={100}
              stroke={PALETTE.amber}
              strokeDasharray="4 3"
              label={{
                value: "Asumsi RKAP 2026",
                position: "insideBottomRight",
                fontSize: 8.5,
                fill: PALETTE.amber,
              }}
            />
            {SERIES.map((s) => (
              <Line isAnimationActive={false}
                key={s.key}
                name={s.name}
                type="monotone"
                dataKey={s.key}
                stroke={s.color}
                strokeWidth={1.6}
                dot={false}
                activeDot={{ r: 3.4 }}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>

      <p className="pb-1 text-[9px] leading-snug text-ink-500">
        Seluruh komoditas melewati garis asumsi RKAP sejak Q1 2025; NPK tertinggi (106,0) dan
        menekan komponen biaya pemeliharaan tanaman.
      </p>
    </div>
  );
}
