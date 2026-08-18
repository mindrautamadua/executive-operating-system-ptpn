"use client";

import {
  Area,
  AreaChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { valueCreationTrend } from "@/lib/stg-data";
import { CHART_AXIS, CHART_TOOLTIP_STYLE, PALETTE } from "@/lib/chart-palette";
import { SectionHead } from "@/components/hc/SectionHead";
import { ScopeNote } from "@/components/ui/ScopeNote";

const rp = (v: number) =>
  `Rp ${v.toLocaleString("id-ID", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} T`;

/** Value creation kumulatif 2026: realisasi YTD vs jalur target Rp 4,2 T. */
export function ValueCreationTrend() {
  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-2.5 pt-3"
      style={{ "--d": "240ms" } as React.CSSProperties}
    >
      <SectionHead title="Value Creation Trend 2026" action="Lihat Detail" badge={<ScopeNote />} />
      <p className="mt-[3px] text-[9px] text-ink-500">
        Realisasi Kumulatif vs Jalur Target (Rp Triliun) · Realisasi s.d. Mei 2026
      </p>

      <div className="mt-1.5 min-h-0 w-full flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={valueCreationTrend} margin={{ top: 14, right: 14, bottom: 0, left: -18 }}>
            <defs>
              <linearGradient id="stg-vc-real" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={PALETTE.green} stopOpacity="0.24" />
                <stop offset="100%" stopColor={PALETTE.green} stopOpacity="0.02" />
              </linearGradient>
              <linearGradient id="stg-vc-target" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={PALETTE.blue} stopOpacity="0.12" />
                <stop offset="100%" stopColor={PALETTE.blue} stopOpacity="0.01" />
              </linearGradient>
            </defs>
            <CartesianGrid stroke={CHART_AXIS.grid} vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={{ stroke: CHART_AXIS.axis }}
              tick={{ fontSize: 8, fill: CHART_AXIS.tick }}
            />
            <YAxis
              domain={[0, 4.5]}
              ticks={[0, 1, 2, 3, 4]}
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 8, fill: CHART_AXIS.tick }}
              tickFormatter={(v: number) => v.toLocaleString("id-ID")}
              width={34}
            />
            <Tooltip contentStyle={CHART_TOOLTIP_STYLE} formatter={(v: number) => rp(v)} />
            <Legend
              verticalAlign="top"
              align="right"
              height={18}
              iconType="plainline"
              iconSize={10}
              wrapperStyle={{ fontSize: 8.5, color: CHART_AXIS.tick }}
            />
            <Area isAnimationActive={false}
              type="monotone"
              name="Jalur Target"
              dataKey="target"
              stroke={PALETTE.blue}
              strokeWidth={1.5}
              strokeDasharray="4 3"
              fill="url(#stg-vc-target)"
              dot={false}
            />
            <Area isAnimationActive={false}
              type="monotone"
              name="Realisasi"
              dataKey="realisasi"
              stroke={PALETTE.green}
              strokeWidth={1.9}
              fill="url(#stg-vc-real)"
              dot={{ r: 2 }}
              activeDot={{ r: 4 }}
              connectNulls={false}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <p className="mt-1 truncate text-[9px] text-ink-500">
        Realisasi Mei Rp 1,86 T tertinggal Rp 0,14 T dari jalur target (Rp 2,00 T).
      </p>
    </div>
  );
}
