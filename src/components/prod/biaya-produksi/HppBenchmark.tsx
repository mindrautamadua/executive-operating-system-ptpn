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
import { hppBenchmark, hppBenchmarkNote } from "@/lib/biaya-opex-data";
import { CHART_AXIS, CHART_TOOLTIP_STYLE, PALETTE } from "@/lib/chart-palette";
import { useSubholding } from "@/components/SubholdingProvider";
import { inScope, ScopeEmpty } from "@/components/ui/CommodityScope";
import { SectionHead } from "../../hc/SectionHead";

const rp = (v: number) => v.toLocaleString("id-ID");

export function HppBenchmark() {
  const { active, def } = useSubholding();
  // Benchmark dibandingkan pada HPP CPO — milik PalmCo.
  const dalamCakupan = inScope(active, "HPP CPO (sawit)");

  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-2.5 pt-3"
      style={{ "--d": "60ms" } as React.CSSProperties}
    >
      <SectionHead title="HPP Benchmark" action="Lihat Detail" />
      <p className="mt-[3px] text-[9px] text-ink-500">
        HPP CPO (Rp/kg) · PTPN vs Industri vs Peer Terbaik
      </p>

      {!dalamCakupan ? (
        <ScopeEmpty label={def.fullLabel} />
      ) : (
        <>
      <div className="mt-1.5 min-h-0 w-full flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={hppBenchmark} margin={{ top: 16, right: 8, bottom: 0, left: -8 }} barCategoryGap="30%">
            <CartesianGrid stroke={CHART_AXIS.grid} vertical={false} />
            <XAxis
              dataKey="entitas"
              tickLine={false}
              axisLine={{ stroke: CHART_AXIS.axis }}
              tick={{ fontSize: 8.5, fill: CHART_AXIS.tick }}
              interval={0}
            />
            <YAxis
              domain={[0, 10000]}
              ticks={[0, 2500, 5000, 7500, 10000]}
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 8.5, fill: CHART_AXIS.tick }}
              tickFormatter={(v: number) => `${v / 1000}K`}
              width={30}
            />
            <Tooltip
              cursor={{ fill: "rgba(148,163,184,0.08)" }}
              formatter={(v: number) => [`Rp ${rp(v)}/kg`, "HPP CPO"]}
              contentStyle={CHART_TOOLTIP_STYLE}
            />
            <Bar isAnimationActive={false} dataKey="hppRpKg" radius={[3, 3, 0, 0]}>
              {hppBenchmark.map((b) => (
                <Cell key={b.entitas} fill={b.isPtpn ? PALETTE.navy : PALETTE.slate} />
              ))}
              <LabelList
                dataKey="hppRpKg"
                position="top"
                offset={4}
                formatter={(v: number) => rp(v)}
                style={{ fontSize: 8.5, fill: "var(--text-1)", fontWeight: 700 }}
              />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <p className="mt-1 line-clamp-2 text-[9px] leading-snug text-ink-500">{hppBenchmarkNote}</p>
        </>
      )}
    </div>
  );
}
