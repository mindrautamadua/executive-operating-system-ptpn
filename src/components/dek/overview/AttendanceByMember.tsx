import { attendanceByMember } from "@/lib/dek-data";
import { SectionHead } from "@/components/hc/SectionHead";
import { ScopeNote } from "@/components/ui/ScopeNote";
import { ToneBadge, type BadgeTone } from "@/components/shared/ToneBadge";

const TONE: Record<"green" | "amber" | "red", BadgeTone> = {
  green: "good",
  amber: "warn",
  red: "bad",
};

/** Kehadiran 6 anggota Dewan Komisaris pada rapat Dekom dan rapat komite. */
export function AttendanceByMember() {
  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-2.5 pt-3"
      style={{ "--d": "120ms" } as React.CSSProperties}
    >
      <SectionHead title="Kehadiran per Anggota Dewan Komisaris" action="Lihat Detail" badge={<ScopeNote />} />
      <p className="mt-[3px] text-[9px] text-ink-500">
        6 Anggota · 113 kehadiran dari 120 undangan rapat Dekom &amp; komite (94,2%)
      </p>

      <div className="scroll-thin mt-1.5 min-h-0 flex-1 overflow-y-auto">
        <div className="scroll-thin overflow-x-auto">
        <table className="w-full border-separate border-spacing-0">
          <thead className="sticky top-0 bg-[var(--surface)]">
            <tr className="text-left text-[7.5px] font-extrabold uppercase tracking-[0.05em] text-ink-400">
              <th className="border-b border-[#eef2f6] pb-1.5 pr-2">Jabatan</th>
              <th className="border-b border-[#eef2f6] pb-1.5 pr-2">Penugasan Komite</th>
              <th className="border-b border-[#eef2f6] pb-1.5 pr-2 text-right">Rapat Dekom</th>
              <th className="border-b border-[#eef2f6] pb-1.5 pr-2 text-right">Rapat Komite</th>
              <th className="border-b border-[#eef2f6] pb-1.5 pr-2 text-right">Kehadiran</th>
              <th className="border-b border-[#eef2f6] pb-1.5">Status</th>
            </tr>
          </thead>
          <tbody>
            {attendanceByMember.map((m) => (
              <tr key={m.nama} className="align-middle">
                <td className="whitespace-nowrap border-b border-[#f3f6f9] py-[6px] pr-2 text-[8.5px] font-bold text-ink-900">
                  {m.nama}
                </td>
                <td className="border-b border-[#f3f6f9] py-[6px] pr-2 text-[9px] leading-snug text-ink-500">
                  {m.komite}
                </td>
                <td className="whitespace-nowrap border-b border-[#f3f6f9] py-[6px] pr-2 text-right text-[9px] tabular-nums text-ink-700">
                  {m.hadirDekom}/{m.totalDekom}
                </td>
                <td className="whitespace-nowrap border-b border-[#f3f6f9] py-[6px] pr-2 text-right text-[9px] tabular-nums text-ink-700">
                  {m.hadirKomite}/{m.totalKomite}
                </td>
                <td className="whitespace-nowrap border-b border-[#f3f6f9] py-[6px] pr-2 text-right text-[8.5px] font-extrabold tabular-nums text-ink-900">
                  {m.kehadiranPct}
                </td>
                <td className="border-b border-[#f3f6f9] py-[6px]">
                  <ToneBadge
                    label={m.tone === "green" ? "Patuh" : "Perlu Dipantau"}
                    tone={TONE[m.tone]}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      </div>
    </div>
  );
}
