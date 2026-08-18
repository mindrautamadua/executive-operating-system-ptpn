"use client";

import { programs } from "@/lib/stf-data";
import type { InitiativeStatus } from "@/lib/stg-core";
import { SectionHead } from "@/components/hc/SectionHead";
import { ToneBadge, type BadgeTone } from "@/components/shared/ToneBadge";
import { useSubholding } from "@/components/SubholdingProvider";
import { filterBySubholding } from "@/lib/subholding";

const STATUS_TONE: Record<InitiativeStatus, BadgeTone> = {
  "On Track": "good",
  "At Risk": "warn",
  "Off Track": "bad",
};

const healthCls = (v: number) =>
  v >= 75 ? "text-ptpn-green" : v >= 65 ? "text-[#d98b06]" : "text-[#ef4444]";

const barCls = (v: number) =>
  v >= 75 ? "bg-ptpn-green" : v >= 65 ? "bg-[#f5a524]" : "bg-[#ef4444]";

const rp = (v: number) =>
  `Rp ${v.toLocaleString("id-ID", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} T`;

/** Kesehatan 6 program transformasi: health score, progres, benefit, sponsor. */
export function TransformationHealthGrid() {
  const { active, isFiltered, def } = useSubholding();
  // `sponsor` menyebut subholding pengampu (mis. "Direktur Utama SGN"); sponsor
  // tingkat Holding lintas-grup sehingga programnya tetap tampil di semua cakupan.
  const rows = filterBySubholding(programs, active, (p) => p.sponsor);

  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-3 pt-3"
      style={{ "--d": "60ms" } as React.CSSProperties}
    >
      <SectionHead title="Transformation Health" action="Lihat Detail" />
      <p className="mt-[3px] text-[9px] text-ink-500">
        {isFiltered
          ? `${rows.length} Program Relevan ${def.label} — Health Index, Progres Fisik & Benefit YTD`
          : "6 Program Transformasi — Health Index, Progres Fisik & Benefit YTD"}
      </p>

      <div className="mt-2 grid min-h-0 flex-1 grid-cols-3 grid-rows-2 gap-2">
        {rows.length === 0 && (
          <p className="text-[8.5px] text-ink-400">
            Tidak ada program transformasi untuk cakupan ini.
          </p>
        )}
        {rows.map((p) => (
          <div
            key={p.name}
            className="flex min-w-0 flex-col rounded-lg border border-[#eef2f6] bg-[#fbfcfd] px-2.5 py-2"
          >
            <div className="flex items-start justify-between gap-1.5">
              <span className="truncate text-[9.5px] font-extrabold text-ink-900" title={p.name}>
                {p.name}
              </span>
              <ToneBadge label={p.status} tone={STATUS_TONE[p.status]} />
            </div>

            <div className="mt-1.5 flex items-baseline gap-1">
              <span className={`text-[19px] font-extrabold leading-none ${healthCls(p.health)}`}>
                {p.health}
              </span>
              <span className="text-[8.5px] font-bold text-ink-400">/100 Health</span>
            </div>

            <div className="mt-1.5 flex items-center gap-1.5">
              <span className="h-[6px] min-w-0 flex-1 overflow-hidden rounded-full bg-[#eef2f6]">
                <span
                  className={`block h-full rounded-full ${barCls(p.health)}`}
                  style={{ width: `${p.progress}%` }}
                />
              </span>
              <span className="w-[28px] shrink-0 text-right text-[9px] font-extrabold text-ink-900">
                {p.progress}%
              </span>
            </div>

            <div className="mt-auto flex items-center justify-between gap-1.5 pt-1.5">
              <span className="truncate text-[9px] text-ink-500" title={p.sponsor}>
                {p.sponsor}
              </span>
              <span className="shrink-0 text-[8.5px] font-extrabold text-ink-900">
                {rp(p.benefitYtdRpT)}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
