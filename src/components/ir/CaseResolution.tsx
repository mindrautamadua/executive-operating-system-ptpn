"use client";

import { useState } from "react";
import { caseResolution } from "@/lib/ir-data";
import { caseResolutionBasis } from "@/lib/ir-intel-data";
import { DonutChart } from "../ui/DonutChart";
import { SectionHead } from "../hc/SectionHead";
import { PanelFooterLink } from "./PanelFooterLink";

export function CaseResolution() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-3 pt-3"
      style={{ "--d": "60ms" } as React.CSSProperties}
    >
      <SectionHead title="Penyelesaian Kasus" />

      <div className="flex min-h-0 flex-1 items-center gap-3">
        <DonutChart
          data={caseResolution}
          size={150}
          thickness={25}
          centerValue="91%"
          centerCaption="Tingkat Penyelesaian"
          onHover={setActive}
        />
        <div className="min-w-0 flex-1">
          {caseResolution.map((s, i) => (
            <div
              key={s.name}
              className="flex items-center gap-1.5 py-[5px] transition-opacity"
              style={{ opacity: active === null || active === i ? 1 : 0.4 }}
            >
              <span
                className="h-[8px] w-[8px] shrink-0 rounded-[2px]"
                style={{ backgroundColor: s.color }}
              />
              <span className="min-w-0 flex-1 truncate text-[9.5px] font-medium text-ink-700">
                {s.name}
              </span>
              <span className="shrink-0 text-[9.5px] font-bold text-ink-900">{s.value}</span>
              <span className="w-[38px] shrink-0 text-right text-[9px] text-ink-500">
                ({s.pct})
              </span>
            </div>
          ))}
        </div>
      </div>

      <p className="text-[7.5px] leading-[1.35] text-ink-400">{caseResolutionBasis}</p>

      <PanelFooterLink label="Lihat Detail Penyelesaian" />
    </div>
  );
}
