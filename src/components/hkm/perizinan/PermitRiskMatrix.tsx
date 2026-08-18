"use client";

import {
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Scatter,
  ScatterChart,
  Tooltip,
  XAxis,
  YAxis,
  ZAxis,
} from "recharts";
import { permitRiskMatrix } from "@/lib/hkm-data";
import { CHART_AXIS, CHART_TOOLTIP_STYLE, PALETTE } from "@/lib/chart-palette";
import { SectionHead } from "@/components/hc/SectionHead";
import { ScopeNote } from "@/components/ui/ScopeNote";

const TONE_COLOR = {
  red: PALETTE.red,
  amber: PALETTE.amber,
  green: PALETTE.green,
} as const;

const DAMPAK_LABEL: Record<number, string> = {
  1: "Minor",
  2: "Rendah",
  3: "Sedang",
  4: "Tinggi",
  5: "Stop Operasi",
};

/** Matriks risiko perizinan: dampak operasi (Y) × sisa waktu (X), bubble = jumlah izin. */
export function PermitRiskMatrix() {
  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-2.5 pt-3"
      style={{ "--d": "60ms" } as React.CSSProperties}
    >
      <SectionHead title="Matriks Risiko Perizinan" action="Lihat Detail" badge={<ScopeNote />} />
      <p className="mt-[3px] text-[9px] text-ink-500">
        Dampak Operasi (1–5) × Sisa Waktu (hari) · ukuran = jumlah izin serupa
      </p>

      <div className="mt-1.5 min-h-0 w-full flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart margin={{ top: 12, right: 16, bottom: 2, left: -6 }}>
            <CartesianGrid stroke={CHART_AXIS.grid} />
            <XAxis
              type="number"
              dataKey="sisaHari"
              name="Sisa Waktu"
              domain={[40, 160]}
              ticks={[40, 70, 100, 130, 160]}
              tickLine={false}
              axisLine={{ stroke: CHART_AXIS.axis }}
              tick={{ fontSize: 8, fill: CHART_AXIS.tick }}
              tickFormatter={(v: number) => `${v} hr`}
            />
            <YAxis
              type="number"
              dataKey="dampakOperasi"
              name="Dampak Operasi"
              domain={[1, 5.5]}
              ticks={[2, 3, 4, 5]}
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 8, fill: CHART_AXIS.tick }}
              width={48}
              tickFormatter={(v: number) => DAMPAK_LABEL[v] ?? String(v)}
            />
            <ZAxis type="number" dataKey="jumlah" range={[48, 320]} />
            <Tooltip
              cursor={{ strokeDasharray: "3 3", stroke: CHART_AXIS.axis }}
              contentStyle={CHART_TOOLTIP_STYLE}
              formatter={(_v, _n, p) => {
                const row = p?.payload as (typeof permitRiskMatrix)[number] | undefined;
                if (!row) return ["", ""];
                return [
                  `${row.jumlah} izin · sisa ${row.sisaHari} hari · dampak ${DAMPAK_LABEL[row.dampakOperasi]}`,
                  row.unit,
                ];
              }}
              labelFormatter={(_l, p) => {
                const row = p?.[0]?.payload as (typeof permitRiskMatrix)[number] | undefined;
                return row?.izin ?? "";
              }}
            />
            <Scatter isAnimationActive={false} data={permitRiskMatrix} fillOpacity={0.72}>
              {permitRiskMatrix.map((r) => (
                <Cell key={`${r.izin}-${r.unit}`} fill={TONE_COLOR[r.tone]} />
              ))}
            </Scatter>
          </ScatterChart>
        </ResponsiveContainer>
      </div>

      <p className="pb-1 text-[9px] leading-snug text-ink-500">
        Kuadran kiri-atas (dampak 4–5, sisa &lt;75 hari) memuat 5 izin penghenti operasi — semuanya
        di Regional 3, 5, dan 7 pada Juli–Agustus.
      </p>
    </div>
  );
}
