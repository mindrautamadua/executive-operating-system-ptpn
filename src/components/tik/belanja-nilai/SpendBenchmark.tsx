"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  LabelList,
  ReferenceArea,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { spendBenchmark } from "@/lib/tik-data-detail";
import { CHART_AXIS, CHART_TOOLTIP_STYLE, PALETTE } from "@/lib/chart-palette";
import { SectionHead } from "@/components/hc/SectionHead";
import { ScopeNote } from "@/components/ui/ScopeNote";

const persen = (v: number) => v.toLocaleString("id-ID", { minimumFractionDigits: 1 });

/** Band target agribisnis global 1,2–2,0% pendapatan. */
const BAND_BAWAH = 1.2;
const BAND_ATAS = 2.0;

const data = spendBenchmark.map((b) => ({
  ...b,
  singkat: b.pembanding
    .replace("Agribisnis Global — ", "Agribisnis ")
    .replace("BUMN Non-Keuangan Sejenis", "BUMN Sejenis")
    .replace("Manufaktur & Consumer Goods", "Manufaktur & CG"),
}));

export function SpendBenchmark() {
  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-2.5 pt-3"
      style={{ "--d": "60ms" } as React.CSSProperties}
    >
      <SectionHead title="Benchmark Belanja TI" action="Lihat Detail" badge={<ScopeNote />} />
      <p className="mt-[3px] text-[9px] text-ink-500">
        Belanja TI terhadap Pendapatan (%) · Band Target Agribisnis {persen(BAND_BAWAH)}–
        {persen(BAND_ATAS)}%
      </p>

      <div className="mt-1.5 min-h-0 w-full flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 16, right: 8, bottom: 14, left: -20 }}>
            <CartesianGrid stroke={CHART_AXIS.grid} vertical={false} />
            <ReferenceArea
              y1={BAND_BAWAH}
              y2={BAND_ATAS}
              fill={PALETTE.green}
              fillOpacity={0.08}
              stroke={PALETTE.green}
              strokeOpacity={0.3}
              strokeDasharray="4 3"
            />
            <XAxis
              dataKey="singkat"
              tickLine={false}
              axisLine={{ stroke: CHART_AXIS.axis }}
              tick={{ fontSize: 8.5, fill: CHART_AXIS.tick }}
              interval={0}
              angle={-16}
              textAnchor="end"
              height={32}
            />
            <YAxis
              domain={[0, 3]}
              ticks={[0, 1, 2, 3]}
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 8, fill: CHART_AXIS.tick }}
              tickFormatter={(v: number) => `${v}%`}
              width={32}
            />
            <Tooltip
              cursor={{ fill: "rgba(148,163,184,0.08)" }}
              contentStyle={CHART_TOOLTIP_STYLE}
              formatter={(v: number) => [`${persen(v)}%`, "Belanja TI / Pendapatan"]}
              labelFormatter={(label: string) => {
                const row = data.find((d) => d.singkat === label);
                return row ? `${row.pembanding} — ${row.keterangan}` : label;
              }}
            />
            <Bar isAnimationActive={false} dataKey="pctPendapatan" radius={[3, 3, 0, 0]} maxBarSize={38}>
              {data.map((d) => (
                <Cell
                  key={d.pembanding}
                  fill={d.color}
                  fillOpacity={d.isPtpn ? 1 : 0.65}
                />
              ))}
              <LabelList
                dataKey="pctPendapatan"
                position="top"
                offset={5}
                formatter={(v: React.ReactNode) => `${persen(Number(v))}%`}
                style={{ fontSize: 8.5, fill: "#334155", fontWeight: 700 }}
              />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <p className="pb-1 text-[9px] leading-snug text-ink-500">
        PTPN 1,6% berada di tengah band agribisnis, namun masih di bawah BUMN sejenis (1,9%) —
        besaran bukan masalah utama, serapan capex yang tertinggal.
      </p>
    </div>
  );
}
