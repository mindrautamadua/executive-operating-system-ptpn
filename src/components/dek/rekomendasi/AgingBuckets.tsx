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
import { agingBuckets } from "@/lib/dek-data";
import { CHART_AXIS, CHART_TOOLTIP_STYLE } from "@/lib/chart-palette";
import { SectionHead } from "@/components/hc/SectionHead";
import { ScopeNote } from "@/components/ui/ScopeNote";

/** Umur 17 rekomendasi terbuka (8 berjalan + 9 overdue) per rentang hari. */
export function AgingBuckets() {
  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-2.5 pt-3"
      style={{ "--d": "180ms" } as React.CSSProperties}
    >
      <SectionHead title="Umur Rekomendasi Terbuka" badge={<ScopeNote />} />
      <p className="mt-[3px] text-[9px] text-ink-500">
        17 Butir Terbuka · 5 butir sudah melewati 60 hari
      </p>

      <div className="mt-1.5 min-h-0 w-full flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={agingBuckets} margin={{ top: 14, right: 10, bottom: 0, left: -22 }}>
            <CartesianGrid stroke={CHART_AXIS.grid} vertical={false} />
            <XAxis
              dataKey="bucket"
              tickLine={false}
              axisLine={{ stroke: CHART_AXIS.axis }}
              tick={{ fontSize: 8, fill: CHART_AXIS.tick }}
              interval={0}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 8.5, fill: CHART_AXIS.tick }}
              width={32}
            />
            <Tooltip
              contentStyle={CHART_TOOLTIP_STYLE}
              formatter={(v: number) => [`${v.toLocaleString("id-ID")} butir`, "Terbuka"]}
            />
            <Bar isAnimationActive={false} dataKey="jumlah" radius={[3, 3, 0, 0]} barSize={34}>
              <LabelList
                dataKey="porsi"
                position="top"
                style={{ fontSize: 8, fontWeight: 700, fill: CHART_AXIS.tick }}
              />
              {agingBuckets.map((b) => (
                <Cell key={b.bucket} fill={b.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <p className="pb-1 text-[9px] leading-snug text-ink-500">
        Dua butir di atas 90 hari menjadi prasyarat tanggapan Dekom atas permohonan persetujuan yang
        sedang menunggu.
      </p>
    </div>
  );
}
