"use client";

import { priceDrivers, type PriceDriver } from "@/lib/harga-outlook-data";
import { ToneBadge, type BadgeTone } from "@/components/shared/ToneBadge";
import { SectionHead } from "@/components/hc/SectionHead";
import { useSubholding } from "@/components/SubholdingProvider";
import { inScope, ScopeEmpty } from "@/components/ui/CommodityScope";

const DAMPAK_TONE: Record<PriceDriver["dampak"], BadgeTone> = {
  Bullish: "good",
  Bearish: "bad",
  Netral: "neutral",
};

const BAR_TONE: Record<PriceDriver["dampak"], string> = {
  Bullish: "bg-ptpn-green",
  Bearish: "bg-[#ef4444]",
  Netral: "bg-[#94a3b8]",
};

/** Driver pergerakan harga CPO + arah dampak & bobot kontribusi. */
export function PriceDriversCard() {
  // Seluruh driver pada kartu ini menggerakkan harga CPO → milik PalmCo.
  const { active, def } = useSubholding();
  const cpoScope = inScope(active, "CPO");

  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-3 pt-3"
      style={{ "--d": "90ms" } as React.CSSProperties}
    >
      <SectionHead title="Price Drivers CPO" action="Lihat Detail" />
      <p className="mt-[3px] text-[9px] text-ink-500">
        Faktor penggerak harga &amp; bobot kontribusi (total 100%)
      </p>

      {!cpoScope && <ScopeEmpty label={def.fullLabel} />}

      {cpoScope && (
      <ul className="mt-2 flex min-h-0 flex-1 flex-col justify-between gap-1">
        {priceDrivers.map((d) => (
          <li
            key={d.driver}
            className="rounded-lg border border-[#eef2f6] bg-[#fbfcfd] px-2.5 py-1.5"
          >
            <div className="flex items-center gap-2">
              <span className="min-w-0 flex-1 truncate text-[9.5px] font-extrabold text-ink-900">
                {d.driver}
              </span>
              <span className="h-[5px] w-[52px] shrink-0 overflow-hidden rounded-full bg-[#eef2f6]">
                <span
                  className={`block h-full rounded-full ${BAR_TONE[d.dampak]}`}
                  style={{ width: `${Math.min(d.bobotPct * 3, 100)}%` }}
                />
              </span>
              <span className="w-[26px] shrink-0 text-right text-[8.5px] font-bold text-ink-700">
                {d.bobotPct}%
              </span>
              <ToneBadge label={d.dampak} tone={DAMPAK_TONE[d.dampak]} />
            </div>
            <p className="mt-[2px] truncate text-[9px] text-ink-500" title={d.keterangan}>
              {d.keterangan}
            </p>
          </li>
        ))}
      </ul>
      )}
    </div>
  );
}
