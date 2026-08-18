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
import { benefitsWaterfall } from "@/lib/stf-data";
import { CATEGORICAL, CHART_AXIS, CHART_TOOLTIP_STYLE, PALETTE } from "@/lib/chart-palette";
import { SectionHead } from "@/components/hc/SectionHead";
import { ScopeNote } from "@/components/ui/ScopeNote";

const SHORT: Record<string, string> = {
  "Operational Excellence": "Ops Excellence",
  Hilirisasi: "Hilirisasi",
  "Restrukturisasi Portofolio": "Restrukturisasi",
  "Swasembada Gula 2028": "Swasembada Gula",
  "Digitalisasi & ERP": "Digital & ERP",
  "Dekarbonisasi & EBT": "Dekarbonisasi",
};

interface Step {
  name: string;
  base: number;
  val: number;
  fill: string;
}

// Waterfall benefit YTD per program via stacked bar dengan base transparan.
const data: Step[] = (() => {
  let cum = 0;
  const steps: Step[] = benefitsWaterfall.map((b, i) => {
    const base = cum;
    cum += b.valueRpT;
    return {
      name: SHORT[b.name] ?? b.name,
      base,
      val: b.valueRpT,
      fill: CATEGORICAL[i % CATEGORICAL.length],
    };
  });
  steps.push({ name: "Total YTD", base: 0, val: cum, fill: PALETTE.navy });
  return steps;
})();

const rp = (v: number) =>
  `Rp ${v.toLocaleString("id-ID", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} T`;

/**
 * Kontribusi benefit YTD tiap program transformasi menuju total Rp 1,86 T.
 * Waterfall dipecah per program, bukan per subholding — angka tetap grup, RULE B.
 */
export function TransformationBenefits() {
  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-2.5 pt-3"
      style={{ "--d": "300ms" } as React.CSSProperties}
    >
      <SectionHead title="Transformation Benefits" action="Lihat Detail" badge={<ScopeNote />} />
      <p className="mt-[3px] text-[9px] text-ink-500">
        Waterfall Kontribusi Benefit YTD per Program (Rp Triliun) — Total Rp 1,86 T
      </p>

      <div className="mt-1.5 min-h-0 w-full flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 16, right: 10, bottom: 0, left: -14 }}
            barCategoryGap="24%"
          >
            <CartesianGrid stroke={CHART_AXIS.grid} vertical={false} />
            <XAxis
              dataKey="name"
              tickLine={false}
              axisLine={{ stroke: CHART_AXIS.axis }}
              tick={{ fontSize: 8.5, fill: CHART_AXIS.tick }}
              interval={0}
            />
            <YAxis
              domain={[0, 2]}
              ticks={[0, 0.5, 1, 1.5, 2]}
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 8.5, fill: CHART_AXIS.tick }}
              tickFormatter={(v: number) => v.toLocaleString("id-ID")}
              width={32}
            />
            <Tooltip
              cursor={{ fill: "rgba(148,163,184,0.08)" }}
              labelFormatter={() => ""}
              contentStyle={CHART_TOOLTIP_STYLE}
              formatter={(v: number, name: string, item) =>
                name === "val" ? [rp(v), (item.payload as Step).name] : [null, null]
              }
            />
            <Bar dataKey="base" stackId="w" fill="transparent" isAnimationActive={false} />
            <Bar dataKey="val" stackId="w" radius={[3, 3, 0, 0]}>
              {data.map((d) => (
                <Cell key={d.name} fill={d.fill} />
              ))}
              <LabelList
                dataKey="val"
                position="top"
                offset={4}
                formatter={(v: number) =>
                  v.toLocaleString("id-ID", { minimumFractionDigits: 2, maximumFractionDigits: 2 })
                }
                style={{ fontSize: 8.5, fill: "var(--text-1)", fontWeight: 700 }}
              />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <p className="mt-1 truncate text-[9px] text-ink-500">
        Operational Excellence menyumbang 42% benefit YTD; Dekarbonisasi terkecil (Rp 0,11 T).
      </p>
    </div>
  );
}
