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
import { incidentBySeverity } from "@/lib/hse-data";
import { CHART_AXIS, CHART_TOOLTIP_STYLE } from "@/lib/chart-palette";
import { SectionHead } from "@/components/hc/SectionHead";
import { ScopeNote } from "@/components/ui/ScopeNote";

const pct = (v: number) => `${v.toLocaleString("id-ID", { minimumFractionDigits: 1 })}%`;

/** Distribusi 84 kecelakaan YTD per tingkat keparahan; kategori fatal disorot. */
export function IncidentBySeverity() {
  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-2.5 pt-3"
      style={{ "--d": "90ms" } as React.CSSProperties}
    >
      <SectionHead title="Insiden per Tingkat Keparahan" action="Lihat Detail" badge={<ScopeNote />} />
      <p className="mt-[3px] text-[9px] text-ink-500">
        84 Kecelakaan YTD 2026 · 10 kasus berat &amp; fatal (11,9%)
      </p>

      <div className="mt-1.5 min-h-0 w-full flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={incidentBySeverity}
            margin={{ top: 8, right: 8, bottom: 0, left: -18 }}
            barCategoryGap="28%"
          >
            <CartesianGrid stroke={CHART_AXIS.grid} vertical={false} />
            <XAxis
              dataKey="kategori"
              tickLine={false}
              axisLine={{ stroke: CHART_AXIS.axis }}
              tick={{ fontSize: 8.5, fill: CHART_AXIS.tick }}
            />
            <YAxis
              domain={[0, 60]}
              ticks={[0, 15, 30, 45, 60]}
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 8, fill: CHART_AXIS.tick }}
              width={34}
            />
            <Tooltip
              cursor={{ fill: "rgba(148,163,184,0.08)" }}
              contentStyle={CHART_TOOLTIP_STYLE}
              formatter={(v: number, _n: string, item) => {
                const r = item.payload as (typeof incidentBySeverity)[number];
                return [`${v} kasus · ${pct(r.pct)} · ${r.keterangan}`, r.kategori];
              }}
            />
            <Bar isAnimationActive={false} dataKey="jumlah" radius={[3, 3, 0, 0]} barSize={38}>
              {incidentBySeverity.map((r) => (
                <Cell
                  key={r.kategori}
                  fill={r.color}
                  fillOpacity={r.kategori === "Fatal" ? 1 : 0.85}
                  stroke={r.kategori === "Fatal" ? r.color : undefined}
                  strokeWidth={r.kategori === "Fatal" ? 2 : 0}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="flex items-center justify-between gap-2 border-t border-[#f4f7fa] pt-1.5">
        <p className="text-[9px] leading-snug text-ink-500">
          Rata-rata hari kerja hilang menanjak tajam: 3 hari (ringan) → 24 hari (sedang) → 312 hari
          (berat).
        </p>
        <span className="shrink-0 whitespace-nowrap text-[9px] font-extrabold text-[#ef4444]">
          2 insiden fatal
        </span>
      </div>
    </div>
  );
}
