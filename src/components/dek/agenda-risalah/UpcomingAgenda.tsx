import { CalendarDays, FileInput } from "lucide-react";
import { upcomingAgenda, type DekUpcomingAgendaRow } from "@/lib/dek-data";
import { SectionHead } from "@/components/hc/SectionHead";
import { ScopeNote } from "@/components/ui/ScopeNote";
import { ToneBadge, type BadgeTone } from "@/components/shared/ToneBadge";

const MATERI_TONE: Record<DekUpcomingAgendaRow["statusMateri"], BadgeTone> = {
  Diterima: "good",
  Menunggu: "warn",
  Terlambat: "bad",
};

/** Lima agenda terdekat beserta materi yang diminta dari Direksi. */
export function UpcomingAgenda() {
  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-2.5 pt-3"
      style={{ "--d": "180ms" } as React.CSSProperties}
    >
      <SectionHead title="Agenda Mendatang & Materi yang Diminta" action="Lihat Kalender" badge={<ScopeNote />} />
      <p className="mt-[3px] text-[9px] text-ink-500">
        5 Forum hingga 16 Jul 2026 · satu materi berstatus terlambat
      </p>

      <div className="scroll-thin mt-1.5 min-h-0 flex-1 overflow-y-auto pr-1">
        <div className="grid grid-cols-5 gap-2">
          {upcomingAgenda.map((a) => (
            <div
              key={`${a.tanggal}-${a.forum}`}
              className="flex flex-col rounded-lg border border-[#eef2f6] bg-[#f8fafc] p-2"
            >
              <div className="flex items-center gap-1.5">
                <CalendarDays size={11} className="shrink-0 text-ink-400" />
                <span className="text-[8.5px] font-extrabold text-ink-900">{a.tanggal}</span>
              </div>
              <div className="mt-[3px] truncate text-[8.5px] font-semibold text-ink-500" title={a.forum}>
                {a.forum}
              </div>
              <p className="mt-1.5 flex-1 text-[8.5px] font-bold leading-snug text-ink-900">
                {a.agenda}
              </p>
              <p className="mt-1.5 flex items-start gap-1 text-[9px] leading-snug text-ink-500">
                <FileInput size={9} className="mt-[1px] shrink-0 text-ink-400" />
                <span>{a.materiDiminta}</span>
              </p>
              <div className="mt-1.5 flex items-center justify-between gap-1.5 border-t border-[#eef2f6] pt-1">
                <span className="truncate text-[9px] font-semibold text-ink-500">
                  Tenggat {a.tenggatMateri}
                </span>
                <ToneBadge label={a.statusMateri} tone={MATERI_TONE[a.statusMateri]} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
