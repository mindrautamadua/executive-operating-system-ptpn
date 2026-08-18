"use client";

import {
  CartesianGrid,
  Line,
  LineChart,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { RESTAN_NORMA_PCT, RESTAN_RATA_GRUP_PCT, restanSeries } from "@/lib/agro-data";
import { CHART_AXIS, CHART_TOOLTIP_STYLE, PALETTE } from "@/lib/chart-palette";
import { filterBySubholding } from "@/lib/subholding";
import { SectionHead } from "@/components/hc/SectionHead";
import { useSubholding } from "@/components/SubholdingProvider";
import { ScopeEmpty, commodityScope } from "@/components/ui/CommodityScope";

const pct = (v: number) => `${v.toLocaleString("id-ID", { minimumFractionDigits: 1 })}%`;

export function RestanTrend() {
  // Domain: restan TBS diukur di Regional 1–7 kebun sawit → milik PalmCo.
  const { active, def } = useSubholding();
  const rows = filterBySubholding(restanSeries, active, (r) => commodityScope(r.regional));

  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-2.5 pt-3"
      style={{ "--d": "60ms" } as React.CSSProperties}
    >
      <SectionHead title="Restan TBS per Regional" action="Lihat Detail" />
      <p className="mt-[3px] text-[9px] text-ink-500">
        % TBS Tidak Terangkut &lt;24 Jam vs Norma — Rata-rata Grup{" "}
        {pct(RESTAN_RATA_GRUP_PCT)}
      </p>

      {rows.length === 0 ? (
        <ScopeEmpty label={def.fullLabel} />
      ) : (
      <>
      <div className="mt-1.5 min-h-0 w-full flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={rows} margin={{ top: 12, right: 10, bottom: 0, left: -24 }}>
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
              domain={[0, 3]}
              ticks={[0, 1, 2, 3]}
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 8.5, fill: CHART_AXIS.tick }}
              tickFormatter={(v: number) => `${v}%`}
              width={34}
            />
            <Tooltip
              contentStyle={CHART_TOOLTIP_STYLE}
              formatter={(v: number) => [pct(v), "Restan"]}
            />
            <ReferenceLine
              y={RESTAN_NORMA_PCT}
              stroke={PALETTE.red}
              strokeDasharray="4 3"
              label={{
                value: "Norma 2%",
                position: "insideTopRight",
                fontSize: 8,
                fill: PALETTE.red,
                fontWeight: 700,
              }}
            />
            <Line
              type="monotone"
              dataKey="restanPct"
              stroke={PALETTE.blue}
              strokeWidth={1.8}
              dot={(props) => {
                const { cx, cy, payload, index } = props as {
                  cx?: number;
                  cy?: number;
                  payload?: { restanPct: number };
                  index?: number;
                };
                const breach = (payload?.restanPct ?? 0) > RESTAN_NORMA_PCT;
                return (
                  <circle
                    key={`restan-dot-${index}`}
                    cx={cx}
                    cy={cy}
                    r={breach ? 3.5 : 2.5}
                    fill={breach ? PALETTE.red : PALETTE.blue}
                  />
                );
              }}
              activeDot={{ r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <p className="pb-1 text-[9px] leading-snug text-ink-500">
        Regional 5–7 (titik merah) melampaui norma 2% — akar FFA tinggi &amp; gap OER di PKS
        wilayah timur.
      </p>
      </>
      )}
    </div>
  );
}
