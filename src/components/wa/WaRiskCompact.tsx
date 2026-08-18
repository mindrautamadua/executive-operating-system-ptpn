"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { waRisks, waRiskScore } from "@/lib/wa-data";
import { ScopeNote } from "../ui/ScopeNote";

const TONE = {
  red: { dot: "bg-[#ef4444]", value: "text-[#ef4444]" },
  amber: { dot: "bg-[#f5a524]", value: "text-[#d98b06]" },
  yellow: { dot: "bg-[#eab308]", value: "text-[#a16207]" },
} as const;

/** Radar ringkas risiko workforce; analisis penuh di People Risk Radar. */
export function WaRiskCompact() {
  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-3 pt-3"
      style={{ "--d": "60ms" } as React.CSSProperties}
    >
      <div className="flex items-center justify-between gap-2">
        <h3 className="flex min-w-0 items-center gap-1.5 text-[10px] font-extrabold uppercase tracking-[0.05em] text-ink-900">
          <span>
            Workforce Risk Radar
          </span>
          <ScopeNote />
        </h3>
        <div className="flex items-center gap-2.5">
          <span className="rounded bg-[#fdf3e0] px-2 py-[3px] text-[9px] font-bold text-[#d98b06]">
            Risk Score {waRiskScore.value} · {waRiskScore.kategori}
          </span>
          <Link
            href="/people-risk-radar"
            className="flex shrink-0 items-center gap-1 text-[9.5px] font-semibold text-ptpn-green hover:underline"
          >
            Lihat Detail <ArrowRight size={11} />
          </Link>
        </div>
      </div>

      <div className="mt-2 grid min-h-0 flex-1 grid-cols-3 grid-rows-2 gap-2">
        {waRisks.map((r) => {
          const t = TONE[r.tone];
          return (
            <div key={r.label} className="rounded-xl bg-[#f8fafc] px-2.5 py-2">
              <div className="flex items-center gap-1.5">
                <span className={`h-[7px] w-[7px] shrink-0 rounded-full ${t.dot}`} />
                <span className="truncate text-[8.5px] font-bold text-ink-700">{r.label}</span>
              </div>
              <div className={`mt-1 text-[15px] font-extrabold leading-none ${t.value}`}>
                {r.value}
              </div>
              <div className="mt-[3px] truncate text-[9px] leading-snug text-ink-500">{r.sub}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
