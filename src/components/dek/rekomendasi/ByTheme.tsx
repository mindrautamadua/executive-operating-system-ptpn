"use client";

import { useState } from "react";
import { byTheme } from "@/lib/dek-data";
import { DonutChart } from "@/components/ui/DonutChart";
import { SectionHead } from "@/components/hc/SectionHead";
import { ScopeNote } from "@/components/ui/ScopeNote";

const DATA = byTheme.map((t) => ({ name: t.tema, value: t.jumlah, color: t.color }));

/** Komposisi 68 rekomendasi YTD menurut tema pengawasan. */
export function ByTheme() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-3 pt-3"
      style={{ "--d": "120ms" } as React.CSSProperties}
    >
      <SectionHead title="Rekomendasi per Tema" badge={<ScopeNote />} />
      <p className="mt-[3px] text-[9px] text-ink-500">
        Porsi 68 Rekomendasi YTD · Kinerja &amp; Strategi 26,5%
      </p>

      <div className="flex min-h-0 flex-1 items-center gap-3">
        <DonutChart
          data={DATA}
          size={132}
          thickness={22}
          centerValue="68"
          centerCaption="Rekomendasi"
          valueFormatter={(v) => `${v} butir`}
          onHover={setActive}
        />
        <div className="min-w-0 flex-1">
          {byTheme.map((t, i) => (
            <div
              key={t.tema}
              className="flex items-center gap-1.5 py-[3px] transition-opacity"
              style={{ opacity: active === null || active === i ? 1 : 0.4 }}
            >
              <span
                className="h-[8px] w-[8px] shrink-0 rounded-[2px]"
                style={{ backgroundColor: t.color }}
              />
              <span className="min-w-0 flex-1 truncate text-[9px] font-medium text-ink-700">
                {t.tema}
              </span>
              <span className="shrink-0 text-[9.5px] font-bold tabular-nums text-ink-900">
                {t.jumlah}
              </span>
              <span className="w-[36px] shrink-0 text-right text-[9px] tabular-nums text-ink-500">
                {t.porsi}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
