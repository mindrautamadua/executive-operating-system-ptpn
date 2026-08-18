"use client";

import { topCases } from "@/lib/asg-data";
import type { AstRiskLevel } from "@/lib/ast-core";
import { ToneBadge, type BadgeTone } from "@/components/shared/ToneBadge";
import { SectionHead } from "@/components/hc/SectionHead";
import { useSubholding } from "@/components/SubholdingProvider";
import { filterBySubholding } from "@/lib/subholding";

const num = (v: number) =>
  v.toLocaleString("id-ID", { minimumFractionDigits: 1, maximumFractionDigits: 1 });

const RISK_TONE: Record<AstRiskLevel, BadgeTone> = {
  Ekstrem: "bad",
  Tinggi: "bad",
  Sedang: "warn",
  Rendah: "good",
};

const COLS = "grid-cols-[minmax(0,1.6fr)_54px_minmax(0,1fr)_60px]";

/** 8 kasus sengketa terbesar: lokasi, luas, tahap proses, level risiko. */
export function TopDisputeCases() {
  const { active, isFiltered, def } = useSubholding();
  // Tiap kasus menyebut subholding pemilik arealnya (PalmCo / SGN / PTPN I).
  const rows = filterBySubholding(topCases, active, (c) => c.subholding);
  const luasRows = +rows.reduce((s, c) => s + c.luasRbHa, 0).toFixed(1);

  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-3 pt-3"
      style={{ "--d": "150ms" } as React.CSSProperties}
    >
      <SectionHead title="Kasus Sengketa Terbesar" action="Lihat Detail" />
      <p className="mt-[3px] text-[9px] text-ink-500">
        {isFiltered
          ? `${rows.length} Kasus Prioritas ${def.label} menurut Luas & Eksposur (rb ha)`
          : "8 Kasus Prioritas menurut Luas & Eksposur (rb ha)"}
      </p>

      <div
        className={`mt-2 grid ${COLS} items-center gap-x-2 pr-2 text-[9px] font-semibold uppercase tracking-[0.04em] text-ink-500`}
      >
        <span>Lokasi</span>
        <span className="text-right">Luas</span>
        <span>Tahap</span>
        <span className="text-right">Risiko</span>
      </div>

      <ul className="scroll-thin mt-1 flex min-h-0 flex-1 flex-col gap-1 overflow-y-auto pr-1">
        {rows.map((c) => (
          <li
            key={c.lokasi}
            className={`grid shrink-0 ${COLS} items-center gap-x-2 rounded-lg border border-[#eef2f6] bg-[#fbfcfd] px-2 py-1`}
          >
            <span className="min-w-0 leading-[1.25]">
              <span className="block truncate text-[9px] font-extrabold text-ink-900" title={c.lokasi}>
                {c.lokasi}
              </span>
              <span className="block text-[7.5px] text-ink-400">{c.subholding}</span>
            </span>
            <span className="text-right text-[9px] font-extrabold text-ink-900">
              {num(c.luasRbHa)}
            </span>
            <span className="min-w-0 truncate text-[8.5px] text-ink-500" title={c.note ?? c.tahap}>
              {c.tahap}
            </span>
            <span className="flex justify-end">
              <ToneBadge label={c.risiko} tone={RISK_TONE[c.risiko]} />
            </span>
          </li>
        ))}
      </ul>

      <p className="mt-1.5 text-[9px] leading-snug text-ink-500">
        {isFiltered ? (
          <>
            {rows.length} kasus prioritas {def.label} mencakup {num(luasRows)} rb ha dari 82,4 rb ha
            areal sengketa grup.
          </>
        ) : (
          <>
            8 kasus teratas mencakup 26,8 rb ha (33% areal sengketa) — 5 di antaranya berisiko
            tinggi atau ekstrem.
          </>
        )}
      </p>
    </div>
  );
}
