import { riskClauseWatch } from "@/lib/hkm-data";
import type { HkmRiskClauseRow } from "@/lib/hkm-data";
import { SectionHead } from "@/components/hc/SectionHead";
import { ScopeNote } from "@/components/ui/ScopeNote";
import { ToneBadge, type BadgeTone } from "@/components/shared/ToneBadge";

const SEVERITY_TONE: Record<HkmRiskClauseRow["severity"], BadgeTone> = {
  Tinggi: "bad",
  Sedang: "warn",
  Rendah: "good",
};

const totalKontrak = riskClauseWatch.reduce((a, r) => a + r.kontrakTerdampak, 0);

const rpT = (v: number) => v.toLocaleString("id-ID", { minimumFractionDigits: 1 });

/** Klausul bermasalah pada kontrak aktif + jumlah kontrak terdampak. */
export function RiskClauseWatch() {
  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-2.5 pt-3"
      style={{ "--d": "120ms" } as React.CSSProperties}
    >
      <SectionHead title="Risk Clause Watch" action="Lihat Semua" badge={<ScopeNote />} />
      <p className="mt-[3px] text-[9px] text-ink-500">
        4 Klausul Berisiko · {totalKontrak} temuan pada kontrak aktif · 68 kontrak berisiko tinggi
      </p>

      <div className="mt-2 min-h-0 flex-1 overflow-hidden">
        <div className="scroll-thin overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-[#eef2f6] text-[8.5px] font-semibold text-ink-500">
              <th className="pb-[6px] text-left font-semibold">Klausul</th>
              <th className="pb-[6px] text-right font-semibold">Kontrak</th>
              <th className="pb-[6px] text-right font-semibold">Nilai (Rp T)</th>
              <th className="pb-[6px] pl-3 text-left font-semibold">Isu</th>
              <th className="pb-[6px] pl-3 text-left font-semibold">Severity</th>
            </tr>
          </thead>
          <tbody>
            {riskClauseWatch.map((r) => (
              <tr
                key={r.klausul}
                className="border-b border-[#f5f8fa] transition-colors last:border-0 hover:bg-[#f5f8fa]"
              >
                <td className="max-w-0 truncate py-[7px] text-[9.5px] font-bold text-ink-900" title={r.klausul}>
                  {r.klausul}
                </td>
                <td className="py-[7px] text-right text-[9.5px] font-semibold tabular-nums text-ink-900">
                  {r.kontrakTerdampak}
                </td>
                <td className="py-[7px] text-right text-[9.5px] font-semibold tabular-nums text-ink-700">
                  {rpT(r.nilaiRpT)}
                </td>
                <td className="max-w-0 truncate py-[7px] pl-3 text-[9px] text-ink-500" title={r.isu}>
                  {r.isu}
                </td>
                <td className="py-[7px] pl-3">
                  <ToneBadge label={r.severity} tone={SEVERITY_TONE[r.severity]} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      </div>

      <p className="mt-1 border-t border-[#f5f8fa] pt-1.5 text-[9px] leading-snug text-ink-500">
        Dua klausul berseverity tinggi (jaminan pelaksanaan dan pilihan forum) menyentuh 154
        kontrak senilai Rp 8,2 T dan dapat diremediasi lewat addendum standar.
      </p>
    </div>
  );
}
