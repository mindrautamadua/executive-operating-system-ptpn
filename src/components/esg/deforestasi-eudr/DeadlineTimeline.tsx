import { CheckCircle2, CircleDot, Clock3 } from "lucide-react";
import { deadlineTimeline } from "@/lib/esg-data-detail";
import type { EudrMilestone } from "@/lib/esg-data-detail";
import { ToneBadge, type BadgeTone } from "@/components/shared/ToneBadge";
import { SectionHead } from "@/components/hc/SectionHead";
import { ScopeNote } from "@/components/ui/ScopeNote";

const STATUS: Record<
  EudrMilestone["status"],
  { icon: typeof CheckCircle2; cls: string; tone: BadgeTone }
> = {
  Selesai: { icon: CheckCircle2, cls: "text-ptpn-green", tone: "good" },
  Berlaku: { icon: CircleDot, cls: "text-[#ef4444]", tone: "bad" },
  Mendatang: { icon: Clock3, cls: "text-[#d98b06]", tone: "warn" },
};

/** Timeline milestone regulasi EUDR dan target internal PTPN. */
export function DeadlineTimeline() {
  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-3 pt-3"
      style={{ "--d": "60ms" } as React.CSSProperties}
    >
      <SectionHead title="Timeline Tenggat EUDR" action="Lihat Detail" badge={<ScopeNote />} />
      <p className="mt-[3px] text-[9px] text-ink-500">
        Milestone Regulasi &amp; Target Internal Kesiapan Dosier
      </p>

      <div className="mt-3 grid min-h-0 flex-1 grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-3">
        {deadlineTimeline.map((m) => {
          const s = STATUS[m.status];
          const Icon = s.icon;
          return (
            <div key={m.tanggal} className="relative flex min-w-0 flex-col">
              <div className="flex items-center gap-1.5">
                <Icon size={13} className={`shrink-0 ${s.cls}`} />
                <span className="h-[2px] flex-1 rounded-full bg-[#eef2f6]" />
              </div>
              <div className="mt-2 text-[9.5px] font-extrabold text-ink-900">{m.tanggal}</div>
              <p className="mt-[3px] text-[8.5px] leading-snug text-ink-500">{m.milestone}</p>
              <div className="mt-auto pt-2">
                <ToneBadge label={m.status} tone={s.tone} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
