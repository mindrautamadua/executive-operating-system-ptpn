"use client";

import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { localVendorMix } from "@/lib/pgd-data-detail";
import { CHART_TOOLTIP_STYLE } from "@/lib/chart-palette";
import { SectionHead } from "@/components/hc/SectionHead";
import { ScopeNote } from "@/components/ui/ScopeNote";

export function LocalVendorMix() {
  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-2.5 pt-3"
      style={{ "--d": "180ms" } as React.CSSProperties}
    >
      <SectionHead title="Komposisi Vendor Lokal & UMKM" action="Lihat Detail" badge={<ScopeNote />} />
      <p className="mt-[3px] text-[9px] text-ink-500">
        Porsi Jumlah Vendor · lokal &amp; UMKM 64,2% (belanja 26,5%)
      </p>

      <div className="mt-1 min-h-0 w-full flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart margin={{ top: 2, right: 2, bottom: 2, left: 2 }}>
            <Tooltip
              contentStyle={CHART_TOOLTIP_STYLE}
              formatter={(v: number, name: string) => [`${v.toLocaleString("id-ID")} vendor`, name]}
            />
            <Pie isAnimationActive={false}
              data={localVendorMix}
              dataKey="jumlah"
              nameKey="kelompok"
              innerRadius="56%"
              outerRadius="82%"
              paddingAngle={2}
              stroke="none"
            >
              {localVendorMix.map((r) => (
                <Cell key={r.kelompok} fill={r.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-1 flex flex-col gap-[3px]">
        {localVendorMix.map((r) => (
          <div key={r.kelompok} className="flex items-center justify-between gap-2">
            <span className="flex min-w-0 items-center gap-1.5 text-[8.5px] font-bold text-ink-900">
              <span
                className="h-[7px] w-[7px] shrink-0 rounded-full"
                style={{ backgroundColor: r.color }}
              />
              <span className="truncate">{r.kelompok}</span>
            </span>
            <span className="shrink-0 text-[9px] font-semibold text-ink-500">
              {r.jumlahPct.toLocaleString("id-ID", { minimumFractionDigits: 1 })}% jumlah ·{" "}
              {r.valuePct.toLocaleString("id-ID", { minimumFractionDigits: 1 })}% nilai
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
