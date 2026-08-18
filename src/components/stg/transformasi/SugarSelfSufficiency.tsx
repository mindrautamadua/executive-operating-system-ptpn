"use client";

import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { sugarGapNote, sugarTrajectory } from "@/lib/stf-data";
import { CHART_AXIS, CHART_TOOLTIP_STYLE, PALETTE } from "@/lib/chart-palette";
import { SectionHead } from "@/components/hc/SectionHead";
import { useSubholding } from "@/components/SubholdingProvider";

const ribuan = (v: number) => `${v.toLocaleString("id-ID")} rb ton`;

/**
 * Trajektori produksi gula PTPN menuju swasembada 2028 + gap terhadap jalur.
 *
 * Seluruh angka pada kartu ini adalah wilayah SugarCo (SGN) — tidak ada pecahan
 * untuk subholding lain. Karena itu di cakupan PalmCo/SupportingCo grafik
 * diredupkan dan diberi keterangan bahwa isinya khusus SugarCo.
 */
export function SugarSelfSufficiency() {
  const { active, isFiltered } = useSubholding();
  const luarCakupan = isFiltered && active !== "sugarco";

  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-2.5 pt-3"
      style={{ "--d": "120ms" } as React.CSSProperties}
    >
      <SectionHead title="Swasembada Gula 2028" action="Lihat Detail" />
      <p className="mt-[3px] text-[9px] text-ink-500">
        Produksi Gula PTPN (rb ton) vs Jalur Target Swasembada — Kontribusi{" "}
        {sugarGapNote.kontribusiTargetPtpn2028JtTon.toLocaleString("id-ID", {
          minimumFractionDigits: 2,
        })}{" "}
        jt ton dari kebutuhan nasional{" "}
        {sugarGapNote.kebutuhanNasionalJtTon.toLocaleString("id-ID", { minimumFractionDigits: 1 })}{" "}
        jt ton
      </p>

      {luarCakupan && (
        <p className="mt-1 text-[9px] text-ink-500">
          Program gula sepenuhnya wilayah SugarCo (SGN) — angka di bawah bukan bagian dari cakupan
          yang sedang dipilih.
        </p>
      )}

      <div
        className="mt-1.5 min-h-0 w-full flex-1 transition-opacity"
        style={{ opacity: luarCakupan ? 0.25 : 1 }}
      >
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={sugarTrajectory} margin={{ top: 12, right: 14, bottom: 0, left: -8 }}>
            <CartesianGrid stroke={CHART_AXIS.grid} vertical={false} />
            <XAxis
              dataKey="year"
              tickLine={false}
              axisLine={{ stroke: CHART_AXIS.axis }}
              tick={{ fontSize: 8, fill: CHART_AXIS.tick }}
            />
            <YAxis
              domain={[600, 1500]}
              ticks={[600, 900, 1200, 1500]}
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 8, fill: CHART_AXIS.tick }}
              width={38}
            />
            <Tooltip contentStyle={CHART_TOOLTIP_STYLE} formatter={(v: number) => ribuan(v)} />
            <Legend
              verticalAlign="top"
              align="right"
              height={18}
              iconType="plainline"
              iconSize={10}
              wrapperStyle={{ fontSize: 8.5, color: CHART_AXIS.tick }}
            />
            <Line
              type="monotone"
              name="Jalur Target"
              dataKey="targetRbTon"
              stroke={PALETTE.blue}
              strokeWidth={1.6}
              strokeDasharray="4 3"
              dot={{ r: 2.5 }}
            />
            <Line
              type="monotone"
              name="Produksi Aktual/Proyeksi"
              dataKey="produksiRbTon"
              stroke={PALETTE.green}
              strokeWidth={2}
              dot={{ r: 3 }}
              activeDot={{ r: 4.5 }}
              connectNulls={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <p
        className="mt-1 text-[9px] leading-snug text-ink-500 transition-opacity"
        style={{ opacity: luarCakupan ? 0.25 : 1 }}
      >
        {sugarGapNote.catatan}
      </p>
    </div>
  );
}
