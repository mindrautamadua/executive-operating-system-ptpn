"use client";

import {
  CartesianGrid,
  Cell,
  LabelList,
  ReferenceLine,
  ResponsiveContainer,
  Scatter,
  ScatterChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { appLifecycleQuadrant, TIME_COLOR } from "@/lib/tik-data-detail";
import { CHART_AXIS, CHART_TOOLTIP_STYLE, PALETTE } from "@/lib/chart-palette";
import { SectionHead } from "@/components/hc/SectionHead";
import { useSubholding } from "@/components/SubholdingProvider";
import { toSubholdingId } from "@/lib/subholding";

/** Ambang kuadran TIME: nilai bisnis & kondisi teknis di titik tengah skala. */
const AMBANG = 50;

const data = appLifecycleQuadrant.map((d) => ({
  ...d,
  singkat: d.aplikasi.length > 16 ? `${d.aplikasi.slice(0, 15)}…` : d.aplikasi,
}));

export function AppLifecycleQuadrant() {
  const { active, isFiltered } = useSubholding();
  // Nama aplikasi legacy menyebut subholding pemiliknya (mis. "Akuntansi Legacy
  // PTPN I"); titik milik subholding lain diredupkan agar posisi kuadran utuh.
  const dim = (aplikasi: string) => {
    if (!isFiltered) return 0.85;
    const id = toSubholdingId(aplikasi);
    return id === null || id === active ? 0.85 : 0.25;
  };

  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-2.5 pt-3"
      style={{ "--d": "90ms" } as React.CSSProperties}
    >
      <SectionHead title="Kuadran Siklus Hidup Aplikasi" action="Lihat Detail" />
      <p className="mt-[3px] text-[9px] text-ink-500">
        Nilai Bisnis (0–100) × Kondisi Teknis (0–100) · Warna = Status TIME
      </p>

      <div className="mt-1.5 min-h-0 w-full flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart margin={{ top: 12, right: 14, bottom: 0, left: -22 }}>
            <CartesianGrid stroke={CHART_AXIS.grid} />
            <XAxis
              type="number"
              dataKey="nilaiBisnis"
              domain={[10, 100]}
              ticks={[20, 40, 60, 80, 100]}
              tickLine={false}
              axisLine={{ stroke: CHART_AXIS.axis }}
              tick={{ fontSize: 8.5, fill: CHART_AXIS.tick }}
            />
            <YAxis
              type="number"
              dataKey="kondisiTeknis"
              domain={[10, 100]}
              ticks={[20, 40, 60, 80, 100]}
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 8.5, fill: CHART_AXIS.tick }}
            />
            <ReferenceLine
              x={AMBANG}
              stroke={PALETTE.slate}
              strokeDasharray="5 4"
              strokeWidth={1.2}
            />
            <ReferenceLine
              y={AMBANG}
              stroke={PALETTE.slate}
              strokeDasharray="5 4"
              strokeWidth={1.2}
            />
            <Tooltip
              cursor={{ strokeDasharray: "3 3" }}
              contentStyle={CHART_TOOLTIP_STYLE}
              formatter={(v: number, name: string) =>
                name === "nilaiBisnis" ? [`${v}`, "Nilai Bisnis"] : [`${v}`, "Kondisi Teknis"]
              }
              labelFormatter={() => ""}
            />
            <Scatter isAnimationActive={false} data={data}>
              {data.map((d) => (
                <Cell key={d.aplikasi} fill={TIME_COLOR[d.status]} fillOpacity={dim(d.aplikasi)} />
              ))}
              <LabelList
                dataKey="singkat"
                position="top"
                offset={5}
                style={{ fontSize: 8.5, fill: "var(--text-1)", fontWeight: 700 }}
              />
            </Scatter>
          </ScatterChart>
        </ResponsiveContainer>
      </div>

      <p className="pb-1 text-[9px] leading-snug text-ink-500">
        Kiri-atas = Tolerate · kanan-atas = Invest · kanan-bawah = Migrate (nilai tinggi, teknis
        lemah) · kiri-bawah = Eliminate.
      </p>
    </div>
  );
}
