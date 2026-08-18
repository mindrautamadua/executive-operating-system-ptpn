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
import { reviewSlaTrend } from "@/lib/hkm-data";
import { CHART_AXIS, CHART_TOOLTIP_STYLE, PALETTE } from "@/lib/chart-palette";
import { SectionHead } from "@/components/hc/SectionHead";
import { ScopeNote } from "@/components/ui/ScopeNote";

const angka = (v: number) => v.toLocaleString("id-ID", { minimumFractionDigits: 1 });

export function ReviewSlaTrend() {
  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-2.5 pt-3"
      style={{ "--d": "150ms" } as React.CSSProperties}
    >
      <SectionHead title="Tren SLA Review Kontrak" action="Lihat Detail" badge={<ScopeNote />} />
      <p className="mt-[3px] text-[9px] text-ink-500">
        Rata-rata Waktu Review (hari) vs SLA 5 Hari Kerja · Mei 2026: 6,2 hari
      </p>

      <div className="mt-1.5 min-h-0 w-full flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={reviewSlaTrend} margin={{ top: 12, right: 12, bottom: 0, left: -20 }}>
            <CartesianGrid stroke={CHART_AXIS.grid} vertical={false} />
            <XAxis
              dataKey="bulan"
              tickLine={false}
              axisLine={{ stroke: CHART_AXIS.axis }}
              tick={{ fontSize: 8.5, fill: CHART_AXIS.tick }}
            />
            <YAxis
              domain={[4, 7]}
              ticks={[4, 5, 6, 7]}
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 8.5, fill: CHART_AXIS.tick }}
              tickFormatter={(v: number) => angka(v)}
              width={38}
            />
            <Tooltip
              contentStyle={CHART_TOOLTIP_STYLE}
              formatter={(v: number, name: string) => [`${angka(v)} hari`, name]}
              labelFormatter={(l: string) => {
                const row = reviewSlaTrend.find((p) => p.bulan === l);
                return row ? `${l} · ${row.volume} dokumen · on-time ${row.onTimePct}%` : l;
              }}
            />
            <Legend
              verticalAlign="top"
              align="right"
              height={16}
              iconSize={8}
              wrapperStyle={{ fontSize: 8.5 }}
            />
            <ReferenceLine
              y={5}
              stroke={PALETTE.amber}
              strokeDasharray="4 3"
              label={{
                value: "SLA 5 hari",
                position: "insideTopLeft",
                fontSize: 8.5,
                fill: CHART_AXIS.tick,
              }}
            />
            <Line
              name="Rata-rata Waktu Review"
              type="monotone"
              dataKey="rataHari"
              stroke={PALETTE.red}
              strokeWidth={1.9}
              dot={{ r: 2.2 }}
              activeDot={{ r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <p className="pb-1 text-[9px] leading-snug text-ink-500">
        Waktu review melewati SLA sejak Des 2025 dan memuncak 6,5 hari pada April; on-time turun dari
        89% ke 82% seiring volume naik ke 55–58 dokumen/bulan.
      </p>
    </div>
  );
}
