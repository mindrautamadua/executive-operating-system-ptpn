"use client";

import { ArrowLeftRight, Trophy } from "lucide-react";
import { BENCHMARK_MAX, benchmarkEksternal, benchmarkMeta } from "@/lib/produktivitas-data";
import { ScopeNote } from "../ui/ScopeNote";

const BAR_COLOR = {
  green: "#1a9c5b",
  slate: "#cbd5e1",
  greenDark: "#0f7a44",
} as const;

export function BenchmarkingEksternal() {
  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-3 pt-3"
      style={{ "--d": "480ms" } as React.CSSProperties}
    >
      <h3 className="card-title-navy flex min-w-0 items-center gap-1.5">
        <span>8. Benchmarking Eksternal</span>
        <ScopeNote />
      </h3>
      <p className="mt-[3px] text-[9.5px] text-ink-500">
        Perbandingan dengan Industri Sejenis (2025)
      </p>

      <div className="mt-2 flex min-h-0 flex-1 items-stretch gap-4">
        <div className="flex min-w-0 flex-1 flex-col justify-around">
          {benchmarkEksternal.map((b) => (
            <div key={b.label} className="flex items-center gap-2.5">
              <span className="w-[132px] shrink-0 text-[9px] font-semibold leading-tight text-ink-700">
                {b.label}
              </span>
              <span className="w-7 shrink-0 text-[10.5px] font-bold tabular-nums text-ink-900">
                {b.value}
              </span>
              <span className="h-[8px] min-w-0 flex-1 overflow-hidden rounded-full bg-[#eef2f6]">
                <span
                  className="block h-full rounded-full"
                  style={{
                    width: `${(b.value / BENCHMARK_MAX) * 100}%`,
                    background: BAR_COLOR[b.bar],
                  }}
                />
              </span>
              <ArrowLeftRight size={11} className="shrink-0 text-ink-400" />
            </div>
          ))}
        </div>

        <div className="flex w-[220px] shrink-0 items-center gap-3 rounded-lg bg-[#f2faf5] px-3.5 py-3">
          <div className="min-w-0">
            <div className="text-[9px] font-semibold text-ink-500">Posisi PTPN Group</div>
            <div className="mt-[3px] text-[13px] font-extrabold leading-tight text-ptpn-greenDark">
              Di Atas Rata-rata Industri
            </div>
            <p className="mt-1.5 text-[8.5px] leading-[1.45] text-ink-600">
              Produktivitas kita 12% lebih tinggi daripada rata-rata industri nasional.
            </p>
          </div>
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-ptpn-green text-white">
            <Trophy size={18} strokeWidth={1.9} />
          </span>
        </div>
      </div>

      <p className="mt-1.5 border-t border-[var(--border-line)] pt-1.5 text-[9px] leading-[1.4] text-ink-500">
        {benchmarkMeta.definisi} {benchmarkMeta.sumber}
      </p>
    </div>
  );
}
