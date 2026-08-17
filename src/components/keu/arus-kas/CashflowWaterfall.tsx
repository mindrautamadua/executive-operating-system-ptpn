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
import { cashflowWaterfall } from "@/lib/kas-data";
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

const NAME_2L: Record<string, string> = {
  "Saldo Awal (Des'25)": "Saldo Awal\n(Des'25)",
  "Arus Kas Operasi": "Arus Kas\nOperasi",
  "Arus Kas Investasi": "Arus Kas\nInvestasi",
  "Free Cash Flow": "Free\nCash Flow",
  "Arus Kas Pendanaan": "Arus Kas\nPendanaan",
  "Saldo Akhir (Mei'26)": "Saldo Akhir\n(Mei'26)",
};

const DATA: WfDatum[] = (() => {
  let run = 0;
  return cashflowWaterfall.map((s) => {
    const name = NAME_2L[s.label] ?? s.label;
    if (s.type === "start") {
      run = s.value;
      return { name, base: 0, delta: s.value, fill: PALETTE.blueSoft, label: fmtId(s.value, 1) };
    }
    if (s.type === "plus") {
      const base = run;
      run += s.value;
      return { name, base, delta: s.value, fill: PALETTE.green, label: `+${fmtId(s.value, 1)}` };
    }
    if (s.type === "minus") {
      run += s.value;
      return { name, base: run, delta: -s.value, fill: PALETTE.red, label: `−${fmtId(-s.value, 1)}` };
    }
    if (s.type === "subtotal") {
      // FCF: rentang dari saldo awal ke posisi setelah investasi (melayang).
      return { name, base: run - s.value, delta: s.value, fill: PALETTE.teal, label: fmtId(s.value, 1) };
    }
    return { name, base: 0, delta: s.value, fill: PALETTE.navy, label: fmtId(s.value, 1) };
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

/** Waterfall arus kas YTD: saldo 6,8 T → 7,9 T (FCF Rp 1,5 T). */
export function CashflowWaterfall() {
  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-2.5 pt-3"
      style={{ "--d": "60ms" } as React.CSSProperties}
    >
      <SectionHead title="Cashflow Waterfall (YTD)" badge={<ScopeNote />} />
      <p className="mt-[3px] text-[9px] text-ink-500">
        Pergerakan Saldo Kas Des&apos;25 → Mei&apos;26 · Rp T · konversi EBITDA→OCF 67%
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
              domain={[0, 12]}
              ticks={[0, 3, 6, 9, 12]}
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
            <Bar dataKey="base" stackId="cf" fill="transparent" isAnimationActive={false} />
            <Bar dataKey="delta" stackId="cf" radius={[2, 2, 0, 0]} maxBarSize={34}>
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
