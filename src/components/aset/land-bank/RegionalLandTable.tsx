"use client";

import { regionalLand } from "@/lib/alb-data";
import { ToneBadge, type BadgeTone } from "@/components/shared/ToneBadge";
import { SectionHead } from "@/components/hc/SectionHead";
import { useSubholding } from "@/components/SubholdingProvider";
import { filterBySubholding } from "@/lib/subholding";

const num = (v: number) =>
  v.toLocaleString("id-ID", { minimumFractionDigits: 1, maximumFractionDigits: 1 });

/** Status HGU per wilayah ditentukan porsi areal yang habis < 5 tahun. */
function statusHgu(habisPct: number): { label: string; tone: BadgeTone } {
  if (habisPct >= 40) return { label: "Kritis", tone: "bad" };
  if (habisPct >= 20) return { label: "Waspada", tone: "warn" };
  return { label: "Aman", tone: "good" };
}

const COLS = "grid-cols-[minmax(0,1.5fr)_52px_58px_58px_56px_58px]";

/**
 * Pemetaan domain: Regional 1–7 adalah wilayah kebun sawit milik PalmCo;
 * baris "SGN (Lahan Tebu)" milik SugarCo dan "PTPN I" milik SupportingCo.
 */
const wilayahSubholding = (wilayah: string) =>
  wilayah.startsWith("Regional") ? "PalmCo" : wilayah;

/** Tabel lahan per regional: total, bersertifikat, habis <5 thn, sengketa, status. */
export function RegionalLandTable() {
  const { active, isFiltered, def } = useSubholding();
  const rows = filterBySubholding(regionalLand, active, (r) => wilayahSubholding(r.wilayah));

  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-3 pt-3"
      style={{ "--d": "180ms" } as React.CSSProperties}
    >
      <SectionHead title="Lahan per Wilayah" action="Lihat Detail" />
      <p className="mt-[3px] text-[9px] text-ink-500">
        {isFiltered
          ? `Total, Sertifikasi, Expiry & Sengketa — wilayah ${def.label} (rb ha)`
          : "Total, Sertifikasi, Expiry & Sengketa per Wilayah (rb ha)"}
      </p>

      <div
        className={`mt-2 grid ${COLS} items-center gap-x-2 pr-2 text-[9px] font-semibold uppercase tracking-[0.04em] text-ink-500`}
      >
        <span>Wilayah</span>
        <span className="text-right">Total</span>
        <span className="text-right">Sertifikat</span>
        <span className="text-right">Habis 5Th</span>
        <span className="text-right">Sengketa</span>
        <span className="text-right">Status HGU</span>
      </div>

      <ul className="scroll-thin mt-1 flex min-h-0 flex-1 flex-col gap-1 overflow-y-auto pr-1">
        {rows.map((r) => {
          const sertPct = (r.bersertifikatRbHa / r.totalRbHa) * 100;
          const habisPct = (r.habis5ThnRbHa / r.totalRbHa) * 100;
          const st = statusHgu(habisPct);
          return (
            <li
              key={r.wilayah}
              className={`grid shrink-0 ${COLS} items-center gap-x-2 rounded-lg border border-[#eef2f6] bg-[#fbfcfd] px-2 py-1`}
            >
              <span className="min-w-0 leading-[1.25]">
                <span className="block truncate text-[9px] font-extrabold text-ink-900">
                  {r.wilayah}
                </span>
                <span className="block text-[7.5px] text-ink-400">
                  Sertifikasi {sertPct.toLocaleString("id-ID", { maximumFractionDigits: 0 })}%
                </span>
              </span>
              <span className="text-right text-[9px] font-extrabold text-ink-900">{r.totalRbHa}</span>
              <span className="text-right text-[9px] font-extrabold text-ptpn-green">
                {r.bersertifikatRbHa}
              </span>
              <span
                className={`text-right text-[9px] font-extrabold ${
                  habisPct >= 20 ? "text-[#d98b06]" : "text-ink-700"
                }`}
              >
                {r.habis5ThnRbHa}
              </span>
              <span className="text-right text-[9px] font-extrabold text-[#ef4444]">
                {num(r.sengketaRbHa)}
              </span>
              <span className="flex justify-end">
                <ToneBadge label={st.label} tone={st.tone} />
              </span>
            </li>
          );
        })}
      </ul>

      <p className="mt-1.5 text-[9px] leading-snug text-ink-500">
        {active === "all" || active === "palmco" ? (
          <>
            Regional 2 &amp; 3 menahan 98 rb ha expiry (52% &amp; 44% dari luasnya) — prioritas
            percepatan perpanjangan.
          </>
        ) : (
          <>Konsentrasi expiry &lt; 5 tahun grup berada di Regional 2 &amp; 3 (PalmCo).</>
        )}
      </p>
    </div>
  );
}
