"use client";

import { sugarMillHealth, sugarMillNote, type SugarMillStatus } from "@/lib/afs-data";
import { ToneBadge, type BadgeTone } from "@/components/shared/ToneBadge";
import { SectionHead } from "@/components/hc/SectionHead";
import { useSubholding } from "@/components/SubholdingProvider";

const num = (v: number) =>
  v.toLocaleString("id-ID", { minimumFractionDigits: 1, maximumFractionDigits: 1 });

const STATUS_TONE: Record<SugarMillStatus, BadgeTone> = {
  Sehat: "good",
  Waspada: "warn",
  Merah: "bad",
};

const COLS = "grid-cols-[minmax(0,1.4fr)_52px_50px_52px_62px_54px]";

/** Kesehatan 17 PG: kapasitas, utilisasi, rendemen, laba-rugi unit, status. */
export function SugarMillHealth() {
  const { active } = useSubholding();
  // Pemetaan domain: PG (gula, musim giling) seluruhnya milik SugarCo.
  const outOfScope = active !== "all" && active !== "sugarco";

  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-3 pt-3"
      style={{ "--d": "90ms" } as React.CSSProperties}
    >
      <SectionHead title="Kesehatan 17 Pabrik Gula" action="Lihat Detail" />
      <p className="mt-[3px] text-[9px] text-ink-500">
        {outOfScope
          ? "Portofolio pabrik gula hanya untuk SugarCo"
          : "Utilisasi, Rendemen & Proyeksi Laba-Rugi Unit FY 2026 · 11 PG merah"}
      </p>

      <div
        className={`mt-2 grid ${COLS} items-center gap-x-2 pr-2 text-[9px] font-semibold uppercase tracking-[0.04em] text-ink-500`}
      >
        <span>Pabrik Gula</span>
        <span className="text-right">TCD</span>
        <span className="text-right">Util.</span>
        <span className="text-right">Rendemen</span>
        <span className="text-right">L/R (Rp M)</span>
        <span className="text-right">Status</span>
      </div>

      <ul
        className="scroll-thin mt-1 flex min-h-0 flex-1 flex-col gap-1 overflow-y-auto pr-1 transition-opacity"
        style={{ opacity: outOfScope ? 0.25 : 1 }}
      >
        {sugarMillHealth.map((p) => (
          <li
            key={p.nama}
            className={`grid shrink-0 ${COLS} items-center gap-x-2 rounded-lg border border-[#eef2f6] bg-[#fbfcfd] px-2 py-1`}
          >
            <span className="min-w-0 leading-[1.25]">
              <span className="block truncate text-[9px] font-extrabold text-ink-900">{p.nama}</span>
              <span className="block text-[7.5px] text-ink-400">{p.wilayah}</span>
            </span>
            <span className="text-right text-[9px] font-semibold text-ink-700">
              {p.kapasitasTcd.toLocaleString("id-ID")}
            </span>
            <span
              className={`text-right text-[9px] font-extrabold ${
                p.utilisasiPct < 70 ? "text-[#ef4444]" : "text-ptpn-green"
              }`}
            >
              {p.utilisasiPct}%
            </span>
            <span
              className={`text-right text-[9px] font-extrabold ${
                p.rendemenPct < 7.45 ? "text-[#d98b06]" : "text-ptpn-green"
              }`}
            >
              {num(p.rendemenPct)}%
            </span>
            <span
              className={`text-right text-[9px] font-extrabold ${
                p.labaRugiRpM < 0 ? "text-[#ef4444]" : "text-ptpn-green"
              }`}
            >
              {p.labaRugiRpM > 0 ? "+" : ""}
              {p.labaRugiRpM.toLocaleString("id-ID")}
            </span>
            <span className="flex justify-end">
              <ToneBadge label={p.status} tone={STATUS_TONE[p.status]} />
            </span>
          </li>
        ))}
      </ul>

      <p className="mt-1.5 line-clamp-2 text-[9px] leading-snug text-ink-500">{sugarMillNote}</p>
    </div>
  );
}
