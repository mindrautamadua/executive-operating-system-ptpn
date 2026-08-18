"use client";

import {
  Bar,
  BarChart,
  Cell,
  LabelList,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { spendByCategory } from "@/lib/pgd-data";
import { CHART_AXIS, CHART_TOOLTIP_STYLE } from "@/lib/chart-palette";
import { SectionHead } from "@/components/hc/SectionHead";
import { ScopeNote } from "@/components/ui/ScopeNote";

const rp = (v: number) => `Rp ${v.toLocaleString("id-ID", { minimumFractionDigits: 2 })} T`;

export function SpendByCategory() {
  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-2.5 pt-3"
      style={{ "--d": "30ms" } as React.CSSProperties}
    >
      <SectionHead title="Belanja per Kategori" action="Lihat Detail" badge={<ScopeNote />} />
      <p className="mt-[3px] text-[9px] text-ink-500">
        Tujuh Kelompok Belanja (Rp T) · total Rp 12,4 T YTD
      </p>

      <div className="mt-1 min-h-0 w-full flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={spendByCategory}
            layout="vertical"
            margin={{ top: 4, right: 42, bottom: 0, left: 4 }}
          >
            <XAxis type="number" domain={[0, 4]} hide />
            <YAxis
              type="category"
              dataKey="name"
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 8, fill: CHART_AXIS.tick }}
              width={128}
            />
            <Tooltip
              cursor={{ fill: "transparent" }}
              contentStyle={CHART_TOOLTIP_STYLE}
              formatter={(v: number) => [rp(v), "Belanja YTD"]}
            />
            <Bar isAnimationActive={false} dataKey="valueRpT" radius={[0, 3, 3, 0]} barSize={13}>
              {spendByCategory.map((c) => (
                <Cell key={c.name} fill={c.color} />
              ))}
              <LabelList
                dataKey="valueRpT"
                position="right"
                formatter={(v: number) =>
                  `${v.toLocaleString("id-ID", { minimumFractionDigits: 2 })} T`
                }
                style={{ fontSize: 8, fill: "#334155", fontWeight: 700 }}
              />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <p className="pb-1 text-[9px] leading-snug text-ink-500">
        Pupuk &amp; agrokimia (29,0%) dan BBM &amp; energi (17,3%) menyerap 46,3% belanja — dua
        kategori paling terpapar kenaikan indeks harga input.
      </p>
    </div>
  );
}
