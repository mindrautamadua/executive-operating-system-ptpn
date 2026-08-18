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
import { HARVEST_STANDAR_HARI, harvestCycle } from "@/lib/agro-data";
import { CHART_AXIS, CHART_TOOLTIP_STYLE, PALETTE } from "@/lib/chart-palette";
import { filterBySubholding } from "@/lib/subholding";
import { SectionHead } from "@/components/hc/SectionHead";
import { useSubholding } from "@/components/SubholdingProvider";
import { ScopeEmpty, commodityScope } from "@/components/ui/CommodityScope";

const barColor = (hari: number) =>
  hari <= HARVEST_STANDAR_HARI ? PALETTE.green : hari <= 8 ? PALETTE.amber : PALETTE.red;

const hari = (v: number) => `${v.toLocaleString("id-ID", { minimumFractionDigits: 1 })} hari`;

export function HarvestCycleCard() {
  // Domain: rotasi panen TBS di Regional 1–7 kebun sawit → milik PalmCo.
  const { active, def } = useSubholding();
  const rows = filterBySubholding(harvestCycle, active, (r) => commodityScope(r.regional));

  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-2.5 pt-3"
      style={{ "--d": "120ms" } as React.CSSProperties}
    >
      <SectionHead title="Rotasi Panen per Regional" action="Lihat Detail" />
      <p className="mt-[3px] text-[9px] text-ink-500">
        Interval Panen Aktual vs Standar {HARVEST_STANDAR_HARI} Hari
      </p>

      {rows.length === 0 ? (
        <ScopeEmpty label={def.fullLabel} />
      ) : (
      <>
      <div className="mt-1.5 min-h-0 w-full flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={rows} margin={{ top: 14, right: 10, bottom: 0, left: -24 }}>
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
              domain={[0, 10]}
              ticks={[0, 2, 4, 6, 8, 10]}
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 8.5, fill: CHART_AXIS.tick }}
              width={30}
            />
            <Tooltip
              contentStyle={CHART_TOOLTIP_STYLE}
              formatter={(v: number) => [hari(v), "Rotasi"]}
            />
            <ReferenceLine
              y={HARVEST_STANDAR_HARI}
              stroke={PALETTE.navy}
              strokeDasharray="4 3"
              label={{
                value: "Standar 7 hari",
                position: "insideTopRight",
                fontSize: 8,
                fill: PALETTE.navy,
                fontWeight: 700,
              }}
            />
            <Bar dataKey="rotasiHari" barSize={24} radius={[4, 4, 0, 0]}>
              {rows.map((r) => (
                <Cell key={r.regional} fill={barColor(r.rotasiHari)} />
              ))}
              <LabelList
                dataKey="rotasiHari"
                position="top"
                formatter={(v: number) => v.toLocaleString("id-ID", { minimumFractionDigits: 1 })}
                style={{ fontSize: 8.5, fill: "#64748b", fontWeight: 700 }}
              />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <p className="pb-1 text-[9px] leading-snug text-ink-500">
        Regional 5–7 rotasi 8,2–8,9 hari — kekurangan pemanen &amp; jalan produksi rusak; link ke
        program mekanisasi OPEX.
      </p>
      </>
      )}
    </div>
  );
}
