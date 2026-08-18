import { recommendationRegister, type DekFollowUpStatus } from "@/lib/dek-data";
import { SectionHead } from "@/components/hc/SectionHead";
import { ScopeNote } from "@/components/ui/ScopeNote";
import { ToneBadge, type BadgeTone } from "@/components/shared/ToneBadge";

const STATUS_TONE: Record<DekFollowUpStatus, BadgeTone> = {
  Selesai: "good",
  Berjalan: "info",
  Overdue: "bad",
};

/** Register 15 rekomendasi terkini dari 68 YTD beserta PIC dan tenggatnya. */
export function RecommendationRegister() {
  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-2.5 pt-3"
      style={{ "--d": "60ms" } as React.CSSProperties}
    >
      <SectionHead title="Register Rekomendasi" action="Lihat 68 Rekomendasi" badge={<ScopeNote />} />
      <p className="mt-[3px] text-[9px] text-ink-500">
        15 Rekomendasi Terkini · bidang pengawasan, direktorat PIC, tenggat &amp; status tindak
        lanjut
      </p>

      <div className="scroll-thin mt-1.5 min-h-0 flex-1 overflow-y-auto">
        <table className="w-full border-separate border-spacing-0">
          <thead className="sticky top-0 bg-[var(--surface)]">
            <tr className="text-left text-[7.5px] font-extrabold uppercase tracking-[0.05em] text-ink-400">
              <th className="border-b border-[#eef2f6] pb-1.5 pr-2">ID</th>
              <th className="border-b border-[#eef2f6] pb-1.5 pr-2">Bidang</th>
              <th className="border-b border-[#eef2f6] pb-1.5 pr-2">Isi Rekomendasi</th>
              <th className="border-b border-[#eef2f6] pb-1.5 pr-2">Direktorat PIC</th>
              <th className="border-b border-[#eef2f6] pb-1.5 pr-2">Tenggat</th>
              <th className="border-b border-[#eef2f6] pb-1.5 pr-2 text-right">Terlambat</th>
              <th className="border-b border-[#eef2f6] pb-1.5">Status</th>
            </tr>
          </thead>
          <tbody>
            {recommendationRegister.map((r) => (
              <tr key={r.id} className="align-middle">
                <td className="whitespace-nowrap border-b border-[#f3f6f9] py-[6px] pr-2 text-[9px] font-semibold tabular-nums text-ink-500">
                  {r.id}
                </td>
                <td className="whitespace-nowrap border-b border-[#f3f6f9] py-[6px] pr-2 text-[9px] text-ink-500">
                  {r.bidang}
                </td>
                <td className="border-b border-[#f3f6f9] py-[6px] pr-2 text-[8.5px] font-bold leading-snug text-ink-900">
                  {r.isi}
                </td>
                <td className="whitespace-nowrap border-b border-[#f3f6f9] py-[6px] pr-2 text-[9px] text-ink-500">
                  {r.pic}
                </td>
                <td
                  className={`whitespace-nowrap border-b border-[#f3f6f9] py-[6px] pr-2 text-[9px] font-semibold ${
                    r.status === "Overdue" ? "text-[#ef4444]" : "text-ink-700"
                  }`}
                >
                  {r.tenggat}
                </td>
                <td
                  className={`whitespace-nowrap border-b border-[#f3f6f9] py-[6px] pr-2 text-right text-[9px] font-extrabold tabular-nums ${
                    r.terlambatHari === null ? "text-ink-400" : "text-[#ef4444]"
                  }`}
                >
                  {r.terlambatHari === null ? "—" : `${r.terlambatHari} hari`}
                </td>
                <td className="border-b border-[#f3f6f9] py-[6px]">
                  <ToneBadge label={r.status} tone={STATUS_TONE[r.status]} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
