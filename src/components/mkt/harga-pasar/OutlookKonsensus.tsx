"use client";

import { outlookKonsensus } from "@/lib/harga-outlook-data";
import { filterBySubholding } from "@/lib/subholding";
import { SectionHead } from "@/components/hc/SectionHead";
import { useSubholding } from "@/components/SubholdingProvider";
import { commodityScope, ScopeEmpty } from "@/components/ui/CommodityScope";

const n = (v: number) => v.toLocaleString("id-ID");

function ScenarioCell({ s }: { s: { bear: number; base: number; bull: number } }) {
  return (
    <span className="flex items-center justify-end gap-1.5">
      <span className="text-[8.5px] font-semibold text-[#ef4444]">{n(s.bear)}</span>
      <span className="rounded bg-[#eef2f6] px-1 py-[1px] text-[8.5px] font-extrabold text-ink-900">
        {n(s.base)}
      </span>
      <span className="text-[8.5px] font-semibold text-ptpn-green">{n(s.bull)}</span>
    </span>
  );
}

/** Outlook konsensus bear/base/bull Q3-Q4 2026 per komoditas. */
export function OutlookKonsensus() {
  const { active, def } = useSubholding();
  // CPO → PalmCo, gula → SugarCo, karet → SupportingCo.
  const rows = filterBySubholding(outlookKonsensus, active, (r) => commodityScope(r.komoditas));

  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-3 pt-3"
      style={{ "--d": "120ms" } as React.CSSProperties}
    >
      <SectionHead title="Outlook Konsensus Q3-Q4 2026" action="Lihat Detail" />
      <p className="mt-[3px] text-[9px] text-ink-500">
        Skenario <span className="font-semibold text-[#ef4444]">Bear</span> ·{" "}
        <span className="font-semibold text-ink-900">Base</span> ·{" "}
        <span className="font-semibold text-ptpn-green">Bull</span> per komoditas
      </p>

      <div className="mt-2 grid grid-cols-[minmax(0,1.1fr)_150px_150px] items-center gap-x-2 text-[9px] font-semibold uppercase tracking-[0.04em] text-ink-500">
        <span>Komoditas</span>
        <span className="text-right">Q3 2026</span>
        <span className="text-right">Q4 2026</span>
      </div>

      {rows.length === 0 && <ScopeEmpty label={def.fullLabel} />}

      <ul className="mt-1 flex min-h-0 flex-1 flex-col justify-between gap-1">
        {rows.map((r) => (
          <li
            key={r.komoditas}
            className="grid grid-cols-[minmax(0,1.1fr)_150px_150px] items-center gap-x-2 rounded-lg border border-[#eef2f6] bg-[#fbfcfd] px-2.5 py-1.5"
            title={r.catatan}
          >
            <span className="min-w-0 leading-[1.25]">
              <span className="block truncate text-[9.5px] font-extrabold text-ink-900">
                {r.komoditas}
              </span>
              <span className="block text-[9px] text-ink-500">{r.unit}</span>
            </span>
            <ScenarioCell s={r.q3} />
            <ScenarioCell s={r.q4} />
          </li>
        ))}
      </ul>

      <p className="mt-1.5 truncate text-[9px] text-ink-500">
        Base case KPBN Q4 Rp 13.900/kg ditopang B40 &amp; produksi Malaysia lemah.
      </p>
    </div>
  );
}
