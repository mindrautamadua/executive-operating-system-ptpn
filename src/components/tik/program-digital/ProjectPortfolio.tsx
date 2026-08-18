import { projectPortfolio, TIK_RAG_COLOR, type TikRagStatus } from "@/lib/tik-data";
import { SectionHead } from "@/components/hc/SectionHead";
import { ScopeNote } from "@/components/ui/ScopeNote";
import { ToneBadge, type BadgeTone } from "@/components/shared/ToneBadge";

const RAG_TONE: Record<TikRagStatus, BadgeTone> = {
  Hijau: "good",
  Amber: "warn",
  Merah: "bad",
};

const angka = (v: number) => v.toLocaleString("id-ID");

const totalNilai = projectPortfolio.reduce((a, p) => a + p.nilaiRpM, 0);

/** Tabel 9 proyek digital aktif dengan progres dan status RAG. */
export function ProjectPortfolio() {
  return (
    <div
      className="card anim-rise flex h-full min-h-0 flex-col px-4 pb-2.5 pt-3"
      style={{ "--d": "210ms" } as React.CSSProperties}
    >
      <SectionHead title="Portofolio Proyek Digital" action="Lihat Semua" badge={<ScopeNote />} />
      <p className="mt-[3px] text-[9px] text-ink-500">
        9 Proyek Aktif · Total Nilai Rp {angka(totalNilai)} M · 4 Hijau · 3 Amber · 2 Merah
      </p>

      <div className="scroll-thin mt-2 min-h-0 flex-1 overflow-y-auto">
        <table className="w-full border-collapse">
          <thead className="sticky top-0 bg-[var(--surface)]">
            <tr className="border-b border-[#eef2f6] text-left">
              <th className="pb-1.5 text-[8.5px] font-bold uppercase tracking-[0.04em] text-ink-400">
                Proyek
              </th>
              <th className="pb-1.5 text-right text-[8.5px] font-bold uppercase tracking-[0.04em] text-ink-400">
                Nilai
              </th>
              <th className="pb-1.5 text-[8.5px] font-bold uppercase tracking-[0.04em] text-ink-400">
                Status
              </th>
              <th className="w-[130px] pb-1.5 text-[8.5px] font-bold uppercase tracking-[0.04em] text-ink-400">
                Progres
              </th>
              <th className="pb-1.5 text-[8.5px] font-bold uppercase tracking-[0.04em] text-ink-400">
                Selesai
              </th>
              <th className="pb-1.5 text-[8.5px] font-bold uppercase tracking-[0.04em] text-ink-400">
                Sponsor
              </th>
            </tr>
          </thead>
          <tbody>
            {projectPortfolio.map((p) => (
              <tr key={p.proyek} className="border-b border-[#f4f7fa]">
                <td className="py-[7px] pr-2 text-[9.5px] font-bold text-ink-900">{p.proyek}</td>
                <td className="whitespace-nowrap py-[7px] pr-2 text-right text-[9px] font-semibold text-ink-700">
                  Rp {angka(p.nilaiRpM)} M
                </td>
                <td className="py-[7px] pr-2">
                  <ToneBadge label={p.status} tone={RAG_TONE[p.status]} />
                </td>
                <td className="py-[7px] pr-2">
                  <div className="flex items-center gap-1.5">
                    <div className="h-[7px] min-w-0 flex-1 overflow-hidden rounded-full bg-[#eef2f6]">
                      <div
                        className="h-full rounded-full"
                        style={{
                          width: `${p.progressPct}%`,
                          backgroundColor: TIK_RAG_COLOR[p.status],
                        }}
                      />
                    </div>
                    <span className="w-[26px] shrink-0 text-right text-[8.5px] font-bold text-ink-700">
                      {p.progressPct}%
                    </span>
                  </div>
                </td>
                <td className="whitespace-nowrap py-[7px] pr-2 text-[9px] text-ink-700">
                  {p.selesai}
                </td>
                <td className="py-[7px] text-[8.5px] text-ink-500">{p.sponsor}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="pt-1.5 text-[9px] leading-snug text-ink-500">
        Dua proyek merah — ERP Wave 3 (42%) dan uplift keamanan siber (34%) — menyerap Rp 233 M dan
        keduanya menjadi agenda keputusan BOD kuartal ini.
      </p>
    </div>
  );
}
