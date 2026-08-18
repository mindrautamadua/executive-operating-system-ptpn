import { meetingCalendar, type DekMeetingType, type DekRisalahStatus } from "@/lib/dek-data";
import { SectionHead } from "@/components/hc/SectionHead";
import { ScopeNote } from "@/components/ui/ScopeNote";
import { ToneBadge, type BadgeTone } from "@/components/shared/ToneBadge";

const RISALAH_TONE: Record<DekRisalahStatus, BadgeTone> = {
  Terbit: "good",
  Draft: "warn",
  Tertunda: "bad",
};

const JENIS_LABEL: Record<DekMeetingType, string> = {
  Dekom: "Dekom",
  Gabungan: "Gabungan",
  Komite: "Komite",
};

const JENIS_TONE: Record<DekMeetingType, BadgeTone> = {
  Dekom: "info",
  Gabungan: "neutral",
  Komite: "neutral",
};

/** Kalender rapat: sampel lintas jenis forum dari 41 rapat YTD 2026. */
export function MeetingCalendar() {
  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-2.5 pt-3"
      style={{ "--d": "60ms" } as React.CSSProperties}
    >
      <SectionHead title="Kalender Rapat 2026" action="Lihat 41 Rapat" badge={<ScopeNote />} />
      <p className="mt-[3px] text-[9px] text-ink-500">
        12 Rapat Terpilih — sampel lintas jenis forum dari 41 rapat YTD (12 Dekom · 5 gabungan · 24
        komite)
      </p>

      <div className="scroll-thin mt-1.5 min-h-0 flex-1 overflow-y-auto">
        <table className="w-full border-separate border-spacing-0">
          <thead className="sticky top-0 bg-[var(--surface)]">
            <tr className="text-left text-[7.5px] font-extrabold uppercase tracking-[0.05em] text-ink-400">
              <th className="border-b border-[#eef2f6] pb-1.5 pr-2">Tanggal</th>
              <th className="border-b border-[#eef2f6] pb-1.5 pr-2">Jenis</th>
              <th className="border-b border-[#eef2f6] pb-1.5 pr-2">Agenda Utama</th>
              <th className="border-b border-[#eef2f6] pb-1.5 pr-2 text-right">Kehadiran</th>
              <th className="border-b border-[#eef2f6] pb-1.5 pr-2 text-right">Hari Terbit</th>
              <th className="border-b border-[#eef2f6] pb-1.5">Risalah</th>
            </tr>
          </thead>
          <tbody>
            {meetingCalendar.map((m) => (
              <tr key={`${m.tanggal}-${m.agendaUtama}`} className="align-middle">
                <td className="whitespace-nowrap border-b border-[#f3f6f9] py-[6px] pr-2 text-[9px] font-semibold text-ink-500">
                  {m.tanggal}
                </td>
                <td className="border-b border-[#f3f6f9] py-[6px] pr-2">
                  <ToneBadge label={JENIS_LABEL[m.jenis]} tone={JENIS_TONE[m.jenis]} />
                </td>
                <td className="border-b border-[#f3f6f9] py-[6px] pr-2 text-[8.5px] font-bold leading-snug text-ink-900">
                  {m.agendaUtama}
                </td>
                <td className="whitespace-nowrap border-b border-[#f3f6f9] py-[6px] pr-2 text-right text-[9px] tabular-nums text-ink-700">
                  {m.kehadiran}
                </td>
                <td
                  className={`whitespace-nowrap border-b border-[#f3f6f9] py-[6px] pr-2 text-right text-[9px] font-semibold tabular-nums ${
                    m.hariTerbit === null ? "text-[#ef4444]" : "text-ink-700"
                  }`}
                >
                  {m.hariTerbit === null ? "—" : `${m.hariTerbit} hari`}
                </td>
                <td className="border-b border-[#f3f6f9] py-[6px]">
                  <ToneBadge label={m.statusRisalah} tone={RISALAH_TONE[m.statusRisalah]} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
