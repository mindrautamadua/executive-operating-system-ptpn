"use client";

import {
  Area,
  CartesianGrid,
  ComposedChart,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { capacityGap, capacityGapNote, capacityVsSupply } from "@/lib/afs-data";
import { CHART_AXIS, CHART_TOOLTIP_STYLE, PALETTE } from "@/lib/chart-palette";
import { SectionHead } from "@/components/hc/SectionHead";
import { useSubholding } from "@/components/SubholdingProvider";

const num = (v: number) =>
  v.toLocaleString("id-ID", { minimumFractionDigits: 1, maximumFractionDigits: 1 });

/** Gap kapasitas terhadap proyeksi pasokan sawit & tebu 2026–2030 (jt ton). */
const data = capacityVsSupply.map((p) => ({
  ...p,
  gapSawitJtTon: +(p.kapasitasSawitJtTon - p.pasokanSawitJtTon).toFixed(1),
}));

export function CapacityVsSupply() {
  const { active, isFiltered } = useSubholding();
  // Pemetaan domain: kurva sawit/TBS milik PalmCo, kurva tebu/gula milik SugarCo.
  const dim = (komoditas: "sawit" | "tebu") => {
    if (!isFiltered) return 1;
    return active === (komoditas === "sawit" ? "palmco" : "sugarco") ? 1 : 0.25;
  };

  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-2.5 pt-3"
      style={{ "--d": "180ms" } as React.CSSProperties}
    >
      <SectionHead title="Kapasitas vs Proyeksi Pasokan" action="Lihat Detail" />
      <p className="mt-[3px] text-[9px] text-ink-500">
        Kapasitas Olah vs Pasokan Bahan Baku 2026–2030 (jt ton)
      </p>

      <div className="mt-1.5 min-h-0 w-full flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={data} margin={{ top: 10, right: 6, bottom: 0, left: -20 }}>
            <defs>
              <linearGradient id="afs-gap-fill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={PALETTE.amber} stopOpacity="0.22" />
                <stop offset="100%" stopColor={PALETTE.amber} stopOpacity="0.03" />
              </linearGradient>
            </defs>
            <CartesianGrid stroke={CHART_AXIS.grid} vertical={false} />
            <XAxis
              dataKey="tahun"
              tickLine={false}
              axisLine={{ stroke: CHART_AXIS.axis }}
              tick={{ fontSize: 8, fill: CHART_AXIS.tick }}
              interval={0}
            />
            <YAxis
              domain={[0, 18]}
              ticks={[0, 4.5, 9, 13.5, 18]}
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 8.5, fill: CHART_AXIS.tick }}
              width={34}
            />
            <Tooltip
              formatter={(v: number, name: string) => [`${num(v)} jt ton`, name]}
              contentStyle={CHART_TOOLTIP_STYLE}
            />
            <Area isAnimationActive={false}
              name="Gap Kapasitas Sawit"
              type="linear"
              dataKey="gapSawitJtTon"
              stroke={PALETTE.amber}
              strokeWidth={1.3}
              strokeDasharray="4 3"
              fill="url(#afs-gap-fill)"
              strokeOpacity={dim("sawit")}
              fillOpacity={dim("sawit")}
              dot={false}
            />
            <Line isAnimationActive={false}
              name="Kapasitas PKS"
              type="linear"
              dataKey="kapasitasSawitJtTon"
              stroke={PALETTE.green}
              strokeWidth={1.8}
              strokeOpacity={dim("sawit")}
              dot={{ r: 2.2, fill: PALETTE.green, strokeWidth: 0, fillOpacity: dim("sawit") }}
              activeDot={{ r: 4 }}
            />
            <Line isAnimationActive={false}
              name="Pasokan TBS"
              type="linear"
              dataKey="pasokanSawitJtTon"
              stroke={PALETTE.greenSoft}
              strokeWidth={1.6}
              strokeDasharray="5 4"
              strokeOpacity={dim("sawit")}
              dot={{ r: 2, fill: PALETTE.greenSoft, strokeWidth: 0, fillOpacity: dim("sawit") }}
            />
            <Line isAnimationActive={false}
              name="Kapasitas PG"
              type="linear"
              dataKey="kapasitasTebuJtTon"
              stroke={PALETTE.blue}
              strokeWidth={1.8}
              strokeOpacity={dim("tebu")}
              dot={{ r: 2.2, fill: PALETTE.blue, strokeWidth: 0, fillOpacity: dim("tebu") }}
              activeDot={{ r: 4 }}
            />
            <Line isAnimationActive={false}
              name="Pasokan Tebu"
              type="linear"
              dataKey="pasokanTebuJtTon"
              stroke={PALETTE.blueSoft}
              strokeWidth={1.6}
              strokeDasharray="5 4"
              strokeOpacity={dim("tebu")}
              dot={{ r: 2, fill: PALETTE.blueSoft, strokeWidth: 0, fillOpacity: dim("tebu") }}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      <div className="mb-1 flex items-center justify-center gap-4">
        {capacityGap.map((g) => (
          <span
            key={g.komoditas}
            className="flex items-center gap-1.5 text-[9px] text-ink-500 transition-opacity"
            style={{ opacity: dim(g.komoditas.startsWith("Sawit") ? "sawit" : "tebu") }}
          >
            <span className="font-semibold text-ink-700">{g.komoditas}</span>
            gap {num(g.gap2026JtTon)} → {num(g.gap2030JtTon)} jt ton
          </span>
        ))}
      </div>

      <p className="line-clamp-2 text-[9px] leading-snug text-ink-500">{capacityGapNote}</p>
    </div>
  );
}
