"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  LabelList,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { elNinoScenarios, kiStats } from "@/lib/risk-data";
import { CHART_AXIS, CHART_TOOLTIP_STYLE, PALETTE } from "@/lib/chart-palette";
import { SectionHead } from "@/components/hc/SectionHead";
import { useSubholding } from "@/components/SubholdingProvider";

const BAR_COLOR = [PALETTE.amber, "#f0662d", PALETTE.red];

/** Tiga skenario El Nino H2 2026: dampak produksi & EBITDA berikut probabilitasnya. */
export function ElNinoScenario() {
  const { active, def } = useSubholding();
  // Dampak El Nino dihitung atas produksi TBS (kebun sawit) — cakupan PalmCo.
  const outOfScope = active !== "all" && active !== "palmco";

  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-2.5 pt-3"
      style={{ "--d": "120ms" } as React.CSSProperties}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <SectionHead title="Skenario El Nino H2 2026" />
          <p className="mt-[3px] text-[9px] text-ink-500">
            {outOfScope
              ? `Dampak dihitung atas produksi TBS PalmCo — di luar cakupan ${def.label}`
              : "Dampak Produksi & EBITDA per Skenario (Konsensus BMKG/NOAA)"}
          </p>
        </div>
        <span className="shrink-0 rounded-lg bg-[#fdecec] px-2 py-1 text-center leading-tight">
          <span className="block text-[13px] font-extrabold text-[#ef4444]">
            {kiStats.elNinoProbabilitasPct}%
          </span>
          <span className="block text-[7.5px] font-semibold text-ink-500">Probabilitas</span>
        </span>
      </div>

      <div
        className="mt-1.5 min-h-0 flex-1 transition-opacity"
        style={{ opacity: outOfScope ? 0.25 : 1 }}
      >
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={elNinoScenarios} margin={{ top: 16, right: 10, bottom: 0, left: -18 }}>
            <CartesianGrid stroke={CHART_AXIS.grid} vertical={false} />
            <XAxis
              dataKey="skenario"
              tickLine={false}
              axisLine={{ stroke: CHART_AXIS.axis }}
              tick={{ fontSize: 8.5, fill: CHART_AXIS.tick }}
            />
            <YAxis
              domain={[-3.5, 0]}
              ticks={[-3.5, -2.5, -1.5, -0.5, 0]}
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 8, fill: CHART_AXIS.tick }}
              tickFormatter={(v: number) => `${v}T`}
              width={38}
            />
            <Tooltip
              contentStyle={CHART_TOOLTIP_STYLE}
              cursor={{ fill: "var(--chart-grid)" }}
              formatter={(v: number) => [`Rp ${String(v).replace(".", ",")} T`, "Dampak EBITDA"]}
            />
            <Bar isAnimationActive={false} dataKey="dampakEbitdaRpT" radius={[3, 3, 0, 0]} maxBarSize={54}>
              {elNinoScenarios.map((s, i) => (
                <Cell key={s.skenario} fill={BAR_COLOR[i]} />
              ))}
              <LabelList
                dataKey="dampakEbitdaRpT"
                position="top"
                formatter={(v: number) => `Rp ${String(v).replace(".", ",")} T`}
                style={{ fontSize: 8, fill: "var(--chart-tick)", fontWeight: 700 }}
              />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <ul
        className="mt-1 grid grid-cols-2 md:grid-cols-3 gap-2 transition-opacity"
        style={{ opacity: outOfScope ? 0.25 : 1 }}
      >
        {elNinoScenarios.map((s) => (
          <li key={s.skenario} className="rounded-lg border border-[#eef2f6] bg-[#fbfcfd] px-2 py-1.5">
            <div className="flex items-baseline justify-between gap-1">
              <span className="text-[9px] font-extrabold text-ink-900">{s.skenario}</span>
              <span className="text-[8.5px] font-bold text-ink-500">{s.probabilitasPct}%</span>
            </div>
            <div className="mt-[2px] text-[9px] font-semibold text-[#ef4444]">
              Produksi H2 {s.dampakProduksiH2Pct}%
            </div>
            <p className="mt-[2px] text-[7.5px] leading-snug text-ink-500">{s.respons}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
