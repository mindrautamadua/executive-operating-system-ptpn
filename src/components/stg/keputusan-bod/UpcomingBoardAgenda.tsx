"use client";

import { CalendarDays } from "lucide-react";
import { upcomingAgenda, type AgendaItem } from "@/lib/sbd-data";
import { SectionHead } from "@/components/hc/SectionHead";
import { ToneBadge, type BadgeTone } from "@/components/shared/ToneBadge";
import { useSubholding } from "@/components/SubholdingProvider";
import { filterBySubholding } from "@/lib/subholding";

const FORUM_TONE: Record<AgendaItem["forum"], string> = {
  Radirsus: "bg-[#fdecec] text-[#ef4444]",
  Radir: "bg-[#e8f1fd] text-[#2f6fe4]",
  Radirkom: "bg-[#f1ecfd] text-[#8b5cf6]",
};

const MATERI_TONE: Record<AgendaItem["materi"], BadgeTone> = {
  Siap: "good",
  "Dalam Penyusunan": "warn",
};

/** Agenda rapat direksi & komisaris Juni 2026 beserta kesiapan materi. */
export function UpcomingBoardAgenda() {
  const { active, isFiltered, def } = useSubholding();
  // Teks agenda menyebut subholding pemilik ("PTPN I", "11 PG"); agenda lintas
  // grup tidak menyebut subholding mana pun sehingga selalu ikut tampil.
  const rows = filterBySubholding(upcomingAgenda, active, (a) => a.agenda);

  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-2.5 pt-3"
      style={{ "--d": "300ms" } as React.CSSProperties}
    >
      <SectionHead title="Agenda Rapat Mendatang" action="Lihat Kalender Board" />
      <p className="mt-[3px] text-[9px] text-ink-500">
        {isFiltered
          ? `${rows.length} Forum Juni 2026 — Agenda ${def.label} & Lintas Grup`
          : "4 Forum Juni 2026 & Materi yang Membutuhkan Keputusan Direksi"}
      </p>

      <div className="scroll-thin mt-1.5 min-h-0 flex-1 overflow-y-auto pr-1">
        {rows.length === 0 && (
          <p className="text-[9px] text-ink-500">Tidak ada agenda untuk cakupan ini.</p>
        )}
        <div className="flex flex-col gap-1.5">
          {rows.map((a) => (
            <div
              key={`${a.tanggal}-${a.forum}`}
              className="flex items-start gap-2.5 rounded-lg border border-[#eef2f6] bg-[#f5f8fa] px-2.5 py-2"
            >
              <span className="flex w-[86px] shrink-0 items-center gap-1.5">
                <CalendarDays size={12} className="shrink-0 text-ink-400" />
                <span className="text-[8.5px] font-extrabold text-ink-900">{a.tanggal}</span>
              </span>
              <span
                className={`shrink-0 rounded-md px-1.5 py-[2px] text-[9px] font-extrabold ${FORUM_TONE[a.forum]}`}
              >
                {a.forum}
              </span>
              <p className="min-w-0 flex-1 text-[8.5px] leading-snug text-ink-700">{a.agenda}</p>
              <ToneBadge label={a.materi} tone={MATERI_TONE[a.materi]} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
