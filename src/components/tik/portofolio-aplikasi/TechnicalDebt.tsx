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
import { technicalDebt } from "@/lib/tik-data-detail";
import { CHART_AXIS, CHART_TOOLTIP_STYLE, PALETTE } from "@/lib/chart-palette";
import { SectionHead } from "@/components/hc/SectionHead";
import { ScopeNote } from "@/components/ui/ScopeNote";

const desimal = (v: number) => v.toLocaleString("id-ID", { minimumFractionDigits: 1 });

const data = technicalDebt.map((d) => ({
  ...d,
  singkat: d.kategori.length > 20 ? `${d.kategori.slice(0, 19)}…` : d.kategori,
}));

/** Makin jauh di atas target, makin berat bebannya. */
const fill = (skor: number, target: number) =>
  skor - target >= 1.5 ? PALETTE.red : skor > target ? PALETTE.amber : PALETTE.green;

export function TechnicalDebt() {
  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-2.5 pt-3"
      style={{ "--d": "120ms" } as React.CSSProperties}
    >
      <SectionHead title="Utang Teknis per Kategori" action="Lihat Detail" badge={<ScopeNote />} />
      <p className="mt-[3px] text-[9px] text-ink-500">
        Skor Beban 1–5 (Makin Tinggi Makin Berat) · Rata-rata Grup 3,4
      </p>

      <div className="mt-1.5 min-h-0 w-full flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            layout="vertical"
            margin={{ top: 4, right: 30, bottom: 0, left: 78 }}
          >
            <CartesianGrid stroke={CHART_AXIS.grid} horizontal={false} />
            <XAxis
              type="number"
              domain={[0, 5]}
              ticks={[0, 1, 2, 3, 4, 5]}
              tickLine={false}
              axisLine={{ stroke: CHART_AXIS.axis }}
              tick={{ fontSize: 8, fill: CHART_AXIS.tick }}
            />
            <YAxis
              type="category"
              dataKey="singkat"
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 8, fill: CHART_AXIS.tick }}
              width={78}
            />
            <Tooltip
              cursor={{ fill: "rgba(148,163,184,0.08)" }}
              contentStyle={CHART_TOOLTIP_STYLE}
              formatter={(v: number) => [desimal(v), "Skor Beban"]}
              labelFormatter={(label: string) => {
                const row = data.find((d) => d.singkat === label);
                return row
                  ? `${row.kategori} · target ${desimal(row.target)} · remediasi Rp ${row.remediasiRpM} M`
                  : label;
              }}
            />
            <Bar dataKey="skor" radius={[0, 3, 3, 0]} maxBarSize={16}>
              {data.map((d) => (
                <Cell key={d.kategori} fill={fill(d.skor, d.target)} />
              ))}
              <LabelList
                dataKey="skor"
                position="right"
                offset={5}
                formatter={(v: React.ReactNode) => desimal(Number(v))}
                style={{ fontSize: 8.5, fill: "#334155", fontWeight: 700 }}
              />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <p className="pb-1 text-[9px] leading-snug text-ink-500">
        Total remediasi Rp 287 M; aplikasi legacy (4,2) dan patch tertunda (3,6) adalah dua beban
        terberat.
      </p>
    </div>
  );
}
