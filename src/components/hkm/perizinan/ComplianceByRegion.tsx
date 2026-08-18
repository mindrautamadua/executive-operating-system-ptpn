"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { complianceByRegion } from "@/lib/hkm-data";
import { CHART_AXIS, CHART_TOOLTIP_STYLE, PALETTE } from "@/lib/chart-palette";
import { SectionHead } from "@/components/hc/SectionHead";
import { useSubholding } from "@/components/SubholdingProvider";

const data = complianceByRegion.map((r) => ({
  ...r,
  singkat: r.regional.replace("Regional ", "R").replace(/\s*\(.*\)/, ""),
}));

export function ComplianceByRegion() {
  const { active, isFiltered, def } = useSubholding();
  // Regional 1–7 adalah wilayah kebun & pabrik PalmCo (PTPN IV); tidak ada
  // pecahan regional untuk SugarCo/SupportingCo, jadi batang diredupkan saat
  // cakupan aktif bukan PalmCo.
  const luarCakupan = isFiltered && active !== "palmco";
  const opacity = luarCakupan ? 0.25 : 1;

  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-2.5 pt-3"
      style={{ "--d": "90ms" } as React.CSSProperties}
    >
      <SectionHead title="Kepatuhan Perizinan per Regional" action="Lihat Detail" />
      <p className="mt-[3px] text-[9px] text-ink-500">
        {luarCakupan ? (
          <>7 Regional adalah wilayah PalmCo — di luar cakupan {def.label}</>
        ) : (
          <>612 Izin Aktif &amp; 43 Berakhir ≤6 Bulan · 7 Regional</>
        )}
      </p>

      <div className="mt-1.5 min-h-0 w-full flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 12, right: 10, bottom: 0, left: -20 }}>
            <CartesianGrid stroke={CHART_AXIS.grid} vertical={false} />
            <XAxis
              dataKey="singkat"
              tickLine={false}
              axisLine={{ stroke: CHART_AXIS.axis }}
              tick={{ fontSize: 8.5, fill: CHART_AXIS.tick }}
            />
            <YAxis
              domain={[0, 120]}
              ticks={[0, 30, 60, 90, 120]}
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 8.5, fill: CHART_AXIS.tick }}
              width={34}
            />
            <Tooltip
              contentStyle={CHART_TOOLTIP_STYLE}
              formatter={(v: number, name: string) => [`${v} izin`, name]}
              labelFormatter={(l: string) => {
                const row = data.find((r) => r.singkat === l);
                return row
                  ? `${row.regional} · kepatuhan ${row.kepatuhanPct.toLocaleString("id-ID", { minimumFractionDigits: 1 })}% · ${row.sanksiYtd} sanksi YTD`
                  : l;
              }}
            />
            <Legend
              verticalAlign="top"
              align="right"
              height={16}
              iconSize={8}
              wrapperStyle={{ fontSize: 8.5 }}
            />
            <Bar isAnimationActive={false}
              name="Izin Aktif"
              dataKey="izinAktif"
              fill={PALETTE.blueSoft}
              fillOpacity={opacity}
              radius={[3, 3, 0, 0]}
              barSize={17}
            />
            <Bar isAnimationActive={false}
              name="Berakhir ≤6 Bulan"
              dataKey="berakhir6Bulan"
              fill={PALETTE.amber}
              fillOpacity={opacity}
              radius={[3, 3, 0, 0]}
              barSize={17}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <p className="pb-1 text-[9px] leading-snug text-ink-500">
        Regional 3 memikul portofolio terbesar (112 izin) sekaligus kedaluwarsa terbanyak (9) dengan
        kepatuhan 91,4%; Regional 7 terendah di 89,3%.
      </p>
    </div>
  );
}
