import { CircleAlert, Workflow } from "lucide-react";
import { actionEngine, actionExpectedImpact } from "@/lib/engagement-data";

/**
 * Engagement → Action Engine: issue → evidence → akar masalah → aksi →
 * owner → target → status. Closed-loop: survey tanpa follow-through
 * menurunkan trust pada survey berikutnya.
 */
export function EngagementActionEngine() {
  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-3 pt-3"
      style={{ "--d": "560ms" } as React.CSSProperties}
    >
      <div className="flex items-start justify-between gap-2">
        <h3 className="card-title-navy flex items-center gap-1.5">
          <Workflow size={13} className="text-[#1b3a6b]" />
          Engagement Action Engine
        </h3>
        <span className="shrink-0 text-[9px] font-semibold text-ink-500">
          Expected impact: {actionExpectedImpact}
        </span>
      </div>

      <div className="mt-2.5 grid min-h-0 flex-1 grid-cols-3 gap-2.5">
        {actionEngine.map((a) => (
          <div
            key={a.issue}
            className="flex min-w-0 flex-col rounded-xl border border-[#eef2f6] px-3 py-2"
            style={{
              borderTop: `3px solid ${a.severity === "red" ? "#dc2626" : "#f59e0b"}`,
            }}
          >
            <div className="flex items-center justify-between gap-1.5">
              <span className="flex min-w-0 items-center gap-1.5">
                <CircleAlert
                  size={11}
                  className={`shrink-0 ${a.severity === "red" ? "text-[#dc2626]" : "text-[#d98b06]"}`}
                />
                <span className="truncate text-[9.5px] font-extrabold text-ink-900">
                  {a.issue}
                </span>
              </span>
              <span className="shrink-0 text-[10px] font-extrabold tabular-nums text-ink-900">
                {a.skor}
              </span>
            </div>

            <p className="mt-1 text-[7.5px] leading-snug text-ink-600">
              <span className="font-bold text-ink-700">Evidence:</span> {a.evidence}
            </p>

            <ul className="mt-1 flex flex-col gap-[2px]">
              <li className="flex justify-between gap-2 text-[7.5px]">
                <span className="shrink-0 font-semibold text-ink-500">Terdampak</span>
                <span className="min-w-0 truncate text-right font-bold text-ink-900">
                  {a.affected}
                </span>
              </li>
              <li className="flex justify-between gap-2 text-[7.5px]">
                <span className="shrink-0 font-semibold text-ink-500">Akar masalah</span>
                <span className="min-w-0 truncate text-right font-bold text-ink-900">
                  {a.rootCause}
                </span>
              </li>
              <li className="flex justify-between gap-2 text-[7.5px]">
                <span className="shrink-0 font-semibold text-ink-500">Owner</span>
                <span className="min-w-0 truncate text-right font-bold text-ink-900">
                  {a.owner}
                </span>
              </li>
              <li className="flex justify-between gap-2 text-[7.5px]">
                <span className="shrink-0 font-semibold text-ink-500">Target</span>
                <span className="min-w-0 truncate text-right font-bold text-ink-900">
                  {a.target}
                </span>
              </li>
            </ul>

            <div className="mt-auto flex items-center justify-between gap-2 border-t border-[#eef2f6] pt-1.5">
              <span className="min-w-0 truncate text-[7.5px] font-semibold text-ink-600">
                {a.action}
              </span>
              <span
                className={`tone-${a.statusTone} shrink-0 rounded px-1.5 py-[2px] text-[9px] font-bold leading-none`}
              >
                {a.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
