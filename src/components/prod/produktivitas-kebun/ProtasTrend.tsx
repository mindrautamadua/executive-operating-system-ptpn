"use client";

import {
  CartesianGrid,
  LabelList,
  Line,
  LineChart,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  protasNote,
  protasTrend,
  YIELD_BENCHMARK_SWASTA_TON_HA,
} from "@/lib/produksi-data";
import { CHART_AXIS, CHART_TOOLTIP_STYLE, PALETTE } from "@/lib/chart-palette";
import { SectionHead } from "../../hc/SectionHead";
import { useSubholding } from "@/components/SubholdingProvider";
import { inScope, ScopeEmpty } from "@/components/ui/CommodityScope";

const num = (v: number) =>
  v.toLocaleString("id-ID", { minimumFractionDigits: 1, maximumFractionDigits: 1 });

export function ProtasTrend() {
  const { active, def } = useSubholding();
  // Protas = yield TBS kebun sawit -> seluruh kartu milik PalmCo.
  const milikScope = inScope(active, "TBS sawit kebun");

  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-2.5 pt-3"
      style={{ "--d": "180ms" } as React.CSSProperties}
    >
      <SectionHead title="Protas Trend 5 Tahun" action="Lihat Detail" />
      <p className="mt-[3px] text-[9px] text-ink-500">Yield TBS Grup 2022–2026 (t/ha)</p>

      {!milikScope && <ScopeEmpty label={def.fullLabel} />}

      {milikScope && (
        <>
      <div className="mt-1.5 min-h-0 w-full flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={protasTrend} margin={{ top: 16, right: 14, bottom: 0, left: -24 }}>
            <CartesianGrid stroke={CHART_AXIS.grid} vertical={false} />
            <XAxis
              dataKey="tahun"
              tickLine={false}
              axisLine={{ stroke: CHART_AXIS.axis }}
              tick={{ fontSize: 8.5, fill: CHART_AXIS.tick }}
              interval={0}
            />
            <YAxis
              domain={[18, 25]}
              ticks={[18, 20, 22, 24]}
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 8, fill: CHART_AXIS.tick }}
            />
            <ReferenceLine
              y={YIELD_BENCHMARK_SWASTA_TON_HA}
              stroke={PALETTE.amber}
              strokeDasharray="5 4"
              strokeWidth={1.3}
              label={{
                value: "Benchmark swasta 24,0",
                position: "insideTopRight",
                fontSize: 8.5,
                fontWeight: 700,
                fill: PALETTE.amber,
              }}
            />
            <Tooltip
              formatter={(v: number) => [`${num(v)} t/ha`, "Yield TBS"]}
              contentStyle={CHART_TOOLTIP_STYLE}
            />
            <Line isAnimationActive={false}
              type="linear"
              dataKey="yieldTonHa"
              stroke={PALETTE.green}
              strokeWidth={1.8}
              dot={{ r: 2.6, fill: PALETTE.green, strokeWidth: 0 }}
              activeDot={{ r: 4 }}
            >
              <LabelList
                dataKey="yieldTonHa"
                position="top"
                offset={7}
                formatter={(v: number) => num(v)}
                style={{ fontSize: 8.5, fill: "var(--text-1)", fontWeight: 700 }}
              />
            </Line>
          </LineChart>
        </ResponsiveContainer>
      </div>

      <p className="mt-1 truncate text-[9px] text-ink-500">{protasNote}</p>
        </>
      )}
    </div>
  );
}
