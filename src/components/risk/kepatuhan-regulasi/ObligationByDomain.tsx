"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
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
import { obligationByDomain } from "@/lib/risk-data-detail";
import { CHART_AXIS, CHART_TOOLTIP_STYLE, PALETTE } from "@/lib/chart-palette";
import { SectionHead } from "@/components/hc/SectionHead";
import { ScopeNote } from "@/components/ui/ScopeNote";

const SERIES = [
  { key: "patuh", name: "Patuh", color: PALETTE.green },
  { key: "parsial", name: "Parsial", color: PALETTE.amber },
  { key: "non", name: "Non-Compliant", color: PALETTE.red },
];

const linked = obligationByDomain.filter((d) => d.href);

/** Status 386 kewajiban regulasi per domain pengawasan (ditumpuk). */
export function ObligationByDomain() {
  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-2 pt-3"
      style={{ "--d": "60ms" } as React.CSSProperties}
    >
      <SectionHead title="Kewajiban per Domain Regulasi" badge={<ScopeNote />} />
      <p className="mt-[3px] text-[9px] text-ink-500">
        386 Kewajiban — 352 Patuh · 28 Parsial · 6 Non-Compliant
      </p>

      <div className="mt-1.5 min-h-0 w-full flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={obligationByDomain} margin={{ top: 8, right: 10, bottom: 0, left: -14 }}>
            <CartesianGrid stroke={CHART_AXIS.grid} vertical={false} />
            <XAxis
              dataKey="domain"
              tickLine={false}
              axisLine={{ stroke: CHART_AXIS.axis }}
              tick={{ fontSize: 8.5, fill: CHART_AXIS.tick }}
              interval={0}
              tickFormatter={(v: string) => (v.length > 14 ? `${v.slice(0, 13)}…` : v)}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 8.5, fill: CHART_AXIS.tick }}
              width={34}
            />
            <Tooltip contentStyle={CHART_TOOLTIP_STYLE} cursor={{ fill: "var(--chart-grid)" }} />
            <Legend
              verticalAlign="bottom"
              height={16}
              iconSize={7}
              wrapperStyle={{ fontSize: 8.5, color: "var(--chart-tick)" }}
            />
            {SERIES.map((s, i) => (
              <Bar
                key={s.key}
                dataKey={s.key}
                name={s.name}
                stackId="ob"
                fill={s.color}
                radius={i === SERIES.length - 1 ? [3, 3, 0, 0] : undefined}
                maxBarSize={40}
              />
            ))}
          </BarChart>
        </ResponsiveContainer>
      </div>

      {linked.map((d) => (
        <Link
          key={d.domain}
          href={d.href ?? "#"}
          className="mt-1 flex items-center gap-1.5 rounded-lg border border-[#e3e9ef] bg-[#f8fafc] px-2.5 py-[6px] text-[8.5px] text-ink-700 transition-colors hover:border-ptpn-green hover:text-ptpn-green"
        >
          <span className="font-bold">{d.domain}</span>
          <span className="min-w-0 flex-1 truncate text-ink-500">{d.catatan}</span>
          <ArrowUpRight size={11} className="shrink-0" />
        </Link>
      ))}
    </div>
  );
}
