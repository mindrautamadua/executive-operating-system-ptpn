"use client";

import { useState } from "react";
import { fundingMix } from "@/lib/kcx-data";
import { fmtId, fmtRpT } from "@/lib/keu-core";
import { DonutChart } from "@/components/ui/DonutChart";
import { SectionHead } from "@/components/hc/SectionHead";
import { ScopeNote } from "@/components/ui/ScopeNote";

const donutData = fundingMix.map((f) => ({ name: f.name, value: f.pct, color: f.color }));

export function FundingMix() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-3 pt-3"
      style={{ "--d": "180ms" } as React.CSSProperties}
    >
      <SectionHead title="Funding Mix" badge={<ScopeNote />} />
      <p className="mt-[3px] text-[9px] text-ink-500">Sumber Pendanaan Capex RKAP FY 2026</p>

      <div className="flex min-h-0 flex-1 items-center gap-3">
        <DonutChart
          data={donutData}
          size={136}
          thickness={22}
          centerValue="9,6"
          centerCaption="Rp T RKAP"
          valueFormatter={(v) => `${fmtId(v, 0)}%`}
          onHover={setActive}
        />
        <div className="min-w-0 flex-1">
          {fundingMix.map((f, i) => (
            <div
              key={f.name}
              className="flex items-center gap-1.5 py-[4px] transition-opacity"
              style={{ opacity: active === null || active === i ? 1 : 0.4 }}
            >
              <span
                className="h-[8px] w-[8px] shrink-0 rounded-[2px]"
                style={{ backgroundColor: f.color }}
              />
              <span className="min-w-0 flex-1 truncate text-[9px] font-medium text-ink-700">
                {f.name}
              </span>
              <span className="shrink-0 text-[9.5px] font-bold text-ink-900">
                {fmtRpT(f.valueRpT, 1)}
              </span>
              <span className="w-[30px] shrink-0 text-right text-[9px] text-ink-500">
                {fmtId(f.pct, 0)}%
              </span>
            </div>
          ))}
          <p className="mt-1.5 text-[9px] leading-snug text-ink-500">
            Penarikan pinjaman capex baru 40% dari plafon; kas internal menopang 58% kebutuhan.
          </p>
        </div>
      </div>
    </div>
  );
}
