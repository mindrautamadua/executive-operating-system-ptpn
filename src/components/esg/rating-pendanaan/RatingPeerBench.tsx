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
import { peerBench } from "@/lib/esg-data-detail";
import { CHART_AXIS, CHART_TOOLTIP_STYLE, PALETTE } from "@/lib/chart-palette";
import { SectionHead } from "@/components/hc/SectionHead";
import { ScopeNote } from "@/components/ui/ScopeNote";

const num = (v: number) => v.toLocaleString("id-ID", { minimumFractionDigits: 1 });

/** Benchmark Sustainalytics ESG Risk vs peer sawit regional (rendah = baik). */
export function RatingPeerBench() {
  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-2.5 pt-3"
      style={{ "--d": "120ms" } as React.CSSProperties}
    >
      <SectionHead title="Benchmark Peer ESG Risk" badge={<ScopeNote />} />
      <p className="mt-[3px] text-[9px] text-ink-500">
        Sustainalytics ESG Risk · makin rendah makin baik
      </p>

      <div className="mt-1.5 min-h-0 w-full flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={peerBench}
            layout="vertical"
            margin={{ top: 4, right: 34, bottom: 0, left: 4 }}
            barCategoryGap="26%"
          >
            <CartesianGrid stroke={CHART_AXIS.grid} horizontal={false} />
            <XAxis
              type="number"
              domain={[0, 40]}
              tickLine={false}
              axisLine={{ stroke: CHART_AXIS.axis }}
              tick={{ fontSize: 8.5, fill: CHART_AXIS.tick }}
            />
            <YAxis
              type="category"
              dataKey="perusahaan"
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 8, fill: CHART_AXIS.tick }}
              width={98}
            />
            <Tooltip
              formatter={(v: number, _n, p) => [
                num(v),
                (p?.payload as { band: string })?.band ?? "ESG Risk",
              ]}
              contentStyle={CHART_TOOLTIP_STYLE}
            />
            <Bar isAnimationActive={false} dataKey="skor" radius={[0, 3, 3, 0]} barSize={14}>
              {peerBench.map((p) => (
                <Cell
                  key={p.perusahaan}
                  fill={p.isPtpn ? PALETTE.green : p.band === "High Risk" ? PALETTE.red : PALETTE.slate}
                />
              ))}
              <LabelList
                dataKey="skor"
                position="right"
                formatter={(v: number) => num(v)}
                style={{ fontSize: 8, fill: CHART_AXIS.tick, fontWeight: 700 }}
              />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
