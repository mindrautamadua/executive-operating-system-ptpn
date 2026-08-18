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
} from "recharts";
import { regionalYield, YIELD_GRUP_TON_HA } from "@/lib/produksi-data";
import { CHART_AXIS, CHART_TOOLTIP_STYLE, PALETTE } from "@/lib/chart-palette";
import { SectionHead } from "../../hc/SectionHead";
import { useSubholding } from "@/components/SubholdingProvider";
import { inScope, ScopeEmpty } from "@/components/ui/CommodityScope";

const UMUR_TENGAH_THN = 14.5;

const num = (v: number) =>
  v.toLocaleString("id-ID", { minimumFractionDigits: 1, maximumFractionDigits: 1 });

const data = regionalYield.map((r) => ({
  name: r.regional.replace("Regional ", "R").replace(/ \(.*\)/, ""),
  full: r.regional,
  umur: r.umurRataThn,
  yield: r.yieldTonHa,
  luas: r.luasRbHa,
}));

export function YieldQuadrant() {
  const { active, def } = useSubholding();
  // Quadrant yield x umur tanaman sawit per Regional 1-7 -> milik PalmCo.
  const milikScope = inScope(active, "Regional 1 TBS sawit");

  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-2.5 pt-3"
      style={{ "--d": "120ms" } as React.CSSProperties}
    >
      <SectionHead title="Quadrant Yield × Umur" action="Lihat Detail" />
      <p className="mt-[3px] text-[9px] text-ink-500">
        Yield (t/ha) vs Umur Rata-rata Tanaman (tahun) · 7 Regional
      </p>

      {!milikScope && <ScopeEmpty label={def.fullLabel} />}

      {milikScope && (
        <>
      <div className="mt-1.5 min-h-0 w-full flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart margin={{ top: 12, right: 14, bottom: 0, left: -22 }}>
            <CartesianGrid stroke={CHART_AXIS.grid} />
            <XAxis
              type="number"
              dataKey="umur"
              domain={[11, 18]}
              ticks={[11, 13, 15, 17]}
              tickLine={false}
              axisLine={{ stroke: CHART_AXIS.axis }}
              tick={{ fontSize: 8.5, fill: CHART_AXIS.tick }}
              tickFormatter={(v: number) => `${v} th`}
            />
            <YAxis
              type="number"
              dataKey="yield"
              domain={[17, 25]}
              ticks={[17, 19, 21, 23, 25]}
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 8.5, fill: CHART_AXIS.tick }}
            />
            <ReferenceLine
              y={YIELD_GRUP_TON_HA}
              stroke={PALETTE.navy}
              strokeDasharray="5 4"
              strokeWidth={1.2}
            />
            <ReferenceLine
              x={UMUR_TENGAH_THN}
              stroke={PALETTE.slate}
              strokeDasharray="5 4"
              strokeWidth={1.2}
            />
            <Tooltip
              cursor={{ strokeDasharray: "3 3" }}
              formatter={(v: number, name: string) =>
                name === "umur" ? [`${num(v)} tahun`, "Umur Rata-rata"] : [`${num(v)} t/ha`, "Yield TBS"]
              }
              labelFormatter={() => ""}
              contentStyle={CHART_TOOLTIP_STYLE}
            />
            <Scatter data={data}>
              {data.map((d) => (
                <Cell
                  key={d.name}
                  fill={d.yield >= YIELD_GRUP_TON_HA ? PALETTE.green : PALETTE.red}
                  fillOpacity={0.85}
                />
              ))}
              <LabelList
                dataKey="name"
                position="top"
                offset={5}
                style={{ fontSize: 8, fill: "var(--text-1)", fontWeight: 700 }}
              />
            </Scatter>
          </ScatterChart>
        </ResponsiveContainer>
      </div>

      <p className="mt-1 truncate text-[9px] text-ink-500">
        Kanan-bawah = tua &amp; rendah (R6–R7): prioritas replanting.
      </p>
        </>
      )}
    </div>
  );
}
