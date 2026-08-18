"use client";

import { useState } from "react";
import { byType } from "@/lib/asg-data";
import { PALETTE } from "@/lib/chart-palette";
import { DonutChart } from "@/components/ui/DonutChart";
import { SectionHead } from "@/components/hc/SectionHead";
import { ScopeNote } from "@/components/ui/ScopeNote";

const num = (v: number) =>
  v.toLocaleString("id-ID", { minimumFractionDigits: 1, maximumFractionDigits: 1 });

const COLORS = [PALETTE.red, PALETTE.amber, PALETTE.blue, PALETTE.slate];

const data = byType.map((t, i) => ({
  name: t.tipe,
  value: t.luasRbHa,
  color: COLORS[i],
  pct: `${t.pct}%`,
  kasus: t.kasus,
}));

/** Donut komposisi sengketa per tipe (luas rb ha) + jumlah kasus. */
export function SengketaByType() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-3 pt-3"
      style={{ "--d": "60ms" } as React.CSSProperties}
    >
      <SectionHead title="Sengketa per Tipe" action="Lihat Detail" badge={<ScopeNote />} />
      <p className="mt-[3px] text-[9px] text-ink-500">Komposisi Areal Sengketa (rb ha) · 214 kasus</p>

      <div className="flex min-h-0 flex-1 items-center gap-3">
        <DonutChart
          data={data}
          size={132}
          thickness={22}
          centerValue="82,4"
          centerCaption="Rb Ha"
          valueFormatter={(v) => `${num(v)} rb ha`}
          onHover={setActive}
        />
        <div className="min-w-0 flex-1">
          {data.map((d, i) => (
            <div
              key={d.name}
              className="flex items-center gap-1.5 py-[3px] transition-opacity"
              style={{ opacity: active === null || active === i ? 1 : 0.4 }}
            >
              <span
                className="h-[8px] w-[8px] shrink-0 rounded-[2px]"
                style={{ backgroundColor: d.color }}
              />
              <span className="min-w-0 flex-1 truncate text-[9.5px] font-medium text-ink-700">
                {d.name}
              </span>
              <span className="shrink-0 text-[9.5px] font-bold text-ink-900">{num(d.value)}</span>
              <span className="w-[46px] shrink-0 text-right text-[9px] text-ink-500">
                {d.kasus} kss
              </span>
            </div>
          ))}
        </div>
      </div>

      <p className="mt-1 text-[9px] leading-snug text-ink-500">
        Okupasi masyarakat mendominasi 54% luas dan 55% jumlah kasus.
      </p>
    </div>
  );
}
