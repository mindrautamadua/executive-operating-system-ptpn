"use client";

import {
  Bar,
  CartesianGrid,
  Cell,
  ComposedChart,
  LabelList,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { ageProfile } from "@/lib/agro-data";
import { CHART_AXIS, CHART_TOOLTIP_STYLE, PALETTE } from "@/lib/chart-palette";
import { SectionHead } from "@/components/hc/SectionHead";
import { useSubholding } from "@/components/SubholdingProvider";
import { ScopeEmpty, inScope } from "@/components/ui/CommodityScope";

/** Tua & renta di-highlight amber/merah — driver 40% gap yield. */
const BAR_COLORS: Record<string, string> = {
  TBM: PALETTE.slate,
  Muda: PALETTE.greenSoft,
  Prima: PALETTE.green,
  Tua: PALETTE.amber,
  Renta: PALETTE.red,
};

export function AgeProfileChart() {
  // Domain: profil umur tanaman sawit inti (kebun sawit) → milik PalmCo;
  // tidak ada pecahan tebu/karet, jadi di luar PalmCo kartu dikosongkan.
  const { active, def } = useSubholding();
  const luarCakupan = !inScope(active, "kebun sawit");

  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-2.5 pt-3"
      style={{ "--d": "60ms" } as React.CSSProperties}
    >
      <SectionHead title="Profil Umur Tanaman Sawit" action="Lihat Detail" />
      <p className="mt-[3px] text-[9px] text-ink-500">
        Distribusi Luas 508,7 Rb Ha Inti + Kurva Yield per Kelompok Umur
      </p>

      {luarCakupan ? (
        <ScopeEmpty label={def.fullLabel} />
      ) : (
      <>
      <div className="mt-1.5 min-h-0 w-full flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={ageProfile} margin={{ top: 16, right: 4, bottom: 0, left: -14 }}>
            <CartesianGrid stroke={CHART_AXIS.grid} vertical={false} />
            <XAxis
              dataKey="bucket"
              tickLine={false}
              axisLine={{ stroke: CHART_AXIS.axis }}
              tick={{ fontSize: 8.5, fill: CHART_AXIS.tick }}
            />
            <YAxis
              yAxisId="luas"
              domain={[0, 240]}
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 8.5, fill: CHART_AXIS.tick }}
              tickFormatter={(v: number) => `${v}`}
              width={34}
            />
            <YAxis
              yAxisId="yield"
              orientation="right"
              domain={[0, 30]}
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 8.5, fill: CHART_AXIS.tick }}
              width={30}
            />
            <Tooltip
              contentStyle={CHART_TOOLTIP_STYLE}
              formatter={(v: number, name: string) =>
                name === "Luas"
                  ? [`${v.toLocaleString("id-ID", { minimumFractionDigits: 1 })} rb ha`, name]
                  : [`${v.toLocaleString("id-ID", { minimumFractionDigits: 1 })} t/ha`, name]
              }
              labelFormatter={(label: string) => {
                const row = ageProfile.find((a) => a.bucket === label);
                return row ? `${row.bucket} (${row.rentang}) · ${row.pct}%` : label;
              }}
            />
            <Bar isAnimationActive={false} yAxisId="luas" dataKey="luasRbHa" name="Luas" barSize={34} radius={[4, 4, 0, 0]}>
              {ageProfile.map((a) => (
                <Cell key={a.bucket} fill={BAR_COLORS[a.bucket]} />
              ))}
              <LabelList
                dataKey="pct"
                position="top"
                formatter={(v: number) => `${v}%`}
                style={{ fontSize: 8.5, fill: "#64748b", fontWeight: 700 }}
              />
            </Bar>
            <Line isAnimationActive={false}
              yAxisId="yield"
              type="monotone"
              dataKey="yieldTonHa"
              name="Yield"
              stroke={PALETTE.navy}
              strokeWidth={1.8}
              dot={{ r: 2.5, fill: PALETTE.navy }}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      <p className="pb-1 text-[9px] leading-snug text-ink-500">
        Tua + renta 27% (137,4 rb ha) — yield jatuh dari 26,0 (prima) ke 13,2 t/ha (renta);
        driver 40% gap yield vs benchmark swasta.
      </p>
      </>
      )}
    </div>
  );
}
