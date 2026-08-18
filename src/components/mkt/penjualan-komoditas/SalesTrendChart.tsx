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
import { penjualanBulanan } from "@/lib/pemasaran-data";
import { CHART_AXIS, CHART_TOOLTIP_STYLE, PALETTE } from "@/lib/chart-palette";
import { SectionHead } from "@/components/hc/SectionHead";
import { useSubholding } from "@/components/SubholdingProvider";
import { inScope } from "@/components/ui/CommodityScope";
import { ScopeNote } from "@/components/ui/ScopeNote";

function LegendDot({ color, label }: { color: string; label: string }) {
  return (
    <span className="flex items-center gap-1">
      <span className="h-[6px] w-[6px] rounded-full" style={{ background: color }} />
      <span className="text-[9px] text-ink-500">{label}</span>
    </span>
  );
}

export function SalesTrendChart() {
  // Bar nilai = konsolidasi grup (ditandai ScopeNote); garis volume CPO milik
  // PalmCo sehingga diredupkan bila cakupan aktif bukan PalmCo.
  const { active } = useSubholding();
  const volOpacity = inScope(active, "CPO") ? 1 : 0.25;

  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-2.5 pt-3"
      style={{ "--d": "60ms" } as React.CSSProperties}
    >
      <SectionHead title="Tren Penjualan Bulanan" action="Lihat Detail" badge={<ScopeNote />} />
      <div className="mt-[3px] flex items-center justify-between gap-2">
        <p className="text-[9px] text-ink-500">
          Nilai penjualan (Rp T, bar) &amp; volume CPO (rb ton, garis) — 2026 vs 2025
        </p>
        <div className="flex shrink-0 items-center gap-2.5">
          <LegendDot color={PALETTE.green} label="Nilai 2026" />
          <LegendDot color={PALETTE.slate} label="Nilai 2025" />
          <LegendDot color={PALETTE.blue} label="Vol 2026" />
          <LegendDot color={PALETTE.blueSoft} label="Vol 2025" />
        </div>
      </div>

      <div className="mt-1.5 min-h-0 w-full flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart
            data={penjualanBulanan}
            margin={{ top: 8, right: -6, bottom: 0, left: -12 }}
            barCategoryGap="28%"
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
              yAxisId="nilai"
              domain={[0, 5]}
              ticks={[0, 1, 2, 3, 4, 5]}
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 8.5, fill: CHART_AXIS.tick }}
              width={30}
            />
            <YAxis
              yAxisId="vol"
              orientation="right"
              domain={[0, 250]}
              ticks={[0, 50, 100, 150, 200, 250]}
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 8, fill: CHART_AXIS.tick }}
              width={32}
            />
            <Tooltip
              formatter={(v: number, name: string) =>
                name.startsWith("Nilai")
                  ? [
                      `Rp ${v.toLocaleString("id-ID", { minimumFractionDigits: 2 })} T`,
                      name,
                    ]
                  : [`${v.toLocaleString("id-ID")} rb ton`, name]
              }
              contentStyle={CHART_TOOLTIP_STYLE}
            />
            <Bar
              yAxisId="nilai"
              dataKey="nilai2025"
              name="Nilai 2025"
              fill={PALETTE.slate}
              fillOpacity={0.45}
              radius={[2, 2, 0, 0]}
            />
            <Bar
              yAxisId="nilai"
              dataKey="nilai2026"
              name="Nilai 2026"
              fill={PALETTE.green}
              radius={[2, 2, 0, 0]}
            />
            <Line
              yAxisId="vol"
              type="linear"
              dataKey="vol2025"
              name="Vol 2025"
              stroke={PALETTE.blueSoft}
              strokeWidth={1.4}
              strokeDasharray="4 3"
              dot={false}
              opacity={volOpacity}
            />
            <Line
              yAxisId="vol"
              type="linear"
              dataKey="vol2026"
              name="Vol 2026"
              stroke={PALETTE.blue}
              strokeWidth={1.8}
              dot={{ r: 2 }}
              activeDot={{ r: 3.5 }}
              opacity={volOpacity}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      <p className="mt-1 text-[9px] leading-snug text-ink-500">
        Jan-Mei 2026: nilai Rp 19,9 T (102,3% RKAP YTD) · volume CPO 968 rb ton · Jun-Des = realisasi 2025
      </p>
    </div>
  );
}
