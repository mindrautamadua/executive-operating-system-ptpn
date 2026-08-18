import { valueRealization } from "@/lib/tik-data-detail";
import { TIK_RAG_COLOR, type TikRagStatus } from "@/lib/tik-data";
import { SectionHead } from "@/components/hc/SectionHead";
import { ScopeNote } from "@/components/ui/ScopeNote";
import { ToneBadge, type BadgeTone } from "@/components/shared/ToneBadge";

const RAG_TONE: Record<TikRagStatus, BadgeTone> = {
  Hijau: "good",
  Amber: "warn",
  Merah: "bad",
};

const rupiah = (v: number) => v.toLocaleString("id-ID", { minimumFractionDigits: 2 });
const kali = (v: number) => v.toLocaleString("id-ID", { minimumFractionDigits: 1 });

const maxPotensi = Math.max(...valueRealization.map((v) => v.potensiRpT));

export function ValueRealization() {
  return (
    <div
      className="card anim-rise flex h-full min-h-0 flex-col px-4 pb-2.5 pt-3"
      style={{ "--d": "60ms" } as React.CSSProperties}
    >
      <SectionHead title="Realisasi Nilai Program Digital" action="Lihat Detail" badge={<ScopeNote />} />
      <p className="mt-[3px] text-[9px] text-ink-500">
        Benefit Terealisasi vs Belanja Kumulatif &amp; Potensi Penuh · ROI Berbasis Potensi
      </p>

      <div className="scroll-thin mt-2 min-h-0 flex-1 overflow-y-auto">
        <table className="w-full border-collapse">
          <thead className="sticky top-0 bg-[var(--surface)]">
            <tr className="border-b border-[#eef2f6] text-left">
              <th className="pb-1.5 text-[8.5px] font-bold uppercase tracking-[0.04em] text-ink-400">
                Program
              </th>
              <th className="pb-1.5 text-right text-[8.5px] font-bold uppercase tracking-[0.04em] text-ink-400">
                Belanja
              </th>
              <th className="pb-1.5 text-right text-[8.5px] font-bold uppercase tracking-[0.04em] text-ink-400">
                Benefit YTD
              </th>
              <th className="w-[110px] pb-1.5 text-[8.5px] font-bold uppercase tracking-[0.04em] text-ink-400">
                Potensi Penuh
              </th>
              <th className="pb-1.5 text-right text-[8.5px] font-bold uppercase tracking-[0.04em] text-ink-400">
                ROI
              </th>
              <th className="pb-1.5 text-[8.5px] font-bold uppercase tracking-[0.04em] text-ink-400">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {valueRealization.map((v) => (
              <tr key={v.program} className="border-b border-[#f4f7fa]">
                <td className="py-[7px] pr-2 text-[9.5px] font-bold text-ink-900">{v.program}</td>
                <td className="whitespace-nowrap py-[7px] pr-2 text-right text-[9px] font-semibold text-ink-700">
                  Rp {rupiah(v.belanjaRpT)} T
                </td>
                <td className="whitespace-nowrap py-[7px] pr-2 text-right text-[9px] font-semibold text-ink-700">
                  Rp {rupiah(v.benefitRpT)} T
                </td>
                <td className="py-[7px] pr-2">
                  <div className="flex items-center gap-1.5">
                    <div className="h-[7px] min-w-0 flex-1 overflow-hidden rounded-full bg-[#eef2f6]">
                      <div
                        className="h-full rounded-full"
                        style={{
                          width: `${(v.potensiRpT / maxPotensi) * 100}%`,
                          backgroundColor: TIK_RAG_COLOR[v.status],
                        }}
                      />
                    </div>
                    <span className="w-[34px] shrink-0 whitespace-nowrap text-right text-[8.5px] font-bold text-ink-700">
                      {rupiah(v.potensiRpT)} T
                    </span>
                  </div>
                </td>
                <td className="whitespace-nowrap py-[7px] pr-2 text-right text-[9px] font-extrabold text-ink-900">
                  {kali(v.roiPotensiX)}×
                </td>
                <td className="py-[7px]">
                  <ToneBadge label={v.status} tone={RAG_TONE[v.status]} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="pt-1.5 text-[9px] leading-snug text-ink-500">
        Benefit ERP baru Rp 0,13 T dari potensi Rp 1,3 T (ROI potensi 2,8×); optimasi lisensi
        justru ROI tertinggi 9,0× dengan belanja terkecil.
      </p>
    </div>
  );
}
