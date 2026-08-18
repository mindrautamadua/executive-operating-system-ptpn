"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { savingsByCategory, PGD_STATUS_COLOR } from "@/lib/pgd-data";
import { CHART_AXIS, CHART_TOOLTIP_STYLE, PALETTE } from "@/lib/chart-palette";
import { SectionHead } from "@/components/hc/SectionHead";
import { ScopeNote } from "@/components/ui/ScopeNote";

const rpM = (v: number) => `Rp ${v.toLocaleString("id-ID")} M`;

export function SavingsByCategory() {
  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-2.5 pt-3"
      style={{ "--d": "150ms" } as React.CSSProperties}
    >
      <SectionHead title="Penghematan per Kategori" action="Lihat Detail" badge={<ScopeNote />} />
      <p className="mt-[3px] text-[9px] text-ink-500">
        Realisasi YTD vs Target FY (Rp M) · kontribusi ke Rp 386 M dari target Rp 850 M
      </p>

      <div className="mt-1 min-h-0 w-full flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={savingsByCategory} margin={{ top: 10, right: 6, bottom: 0, left: -12 }}>
            <CartesianGrid stroke={CHART_AXIS.grid} vertical={false} />
            <XAxis
              dataKey="kategori"
              tickLine={false}
              axisLine={{ stroke: CHART_AXIS.axis }}
              tick={{ fontSize: 8, fill: CHART_AXIS.tick }}
              interval={0}
              tickFormatter={(v: string) => v.split(" ")[0]}
            />
            <YAxis
              domain={[0, 300]}
              ticks={[0, 100, 200, 300]}
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 8.5, fill: CHART_AXIS.tick }}
              width={34}
            />
            <Tooltip
              cursor={{ fill: "transparent" }}
              contentStyle={CHART_TOOLTIP_STYLE}
              formatter={(v: number, name: string) => [rpM(v), name]}
            />
            <Legend
              verticalAlign="top"
              align="right"
              height={16}
              iconSize={7}
              wrapperStyle={{ fontSize: 8.5 }}
            />
            <Bar
              name="Target FY"
              dataKey="targetFyRpM"
              fill={PALETTE.slate}
              fillOpacity={0.35}
              radius={[3, 3, 0, 0]}
              barSize={16}
            />
            <Bar name="Realisasi YTD" dataKey="realisasiRpM" radius={[3, 3, 0, 0]} barSize={16}>
              {savingsByCategory.map((s) => (
                <Cell key={s.kategori} fill={PGD_STATUS_COLOR[s.status]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <p className="pb-1 text-[9px] leading-snug text-ink-500">
        Pupuk &amp; agrokimia menyumbang Rp 124 M (32,1% total penghematan); TI &amp; lisensi
        tertinggal di 38,1% target FY.
      </p>
    </div>
  );
}
