"use client";

import {
  CartesianGrid,
  Cell,
  LabelList,
  ReferenceLine,
  ResponsiveContainer,
  Scatter,
  ScatterChart,
  Tooltip,
  XAxis,
  YAxis,
  ZAxis,
} from "recharts";
import { regionalProfitability } from "@/lib/kps-data";
import { fmtId } from "@/lib/keu-core";
import { CHART_AXIS, CHART_TOOLTIP_STYLE, PALETTE, SEMANTIC } from "@/lib/chart-palette";
import { useSubholding } from "@/components/SubholdingProvider";
import { SectionHead } from "../../hc/SectionHead";

/** Batas kuadran: biaya kebun median ±Rp 49,8 jt/ha, yield median ±21,2 ton/ha. */
const SPLIT_X = 49.8;
const SPLIT_Y = 21.2;

const DATA = regionalProfitability.map((d, i) => ({
  ...d,
  short: `R${i + 1}`,
}));

/** Peta yield TBS × biaya/ha per regional; bubble = luas tertanam. */
export function ProfitPerHectare() {
  const { active } = useSubholding();
  // Sumbernya regionalProfitability: Regional 1..7 = pecahan internal PalmCo
  // (klaster PG/mill adalah milik SugarCo), jadi kartu ini cakupan PalmCo.
  const outOfScope = active !== "all" && active !== "palmco";

  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-2.5 pt-3"
      style={{ "--d": "180ms" } as React.CSSProperties}
    >
      <SectionHead title="Profit per Hectare Map" />
      <p className="mt-[3px] text-[9px] text-ink-500">
        {outOfScope
          ? "Pecahan regional hanya untuk PalmCo"
          : "Yield TBS vs Biaya Kebun/ha · bubble = luas tertanam · kiri-atas = best practice"}
      </p>

      <div
        className="mt-1 min-h-0 w-full flex-1 transition-opacity"
        style={{ opacity: outOfScope ? 0.25 : 1 }}
      >
        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart margin={{ top: 10, right: 16, bottom: 12, left: -18 }}>
            <CartesianGrid stroke={CHART_AXIS.grid} />
            <XAxis
              type="number"
              dataKey="costPerHaRpJt"
              domain={[43, 56]}
              ticks={[44, 48, 52, 56]}
              tickLine={false}
              axisLine={{ stroke: CHART_AXIS.axis }}
              tick={{ fontSize: 8.5, fill: CHART_AXIS.tick }}
              label={{
                value: "Biaya Kebun (Rp jt/ha)",
                position: "insideBottom",
                offset: -8,
                style: { fontSize: 8.5, fill: "var(--chart-tick)" },
              }}
            />
            <YAxis
              type="number"
              dataKey="yieldTbsTonHa"
              domain={[18, 25]}
              ticks={[18, 20, 22, 24]}
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 8.5, fill: CHART_AXIS.tick }}
              label={{
                value: "Yield TBS (ton/ha)",
                angle: -90,
                position: "insideLeft",
                offset: 26,
                style: { fontSize: 8.5, fill: "var(--chart-tick)", textAnchor: "middle" },
              }}
            />
            <ZAxis type="number" dataKey="luasRbHa" range={[90, 300]} />
            <ReferenceLine x={SPLIT_X} stroke={PALETTE.slate} strokeDasharray="4 4" />
            <ReferenceLine y={SPLIT_Y} stroke={PALETTE.slate} strokeDasharray="4 4" />
            <Tooltip
              contentStyle={CHART_TOOLTIP_STYLE}
              cursor={{ strokeDasharray: "3 3" }}
              formatter={(v: number, name: string, item: { payload?: { regional?: string } }) =>
                name === "costPerHaRpJt"
                  ? [`Rp ${fmtId(v, 1)} jt/ha — ${item.payload?.regional}`, "Biaya Kebun"]
                  : name === "yieldTbsTonHa"
                    ? [`${fmtId(v, 1)} ton/ha`, "Yield TBS"]
                    : [`${fmtId(v, 1)} rb ha`, "Luas Tertanam"]
              }
              labelFormatter={() => ""}
            />
            <Scatter data={DATA} fillOpacity={0.85}>
              {DATA.map((d) => (
                <Cell key={d.regional} fill={SEMANTIC[d.tone]} />
              ))}
              <LabelList
                dataKey="short"
                position="right"
                offset={7}
                style={{ fontSize: 8, fill: "var(--text-2)", fontWeight: 700 }}
              />
            </Scatter>
          </ScatterChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
