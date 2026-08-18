"use client";

import { agingInventory, agingNote } from "@/lib/hilir-stok-margin-data";
import { PALETTE } from "@/lib/chart-palette";
import { filterBySubholding } from "@/lib/subholding";
import { useSubholding } from "@/components/SubholdingProvider";
import { ScopeEmpty, commodityScope } from "@/components/ui/CommodityScope";
import { SectionHead } from "../../hc/SectionHead";

const BUCKET_COLORS = [PALETTE.green, PALETTE.blue, PALETTE.amber, PALETTE.red];

const num = (v: number) =>
  v.toLocaleString("id-ID", { maximumFractionDigits: 1 });

/**
 * Aging inventory gula & karet: stacked bar bucket umur + risiko kualitas.
 * Komoditas menentukan pemilik: gula → SugarCo, karet → SupportingCo; pada
 * cakupan PalmCo tidak ada baris yang tersisa.
 */
export function AgingInventory() {
  const { active, def } = useSubholding();
  const rows = filterBySubholding(agingInventory, active, (r) => commodityScope(r.komoditas));

  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-3 pt-3"
      style={{ "--d": "180ms" } as React.CSSProperties}
    >
      <SectionHead title="Aging Inventory Gula & Karet" action="Lihat Detail" />
      <p className="mt-[3px] text-[9px] text-ink-500">
        Distribusi Umur Stok (rb ton) · bucket &gt; 90 hari = risiko kualitas &amp; diskon
      </p>

      {rows.length === 0 && <ScopeEmpty label={def.fullLabel} />}

      {rows.length > 0 && (
      <>
      <div className="mt-2.5 flex min-h-0 flex-1 flex-col justify-center gap-4">
        {rows.map((row) => (
          <div key={row.komoditas}>
            <div className="flex items-center justify-between text-[9px]">
              <span className="font-extrabold text-ink-900">{row.komoditas}</span>
              <span className="font-semibold text-ink-500">
                Total <span className="font-extrabold text-ink-900">{num(row.totalRbTon)} rb ton</span>
              </span>
            </div>
            <div className="mt-1.5 flex h-[16px] w-full overflow-hidden rounded-md">
              {row.buckets.map((b, i) => (
                <span
                  key={b.label}
                  className="flex items-center justify-center"
                  style={{ width: `${b.pct}%`, background: BUCKET_COLORS[i] }}
                  title={`${b.label}: ${num(b.rbTon)} rb ton (${b.pct}%)`}
                >
                  <span className="text-[7.5px] font-extrabold text-white">{b.pct}%</span>
                </span>
              ))}
            </div>
            <div className="mt-1 flex justify-between text-[9px] text-ink-500">
              {row.buckets.map((b) => (
                <span key={b.label}>{num(b.rbTon)} rb</span>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-1 flex items-center gap-3">
        {rows[0].buckets.map((b, i) => (
          <span key={b.label} className="flex items-center gap-1.5 text-[9px] font-semibold text-ink-500">
            <span className="h-[7px] w-[7px] rounded-sm" style={{ background: BUCKET_COLORS[i] }} />
            {b.label}
          </span>
        ))}
      </div>
      <p className="mt-1 truncate text-[9px] text-ink-500" title={agingNote}>
        {agingNote}
      </p>
      </>
      )}
    </div>
  );
}
