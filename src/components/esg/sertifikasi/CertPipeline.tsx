"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { certPipeline } from "@/lib/esg-data";
import { CHART_AXIS, CHART_TOOLTIP_STYLE, PALETTE } from "@/lib/chart-palette";
import { SectionHead } from "@/components/hc/SectionHead";
import { ScopeNote } from "@/components/ui/ScopeNote";

export function CertPipeline() {
  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-2.5 pt-3"
      style={{ "--d": "90ms" } as React.CSSProperties}
    >
      <SectionHead title="Pipeline Sertifikasi per Kuartal" action="Lihat Detail" badge={<ScopeNote />} />
      <p className="mt-[3px] text-[9px] text-ink-500">
        Jumlah Unit per Tahapan Audit · 12 Unit menuju ≥90% Areal 2027
      </p>

      <div className="mt-1.5 min-h-0 w-full flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={certPipeline} margin={{ top: 12, right: 10, bottom: 0, left: -20 }}>
            <CartesianGrid stroke={CHART_AXIS.grid} vertical={false} />
            <XAxis
              dataKey="kuartal"
              tickLine={false}
              axisLine={{ stroke: CHART_AXIS.axis }}
              tick={{ fontSize: 8.5, fill: CHART_AXIS.tick }}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 8.5, fill: CHART_AXIS.tick }}
              width={34}
            />
            <Tooltip
              contentStyle={CHART_TOOLTIP_STYLE}
              formatter={(v: number, name: string) => [`${v} unit`, name]}
            />
            <Legend
              verticalAlign="top"
              align="right"
              height={16}
              iconSize={8}
              wrapperStyle={{ fontSize: 8.5 }}
            />
            <Bar isAnimationActive={false} name="Audit Stage 1" dataKey="stage1" stackId="p" fill={PALETTE.blueSoft} />
            <Bar isAnimationActive={false} name="Audit Stage 2" dataKey="stage2" stackId="p" fill={PALETTE.blue} />
            <Bar isAnimationActive={false} name="Closing NC" dataKey="closingNc" stackId="p" fill={PALETTE.amber} />
            <Bar isAnimationActive={false}
              name="Sertifikat Terbit"
              dataKey="terbit"
              stackId="p"
              fill={PALETTE.green}
              radius={[3, 3, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <p className="pb-1 text-[9px] leading-snug text-ink-500">
        Beban audit terberat pada Q3–Q4 2026 (7 unit stage 1–2 per kuartal) — slot lembaga
        sertifikasi perlu dikunci lebih awal.
      </p>
    </div>
  );
}
