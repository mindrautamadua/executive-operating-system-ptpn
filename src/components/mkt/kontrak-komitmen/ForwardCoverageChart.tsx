"use client";

import {
  Bar,
  CartesianGrid,
  ComposedChart,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { forwardCoverage, forwardCoverageSummary } from "@/lib/kontrak-buyer-data";
import { CHART_AXIS, CHART_TOOLTIP_STYLE, PALETTE } from "@/lib/chart-palette";
import { ScopeNote } from "@/components/ui/ScopeNote";
import { SectionHead } from "@/components/hc/SectionHead";

function LegendDot({ color, label }: { color: string; label: string }) {
  return (
    <span className="flex items-center gap-1">
      <span className="h-[6px] w-[6px] rounded-full" style={{ background: color }} />
      <span className="text-[9px] text-ink-500">{label}</span>
    </span>
  );
}

/** Forward coverage H2 2026: committed vs uncommitted vs proyeksi produksi. */
export function ForwardCoverageChart() {
  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-2.5 pt-3"
      style={{ "--d": "60ms" } as React.CSSProperties}
    >
      {/* Posisi forward dikelola komite pemasaran grup — tanpa pecahan subholding. */}
      <SectionHead title="Forward Coverage H2 2026" action="Lihat Detail" badge={<ScopeNote />} />
      <div className="mt-[3px] flex items-center justify-between gap-2">
        <p className="text-[9px] text-ink-500">
          Volume CPO committed vs uncommitted per bulan (rb ton) vs proyeksi produksi
        </p>
        <div className="flex shrink-0 items-center gap-2.5">
          <LegendDot color={PALETTE.green} label="Committed" />
          <LegendDot color={PALETTE.slate} label="Uncommitted" />
          <LegendDot color={PALETTE.navy} label="Proyeksi Produksi" />
        </div>
      </div>

      <div className="mt-1.5 min-h-0 w-full flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart
            data={forwardCoverage}
            margin={{ top: 8, right: 8, bottom: 0, left: -18 }}
            barCategoryGap="32%"
          >
            <CartesianGrid stroke={CHART_AXIS.grid} vertical={false} />
            <XAxis
              dataKey="bulan"
              tickLine={false}
              axisLine={{ stroke: CHART_AXIS.axis }}
              tick={{ fontSize: 8.5, fill: CHART_AXIS.tick }}
              interval={0}
            />
            <YAxis
              domain={[0, 280]}
              ticks={[0, 70, 140, 210, 280]}
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 8.5, fill: CHART_AXIS.tick }}
            />
            <Tooltip
              cursor={{ fill: "rgba(148,163,184,0.08)" }}
              formatter={(v: number, name: string) => [`${v.toLocaleString("id-ID")} rb ton`, name]}
              contentStyle={CHART_TOOLTIP_STYLE}
            />
            <Bar
              dataKey="committed"
              name="Committed"
              stackId="cov"
              fill={PALETTE.green}
              radius={[0, 0, 0, 0]}
            />
            <Bar
              dataKey="uncommitted"
              name="Uncommitted"
              stackId="cov"
              fill={PALETTE.slate}
              fillOpacity={0.4}
              radius={[3, 3, 0, 0]}
            />
            <Line
              type="linear"
              dataKey="produksi"
              name="Proyeksi Produksi"
              stroke={PALETTE.navy}
              strokeWidth={1.6}
              strokeDasharray="5 3"
              dot={{ r: 2.5 }}
              activeDot={{ r: 4 }}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      <p className="mt-1 text-[9px] leading-snug text-ink-500">
        Total H2: committed {forwardCoverageSummary.committedRbTon} dari{" "}
        {forwardCoverageSummary.produksiH2RbTon.toLocaleString("id-ID")} rb ton ({forwardCoverageSummary.committedPct.toLocaleString("id-ID", { minimumFractionDigits: 1 })}%) ·
        batas kebijakan maks {forwardCoverageSummary.batasMaksPct}%
      </p>
    </div>
  );
}
