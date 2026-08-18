"use client";

import {
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Scatter,
  ScatterChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { ffaOerNote, ffaOerPoints } from "@/lib/agro-data";
import { CHART_AXIS, CHART_TOOLTIP_STYLE, PALETTE } from "@/lib/chart-palette";
import { SectionHead } from "@/components/hc/SectionHead";
import { useSubholding } from "@/components/SubholdingProvider";
import { ScopeEmpty, inScope } from "@/components/ui/CommodityScope";

const dotColor = (ffa: number) =>
  ffa > 3.5 ? PALETTE.red : ffa > 3.0 ? PALETTE.amber : PALETTE.green;

const num = (v: number) => v.toLocaleString("id-ID", { minimumFractionDigits: 1 });

export function FfaVsOerChart() {
  // Domain: FFA & OER TBS di PKS (pabrik kelapa sawit) → milik PalmCo.
  const { active, def } = useSubholding();
  const luarCakupan = !inScope(active, "PKS");

  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-2.5 pt-3"
      style={{ "--d": "120ms" } as React.CSSProperties}
    >
      <SectionHead title="FFA vs OER per PKS" action="Lihat Detail" />
      <p className="mt-[3px] text-[9px] text-ink-500">
        Kadar FFA TBS Masuk (%) × Rendemen CPO (%) — 12 PKS Sampel
      </p>

      {luarCakupan ? (
        <ScopeEmpty label={def.fullLabel} />
      ) : (
      <>
      <div className="mt-1.5 min-h-0 w-full flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart margin={{ top: 10, right: 12, bottom: 0, left: -18 }}>
            <CartesianGrid stroke={CHART_AXIS.grid} />
            <XAxis
              type="number"
              dataKey="ffaPct"
              name="FFA"
              domain={[2.2, 4.3]}
              ticks={[2.4, 2.8, 3.2, 3.6, 4.0]}
              tickLine={false}
              axisLine={{ stroke: CHART_AXIS.axis }}
              tick={{ fontSize: 8.5, fill: CHART_AXIS.tick }}
              tickFormatter={(v: number) => `${num(v)}%`}
            />
            <YAxis
              type="number"
              dataKey="oerPct"
              name="OER"
              domain={[20, 24.5]}
              ticks={[20, 21, 22, 23, 24]}
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 8.5, fill: CHART_AXIS.tick }}
              tickFormatter={(v: number) => `${v}%`}
              width={38}
            />
            <Tooltip
              contentStyle={CHART_TOOLTIP_STYLE}
              cursor={{ strokeDasharray: "3 3", stroke: CHART_AXIS.axis }}
              formatter={(v: number, name: string) => [`${num(v)}%`, name]}
              labelFormatter={() => ""}
              content={({ payload }) => {
                const p = payload?.[0]?.payload as
                  | { pks: string; ffaPct: number; oerPct: number }
                  | undefined;
                if (!p) return null;
                return (
                  <div style={CHART_TOOLTIP_STYLE} className="px-2.5 py-1.5">
                    <div className="text-[9.5px] font-bold">PKS {p.pks}</div>
                    <div className="text-[8.5px]">
                      FFA {num(p.ffaPct)}% · OER {num(p.oerPct)}%
                    </div>
                  </div>
                );
              }}
            />
            <Scatter data={ffaOerPoints}>
              {ffaOerPoints.map((p) => (
                <Cell key={p.pks} fill={dotColor(p.ffaPct)} fillOpacity={0.85} />
              ))}
            </Scatter>
          </ScatterChart>
        </ResponsiveContainer>
      </div>

      <p className="pb-1 text-[9px] leading-snug text-ink-500">{ffaOerNote}</p>
      </>
      )}
    </div>
  );
}
