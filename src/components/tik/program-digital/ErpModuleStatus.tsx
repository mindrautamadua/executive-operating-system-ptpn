import { erpModuleStatus, TIK_RAG_COLOR, type TikRagStatus } from "@/lib/tik-data";
import { SectionHead } from "@/components/hc/SectionHead";
import { ScopeNote } from "@/components/ui/ScopeNote";
import { ToneBadge, type BadgeTone } from "@/components/shared/ToneBadge";

const RAG_TONE: Record<TikRagStatus, BadgeTone> = {
  Hijau: "good",
  Amber: "warn",
  Merah: "bad",
};

/** Tabel status 7 modul ERP: cakupan sub-modul, adopsi, dan RAG. */
export function ErpModuleStatus() {
  return (
    <div
      className="card anim-rise flex h-full min-h-0 flex-col px-4 pb-2.5 pt-3"
      style={{ "--d": "60ms" } as React.CSSProperties}
    >
      <SectionHead title="Status Modul ERP" action="Lihat Semua" badge={<ScopeNote />} />
      <p className="mt-[3px] text-[9px] text-ink-500">
        7 Modul · 14 dari 21 Sub-Modul Go-Live · Adopsi Pengguna &amp; Status RAG
      </p>

      <div className="scroll-thin mt-2 min-h-0 flex-1 overflow-y-auto">
        <div className="scroll-thin overflow-x-auto">
        <table className="w-full border-collapse">
          <thead className="sticky top-0 bg-[var(--surface)]">
            <tr className="border-b border-[#eef2f6] text-left">
              <th className="pb-1.5 text-[8.5px] font-bold uppercase tracking-[0.04em] text-ink-400">
                Modul
              </th>
              <th className="pb-1.5 text-[8.5px] font-bold uppercase tracking-[0.04em] text-ink-400">
                Ruang Lingkup
              </th>
              <th className="pb-1.5 text-center text-[8.5px] font-bold uppercase tracking-[0.04em] text-ink-400">
                Sub-Modul
              </th>
              <th className="pb-1.5 text-[8.5px] font-bold uppercase tracking-[0.04em] text-ink-400">
                Status
              </th>
              <th className="pb-1.5 text-[8.5px] font-bold uppercase tracking-[0.04em] text-ink-400">
                Go-Live
              </th>
              <th className="w-[110px] pb-1.5 text-[8.5px] font-bold uppercase tracking-[0.04em] text-ink-400">
                Adopsi
              </th>
            </tr>
          </thead>
          <tbody>
            {erpModuleStatus.map((m) => (
              <tr key={m.modul} className="border-b border-[#f4f7fa]">
                <td className="py-[7px] pr-2 text-[9.5px] font-bold text-ink-900">{m.modul}</td>
                <td className="py-[7px] pr-2 text-[9px] text-ink-700">{m.ruangLingkup}</td>
                <td className="py-[7px] pr-2 text-center text-[9px] font-semibold text-ink-700">
                  {m.subModulLive}/{m.subModul}
                </td>
                <td className="py-[7px] pr-2">
                  <ToneBadge label={m.status} tone={RAG_TONE[m.rag]} />
                </td>
                <td className="whitespace-nowrap py-[7px] pr-2 text-[9px] text-ink-700">
                  {m.goLive}
                </td>
                <td className="py-[7px]">
                  <div className="flex items-center gap-1.5">
                    <div className="h-[7px] min-w-0 flex-1 overflow-hidden rounded-full bg-[#eef2f6]">
                      <div
                        className="h-full rounded-full"
                        style={{
                          width: `${m.adopsiPct}%`,
                          backgroundColor: TIK_RAG_COLOR[m.rag],
                        }}
                      />
                    </div>
                    <span className="w-[26px] shrink-0 text-right text-[8.5px] font-bold text-ink-700">
                      {m.adopsiPct}%
                    </span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      </div>

      <p className="pt-1.5 text-[9px] leading-snug text-ink-500">
        Modul Plantation (3 sub-modul, adopsi 0%) satu-satunya berstatus merah — mundur dari Q1 ke Q3
        2026 dan menahan sebagian besar potensi benefit.
      </p>
    </div>
  );
}
