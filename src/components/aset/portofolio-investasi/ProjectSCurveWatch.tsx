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
import { sCurveWatch, sCurveWatchNote } from "@/lib/inv-data";
import { CHART_AXIS, CHART_TOOLTIP_STYLE, PALETTE } from "@/lib/chart-palette";
import { SectionHead } from "@/components/hc/SectionHead";
import { ToneBadge, type BadgeTone } from "@/components/shared/ToneBadge";
import { useSubholding } from "@/components/SubholdingProvider";
import { toSubholdingId } from "@/lib/subholding";

const SHORT = ["Revit. 5 PG", "Bioetanol", "Kawasan Industri"];
const COLORS = [PALETTE.green, PALETTE.amber, PALETTE.red];

const STATUS_TONE: Record<string, BadgeTone> = {
  "On Track": "good",
  Waspada: "warn",
  Terlambat: "bad",
};

interface Row {
  periode: string;
  [key: string]: string | number;
}

const data: Row[] = sCurveWatch[0].kurva.map((k, i) => {
  const row: Row = { periode: k.periode };
  sCurveWatch.forEach((p, pi) => {
    row[`rencana${pi}`] = p.kurva[i].rencanaFisikPct;
    row[`aktual${pi}`] = p.kurva[i].aktualFisikPct;
  });
  return row;
});

/** Kurva-S fisik rencana vs aktual tiga proyek kritis (Rp 7,8 T). */
export function ProjectSCurveWatch() {
  const { active, isFiltered, def } = useSubholding();
  // Nama proyek menyebut subholding pelaksananya (Revitalisasi 5 PG & Bioetanol
  // milik SGN, Kawasan Industri milik PTPN I).
  const dim = (proyek: string) => {
    if (!isFiltered) return 1;
    const id = toSubholdingId(proyek);
    return id === null || id === active ? 1 : 0.25;
  };

  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-2.5 pt-3"
      style={{ "--d": "60ms" } as React.CSSProperties}
    >
      <SectionHead title="Kurva-S Proyek Kritis" action="Lihat Detail" />
      <p className="mt-[3px] text-[9px] text-ink-500">
        {isFiltered
          ? `Progress Fisik (%) Rencana vs Aktual · proyek ${def.label} disorot`
          : "Progress Fisik (%) Rencana (garis putus) vs Aktual · Q1 2025 – Q2 2026"}
      </p>

      <div className="mt-1.5 min-h-0 w-full flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 10, right: 8, bottom: 0, left: -18 }}>
            <CartesianGrid stroke={CHART_AXIS.grid} vertical={false} />
            <XAxis
              dataKey="periode"
              tickLine={false}
              axisLine={{ stroke: CHART_AXIS.axis }}
              tick={{ fontSize: 8.5, fill: CHART_AXIS.tick }}
            />
            <YAxis
              domain={[0, 60]}
              ticks={[0, 15, 30, 45, 60]}
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 8, fill: CHART_AXIS.tick }}
              tickFormatter={(v: number) => `${v}%`}
              width={36}
            />
            <Tooltip
              contentStyle={CHART_TOOLTIP_STYLE}
              formatter={(v: number, n: string) => [`${v}%`, n]}
            />
            <Legend
              verticalAlign="top"
              align="right"
              height={16}
              iconType="circle"
              iconSize={7}
              wrapperStyle={{ fontSize: 8, color: CHART_AXIS.tick }}
            />
            {sCurveWatch.map((p, i) => (
              <Line isAnimationActive={false}
                key={`rencana-${p.proyek}`}
                type="monotone"
                dataKey={`rencana${i}`}
                name={`${SHORT[i]} — Rencana`}
                stroke={COLORS[i]}
                strokeWidth={1.4}
                strokeDasharray="5 4"
                strokeOpacity={dim(p.proyek)}
                dot={false}
                legendType="none"
              />
            ))}
            {sCurveWatch.map((p, i) => (
              <Line isAnimationActive={false}
                key={`aktual-${p.proyek}`}
                type="monotone"
                dataKey={`aktual${i}`}
                name={SHORT[i]}
                stroke={COLORS[i]}
                strokeWidth={1.8}
                strokeOpacity={dim(p.proyek)}
                dot={{ r: 2.2, fillOpacity: dim(p.proyek) }}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-1 grid shrink-0 grid-cols-2 md:grid-cols-3 gap-1.5">
        {sCurveWatch.map((p, i) => (
          <div
            key={p.proyek}
            className="rounded-lg border border-[#eef2f6] px-2 py-[5px] transition-opacity"
            style={{ opacity: dim(p.proyek) }}
          >
            <div className="flex items-center justify-between gap-1.5">
              <span className="truncate text-[8.5px] font-bold text-ink-900">{SHORT[i]}</span>
              <ToneBadge label={p.status} tone={STATUS_TONE[p.status] ?? "neutral"} />
            </div>
            <div className="mt-[3px] text-[8.5px] font-semibold text-ink-500">
              Rp {p.nilaiRpT.toLocaleString("id-ID", { minimumFractionDigits: 1 })} T · deviasi{" "}
              <span className="font-extrabold text-[#ef4444]">{p.deviasiFisikPpt} ppt</span>
            </div>
          </div>
        ))}
      </div>

      <p className="pt-1 text-[9px] leading-snug text-ink-500">{sCurveWatchNote}</p>
    </div>
  );
}
