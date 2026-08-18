"use client";

import {
  Area,
  AreaChart,
  CartesianGrid,
  LabelList,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { weeklyCash } from "@/lib/keu-data";
import { fmtRpT } from "@/lib/keu-core";
import { CHART_AXIS, CHART_TOOLTIP_STYLE, PALETTE } from "@/lib/chart-palette";
import { SectionHead } from "@/components/hc/SectionHead";
import { ScopeNote } from "@/components/ui/ScopeNote";

const MIN_CASH = 3.5;

export function CashPosition() {
  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-2.5 pt-3"
      style={{ "--d": "120ms" } as React.CSSProperties}
    >
      <SectionHead title="Cash Position" action="Lihat Detail" badge={<ScopeNote />} />
      <p className="mt-[3px] text-[9px] text-ink-500">
        Saldo Kas Mingguan 12 Minggu Terakhir vs Minimum Cash (Rp T)
      </p>

      <div className="mt-1.5 min-h-0 w-full flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={weeklyCash} margin={{ top: 20, right: 14, bottom: 0, left: -18 }}>
            <defs>
              <linearGradient id="keu-cash-fill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={PALETTE.green} stopOpacity="0.18" />
                <stop offset="100%" stopColor={PALETTE.green} stopOpacity="0.02" />
              </linearGradient>
            </defs>
            <CartesianGrid stroke={CHART_AXIS.grid} vertical={false} />
            <XAxis
              dataKey="week"
              tickLine={false}
              axisLine={{ stroke: CHART_AXIS.axis }}
              tick={{ fontSize: 8.5, fill: CHART_AXIS.tick }}
              interval={0}
            />
            <YAxis
              domain={[0, 9]}
              ticks={[0, 3, 6, 9]}
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 8.5, fill: CHART_AXIS.tick }}
              tickFormatter={(v: number) => (v === 0 ? "0" : `${v} T`)}
              width={40}
            />
            <Tooltip
              formatter={(v: number) => [fmtRpT(v, 1), "Saldo Kas"]}
              contentStyle={CHART_TOOLTIP_STYLE}
            />
            <ReferenceLine
              y={MIN_CASH}
              stroke={PALETTE.red}
              strokeWidth={1.2}
              strokeDasharray="4 4"
              label={{
                value: "Minimum Cash Rp 3,5 T",
                position: "insideBottomRight",
                style: { fontSize: 8.5, fill: PALETTE.red, fontWeight: 700 },
              }}
            />
            <Area
              type="linear"
              dataKey="cash"
              stroke={PALETTE.green}
              strokeWidth={1.8}
              fill="url(#keu-cash-fill)"
              dot={false}
              activeDot={{ r: 4 }}
            >
              {/* Label hanya pada titik terakhir agar seri tetap terbaca */}
              <LabelList
                dataKey="cash"
                content={(props) => {
                  const { x, y, value, index } = props as {
                    x?: number;
                    y?: number;
                    value?: number;
                    index?: number;
                  };
                  if (index !== weeklyCash.length - 1 || x == null || y == null) return null;
                  return (
                    <text
                      x={x}
                      y={y - 8}
                      textAnchor="end"
                      style={{ fontSize: 8.5, fill: "#334155", fontWeight: 700 }}
                    >
                      {fmtRpT(value ?? 0, 1)}
                    </text>
                  );
                }}
              />
            </Area>
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
