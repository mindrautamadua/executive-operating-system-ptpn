"use client";

import { ArrowRight } from "lucide-react";
import {
  CartesianGrid,
  LabelList,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { headcountProjection, projectionSeries } from "@/lib/ss-data";
import { CHART_AXIS, CHART_TOOLTIP_STYLE } from "@/lib/chart-palette";
import { SectionHead } from "../hc/SectionHead";

const ribuan = (v: number) => v.toLocaleString("id-ID");

/** Label angka hanya di titik terakhir (2028) agar chart tetap terbaca. */
function endLabel(color: string) {
  return function EndLabel(props: {
    x?: number | string;
    y?: number | string;
    index?: number;
    value?: number | string;
  }) {
    const { x, y, index, value } = props;
    if (index !== headcountProjection.length - 1 || x == null || y == null || value == null) {
      return null;
    }
    return (
      <text
        x={Number(x) - 2}
        y={Number(y) - 6}
        textAnchor="end"
        style={{ fontSize: 8.5, fontWeight: 700, fill: color }}
      >
        {ribuan(Number(value))}
      </text>
    );
  };
}

export function HeadcountProjection() {
  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-2.5 pt-3"
      style={{ "--d": "180ms" } as React.CSSProperties}
    >
      <SectionHead title="Proyeksi Headcount (2026 - 2028)" />

      <div className="mt-1.5 grid grid-cols-2 gap-x-3 gap-y-[3px]">
        {projectionSeries.map((s) => (
          <span key={s.key} className="flex items-center gap-1.5 text-[9px] font-semibold text-ink-500">
            <span className="h-[2px] w-[14px] shrink-0 rounded-full" style={{ background: s.color }} />
            <span className="truncate">{s.label}</span>
          </span>
        ))}
      </div>

      <div className="mt-1 min-h-0 w-full flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={headcountProjection} margin={{ top: 14, right: 10, bottom: 0, left: -4 }}>
            <CartesianGrid stroke={CHART_AXIS.grid} vertical={false} />
            <XAxis
              dataKey="year"
              tickLine={false}
              axisLine={{ stroke: CHART_AXIS.axis }}
              tick={{ fontSize: 8.5, fill: CHART_AXIS.tick }}
              padding={{ left: 14, right: 30 }}
            />
            <YAxis
              domain={[66000, 80000]}
              ticks={[66000, 68000, 70000, 72000, 74000, 76000, 78000, 80000]}
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 8.5, fill: CHART_AXIS.tick }}
              tickFormatter={(v: number) => `${v / 1000}K`}
              width={36}
            />
            <Tooltip
              contentStyle={CHART_TOOLTIP_STYLE}
              formatter={(v: number, name: string) => [
                ribuan(v),
                projectionSeries.find((s) => s.key === name)?.label ?? name,
              ]}
            />
            {projectionSeries.map((s) => (
              <Line isAnimationActive={false}
                key={s.key}
                type="linear"
                dataKey={s.key}
                stroke={s.color}
                strokeWidth={s.key === "c" ? 2.2 : 1.6}
                dot={{ r: 2, fill: "#fff", stroke: s.color, strokeWidth: 1.6 }}
                activeDot={{ r: 3.5 }}
              >
                <LabelList dataKey={s.key} content={endLabel(s.color)} />
              </Line>
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>

      <button className="mt-1 flex w-full items-center justify-center gap-1 rounded-lg border border-[#e3e9ef] bg-[#f8fafc] py-[7px] text-[9.5px] font-semibold text-ptpn-greenDark transition-colors hover:bg-[#eef4f0]">
        Lihat Detail Proyeksi <ArrowRight size={11} />
      </button>
    </div>
  );
}
