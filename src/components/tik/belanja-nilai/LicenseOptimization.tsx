import { PiggyBank } from "lucide-react";
import { licenseOptimization } from "@/lib/tik-data-detail";
import { SectionHead } from "@/components/hc/SectionHead";
import { ScopeNote } from "@/components/ui/ScopeNote";

const angka = (v: number) => v.toLocaleString("id-ID");

const totalHematRpM = licenseOptimization.reduce((s, r) => s + r.potensiHematRpM, 0);
const maxHemat = Math.max(...licenseOptimization.map((r) => r.potensiHematRpM));

export function LicenseOptimization() {
  return (
    <div
      className="card anim-rise flex h-full min-h-0 flex-col px-4 pb-2.5 pt-3"
      style={{ "--d": "90ms" } as React.CSSProperties}
    >
      <SectionHead title="Optimasi Lisensi" action="Lihat Detail" badge={<ScopeNote />} />
      <p className="mt-[3px] text-[9px] text-ink-500">
        Lisensi Tidak Terpakai &amp; Potensi Penghematan per Tahun
      </p>

      <div className="mt-2 flex items-center gap-2.5 rounded-xl bg-ptpn-greenLight px-3 py-2">
        <span className="flex h-[30px] w-[30px] shrink-0 items-center justify-center rounded-full bg-white text-ptpn-green">
          <PiggyBank size={15} strokeWidth={1.9} />
        </span>
        <div className="min-w-0">
          <div className="text-[16px] font-extrabold leading-none text-ptpn-green">
            Rp {totalHematRpM} M<span className="text-[9px] font-bold">/tahun</span>
          </div>
          <p className="mt-[3px] text-[9px] leading-snug text-ink-500">
            Potensi hemat dari 8.328 lisensi tidak terpakai — cukup mendanai 58% uplift keamanan
            siber Rp 65 M.
          </p>
        </div>
      </div>

      <div className="scroll-thin mt-2 flex min-h-0 flex-1 flex-col gap-1 overflow-y-auto pr-1">
        {licenseOptimization.map((r) => (
          <div key={r.lisensi} className="rounded-lg border border-[#eef2f6] px-2 py-[5px]">
            <div className="flex items-center justify-between gap-2">
              <span className="truncate text-[9px] font-bold text-ink-900">{r.lisensi}</span>
              <span className="shrink-0 text-[9px] font-extrabold text-ptpn-green">
                Rp {r.potensiHematRpM} M
              </span>
            </div>
            <div className="mt-1 flex items-center gap-1.5">
              <div className="h-[6px] min-w-0 flex-1 overflow-hidden rounded-full bg-[#eef2f6]">
                <div
                  className="h-full rounded-full bg-ptpn-green"
                  style={{ width: `${(r.potensiHematRpM / maxHemat) * 100}%` }}
                />
              </div>
              <span className="shrink-0 text-[9px] font-semibold text-ink-500">
                {angka(r.tidakTerpakai)} dari {angka(r.dibeli)} idle
              </span>
            </div>
            <p className="mt-[3px] text-[9px] leading-snug text-ink-500">{r.tindakan}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
