"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { progressNote, progressPerRegional } from "@/lib/arp-data";
import { CHART_AXIS, CHART_TOOLTIP_STYLE, PALETTE } from "@/lib/chart-palette";
import { SectionHead } from "@/components/hc/SectionHead";
import { useSubholding } from "@/components/SubholdingProvider";

const ha = (v: number) => v.toLocaleString("id-ID");

const data = progressPerRegional.map((r) => ({
  ...r,
  short: r.regional.replace("Regional ", "R"),
}));

/** Rencana prorata vs realisasi replanting YTD per regional. */
export function ReplantingProgress() {
  const { active } = useSubholding();
  // Pemetaan domain: tanam ulang sawit di Regional 1–7 — cakupan PalmCo.
  const outOfScope = active !== "all" && active !== "palmco";

  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-2.5 pt-3"
      style={{ "--d": "60ms" } as React.CSSProperties}
    >
      <SectionHead title="Progress Replanting per Regional" action="Lihat Detail" />
      <p className="mt-[3px] text-[9px] text-ink-500">
        {outOfScope
          ? "Program replanting sawit hanya untuk PalmCo"
          : "Rencana Prorata vs Realisasi YTD (Ha) · Target FY 12.500 Ha"}
      </p>

      <div
        className="mt-1.5 min-h-0 w-full flex-1 transition-opacity"
        style={{ opacity: outOfScope ? 0.25 : 1 }}
      >
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 16, right: 6, bottom: 0, left: -8 }}
            barCategoryGap="26%"
          >
            <CartesianGrid stroke={CHART_AXIS.grid} vertical={false} />
            <XAxis
              dataKey="short"
              tickLine={false}
              axisLine={{ stroke: CHART_AXIS.axis }}
              tick={{ fontSize: 8, fill: CHART_AXIS.tick }}
              interval={0}
            />
            <YAxis
              domain={[0, 1200]}
              ticks={[0, 400, 800, 1200]}
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 8, fill: CHART_AXIS.tick }}
              width={40}
              tickFormatter={(v: number) => ha(v)}
            />
            <Tooltip
              cursor={{ fill: "rgba(148,163,184,0.08)" }}
              contentStyle={CHART_TOOLTIP_STYLE}
              formatter={(v: number, n: string) => [`${ha(v)} ha`, n]}
            />
            <Legend
              verticalAlign="top"
              align="right"
              height={14}
              iconType="circle"
              iconSize={7}
              wrapperStyle={{ fontSize: 8.5, color: CHART_AXIS.tick }}
            />
            <Bar
              dataKey="planYtdHa"
              name="Rencana YTD"
              fill={PALETTE.slate}
              fillOpacity={0.75}
              radius={[3, 3, 0, 0]}
              maxBarSize={22}
            />
            <Bar
              dataKey="aktualYtdHa"
              name="Realisasi YTD"
              fill={PALETTE.green}
              radius={[3, 3, 0, 0]}
              maxBarSize={22}
            >
              <LabelList
                dataKey="capaianPct"
                position="top"
                offset={5}
                formatter={(v: React.ReactNode) => `${String(v).replace(".", ",")}%`}
                style={{ fontSize: 8, fill: "#334155", fontWeight: 700 }}
              />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <p className="pb-1 text-[9px] leading-snug text-ink-500">{progressNote}</p>
    </div>
  );
}
