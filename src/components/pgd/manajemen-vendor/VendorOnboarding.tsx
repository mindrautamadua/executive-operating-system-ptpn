import { vendorOnboarding } from "@/lib/pgd-data-detail";
import { SectionHead } from "@/components/hc/SectionHead";
import { ScopeNote } from "@/components/ui/ScopeNote";

const TOTAL = vendorOnboarding[0].count;
const BARS = ["bg-[#3b7ded]", "bg-[#0d9488]", "bg-[#f5a524]", "bg-ptpn-green"];

export function VendorOnboarding() {
  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-2.5 pt-3"
      style={{ "--d": "150ms" } as React.CSSProperties}
    >
      <SectionHead title="Funnel Onboarding Vendor" action="Lihat Detail" badge={<ScopeNote />} />
      <p className="mt-[3px] text-[9px] text-ink-500">
        Registrasi → Verifikasi → Kualifikasi → Aktif · konversi total 16,7%
      </p>

      <div className="mt-2.5 flex min-h-0 flex-1 flex-col justify-center gap-2.5">
        {vendorOnboarding.map((s, i) => (
          <div key={s.stage}>
            <div className="flex items-center justify-between gap-2">
              <span className="truncate text-[9px] font-bold text-ink-900">{s.stage}</span>
              <span className="shrink-0 text-[8.5px] font-semibold text-ink-500">
                {s.count.toLocaleString("id-ID")}
                {s.konversiPct !== null && (
                  <span className="ml-1 font-bold text-ink-700">
                    ({s.konversiPct.toLocaleString("id-ID", { minimumFractionDigits: 1 })}%)
                  </span>
                )}
                <span className="ml-1 text-ink-400">· {s.rataHari} hari</span>
              </span>
            </div>
            <div className="mt-1 h-[10px] overflow-hidden rounded-full bg-[#eef2f6]">
              <div
                className={`h-full rounded-full ${BARS[i]}`}
                style={{ width: `${(s.count / TOTAL) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      <p className="pt-1.5 text-[9px] leading-snug text-ink-500">
        Penyusutan terbesar pada kualifikasi teknis &amp; keuangan (66,3% → 33,3%) yang juga tahap
        terlama (12 hari).
      </p>
    </div>
  );
}
