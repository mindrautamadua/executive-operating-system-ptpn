"use client";

import {
  Bar,
  CartesianGrid,
  Cell,
  ComposedChart,
  LabelList,
  Legend,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { ageYieldNote, ageYieldProfile } from "@/lib/apd-data";
import { CHART_AXIS, CHART_TOOLTIP_STYLE, PALETTE } from "@/lib/chart-palette";
import { SectionHead } from "@/components/hc/SectionHead";
import { useSubholding } from "@/components/SubholdingProvider";

const num = (v: number) =>
  v.toLocaleString("id-ID", { minimumFractionDigits: 1, maximumFractionDigits: 1 });

/** TBM abu, muda biru, prima hijau, tua amber, renta merah. */
const FILLS = [PALETTE.slate, PALETTE.blue, PALETTE.green, PALETTE.amber, PALETTE.red];

/** Luas areal per kelompok umur (bar) dipasangkan dengan kurva yield-nya. */
export function AgeYieldProfile() {
  const { active } = useSubholding();
  // Pemetaan domain: profil umur 508,7 rb ha adalah areal tanaman sawit PalmCo.
  const outOfScope = active !== "all" && active !== "palmco";

  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-2.5 pt-3"
      style={{ "--d": "60ms" } as React.CSSProperties}
    >
      <SectionHead title="Profil Umur Tanaman × Yield" action="Lihat Detail" />
      <p className="mt-[3px] text-[9px] text-ink-500">
        {outOfScope
          ? "Profil umur tanaman hanya untuk areal sawit PalmCo"
          : "Luas Areal (rb ha) per Kelompok Umur & Kurva Yield (t/ha) · 508,7 rb Ha"}
      </p>

      <div
        className="mt-1.5 min-h-0 w-full flex-1 transition-opacity"
        style={{ opacity: outOfScope ? 0.25 : 1 }}
      >
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart
            data={ageYieldProfile}
            margin={{ top: 16, right: 4, bottom: 0, left: -16 }}
            barCategoryGap="26%"
          >
            <CartesianGrid stroke={CHART_AXIS.grid} vertical={false} />
            <XAxis
              dataKey="bucket"
              tickLine={false}
              axisLine={{ stroke: CHART_AXIS.axis }}
              tick={{ fontSize: 8, fill: CHART_AXIS.tick }}
              interval={0}
            />
            <YAxis
              yAxisId="left"
              domain={[0, 240]}
              ticks={[0, 60, 120, 180, 240]}
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 8, fill: CHART_AXIS.tick }}
              width={36}
            />
            <YAxis
              yAxisId="right"
              orientation="right"
              domain={[0, 30]}
              ticks={[0, 10, 20, 30]}
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 8, fill: CHART_AXIS.tick }}
              width={26}
            />
            <Tooltip
              cursor={{ fill: "rgba(148,163,184,0.08)" }}
              contentStyle={CHART_TOOLTIP_STYLE}
              formatter={(v: number, n: string) => [
                n === "Yield" ? `${num(v)} t/ha` : `${num(v)} rb ha`,
                n,
              ]}
            />
            <Legend
              verticalAlign="top"
              align="right"
              height={14}
              iconType="circle"
              iconSize={7}
              wrapperStyle={{ fontSize: 8.5, color: CHART_AXIS.tick }}
            />
            <Bar isAnimationActive={false} yAxisId="left" dataKey="luasRbHa" name="Luas" radius={[3, 3, 0, 0]} maxBarSize={38}>
              {ageYieldProfile.map((d, i) => (
                <Cell key={d.bucket} fill={FILLS[i]} fillOpacity={0.85} />
              ))}
              <LabelList
                dataKey="luasRbHa"
                position="top"
                offset={5}
                formatter={(v: React.ReactNode) => num(Number(v))}
                style={{ fontSize: 8.5, fill: "#334155", fontWeight: 700 }}
              />
            </Bar>
            <Line isAnimationActive={false}
              yAxisId="right"
              type="monotone"
              dataKey="yieldTonHa"
              name="Yield"
              stroke={PALETTE.navy}
              strokeWidth={1.8}
              dot={{ r: 2.4 }}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      <p className="pb-1 text-[9px] leading-snug text-ink-500">{ageYieldNote}</p>
    </div>
  );
}
