import { programPortfolio, RAG_COLOR, type RagStatus } from "@/lib/esg-data";
import { SectionHead } from "@/components/hc/SectionHead";
import { ScopeNote } from "@/components/ui/ScopeNote";
import { ToneBadge, type BadgeTone } from "@/components/shared/ToneBadge";

const RAG_TONE: Record<RagStatus, BadgeTone> = {
  Hijau: "good",
  Amber: "warn",
  Merah: "bad",
};

const angka = (v: number) => v.toLocaleString("id-ID");

export function ProgramPortfolio() {
  return (
    <div
      className="card anim-rise flex h-full min-h-0 flex-col px-4 pb-2.5 pt-3"
      style={{ "--d": "90ms" } as React.CSSProperties}
    >
      <SectionHead title="Portofolio Program Dekarbonisasi" action="Lihat Semua" badge={<ScopeNote />} />
      <p className="mt-[3px] text-[9px] text-ink-500">
        12 Program Aktif · Status RAG, Progres &amp; Dampak Tahunan Penuh
      </p>

      <div className="scroll-thin mt-2 min-h-0 flex-1 overflow-y-auto">
        <div className="scroll-thin overflow-x-auto">
        <table className="w-full border-collapse">
          <thead className="sticky top-0 bg-[var(--surface)]">
            <tr className="border-b border-[#eef2f6] text-left">
              <th className="pb-1.5 text-[8.5px] font-bold uppercase tracking-[0.04em] text-ink-400">
                Program
              </th>
              <th className="pb-1.5 text-[8.5px] font-bold uppercase tracking-[0.04em] text-ink-400">
                Lever
              </th>
              <th className="pb-1.5 text-[8.5px] font-bold uppercase tracking-[0.04em] text-ink-400">
                Status
              </th>
              <th className="w-[110px] pb-1.5 text-[8.5px] font-bold uppercase tracking-[0.04em] text-ink-400">
                Progres
              </th>
              <th className="pb-1.5 text-right text-[8.5px] font-bold uppercase tracking-[0.04em] text-ink-400">
                Dampak
              </th>
              <th className="pb-1.5 text-[8.5px] font-bold uppercase tracking-[0.04em] text-ink-400">
                Catatan
              </th>
            </tr>
          </thead>
          <tbody>
            {programPortfolio.map((p) => (
              <tr key={p.program} className="border-b border-[#f4f7fa]">
                <td className="py-[7px] pr-2 text-[9.5px] font-bold text-ink-900">{p.program}</td>
                <td className="py-[7px] pr-2 text-[9px] text-ink-700">{p.lever}</td>
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
                          backgroundColor: RAG_COLOR[p.status],
                        }}
                      />
                    </div>
                    <span className="w-[26px] shrink-0 text-right text-[8.5px] font-bold text-ink-700">
                      {p.progressPct}%
                    </span>
                  </div>
                </td>
                <td className="whitespace-nowrap py-[7px] pr-2 text-right text-[9px] font-semibold text-ink-700">
                  {angka(p.dampakRbTon)} rb t
                </td>
                <td className="py-[7px] text-[8.5px] text-ink-500">{p.catatan}</td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      </div>

      <p className="pt-1.5 text-[9px] leading-snug text-ink-500">
        1 program merah (elektrifikasi pompa SGN, 22%) tersandera kapasitas jaringan PLN; 5 program
        amber butuh pengawalan kuartalan.
      </p>
    </div>
  );
}
