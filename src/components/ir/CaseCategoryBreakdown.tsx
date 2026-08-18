"use client";

import { useState } from "react";
import { caseCategories } from "@/lib/ir-data";
import { DonutChart } from "../ui/DonutChart";
import { SectionHead } from "../hc/SectionHead";
import { PanelFooterLink } from "./PanelFooterLink";

export function CaseCategoryBreakdown() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-3 pt-3"
      style={{ "--d": "60ms" } as React.CSSProperties}
    >
      <SectionHead title="Sebaran Kasus Berdasarkan Kategori" />

      <div className="flex min-h-0 flex-1 items-center gap-3">
        <DonutChart
          data={caseCategories}
          size={150}
          thickness={25}
          centerValue="24"
          centerCaption="Kasus Aktif"
          onHover={setActive}
        />
        <div className="min-w-0 flex-1">
          {caseCategories.map((c, i) => (
            <div
              key={c.name}
              className="flex items-center gap-1.5 py-[4px] transition-opacity"
              style={{ opacity: active === null || active === i ? 1 : 0.4 }}
            >
              <span
                className="h-[8px] w-[8px] shrink-0 rounded-[2px]"
                style={{ backgroundColor: c.color }}
              />
              <span className="min-w-0 flex-1 truncate text-[9.5px] font-medium text-ink-700">
                {c.name}
              </span>
              <span className="shrink-0 text-[9.5px] font-bold text-ink-900">{c.value}</span>
              <span className="w-[42px] shrink-0 text-right text-[9px] text-ink-500">
                ({c.pct})
              </span>
            </div>
          ))}
        </div>
      </div>

      <PanelFooterLink label="Lihat Detail Kasus" />
    </div>
  );
}
