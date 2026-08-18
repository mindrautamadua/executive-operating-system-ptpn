"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { effluentCompliance } from "@/lib/esg-data-detail";
import { CHART_AXIS, CHART_TOOLTIP_STYLE, PALETTE } from "@/lib/chart-palette";
import { SectionHead } from "@/components/hc/SectionHead";
import { useSubholding } from "@/components/SubholdingProvider";

const data = effluentCompliance.map((r) => ({
  ...r,
  label: r.regional.replace(/ \(.*\)$/, "").replace("Regional ", "R"),
}));

const pct = (v: number) => `${v.toLocaleString("id-ID", { minimumFractionDigits: 1 })}%`;

/** Kepatuhan baku mutu effluent per regional vs ambang internal 95%. */
export function EffluentCompliance() {
  const { active, def } = useSubholding();
  // IPAL yang diuji adalah kolam limbah PKS di Regional 1–7 (pecahan internal
  // PalmCo), jadi seluruh kartu ini berada di cakupan PalmCo.
  const outOfScope = active !== "all" && active !== "palmco";

  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-2.5 pt-3"
      style={{ "--d": "120ms" } as React.CSSProperties}
    >
      <SectionHead title="Kepatuhan Effluent per Regional" />
      <p className="mt-[3px] text-[9px] text-ink-500">
        {outOfScope
          ? `Pecahan regional IPAL PKS hanya untuk PalmCo — di luar cakupan ${def.label}`
          : "Uji Baku Mutu IPAL 12 Bulan · Grup 96,2% · 2 regional amber"}
      </p>

      <div
        className="mt-1.5 min-h-0 w-full flex-1 transition-opacity"
        style={{ opacity: outOfScope ? 0.25 : 1 }}
      >
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 12, right: 10, bottom: 0, left: -14 }}>
            <CartesianGrid stroke={CHART_AXIS.grid} vertical={false} />
            <XAxis
              dataKey="label"
              tickLine={false}
              axisLine={{ stroke: CHART_AXIS.axis }}
              tick={{ fontSize: 8, fill: CHART_AXIS.tick }}
              interval={0}
            />
            <YAxis
              domain={[90, 100]}
              ticks={[90, 92.5, 95, 97.5, 100]}
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 8.5, fill: CHART_AXIS.tick }}
              width={34}
            />
            <Tooltip
              formatter={(v: number) => [pct(v), "Kepatuhan"]}
              labelFormatter={(_, p) => (p?.[0]?.payload as { regional: string })?.regional ?? ""}
              contentStyle={CHART_TOOLTIP_STYLE}
            />
            <ReferenceLine
              y={95}
              stroke={PALETTE.red}
              strokeDasharray="4 3"
              label={{
                value: "Ambang 95%",
                position: "insideTopRight",
                fill: PALETTE.red,
                fontSize: 8,
                fontWeight: 700,
              }}
            />
            <Bar isAnimationActive={false} dataKey="compliancePct" radius={[3, 3, 0, 0]} barSize={22}>
              {data.map((d) => (
                <Cell
                  key={d.regional}
                  fill={d.status === "Amber" ? PALETTE.amber : PALETTE.green}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
