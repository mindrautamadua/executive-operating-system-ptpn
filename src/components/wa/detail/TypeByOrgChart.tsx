"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { SectionHead } from "@/components/hc/SectionHead";
import { CHART_AXIS, CHART_TOOLTIP_STYLE } from "@/lib/chart-palette";
import { typeByOrg } from "@/lib/wa-detail-komposisi";

const SERIES = [
  { key: "tetap", label: "Tetap", color: "#1a9c5b" },
  { key: "pkwt", label: "PKWT", color: "#3b7ded" },
  { key: "bhl", label: "BHL", color: "#f5a524" },
  { key: "lainnya", label: "Lainnya", color: "#94a3b8" },
];

/** Komposisi status kerja per subholding — melihat siapa paling bergantung tenaga tidak tetap. */
export function TypeByOrgChart() {
  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-3 pt-3"
      style={{ "--d": "80ms" } as React.CSSProperties}
    >
      <SectionHead title="Status Kerja per Subholding" />
      <p className="mt-[3px] text-[9px] text-ink-500">
        Porsi tidak tetap tertinggi:{" "}
        <span className="font-bold text-[#d98b06]">
          PTPN IV {typeByOrg[0].tidakTetapPct.toString().replace(".", ",")}%
        </span>
      </p>

      <div className="mt-1 min-h-0 w-full flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={typeByOrg} margin={{ top: 10, right: 8, bottom: 0, left: -14 }} barSize={18}>
            <CartesianGrid stroke={CHART_AXIS.grid} vertical={false} />
            <XAxis
              dataKey="name"
              tickLine={false}
              axisLine={{ stroke: CHART_AXIS.axis }}
              tick={{ fontSize: 8, fill: CHART_AXIS.tick }}
              interval={0}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 8, fill: CHART_AXIS.tick }}
              tickFormatter={(v: number) => `${v / 1000}K`}
              width={34}
            />
            <Tooltip
              contentStyle={CHART_TOOLTIP_STYLE}
              formatter={(v: number, n: string) => [
                v.toLocaleString("id-ID"),
                SERIES.find((s) => s.key === n)?.label ?? n,
              ]}
            />
            <Legend
              verticalAlign="bottom"
              height={18}
              iconSize={7}
              wrapperStyle={{ fontSize: 8 }}
              formatter={(v: string) => SERIES.find((s) => s.key === v)?.label ?? v}
            />
            {SERIES.map((s, i) => (
              <Bar
                key={s.key}
                dataKey={s.key}
                stackId="t"
                fill={s.color}
                radius={i === SERIES.length - 1 ? [2, 2, 0, 0] : undefined}
                isAnimationActive={false}
              />
            ))}
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
