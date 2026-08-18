import { supplyRiskByCategory, type PgdSupplyRiskRow } from "@/lib/pgd-data";
import { SectionHead } from "@/components/hc/SectionHead";
import { ToneBadge, type BadgeTone } from "@/components/shared/ToneBadge";
import { ScopeNote } from "@/components/ui/ScopeNote";

const LEVEL_TONE: Record<PgdSupplyRiskRow["level"], BadgeTone> = {
  Tinggi: "bad",
  Sedang: "warn",
  Rendah: "good",
};

const pct = (v: number) => `${v.toLocaleString("id-ID", { minimumFractionDigits: 1 })}%`;

export function SupplyRiskByCategory() {
  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-2.5 pt-3"
      style={{ "--d": "90ms" } as React.CSSProperties}
    >
      <SectionHead title="Risiko Pasokan per Kategori" action="Lihat Detail" badge={<ScopeNote />} />
      <p className="mt-[3px] text-[9px] text-ink-500">
        Ketergantungan Impor · Jumlah Vendor · Lead Time · Konsentrasi Top-3
      </p>

      <div className="scroll-thin mt-2 min-h-0 flex-1 overflow-y-auto">
        <div className="scroll-thin overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-[#eef2f6]">
              <th className="pb-1.5 text-left text-[9px] font-extrabold uppercase tracking-[0.04em] text-ink-500">
                Kategori
              </th>
              <th className="pb-1.5 text-right text-[9px] font-extrabold uppercase tracking-[0.04em] text-ink-500">
                Impor
              </th>
              <th className="pb-1.5 text-right text-[9px] font-extrabold uppercase tracking-[0.04em] text-ink-500">
                Vendor
              </th>
              <th className="pb-1.5 text-right text-[9px] font-extrabold uppercase tracking-[0.04em] text-ink-500">
                Lead Time
              </th>
              <th className="pb-1.5 text-right text-[9px] font-extrabold uppercase tracking-[0.04em] text-ink-500">
                Top-3
              </th>
              <th className="pb-1.5 text-right text-[9px] font-extrabold uppercase tracking-[0.04em] text-ink-500">
                Level
              </th>
            </tr>
          </thead>
          <tbody>
            {supplyRiskByCategory.map((r) => (
              <tr key={r.kategori} className="border-b border-[#f5f8fa] last:border-0">
                <td className="py-[5px] pr-2 text-[8.5px] font-semibold text-ink-900">
                  {r.kategori}
                </td>
                <td className="py-[5px] text-right text-[8.5px] text-ink-700">
                  {pct(r.ketergantunganImporPct)}
                </td>
                <td className="py-[5px] text-right text-[8.5px] text-ink-700">
                  {r.vendor.toLocaleString("id-ID")}
                </td>
                <td className="py-[5px] text-right text-[8.5px] text-ink-700">
                  {r.leadTimeHari} hari
                </td>
                <td className="py-[5px] text-right text-[8.5px] font-bold text-ink-900">
                  {pct(r.konsentrasiTop3Pct)}
                </td>
                <td className="py-[5px] pl-2 text-right">
                  <ToneBadge label={r.level} tone={LEVEL_TONE[r.level]} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      </div>

      <p className="pt-1.5 text-[9px] leading-snug text-ink-500">
        BBM &amp; energi paling rapuh: hanya 24 vendor dengan konsentrasi Top-3 88,2%; TI &amp;
        lisensi berketergantungan impor tertinggi (72,6%).
      </p>
    </div>
  );
}
