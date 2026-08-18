"use client";

import { Radar } from "lucide-react";
import { risikoKinerja } from "@/lib/kinerja-data";
import { ScopeNote } from "@/components/ui/ScopeNote";

const TONE = {
  red: {
    wrap: "border-[#f6d5d5] bg-[#fdf5f5]",
    dot: "bg-[#ef4444]",
    value: "text-[#ef4444]",
  },
  amber: {
    wrap: "border-[#f3e3c3] bg-[#fdf9f0]",
    dot: "bg-[#f5a524]",
    value: "text-[#d98b06]",
  },
  yellow: {
    wrap: "border-[#f0ead0] bg-[#fefce8]",
    dot: "bg-[#eab308]",
    value: "text-[#a16207]",
  },
} as const;

/** Radar risiko kinerja: kronis, declining, bias manager, misalignment, no check-in. */
export function RisikoKinerjaRadar() {
  return (
    <div className="card anim-rise px-4 pb-3.5 pt-3" style={{ "--d": "90ms" } as React.CSSProperties}>
      <div className="flex items-center justify-between gap-2">
        <h3 className="flex items-center gap-1.5 text-[10px] font-extrabold uppercase tracking-[0.05em] text-ink-900">
          <Radar size={13} className="text-ptpn-green" />
          Performance Risk Radar
          <ScopeNote />
        </h3>
        <span className="text-[8.5px] font-semibold text-ink-400">
          Basis: 68.142 karyawan dinilai · Q2 2026
        </span>
      </div>

      <div className="mt-2.5 grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-2">
        {risikoKinerja.map((r) => {
          const t = TONE[r.tone];
          return (
            <div key={r.label} className={`rounded-xl border px-3 pb-2.5 pt-2.5 ${t.wrap}`}>
              <div className="flex items-center gap-1.5">
                <span className={`h-[7px] w-[7px] shrink-0 rounded-full ${t.dot}`} />
                <span className="truncate text-[9px] font-bold text-ink-900">{r.label}</span>
              </div>
              <div className={`mt-1.5 text-[15px] font-extrabold leading-none tabular-nums ${t.value}`}>
                {r.value}
              </div>
              <p className="mt-1 text-[8.5px] leading-[1.4] text-ink-500">{r.sub}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
