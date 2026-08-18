"use client";

import { marginBySubholding } from "@/lib/hilir-stok-margin-data";
import { useSubholding } from "@/components/SubholdingProvider";
import { inScope } from "@/components/ui/CommodityScope";
import { SectionHead } from "../../hc/SectionHead";

const barColor = (pct: number) =>
  pct >= 24 ? "bg-ptpn-green" : pct >= 15 ? "bg-[#3b7ded]" : "bg-[#f5a524]";

const pctLabel = (v: number) =>
  `${v.toLocaleString("id-ID", { minimumFractionDigits: 1, maximumFractionDigits: 1 })}%`;

/**
 * Margin bruto blended per subholding vs rata-rata grup 24,1%.
 *
 * Baris punya kolom subholding eksplisit. Saat filter aktif, baris di luar
 * cakupan diredupkan (bukan dihapus) supaya perbandingan antar subholding —
 * inti kartu ini — tetap utuh.
 */
export function MarginBySubholding() {
  const { active } = useSubholding();

  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-3 pt-3"
      style={{ "--d": "300ms" } as React.CSSProperties}
    >
      <SectionHead title="Margin by Subholding" action="Lihat Detail" />
      <p className="mt-[3px] text-[9px] text-ink-500">
        Margin Bruto Blended per Subholding · rata-rata tertimbang grup 24,1%
      </p>

      <ul className="mt-2 flex min-h-0 flex-1 flex-col justify-around gap-1.5">
        {marginBySubholding.map((s) => (
          <li
            key={s.name}
            className={`rounded-lg border border-[#eef2f6] bg-[#fbfcfd] px-2.5 py-2${
              inScope(active, s.name) ? "" : " opacity-25"
            }`}
          >
            <div className="flex items-center justify-between gap-2">
              <span className="truncate text-[9.5px] font-extrabold text-ink-900">{s.name}</span>
              <span className="shrink-0 text-[8.5px] font-semibold text-ink-500">
                Penjualan{" "}
                <span className="font-extrabold text-ink-900">
                  Rp {s.nilaiRpT.toLocaleString("id-ID", { minimumFractionDigits: 1 })} T
                </span>
              </span>
            </div>
            <div className="mt-1.5 flex items-center gap-1.5">
              <span className="h-[7px] min-w-0 flex-1 overflow-hidden rounded-full bg-[#eef2f6]">
                <span
                  className={`block h-full rounded-full ${barColor(s.marginPct)}`}
                  style={{ width: `${Math.min((s.marginPct / 30) * 100, 100)}%` }}
                />
              </span>
              <span className="w-[38px] shrink-0 text-right text-[9.5px] font-extrabold text-ink-900">
                {pctLabel(s.marginPct)}
              </span>
            </div>
            <p className="mt-1 truncate text-[9px] text-ink-500" title={s.catatan}>
              {s.catatan}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
