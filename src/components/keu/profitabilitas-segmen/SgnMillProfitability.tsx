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
import { sgnMillClusters, sgnMillNote } from "@/lib/kps-data";
import { fmtId } from "@/lib/keu-core";
import { CHART_AXIS, CHART_TOOLTIP_STYLE, PALETTE, SEMANTIC } from "@/lib/chart-palette";
import { useSubholding } from "@/components/SubholdingProvider";
import { SectionHead } from "../../hc/SectionHead";

function MultilineTick({
  x = 0,
  y = 0,
  payload,
}: {
  x?: number;
  y?: number;
  payload?: { value: string | number };
}) {
  const lines = String(payload?.value).split(" ");
  return (
    <text x={x} y={y + 8} textAnchor="middle" fontSize={7} fill="var(--chart-tick)">
      {lines.map((line: string, i: number) => (
        <tspan key={line} x={x} dy={i === 0 ? 0 : 8}>
          {line}
        </tspan>
      ))}
    </text>
  );
}

/** Margin EBITDA per klaster PG SGN — 11 dari 17 PG masih merugi. */
export function SgnMillProfitability() {
  const { active } = useSubholding();
  // Klaster PG/mill adalah pecahan internal SugarCo (SGN) — cerminan dari
  // Regional 1..7 yang merupakan pecahan PalmCo.
  const outOfScope = active !== "all" && active !== "sugarco";

  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-2.5 pt-3"
      style={{ "--d": "240ms" } as React.CSSProperties}
    >
      <SectionHead title="SGN Mill Profitability" />
      <p className="mt-[3px] text-[9px] text-ink-500">
        {outOfScope ? (
          "Pecahan klaster PG hanya untuk SugarCo"
        ) : (
          <>
            Margin EBITDA per Klaster PG · 17 PG ·{" "}
            <span className="font-bold text-[#ef4444]">11 PG merugi</span>
          </>
        )}
      </p>

      <div
        className="mt-1.5 min-h-0 w-full flex-1 transition-opacity"
        style={{ opacity: outOfScope ? 0.25 : 1 }}
      >
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={sgnMillClusters} margin={{ top: 14, right: 4, bottom: 8, left: -18 }} barCategoryGap="26%">
            <CartesianGrid stroke={CHART_AXIS.grid} vertical={false} />
            <XAxis
              dataKey="cluster"
              tickLine={false}
              axisLine={{ stroke: CHART_AXIS.axis }}
              tick={<MultilineTick />}
              interval={0}
              height={24}
            />
            <YAxis
              domain={[-10, 20]}
              ticks={[-10, 0, 10, 20]}
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 8.5, fill: CHART_AXIS.tick }}
              tickFormatter={(v: number) => `${v}%`}
              width={34}
            />
            <ReferenceLine y={0} stroke={PALETTE.slate} />
            <Tooltip
              cursor={{ fill: "rgba(148,163,184,0.08)" }}
              contentStyle={CHART_TOOLTIP_STYLE}
              formatter={(v: number, _n: string, item: { payload?: { pgRugi?: number; pgCount?: number; rendemenPct?: number } }) => [
                `${fmtId(v, 1)}% · ${item.payload?.pgRugi}/${item.payload?.pgCount} PG rugi · rendemen ${fmtId(item.payload?.rendemenPct ?? 0, 1)}%`,
                "Margin EBITDA",
              ]}
            />
            <Bar dataKey="marginPct" radius={[2, 2, 0, 0]} maxBarSize={26}>
              {sgnMillClusters.map((d) => (
                <Cell key={d.cluster} fill={SEMANTIC[d.tone]} />
              ))}
              <LabelList
                dataKey="marginPct"
                position="top"
                offset={4}
                formatter={(v: number) => `${fmtId(v, 1)}%`}
                style={{ fontSize: 7, fill: "#334155", fontWeight: 700 }}
              />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <p className="mt-1 truncate text-[8px] leading-snug text-ink-500" title={sgnMillNote}>
        {sgnMillNote}
      </p>
    </div>
  );
}
