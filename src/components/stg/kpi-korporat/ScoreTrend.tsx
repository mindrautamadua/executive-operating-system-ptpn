"use client";

import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { scoreTrend } from "@/lib/skc-data";
import { CHART_AXIS, CHART_TOOLTIP_STYLE, PALETTE } from "@/lib/chart-palette";
import { SectionHead } from "@/components/hc/SectionHead";
import { useSubholding } from "@/components/SubholdingProvider";
import { toSubholdingId } from "@/lib/subholding";

const SERIES = [
  { key: "group", label: "PTPN Group", color: PALETTE.green, width: 2.2 },
  { key: "palmco", label: "PalmCo", color: PALETTE.teal, width: 1.6 },
  { key: "sgn", label: "SGN", color: PALETTE.amber, width: 1.6 },
  { key: "ptpn1", label: "PTPN I", color: PALETTE.blue, width: 1.6 },
] as const;

const LABELS: Record<string, string> = Object.fromEntries(SERIES.map((s) => [s.key, s.label]));

/** Tren skor komposit 8 kuartal — Group vs 3 subholding. */
export function ScoreTrend() {
  const { active, isFiltered } = useSubholding();
  // Garis pembanding: seri subholding non-aktif diredupkan agar divergensi tetap
  // terbaca; garis PTPN Group selalu penuh.
  const dim = (label: string) => {
    const sub = toSubholdingId(label);
    return !isFiltered || sub === null || sub === active ? 1 : 0.25;
  };

  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-2.5 pt-3"
      style={{ "--d": "120ms" } as React.CSSProperties}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <SectionHead title="Tren Skor Komposit" />
          <p className="mt-[3px] text-[9px] text-ink-500">
            Skor KPI Korporat 8 Kuartal Terakhir · Divergensi PalmCo–SGN 8,6 pts
          </p>
        </div>
        <div className="flex shrink-0 flex-wrap items-center justify-end gap-x-2.5 gap-y-1">
          {SERIES.map((s) => (
            <span
              key={s.key}
              className="flex items-center gap-1 transition-opacity"
              style={{ opacity: dim(s.label) }}
            >
              <span
                className="h-[7px] w-[7px] shrink-0 rounded-full"
                style={{ backgroundColor: s.color }}
              />
              <span className="text-[9px] font-semibold text-ink-500">{s.label}</span>
            </span>
          ))}
        </div>
      </div>

      <div className="mt-1.5 min-h-0 w-full flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={scoreTrend} margin={{ top: 12, right: 10, bottom: 0, left: -14 }}>
            <CartesianGrid stroke={CHART_AXIS.grid} vertical={false} />
            <XAxis
              dataKey="quarter"
              tickLine={false}
              axisLine={{ stroke: CHART_AXIS.axis }}
              tick={{ fontSize: 8, fill: CHART_AXIS.tick }}
              interval={0}
            />
            <YAxis
              domain={[78, 93]}
              ticks={[78, 82, 86, 90, 93]}
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 8.5, fill: CHART_AXIS.tick }}
              width={38}
            />
            <Tooltip
              contentStyle={CHART_TOOLTIP_STYLE}
              formatter={(v: number, n: string) => [v.toLocaleString("id-ID"), LABELS[n] ?? n]}
            />
            {SERIES.map((s) => (
              <Line isAnimationActive={false}
                key={s.key}
                type="monotone"
                dataKey={s.key}
                stroke={s.color}
                strokeWidth={s.width}
                strokeOpacity={dim(s.label)}
                dot={false}
                activeDot={{ r: 3.5 }}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
