"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { lostTimeByRegional } from "@/lib/hse-data";
import { CHART_AXIS, CHART_TOOLTIP_STYLE, PALETTE } from "@/lib/chart-palette";
import { SectionHead } from "@/components/hc/SectionHead";
import { useSubholding } from "@/components/SubholdingProvider";

const num = (v: number) => v.toLocaleString("id-ID");

const totalHari = lostTimeByRegional.reduce((a, r) => a + r.hariHilang, 0);

/** Hari kerja hilang per regional; regional dengan severity rate >40 disorot merah. */
export function LostTimeByRegional() {
  const { active, isFiltered, def } = useSubholding();
  // Regional 1–7 adalah wilayah operasi PalmCo (PTPN IV) — lih. hse-data.ts;
  // pecahan hari hilang untuk SugarCo/SupportingCo tidak tersedia.
  const luarCakupan = isFiltered && active !== "palmco";

  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-2.5 pt-3"
      style={{ "--d": "120ms" } as React.CSSProperties}
    >
      <SectionHead title="Hari Kerja Hilang per Regional" action="Lihat Detail" />
      <p className="mt-[3px] text-[9px] text-ink-500">
        {luarCakupan
          ? `Hari kerja hilang di regional PalmCo — di luar cakupan ${def.label}`
          : `${num(totalHari)} Hari Kerja Hilang YTD · severity rate grup 38 hari/juta jam`}
      </p>

      <div className="mt-1.5 min-h-0 w-full flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={lostTimeByRegional}
            margin={{ top: 8, right: 8, bottom: 0, left: -8 }}
            barCategoryGap="26%"
          >
            <CartesianGrid stroke={CHART_AXIS.grid} vertical={false} />
            <XAxis
              dataKey="regional"
              tickLine={false}
              axisLine={{ stroke: CHART_AXIS.axis }}
              tick={{ fontSize: 8.5, fill: CHART_AXIS.tick }}
              interval={0}
            />
            <YAxis
              domain={[0, 700]}
              ticks={[0, 175, 350, 525, 700]}
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 8, fill: CHART_AXIS.tick }}
              width={40}
            />
            <Tooltip
              cursor={{ fill: "rgba(148,163,184,0.08)" }}
              contentStyle={CHART_TOOLTIP_STYLE}
              formatter={(v: number, _n: string, item) => {
                const r = item.payload as (typeof lostTimeByRegional)[number];
                return [
                  `${num(v)} hari · ${r.kecelakaan} kecelakaan · severity rate ${r.severityRate}`,
                  r.regional,
                ];
              }}
            />
            <Bar isAnimationActive={false} dataKey="hariHilang" radius={[3, 3, 0, 0]} barSize={30}>
              {lostTimeByRegional.map((r) => (
                <Cell
                  key={r.regional}
                  fill={r.severityRate > 40 ? PALETTE.red : PALETTE.blue}
                  fillOpacity={luarCakupan ? 0.25 : 0.85}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <p className="pb-1 text-[9px] leading-snug text-ink-500">
        Regional 6 (46) dan Regional 3 (44) melampaui severity rate grup 38 meski jumlah kecelakaannya
        bukan yang tertinggi — indikasi insiden di sana cenderung lebih berat.
      </p>
    </div>
  );
}
