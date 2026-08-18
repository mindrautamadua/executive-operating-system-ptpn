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
import { segmentFinancials, fmtRpT } from "@/lib/keu-core";
import { CHART_AXIS, CHART_TOOLTIP_STYLE, PALETTE } from "@/lib/chart-palette";
import { SectionHead } from "@/components/hc/SectionHead";
import { useSubholding } from "@/components/SubholdingProvider";
import { toSubholdingId } from "@/lib/subholding";

const SEGMENT_COLOR: Record<string, string> = {
  PalmCo: PALETTE.green,
  SGN: PALETTE.amber,
  "PTPN I": PALETTE.blue,
};

/** Dua kategori (Pendapatan & EBITDA), masing-masing di-stack per subholding. */
const data = [
  {
    name: "Pendapatan",
    ...Object.fromEntries(segmentFinancials.map((s) => [s.segment, s.revenueRpT])),
  },
  {
    name: "EBITDA",
    ...Object.fromEntries(segmentFinancials.map((s) => [s.segment, s.ebitdaRpT])),
  },
];

export function SegmentContribution() {
  const { active, isFiltered, def } = useSubholding();
  // `segment` (PalmCo / SGN / PTPN I) adalah dimensi subholding seri ini.
  // Grafik pembanding: seri non-aktif diredupkan agar porsi antar subholding
  // tetap terbaca, alih-alih menyisakan satu tumpukan tunggal.
  const dim = (segment: string) =>
    !isFiltered || toSubholdingId(segment) === active ? 1 : 0.25;

  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-2.5 pt-3"
      style={{ "--d": "120ms" } as React.CSSProperties}
    >
      <SectionHead title="Segment Contribution" action="Lihat Detail" />
      <p className="mt-[3px] text-[9px] text-ink-500">
        {isFiltered
          ? `Pendapatan & EBITDA ${def.label} dalam konteks grup, YTD (Rp T)`
          : "Pendapatan & EBITDA per Subholding, YTD (Rp T)"}
      </p>

      <div className="mt-1.5 min-h-0 w-full flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 8, right: 6, bottom: 0, left: -18 }}>
            <CartesianGrid stroke={CHART_AXIS.grid} vertical={false} />
            <XAxis
              dataKey="name"
              tickLine={false}
              axisLine={{ stroke: CHART_AXIS.axis }}
              tick={{ fontSize: 8.5, fill: CHART_AXIS.tick }}
              interval={0}
            />
            <YAxis
              domain={[0, 25]}
              ticks={[0, 5, 10, 15, 20, 25]}
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 8.5, fill: CHART_AXIS.tick }}
              tickFormatter={(v: number) => (v === 0 ? "0" : `${v} T`)}
              width={40}
            />
            <Tooltip
              cursor={{ fill: "rgba(34,164,93,0.06)" }}
              formatter={(v: number, name: string) => [fmtRpT(v, 2), name]}
              contentStyle={CHART_TOOLTIP_STYLE}
            />
            {segmentFinancials.map((s, i) => (
              <Bar isAnimationActive={false}
                key={s.segment}
                name={s.segment}
                dataKey={s.segment}
                stackId="a"
                fill={SEGMENT_COLOR[s.segment]}
                fillOpacity={dim(s.segment)}
                barSize={44}
                radius={i === segmentFinancials.length - 1 ? [2, 2, 0, 0] : undefined}
              />
            ))}
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="mb-1 flex items-center justify-center gap-4">
        {segmentFinancials.map((s) => (
          <span
            key={s.segment}
            className="flex items-center gap-1.5 text-[8.5px] text-ink-500 transition-opacity"
            style={{ opacity: dim(s.segment) }}
          >
            <span
              className="h-[7px] w-[7px] rounded-full"
              style={{ background: SEGMENT_COLOR[s.segment] }}
            />
            {s.segment}
            <span className="font-semibold text-ink-700">Margin {s.ebitdaMarginPct.toLocaleString("id-ID")}%</span>
          </span>
        ))}
      </div>
    </div>
  );
}
