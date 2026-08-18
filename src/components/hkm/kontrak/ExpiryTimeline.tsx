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
import { expiryTimeline } from "@/lib/hkm-data";
import { CHART_AXIS, CHART_TOOLTIP_STYLE, PALETTE } from "@/lib/chart-palette";
import { SectionHead } from "@/components/hc/SectionHead";
import { ScopeNote } from "@/components/ui/ScopeNote";

/** Jendela ≤90 hari — 112 kontrak yang perlu keputusan segera. */
const SOROT = new Set(["Jun 2026", "Jul 2026", "Agu 2026"]);

const angka = (v: number) => v.toLocaleString("id-ID", { minimumFractionDigits: 2 });

export function ExpiryTimeline() {
  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-2.5 pt-3"
      style={{ "--d": "60ms" } as React.CSSProperties}
    >
      <SectionHead title="Timeline Kedaluwarsa 12 Bulan" action="Lihat Detail" badge={<ScopeNote />} />
      <p className="mt-[3px] text-[9px] text-ink-500">
        Jumlah Kontrak Berakhir per Bulan · 112 jatuh tempo ≤90 hari (Jun–Agu, disorot)
      </p>

      <div className="mt-1.5 min-h-0 w-full flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={expiryTimeline} margin={{ top: 16, right: 10, bottom: 0, left: -20 }}>
            <CartesianGrid stroke={CHART_AXIS.grid} vertical={false} />
            <XAxis
              dataKey="bulan"
              tickLine={false}
              axisLine={{ stroke: CHART_AXIS.axis }}
              tick={{ fontSize: 8.5, fill: CHART_AXIS.tick }}
              tickFormatter={(v: string) => v.replace(" 20", " ")}
            />
            <YAxis
              domain={[0, 50]}
              ticks={[0, 10, 20, 30, 40, 50]}
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 8.5, fill: CHART_AXIS.tick }}
              width={34}
            />
            <Tooltip
              contentStyle={CHART_TOOLTIP_STYLE}
              formatter={(v: number) => [`${v} kontrak`, "Berakhir"]}
              labelFormatter={(l: string) => {
                const row = expiryTimeline.find((p) => p.bulan === l);
                return row ? `${l} · Rp ${angka(row.nilaiRpT)} T` : l;
              }}
            />
            <Bar dataKey="jumlah" radius={[3, 3, 0, 0]} barSize={17}>
              {expiryTimeline.map((p) => (
                <Cell key={p.bulan} fill={SOROT.has(p.bulan) ? PALETTE.red : PALETTE.blueSoft} />
              ))}
              <LabelList
                dataKey="jumlah"
                position="top"
                style={{ fontSize: 8.5, fill: CHART_AXIS.tick, fontWeight: 700 }}
              />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <p className="pb-1 text-[9px] leading-snug text-ink-500">
        Puncak Juli (41 kontrak, Rp 3,42 T) dan Desember (46 kontrak, Rp 4,86 T) — dua bulan itu
        menampung 24% nilai kontrak grup.
      </p>
    </div>
  );
}
