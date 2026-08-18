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
import { ebitdaBridge } from "@/lib/kpl-data";
import { fmtId } from "@/lib/keu-core";
import { CHART_AXIS, CHART_TOOLTIP_STYLE, PALETTE } from "@/lib/chart-palette";
import { SectionHead } from "../../hc/SectionHead";
import { ScopeNote } from "@/components/ui/ScopeNote";

interface BridgeDatum {
  name: string;
  base: number;
  delta: number;
  fill: string;
  label: string;
}

const NAME_2L: Record<string, string> = {
  "RKAP Prorata YTD": "RKAP\nProrata YTD",
  "Harga Jual": "Harga\nJual",
  "Mix & Lainnya": "Mix &\nLainnya",
  "Realisasi YTD": "Realisasi\nYTD",
};

/** Lantai sumbu Y (zoom); bar start/total digambar dari lantai agar tidak keluar plot. */
const FLOOR = 5.5;

const DATA: BridgeDatum[] = (() => {
  let run = 0;
  return ebitdaBridge.map((s) => {
    const name = NAME_2L[s.label] ?? s.label;
    if (s.type === "start") {
      run = s.value;
      return {
        name,
        base: FLOOR,
        delta: s.value - FLOOR,
        fill: PALETTE.blueSoft,
        label: fmtId(s.value, 2),
      };
    }
    if (s.type === "plus") {
      const base = run;
      run += s.value;
      return { name, base, delta: s.value, fill: PALETTE.green, label: `+${fmtId(s.value, 2)}` };
    }
    if (s.type === "minus") {
      run += s.value;
      return { name, base: run, delta: -s.value, fill: PALETTE.red, label: `−${fmtId(-s.value, 2)}` };
    }
    return {
      name,
      base: FLOOR,
      delta: s.value - FLOOR,
      fill: PALETTE.navy,
      label: fmtId(s.value, 2),
    };
  });
})();

function MultilineTick({ x = 0, y = 0, payload }: { x?: number; y?: number; payload?: { value: string | number } }) {
  const lines = String(payload?.value).split("\n");
  return (
    <text x={x} y={y + 8} textAnchor="middle" fontSize={8} fill="var(--chart-tick)">
      {lines.map((line: string, i: number) => (
        <tspan key={line} x={x} dy={i === 0 ? 0 : 8}>
          {line}
        </tspan>
      ))}
    </text>
  );
}

/** Bridge EBITDA vs RKAP YTD: 6,30 → 6,82 (surplus Rp 0,52 T). */
export function EbitdaBridge() {
  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-2.5 pt-3"
      style={{ "--d": "120ms" } as React.CSSProperties}
    >
      <SectionHead title="EBITDA Bridge vs RKAP" badge={<ScopeNote />} />
      <p className="mt-[3px] text-[9px] text-ink-500">
        Dekomposisi Surplus EBITDA +Rp 0,52 T vs RKAP Prorata · Rp T
      </p>

      <div className="mt-1.5 min-h-0 w-full flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={DATA} margin={{ top: 16, right: 4, bottom: 8, left: -10 }} barCategoryGap="24%">
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
              domain={[5.5, 7.5]}
              ticks={[5.5, 6, 6.5, 7, 7.5]}
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 8.5, fill: CHART_AXIS.tick }}
              tickFormatter={(v: number) => fmtId(v, 1)}
              width={34}
            />
            <Tooltip
              cursor={{ fill: "rgba(148,163,184,0.08)" }}
              contentStyle={CHART_TOOLTIP_STYLE}
              formatter={(v: number, _n: string, item: { dataKey?: string | number; payload?: { label: string } }) =>
                item?.dataKey === "base"
                  ? [null, null]
                  : [`Rp ${item.payload?.label.replace("−", "-")} T`, "Kontribusi"]
              }
              labelFormatter={(l: string) => l.replace("\n", " ")}
            />
            <Bar dataKey="base" stackId="br" fill="transparent" isAnimationActive={false} />
            <Bar dataKey="delta" stackId="br" radius={[2, 2, 0, 0]} maxBarSize={34}>
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
