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
  regionalYield,
  YIELD_BENCHMARK_SWASTA_TON_HA,
  YIELD_GRUP_TON_HA,
} from "@/lib/produksi-data";
import { CHART_AXIS, CHART_TOOLTIP_STYLE, PALETTE } from "@/lib/chart-palette";
import { SectionHead } from "../../hc/SectionHead";
import { useSubholding } from "@/components/SubholdingProvider";
import { inScope, ScopeEmpty } from "@/components/ui/CommodityScope";

const num = (v: number) =>
  v.toLocaleString("id-ID", { minimumFractionDigits: 1, maximumFractionDigits: 1 });

const data = regionalYield.map((r) => ({
  name: r.regional.replace("Regional ", "R"),
  yield: r.yieldTonHa,
  luas: r.luasRbHa,
}));

export function YieldByRegional() {
  const { active, def } = useSubholding();
  // Yield TBS Regional 1-7 = kebun sawit -> seluruh kartu milik PalmCo.
  const milikScope = inScope(active, "Regional 1 TBS sawit");

  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-2.5 pt-3"
      style={{ "--d": "60ms" } as React.CSSProperties}
    >
      <SectionHead title="Yield TBS per Regional" action="Lihat Detail" />
      <p className="mt-[3px] text-[9px] text-ink-500">
        t/ha annualized · garis: rata-rata grup 21,9 &amp; benchmark swasta 24,0
      </p>

      {!milikScope && <ScopeEmpty label={def.fullLabel} />}

      {milikScope && (
        <div className="mt-1.5 min-h-0 w-full flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            layout="vertical"
            margin={{ top: 4, right: 30, bottom: 0, left: -4 }}
            barCategoryGap="26%"
          >
            <CartesianGrid stroke={CHART_AXIS.grid} horizontal={false} />
            <XAxis
              type="number"
              domain={[0, 26]}
              ticks={[0, 6, 12, 18, 24]}
              tickLine={false}
              axisLine={{ stroke: CHART_AXIS.axis }}
              tick={{ fontSize: 8.5, fill: CHART_AXIS.tick }}
            />
            <YAxis
              type="category"
              dataKey="name"
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 8, fill: CHART_AXIS.tick }}
              width={92}
            />
            <ReferenceLine
              x={YIELD_GRUP_TON_HA}
              stroke={PALETTE.navy}
              strokeDasharray="5 4"
              strokeWidth={1.3}
              label={{
                value: `Grup ${num(YIELD_GRUP_TON_HA)}`,
                position: "insideBottomLeft",
                fontSize: 8.5,
                fontWeight: 700,
                fill: PALETTE.navy,
              }}
            />
            <ReferenceLine
              x={YIELD_BENCHMARK_SWASTA_TON_HA}
              stroke={PALETTE.amber}
              strokeDasharray="5 4"
              strokeWidth={1.3}
              label={{
                value: `Benchmark ${num(YIELD_BENCHMARK_SWASTA_TON_HA)}`,
                position: "insideTopLeft",
                fontSize: 8.5,
                fontWeight: 700,
                fill: PALETTE.amber,
              }}
            />
            <Tooltip
              cursor={{ fill: "rgba(148,163,184,0.08)" }}
              formatter={(v: number, _n, item) => [
                `${num(v)} t/ha · luas ${num((item.payload as { luas: number }).luas)} rb ha`,
                "Yield TBS",
              ]}
              contentStyle={CHART_TOOLTIP_STYLE}
            />
            <Bar isAnimationActive={false} dataKey="yield" radius={[0, 3, 3, 0]}>
              {data.map((d) => (
                <Cell
                  key={d.name}
                  fill={d.yield >= YIELD_GRUP_TON_HA ? PALETTE.green : PALETTE.amber}
                />
              ))}
              <LabelList
                dataKey="yield"
                position="right"
                offset={4}
                formatter={(v: number) => num(v)}
                style={{ fontSize: 8.5, fill: "var(--text-1)", fontWeight: 700 }}
              />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
      )}
    </div>
  );
}
