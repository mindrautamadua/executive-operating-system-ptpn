"use client";

import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { caseSummaryByType, caseSummaryNote, LEGAL_PORTFOLIO_HREF } from "@/lib/hkm-data-detail";
import { CHART_TOOLTIP_STYLE } from "@/lib/chart-palette";
import { SectionHead } from "@/components/hc/SectionHead";
import { ScopeNote } from "@/components/ui/ScopeNote";

const TOTAL = caseSummaryByType.reduce((s, r) => s + r.count, 0);
const EKSPOSUR = caseSummaryByType.reduce((s, r) => s + r.eksposurRpM, 0);

/** Ringkasan kompak 87 perkara aktif; pendalaman ada di Legal Case Portfolio. */
export function CaseSummaryByType() {
  return (
    <div
      className="card anim-rise flex h-full min-h-0 flex-col px-4 pb-3 pt-3"
      style={{ "--d": "60ms" } as React.CSSProperties}
    >
      <SectionHead title="Ringkasan Perkara per Tipe" badge={<ScopeNote />} />
      <p className="mt-[3px] text-[9px] text-ink-500">
        {TOTAL} Perkara Aktif · Eksposur Agregat Rp{" "}
        {(EKSPOSUR / 1000).toLocaleString("id-ID", { minimumFractionDigits: 1 })} T
      </p>

      <div className="flex min-h-0 flex-1 items-center gap-2">
        <div className="h-full w-[118px] shrink-0">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={caseSummaryByType}
                dataKey="count"
                nameKey="tipe"
                innerRadius="58%"
                outerRadius="86%"
                paddingAngle={2}
                stroke="none"
              >
                {caseSummaryByType.map((r) => (
                  <Cell key={r.tipe} fill={r.color} />
                ))}
              </Pie>
              <Tooltip
                formatter={(v: number, n: string) => [`${v} perkara`, n]}
                contentStyle={CHART_TOOLTIP_STYLE}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <ul className="min-w-0 flex-1">
          {caseSummaryByType.map((r) => {
            const row = (
              <>
                <span
                  className="h-[8px] w-[8px] shrink-0 rounded-[2px]"
                  style={{ backgroundColor: r.color }}
                />
                <span className="min-w-0 flex-1 truncate text-[9px] font-medium text-ink-700">
                  {r.tipe}
                </span>
                {r.href && <ArrowUpRight size={10} className="shrink-0 text-ptpn-green" />}
                <span className="shrink-0 text-[9.5px] font-bold text-ink-900">{r.count}</span>
                <span className="w-[44px] shrink-0 text-right text-[8.5px] tabular-nums text-ink-400">
                  Rp {r.eksposurRpM.toLocaleString("id-ID")} M
                </span>
              </>
            );
            return (
              <li key={r.tipe} className="py-[4px]">
                {r.href ? (
                  <Link
                    href={r.href}
                    className="flex items-center gap-1.5 hover:text-ptpn-green"
                    title={r.hrefLabel}
                  >
                    {row}
                  </Link>
                ) : (
                  <span className="flex items-center gap-1.5">{row}</span>
                )}
              </li>
            );
          })}
        </ul>
      </div>

      <div className="mt-1 rounded-lg border border-[#d9e4f5] bg-[#e8f1fd] px-2.5 py-[7px]">
        <p className="text-[9px] leading-[1.45] text-ink-700">{caseSummaryNote}</p>
        <Link
          href={LEGAL_PORTFOLIO_HREF}
          className="mt-1.5 inline-flex items-center gap-1 rounded-md bg-ptpn-green px-2 py-[4px] text-[8.5px] font-bold text-white transition-opacity hover:opacity-90"
        >
          Buka Legal Case Portfolio <ArrowRight size={10} />
        </Link>
      </div>
    </div>
  );
}
