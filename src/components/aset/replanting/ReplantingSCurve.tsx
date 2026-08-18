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
import { replantingSCurve, replantingSCurveNote } from "@/lib/arp-data";
import { CHART_AXIS, CHART_TOOLTIP_STYLE, PALETTE } from "@/lib/chart-palette";
import { SectionHead } from "@/components/hc/SectionHead";
import { useSubholding } from "@/components/SubholdingProvider";

const ha = (v: number) => v.toLocaleString("id-ID");

/** Kurva-S kumulatif target vs realisasi replanting 2024–2030. */
export function ReplantingSCurve() {
  const { active } = useSubholding();
  // Pemetaan domain: roadmap tanam ulang sawit — cakupan PalmCo.
  const outOfScope = active !== "all" && active !== "palmco";

  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-2.5 pt-3"
      style={{ "--d": "120ms" } as React.CSSProperties}
    >
      <SectionHead title="Kurva-S Replanting 2024–2030" action="Lihat Detail" />
      <p className="mt-[3px] text-[9px] text-ink-500">
        {outOfScope
          ? "Roadmap tanam ulang sawit hanya untuk PalmCo"
          : "Kumulatif Luas Tanam Ulang (Ha) · Roadmap 106.100 Ha"}
      </p>

      <div
        className="mt-1.5 min-h-0 w-full flex-1 transition-opacity"
        style={{ opacity: outOfScope ? 0.25 : 1 }}
      >
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={replantingSCurve} margin={{ top: 10, right: 8, bottom: 0, left: 4 }}>
            <CartesianGrid stroke={CHART_AXIS.grid} vertical={false} />
            <XAxis
              dataKey="tahun"
              tickLine={false}
              axisLine={{ stroke: CHART_AXIS.axis }}
              tick={{ fontSize: 8, fill: CHART_AXIS.tick }}
            />
            <YAxis
              domain={[0, 120000]}
              ticks={[0, 30000, 60000, 90000, 120000]}
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 8, fill: CHART_AXIS.tick }}
              tickFormatter={(v: number) => `${v / 1000} rb`}
              width={38}
            />
            <Tooltip
              contentStyle={CHART_TOOLTIP_STYLE}
              formatter={(v: number, n: string) => [`${ha(v)} ha`, n]}
            />
            <Legend
              verticalAlign="top"
              align="right"
              height={16}
              iconType="circle"
              iconSize={7}
              wrapperStyle={{ fontSize: 8.5, color: CHART_AXIS.tick }}
            />
            <Line
              type="monotone"
              dataKey="kumulatifTargetHa"
              name="Kumulatif Target"
              stroke={PALETTE.blue}
              strokeWidth={1.8}
              dot={{ r: 2.4 }}
            />
            <Line
              type="monotone"
              dataKey="kumulatifAktualHa"
              name="Kumulatif Realisasi"
              stroke={PALETTE.green}
              strokeWidth={1.8}
              dot={{ r: 2.4 }}
              connectNulls={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <p className="pb-1 text-[9px] leading-snug text-ink-500">{replantingSCurveNote}</p>
    </div>
  );
}
