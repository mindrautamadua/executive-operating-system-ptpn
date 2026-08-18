"use client";

import { produkTurunan } from "@/lib/hilir-stok-margin-data";
import { filterBySubholding } from "@/lib/subholding";
import { useSubholding } from "@/components/SubholdingProvider";
import { commodityScope, ScopeEmpty } from "@/components/ui/CommodityScope";
import { SectionHead } from "../../hc/SectionHead";

const barColor = (pct: number) =>
  pct >= 12 ? "bg-ptpn-green" : pct >= 8 ? "bg-[#3b7ded]" : "bg-[#f5a524]";

const pctLabel = (v: number) =>
  `${v.toLocaleString("id-ID", { minimumFractionDigits: 1, maximumFractionDigits: 1 })}%`;

/** Tabel produk turunan: volume, nilai, margin standalone per produk hilir. */
export function ProdukTurunanTable() {
  const { active, def } = useSubholding();
  // Nama produk menentukan pemiliknya: olein/stearin/migor/FAME/PKO = PalmCo,
  // turunan gula (rafinasi/bioetanol) = SugarCo.
  const rows = filterBySubholding(produkTurunan, active, (p) =>
    commodityScope(`${p.produk} ${p.keterangan}`),
  );

  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-3 pt-3"
      style={{ "--d": "120ms" } as React.CSSProperties}
    >
      <SectionHead title="Produk Turunan (YTD)" action="Lihat Detail" />
      <p className="mt-[3px] text-[9px] text-ink-500">
        Volume, Nilai &amp; Margin Standalone per Produk · margin blended hilir 9,8%
      </p>

      {rows.length === 0 && <ScopeEmpty label={def.fullLabel} />}

      {rows.length > 0 && (
        <>
      <div className="mt-2 grid grid-cols-[minmax(0,1.3fr)_62px_62px_minmax(0,1.1fr)_minmax(0,1.2fr)] items-center gap-x-2 text-[9px] font-semibold uppercase tracking-[0.04em] text-ink-500">
        <span>Produk</span>
        <span className="text-right">Volume</span>
        <span className="text-right">Nilai</span>
        <span>Margin</span>
        <span>Keterangan</span>
      </div>

      <ul className="mt-1 flex min-h-0 flex-1 flex-col justify-between gap-1">
        {rows.map((p) => (
          <li
            key={p.produk}
            className="grid grid-cols-[minmax(0,1.3fr)_62px_62px_minmax(0,1.1fr)_minmax(0,1.2fr)] items-center gap-x-2 rounded-lg border border-[#eef2f6] bg-[#fbfcfd] px-2.5 py-1.5"
          >
            <span className="truncate text-[9.5px] font-extrabold text-ink-900">{p.produk}</span>
            <span className="text-right text-[9px] font-semibold text-ink-500">{p.volume}</span>
            <span className="text-right text-[9.5px] font-extrabold text-ink-900">{p.nilai}</span>
            <span className="flex items-center gap-1.5">
              <span className="h-[6px] min-w-0 flex-1 overflow-hidden rounded-full bg-[#eef2f6]">
                <span
                  className={`block h-full rounded-full ${barColor(p.marginPct)}`}
                  style={{ width: `${Math.min((p.marginPct / 20) * 100, 100)}%` }}
                />
              </span>
              <span className="w-[32px] shrink-0 text-right text-[8.5px] font-bold text-ink-700">
                {pctLabel(p.marginPct)}
              </span>
            </span>
            <span className="truncate text-[8.5px] text-ink-500" title={p.keterangan}>
              {p.keterangan}
            </span>
          </li>
        ))}
      </ul>
        </>
      )}

      <p className="mt-1.5 truncate text-[9px] text-ink-500">
        PKO dibukukan pada segmen PK &amp; PKO — ditampilkan sebagai referensi rantai turunan.
      </p>
    </div>
  );
}
