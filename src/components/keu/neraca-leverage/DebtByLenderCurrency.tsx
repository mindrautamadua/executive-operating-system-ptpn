"use client";

import { useState } from "react";
import { currencyNote, debtByCurrency, debtByLender } from "@/lib/knl-data";
import { fmtId } from "@/lib/keu-core";
import { DonutChart } from "../../ui/DonutChart";
import { SectionHead } from "../../hc/SectionHead";
import { ScopeNote } from "@/components/ui/ScopeNote";

/** Dua donut: komposisi utang berbunga per kreditur & per mata uang. */
export function DebtByLenderCurrency() {
  const [activeLender, setActiveLender] = useState<number | null>(null);
  const [activeCcy, setActiveCcy] = useState<number | null>(null);

  const lenderData = debtByLender.map((d) => ({ name: d.name, value: d.pct, color: d.color }));
  const ccyData = debtByCurrency.map((d) => ({ name: d.currency, value: d.pct, color: d.color }));

  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-3 pt-3"
      style={{ "--d": "300ms" } as React.CSSProperties}
    >
      <SectionHead title="Debt by Lender & Currency" badge={<ScopeNote />} />
      <p className="mt-[3px] text-[9px] text-ink-500">
        Komposisi Utang Berbunga Rp 28,4 T per Kreditur &amp; Mata Uang
      </p>

      <div className="flex min-h-0 flex-1 items-center gap-3">
        <DonutChart
          data={lenderData}
          size={116}
          thickness={20}
          centerValue="28,4"
          centerCaption="Rp T"
          valueFormatter={(v) => `${fmtId(v, 0)}%`}
          onHover={setActiveLender}
        />
        <div className="min-w-0 flex-1">
          {debtByLender.map((d, i) => (
            <div
              key={d.name}
              className="flex items-center gap-1.5 py-[2px] transition-opacity"
              style={{ opacity: activeLender === null || activeLender === i ? 1 : 0.4 }}
            >
              <span
                className="h-[7px] w-[7px] shrink-0 rounded-[2px]"
                style={{ backgroundColor: d.color }}
              />
              <span className="min-w-0 flex-1 truncate text-[8.5px] font-medium text-ink-700">
                {d.name}
              </span>
              <span className="shrink-0 text-[9px] font-bold tabular-nums text-ink-900">
                {fmtId(d.valueRpT, 1)} T
              </span>
              <span className="w-[26px] shrink-0 text-right text-[8.5px] tabular-nums text-ink-400">
                {d.pct}%
              </span>
            </div>
          ))}
        </div>

        <DonutChart
          data={ccyData}
          size={116}
          thickness={20}
          centerValue="26%"
          centerCaption="USD"
          valueFormatter={(v) => `${fmtId(v, 0)}%`}
          onHover={setActiveCcy}
        />
        <div className="w-[92px] shrink-0">
          {debtByCurrency.map((d, i) => (
            <div
              key={d.currency}
              className="flex items-center gap-1.5 py-[2px] transition-opacity"
              style={{ opacity: activeCcy === null || activeCcy === i ? 1 : 0.4 }}
            >
              <span
                className="h-[7px] w-[7px] shrink-0 rounded-[2px]"
                style={{ backgroundColor: d.color }}
              />
              <span className="min-w-0 flex-1 text-[8.5px] font-medium text-ink-700">
                {d.currency}
              </span>
              <span className="shrink-0 text-[9px] font-bold tabular-nums text-ink-900">
                {d.pct}%
              </span>
            </div>
          ))}
        </div>
      </div>

      <p className="mt-1 truncate text-[9px] leading-snug text-ink-500" title={currencyNote}>
        {currencyNote}
      </p>
    </div>
  );
}
