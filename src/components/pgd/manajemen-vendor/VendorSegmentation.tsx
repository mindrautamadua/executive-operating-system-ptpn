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
import { vendorSegmentation } from "@/lib/pgd-data-detail";
import { CHART_AXIS, CHART_TOOLTIP_STYLE } from "@/lib/chart-palette";
import { SectionHead } from "@/components/hc/SectionHead";
import { ScopeNote } from "@/components/ui/ScopeNote";

export function VendorSegmentation() {
  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-2.5 pt-3"
      style={{ "--d": "30ms" } as React.CSSProperties}
    >
      <SectionHead title="Segmentasi Vendor" action="Lihat Detail" badge={<ScopeNote />} />
      <p className="mt-[3px] text-[9px] text-ink-500">
        Empat Segmen · total 3.482 vendor &amp; belanja Rp 12,4 T
      </p>

      <div className="mt-1 min-h-0 w-full flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={vendorSegmentation} margin={{ top: 14, right: 6, bottom: 0, left: -10 }}>
            <CartesianGrid stroke={CHART_AXIS.grid} vertical={false} />
            <XAxis
              dataKey="segmen"
              tickLine={false}
              axisLine={{ stroke: CHART_AXIS.axis }}
              tick={{ fontSize: 8, fill: CHART_AXIS.tick }}
            />
            <YAxis
              domain={[0, 3000]}
              ticks={[0, 1000, 2000, 3000]}
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 8.5, fill: CHART_AXIS.tick }}
              width={34}
              tickFormatter={(v: number) => (v === 0 ? "0" : `${v / 1000}K`)}
            />
            <Tooltip
              cursor={{ fill: "transparent" }}
              contentStyle={CHART_TOOLTIP_STYLE}
              formatter={(v: number) => [`${v.toLocaleString("id-ID")} vendor`, "Jumlah Vendor"]}
            />
            <Bar isAnimationActive={false} dataKey="jumlah" radius={[3, 3, 0, 0]} barSize={34}>
              {vendorSegmentation.map((s) => (
                <Cell key={s.segmen} fill={s.color} />
              ))}
              <LabelList
                dataKey="jumlah"
                position="top"
                formatter={(v: number) => v.toLocaleString("id-ID")}
                style={{ fontSize: 8, fill: "#334155", fontWeight: 700 }}
              />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-1 flex flex-col gap-[3px]">
        {vendorSegmentation.map((s) => (
          <div key={s.segmen} className="flex items-center justify-between gap-2">
            <span className="flex min-w-0 items-center gap-1.5">
              <span
                className="h-[7px] w-[7px] shrink-0 rounded-full"
                style={{ backgroundColor: s.color }}
              />
              <span className="truncate text-[9px] text-ink-500">
                <span className="font-bold text-ink-900">{s.segmen}</span> — {s.pendekatan}
              </span>
            </span>
            <span className="shrink-0 text-[9px] font-bold text-ink-700">
              Rp {s.valueRpT.toLocaleString("id-ID", { minimumFractionDigits: 2 })} T ·{" "}
              {s.pct.toLocaleString("id-ID", { minimumFractionDigits: 1 })}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
