"use client";

import {
  CartesianGrid,
  Line,
  LineChart,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  ASUMSI_RKAP_CPO_RP_KG,
  commodityNote,
  commodityPriceSeries,
} from "@/lib/krk-data";
import { CHART_AXIS, CHART_TOOLTIP_STYLE, PALETTE } from "@/lib/chart-palette";
import { SectionHead } from "@/components/hc/SectionHead";
import { ScopeNote } from "@/components/ui/ScopeNote";

const rpKg = (v: number) => `Rp ${v.toLocaleString("id-ID")}/kg`;

export function CommodityPriceExposure() {
  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-2.5 pt-3"
      style={{ "--d": "120ms" } as React.CSSProperties}
    >
      <SectionHead title="Commodity Price Exposure" badge={<ScopeNote />} />
      <p className="mt-[3px] text-[9px] text-ink-500">
        Harga CPO &amp; Gula 24 Bulan (Rp/kg) — garis putus: asumsi RKAP CPO 13.500
      </p>

      <div className="mt-1.5 min-h-0 w-full flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={commodityPriceSeries}
            margin={{ top: 12, right: 12, bottom: 0, left: -8 }}
          >
            <CartesianGrid stroke={CHART_AXIS.grid} vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={{ stroke: CHART_AXIS.axis }}
              tick={{ fontSize: 8.5, fill: CHART_AXIS.tick }}
              interval={2}
            />
            <YAxis
              domain={[11000, 15500]}
              ticks={[11000, 12500, 14000, 15500]}
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 8.5, fill: CHART_AXIS.tick }}
              tickFormatter={(v: number) => `${(v / 1000).toLocaleString("id-ID")}K`}
              width={34}
            />
            <Tooltip
              contentStyle={CHART_TOOLTIP_STYLE}
              formatter={(v: number, name: string) => [
                rpKg(v),
                name === "cpo" ? "CPO (KPBN)" : "Gula (lelang)",
              ]}
            />
            <ReferenceLine
              y={ASUMSI_RKAP_CPO_RP_KG}
              stroke={PALETTE.red}
              strokeDasharray="5 3"
              label={{
                value: "Asumsi RKAP 13.500",
                position: "insideBottomRight",
                fontSize: 8.5,
                fill: PALETTE.red,
              }}
            />
            <Line isAnimationActive={false}
              type="monotone"
              dataKey="cpo"
              stroke={PALETTE.green}
              strokeWidth={1.8}
              dot={false}
              activeDot={{ r: 4 }}
            />
            <Line isAnimationActive={false}
              type="monotone"
              dataKey="gula"
              stroke={PALETTE.amber}
              strokeWidth={1.6}
              dot={false}
              activeDot={{ r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="flex items-start justify-between gap-4 pb-1">
        <p className="min-w-0 text-[9px] leading-snug text-ink-500">{commodityNote}</p>
        <div className="flex shrink-0 items-center gap-3.5">
          <span className="flex items-center gap-1.5 text-[8.5px] text-ink-500">
            <span className="h-[2px] w-[14px] rounded" style={{ background: PALETTE.green }} />
            CPO
          </span>
          <span className="flex items-center gap-1.5 text-[8.5px] text-ink-500">
            <span className="h-[2px] w-[14px] rounded" style={{ background: PALETTE.amber }} />
            Gula
          </span>
        </div>
      </div>
    </div>
  );
}
