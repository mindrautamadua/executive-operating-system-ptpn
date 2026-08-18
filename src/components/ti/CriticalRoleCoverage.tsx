"use client";

import { tiRoleCoverage, tiCoverageLegend } from "@/lib/ti-data";
import { SectionHead } from "../hc/SectionHead";
import { DonutChart } from "../ui/DonutChart";

export function CriticalRoleCoverage() {
  return (
    <section className="card anim-rise flex flex-col p-3.5" style={{ "--d": "120ms" } as React.CSSProperties}>
      <SectionHead
        title="Critical Role Coverage"
        action="Lihat Detail"
        href="/talent-intelligence/critical-role"
      />
      <p className="mt-[3px] text-[9px] text-ink-500">Coverage Succession Posisi Kritis</p>

      <div className="mt-2 flex flex-1 items-center gap-3">
        <div className="flex shrink-0 flex-col items-center">
          <DonutChart
            data={[
              { name: "Covered", value: 68, color: "#1a9c5b" },
              { name: "Gap", value: 32, color: "#e6ebf0" },
            ]}
            size={118}
            thickness={20}
            centerValue="68%"
            centerCaption="Coverage"
            valueFormatter={(v) => `${v}%`}
          />
          <span className="mt-1 text-center text-[9px] leading-[1.3] text-ink-500">
            (Ready Now &<br />
            1-2 Years)
          </span>
        </div>

        <div className="min-w-0 flex-1">
          <div className="grid grid-cols-[minmax(0,1fr)_52px_86px] items-center pb-1 text-[9px] font-bold uppercase tracking-[0.04em] text-ink-500">
            <span>Posisi Kritis</span>
            <span className="text-right">Total Posisi</span>
            <span className="text-right">Coverage</span>
          </div>
          <ul className="flex flex-col gap-[7px]">
            {tiRoleCoverage.map((r) => (
              <li
                key={r.posisi}
                className="grid grid-cols-[minmax(0,1fr)_52px_86px] items-center"
              >
                <span className="truncate text-[9px] font-semibold text-ink-700">{r.posisi}</span>
                <span className="text-right text-[9px] font-bold text-ink-900">{r.total}</span>
                <span className="flex items-center justify-end gap-1.5">
                  <span className="flex h-[6px] w-[52px] overflow-hidden rounded-full bg-[#eef2f6]">
                    {r.split.map((pct, i) => (
                      <span
                        key={i}
                        className="h-full"
                        style={{ width: `${pct}%`, background: tiCoverageLegend[i].color }}
                      />
                    ))}
                  </span>
                  <span className="w-[26px] text-right text-[8.5px] font-extrabold text-ink-900">
                    {r.coverage}
                  </span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-2.5 flex flex-wrap items-center gap-x-3 gap-y-1 border-t border-[#f4f7f9] pt-2">
        {tiCoverageLegend.map((l) => (
          <span key={l.label} className="flex items-center gap-1.5">
            <span className="h-[7px] w-[7px] rounded-[2px]" style={{ background: l.color }} />
            <span className="text-[9px] font-semibold text-ink-500">{l.label}</span>
          </span>
        ))}
      </div>
    </section>
  );
}
