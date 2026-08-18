"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  LabelList,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { spendBreakdown } from "@/lib/tik-data-detail";
import { CHART_AXIS, CHART_TOOLTIP_STYLE } from "@/lib/chart-palette";
import { SectionHead } from "@/components/hc/SectionHead";
import { ScopeNote } from "@/components/ui/ScopeNote";

const rupiah = (v: number) => v.toLocaleString("id-ID", { minimumFractionDigits: 2 });

const data = spendBreakdown;

export function SpendBreakdown() {
  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-2.5 pt-3"
      style={{ "--d": "60ms" } as React.CSSProperties}
    >
      <SectionHead title="Rincian Belanja TI" action="Lihat Detail" badge={<ScopeNote />} />
      <p className="mt-[3px] text-[9px] text-ink-500">
        5 Komponen · Total Rp 0,92 T (Capex Rp 0,50 T + Opex Rp 0,42 T)
      </p>

      <div className="mt-1.5 min-h-0 w-full flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            layout="vertical"
            margin={{ top: 4, right: 44, bottom: 0, left: 74 }}
          >
            <CartesianGrid stroke={CHART_AXIS.grid} horizontal={false} />
            <XAxis
              type="number"
              domain={[0, 0.3]}
              ticks={[0, 0.1, 0.2, 0.3]}
              tickLine={false}
              axisLine={{ stroke: CHART_AXIS.axis }}
              tick={{ fontSize: 8, fill: CHART_AXIS.tick }}
              tickFormatter={(v: number) => rupiah(v)}
            />
            <YAxis
              type="category"
              dataKey="kategori"
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 8, fill: CHART_AXIS.tick }}
              width={74}
            />
            <Tooltip
              cursor={{ fill: "rgba(148,163,184,0.08)" }}
              contentStyle={CHART_TOOLTIP_STYLE}
              formatter={(v: number) => [`Rp ${rupiah(v)} T`, "Belanja FY"]}
              labelFormatter={(label: string) => {
                const row = data.find((d) => d.kategori === label);
                return row
                  ? `${row.kategori} · ${row.pct}% · capex Rp ${rupiah(row.capexRpT)} T / opex Rp ${rupiah(row.opexRpT)} T`
                  : label;
              }}
            />
            <Bar isAnimationActive={false} dataKey="nilaiRpT" radius={[0, 3, 3, 0]} maxBarSize={20}>
              {data.map((d) => (
                <Cell key={d.kategori} fill={d.color} />
              ))}
              <LabelList
                dataKey="pct"
                position="right"
                offset={5}
                formatter={(v: React.ReactNode) => `${v}%`}
                style={{ fontSize: 8.5, fill: "#334155", fontWeight: 700 }}
              />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <p className="pb-1 text-[9px] leading-snug text-ink-500">
        Keamanan siber hanya 11,9% (Rp 0,11 T) — di bawah praktik BUMN sejenis 15–18% padahal satu
        limit breach teknologi ada di domain ini.
      </p>
    </div>
  );
}
