import { auditFindings, type HseRagStatus } from "@/lib/hse-data";
import { SectionHead } from "@/components/hc/SectionHead";
import { ScopeNote } from "@/components/ui/ScopeNote";
import { ToneBadge, type BadgeTone } from "@/components/shared/ToneBadge";

const num = (v: number) => v.toLocaleString("id-ID");

const RAG_TONE: Record<HseRagStatus, BadgeTone> = {
  Hijau: "good",
  Amber: "warn",
  Merah: "bad",
};

const totalTerbuka = auditFindings.reduce((a, r) => a + r.terbuka, 0);
const totalTertutup = auditFindings.reduce((a, r) => a + r.tertutup, 0);
const totalOverdue = auditFindings.reduce((a, r) => a + r.overdue, 0);
const totalSemua = totalTerbuka + totalTertutup;

const pct = (v: number) => `${v.toLocaleString("id-ID", { minimumFractionDigits: 1 })}%`;

/** Tabel temuan audit K3 per kategori: terbuka, tertutup, overdue SLA 60 hari. */
export function AuditFindings() {
  return (
    <div
      className="card anim-rise flex h-full min-h-0 flex-col px-4 pb-2.5 pt-3"
      style={{ "--d": "90ms" } as React.CSSProperties}
    >
      <SectionHead title="Temuan Audit K3 per Kategori" action="Lihat Detail" badge={<ScopeNote />} />
      <p className="mt-[3px] text-[9px] text-ink-500">
        {num(totalSemua)} Temuan 12 Bulan Terakhir · {num(totalTertutup)} tertutup (
        {pct((totalTertutup / totalSemua) * 100)}) · {num(totalOverdue)} melewati SLA 60 hari
      </p>

      <div className="mt-2 min-h-0 flex-1">
        <div className="scroll-thin overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-[#eef2f6] text-left">
              <th className="pb-1.5 text-[8.5px] font-bold uppercase tracking-[0.04em] text-ink-400">
                Kategori
              </th>
              <th className="pb-1.5 text-right text-[8.5px] font-bold uppercase tracking-[0.04em] text-ink-400">
                Terbuka
              </th>
              <th className="pb-1.5 text-right text-[8.5px] font-bold uppercase tracking-[0.04em] text-ink-400">
                Tertutup
              </th>
              <th className="pb-1.5 text-right text-[8.5px] font-bold uppercase tracking-[0.04em] text-ink-400">
                Overdue
              </th>
              <th className="pb-1.5 text-[8.5px] font-bold uppercase tracking-[0.04em] text-ink-400">
                Penutupan
              </th>
              <th className="pb-1.5 text-right text-[8.5px] font-bold uppercase tracking-[0.04em] text-ink-400">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {auditFindings.map((r) => {
              const total = r.terbuka + r.tertutup;
              const closePct = (r.tertutup / total) * 100;
              return (
                <tr key={r.kategori} className="border-b border-[#f4f7fa]">
                  <td className="py-[7px] pr-2">
                    <div className="flex items-center gap-1.5">
                      <span
                        className="h-[7px] w-[7px] shrink-0 rounded-full"
                        style={{ backgroundColor: r.color }}
                      />
                      <span className="truncate text-[9.5px] font-bold text-ink-900">
                        {r.kategori}
                      </span>
                    </div>
                  </td>
                  <td className="py-[7px] pr-2 text-right text-[9.5px] font-bold text-ink-900">
                    {num(r.terbuka)}
                  </td>
                  <td className="py-[7px] pr-2 text-right text-[9px] font-semibold text-ink-500">
                    {num(r.tertutup)}
                  </td>
                  <td
                    className={`py-[7px] pr-2 text-right text-[9px] font-bold ${
                      r.overdue >= 10 ? "text-[#ef4444]" : "text-ink-500"
                    }`}
                  >
                    {num(r.overdue)}
                  </td>
                  <td className="py-[7px] pr-3">
                    <div className="flex items-center gap-1.5">
                      <div className="h-[5px] w-full overflow-hidden rounded-full bg-[#eef2f6]">
                        <div
                          className="h-full rounded-full"
                          style={{ width: `${closePct}%`, backgroundColor: r.color }}
                        />
                      </div>
                      <span className="w-[30px] shrink-0 text-right text-[8.5px] font-semibold text-ink-500">
                        {pct(closePct)}
                      </span>
                    </div>
                  </td>
                  <td className="py-[7px] text-right">
                    <ToneBadge label={r.status} tone={RAG_TONE[r.status]} />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        </div>
      </div>

      <p className="pt-1.5 text-[9px] leading-snug text-ink-500">
        APD adalah kategori terbesar sekaligus terburuk kepatuhannya — 52 temuan terbuka dengan 14
        melewati SLA, sejalan dengan 13 kecelakaan yang berakar pada APD.
      </p>
    </div>
  );
}
