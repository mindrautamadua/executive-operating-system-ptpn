"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  LabelList,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { connectivityByRegion } from "@/lib/tik-data-detail";
import { CHART_AXIS, CHART_TOOLTIP_STYLE, PALETTE } from "@/lib/chart-palette";
import { SectionHead } from "@/components/hc/SectionHead";
import { useSubholding } from "@/components/SubholdingProvider";

const FILL: Record<string, string> = {
  Memadai: PALETTE.green,
  Terbatas: PALETTE.amber,
  Kritis: PALETTE.red,
};

/** Rata-rata grup tertimbang kebun = 82% (TIK.konektivitasMemadaiPct). */
const RATA_GRUP_PCT = 82;

const data = connectivityByRegion.map((r) => ({
  ...r,
  nama: r.regional.replace("Regional ", "R"),
}));

export function ConnectivityByRegion() {
  const { active, isFiltered, def } = useSubholding();
  // Regional 1–7 adalah wilayah operasi kebun & pabrik PalmCo (PTPN IV); kartu ini
  // tidak punya pecahan untuk SugarCo/SupportingCo, jadi seluruh batang diredupkan
  // saat cakupan aktif bukan PalmCo — bukan disembunyikan, agar konteks tetap ada.
  const luarCakupan = isFiltered && active !== "palmco";
  const opacity = luarCakupan ? 0.25 : 1;

  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-2.5 pt-3"
      style={{ "--d": "90ms" } as React.CSSProperties}
    >
      <SectionHead title="Konektivitas per Regional" action="Lihat Detail" />
      <p className="mt-[3px] text-[9px] text-ink-500">
        {luarCakupan ? (
          <>Wilayah Regional 1–7 milik PalmCo — di luar cakupan {def.label}</>
        ) : (
          <>
            Lokasi Berkonektivitas Memadai (%) · 528 Kebun &amp; 67 Pabrik · Rata-rata Grup{" "}
            {RATA_GRUP_PCT}%
          </>
        )}
      </p>

      <div className="mt-1.5 min-h-0 w-full flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 16, right: 8, bottom: 0, left: -18 }}>
            <CartesianGrid stroke={CHART_AXIS.grid} vertical={false} />
            <XAxis
              dataKey="nama"
              tickLine={false}
              axisLine={{ stroke: CHART_AXIS.axis }}
              tick={{ fontSize: 8.5, fill: CHART_AXIS.tick }}
              interval={0}
            />
            <YAxis
              domain={[0, 100]}
              ticks={[0, 25, 50, 75, 100]}
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 8.5, fill: CHART_AXIS.tick }}
              width={34}
            />
            <ReferenceLine
              y={RATA_GRUP_PCT}
              stroke={PALETTE.navy}
              strokeDasharray="5 4"
              strokeWidth={1.2}
            />
            <Tooltip
              cursor={{ fill: "rgba(148,163,184,0.08)" }}
              contentStyle={CHART_TOOLTIP_STYLE}
              formatter={(v: number) => [`${v}%`, "Konektivitas Memadai"]}
              labelFormatter={(label: string) => {
                const row = data.find((d) => d.nama === label);
                return row
                  ? `${row.regional} — ${row.wilayah} · ${row.kebun} kebun, ${row.pabrik} pabrik · ${row.tulangPunggung}`
                  : label;
              }}
            />
            <Bar isAnimationActive={false} dataKey="konektivitasPct" radius={[3, 3, 0, 0]} maxBarSize={34}>
              {data.map((d) => (
                <Cell key={d.regional} fill={FILL[d.status]} fillOpacity={opacity} />
              ))}
              <LabelList
                dataKey="konektivitasPct"
                position="top"
                offset={5}
                formatter={(v: React.ReactNode) => `${v}%`}
                style={{ fontSize: 8.5, fill: "#334155", fontWeight: 700 }}
              />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <p className="pb-1 text-[9px] leading-snug text-ink-500">
        Regional 7 (62%, VSAT &amp; seluler) dan Regional 5 (72%) berstatus terbatas/kritis — 151
        kebun terpencil menahan rata-rata grup di 82%.
      </p>
    </div>
  );
}
