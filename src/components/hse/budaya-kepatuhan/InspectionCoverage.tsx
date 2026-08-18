"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { inspectionCoverage } from "@/lib/hse-data";
import { CHART_AXIS, CHART_TOOLTIP_STYLE, PALETTE } from "@/lib/chart-palette";
import { SectionHead } from "@/components/hc/SectionHead";
import { useSubholding } from "@/components/SubholdingProvider";

const num = (v: number) => v.toLocaleString("id-ID");

const totalInspeksi = inspectionCoverage.reduce((a, r) => a + r.total, 0);
const totalTerjadwal = inspectionCoverage.reduce((a, r) => a + r.terjadwal, 0);
const totalMendadak = inspectionCoverage.reduce((a, r) => a + r.mendadak, 0);

/** Cakupan inspeksi K3 per regional: terjadwal vs mendadak (total 1.860 inspeksi). */
export function InspectionCoverage() {
  const { active, isFiltered, def } = useSubholding();
  // Inspeksi K3 ini dicatat per Regional 1–7, wilayah operasi PalmCo (PTPN IV).
  const luarCakupan = isFiltered && active !== "palmco";
  const opacity = luarCakupan ? 0.25 : 0.9;

  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-2.5 pt-3"
      style={{ "--d": "90ms" } as React.CSSProperties}
    >
      <SectionHead title="Cakupan Inspeksi K3 per Regional" action="Lihat Detail" />
      <p className="mt-[3px] text-[9px] text-ink-500">
        {luarCakupan ? (
          <>Inspeksi K3 di regional PalmCo — di luar cakupan {def.label}</>
        ) : (
          <>
            {num(totalInspeksi)} Inspeksi YTD · {num(totalTerjadwal)} terjadwal ·{" "}
            {num(totalMendadak)} mendadak
          </>
        )}
      </p>

      <div className="mt-1.5 min-h-0 w-full flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={inspectionCoverage}
            margin={{ top: 8, right: 8, bottom: 0, left: -12 }}
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
              domain={[0, 360]}
              ticks={[0, 90, 180, 270, 360]}
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 8, fill: CHART_AXIS.tick }}
              width={40}
            />
            <Tooltip
              cursor={{ fill: "rgba(148,163,184,0.08)" }}
              contentStyle={CHART_TOOLTIP_STYLE}
              formatter={(v: number, name: string, item) => {
                const r = item.payload as (typeof inspectionCoverage)[number];
                return [`${num(v)} inspeksi · ${r.temuanPer100} temuan/100 inspeksi`, name];
              }}
            />
            <Legend
              verticalAlign="top"
              align="right"
              height={16}
              iconType="circle"
              iconSize={6}
              wrapperStyle={{ fontSize: 8, color: CHART_AXIS.tick }}
            />
            <Bar isAnimationActive={false}
              name="Terjadwal"
              dataKey="terjadwal"
              stackId="i"
              fill={PALETTE.teal}
              fillOpacity={opacity}
              barSize={26}
            />
            <Bar isAnimationActive={false}
              name="Mendadak"
              dataKey="mendadak"
              stackId="i"
              fill={PALETTE.amber}
              fillOpacity={opacity}
              barSize={26}
              radius={[3, 3, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <p className="pb-1 text-[9px] leading-snug text-ink-500">
        Regional 3 (74) dan Regional 6 (71) menghasilkan temuan per 100 inspeksi tertinggi — porsi
        sidak di sana layak dinaikkan dari sekitar 26% menjadi 35% total inspeksi.
      </p>
    </div>
  );
}
