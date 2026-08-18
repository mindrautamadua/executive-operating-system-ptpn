"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { legalCaseByType } from "@/lib/risk-data-detail";
import { CHART_TOOLTIP_STYLE } from "@/lib/chart-palette";
import { SectionHead } from "@/components/hc/SectionHead";
import { ScopeNote } from "@/components/ui/ScopeNote";

const TOTAL = legalCaseByType.reduce((s, r) => s + r.count, 0);

export function LegalCaseByType() {
  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-3 pt-3"
      style={{ "--d": "60ms" } as React.CSSProperties}
    >
      <SectionHead title="Perkara per Jenis" badge={<ScopeNote />} />
      <p className="mt-[3px] text-[9px] text-ink-500">
        Komposisi {TOTAL} Perkara Aktif Lintas Forum Peradilan
      </p>

      <div className="flex min-h-0 flex-1 items-center gap-2">
        <div className="h-full w-[128px] shrink-0">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={legalCaseByType}
                dataKey="count"
                nameKey="tipe"
                innerRadius="58%"
                outerRadius="86%"
                paddingAngle={2}
                stroke="none"
              >
                {legalCaseByType.map((r) => (
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
          {legalCaseByType.map((r) => {
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
                <span className="w-[30px] shrink-0 text-right text-[8.5px] text-ink-400">
                  {Math.round((r.count / TOTAL) * 100)}%
                </span>
              </>
            );
            return (
              <li key={r.tipe} className="py-[4px]">
                {r.href ? (
                  <Link
                    href={r.href}
                    className="flex items-center gap-1.5 hover:text-ptpn-green"
                    title="Detail perkara ketenagakerjaan di modul Industrial Relations"
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

      <p className="mt-1 rounded-md bg-[#f8fafc] px-2 py-[5px] text-[9px] leading-[1.4] text-ink-500">
        9 perkara PHI ditangani di modul Industrial Relations (scope SDM) — angka di sini adalah
        agregat enterprise.
      </p>
    </div>
  );
}
