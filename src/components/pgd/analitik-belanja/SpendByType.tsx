"use client";

import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { spendByType } from "@/lib/pgd-data";
import { CHART_TOOLTIP_STYLE } from "@/lib/chart-palette";
import { SectionHead } from "@/components/hc/SectionHead";
import { ScopeNote } from "@/components/ui/ScopeNote";

const rp = (v: number) => `Rp ${v.toLocaleString("id-ID", { minimumFractionDigits: 2 })} T`;

export function SpendByType() {
  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-2.5 pt-3"
      style={{ "--d": "90ms" } as React.CSSProperties}
    >
      <SectionHead title="Belanja per Jenis" action="Lihat Detail" badge={<ScopeNote />} />
      <p className="mt-[3px] text-[9px] text-ink-500">
        Barang · Jasa · Konstruksi (Rp T) · 66.700 PO YTD
      </p>

      <div className="mt-1 min-h-0 w-full flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart margin={{ top: 2, right: 2, bottom: 2, left: 2 }}>
            <Tooltip
              contentStyle={CHART_TOOLTIP_STYLE}
              formatter={(v: number, name: string) => [rp(v), name]}
            />
            <Pie
              data={spendByType}
              dataKey="valueRpT"
              nameKey="jenis"
              innerRadius="56%"
              outerRadius="82%"
              paddingAngle={2}
              stroke="none"
            >
              {spendByType.map((t) => (
                <Cell key={t.jenis} fill={t.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-1 flex flex-col gap-1">
        {spendByType.map((t) => (
          <div key={t.jenis} className="flex items-center justify-between gap-2">
            <span className="flex min-w-0 items-center gap-1.5 text-[8.5px] font-bold text-ink-900">
              <span
                className="h-[7px] w-[7px] shrink-0 rounded-full"
                style={{ backgroundColor: t.color }}
              />
              {t.jenis}
            </span>
            <span className="shrink-0 text-[9px] font-semibold text-ink-500">
              {t.pct.toLocaleString("id-ID", { minimumFractionDigits: 1 })}% ·{" "}
              {t.paket.toLocaleString("id-ID")} paket
            </span>
          </div>
        ))}
      </div>

      <p className="mt-1 pb-1 text-[9px] leading-snug text-ink-500">
        Konstruksi hanya 2.100 paket namun Rp 1,64 T — nilai per paket tertinggi dan paling terpapar
        siklus tender 42 hari.
      </p>
    </div>
  );
}
