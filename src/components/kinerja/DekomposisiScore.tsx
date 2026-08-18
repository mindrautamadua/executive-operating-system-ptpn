"use client";

import { Sigma } from "lucide-react";
import { komponenScore, overallScore, scoreDriver } from "@/lib/kinerja-data";
import { ScopeNote } from "@/components/ui/ScopeNote";

/** "Why 87,6?" — formula SMK: Job 45% + Behavior 25% + Corporate 30% = Overall. */
export function DekomposisiScore() {
  return (
    <div className="card anim-rise flex h-full flex-col px-4 pb-2.5 pt-3">
      <div className="flex items-start justify-between gap-2">
        <div>
          <h3 className="card-title-navy flex min-w-0 items-center gap-1.5"><span>SCORE DECOMPOSITION</span><ScopeNote /></h3>
          <p className="mt-[3px] text-[9.5px] text-ink-500">
            Job 45% + Behavior 25% + Corporate 30% = Overall
          </p>
        </div>
        <Sigma size={14} className="shrink-0 text-ptpn-green" />
      </div>

      <div className="mt-2 flex min-h-0 flex-1 flex-col justify-around">
        {komponenScore.map((k, i) => (
          <div key={k.label} className="flex items-center gap-2">
            <span className="w-[92px] shrink-0 truncate text-[9.5px] text-ink-700">{k.label}</span>
            <span className="w-[30px] shrink-0 rounded bg-[#f1f5f8] px-1 py-[1px] text-center text-[8.5px] font-bold tabular-nums text-ink-500">
              {k.bobot}
            </span>
            <div className="h-[7px] flex-1 overflow-hidden rounded-full bg-[#f1f5f8]">
              <div
                className="anim-grow-x h-full rounded-full"
                style={{
                  width: `${k.scorePct}%`,
                  backgroundColor: k.color,
                  "--d": `${i * 60}ms`,
                } as React.CSSProperties}
              />
            </div>
            <span className="w-[26px] shrink-0 text-right text-[9.5px] font-bold tabular-nums text-ink-900">
              {k.score}
            </span>
            <span className="w-[34px] shrink-0 text-right text-[8.5px] font-semibold tabular-nums text-ink-400">
              {k.kontribusi}
            </span>
          </div>
        ))}

        <div className="flex items-center justify-between rounded-lg bg-ptpn-greenLight px-3 py-[6px]">
          <span className="text-[9.5px] font-bold text-ink-900">Overall Score</span>
          <span className="text-[13px] font-extrabold tabular-nums text-ptpn-green">
            {overallScore}
          </span>
        </div>
      </div>

      <div className="mt-1.5 border-t border-[#f0f3f6] pt-1.5">
        <span className="text-[9px] font-bold uppercase tracking-[0.04em] text-ink-500">
          Penyusun kenaikan +4,8 pts vs Q1 2026
        </span>
        <div className="mt-1 flex items-center gap-1.5">
          {scoreDriver.map((d) => (
            <span
              key={d.label}
              className="rounded bg-[#f1f5f8] px-1.5 py-[2px] text-[8.5px] text-ink-700"
            >
              {d.label} <span className="font-bold text-ptpn-green">{d.value}</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
