"use client";

import {
  Bar,
  CartesianGrid,
  ComposedChart,
  Legend,
  Line,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { legalWorkloadTrend } from "@/lib/hkm-data";
import { CHART_AXIS, CHART_TOOLTIP_STYLE, PALETTE } from "@/lib/chart-palette";
import { SectionHead } from "@/components/hc/SectionHead";
import { ScopeNote } from "@/components/ui/ScopeNote";

/** Backlog bulanan = selisih permintaan masuk dan selesai. */
const data = legalWorkloadTrend.map((p) => ({ ...p, backlog: p.masuk - p.selesai }));

export function LegalWorkloadTrend() {
  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-2.5 pt-3"
      style={{ "--d": "120ms" } as React.CSSProperties}
    >
      <SectionHead title="Beban Kerja Legal 12 Bulan" action="Lihat Detail" badge={<ScopeNote />} />
      <p className="mt-[3px] text-[9px] text-ink-500">
        Permintaan Masuk vs Selesai · SLA 5 hari kerja · on-time YTD 82%
      </p>

      <div className="mt-1.5 min-h-0 w-full flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={data} margin={{ top: 12, right: 14, bottom: 0, left: -18 }}>
            <CartesianGrid stroke={CHART_AXIS.grid} vertical={false} />
            <XAxis
              dataKey="bulan"
              tickLine={false}
              axisLine={{ stroke: CHART_AXIS.axis }}
              tick={{ fontSize: 8, fill: CHART_AXIS.tick }}
            />
            <YAxis
              domain={[0, 80]}
              ticks={[0, 20, 40, 60, 80]}
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 8.5, fill: CHART_AXIS.tick }}
              width={34}
            />
            <Tooltip
              contentStyle={CHART_TOOLTIP_STYLE}
              formatter={(v: number, name: string) => [`${v.toLocaleString("id-ID")}`, name]}
            />
            <Legend
              verticalAlign="top"
              align="right"
              height={16}
              iconSize={8}
              wrapperStyle={{ fontSize: 8.5 }}
            />
            <ReferenceLine
              y={58}
              stroke={CHART_AXIS.axis}
              strokeDasharray="3 3"
              label={{
                value: "Kapasitas ±58/bln",
                position: "insideTopLeft",
                fontSize: 8.5,
                fill: CHART_AXIS.tick,
              }}
            />
            <Bar
              name="Permintaan Masuk"
              dataKey="masuk"
              fill={PALETTE.blueSoft}
              radius={[3, 3, 0, 0]}
              barSize={11}
            />
            <Bar
              name="Selesai"
              dataKey="selesai"
              fill={PALETTE.green}
              radius={[3, 3, 0, 0]}
              barSize={11}
            />
            <Line
              name="Backlog Bulan Berjalan"
              type="monotone"
              dataKey="backlog"
              stroke={PALETTE.red}
              strokeWidth={1.6}
              dot={{ r: 2 }}
              activeDot={{ r: 4 }}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      <p className="pb-1 text-[9px] leading-snug text-ink-500">
        Permintaan masuk melampaui penyelesaian sejak Des 2025; backlog bulanan naik ke 10–12 berkas
        dan menahan on-time SLA di 82%.
      </p>
    </div>
  );
}
