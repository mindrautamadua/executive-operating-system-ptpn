"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  Legend,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  APD_RENDEMEN_BENCHMARK_PCT,
  sugarProductivity,
  sugarProductivityNote,
} from "@/lib/apd-data";
import { CHART_AXIS, CHART_TOOLTIP_STYLE, PALETTE } from "@/lib/chart-palette";
import { SectionHead } from "@/components/hc/SectionHead";
import { useSubholding } from "@/components/SubholdingProvider";

const num = (v: number) =>
  v.toLocaleString("id-ID", { minimumFractionDigits: 1, maximumFractionDigits: 2 });

/** Nama klaster dipendekkan agar 4 kolom tetap terbaca. */
const SHORT: Record<string, string> = {
  "Sumatera (Sumut–Sumsel–Lampung)": "Sumatera",
  "Jatim Skala Besar (>6.000 TCD)": "Jatim Besar",
  "Jatim Menengah (3.400–5.500 TCD)": "Jatim Menengah",
  "Jatim Kecil (<3.300 TCD)": "Jatim Kecil",
};

const data = sugarProductivity.map((r) => ({ ...r, short: SHORT[r.klaster] ?? r.klaster }));

/** Rendemen & utilisasi giling per klaster pabrik gula. */
export function SugarProductivity() {
  const { active } = useSubholding();
  // Pemetaan domain: klaster PG (tebu/gula, musim giling) milik SugarCo.
  const outOfScope = active !== "all" && active !== "sugarco";

  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-2.5 pt-3"
      style={{ "--d": "120ms" } as React.CSSProperties}
    >
      <SectionHead title="Produktivitas Gula per Klaster PG" action="Lihat Detail" />
      <p className="mt-[3px] text-[9px] text-ink-500">
        {outOfScope
          ? "Klaster pabrik gula hanya untuk SugarCo"
          : "Rendemen (%) & Utilisasi Giling (%) · 17 PG · 82,5 rb TCD"}
      </p>

      <div
        className="mt-1.5 min-h-0 w-full flex-1 transition-opacity"
        style={{ opacity: outOfScope ? 0.25 : 1 }}
      >
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 16, right: 6, bottom: 0, left: -16 }}
            barCategoryGap="26%"
          >
            <CartesianGrid stroke={CHART_AXIS.grid} vertical={false} />
            <XAxis
              dataKey="short"
              tickLine={false}
              axisLine={{ stroke: CHART_AXIS.axis }}
              tick={{ fontSize: 8.5, fill: CHART_AXIS.tick }}
              interval={0}
            />
            <YAxis
              domain={[0, 90]}
              ticks={[0, 30, 60, 90]}
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 8, fill: CHART_AXIS.tick }}
              width={34}
            />
            <ReferenceLine
              y={APD_RENDEMEN_BENCHMARK_PCT}
              stroke={PALETTE.navy}
              strokeDasharray="5 4"
              strokeWidth={1.2}
            />
            <Tooltip
              cursor={{ fill: "rgba(148,163,184,0.08)" }}
              contentStyle={CHART_TOOLTIP_STYLE}
              formatter={(
                v: number,
                n: string,
                item: { payload?: { labaRugiRpM?: number } },
              ) => [
                n === "Rendemen"
                  ? `${num(v)}% · L/R Rp ${(item?.payload?.labaRugiRpM ?? 0).toLocaleString("id-ID")} M`
                  : `${num(v)}%`,
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
            <Bar isAnimationActive={false}
              dataKey="utilisasiPct"
              name="Utilisasi"
              fill={PALETTE.blue}
              fillOpacity={0.85}
              radius={[3, 3, 0, 0]}
              maxBarSize={26}
            />
            <Bar isAnimationActive={false}
              dataKey="rendemenPct"
              name="Rendemen"
              fill={PALETTE.green}
              radius={[3, 3, 0, 0]}
              maxBarSize={26}
            >
              <LabelList
                dataKey="rendemenPct"
                position="top"
                offset={5}
                formatter={(v: React.ReactNode) => `${num(Number(v))}%`}
                style={{ fontSize: 8.5, fill: "#334155", fontWeight: 700 }}
              />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <p className="pb-1 text-[9px] leading-snug text-ink-500">{sugarProductivityNote}</p>
    </div>
  );
}
