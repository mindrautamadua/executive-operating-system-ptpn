"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { capexByCategory } from "@/lib/kcx-data";
import { CHART_AXIS, CHART_TOOLTIP_STYLE, PALETTE } from "@/lib/chart-palette";
import { fmtRpT } from "@/lib/keu-core";
import { SectionHead } from "@/components/hc/SectionHead";
import { ScopeNote } from "@/components/ui/ScopeNote";

interface TickProps {
  x?: number;
  y?: number;
  payload?: { value: string };
}

/** Tick dua baris untuk nama kategori panjang. */
function MultilineTick({ x = 0, y = 0, payload }: TickProps) {
  const lines = String(payload?.value ?? "").split("\n");
  return (
    <text x={x} y={y + 8} textAnchor="middle" fontSize={8} fill="var(--chart-tick)">
      {lines.map((line, i) => (
        <tspan key={line} x={x} dy={i === 0 ? 0 : 8}>
          {line}
        </tspan>
      ))}
    </text>
  );
}

const data = capexByCategory.map((c) => ({
  ...c,
  name: c.name === "Pabrik & Revitalisasi" ? "Pabrik &\nRevitalisasi" : c.name,
}));

export function CapexByCategory() {
  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-2.5 pt-3"
      style={{ "--d": "60ms" } as React.CSSProperties}
    >
      <SectionHead title="Capex per Kategori" badge={<ScopeNote />} />
      <p className="mt-[3px] text-[9px] text-ink-500">
        Plafon RKAP FY vs Realisasi YTD per Kategori (Rp T)
      </p>

      <div className="mt-1.5 min-h-0 w-full flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 8, right: 4, bottom: 0, left: -18 }} barGap={2}>
            <CartesianGrid stroke={CHART_AXIS.grid} vertical={false} />
            <XAxis
              dataKey="name"
              tickLine={false}
              axisLine={{ stroke: CHART_AXIS.axis }}
              tick={<MultilineTick />}
              interval={0}
              height={22}
            />
            <YAxis
              domain={[0, 3.5]}
              ticks={[0, 1, 2, 3]}
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 8.5, fill: CHART_AXIS.tick }}
              width={30}
            />
            <Tooltip
              cursor={{ fill: "rgba(148,163,184,0.08)" }}
              contentStyle={CHART_TOOLTIP_STYLE}
              formatter={(v: number, name: string) => [
                fmtRpT(v, 2),
                name === "plan" ? "RKAP FY" : "Realisasi YTD",
              ]}
            />
            <Bar dataKey="plan" fill={PALETTE.blueSoft} radius={[2, 2, 0, 0]} maxBarSize={18} />
            <Bar dataKey="actual" fill={PALETTE.green} radius={[2, 2, 0, 0]} maxBarSize={18} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="flex items-center justify-center gap-4 pb-1">
        <span className="flex items-center gap-1.5 text-[8.5px] text-ink-500">
          <span className="h-[7px] w-[7px] rounded-[2px]" style={{ background: PALETTE.blueSoft }} />
          RKAP FY Rp 9,6 T
        </span>
        <span className="flex items-center gap-1.5 text-[8.5px] text-ink-500">
          <span className="h-[7px] w-[7px] rounded-[2px]" style={{ background: PALETTE.green }} />
          Realisasi YTD Rp 3,08 T
        </span>
      </div>
    </div>
  );
}
