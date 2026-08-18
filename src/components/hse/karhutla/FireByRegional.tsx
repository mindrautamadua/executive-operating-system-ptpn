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
import { fireByRegional } from "@/lib/hse-data-detail";
import { HSE_RISK_COLOR } from "@/lib/hse-data";
import type { HseRiskLevel } from "@/lib/hse-data";
import { CHART_AXIS, CHART_TOOLTIP_STYLE } from "@/lib/chart-palette";
import { SectionHead } from "@/components/hc/SectionHead";
import { useSubholding } from "@/components/SubholdingProvider";

const LEGENDA: HseRiskLevel[] = ["Rendah", "Sedang", "Tinggi", "Sangat Tinggi"];

const data = fireByRegional.map((r) => ({ ...r, label: r.regional.replace("Regional ", "R") }));

/** Sebaran hotspot per regional dengan warna tingkat risiko karhutla. */
export function FireByRegional() {
  const { active, isFiltered, def } = useSubholding();
  // Regional 1–7 adalah wilayah kebun & PKS PalmCo (PTPN IV) — lih. catatan pada
  // hse-data.ts; kebun tebu SugarCo dan unit SupportingCo tidak masuk sebaran ini.
  const luarCakupan = isFiltered && active !== "palmco";

  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-2.5 pt-3"
      style={{ "--d": "120ms" } as React.CSSProperties}
    >
      <SectionHead title="Kebakaran per Regional" action="Lihat Detail" />
      <p className="mt-[3px] text-[9px] text-ink-500">
        {luarCakupan
          ? `Hotspot 12 Bulan di 7 Regional PalmCo — di luar cakupan ${def.label}`
          : "Hotspot 12 Bulan · Warna Batang = Tingkat Risiko Karhutla Regional"}
      </p>

      <div className="mt-1.5 min-h-0 w-full flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 16, right: 6, bottom: 0, left: -18 }}>
            <CartesianGrid stroke={CHART_AXIS.grid} vertical={false} />
            <XAxis
              dataKey="label"
              tickLine={false}
              axisLine={{ stroke: CHART_AXIS.axis }}
              tick={{ fontSize: 8, fill: CHART_AXIS.tick }}
              interval={0}
            />
            <YAxis
              domain={[0, 60]}
              ticks={[0, 15, 30, 45, 60]}
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 8.5, fill: CHART_AXIS.tick }}
            />
            <Tooltip
              cursor={{ fill: "rgba(148,163,184,0.08)" }}
              formatter={(v: number, _n: string, item: { payload?: (typeof data)[number] }) => [
                `${v} hotspot · ${item.payload?.kejadian ?? 0} kejadian · ${item.payload?.luasHa ?? 0} ha`,
                item.payload?.risiko ?? "Risiko",
              ]}
              contentStyle={CHART_TOOLTIP_STYLE}
            />
            <Bar dataKey="hotspot" radius={[3, 3, 0, 0]}>
              {data.map((r) => (
                <Cell
                  key={r.regional}
                  fill={HSE_RISK_COLOR[r.risiko]}
                  fillOpacity={luarCakupan ? 0.25 : 0.9}
                />
              ))}
              <LabelList
                dataKey="hotspot"
                position="top"
                offset={4}
                style={{ fontSize: 8.5, fill: "var(--text-1)", fontWeight: 700 }}
              />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-1 flex items-center gap-2.5">
        {LEGENDA.map((l) => (
          <span key={l} className="flex items-center gap-1 text-[9px] text-ink-500">
            <span
              className="h-[7px] w-[7px] shrink-0 rounded-full"
              style={{ backgroundColor: HSE_RISK_COLOR[l] }}
            />
            {l}
          </span>
        ))}
      </div>
    </div>
  );
}
