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
import { valueBridge } from "@/lib/svc-data";
import { CHART_AXIS, CHART_TOOLTIP_STYLE, PALETTE } from "@/lib/chart-palette";
import { SectionHead } from "@/components/hc/SectionHead";
import { ScopeNote } from "@/components/ui/ScopeNote";

const fmt = (v: number) =>
  v.toLocaleString("id-ID", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

interface WfDatum {
  name: string;
  base: number;
  delta: number;
  fill: string;
  label: string;
}

/** Nama pengungkit dua baris agar 6 kolom tetap terbaca. */
const NAME_2L: Record<string, string> = {
  "Efisiensi Biaya": "Efisiensi\nBiaya",
  "Yield & Rendemen": "Yield &\nRendemen",
  "Optimalisasi Aset": "Optimalisasi\nAset",
};

const DATA: WfDatum[] = (() => {
  let run = 0;
  const rows = valueBridge.map((s) => {
    const row: WfDatum = {
      name: NAME_2L[s.name] ?? s.name,
      base: run,
      delta: s.valueRpT,
      fill: PALETTE.blueSoft,
      label: fmt(s.valueRpT),
    };
    run += s.valueRpT;
    return row;
  });
  rows.push({
    name: "Total\nYTD",
    base: 0,
    delta: run,
    fill: PALETTE.green,
    label: fmt(run),
  });
  return rows;
})();

function MultilineTick({ x, y, payload }: { x?: number; y?: number; payload?: { value?: string } }) {
  const lines = String(payload?.value ?? "").split("\n");
  return (
    <text x={x} y={(y ?? 0) + 8} textAnchor="middle" fontSize={8} fill="var(--chart-tick)">
      {lines.map((line, i) => (
        <tspan key={line} x={x} dy={i === 0 ? 0 : 8}>
          {line}
        </tspan>
      ))}
    </text>
  );
}

/**
 * Waterfall sumber nilai: 5 pengungkit mengalir ke realisasi Rp 1,86 T YTD.
 * Jembatan hanya bermakna di tingkat grup (tanpa pecahan subholding) — RULE B.
 */
export function ValueBridge() {
  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-2.5 pt-3"
      style={{ "--d": "60ms" } as React.CSSProperties}
    >
      <SectionHead title="Value Bridge — Sumber Nilai" action="Lihat Detail" badge={<ScopeNote />} />
      <p className="mt-[3px] text-[9px] text-ink-500">
        Kontribusi Pengungkit terhadap EBITDA Uplift YTD · Rp T
      </p>

      <div className="mt-1.5 min-h-0 w-full flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={DATA}
            margin={{ top: 16, right: 6, bottom: 8, left: -18 }}
            barCategoryGap="26%"
          >
            <CartesianGrid stroke={CHART_AXIS.grid} vertical={false} />
            <XAxis
              dataKey="name"
              tickLine={false}
              axisLine={{ stroke: CHART_AXIS.axis }}
              tick={<MultilineTick />}
              interval={0}
              height={26}
            />
            <YAxis
              domain={[0, 2]}
              ticks={[0, 0.5, 1, 1.5, 2]}
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 8.5, fill: CHART_AXIS.tick }}
              tickFormatter={(v: number) => `${fmt(v)} T`}
              width={44}
            />
            <Tooltip
              cursor={{ fill: "rgba(148,163,184,0.08)" }}
              contentStyle={CHART_TOOLTIP_STYLE}
              formatter={(v: number, _n: string, item: { dataKey?: string | number }) =>
                item?.dataKey === "base" ? [null, null] : [`Rp ${fmt(v)} T`, "Nilai"]
              }
              labelFormatter={(l: string) => l.replace("\n", " ")}
            />
            {/* dasar transparan agar bar delta "melayang" ala waterfall */}
            <Bar dataKey="base" stackId="wf" fill="transparent" isAnimationActive={false} />
            <Bar dataKey="delta" stackId="wf" radius={[2, 2, 0, 0]} maxBarSize={38}>
              {DATA.map((d) => (
                <Cell key={d.name} fill={d.fill} />
              ))}
              <LabelList
                dataKey="label"
                position="top"
                offset={5}
                style={{ fontSize: 8.5, fill: "#334155", fontWeight: 700 }}
              />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
