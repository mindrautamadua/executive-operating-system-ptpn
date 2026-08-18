"use client";

import {
  Bar,
  CartesianGrid,
  ComposedChart,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { millUtilization, millUtilizationNote } from "@/lib/afs-data";
import { CHART_AXIS, CHART_TOOLTIP_STYLE, PALETTE } from "@/lib/chart-palette";
import { SectionHead } from "@/components/hc/SectionHead";
import { useSubholding } from "@/components/SubholdingProvider";

const num = (v: number) =>
  v.toLocaleString("id-ID", { minimumFractionDigits: 1, maximumFractionDigits: 1 });

const data = millUtilization.map((m) => ({
  ...m,
  short: m.regional.replace("Regional ", "R").replace(/ \(.*\)/, ""),
}));

/** Kapasitas terpasang vs efektif per regional + garis utilisasi terhadap target. */
export function MillUtilization() {
  const { active } = useSubholding();
  // Pemetaan domain: PKS mengolah TBS sawit di Regional 1–7 — seluruh kartu ini
  // berada di cakupan PalmCo.
  const outOfScope = active !== "all" && active !== "palmco";

  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-2.5 pt-3"
      style={{ "--d": "60ms" } as React.CSSProperties}
    >
      <SectionHead title="Kapasitas & Utilisasi PKS" action="Lihat Detail" />
      <p className="mt-[3px] text-[9px] text-ink-500">
        {outOfScope
          ? "Kapasitas & utilisasi PKS hanya untuk PalmCo"
          : "Kapasitas Terpasang vs Efektif (ton TBS/jam) & Utilisasi per Regional"}
      </p>

      <div
        className="mt-1.5 min-h-0 w-full flex-1 transition-opacity"
        style={{ opacity: outOfScope ? 0.25 : 1 }}
      >
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={data} margin={{ top: 12, right: -6, bottom: 0, left: -18 }}>
            <CartesianGrid stroke={CHART_AXIS.grid} vertical={false} />
            <XAxis
              dataKey="short"
              tickLine={false}
              axisLine={{ stroke: CHART_AXIS.axis }}
              tick={{ fontSize: 8.5, fill: CHART_AXIS.tick }}
              interval={0}
            />
            <YAxis
              yAxisId="kap"
              domain={[0, 400]}
              ticks={[0, 100, 200, 300, 400]}
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 8.5, fill: CHART_AXIS.tick }}
            />
            <YAxis
              yAxisId="util"
              orientation="right"
              domain={[50, 100]}
              ticks={[50, 62.5, 75, 87.5, 100]}
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 8.5, fill: CHART_AXIS.tick }}
              tickFormatter={(v: number) => `${v}%`}
            />
            <Tooltip
              cursor={{ fill: "rgba(148,163,184,0.08)" }}
              formatter={(v: number, name: string) =>
                name === "Utilisasi" || name === "Target"
                  ? [`${num(v)}%`, name]
                  : [`${v.toLocaleString("id-ID")} ton/jam`, name]
              }
              contentStyle={CHART_TOOLTIP_STYLE}
            />
            <Bar
              yAxisId="kap"
              name="Kapasitas Terpasang"
              dataKey="kapasitasTerpasang"
              fill={PALETTE.slate}
              fillOpacity={0.35}
              barSize={22}
              radius={[3, 3, 0, 0]}
            />
            <Bar
              yAxisId="kap"
              name="Kapasitas Efektif"
              dataKey="kapasitasEfektif"
              fill={PALETTE.blue}
              fillOpacity={0.85}
              barSize={22}
              radius={[3, 3, 0, 0]}
            />
            <Line
              yAxisId="util"
              name="Utilisasi"
              type="linear"
              dataKey="utilisasiPct"
              stroke={PALETTE.green}
              strokeWidth={1.8}
              dot={{ r: 2.4, fill: PALETTE.green, strokeWidth: 0 }}
              activeDot={{ r: 4 }}
            />
            <Line
              yAxisId="util"
              name="Target"
              type="linear"
              dataKey="targetPct"
              stroke={PALETTE.navy}
              strokeWidth={1.3}
              strokeDasharray="5 4"
              dot={false}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      <p className="mt-1 line-clamp-2 text-[9px] leading-snug text-ink-500">{millUtilizationNote}</p>
    </div>
  );
}
