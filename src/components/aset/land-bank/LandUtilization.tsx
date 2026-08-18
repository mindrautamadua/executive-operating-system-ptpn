"use client";

import { useState } from "react";
import { landUtilization } from "@/lib/alb-data";
import { PALETTE } from "@/lib/chart-palette";
import { DonutChart } from "@/components/ui/DonutChart";
import { SectionHead } from "@/components/hc/SectionHead";
import { ScopeNote } from "@/components/ui/ScopeNote";

const num = (v: number) =>
  v.toLocaleString("id-ID", { minimumFractionDigits: 1, maximumFractionDigits: 1 });

const COLORS = [PALETTE.green, PALETTE.greenSoft, PALETTE.blue, PALETTE.red];

const data = landUtilization.map((s, i) => ({
  name: s.kategori,
  value: s.luasRbHa,
  color: COLORS[i],
  pct: `${s.pct}%`,
}));

/** Donut utilisasi lahan: produktif, TBM, cadangan, okupasi & idle. */
export function LandUtilization() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-3 pt-3"
      style={{ "--d": "150ms" } as React.CSSProperties}
    >
      <SectionHead title="Utilisasi Lahan" action="Lihat Detail" badge={<ScopeNote />} />
      <p className="mt-[3px] text-[9px] text-ink-500">Penggunaan Fisik Land Bank (rb ha)</p>

      <div className="flex min-h-0 flex-1 items-center gap-3">
        <DonutChart
          data={data}
          size={132}
          thickness={22}
          centerValue="1.081"
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
              <span className="w-[34px] shrink-0 text-right text-[9px] text-ink-500">({d.pct})</span>
            </div>
          ))}
        </div>
      </div>

      <p className="mt-1 text-[9px] leading-snug text-ink-500">
        Okupasi &amp; idle 75,7 rb ha (7%) menjadi target utama program optimalisasi aset.
      </p>
    </div>
  );
}
