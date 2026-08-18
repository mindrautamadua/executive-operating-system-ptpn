"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { incidentByCause } from "@/lib/hse-data";
import { CHART_AXIS, CHART_TOOLTIP_STYLE } from "@/lib/chart-palette";
import { SectionHead } from "@/components/hc/SectionHead";
import { ScopeNote } from "@/components/ui/ScopeNote";

const pct = (v: number) => `${v.toLocaleString("id-ID", { minimumFractionDigits: 1 })}%`;

/** Klasifikasi penyebab akar hasil investigasi atas 84 kecelakaan YTD. */
export function IncidentByCause() {
  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-2.5 pt-3"
      style={{ "--d": "150ms" } as React.CSSProperties}
    >
      <SectionHead title="Insiden per Penyebab Akar" action="Lihat Detail" badge={<ScopeNote />} />
      <p className="mt-[3px] text-[9px] text-ink-500">
        Hasil Investigasi 84 Kecelakaan YTD · tindakan tidak aman 40,5%
      </p>

      <div className="mt-1.5 min-h-0 w-full flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={incidentByCause}
            margin={{ top: 8, right: 8, bottom: 0, left: -18 }}
            barCategoryGap="26%"
          >
            <CartesianGrid stroke={CHART_AXIS.grid} vertical={false} />
            <XAxis
              dataKey="penyebab"
              tickLine={false}
              axisLine={{ stroke: CHART_AXIS.axis }}
              tick={{ fontSize: 8, fill: CHART_AXIS.tick }}
              interval={0}
            />
            <YAxis
              domain={[0, 40]}
              ticks={[0, 10, 20, 30, 40]}
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 8, fill: CHART_AXIS.tick }}
              width={34}
            />
            <Tooltip
              cursor={{ fill: "rgba(148,163,184,0.08)" }}
              contentStyle={CHART_TOOLTIP_STYLE}
              formatter={(v: number, _n: string, item) => {
                const r = item.payload as (typeof incidentByCause)[number];
                return [`${v} kasus · ${pct(r.pct)} · ${r.contoh}`, r.penyebab];
              }}
            />
            <Bar isAnimationActive={false} dataKey="jumlah" radius={[3, 3, 0, 0]} barSize={30}>
              {incidentByCause.map((r) => (
                <Cell key={r.penyebab} fill={r.color} fillOpacity={0.85} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <p className="pb-1 text-[9px] leading-snug text-ink-500">
        Faktor perilaku &amp; pengawasan (tindakan tidak aman 40,5%) melampaui faktor infrastruktur
        (kondisi tidak aman 25,0%) — intervensi utama ada pada observasi mandor, bukan belanja modal.
      </p>
    </div>
  );
}
