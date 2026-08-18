"use client";

import {
  Area,
  CartesianGrid,
  ComposedChart,
  Legend,
  Line,
  ReferenceArea,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { cpoPriceBand, kiStats } from "@/lib/risk-data";
import { CHART_AXIS, CHART_TOOLTIP_STYLE, PALETTE } from "@/lib/chart-palette";
import { SectionHead } from "@/components/hc/SectionHead";
import { useSubholding } from "@/components/SubholdingProvider";

const RKAP = kiStats.asumsiRkapCpoRpKg;
const BAND_LOW = Math.round(RKAP * 0.9);
const BAND_HIGH = Math.round(RKAP * 1.1);

const rupiah = (v: number) => `Rp ${v.toLocaleString("id-ID")}`;

/**
 * Harga CPO KPBN 24 bulan aktual + forward curve 7 bulan dengan confidence band,
 * dibandingkan band asumsi RKAP ±10%.
 */
export function CpoPriceBand() {
  const { active, def } = useSubholding();
  // Harga CPO adalah eksposur komoditas sawit — cakupan PalmCo.
  const outOfScope = active !== "all" && active !== "palmco";

  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-2 pt-3"
      style={{ "--d": "60ms" } as React.CSSProperties}
    >
      <SectionHead title="Harga CPO — Aktual, Forward Curve & Band RKAP" />
      <p className="mt-[3px] text-[9px] text-ink-500">
        {outOfScope ? (
          `Eksposur harga CPO melekat pada PalmCo — di luar cakupan ${def.label}`
        ) : (
          <>
            24 Bulan Aktual KPBN vs Asumsi RKAP {rupiah(RKAP)}/kg (Band ±10%) · Rata-rata YTD{" "}
            {rupiah(kiStats.cpoAvgYtdRpKg)}/kg
          </>
        )}
      </p>

      <div
        className="mt-1.5 min-h-0 w-full flex-1 transition-opacity"
        style={{ opacity: outOfScope ? 0.25 : 1 }}
      >
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={cpoPriceBand} margin={{ top: 10, right: 14, bottom: 0, left: 2 }}>
            <CartesianGrid stroke={CHART_AXIS.grid} vertical={false} />
            <ReferenceArea
              y1={BAND_LOW}
              y2={BAND_HIGH}
              fill={PALETTE.green}
              fillOpacity={0.07}
              ifOverflow="extendDomain"
            />
            <ReferenceLine
              y={RKAP}
              stroke={PALETTE.green}
              strokeDasharray="4 3"
              strokeWidth={1.2}
            />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={{ stroke: CHART_AXIS.axis }}
              tick={{ fontSize: 8.5, fill: CHART_AXIS.tick }}
              interval={2}
            />
            <YAxis
              domain={[11000, 15000]}
              ticks={[11000, 12000, 13000, 14000, 15000]}
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 8.5, fill: CHART_AXIS.tick }}
              tickFormatter={(v: number) => `${(v / 1000).toFixed(0)}K`}
              width={30}
            />
            <Tooltip
              contentStyle={CHART_TOOLTIP_STYLE}
              formatter={(v: number | number[], name: string) =>
                Array.isArray(v)
                  ? [`${rupiah(v[0])} – ${rupiah(v[1])}`, name]
                  : [`${rupiah(v)}/kg`, name]
              }
            />
            <Legend
              verticalAlign="bottom"
              height={18}
              iconSize={7}
              wrapperStyle={{ fontSize: 8.5, color: "var(--chart-tick)" }}
            />
            <Area
              dataKey="band"
              name="Confidence Band"
              stroke="none"
              fill={PALETTE.blue}
              fillOpacity={0.12}
              connectNulls
              isAnimationActive={false}
            />
            <Line
              type="monotone"
              dataKey="cpo"
              name="Harga Aktual KPBN"
              stroke={PALETTE.navy}
              strokeWidth={1.8}
              dot={false}
              activeDot={{ r: 4 }}
              connectNulls
            />
            <Line
              type="monotone"
              dataKey="forward"
              name="Forward Curve"
              stroke={PALETTE.blue}
              strokeWidth={1.8}
              strokeDasharray="4 3"
              dot={false}
              activeDot={{ r: 4 }}
              connectNulls
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
