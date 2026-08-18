import {
  PRODUCTIVITY_GAP_TOTAL_RP_T,
  productivityGapValue,
  productivityGapNote,
} from "@/lib/apd-data";
import { SectionHead } from "@/components/hc/SectionHead";
import { ScopeNote } from "@/components/ui/ScopeNote";

const num = (v: number) =>
  v.toLocaleString("id-ID", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

const MAX = Math.max(...productivityGapValue.map((r) => r.potensiRpT));

/** Nilai gap produktivitas: potensi Rp 2,4 T/tahun bila empat gap ditutup. */
export function ProductivityGapValue() {
  return (
    <div
      className="card anim-rise flex h-full min-h-0 flex-col px-4 pb-2.5 pt-3"
      style={{ "--d": "120ms" } as React.CSSProperties}
    >
      <SectionHead title="Nilai Gap Produktivitas" action="Lihat Detail" badge={<ScopeNote />} />
      <p className="mt-[3px] text-[9px] text-ink-500">
        Potensi Nilai Tahunan bila Gap Ditutup ·{" "}
        <span className="font-bold text-ptpn-green">
          Rp {PRODUCTIVITY_GAP_TOTAL_RP_T.toLocaleString("id-ID")} T/tahun
        </span>
      </p>

      <div className="scroll-thin mt-2 min-h-0 flex-1 overflow-y-auto pr-1">
        <div className="scroll-thin overflow-x-auto">
        <table className="w-full border-collapse">
          <thead className="sticky top-0 bg-[var(--surface)]">
            <tr className="border-b border-[#eef2f6] text-left">
              <th className="pb-1.5 text-[8.5px] font-bold uppercase tracking-[0.04em] text-ink-400">
                Faktor
              </th>
              <th className="pb-1.5 text-[8.5px] font-bold uppercase tracking-[0.04em] text-ink-400">
                Posisi → Target
              </th>
              <th className="w-[104px] pb-1.5 text-[8.5px] font-bold uppercase tracking-[0.04em] text-ink-400">
                Potensi (Rp T)
              </th>
              <th className="pb-1.5 text-[8.5px] font-bold uppercase tracking-[0.04em] text-ink-400">
                Aksi &amp; Horizon
              </th>
            </tr>
          </thead>
          <tbody>
            {productivityGapValue.map((r) => (
              <tr key={r.faktor} className="border-b border-[#f4f7fa] align-top">
                <td className="py-[7px] pr-2 text-[9.5px] font-bold text-ink-900">{r.faktor}</td>
                <td className="whitespace-nowrap py-[7px] pr-2 text-[9px] text-ink-700">
                  {r.gapSaatIni} → {r.target}
                </td>
                <td className="py-[7px] pr-2">
                  <div className="flex items-center gap-1.5">
                    <div className="h-[7px] min-w-0 flex-1 overflow-hidden rounded-full bg-[#eef2f6]">
                      <div
                        className="h-full rounded-full bg-ptpn-green"
                        style={{ width: `${(r.potensiRpT / MAX) * 100}%` }}
                      />
                    </div>
                    <span className="w-[28px] shrink-0 text-right text-[8.5px] font-extrabold text-ink-900">
                      {num(r.potensiRpT)}
                    </span>
                  </div>
                </td>
                <td className="py-[7px] text-[8.5px] leading-snug text-ink-500">
                  {r.aksi}
                  <span className="mt-[2px] block font-semibold text-ink-400">{r.horizon}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      </div>

      <p className="pt-1.5 text-[9px] leading-snug text-ink-500">{productivityGapNote}</p>
    </div>
  );
}
