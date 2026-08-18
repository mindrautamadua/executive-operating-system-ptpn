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
import { plasmaYieldGap } from "@/lib/agro-data";
import { CHART_AXIS, CHART_TOOLTIP_STYLE, PALETTE } from "@/lib/chart-palette";
import { filterBySubholding } from "@/lib/subholding";
import { SectionHead } from "@/components/hc/SectionHead";
import { useSubholding } from "@/components/SubholdingProvider";
import { ScopeEmpty, commodityScope } from "@/components/ui/CommodityScope";

const fmtYield = (v: number) =>
  `${v.toLocaleString("id-ID", { minimumFractionDigits: 1 })} t/ha`;

export function PlasmaYieldGap() {
  // Domain: plasma sawit di Regional 1–7 → milik PalmCo (tidak ada plasma tebu/karet).
  const { active, def } = useSubholding();
  const rows = filterBySubholding(plasmaYieldGap, active, (r) => commodityScope(r.regional));

  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-2.5 pt-3"
      style={{ "--d": "120ms" } as React.CSSProperties}
    >
      <SectionHead title="Yield Gap Plasma vs Inti" action="Lihat Detail" />
      <p className="mt-[3px] text-[9px] text-ink-500">
        Yield per Regional (t/ha) — Rata-rata Plasma 16,4 vs Inti 21,9
      </p>

      {rows.length === 0 ? (
        <ScopeEmpty label={def.fullLabel} />
      ) : (
      <>
      <div className="mt-1.5 min-h-0 w-full flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={rows} margin={{ top: 6, right: 4, bottom: 0, left: -18 }}>
            <CartesianGrid stroke={CHART_AXIS.grid} vertical={false} />
            <XAxis
              dataKey="regional"
              tickLine={false}
              axisLine={{ stroke: CHART_AXIS.axis }}
              tick={{ fontSize: 8, fill: CHART_AXIS.tick }}
              tickFormatter={(v: string) => v.replace("Regional ", "R")}
              interval={0}
            />
            <YAxis
              domain={[0, 26]}
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 8.5, fill: CHART_AXIS.tick }}
              width={30}
            />
            <Tooltip
              contentStyle={CHART_TOOLTIP_STYLE}
              formatter={(v: number, name: string) => [fmtYield(v), name]}
              labelFormatter={(label: string) => {
                const row = rows.find((r) => r.regional === label);
                return row
                  ? `${label} · Plasma ${row.luasPlasmaRbHa.toLocaleString("id-ID")} rb ha`
                  : label;
              }}
            />
            <Legend
              iconType="circle"
              iconSize={7}
              wrapperStyle={{ fontSize: 8.5, paddingTop: 2 }}
            />
            <Bar
              dataKey="yieldPlasma"
              name="Yield Plasma"
              fill={PALETTE.amber}
              barSize={11}
              radius={[3, 3, 0, 0]}
            />
            <Bar
              dataKey="yieldInti"
              name="Yield Inti"
              fill={PALETTE.green}
              barSize={11}
              radius={[3, 3, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <p className="pb-1 text-[9px] leading-snug text-ink-500">
        Gap rata-rata 5,5 t/ha; intensifikasi agronomi plasma berpotensi menambah ±430 rb ton
        TBS/tahun tanpa tambah lahan.
      </p>
      </>
      )}
    </div>
  );
}
