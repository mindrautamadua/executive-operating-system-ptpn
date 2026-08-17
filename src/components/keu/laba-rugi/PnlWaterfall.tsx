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
import { pnlWaterfall } from "@/lib/kpl-data";
import { fmtId } from "@/lib/keu-core";
import { CHART_AXIS, CHART_TOOLTIP_STYLE, PALETTE } from "@/lib/chart-palette";
import { SectionHead } from "../../hc/SectionHead";
import { ScopeNote } from "@/components/ui/ScopeNote";

interface WfDatum {
  name: string;
  base: number;
  delta: number;
  fill: string;
  label: string;
}

/** Nama kategori dua baris agar 8 kolom tetap terbaca. */
const NAME_2L: Record<string, string> = {
  "Beban Bunga (neto)": "Beban Bunga\n(neto)",
  "Laba Kotor": "Laba\nKotor",
  "Laba Bersih": "Laba\nBersih",
};

const DATA: WfDatum[] = (() => {
  let run = 0;
  return pnlWaterfall.map((s) => {
    const name = NAME_2L[s.label] ?? s.label;
    if (s.type === "start") {
      run = s.value;
      return { name, base: 0, delta: s.value, fill: PALETTE.blueSoft, label: fmtId(s.value) };
    }
    if (s.type === "minus") {
      run += s.value;
      return {
        name,
        base: run,
        delta: -s.value,
        fill: PALETTE.red,
        label: `−${fmtId(-s.value, 2)}`,
      };
    }
    return {
      name,
      base: 0,
      delta: s.value,
      fill: s.type === "total" ? PALETTE.green : PALETTE.blueSoft,
      label: fmtId(s.value, s.type === "total" ? 2 : 1),
    };
  });
})();

function MultilineTick({ x = 0, y = 0, payload }: { x?: number; y?: number; payload?: { value: string | number } }) {
  const lines = String(payload?.value).split("\n");
  return (
    <text x={x} y={y + 8} textAnchor="middle" fontSize={7} fill="var(--chart-tick)">
      {lines.map((line: string, i: number) => (
        <tspan key={line} x={x} dy={i === 0 ? 0 : 8}>
          {line}
        </tspan>
      ))}
    </text>
  );
}

/** Waterfall P&L YTD: Pendapatan 24,6 T mengalir ke Laba Bersih 2,94 T. */
export function PnlWaterfall() {
  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-2.5 pt-3"
      style={{ "--d": "60ms" } as React.CSSProperties}
    >
      <SectionHead title="P&L Waterfall (YTD)" badge={<ScopeNote />} />
      <p className="mt-[3px] text-[9px] text-ink-500">
        Alur Pendapatan → Laba Bersih Konsolidasi · Rp T · EBITDA = EBIT + D&amp;A Rp 1,72 T
      </p>

      <div className="mt-1.5 min-h-0 w-full flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={DATA} margin={{ top: 16, right: 4, bottom: 8, left: -14 }} barCategoryGap="24%">
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
              domain={[0, 25]}
              ticks={[0, 5, 10, 15, 20, 25]}
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 8.5, fill: CHART_AXIS.tick }}
              tickFormatter={(v: number) => `${v} T`}
              width={38}
            />
            <Tooltip
              cursor={{ fill: "rgba(148,163,184,0.08)" }}
              contentStyle={CHART_TOOLTIP_STYLE}
              formatter={(v: number, _n: string, item: { dataKey?: string | number; payload?: { label: string } }) =>
                item?.dataKey === "base"
                  ? [null, null]
                  : [`Rp ${item.payload?.label.replace("−", "-")} T`, "Nilai"]
              }
              labelFormatter={(l: string) => l.replace("\n", " ")}
            />
            {/* dasar transparan agar bar delta "melayang" ala waterfall */}
            <Bar dataKey="base" stackId="wf" fill="transparent" isAnimationActive={false} />
            <Bar dataKey="delta" stackId="wf" radius={[2, 2, 0, 0]} maxBarSize={34}>
              {DATA.map((d) => (
                <Cell key={d.name} fill={d.fill} />
              ))}
              <LabelList
                dataKey="label"
                position="top"
                offset={5}
                style={{ fontSize: 7.5, fill: "#334155", fontWeight: 700 }}
              />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
