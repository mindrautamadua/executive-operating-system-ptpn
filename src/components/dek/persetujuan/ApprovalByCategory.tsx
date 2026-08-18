"use client";

import { useState } from "react";
import { approvalByCategory } from "@/lib/dek-data-detail";
import { DonutChart } from "@/components/ui/DonutChart";
import { SectionHead } from "@/components/hc/SectionHead";
import { ScopeNote } from "@/components/ui/ScopeNote";

/** Komposisi 22 permohonan persetujuan menurut kategori aksi korporasi. */
export function ApprovalByCategory() {
  const [active, setActive] = useState<number | null>(null);
  const data = approvalByCategory.map((d) => ({
    name: d.kategori,
    value: d.jumlah,
    color: d.color,
  }));

  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-3 pt-3"
      style={{ "--d": "300ms" } as React.CSSProperties}
    >
      <SectionHead title="Permohonan per Kategori" badge={<ScopeNote />} />
      <p className="mt-[3px] text-[9px] text-ink-500">
        22 Permohonan YTD · Nilai Terkonsentrasi pada Pendanaan &amp; Keuangan
      </p>

      <div className="flex min-h-0 flex-1 items-center gap-3">
        <DonutChart
          data={data}
          size={138}
          thickness={23}
          centerValue="22"
          centerCaption="Permohonan"
          valueFormatter={(v) => `${v} permohonan`}
          onHover={setActive}
        />
        <div className="min-w-0 flex-1">
          {approvalByCategory.map((d, i) => (
            <div
              key={d.kategori}
              className="flex items-center gap-1.5 py-[3px] transition-opacity"
              style={{ opacity: active === null || active === i ? 1 : 0.4 }}
            >
              <span
                className="h-[8px] w-[8px] shrink-0 rounded-[2px]"
                style={{ backgroundColor: d.color }}
              />
              <span className="min-w-0 flex-1 truncate text-[9px] font-medium text-ink-700">
                {d.kategori}
              </span>
              <span className="shrink-0 text-[9.5px] font-bold tabular-nums text-ink-900">
                {d.jumlah}
              </span>
              <span className="w-[38px] shrink-0 text-right text-[9px] tabular-nums text-ink-500">
                {d.porsi}
              </span>
              <span className="w-[52px] shrink-0 text-right text-[8.5px] tabular-nums text-ink-500">
                {d.nilaiAgregat}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
