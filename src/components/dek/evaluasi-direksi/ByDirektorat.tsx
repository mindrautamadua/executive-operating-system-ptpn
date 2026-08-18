import { byDirektoratScore, type DekDirektoratScoreRow } from "@/lib/dek-data-detail";
import { SectionHead } from "@/components/hc/SectionHead";
import { ScopeNote } from "@/components/ui/ScopeNote";
import { ToneBadge, type BadgeTone } from "@/components/shared/ToneBadge";

const TONE_BADGE: Record<DekDirektoratScoreRow["tone"], BadgeTone> = {
  green: "good",
  amber: "warn",
  red: "bad",
};

const TONE_LABEL: Record<DekDirektoratScoreRow["tone"], string> = {
  green: "Memadai",
  amber: "Perlu Dipantau",
  red: "Perlu Penjelasan",
};

const SCORE_CLASS: Record<DekDirektoratScoreRow["tone"], string> = {
  green: "text-ptpn-green",
  amber: "text-[#d98b06]",
  red: "text-[#ef4444]",
};

/** Penilaian enam direktorat: skor, beban KPI, KPI merah, catatan pengawasan. */
export function ByDirektorat() {
  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-2.5 pt-3"
      style={{ "--d": "120ms" } as React.CSSProperties}
    >
      <SectionHead title="Penilaian per Direktorat" action="Unduh Rincian" badge={<ScopeNote />} />
      <p className="mt-[3px] text-[9px] text-ink-500">
        6 Direktorat · 32 KPI Dikelola · 4 Berstatus Merah · Rata-Rata 87,4
      </p>

      <div className="scroll-thin mt-1.5 min-h-0 flex-1 overflow-y-auto">
        <table className="w-full border-separate border-spacing-0">
          <thead className="sticky top-0 bg-[var(--surface)]">
            <tr className="text-left text-[7.5px] font-extrabold uppercase tracking-[0.05em] text-ink-400">
              <th className="border-b border-[#eef2f6] pb-1.5 pr-2">Direktorat</th>
              <th className="border-b border-[#eef2f6] pb-1.5 pr-2 text-right">Skor</th>
              <th className="border-b border-[#eef2f6] pb-1.5 pr-2 text-right">KPI</th>
              <th className="border-b border-[#eef2f6] pb-1.5 pr-2 text-right">Merah</th>
              <th className="border-b border-[#eef2f6] pb-1.5 pr-2">Catatan Pengawasan</th>
              <th className="border-b border-[#eef2f6] pb-1.5">Status</th>
            </tr>
          </thead>
          <tbody>
            {byDirektoratScore.map((d) => (
              <tr key={d.direktorat} className="align-top">
                <td className="border-b border-[#f3f6f9] py-[5px] pr-2 text-[8.5px] font-bold leading-snug text-ink-900">
                  {d.direktorat}
                </td>
                <td
                  className={`whitespace-nowrap border-b border-[#f3f6f9] py-[5px] pr-2 text-right text-[8.5px] font-extrabold tabular-nums ${SCORE_CLASS[d.tone]}`}
                >
                  {d.skor.toLocaleString("id-ID", { minimumFractionDigits: 1 })}
                </td>
                <td className="whitespace-nowrap border-b border-[#f3f6f9] py-[5px] pr-2 text-right text-[8.5px] tabular-nums text-ink-500">
                  {d.kpiDikelola}
                </td>
                <td
                  className={`whitespace-nowrap border-b border-[#f3f6f9] py-[5px] pr-2 text-right text-[8.5px] font-bold tabular-nums ${
                    d.kpiMerah > 0 ? "text-[#ef4444]" : "text-ink-400"
                  }`}
                >
                  {d.kpiMerah}
                </td>
                <td className="border-b border-[#f3f6f9] py-[5px] pr-2 text-[9px] leading-snug text-ink-500">
                  {d.catatanPengawasan}
                </td>
                <td className="border-b border-[#f3f6f9] py-[5px]">
                  <ToneBadge label={TONE_LABEL[d.tone]} tone={TONE_BADGE[d.tone]} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
