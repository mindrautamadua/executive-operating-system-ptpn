"use client";

import {
  CartesianGrid,
  Line,
  LineChart,
  ReferenceArea,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { stokTrendHarian, stokTrendNote } from "@/lib/hilir-stok-margin-data";
import { CHART_AXIS, CHART_TOOLTIP_STYLE, PALETTE } from "@/lib/chart-palette";
import { useSubholding } from "@/components/SubholdingProvider";
import { ScopeEmpty, inScope } from "@/components/ui/CommodityScope";
import { SectionHead } from "../../hc/SectionHead";

/**
 * Tren stok CPO mingguan (hari jual) vs band kebijakan 15-30 hari.
 * Seluruh kartu berbasis CPO → milik PalmCo; pada cakupan lain tidak ada data.
 */
export function StokTrendChart() {
  const { active, def } = useSubholding();
  const relevan = inScope(active, "CPO");

  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-2.5 pt-3"
      style={{ "--d": "60ms" } as React.CSSProperties}
    >
      <SectionHead title="Tren Stok CPO vs Band Kebijakan" action={relevan ? "Lihat Detail" : undefined} />
      <p className="mt-[3px] text-[9px] text-ink-500">
        Posisi Stok Mingguan (hari jual) · band kebijakan 15-30 hari
      </p>

      {!relevan && <ScopeEmpty label={def.fullLabel} />}

      {relevan && (
      <>
      <div className="mt-1.5 min-h-0 w-full flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={stokTrendHarian} margin={{ top: 10, right: 12, bottom: 0, left: -26 }}>
            <CartesianGrid stroke={CHART_AXIS.grid} vertical={false} />
            <XAxis
              dataKey="minggu"
              tickLine={false}
              axisLine={{ stroke: CHART_AXIS.axis }}
              tick={{ fontSize: 8, fill: CHART_AXIS.tick }}
              interval={0}
            />
            <YAxis
              domain={[10, 35]}
              ticks={[10, 15, 20, 25, 30, 35]}
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 8, fill: CHART_AXIS.tick }}
            />
            <Tooltip
              formatter={(v: number) => [`${v} hari jual`, "Stok CPO"]}
              contentStyle={CHART_TOOLTIP_STYLE}
            />
            <ReferenceArea y1={15} y2={30} fill={PALETTE.green} fillOpacity={0.06} />
            <ReferenceLine y={30} stroke={PALETTE.amber} strokeDasharray="4 3" strokeWidth={1} />
            <ReferenceLine y={15} stroke={PALETTE.amber} strokeDasharray="4 3" strokeWidth={1} />
            <Line isAnimationActive={false}
              type="linear"
              dataKey="hariJual"
              stroke={PALETTE.blue}
              strokeWidth={1.8}
              dot={{ r: 2.5, strokeWidth: 0, fill: PALETTE.blue }}
              activeDot={{ r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <p className="mt-1 truncate text-[9px] text-ink-500" title={stokTrendNote}>
        {stokTrendNote}
      </p>
      </>
      )}
    </div>
  );
}
