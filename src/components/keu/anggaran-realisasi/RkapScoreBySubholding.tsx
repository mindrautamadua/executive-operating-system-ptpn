"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { rkapScore } from "@/lib/kba-data";
import { CHART_AXIS, CHART_TOOLTIP_STYLE, PALETTE } from "@/lib/chart-palette";
import { fmtId } from "@/lib/keu-core";
import { SectionHead } from "@/components/hc/SectionHead";
import { useSubholding } from "@/components/SubholdingProvider";
import { toSubholdingId } from "@/lib/subholding";

const PRORATA = 41.7;

const LINI: { key: keyof (typeof rkapScore)[number]; label: string }[] = [
  { key: "pendapatan", label: "Pendapatan" },
  { key: "ebitda", label: "EBITDA" },
  { key: "laba", label: "Laba Bersih" },
  { key: "opex", label: "Opex" },
  { key: "capex", label: "Capex" },
];

const SEG_COLOR: Record<string, string> = {
  PalmCo: PALETTE.green,
  SGN: PALETTE.amber,
  "PTPN I": PALETTE.blue,
};

const data = LINI.map((l) => ({
  lini: l.label,
  PalmCo: rkapScore[0][l.key] as number,
  SGN: rkapScore[1][l.key] as number,
  "PTPN I": rkapScore[2][l.key] as number,
}));

export function RkapScoreBySubholding() {
  const { active, isFiltered } = useSubholding();
  // Grafik pembanding: seri subholding non-aktif diredupkan agar posisi relatif
  // antar subholding tetap terbaca. `segment` adalah dimensi subholdingnya.
  const dim = (segment: string) =>
    !isFiltered || toSubholdingId(segment) === active ? 1 : 0.25;

  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-2.5 pt-3"
      style={{ "--d": "120ms" } as React.CSSProperties}
    >
      <SectionHead title="Achievement RKAP per Subholding" />
      <p className="mt-[3px] text-[9px] text-ink-500">
        Achievement YTD vs RKAP FY per Lini (%) — garis putus: prorata 41,7%
      </p>

      <div className="mt-1.5 min-h-0 w-full flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 8, right: 4, bottom: 0, left: -18 }} barGap={2}>
            <CartesianGrid stroke={CHART_AXIS.grid} vertical={false} />
            <XAxis
              dataKey="lini"
              tickLine={false}
              axisLine={{ stroke: CHART_AXIS.axis }}
              tick={{ fontSize: 8.5, fill: CHART_AXIS.tick }}
              interval={0}
            />
            <YAxis
              domain={[0, 60]}
              ticks={[0, 20, 40, 60]}
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 8.5, fill: CHART_AXIS.tick }}
              tickFormatter={(v: number) => `${v}%`}
              width={34}
            />
            <Tooltip
              cursor={{ fill: "rgba(148,163,184,0.08)" }}
              contentStyle={CHART_TOOLTIP_STYLE}
              formatter={(v: number, name: string) => [`${fmtId(v, 1)}%`, name]}
            />
            <ReferenceLine
              y={PRORATA}
              stroke={PALETTE.slate}
              strokeDasharray="5 3"
              label={{
                value: "Prorata 41,7%",
                position: "insideTopRight",
                fontSize: 8.5,
                fill: "var(--chart-tick)",
              }}
            />
            <Bar
              dataKey="PalmCo"
              fill={SEG_COLOR.PalmCo}
              fillOpacity={dim("PalmCo")}
              radius={[2, 2, 0, 0]}
              maxBarSize={14}
            />
            <Bar
              dataKey="SGN"
              fill={SEG_COLOR.SGN}
              fillOpacity={dim("SGN")}
              radius={[2, 2, 0, 0]}
              maxBarSize={14}
            />
            <Bar
              dataKey="PTPN I"
              fill={SEG_COLOR["PTPN I"]}
              fillOpacity={dim("PTPN I")}
              radius={[2, 2, 0, 0]}
              maxBarSize={14}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="flex items-center justify-center gap-4 pb-1">
        {rkapScore.map((s) => (
          <span
            key={s.segment}
            className="flex items-center gap-1.5 text-[8.5px] text-ink-500 transition-opacity"
            style={{ opacity: dim(s.segment) }}
          >
            <span
              className="h-[7px] w-[7px] rounded-[2px]"
              style={{ background: SEG_COLOR[s.segment] }}
            />
            {s.segment}
            <span className="font-bold text-ink-900">Skor {fmtId(s.skor, 1)}</span>
          </span>
        ))}
      </div>
    </div>
  );
}
