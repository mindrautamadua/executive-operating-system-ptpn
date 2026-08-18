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
import { ArrowRight } from "lucide-react";
import { polaHarian } from "@/lib/absensi-data";
import { CHART_AXIS, CHART_TOOLTIP_STYLE, PALETTE } from "@/lib/chart-palette";

const idn = (v: number) => `${v.toFixed(1).replace(".", ",")}%`;

/** Sabtu amber & Minggu slate — menonjolkan cerita akhir pekan (78% / 43%). */
const warnaHari = (hari: string) => {
  if (hari === "Sabtu") return PALETTE.amber;
  if (hari === "Minggu") return PALETTE.slate;
  return PALETTE.blue;
};

export function PolaKehadiranHari() {
  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-2.5 pt-3"
      style={{ "--d": "240ms" } as React.CSSProperties}
    >
      <h3 className="card-title-navy">Pola Kehadiran per Hari</h3>
      <p className="mt-[3px] text-[9.5px] text-ink-500">Rata-rata Tingkat Kehadiran</p>

      <div className="mt-1 min-h-0 w-full flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={polaHarian} margin={{ top: 18, right: 6, bottom: 0, left: -14 }}>
            <CartesianGrid stroke={CHART_AXIS.grid} vertical={false} />
            <XAxis
              dataKey="name"
              tickLine={false}
              axisLine={{ stroke: CHART_AXIS.axis }}
              tick={{ fontSize: 9, fill: CHART_AXIS.tick }}
              interval={0}
            />
            <YAxis
              domain={[0, 100]}
              ticks={[0, 25, 50, 75, 100]}
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 9, fill: CHART_AXIS.tick }}
              tickFormatter={(v: number) => `${v}%`}
              width={38}
            />
            <Tooltip
              formatter={(v: number) => [idn(v), "Tingkat Kehadiran"]}
              contentStyle={CHART_TOOLTIP_STYLE}
              cursor={{ fill: "var(--surface-2)" }}
            />
            <Bar isAnimationActive={false} dataKey="value" radius={[3, 3, 0, 0]} maxBarSize={26}>
              {polaHarian.map((d) => (
                <Cell key={d.name} fill={warnaHari(d.name)} />
              ))}
              <LabelList
                dataKey="value"
                position="top"
                offset={5}
                formatter={idn}
                style={{ fontSize: 9, fill: "#334155", fontWeight: 700 }}
              />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <button className="link-more mt-1 flex items-center gap-1">
        Lihat pola kehadiran <ArrowRight size={11} />
      </button>
    </div>
  );
}
