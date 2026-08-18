import { governanceDocs, type HkmGovernanceDoc } from "@/lib/hkm-data-detail";
import { SectionHead } from "@/components/hc/SectionHead";
import { ScopeNote } from "@/components/ui/ScopeNote";
import { ToneBadge, type BadgeTone } from "@/components/shared/ToneBadge";

const STATUS_TONE: Record<HkmGovernanceDoc["status"], BadgeTone> = {
  Mutakhir: "good",
  "Perlu Pemutakhiran": "bad",
  "Dalam Revisi": "warn",
};

const perluTindakan = governanceDocs.filter((d) => d.status !== "Mutakhir").length;

/** Tabel dokumen tata kelola korporat & status pemutakhirannya. */
export function GovernanceDocs() {
  return (
    <div
      className="card anim-rise flex h-full min-h-0 flex-col px-4 pb-2.5 pt-3"
      style={{ "--d": "60ms" } as React.CSSProperties}
    >
      <SectionHead title="Dokumen Tata Kelola" action="Lihat Semua" badge={<ScopeNote />} />
      <p className="mt-[3px] text-[9px] text-ink-500">
        {governanceDocs.length} Dokumen Korporat · {perluTindakan} Perlu Tindakan · Skor GCG 92,1
      </p>

      <div className="scroll-thin mt-2 min-h-0 flex-1 overflow-y-auto">
        <div className="scroll-thin overflow-x-auto">
        <table className="w-full border-collapse">
          <thead className="sticky top-0 bg-[var(--surface)]">
            <tr className="border-b border-[#eef2f6] text-left">
              <th className="pb-1.5 text-[8.5px] font-bold uppercase tracking-[0.04em] text-ink-400">
                Dokumen
              </th>
              <th className="pb-1.5 text-[8.5px] font-bold uppercase tracking-[0.04em] text-ink-400">
                Versi Terakhir
              </th>
              <th className="pb-1.5 text-[8.5px] font-bold uppercase tracking-[0.04em] text-ink-400">
                Siklus Reviu
              </th>
              <th className="pb-1.5 text-[8.5px] font-bold uppercase tracking-[0.04em] text-ink-400">
                Status
              </th>
              <th className="pb-1.5 text-[8.5px] font-bold uppercase tracking-[0.04em] text-ink-400">
                Catatan
              </th>
            </tr>
          </thead>
          <tbody>
            {governanceDocs.map((d) => (
              <tr key={d.dokumen} className="border-b border-[#f4f7fa]">
                <td className="py-[7px] pr-2 text-[9.5px] font-bold text-ink-900">{d.dokumen}</td>
                <td className="whitespace-nowrap py-[7px] pr-2 text-[9px] text-ink-700">
                  {d.versiTerakhir}
                </td>
                <td className="whitespace-nowrap py-[7px] pr-2 text-[9px] text-ink-700">
                  {d.siklusReviu}
                </td>
                <td className="py-[7px] pr-2">
                  <ToneBadge label={d.status} tone={STATUS_TONE[d.status]} />
                </td>
                <td className="py-[7px] text-[8.5px] leading-snug text-ink-500">{d.catatan}</td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      </div>
    </div>
  );
}
