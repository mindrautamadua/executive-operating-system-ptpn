import { topFindings, topFindingStats } from "@/lib/risk-data-detail";
import { SectionHead } from "@/components/hc/SectionHead";
import { ScopeNote } from "@/components/ui/ScopeNote";
import { ToneBadge, type BadgeTone } from "@/components/shared/ToneBadge";

const STATUS_TONE: Record<string, BadgeTone> = {
  Selesai: "good",
  "Proses TL": "warn",
  Overdue: "bad",
};

export function TopFindingsTable() {
  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-3 pt-3"
      style={{ "--d": "60ms" } as React.CSSProperties}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <SectionHead title="Temuan Bernilai Terbesar" action="Lihat Semua Temuan" badge={<ScopeNote />} />
          <p className="mt-[3px] text-[9px] text-ink-500">
            Nilai Temuan Total {topFindingStats.nilaiTotal} · Disetor Kembali{" "}
            <span className="font-bold text-ptpn-green">{topFindingStats.disetorKembali}</span>
          </p>
        </div>
      </div>

      <div className="scroll-thin mt-2 min-h-0 flex-1 overflow-y-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-[#eef2f6] text-left">
              {["Temuan", "Sumber", "Unit", "Nilai", "Status", "Target TL"].map((h) => (
                <th
                  key={h}
                  className="py-[5px] text-[9px] font-extrabold uppercase tracking-[0.04em] text-ink-500"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {topFindings.map((t) => (
              <tr key={t.temuan} className="border-b border-[#f4f7f9] last:border-0">
                <td className="py-[6px] pr-2 text-[9px] font-bold text-ink-900">{t.temuan}</td>
                <td className="py-[6px] pr-2 text-[8.5px] text-ink-500">{t.sumber}</td>
                <td className="py-[6px] pr-2 text-[8.5px] text-ink-500">{t.unit}</td>
                <td className="py-[6px] pr-2 text-[9.5px] font-extrabold text-[#ef4444]">
                  {t.nilai}
                </td>
                <td className="py-[6px] pr-2">
                  <ToneBadge label={t.status} tone={STATUS_TONE[t.status]} />
                </td>
                <td className="py-[6px] text-[8.5px] text-ink-500">{t.due}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="mt-1.5 rounded-md bg-[#f8fafc] px-2 py-[5px] text-[9px] leading-[1.4] text-ink-500">
        {topFindingStats.note}
      </p>
    </div>
  );
}
