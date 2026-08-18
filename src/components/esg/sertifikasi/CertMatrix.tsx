"use client";

import { certMatrix } from "@/lib/esg-data";
import { SectionHead } from "@/components/hc/SectionHead";
import { ToneBadge, type BadgeTone } from "@/components/shared/ToneBadge";
import { useSubholding } from "@/components/SubholdingProvider";
import { filterBySubholding } from "@/lib/subholding";

const STATUS_TONE: Record<string, BadgeTone> = {
  "On-track": "good",
  "Perlu Akselerasi": "warn",
  Baseline: "neutral",
};

/** Warna latar sel mengikuti rasio unit tersertifikasi (heat-table). */
function heatCls(ratio: number) {
  if (ratio >= 0.85) return "bg-ptpn-greenLight text-ptpn-green";
  if (ratio >= 0.6) return "bg-[#e6f6f5] text-[#0d9488]";
  if (ratio >= 0.3) return "bg-[#fdf3e0] text-[#d98b06]";
  return "bg-[#fdecec] text-[#ef4444]";
}

const pct = (v: number) => `${v.toLocaleString("id-ID", { minimumFractionDigits: 1 })}%`;

export function CertMatrix() {
  const { active, isFiltered, def } = useSubholding();
  // `subholding` (PalmCo / SupportingCo / SGN) adalah dimensi subholding baris.
  const rows = filterBySubholding(certMatrix, active, (r) => r.subholding);

  return (
    <div
      className="card anim-rise flex h-full min-h-0 flex-col px-4 pb-2.5 pt-3"
      style={{ "--d": "60ms" } as React.CSSProperties}
    >
      <SectionHead title="Matriks Sertifikasi Subholding × Skema" action="Lihat Detail" />
      <p className="mt-[3px] text-[9px] text-ink-500">
        {isFiltered
          ? `Skema sertifikasi ${def.label} · Basis 76 Unit Kebun/PKS`
          : "Unit Tersertifikasi & % Areal · Basis 76 Unit Kebun/PKS"}
      </p>

      <div className="scroll-thin mt-2 min-h-0 flex-1 overflow-y-auto">
        <div className="scroll-thin overflow-x-auto">
        <table className="w-full border-collapse">
          <thead className="sticky top-0 bg-[var(--surface)]">
            <tr className="border-b border-[#eef2f6] text-left">
              <th className="pb-1.5 text-[8.5px] font-bold uppercase tracking-[0.04em] text-ink-400">
                Subholding
              </th>
              <th className="pb-1.5 text-[8.5px] font-bold uppercase tracking-[0.04em] text-ink-400">
                Skema
              </th>
              <th className="pb-1.5 text-right text-[8.5px] font-bold uppercase tracking-[0.04em] text-ink-400">
                Unit
              </th>
              <th className="pb-1.5 text-right text-[8.5px] font-bold uppercase tracking-[0.04em] text-ink-400">
                Cakupan
              </th>
              <th className="pb-1.5 text-right text-[8.5px] font-bold uppercase tracking-[0.04em] text-ink-400">
                % Areal
              </th>
              <th className="pb-1.5 text-right text-[8.5px] font-bold uppercase tracking-[0.04em] text-ink-400">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => {
              const ratio = r.certified / r.total;
              return (
                <tr key={`${r.subholding}-${r.skema}`} className="border-b border-[#f4f7fa]">
                  <td className="py-[7px] text-[9.5px] font-bold text-ink-900">{r.subholding}</td>
                  <td className="py-[7px] text-[9px] text-ink-700">{r.skema}</td>
                  <td className="py-[7px] text-right text-[9px] font-semibold text-ink-700">
                    {r.certified}/{r.total}
                  </td>
                  <td className="py-[7px] text-right">
                    <span
                      className={`inline-flex min-w-[42px] justify-center rounded-md px-1.5 py-[2px] text-[9px] font-extrabold ${heatCls(ratio)}`}
                    >
                      {Math.round(ratio * 100)}%
                    </span>
                  </td>
                  <td className="py-[7px] text-right text-[9px] font-semibold text-ink-700">
                    {r.arealPct === null ? "—" : pct(r.arealPct)}
                  </td>
                  <td className="py-[7px] text-right">
                    <ToneBadge label={r.status} tone={STATUS_TONE[r.status]} />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        </div>
      </div>

      <p className="pt-1.5 text-[9px] leading-snug text-ink-500">
        {isFiltered
          ? `Menampilkan ${rows.length} baris skema milik ${def.label}; basis unit tetap mengacu portofolio sertifikasi grup.`
          : "SGN memakai ISO 14001 di luar basis 76 unit sawit; RSPO SupportingCo (2/18) menjadi titik terlemah portofolio."}
      </p>
    </div>
  );
}
