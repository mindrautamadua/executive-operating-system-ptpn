"use client";

import {
  CartesianGrid,
  Line,
  LineChart,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { ltifrTrend } from "@/lib/hse-data";
import { CHART_AXIS, CHART_TOOLTIP_STYLE, PALETTE } from "@/lib/chart-palette";
import { SectionHead } from "@/components/hc/SectionHead";
import { ScopeNote } from "@/components/ui/ScopeNote";

const label = (v: number) => v.toLocaleString("id-ID", { minimumFractionDigits: 2 });

/** Tren LTIFR rolling 12 bulan (24 titik) vs target internal & benchmark industri. */
export function LtifrTrend() {
  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-2.5 pt-3"
      style={{ "--d": "60ms" } as React.CSSProperties}
    >
      <SectionHead title="Tren LTIFR 24 Bulan" action="Lihat Detail" badge={<ScopeNote />} />
      <p className="mt-[3px] text-[9px] text-ink-500">
        LTIFR Rolling 12 Bulan · Jun 2024 – Mei 2026 · target internal ≤1,20 · benchmark industri
        sawit 1,10
      </p>

      <div className="mt-1.5 min-h-0 w-full flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={ltifrTrend} margin={{ top: 12, right: 14, bottom: 0, left: -14 }}>
            <CartesianGrid stroke={CHART_AXIS.grid} vertical={false} />
            <XAxis
              dataKey="bulan"
              tickLine={false}
              axisLine={{ stroke: CHART_AXIS.axis }}
              tick={{ fontSize: 8, fill: CHART_AXIS.tick }}
              interval={1}
            />
            <YAxis
              domain={[1.0, 1.9]}
              ticks={[1.0, 1.2, 1.4, 1.6, 1.8]}
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 8, fill: CHART_AXIS.tick }}
              tickFormatter={label}
              width={34}
            />
            <Tooltip
              contentStyle={CHART_TOOLTIP_STYLE}
              formatter={(v: number) => [label(v), "LTIFR"]}
            />
            <ReferenceLine
              y={1.2}
              stroke={PALETTE.amber}
              strokeWidth={1.4}
              strokeDasharray="4 3"
              label={{
                value: "Target 1,20",
                position: "insideTopRight",
                style: { fontSize: 8, fill: PALETTE.amber, fontWeight: 700 },
              }}
            />
            <ReferenceLine
              y={1.1}
              stroke={PALETTE.slate}
              strokeWidth={1.4}
              strokeDasharray="2 3"
              label={{
                value: "Benchmark Industri 1,10",
                position: "insideBottomRight",
                style: { fontSize: 8, fill: PALETTE.slate, fontWeight: 700 },
              }}
            />
            <Line isAnimationActive={false}
              name="LTIFR"
              type="monotone"
              dataKey="ltifr"
              stroke={PALETTE.green}
              strokeWidth={1.9}
              dot={{ r: 2 }}
              activeDot={{ r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <p className="pb-1 text-[9px] leading-snug text-ink-500">
        Perbaikan 24 bulan mencapai 0,36 poin (1,78 → 1,42), namun jarak ke target masih 0,22 poin;
        pada laju rata-rata 0,015 poin/bulan target ≤1,20 baru tercapai sekitar pertengahan 2027.
      </p>
    </div>
  );
}
