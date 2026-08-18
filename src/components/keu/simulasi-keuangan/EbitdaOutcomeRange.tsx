"use client";

import {
  Area,
  CartesianGrid,
  ComposedChart,
  Line,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { outcomeRange } from "@/lib/ksk-data";
import { CHART_AXIS, CHART_TOOLTIP_STYLE, PALETTE } from "@/lib/chart-palette";
import { fmtId, fmtRpT } from "@/lib/keu-core";
import { SectionHead } from "@/components/hc/SectionHead";
import { ScopeNote } from "@/components/ui/ScopeNote";

const data = outcomeRange.map((p) => ({
  ...p,
  band: Number((p.p90 - p.p10).toFixed(2)),
}));

const LABEL: Record<string, string> = {
  p10: "P10 (Konservatif)",
  band: "Rentang P10–P90",
  p50: "P50 (Median)",
  p90: "P90 (Optimis)",
};

export function EbitdaOutcomeRange() {
  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-2.5 pt-3"
      style={{ "--d": "300ms" } as React.CSSProperties}
    >
      <SectionHead title="EBITDA Outcome Range" badge={<ScopeNote />} />
      <p className="mt-[3px] text-[9px] text-ink-500">
        Fan Chart Kumulatif 2026 (Rp T) — Jan–Mei realisasi, Jun–Des rentang p10/p50/p90
      </p>

      <div className="mt-1.5 min-h-0 w-full flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={data} margin={{ top: 12, right: 14, bottom: 0, left: -14 }}>
            <defs>
              <linearGradient id="ksk-band-fill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={PALETTE.green} stopOpacity="0.22" />
                <stop offset="100%" stopColor={PALETTE.green} stopOpacity="0.06" />
              </linearGradient>
            </defs>
            <CartesianGrid stroke={CHART_AXIS.grid} vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={{ stroke: CHART_AXIS.axis }}
              tick={{ fontSize: 8.5, fill: CHART_AXIS.tick }}
              interval={0}
            />
            <YAxis
              domain={[0, 20]}
              ticks={[0, 5, 10, 15, 20]}
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 8.5, fill: CHART_AXIS.tick }}
              width={32}
            />
            <Tooltip
              contentStyle={CHART_TOOLTIP_STYLE}
              formatter={(v: number, name: string, item) => {
                if (name === "band") {
                  const p = (item as { payload?: (typeof data)[number] })?.payload;
                  return [
                    `${fmtId(p?.p10 ?? 0, 1)} – ${fmtId(p?.p90 ?? 0, 1)}`,
                    LABEL.band,
                  ];
                }
                return [fmtRpT(v, 2), LABEL[name] ?? name];
              }}
            />
            <ReferenceLine x="Mei" stroke={CHART_AXIS.axis} strokeDasharray="4 3" />
            {/* dasar transparan p10 + pita p90−p10 membentuk fan */}
            <Area
              dataKey="p10"
              stackId="fan"
              stroke="none"
              fill="transparent"
              isAnimationActive={false}
            />
            <Area
              dataKey="band"
              stackId="fan"
              stroke="none"
              fill="url(#ksk-band-fill)"
            />
            <Line
              type="monotone"
              dataKey="p50"
              stroke={PALETTE.green}
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 4 }}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      <div className="flex items-center justify-center gap-4 pb-1">
        <span className="flex items-center gap-1.5 text-[8.5px] text-ink-500">
          <span
            className="h-[8px] w-[14px] rounded-[2px]"
            style={{ background: PALETTE.green, opacity: 0.2 }}
          />
          Rentang P10–P90 (Rp 13,1 – 17,8 T)
        </span>
        <span className="flex items-center gap-1.5 text-[8.5px] text-ink-500">
          <span className="h-[2px] w-[14px] rounded" style={{ background: PALETTE.green }} />
          Median P50 (Rp 15,6 T)
        </span>
      </div>
    </div>
  );
}
