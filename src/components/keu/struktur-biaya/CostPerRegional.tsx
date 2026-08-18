"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  LabelList,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { costPerRegional, HPP_CPO_TARGET_RP_KG } from "@/lib/ksb-data";
import { CHART_AXIS, CHART_TOOLTIP_STYLE, PALETTE, SEMANTIC } from "@/lib/chart-palette";
import { SectionHead } from "../../hc/SectionHead";
import { useSubholding } from "@/components/SubholdingProvider";

const ribuan = (v: number) => v.toLocaleString("id-ID");

/**
 * HPP/kg CPO per regional vs garis target Rp 8.700.
 *
 * Regional 1–7 adalah pecahan internal PalmCo (kebun & PKS sawit), bukan
 * dimensi grup: tidak ada padanannya di SugarCo maupun SupportingCo. Karena
 * itu kartu tampil normal pada cakupan "semua" dan PalmCo, lalu diredupkan
 * dengan keterangan saat cakupan lain dipilih.
 */
export function CostPerRegional() {
  const { active, isFiltered } = useSubholding();
  const inScope = !isFiltered || active === "palmco";

  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-2.5 pt-3"
      style={{ "--d": "180ms" } as React.CSSProperties}
    >
      <SectionHead title="HPP per Regional" />
      <p className="mt-[3px] text-[9px] text-ink-500">
        HPP/kg CPO vs Target Rp {ribuan(HPP_CPO_TARGET_RP_KG)}
        {inScope ? "" : " — pecahan regional hanya untuk PalmCo"}
      </p>

      <div
        className="mt-1.5 min-h-0 w-full flex-1 transition-opacity"
        style={{ opacity: inScope ? 1 : 0.25 }}
      >
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={costPerRegional}
            layout="vertical"
            margin={{ top: 0, right: 40, bottom: 0, left: 8 }}
            barCategoryGap="28%"
          >
            <CartesianGrid stroke={CHART_AXIS.grid} horizontal={false} />
            <XAxis
              type="number"
              domain={[8000, 10000]}
              ticks={[8000, 8500, 9000, 9500, 10000]}
              tickLine={false}
              axisLine={{ stroke: CHART_AXIS.axis }}
              tick={{ fontSize: 8.5, fill: CHART_AXIS.tick }}
              tickFormatter={(v: number) => `${(v / 1000).toLocaleString("id-ID")}rb`}
            />
            <YAxis
              type="category"
              dataKey="regional"
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 8.5, fill: CHART_AXIS.tick }}
              width={122}
            />
            <ReferenceLine
              x={HPP_CPO_TARGET_RP_KG}
              stroke={PALETTE.navy}
              strokeDasharray="4 4"
              label={{
                value: "Target",
                position: "insideTopRight",
                style: { fontSize: 8.5, fill: PALETTE.navy, fontWeight: 800 },
              }}
            />
            <Tooltip
              cursor={{ fill: "rgba(148,163,184,0.08)" }}
              contentStyle={CHART_TOOLTIP_STYLE}
              formatter={(v: number, _n: string, item: { payload?: { gapRpKg?: number } }) => [
                `Rp ${ribuan(v)}/kg (${(item.payload?.gapRpKg ?? 0) > 0 ? "+" : ""}${ribuan(item.payload?.gapRpKg ?? 0)} vs target)`,
                "HPP/kg CPO",
              ]}
            />
            <Bar isAnimationActive={false} dataKey="hppRpKg" radius={[0, 3, 3, 0]} maxBarSize={13}>
              {costPerRegional.map((d) => (
                <Cell key={d.regional} fill={SEMANTIC[d.tone]} />
              ))}
              <LabelList
                dataKey="hppRpKg"
                position="right"
                offset={5}
                formatter={(v: number) => ribuan(v)}
                style={{ fontSize: 8.5, fill: "#334155", fontWeight: 700 }}
              />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
