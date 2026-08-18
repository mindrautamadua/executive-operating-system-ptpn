"use client";

import { revitalisasi } from "@/lib/pabrik-data";
import { ToneBadge, type BadgeTone } from "@/components/shared/ToneBadge";
import { useSubholding } from "@/components/SubholdingProvider";
import { commodityScope, ScopeEmpty } from "@/components/ui/CommodityScope";
import { filterBySubholding } from "@/lib/subholding";
import { SectionHead } from "../../hc/SectionHead";

const STATUS_TONE: Record<string, BadgeTone> = {
  "On Track": "good",
  Waspada: "warn",
  Terlambat: "bad",
};

const BAR_TONE: Record<string, string> = {
  "On Track": "bg-ptpn-green",
  Waspada: "bg-[#f5a524]",
  Terlambat: "bg-[#ef4444]",
};

export function CapexRevitalisasi() {
  const { active, def } = useSubholding();
  // Nama pabrik menentukan pemiliknya: "PG …" → SugarCo, "PKS …" → PalmCo.
  const rows = filterBySubholding(revitalisasi, active, (r) => commodityScope(r.pabrik));

  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-3 pt-3"
      style={{ "--d": "180ms" } as React.CSSProperties}
    >
      <SectionHead title="Capex Revitalisasi" action="Lihat Detail" href="/produksi-operasi/kinerja-pabrik/detail#capex" />
      <p className="mt-[3px] text-[9px] text-ink-500">
        Progress 6 Pabrik Prioritas · Total Capex Rp 2,2 T
      </p>

      {rows.length === 0 ? (
        <ScopeEmpty label={def.fullLabel} />
      ) : (
      <ul className="mt-2 flex min-h-0 flex-1 flex-col justify-between gap-1">
        {rows.map((r) => (
          <li key={r.pabrik} className="leading-[1.25]">
            <div className="flex items-center justify-between gap-2">
              <span className="flex min-w-0 items-center gap-1.5">
                <span className="truncate text-[9px] font-extrabold text-ink-900">{r.pabrik}</span>
                <ToneBadge label={r.status} tone={STATUS_TONE[r.status]} />
              </span>
              <span className="shrink-0 text-[9px] font-semibold text-ink-500">
                Rp {r.capexRpM} M · {r.target}
              </span>
            </div>
            <div className="mt-[3px] flex items-center gap-1.5">
              <span className="h-[6px] min-w-0 flex-1 overflow-hidden rounded-full bg-[#eef2f6]">
                <span
                  className={`block h-full rounded-full ${BAR_TONE[r.status]}`}
                  style={{ width: `${r.progressPct}%` }}
                />
              </span>
              <span className="w-[26px] shrink-0 text-right text-[8.5px] font-bold text-ink-700">
                {r.progressPct}%
              </span>
            </div>
            <p className="mt-[2px] truncate text-[7.5px] text-ink-400">{r.lingkup}</p>
          </li>
        ))}
      </ul>
      )}
    </div>
  );
}
