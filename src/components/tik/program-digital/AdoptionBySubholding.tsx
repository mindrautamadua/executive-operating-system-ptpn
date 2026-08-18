"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { adoptionBySubholding } from "@/lib/tik-data";
import { CHART_AXIS, CHART_TOOLTIP_STYLE, PALETTE } from "@/lib/chart-palette";
import { SectionHead } from "@/components/hc/SectionHead";
import { useSubholding } from "@/components/SubholdingProvider";
import { toSubholdingId } from "@/lib/subholding";

/** Adopsi digital per subholding terhadap target grup 80%. */
export function AdoptionBySubholding() {
  const { active, isFiltered, def } = useSubholding();
  // `entitas` (Holding / PalmCo / PTPN I / SGN) adalah dimensi subholding kartu ini.
  // Grafik pembanding: batang non-aktif diredupkan agar posisi relatif terhadap
  // target grup 80% tetap terbaca.
  const dim = (entitas: string) =>
    !isFiltered || toSubholdingId(entitas) === active ? 0.85 : 0.25;

  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-2.5 pt-3"
      style={{ "--d": "120ms" } as React.CSSProperties}
    >
      <SectionHead title="Adopsi Digital per Subholding" action="Lihat Detail" />
      <p className="mt-[3px] text-[9px] text-ink-500">
        {isFiltered
          ? `Adopsi Tools Digital ${def.label} (%) vs Target Grup 80% · blended grup 68%`
          : "Adopsi Tools Digital (%) vs Target Grup 80% · blended grup 68%"}
      </p>

      <div className="mt-1.5 min-h-0 w-full flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={adoptionBySubholding}
            margin={{ top: 12, right: 14, bottom: 0, left: -22 }}
            barCategoryGap="28%"
          >
            <CartesianGrid stroke={CHART_AXIS.grid} vertical={false} />
            <XAxis
              dataKey="entitas"
              tickLine={false}
              axisLine={{ stroke: CHART_AXIS.axis }}
              tick={{ fontSize: 8.5, fill: CHART_AXIS.tick }}
            />
            <YAxis
              domain={[0, 100]}
              ticks={[0, 25, 50, 75, 100]}
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 8.5, fill: CHART_AXIS.tick }}
              width={34}
            />
            <Tooltip
              cursor={{ fill: "rgba(148,163,184,0.08)" }}
              contentStyle={CHART_TOOLTIP_STYLE}
              formatter={(v: number, _n: string, item) => {
                const r = item.payload as (typeof adoptionBySubholding)[number];
                return [
                  `${v}% · target entitas ${r.target2026Pct}% · maturitas ${r.maturitas.toLocaleString("id-ID", { minimumFractionDigits: 1 })}`,
                  r.entitas,
                ];
              }}
            />
            <Legend
              verticalAlign="top"
              align="right"
              height={16}
              iconSize={8}
              wrapperStyle={{ fontSize: 8.5 }}
            />
            <ReferenceLine
              y={80}
              stroke={PALETTE.amber}
              strokeWidth={1.4}
              strokeDasharray="4 3"
              label={{
                value: "Target grup 80%",
                position: "insideTopRight",
                style: { fontSize: 8, fill: PALETTE.amber, fontWeight: 700 },
              }}
            />
            <Bar isAnimationActive={false} name="Adopsi" dataKey="adopsiPct" radius={[3, 3, 0, 0]} barSize={34}>
              {adoptionBySubholding.map((r) => (
                <Cell
                  key={r.entitas}
                  fill={r.adopsiPct >= 75 ? PALETTE.green : r.adopsiPct >= 60 ? PALETTE.amber : PALETTE.red}
                  fillOpacity={dim(r.entitas)}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <p className="pb-1 text-[9px] leading-snug text-ink-500">
        Selisih 21 poin antara Holding (79%) dan SGN (58%) — rata-rata grup menutupi sebaran nyata
        antar-entitas.
      </p>
    </div>
  );
}
