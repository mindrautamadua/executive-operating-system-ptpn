"use client";

import { RefreshCcw } from "lucide-react";
import { continuousPerformance, feedbackFrequency } from "@/lib/kinerja-data";
import { ScopeNote } from "@/components/ui/ScopeNote";

/** KPI ritme continuous performance: check-in, 1:1, goal update, coaching. */
export function ContinuousPerformance() {
  return (
    <div className="card anim-rise flex h-full flex-col px-4 pb-2.5 pt-3">
      <div className="flex items-start justify-between gap-2">
        <div>
          <h3 className="card-title-navy flex min-w-0 items-center gap-1.5"><span>CONTINUOUS PERFORMANCE</span><ScopeNote /></h3>
          <p className="mt-[3px] text-[9.5px] text-ink-500">
            Ritme Goal → Check-in → Feedback → Coaching
          </p>
        </div>
        <RefreshCcw size={14} className="shrink-0 text-ptpn-green" />
      </div>

      <div className="mt-2 flex min-h-0 flex-1 flex-col justify-around">
        {continuousPerformance.map((c, i) => {
          const belowTarget = c.pct < c.target;
          return (
            <div key={c.label} className="flex items-center gap-2">
              <span className="w-[128px] shrink-0 truncate text-[9.5px] text-ink-700">
                {c.label}
              </span>
              <div className="relative h-[7px] flex-1 overflow-visible rounded-full bg-[#f1f5f8]">
                <div
                  className={`anim-grow-x h-full rounded-full ${
                    belowTarget
                      ? "bg-[#f5a524]"
                      : "bg-gradient-to-r from-[#7ed957] to-[#22a45d]"
                  }`}
                  style={{ width: `${c.pct}%`, "--d": `${i * 60}ms` } as React.CSSProperties}
                />
                <span
                  className="absolute -top-[2px] h-[11px] w-[2px] rounded bg-ink-400"
                  style={{ left: `${c.target}%` }}
                  title={`Target ${c.target}%`}
                />
              </div>
              <span className="w-[28px] shrink-0 text-right text-[9.5px] font-bold tabular-nums text-ink-900">
                {c.value}
              </span>
              <span className="w-[42px] shrink-0 text-right text-[8.5px] tabular-nums text-ink-400">
                tgt {c.target}%
              </span>
            </div>
          );
        })}
      </div>

      <div className="mt-1.5 flex items-center justify-between border-t border-[#f0f3f6] pt-1.5">
        <span className="text-[8.5px] text-ink-500">
          Feedback Frequency{" "}
          <span className="font-extrabold tabular-nums text-ptpn-green">
            {feedbackFrequency.value}
          </span>{" "}
          <span className="text-ink-400">{feedbackFrequency.sub}</span>
        </span>
        <span className="text-[9px] text-ink-500">4.321 karyawan tanpa check-in 90 hari</span>
      </div>
    </div>
  );
}
