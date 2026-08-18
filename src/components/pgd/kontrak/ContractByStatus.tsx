"use client";

import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { contractByJenis, contractByStatus } from "@/lib/pgd-data-detail";
import { CHART_TOOLTIP_STYLE, PALETTE } from "@/lib/chart-palette";
import { SectionHead } from "@/components/hc/SectionHead";
import { ScopeNote } from "@/components/ui/ScopeNote";

const TOTAL = contractByJenis.reduce((s, r) => s + r.jumlah, 0);

const STATUS_COLOR: Record<string, string> = {
  green: PALETTE.green,
  amber: PALETTE.amber,
  red: PALETTE.red,
  blue: PALETTE.blue,
};

export function ContractByStatus() {
  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-3 pt-3"
      style={{ "--d": "60ms" } as React.CSSProperties}
    >
      <SectionHead title="Kontrak per Jenis & Status" badge={<ScopeNote />} />
      <p className="mt-[3px] text-[9px] text-ink-500">
        {TOTAL.toLocaleString("id-ID")} Kontrak Aktif · Nilai Rp 18,6 T
      </p>

      <div className="flex min-h-0 flex-1 items-center gap-2">
        <div className="h-full w-[120px] shrink-0">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={contractByJenis}
                dataKey="jumlah"
                nameKey="jenis"
                innerRadius="56%"
                outerRadius="86%"
                paddingAngle={2}
                stroke="none"
              >
                {contractByJenis.map((r) => (
                  <Cell key={r.jenis} fill={r.color} />
                ))}
              </Pie>
              <Tooltip
                formatter={(v: number, n: string) => [`${v} kontrak`, n]}
                contentStyle={CHART_TOOLTIP_STYLE}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <ul className="min-w-0 flex-1">
          {contractByStatus.map((r) => (
            <li key={r.status} className="border-b border-[#f2f5f8] py-[6px] last:border-0">
              <div className="flex items-center gap-1.5">
                <span
                  className="h-[8px] w-[8px] shrink-0 rounded-[2px]"
                  style={{ backgroundColor: STATUS_COLOR[r.tone] }}
                />
                <span className="min-w-0 flex-1 truncate text-[9.5px] font-semibold text-ink-700">
                  {r.status}
                </span>
                <span className="shrink-0 text-[10px] font-extrabold text-ink-900">
                  {r.jumlah.toLocaleString("id-ID")}
                </span>
              </div>
              <div className="mt-[2px] pl-[14px] text-[9px] text-ink-500">
                Nilai Rp {r.valueRpT.toLocaleString("id-ID", { minimumFractionDigits: 2 })} T
              </div>
            </li>
          ))}
        </ul>
      </div>

      <p className="mt-1 rounded-md bg-[#f8fafc] px-2 py-[5px] text-[9px] leading-[1.4] text-ink-500">
        42 kontrak payung (3,4% jumlah) menutup 34,0% nilai — instrumen paling padat nilai per
        kontrak yang dikelola.
      </p>
    </div>
  );
}
