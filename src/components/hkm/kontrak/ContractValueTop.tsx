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
import { contractValueTop } from "@/lib/hkm-data";
import { CHART_AXIS, CHART_TOOLTIP_STYLE, PALETTE } from "@/lib/chart-palette";
import { SectionHead } from "@/components/hc/SectionHead";
import { ScopeNote } from "@/components/ui/ScopeNote";

const STATUS_COLOR: Record<string, string> = {
  Aktif: PALETTE.blue,
  "Perpanjangan Berjalan": PALETTE.amber,
  "Perlu Keputusan": PALETTE.red,
};

/** "Rp 4,20 T" → 4.2 untuk sumbu nilai. */
const toNumber = (nilai: string) => Number(nilai.replace("Rp ", "").replace(" T", "").replace(",", "."));

const data = contractValueTop.map((r) => ({
  ...r,
  nilaiRpT: toNumber(r.nilai),
  label: r.kontrak.length > 30 ? `${r.kontrak.slice(0, 29)}…` : r.kontrak,
}));

const angka = (v: number) => v.toLocaleString("id-ID", { minimumFractionDigits: 2 });

export function ContractValueTop() {
  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-2.5 pt-3"
      style={{ "--d": "90ms" } as React.CSSProperties}
    >
      <SectionHead title="10 Kontrak Bernilai Terbesar" action="Lihat Semua" badge={<ScopeNote />} />
      <p className="mt-[3px] text-[9px] text-ink-500">
        Nilai Kontrak Rp Triliun · Rp 18,4 T (53,2% dari Rp 34,6 T) · warna = status
      </p>

      <div className="mt-1.5 min-h-0 w-full flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            layout="vertical"
            margin={{ top: 4, right: 34, bottom: 0, left: 4 }}
            barCategoryGap="18%"
          >
            <CartesianGrid stroke={CHART_AXIS.grid} horizontal={false} />
            <XAxis
              type="number"
              domain={[0, 4.5]}
              tickLine={false}
              axisLine={{ stroke: CHART_AXIS.axis }}
              tick={{ fontSize: 8, fill: CHART_AXIS.tick }}
              tickFormatter={(v: number) => v.toLocaleString("id-ID")}
            />
            <YAxis
              type="category"
              dataKey="label"
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 8.5, fill: CHART_AXIS.tick }}
              width={150}
            />
            <Tooltip
              contentStyle={CHART_TOOLTIP_STYLE}
              formatter={(v: number) => [`Rp ${angka(v)} T`, "Nilai Kontrak"]}
              labelFormatter={(_l, p) => {
                const row = p?.[0]?.payload as (typeof data)[number] | undefined;
                return row ? `${row.kontrak} · ${row.pihak}` : "";
              }}
            />
            <Bar dataKey="nilaiRpT" radius={[0, 3, 3, 0]} barSize={11}>
              {data.map((r) => (
                <Cell key={r.kontrak} fill={STATUS_COLOR[r.status]} />
              ))}
              <LabelList
                dataKey="nilaiRpT"
                position="right"
                formatter={(v: number) => angka(v)}
                style={{ fontSize: 8.5, fill: CHART_AXIS.tick, fontWeight: 700 }}
              />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <p className="pb-1 text-[9px] leading-snug text-ink-500">
        Dua kontrak berstatus perlu keputusan (pupuk majemuk Rp 2,86 T dan angkutan CPO Rp 1,64 T)
        sama-sama berakhir 31 Juli 2026.
      </p>
    </div>
  );
}
