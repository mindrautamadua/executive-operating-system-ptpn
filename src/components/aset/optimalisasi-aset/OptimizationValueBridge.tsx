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
import {
  VALUE_BRIDGE_TOTAL_TARGET_RP_M,
  optimizationValueBridge,
  valueBridgeNote,
} from "@/lib/aop-data";
import { CHART_AXIS, CHART_TOOLTIP_STYLE, PALETTE } from "@/lib/chart-palette";
import { SectionHead } from "@/components/hc/SectionHead";
import { ScopeNote } from "@/components/ui/ScopeNote";

const rp = (v: number) => v.toLocaleString("id-ID");
const pct = (v: number) =>
  v.toLocaleString("id-ID", { minimumFractionDigits: 1, maximumFractionDigits: 1 });

const SHORT: Record<string, string> = {
  "Sewa Aset & Bangunan": "Sewa Aset",
  "KSO / BOT Kemitraan": "KSO/BOT",
  "Kerjasama Lahan (Tebu & Sawit Rakyat)": "Kerjasama Lahan",
  "Divestasi Aset Non-Inti": "Divestasi",
};

const FILLS = [PALETTE.green, PALETTE.teal, PALETTE.blue, PALETTE.amber];

interface WfDatum {
  name: string;
  base: number;
  delta: number;
  fill: string;
  label: string;
  realisasi: number;
  capaian: number;
}

const DATA: WfDatum[] = (() => {
  let run = 0;
  const rows: WfDatum[] = optimizationValueBridge.map((s, i) => {
    const row: WfDatum = {
      name: SHORT[s.komponen] ?? s.komponen,
      base: run,
      delta: s.targetFyRpM,
      fill: FILLS[i],
      label: rp(s.targetFyRpM),
      realisasi: s.realisasiYtdRpM,
      capaian: s.capaianPct,
    };
    run += s.targetFyRpM;
    return row;
  });
  rows.push({
    name: "Total FY 2026",
    base: 0,
    delta: VALUE_BRIDGE_TOTAL_TARGET_RP_M,
    fill: PALETTE.navy,
    label: rp(VALUE_BRIDGE_TOTAL_TARGET_RP_M),
    realisasi: 710,
    capaian: 35.9,
  });
  return rows;
})();

/** Jembatan nilai optimalisasi: kontribusi tiap komponen menuju Rp 1,98 T FY. */
export function OptimizationValueBridge() {
  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-2.5 pt-3"
      style={{ "--d": "120ms" } as React.CSSProperties}
    >
      <SectionHead title="Jembatan Nilai Optimalisasi" action="Lihat Detail" badge={<ScopeNote />} />
      <p className="mt-[3px] text-[9px] text-ink-500">
        Kontribusi Komponen terhadap Target FY (Rp M) · Label = Capaian YTD
      </p>

      <div className="mt-1.5 min-h-0 w-full flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={DATA}
            margin={{ top: 16, right: 6, bottom: 0, left: -4 }}
            barCategoryGap="24%"
          >
            <CartesianGrid stroke={CHART_AXIS.grid} vertical={false} />
            <XAxis
              dataKey="name"
              tickLine={false}
              axisLine={{ stroke: CHART_AXIS.axis }}
              tick={{ fontSize: 8.5, fill: CHART_AXIS.tick }}
              interval={0}
              height={20}
            />
            <YAxis
              domain={[0, 2100]}
              ticks={[0, 700, 1400, 2100]}
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 8, fill: CHART_AXIS.tick }}
              tickFormatter={(v: number) => rp(v)}
              width={42}
            />
            <Tooltip
              cursor={{ fill: "rgba(148,163,184,0.08)" }}
              contentStyle={CHART_TOOLTIP_STYLE}
              formatter={(
                v: number,
                _n: string,
                item: { dataKey?: string | number; payload?: WfDatum },
              ) =>
                item?.dataKey === "base"
                  ? [null, null]
                  : [
                      `Rp ${rp(v)} M target · realisasi Rp ${rp(
                        item?.payload?.realisasi ?? 0,
                      )} M (${pct(item?.payload?.capaian ?? 0)}%)`,
                      "Target FY",
                    ]
              }
            />
            {/* dasar transparan agar bar komponen "melayang" ala waterfall */}
            <Bar dataKey="base" stackId="vb" fill="transparent" isAnimationActive={false} />
            <Bar dataKey="delta" stackId="vb" radius={[3, 3, 0, 0]} maxBarSize={44}>
              {DATA.map((d) => (
                <Cell key={d.name} fill={d.fill} fillOpacity={0.9} />
              ))}
              <LabelList
                dataKey="capaian"
                position="top"
                offset={5}
                formatter={(v: React.ReactNode) => `${pct(Number(v))}%`}
                style={{ fontSize: 8.5, fill: "#334155", fontWeight: 700 }}
              />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <p className="pb-1 text-[9px] leading-snug text-ink-500">{valueBridgeNote}</p>
    </div>
  );
}
