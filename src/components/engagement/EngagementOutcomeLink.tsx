import Link from "next/link";
import { ArrowRight, GitCompareArrows } from "lucide-react";
import { outcomeClusters, outcomeHighlights } from "@/lib/engagement-data";

/**
 * Engagement → Business Outcome: turnover, performa, dan produktivitas per
 * cluster engagement. Asosiasi (bukan kausalitas) — mengubah survey report
 * menjadi people risk & business intelligence.
 */
export function EngagementOutcomeLink() {
  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-2.5 pt-3"
      style={{ "--d": "240ms" } as React.CSSProperties}
    >
      <div className="flex items-start justify-between gap-2">
        <h3 className="card-title-navy flex items-center gap-1.5">
          <GitCompareArrows size={13} className="text-[#1b3a6b]" />
          Engagement → Retention · Performa · Produktivitas
        </h3>
        <span className="shrink-0 rounded px-1.5 py-[2px] text-[7.5px] font-bold leading-none tone-slate">
          Asosiasi, bukan kausalitas
        </span>
      </div>

      <div className="mt-2 grid min-h-0 flex-1 grid-cols-3 gap-2">
        {outcomeClusters.map((c) => (
          <div
            key={c.cluster}
            className="flex min-w-0 flex-col rounded-xl border border-[#eef2f6] px-2.5 py-2"
            style={{ borderTop: `3px solid ${c.color}` }}
          >
            <div className="flex items-center justify-between gap-1">
              <span className="truncate text-[9px] font-extrabold text-ink-900">{c.cluster}</span>
              <span
                className={`tone-${c.tone} shrink-0 rounded px-1.5 py-[2px] text-[9px] font-bold leading-none`}
              >
                {c.populasi}
              </span>
            </div>
            <span className="mt-[2px] text-[7.5px] text-ink-400">{c.range} · porsi populasi</span>
            <ul className="mt-auto flex flex-col gap-[3px] pt-1.5">
              <li className="flex justify-between text-[9px]">
                <span className="font-semibold text-ink-500">Turnover</span>
                <span className="font-extrabold tabular-nums text-ink-900">{c.turnover}</span>
              </li>
              <li className="flex justify-between text-[9px]">
                <span className="font-semibold text-ink-500">Avg performa</span>
                <span className="font-extrabold tabular-nums text-ink-900">{c.performa}</span>
              </li>
              <li className="flex justify-between text-[9px]">
                <span className="font-semibold text-ink-500">Produktivitas</span>
                <span className="font-extrabold tabular-nums text-ink-900">{c.produktivitas}</span>
              </li>
            </ul>
          </div>
        ))}
      </div>

      <div className="mt-2 grid grid-cols-3 gap-2 border-t border-[#eef2f6] pt-1.5">
        {outcomeHighlights.map((h) => (
          <div key={h.label} className="min-w-0">
            <span className="block truncate text-[7.5px] font-semibold text-ink-500">
              {h.label}
            </span>
            <span className="text-[11px] font-extrabold tabular-nums text-ink-900">{h.value}</span>
            <span className="ml-1 text-[7.5px] text-ink-400">{h.sub}</span>
          </div>
        ))}
      </div>

      <Link
        href="/people-risk-radar"
        className="link-more mt-1.5 flex items-center gap-1 self-start"
      >
        Lihat People Risk Radar <ArrowRight size={11} />
      </Link>
    </div>
  );
}
