"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { yieldBench } from "@/lib/sbm-data";
import { CHART_AXIS, CHART_TOOLTIP_STYLE, PALETTE } from "@/lib/chart-palette";
import { SectionHead } from "@/components/hc/SectionHead";
import { useSubholding } from "@/components/SubholdingProvider";

const fmt1 = (v: number) =>
  v.toLocaleString("id-ID", { minimumFractionDigits: 1, maximumFractionDigits: 1 });

const SHORT: Record<string, string> = {
  "Dharma Satya (DSN)": "DSNG",
  "First Resources": "First Res.",
  "Astra Agro Lestari": "AALI",
  "PTPN Group": "PTPN",
  "Sampoerna Agro": "SGRO",
  "Rata-rata Malaysia": "Malaysia",
};

const DATA = yieldBench.map((p) => ({
  name: SHORT[p.name] ?? p.name,
  full: p.name,
  yieldTbs: p.yieldTbs,
  oerPct: p.oerPct,
  isPtpn: p.isPtpn ?? false,
}));

const LABELS: Record<string, string> = {
  yieldTbs: "Yield TBS (ton/ha)",
  oerPct: "OER (%)",
};

/**
 * Yield TBS & OER PTPN vs 5 peer emiten dan rata-rata Malaysia.
 * Entri PTPN pada grafik ini adalah kinerja kebun sawit — wilayah PalmCo.
 * Baris peer eksternal tidak pernah disaring: menghapusnya merusak benchmark.
 */
export function YieldBenchmark() {
  const { active, isFiltered } = useSubholding();
  // Batang PTPN diredupkan bila cakupan aktif bukan PalmCo (sawit).
  const dim = (isPtpn: boolean) => (!isFiltered || !isPtpn || active === "palmco" ? 1 : 0.25);

  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-2.5 pt-3"
      style={{ "--d": "120ms" } as React.CSSProperties}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <SectionHead title="Benchmark Yield & OER" />
          <p className="mt-[3px] text-[9px] text-ink-500">
            Yield TBS (ton/ha/thn) &amp; OER (%) · PTPN 21,9 / 22,4% (PalmCo)
          </p>
        </div>
        <div className="flex shrink-0 items-center gap-2.5">
          <span className="flex items-center gap-1">
            <span
              className="h-[7px] w-[7px] rounded-[2px]"
              style={{ backgroundColor: PALETTE.green }}
            />
            <span className="text-[9px] font-semibold text-ink-500">Yield TBS</span>
          </span>
          <span className="flex items-center gap-1">
            <span
              className="h-[7px] w-[7px] rounded-[2px]"
              style={{ backgroundColor: PALETTE.blue }}
            />
            <span className="text-[9px] font-semibold text-ink-500">OER</span>
          </span>
        </div>
      </div>

      <div className="mt-1.5 min-h-0 w-full flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={DATA} margin={{ top: 14, right: 8, bottom: 4, left: -16 }} barCategoryGap="24%">
            <CartesianGrid stroke={CHART_AXIS.grid} vertical={false} />
            <XAxis
              dataKey="name"
              tickLine={false}
              axisLine={{ stroke: CHART_AXIS.axis }}
              tick={{ fontSize: 8, fill: CHART_AXIS.tick }}
              interval={0}
            />
            <YAxis
              domain={[0, 28]}
              ticks={[0, 7, 14, 21, 28]}
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 8.5, fill: CHART_AXIS.tick }}
              width={38}
            />
            <Tooltip
              cursor={{ fill: "rgba(148,163,184,0.08)" }}
              contentStyle={CHART_TOOLTIP_STYLE}
              formatter={(v: number, n: string) => [fmt1(v), LABELS[n] ?? n]}
            />
            <Bar isAnimationActive={false} dataKey="yieldTbs" radius={[3, 3, 0, 0]} maxBarSize={16}>
              {DATA.map((d) => (
                <Cell
                  key={d.full}
                  fill={d.isPtpn ? PALETTE.green : PALETTE.greenSoft}
                  fillOpacity={dim(d.isPtpn)}
                />
              ))}
            </Bar>
            <Bar isAnimationActive={false} dataKey="oerPct" radius={[3, 3, 0, 0]} maxBarSize={16}>
              {DATA.map((d) => (
                <Cell
                  key={d.full}
                  fill={d.isPtpn ? PALETTE.blue : PALETTE.blueSoft}
                  fillOpacity={dim(d.isPtpn)}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
