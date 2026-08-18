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
import {
  YIELD_BENCHMARK_TON_HA,
  YIELD_GRUP_TON_HA,
  yieldByRegional,
  yieldByRegionalNote,
} from "@/lib/apd-data";
import { CHART_AXIS, CHART_TOOLTIP_STYLE, PALETTE } from "@/lib/chart-palette";
import { SectionHead } from "@/components/hc/SectionHead";
import { useSubholding } from "@/components/SubholdingProvider";

const num = (v: number) =>
  v.toLocaleString("id-ID", { minimumFractionDigits: 1, maximumFractionDigits: 1 });

const data = yieldByRegional.map((r) => ({
  ...r,
  short: r.regional.replace("Regional ", "R").replace(/\s\(/, " ("),
}));

/** Yield TBS per regional (bar horizontal) terhadap benchmark swasta 24,0 t/ha. */
export function YieldByRegional() {
  const { active } = useSubholding();
  // Pemetaan domain: yield TBS kebun sawit Regional 1–7 seluruhnya milik PalmCo.
  const outOfScope = active !== "all" && active !== "palmco";

  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-2.5 pt-3"
      style={{ "--d": "60ms" } as React.CSSProperties}
    >
      <SectionHead title="Yield TBS per Regional" action="Lihat Detail" />
      <p className="mt-[3px] text-[9px] text-ink-500">
        {outOfScope ? (
          "Pecahan yield per regional hanya untuk PalmCo"
        ) : (
          <>
            Ton TBS/Ha · Grup {num(YIELD_GRUP_TON_HA)} · Benchmark Swasta{" "}
            {num(YIELD_BENCHMARK_TON_HA)}
          </>
        )}
      </p>

      <div
        className="mt-1.5 min-h-0 w-full flex-1 transition-opacity"
        style={{ opacity: outOfScope ? 0.25 : 1 }}
      >
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            layout="vertical"
            margin={{ top: 4, right: 26, bottom: 0, left: 4 }}
            barCategoryGap="22%"
          >
            <CartesianGrid stroke={CHART_AXIS.grid} horizontal={false} />
            <XAxis
              type="number"
              domain={[0, 26]}
              ticks={[0, 6, 12, 18, 24]}
              tickLine={false}
              axisLine={{ stroke: CHART_AXIS.axis }}
              tick={{ fontSize: 8, fill: CHART_AXIS.tick }}
              height={16}
            />
            <YAxis
              type="category"
              dataKey="short"
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 8.5, fill: CHART_AXIS.tick }}
              width={104}
            />
            <ReferenceLine
              x={YIELD_BENCHMARK_TON_HA}
              stroke={PALETTE.navy}
              strokeDasharray="5 4"
              strokeWidth={1.2}
            />
            <Tooltip
              cursor={{ fill: "rgba(148,163,184,0.08)" }}
              contentStyle={CHART_TOOLTIP_STYLE}
              formatter={(
                v: number,
                _n: string,
                item: { payload?: { cpoPerHaTon?: number; umurRataThn?: number } },
              ) => [
                `${num(v)} t/ha · CPO ${num(item?.payload?.cpoPerHaTon ?? 0)} t/ha · umur ${num(
                  item?.payload?.umurRataThn ?? 0,
                )} thn`,
                "Yield TBS",
              ]}
            />
            <Bar isAnimationActive={false} dataKey="yieldTonHa" radius={[0, 3, 3, 0]} maxBarSize={16}>
              {data.map((d) => (
                <Cell
                  key={d.regional}
                  fill={d.yieldTonHa >= YIELD_GRUP_TON_HA ? PALETTE.green : PALETTE.amber}
                />
              ))}
              <LabelList
                dataKey="yieldTonHa"
                position="right"
                offset={5}
                formatter={(v: React.ReactNode) => num(Number(v))}
                style={{ fontSize: 8.5, fill: "#334155", fontWeight: 700 }}
              />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <p className="pb-1 text-[9px] leading-snug text-ink-500">{yieldByRegionalNote}</p>
    </div>
  );
}
