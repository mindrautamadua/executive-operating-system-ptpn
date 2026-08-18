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
import { sugarBench } from "@/lib/sbm-data";
import { CHART_AXIS, CHART_TOOLTIP_STYLE, PALETTE } from "@/lib/chart-palette";
import { SectionHead } from "@/components/hc/SectionHead";
import { useSubholding } from "@/components/SubholdingProvider";

const fmt2 = (v: number) =>
  v.toLocaleString("id-ID", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

const SHORT: Record<string, string> = {
  "SGN (PTPN)": "SGN",
  "Rata-rata Jawa": "Rata Jawa",
  "Swasta Domestik Terbaik": "Swasta Terbaik",
  "Brasil (Centre-South)": "Brasil",
};

const DATA = sugarBench.map((r) => ({
  name: SHORT[r.entity] ?? r.entity,
  entity: r.entity,
  rendemen: r.rendemenPct,
  isPtpn: r.isPtpn ?? false,
}));

/**
 * Rendemen gula SGN vs rata-rata Jawa, swasta domestik, Thailand & Brasil.
 * Entri PTPN di sini adalah SGN — PG/gula = SugarCo.
 * Pembanding eksternal tidak pernah disaring: menghapusnya merusak benchmark.
 */
export function SugarBenchmark() {
  const { active, isFiltered } = useSubholding();
  // Batang SGN diredupkan bila cakupan aktif bukan SugarCo.
  const dim = (isPtpn: boolean) => (!isFiltered || !isPtpn || active === "sugarco" ? 1 : 0.25);

  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-2.5 pt-3"
      style={{ "--d": "240ms" } as React.CSSProperties}
    >
      <SectionHead title="Benchmark Rendemen Gula" />
      <p className="mt-[3px] text-[9px] text-ink-500">
        Rendemen (%) SGN (SugarCo) vs Jawa, Thailand &amp; Brasil · Gap ke Thailand -3,75 pts
      </p>

      <div className="mt-1.5 min-h-0 w-full flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={DATA} margin={{ top: 18, right: 8, bottom: 4, left: -16 }} barCategoryGap="28%">
            <CartesianGrid stroke={CHART_AXIS.grid} vertical={false} />
            <XAxis
              dataKey="name"
              tickLine={false}
              axisLine={{ stroke: CHART_AXIS.axis }}
              tick={{ fontSize: 8, fill: CHART_AXIS.tick }}
              interval={0}
            />
            <YAxis
              domain={[0, 14]}
              ticks={[0, 3.5, 7, 10.5, 14]}
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 8.5, fill: CHART_AXIS.tick }}
              tickFormatter={(v: number) => `${v.toLocaleString("id-ID")}%`}
              width={40}
            />
            <Tooltip
              cursor={{ fill: "rgba(148,163,184,0.08)" }}
              contentStyle={CHART_TOOLTIP_STYLE}
              formatter={(v: number, _n: string, item: { payload?: { entity?: string } }) => [
                `${fmt2(v)}%`,
                item?.payload?.entity ?? "Rendemen",
              ]}
            />
            <Bar isAnimationActive={false} dataKey="rendemen" radius={[3, 3, 0, 0]} maxBarSize={34}>
              {DATA.map((d) => (
                <Cell
                  key={d.entity}
                  fill={d.isPtpn ? PALETTE.red : PALETTE.amber}
                  fillOpacity={dim(d.isPtpn)}
                />
              ))}
              <LabelList
                dataKey="rendemen"
                position="top"
                offset={5}
                formatter={(v: number) => `${fmt2(v)}%`}
                style={{ fontSize: 8.5, fill: "#334155", fontWeight: 700 }}
              />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
