import { Users } from "lucide-react";
import { managerClusters, managerSummary } from "@/lib/engagement-data";

/**
 * Manager Engagement Intelligence: manajer menyumbang mayoritas varians
 * engagement level tim (Gallup ~70%). Cluster effectiveness untuk manager
 * enablement — bukan penalti, tapi target coaching.
 */
export function ManagerIntelligence() {
  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-2.5 pt-3"
      style={{ "--d": "160ms" } as React.CSSProperties}
    >
      <div className="flex items-start justify-between gap-2">
        <h3 className="card-title-navy flex items-center gap-1.5">
          <Users size={13} className="text-[#1b3a6b]" />
          Manager Engagement Intelligence
        </h3>
        <span className="shrink-0 text-[8.5px] text-ink-400">
          Manajer ≈ 70% varians engagement tim
        </span>
      </div>

      <div className="mt-2 grid grid-cols-4 gap-2">
        {managerSummary.map((s) => (
          <div
            key={s.label}
            className="flex min-w-0 flex-col rounded-xl border border-[#eef2f6] px-2.5 py-1.5"
          >
            <span className="truncate text-[9px] font-semibold text-ink-500">{s.label}</span>
            <span className="mt-[2px] text-[15px] font-extrabold leading-none tabular-nums text-ink-900">
              {s.value}
            </span>
            <span className="mt-[3px] truncate text-[7.5px] text-ink-400">{s.sub}</span>
          </div>
        ))}
      </div>

      <div className="mt-2 grid grid-cols-[minmax(0,1fr)_88px_92px_72px] gap-x-2 text-[9px] font-bold text-ink-500">
        <span>Cluster Manajer</span>
        <span className="text-right">Team Engmt</span>
        <span className="text-right">Effectiveness</span>
        <span className="text-center">Status</span>
      </div>

      <div className="mt-1 flex min-h-0 flex-1 flex-col justify-between">
        {managerClusters.map((c) => (
          <div
            key={c.cluster}
            className="grid grid-cols-[minmax(0,1fr)_88px_92px_72px] items-center gap-x-2"
          >
            <span className="truncate text-[9.5px] font-semibold text-ink-900">{c.cluster}</span>
            <span className="text-right text-[9.5px] font-extrabold tabular-nums text-ink-900">
              {c.teamEngagement}
            </span>
            <span className="text-right text-[9.5px] font-semibold tabular-nums text-ink-700">
              {c.effectiveness}
            </span>
            <span
              className={`tone-${c.tone} justify-self-center rounded px-1.5 py-[2px] text-[7.5px] font-bold leading-none`}
            >
              {c.status}
            </span>
          </div>
        ))}
      </div>

      <p className="mt-1.5 border-t border-[#eef2f6] pt-1.5 text-[8.5px] leading-snug text-ink-500">
        Top 10% manajer menghasilkan team engagement{" "}
        <span className="font-bold text-ink-700">+27 pts</span> lebih tinggi dari bottom 10% —
        fokus enablement, bukan penalti.
      </p>
    </div>
  );
}
