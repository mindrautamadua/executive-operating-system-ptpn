import { vendorConcentration } from "@/lib/pgd-data-detail";
import type { PgdVendorConcentrationRow } from "@/lib/pgd-data-detail";
import { SectionHead } from "@/components/hc/SectionHead";
import { ToneBadge, type BadgeTone } from "@/components/shared/ToneBadge";
import { ScopeNote } from "@/components/ui/ScopeNote";

const RISK_TONE: Record<PgdVendorConcentrationRow["risiko"], BadgeTone> = {
  Tinggi: "bad",
  Sedang: "warn",
  Rendah: "good",
};

const SUBSTITUSI_TONE: Record<PgdVendorConcentrationRow["substitusi"], BadgeTone> = {
  Tersedia: "good",
  Terbatas: "warn",
  "Tidak Ada": "bad",
};

export function VendorConcentration() {
  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-2.5 pt-3"
      style={{ "--d": "90ms" } as React.CSSProperties}
    >
      <SectionHead title="Konsentrasi 10 Vendor Terbesar" action="Lihat Detail" badge={<ScopeNote />} />
      <p className="mt-[3px] text-[9px] text-ink-500">
        Rp 3,67 T (29,6% belanja grup) · Top-20 mencapai 43,0%
      </p>

      <div className="scroll-thin mt-2 min-h-0 flex-1 overflow-y-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-[#eef2f6]">
              <th className="pb-1.5 text-left text-[9px] font-extrabold uppercase tracking-[0.04em] text-ink-500">
                #
              </th>
              <th className="pb-1.5 text-left text-[9px] font-extrabold uppercase tracking-[0.04em] text-ink-500">
                Vendor
              </th>
              <th className="pb-1.5 text-left text-[9px] font-extrabold uppercase tracking-[0.04em] text-ink-500">
                Kategori
              </th>
              <th className="pb-1.5 text-right text-[9px] font-extrabold uppercase tracking-[0.04em] text-ink-500">
                Belanja
              </th>
              <th className="pb-1.5 text-right text-[9px] font-extrabold uppercase tracking-[0.04em] text-ink-500">
                Share
              </th>
              <th className="pb-1.5 text-right text-[9px] font-extrabold uppercase tracking-[0.04em] text-ink-500">
                Risiko
              </th>
              <th className="pb-1.5 text-right text-[9px] font-extrabold uppercase tracking-[0.04em] text-ink-500">
                Substitusi
              </th>
            </tr>
          </thead>
          <tbody>
            {vendorConcentration.map((r) => (
              <tr key={r.vendor} className="border-b border-[#f5f8fa] last:border-0">
                <td className="py-[5px] pr-1 text-[8.5px] font-bold text-ink-400">{r.rank}</td>
                <td className="py-[5px] pr-2 text-[8.5px] font-semibold text-ink-900">
                  {r.vendor}
                </td>
                <td className="py-[5px] pr-2 text-[9px] text-ink-500">{r.kategori}</td>
                <td className="py-[5px] text-right text-[8.5px] text-ink-700">
                  Rp {r.valueRpT.toLocaleString("id-ID", { minimumFractionDigits: 2 })} T
                </td>
                <td className="py-[5px] text-right text-[8.5px] font-bold text-ink-900">
                  {r.sharePct.toLocaleString("id-ID", { minimumFractionDigits: 1 })}%
                </td>
                <td className="py-[5px] pl-2 text-right">
                  <ToneBadge label={r.risiko} tone={RISK_TONE[r.risiko]} />
                </td>
                <td className="py-[5px] pl-2 text-right">
                  <ToneBadge label={r.substitusi} tone={SUBSTITUSI_TONE[r.substitusi]} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="pt-1.5 text-[9px] leading-snug text-ink-500">
        PT Energi Solar Andalan (4,2% belanja) tanpa vendor pengganti terkualifikasi — titik
        ketergantungan tunggal paling kritis.
      </p>
    </div>
  );
}
