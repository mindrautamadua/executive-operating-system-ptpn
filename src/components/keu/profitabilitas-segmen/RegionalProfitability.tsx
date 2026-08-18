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
import { regionalProfitability } from "@/lib/kps-data";
import { fmtId } from "@/lib/keu-core";
import { CHART_AXIS, CHART_TOOLTIP_STYLE, SEMANTIC } from "@/lib/chart-palette";
import { useSubholding } from "@/components/SubholdingProvider";
import { SectionHead } from "../../hc/SectionHead";

/** Bar horizontal EBITDA/ha 7 regional PalmCo (annualized). */
export function RegionalProfitability() {
  const { active } = useSubholding();
  // Regional 1..7 adalah pecahan internal PalmCo (pabrik/PG milik SugarCo),
  // jadi seluruh kartu ini berada di cakupan PalmCo.
  const outOfScope = active !== "all" && active !== "palmco";

  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-2.5 pt-3"
      style={{ "--d": "120ms" } as React.CSSProperties}
    >
      <SectionHead title="Regional Profitability (PalmCo)" />
      <p className="mt-[3px] text-[9px] text-ink-500">
        {outOfScope
          ? "Pecahan regional hanya untuk PalmCo"
          : "EBITDA per Hektar Tertanam · Rp juta/ha (annualized)"}
      </p>

      <div
        className="mt-1.5 min-h-0 w-full flex-1 transition-opacity"
        style={{ opacity: outOfScope ? 0.25 : 1 }}
      >
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={regionalProfitability}
            layout="vertical"
            margin={{ top: 0, right: 30, bottom: 0, left: 8 }}
            barCategoryGap="28%"
          >
            <CartesianGrid stroke={CHART_AXIS.grid} horizontal={false} />
            <XAxis
              type="number"
              domain={[0, 35]}
              ticks={[0, 10, 20, 30]}
              tickLine={false}
              axisLine={{ stroke: CHART_AXIS.axis }}
              tick={{ fontSize: 8.5, fill: CHART_AXIS.tick }}
            />
            <YAxis
              type="category"
              dataKey="regional"
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 8.5, fill: CHART_AXIS.tick }}
              width={122}
            />
            <Tooltip
              cursor={{ fill: "rgba(148,163,184,0.08)" }}
              contentStyle={CHART_TOOLTIP_STYLE}
              formatter={(v: number, _n: string, item: { payload?: { yieldTbsTonHa?: number } }) => [
                `Rp ${fmtId(v, 1)} jt/ha · yield ${fmtId(item.payload?.yieldTbsTonHa ?? 0, 1)} ton/ha`,
                "EBITDA/ha",
              ]}
            />
            <Bar dataKey="ebitdaPerHaRpJt" radius={[0, 3, 3, 0]} maxBarSize={14}>
              {regionalProfitability.map((d) => (
                <Cell key={d.regional} fill={SEMANTIC[d.tone]} />
              ))}
              <LabelList
                dataKey="ebitdaPerHaRpJt"
                position="right"
                offset={5}
                formatter={(v: number) => fmtId(v, 1)}
                style={{ fontSize: 8.5, fill: "#334155", fontWeight: 700 }}
              />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
