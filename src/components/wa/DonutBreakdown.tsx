"use client";

import { useState } from "react";
import { DonutChart } from "../ui/DonutChart";
import { SectionHead } from "../hc/SectionHead";
import { ScopeNote } from "../ui/ScopeNote";
import { orgScope } from "../ui/OrgScope";
import { useSubholding } from "@/components/SubholdingProvider";
import type { DonutRow } from "@/lib/wa-data";

/** Kartu donut + legend (dipakai Headcount by Organization & Employment Type). */
export function DonutBreakdown({
  title,
  subtitle,
  data,
  delay = 0,
  orgDimension = false,
  href,
}: {
  title: string;
  subtitle: string;
  data: DonutRow[];
  delay?: number;
  /** Tujuan tautan "Lihat Detail". */
  href?: string;
  /** true bila `name` tiap baris adalah entitas organisasi (dimensi subholding). */
  orgDimension?: boolean;
}) {
  const [active, setActive] = useState<number | null>(null);
  const { active: scope, isFiltered, def } = useSubholding();

  // Donut pembanding: slice di luar subholding aktif diredupkan agar porsi
  // relatifnya tetap terbaca, dan nilai tengah beralih ke subtotal subholding.
  const scoped = orgDimension && isFiltered;
  const dim = (i: number) => (scoped && orgScope(data[i].name) !== scope ? 0.25 : 1);
  const subtotal = scoped
    ? data.reduce((s, d) => (orgScope(d.name) === scope ? s + d.value : s), 0)
    : 0;

  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-3 pt-3"
      style={{ "--d": `${delay}ms` } as React.CSSProperties}
    >
      <SectionHead
        title={title}
        action="Lihat Detail"
        href={href}
        badge={orgDimension ? undefined : <ScopeNote />}
      />
      <p className="mt-[3px] text-[9px] text-ink-500">{subtitle}</p>

      <div className="flex min-h-0 flex-1 items-center gap-3">
        <DonutChart
          data={data}
          size={148}
          thickness={24}
          centerValue={scoped ? subtotal.toLocaleString("id-ID") : "70.142"}
          centerCaption={scoped ? def.label : "Total"}
          onHover={setActive}
          sliceOpacity={dim}
        />
        <div className="min-w-0 flex-1">
          {data.map((d, i) => (
            <div
              key={d.name}
              className="flex items-center gap-1.5 py-[3px] transition-opacity"
              style={{ opacity: (active === null || active === i ? 1 : 0.4) * dim(i) }}
            >
              <span
                className="h-[8px] w-[8px] shrink-0 rounded-[2px]"
                style={{ backgroundColor: d.color }}
              />
              <span className="min-w-0 flex-1 truncate text-[9.5px] font-medium text-ink-700">
                {d.name}
              </span>
              <span className="shrink-0 text-[9.5px] font-bold text-ink-900">
                {d.value.toLocaleString("id-ID")}
              </span>
              <span className="w-[38px] shrink-0 text-right text-[9px] text-ink-500">
                ({d.pct})
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
