import { stgAlignment } from "@/lib/stg-data";
import type { InitiativeStatus } from "@/lib/stg-core";
import { SectionHead } from "@/components/hc/SectionHead";
import { ScopeNote } from "@/components/ui/ScopeNote";
import { ToneBadge, type BadgeTone } from "@/components/shared/ToneBadge";

const STATUS_TONE: Record<InitiativeStatus, BadgeTone> = {
  "On Track": "good",
  "At Risk": "warn",
  "Off Track": "bad",
};

const BAR_CLS: Record<InitiativeStatus, string> = {
  "On Track": "bg-ptpn-green",
  "At Risk": "bg-[#f5a524]",
  "Off Track": "bg-[#ef4444]",
};

/** 5 sasaran strategis RJPP 2025-2029 dan progres pencapaiannya. */
export function StgStrategicAlignment() {
  return (
    <div className="card anim-rise px-4 pb-3.5 pt-3" style={{ "--d": "60ms" } as React.CSSProperties}>
      <SectionHead title="Strategic Alignment" action="Lihat Detail" badge={<ScopeNote />} />
      <p className="mt-[3px] text-[9px] text-ink-500">5 Sasaran Strategis RJPP 2025-2029</p>

      <ul className="mt-2 flex flex-col gap-1.5">
        {stgAlignment.map((g) => (
          <li key={g.goal} className="rounded-lg border border-[#eef2f6] bg-[#fbfcfd] px-2.5 py-2">
            <div className="flex items-start justify-between gap-2">
              <span className="min-w-0 text-[9.5px] font-bold leading-snug text-ink-900">
                {g.goal}
              </span>
              <ToneBadge label={g.status} tone={STATUS_TONE[g.status]} />
            </div>
            <p className="mt-[3px] truncate text-[9px] text-ink-500" title={g.measure}>
              {g.measure}
            </p>
            <div className="mt-1.5 flex items-center gap-1.5">
              <span className="h-[6px] min-w-0 flex-1 overflow-hidden rounded-full bg-[#eef2f6]">
                <span
                  className={`block h-full rounded-full ${BAR_CLS[g.status]}`}
                  style={{ width: `${g.progress}%` }}
                />
              </span>
              <span className="w-[28px] shrink-0 text-right text-[9px] font-extrabold text-ink-900">
                {g.progress}%
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
