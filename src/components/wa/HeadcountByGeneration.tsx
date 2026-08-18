"use client";

import { GENERATION_AXIS_MAX, headcountByGeneration } from "@/lib/wa-data";
import { SectionHead } from "../hc/SectionHead";
import { ScopeNote } from "../ui/ScopeNote";

const AXIS_TICKS = [0, 10000, 20000, 30000, 40000];

export function HeadcountByGeneration() {
  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-3 pt-3"
      style={{ "--d": "60ms" } as React.CSSProperties}
    >
      <SectionHead
        title="Headcount by Generation"
        action="Lihat Detail"
        href="/workforce-analytics/headcount-generasi"
        badge={<ScopeNote />}
      />
      <p className="mt-[3px] text-[9px] text-ink-500">Komposisi berdasarkan Generasi</p>

      <div className="mt-2.5 flex min-h-0 flex-1 flex-col justify-center">
        <div className="mb-1.5 flex items-center gap-2 text-[8.5px] font-semibold text-ink-400">
          <span className="w-[128px] shrink-0">Generasi</span>
          <span className="flex-1" />
          <span className="w-[46px] shrink-0 text-right">Jumlah</span>
          <span className="w-[36px] shrink-0 text-right">%</span>
        </div>

        {headcountByGeneration.map((g) => (
          <div key={g.name} className="flex items-center gap-2 py-[7px]">
            <span className="w-[128px] shrink-0 truncate text-[9px] font-medium text-ink-700">
              {g.name}
            </span>
            <div className="h-[11px] flex-1 overflow-hidden rounded-[3px] bg-[#f1f5f9]">
              <div
                className="anim-grow-x h-full rounded-[3px]"
                style={{
                  width: `${(g.value / GENERATION_AXIS_MAX) * 100}%`,
                  backgroundColor: g.color,
                }}
              />
            </div>
            <span className="w-[46px] shrink-0 text-right text-[9.5px] font-bold text-ink-900">
              {g.value.toLocaleString("id-ID")}
            </span>
            <span className="w-[36px] shrink-0 text-right text-[9px] text-ink-500">{g.pct}</span>
          </div>
        ))}

        <div className="mt-1 flex items-center gap-2">
          <span className="w-[128px] shrink-0" />
          <div className="flex flex-1 justify-between text-[9px] text-ink-500">
            {AXIS_TICKS.map((t) => (
              <span key={t}>{t === 0 ? "0" : `${t / 1000}K`}</span>
            ))}
          </div>
          <span className="w-[46px] shrink-0" />
          <span className="w-[36px] shrink-0" />
        </div>
      </div>
    </div>
  );
}
