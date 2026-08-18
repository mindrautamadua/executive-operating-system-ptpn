"use client";

import {
  INV_HURDLE_RATE_PCT,
  TOP_PROJECTS_NILAI_RP_T,
  TOP_PROJECTS_PORSI_PCT,
  topProjects,
  type ProjectStatus,
} from "@/lib/inv-data";
import { SectionHead } from "@/components/hc/SectionHead";
import { ToneBadge, type BadgeTone } from "@/components/shared/ToneBadge";
import { PALETTE } from "@/lib/chart-palette";
import { useSubholding } from "@/components/SubholdingProvider";
import { filterBySubholding } from "@/lib/subholding";

const num = (v: number) =>
  v.toLocaleString("id-ID", { minimumFractionDigits: 1, maximumFractionDigits: 1 });

const STATUS_TONE: Record<ProjectStatus, BadgeTone> = {
  "On Track": "good",
  Waspada: "warn",
  Terlambat: "bad",
};

const STATUS_BAR: Record<ProjectStatus, string> = {
  "On Track": PALETTE.green,
  Waspada: PALETTE.amber,
  Terlambat: PALETTE.red,
};

/** Delapan proyek terbesar: progress fisik, IRR, status & penanda PSN. */
export function TopProjects() {
  const { active, isFiltered, def } = useSubholding();
  // Nama proyek menyebut subholding pelaksananya (SGN, PalmCo, PTPN I); proyek
  // lintas subholding (mis. ERP grup, biogas 18 PKS) tetap tampil.
  const rows = filterBySubholding(topProjects, active, (p) => p.nama);
  const nilaiRows = +rows.reduce((s, p) => s + p.nilaiRpT, 0).toFixed(1);

  return (
    <div
      className="card anim-rise flex h-full min-h-0 flex-col px-4 pb-2.5 pt-3"
      style={{ "--d": "120ms" } as React.CSSProperties}
    >
      <SectionHead
        title={isFiltered ? `Proyek Terbesar — ${def.label}` : "8 Proyek Terbesar"}
        action="Lihat Semua"
      />
      <p className="mt-[3px] text-[9px] text-ink-500">
        {isFiltered ? (
          <>
            {rows.length} proyek · Rp {num(nilaiRows)} T · Hurdle Rate {num(INV_HURDLE_RATE_PCT)}%
          </>
        ) : (
          <>
            Rp {num(TOP_PROJECTS_NILAI_RP_T)} T · {num(TOP_PROJECTS_PORSI_PCT)}% Pipeline · Hurdle
            Rate {num(INV_HURDLE_RATE_PCT)}%
          </>
        )}
      </p>

      <div className="scroll-thin mt-2 min-h-0 flex-1 overflow-y-auto pr-1">
        <table className="w-full border-collapse">
          <thead className="sticky top-0 bg-[var(--surface)]">
            <tr className="border-b border-[#eef2f6] text-left">
              <th className="pb-1.5 text-[8.5px] font-bold uppercase tracking-[0.04em] text-ink-400">
                Proyek
              </th>
              <th className="pb-1.5 text-[8.5px] font-bold uppercase tracking-[0.04em] text-ink-400">
                Tahap
              </th>
              <th className="pb-1.5 text-right text-[8.5px] font-bold uppercase tracking-[0.04em] text-ink-400">
                Nilai
              </th>
              <th className="w-[110px] pb-1.5 text-[8.5px] font-bold uppercase tracking-[0.04em] text-ink-400">
                Progress
              </th>
              <th className="pb-1.5 text-right text-[8.5px] font-bold uppercase tracking-[0.04em] text-ink-400">
                IRR
              </th>
              <th className="pb-1.5 text-[8.5px] font-bold uppercase tracking-[0.04em] text-ink-400">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((p) => (
              <tr key={p.id} className="border-b border-[#f4f7fa]">
                <td className="py-[7px] pr-2">
                  <div className="flex items-center gap-1.5">
                    <span className="min-w-0 truncate text-[9.5px] font-bold text-ink-900">
                      {p.nama}
                    </span>
                    {p.isPsn && <ToneBadge label="PSN" tone="info" />}
                  </div>
                  <span className="text-[9px] text-ink-500">{p.sektor}</span>
                </td>
                <td className="py-[7px] pr-2 text-[9px] text-ink-700">{p.tahap}</td>
                <td className="whitespace-nowrap py-[7px] pr-2 text-right text-[9px] font-semibold text-ink-700">
                  Rp {num(p.nilaiRpT)} T
                </td>
                <td className="py-[7px] pr-2">
                  <div className="flex items-center gap-1.5">
                    <div className="h-[7px] min-w-0 flex-1 overflow-hidden rounded-full bg-[#eef2f6]">
                      <div
                        className="h-full rounded-full"
                        style={{
                          width: `${p.progress}%`,
                          backgroundColor: STATUS_BAR[p.status],
                        }}
                      />
                    </div>
                    <span className="w-[24px] shrink-0 text-right text-[8.5px] font-bold text-ink-700">
                      {p.progress}%
                    </span>
                  </div>
                </td>
                <td
                  className={`whitespace-nowrap py-[7px] pr-2 text-right text-[9px] font-bold ${
                    p.irr >= INV_HURDLE_RATE_PCT ? "text-ptpn-green" : "text-[#ef4444]"
                  }`}
                >
                  {num(p.irr)}%
                </td>
                <td className="py-[7px]">
                  <ToneBadge label={p.status} tone={STATUS_TONE[p.status]} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="pt-1.5 text-[9px] leading-snug text-ink-500">
        {isFiltered
          ? `Termasuk proyek lintas subholding yang juga menyentuh ${def.label}; nilai grup penuh Rp ${num(TOP_PROJECTS_NILAI_RP_T)} T.`
          : "Lima dari enam proyek strategis nasional berada di daftar ini; hanya Kawasan Industri PTPN I yang ber-IRR di bawah hurdle rate sekaligus berstatus terlambat."}
      </p>
    </div>
  );
}
