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
import { closureTrend } from "@/lib/dek-data";
import { CHART_AXIS, CHART_TOOLTIP_STYLE, PALETTE } from "@/lib/chart-palette";
import { SectionHead } from "@/components/hc/SectionHead";
import { ScopeNote } from "@/components/ui/ScopeNote";

/** Kumulatif terbit vs selesai per tahun buku; kumulatif direset tiap Januari. */
export function ClosureTrend() {
  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-2.5 pt-3"
      style={{ "--d": "210ms" } as React.CSSProperties}
    >
      <SectionHead title="Tren Penyelesaian Kumulatif" action="Lihat Detail" badge={<ScopeNote />} />
      <p className="mt-[3px] text-[9px] text-ink-500">
        Kumulatif per Tahun Buku (butir) · direset tiap Januari · Mei 2026: 68 terbit / 51 selesai
      </p>

      <div className="mt-1.5 min-h-0 w-full flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={closureTrend} margin={{ top: 8, right: 14, bottom: 0, left: -20 }}>
            <CartesianGrid stroke={CHART_AXIS.grid} vertical={false} />
            <XAxis
              dataKey="bulan"
              tickLine={false}
              axisLine={{ stroke: CHART_AXIS.axis }}
              tick={{ fontSize: 8.5, fill: CHART_AXIS.tick }}
              interval={0}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 8.5, fill: CHART_AXIS.tick }}
              width={34}
            />
            <Tooltip
              contentStyle={CHART_TOOLTIP_STYLE}
              formatter={(v: number, name: string) => [`${v.toLocaleString("id-ID")} butir`, name]}
            />
            <Legend
              verticalAlign="top"
              align="right"
              height={16}
              iconSize={7}
              wrapperStyle={{ fontSize: 8.5 }}
            />
            <Line isAnimationActive={false}
              name="Terbit Kumulatif"
              type="monotone"
              dataKey="terbitKumulatif"
              stroke={PALETTE.blue}
              strokeWidth={1.9}
              dot={{ r: 2.4 }}
              activeDot={{ r: 4 }}
            />
            <Line isAnimationActive={false}
              name="Selesai Kumulatif"
              type="monotone"
              dataKey="selesaiKumulatif"
              stroke={PALETTE.green}
              strokeWidth={1.9}
              dot={{ r: 2.4 }}
              activeDot={{ r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <p className="pb-1 text-[9px] leading-snug text-ink-500">
        Selisih kumulatif melebar dari 2 butir (Januari) ke 17 butir (Mei) — backlog tumbuh lebih
        cepat daripada laju penutupan.
      </p>
    </div>
  );
}
