"use client";

import {
  Bar,
  CartesianGrid,
  ComposedChart,
  Legend,
  Line,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { SectionHead } from "@/components/hc/SectionHead";
import { CHART_AXIS, CHART_TOOLTIP_STYLE } from "@/lib/chart-palette";
import { flowLast12 } from "@/lib/wa-headcount-trend";

/** Arus masuk (positif) vs keluar (negatif) 12 bulan, dengan garis net. */
export function FlowChart() {
  const totalMasuk = flowLast12.reduce((s, r) => s + r.masuk, 0);
  const totalKeluar = flowLast12.reduce((s, r) => s - r.keluar, 0);

  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-3 pt-3"
      style={{ "--d": "160ms" } as React.CSSProperties}
    >
      <SectionHead title="Arus Masuk & Keluar (12 Bulan)" />
      <p className="mt-[3px] text-[9px] text-ink-500">
        <span className="font-bold text-ptpn-green">{totalMasuk.toLocaleString("id-ID")} masuk</span>{" "}
        ·{" "}
        <span className="font-bold text-[#ef4444]">{totalKeluar.toLocaleString("id-ID")} keluar</span>
      </p>

      <div className="mt-1 min-h-0 w-full flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={flowLast12} margin={{ top: 10, right: 6, bottom: 0, left: -18 }}>
            <CartesianGrid stroke={CHART_AXIS.grid} vertical={false} />
            <XAxis
              dataKey="name"
              tickLine={false}
              axisLine={{ stroke: CHART_AXIS.axis }}
              tick={{ fontSize: 8, fill: CHART_AXIS.tick }}
              interval={1}
            />
            <YAxis
              domain={[-800, 1200]}
              ticks={[-800, -400, 0, 400, 800, 1200]}
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 8.5, fill: CHART_AXIS.tick }}
              width={34}
            />
            <Tooltip
              contentStyle={CHART_TOOLTIP_STYLE}
              formatter={(v: number, n: string) => [
                Math.abs(v).toLocaleString("id-ID"),
                n === "masuk" ? "Masuk" : n === "keluar" ? "Keluar" : "Net",
              ]}
            />
            <Legend
              verticalAlign="bottom"
              height={18}
              iconSize={7}
              wrapperStyle={{ fontSize: 8.5 }}
              formatter={(v: string) => (v === "masuk" ? "Masuk" : v === "keluar" ? "Keluar" : "Net")}
            />
            <ReferenceLine y={0} stroke={CHART_AXIS.axis} />
            <Bar dataKey="masuk" fill="#1a9c5b" radius={[2, 2, 0, 0]} isAnimationActive={false} />
            <Bar dataKey="keluar" fill="#ef4444" radius={[0, 0, 2, 2]} isAnimationActive={false} />
            <Line
              type="linear"
              dataKey="net"
              stroke="#1b3a6b"
              strokeWidth={1.5}
              dot={{ r: 2, fill: "#1b3a6b", strokeWidth: 0 }}
              isAnimationActive={false}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
