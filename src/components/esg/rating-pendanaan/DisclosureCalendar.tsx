import { FileText } from "lucide-react";
import { disclosureCalendar } from "@/lib/esg-data-detail";
import type { DisclosureItem } from "@/lib/esg-data-detail";
import { ToneBadge, type BadgeTone } from "@/components/shared/ToneBadge";
import { SectionHead } from "@/components/hc/SectionHead";
import { ScopeNote } from "@/components/ui/ScopeNote";

const STATUS_TONE: Record<DisclosureItem["status"], BadgeTone> = {
  Terbit: "good",
  Disampaikan: "good",
  Berjalan: "info",
  Persiapan: "warn",
};

/** Kalender pelaporan keberlanjutan: GRI, POJK 51, CDP, dan kesiapan CSRD. */
export function DisclosureCalendar() {
  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-3 pt-3"
      style={{ "--d": "60ms" } as React.CSSProperties}
    >
      <SectionHead title="Disclosure Calendar" action="Lihat Semua" badge={<ScopeNote />} />
      <p className="mt-[3px] text-[9px] text-ink-500">
        Kewajiban &amp; Komitmen Pelaporan Keberlanjutan 2026
      </p>

      <div className="mt-2 min-h-0 flex-1 overflow-hidden">
        {disclosureCalendar.map((d) => (
          <div
            key={d.dokumen}
            className="flex items-center gap-2.5 border-b border-[#f5f8fa] py-[8px] last:border-0"
          >
            <span className="flex h-[26px] w-[26px] shrink-0 items-center justify-center rounded-lg bg-[#e8f1fd] text-[#2f6fe4]">
              <FileText size={13} strokeWidth={1.9} />
            </span>
            <div className="min-w-0 flex-1">
              <div className="truncate text-[9.5px] font-bold text-ink-900">{d.dokumen}</div>
              <div className="truncate text-[8.5px] text-ink-500">{d.standar}</div>
            </div>
            <span className="shrink-0 text-[9px] font-semibold text-ink-500">{d.due}</span>
            <ToneBadge label={d.status} tone={STATUS_TONE[d.status]} />
          </div>
        ))}
      </div>
    </div>
  );
}
