import { AlertOctagon, ArrowUpRight } from "lucide-react";
import { breachLog, type BreachLogRow } from "@/lib/risk-data";
import { SectionHead } from "@/components/hc/SectionHead";
import { ScopeNote } from "@/components/ui/ScopeNote";
import { ToneBadge, type BadgeTone } from "@/components/shared/ToneBadge";

const ESKALASI_TONE: Record<BreachLogRow["eskalasi"], BadgeTone> = {
  "Komite Risiko": "bad",
  Direksi: "warn",
  Unit: "info",
};

/** 4 limit breach aktif beserta deviasi, tindak lanjut, dan tingkat eskalasi. */
export function BreachLog() {
  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-3 pt-3"
      style={{ "--d": "120ms" } as React.CSSProperties}
    >
      <SectionHead title="Breach Log" action="Lihat Riwayat" badge={<ScopeNote />} />
      <p className="mt-[3px] text-[9px] text-ink-500">
        4 Limit Terlampaui — 2 Telah Melewati SLA Remediasi 60 Hari
      </p>

      <div className="mt-2 grid min-h-0 flex-1 grid-cols-2 grid-rows-2 gap-2">
        {breachLog.map((b) => (
          <div
            key={b.limit}
            className="flex min-h-0 flex-col rounded-xl border border-[#f6d5d5] bg-[#fdf5f5] px-2.5 pb-2 pt-2"
          >
            <div className="flex items-start justify-between gap-1.5">
              <span className="flex min-w-0 items-center gap-1.5">
                <AlertOctagon size={12} className="shrink-0 text-[#ef4444]" />
                <span className="truncate text-[9.5px] font-extrabold text-ink-900">{b.limit}</span>
              </span>
              <ToneBadge label={b.eskalasi} tone={ESKALASI_TONE[b.eskalasi]} />
            </div>
            <div className="mt-1 text-[8.5px] font-semibold leading-snug text-[#ef4444]">
              {b.deviasi}
            </div>
            <p className="mt-1 flex min-h-0 items-start gap-1 text-[8.5px] leading-snug text-ink-700">
              <ArrowUpRight size={9} className="mt-[1px] shrink-0 text-ink-400" />
              {b.tindakLanjut}
            </p>
            <div className="mt-auto pt-1 text-[9px] font-semibold text-ink-500">
              {b.kategori} · Breach sejak {b.sejak}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
