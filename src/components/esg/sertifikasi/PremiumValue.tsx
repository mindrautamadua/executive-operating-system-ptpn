"use client";

import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { premiumValue } from "@/lib/esg-data";
import { CHART_AXIS, CHART_TOOLTIP_STYLE, PALETTE } from "@/lib/chart-palette";
import { SectionHead } from "@/components/hc/SectionHead";
import { useSubholding } from "@/components/SubholdingProvider";

const angka =(v: number) => v.toLocaleString("id-ID");

const KPI = [
  { label: "Premi CSPO", value: `USD ${premiumValue.premiUsdPerTon.toLocaleString("id-ID", { minimumFractionDigits: 1 })}/ton` },
  { label: "Realisasi YTD", value: `Rp ${angka(premiumValue.realisasiYtdRpM)} M` },
  { label: "Volume CSPO", value: `${angka(premiumValue.volumeCspoRbTon)} rb ton` },
];

export function PremiumValue() {
  const { active, def } = useSubholding();
  // Premi CSPO melekat pada volume CPO bersertifikat — komoditas sawit, PalmCo.
  const outOfScope = active !== "all" && active !== "palmco";

  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-2.5 pt-3"
      style={{ "--d": "150ms" } as React.CSSProperties}
    >
      <SectionHead title="Nilai Premi Sertifikasi (CSPO)" action="Lihat Detail" />
      <p className="mt-[3px] text-[9px] text-ink-500">
        {outOfScope
          ? `Premi CSPO melekat pada volume CPO PalmCo — di luar cakupan ${def.label}`
          : "Realisasi Premi Bulanan 2026 (Rp Miliar)"}
      </p>

      <div
        className="mt-2 grid grid-cols-2 md:grid-cols-3 gap-2 transition-opacity"
        style={{ opacity: outOfScope ? 0.25 : 1 }}
      >
        {KPI.map((k) => (
          <div key={k.label} className="rounded-xl bg-[#f8fafc] px-2.5 py-2">
            <div className="text-[9px] font-semibold text-ink-500">{k.label}</div>
            <div className="mt-[3px] whitespace-nowrap text-[12px] font-extrabold leading-none text-ink-900">
              {k.value}
            </div>
          </div>
        ))}
      </div>

      <div
        className="mt-1.5 min-h-0 w-full flex-1 transition-opacity"
        style={{ opacity: outOfScope ? 0.25 : 1 }}
      >
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={premiumValue.monthly} margin={{ top: 12, right: 12, bottom: 0, left: -20 }}>
            <CartesianGrid stroke={CHART_AXIS.grid} vertical={false} />
            <XAxis
              dataKey="bulan"
              tickLine={false}
              axisLine={{ stroke: CHART_AXIS.axis }}
              tick={{ fontSize: 8.5, fill: CHART_AXIS.tick }}
            />
            <YAxis
              domain={[0, 30]}
              ticks={[0, 10, 20, 30]}
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 8.5, fill: CHART_AXIS.tick }}
              width={34}
            />
            <Tooltip
              contentStyle={CHART_TOOLTIP_STYLE}
              formatter={(v: number) => [`Rp ${angka(v)} M`, "Premi CSPO"]}
            />
            <Line isAnimationActive={false}
              type="monotone"
              dataKey="rpM"
              stroke={PALETTE.green}
              strokeWidth={1.9}
              dot={{ r: 2.4 }}
              activeDot={{ r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <p className="pb-1 text-[9px] leading-snug text-ink-500">
        Premi naik konsisten Rp 14 M → Rp 24 M/bulan seiring bertambahnya volume bersertifikat.
      </p>
    </div>
  );
}
