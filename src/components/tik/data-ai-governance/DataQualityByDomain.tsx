import { dataQualityByDomain } from "@/lib/tik-data-detail";
import { SectionHead } from "@/components/hc/SectionHead";
import { ScopeNote } from "@/components/ui/ScopeNote";
import { ToneBadge, type BadgeTone } from "@/components/shared/ToneBadge";

const STATUS_TONE: Record<string, BadgeTone> = {
  Baik: "good",
  Cukup: "warn",
  "Perlu Perbaikan": "bad",
};

const persen = (v: number) => v.toLocaleString("id-ID", { minimumFractionDigits: 1 });

/** Sel heat-table memakai token warna badge yang sudah ada — tanpa hex baru. */
function heatClass(v: number) {
  if (v >= 95) return "bg-ptpn-greenLight text-ptpn-green";
  if (v >= 92) return "bg-[#e6f6f5] text-[#0d9488]";
  if (v >= 90) return "bg-[#fdf3e0] text-[#d98b06]";
  return "bg-[#fdecec] text-[#ef4444]";
}

function Cell({ value }: { value: number }) {
  return (
    <td className="py-[5px] pr-1.5">
      <span
        className={`flex items-center justify-center rounded-md py-[4px] text-[9px] font-extrabold ${heatClass(value)}`}
      >
        {persen(value)}%
      </span>
    </td>
  );
}

export function DataQualityByDomain() {
  return (
    <div
      className="card anim-rise flex h-full min-h-0 flex-col px-4 pb-2.5 pt-3"
      style={{ "--d": "60ms" } as React.CSSProperties}
    >
      <SectionHead title="Kualitas Data per Domain" action="Lihat Detail" badge={<ScopeNote />} />
      <p className="mt-[3px] text-[9px] text-ink-500">
        6 Domain Terukur Otomatis · Kelengkapan, Akurasi &amp; Ketepatan Waktu (Rata-rata 93,1%)
      </p>

      <div className="scroll-thin mt-2 min-h-0 flex-1 overflow-y-auto">
        <table className="w-full border-collapse">
          <thead className="sticky top-0 bg-[var(--surface)]">
            <tr className="border-b border-[#eef2f6] text-left">
              <th className="pb-1.5 text-[8.5px] font-bold uppercase tracking-[0.04em] text-ink-400">
                Domain
              </th>
              <th className="pb-1.5 text-right text-[8.5px] font-bold uppercase tracking-[0.04em] text-ink-400">
                Skor
              </th>
              <th className="w-[62px] pb-1.5 text-center text-[8.5px] font-bold uppercase tracking-[0.04em] text-ink-400">
                Lengkap
              </th>
              <th className="w-[62px] pb-1.5 text-center text-[8.5px] font-bold uppercase tracking-[0.04em] text-ink-400">
                Akurat
              </th>
              <th className="w-[62px] pb-1.5 text-center text-[8.5px] font-bold uppercase tracking-[0.04em] text-ink-400">
                Tepat Waktu
              </th>
              <th className="pb-1.5 text-[8.5px] font-bold uppercase tracking-[0.04em] text-ink-400">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {dataQualityByDomain.map((d) => (
              <tr key={d.domain} className="border-b border-[#f4f7fa]">
                <td className="py-[5px] pr-2">
                  <div className="text-[9.5px] font-bold text-ink-900">{d.domain}</div>
                  <div className="truncate text-[9px] text-ink-500">{d.sistemSumber}</div>
                </td>
                <td className="whitespace-nowrap py-[5px] pr-2 text-right text-[10px] font-extrabold text-ink-900">
                  {persen(d.skor)}
                </td>
                <Cell value={d.kelengkapanPct} />
                <Cell value={d.akurasiPct} />
                <Cell value={d.ketepatanWaktuPct} />
                <td className="py-[5px]">
                  <ToneBadge label={d.status} tone={STATUS_TONE[d.status]} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="pt-1.5 text-[9px] leading-snug text-ink-500">
        Aset &amp; Lahan terendah (89,6%) padahal menopang HGU, sengketa lahan, dan kepatuhan EUDR.
      </p>
    </div>
  );
}
