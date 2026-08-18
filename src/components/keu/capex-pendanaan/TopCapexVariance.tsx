"use client";

import { topVariance } from "@/lib/kcx-data";
import { fmtId } from "@/lib/keu-core";
import { SectionHead } from "@/components/hc/SectionHead";
import { ToneBadge, type BadgeTone } from "@/components/shared/ToneBadge";
import { useSubholding } from "@/components/SubholdingProvider";
import { filterBySubholding } from "@/lib/subholding";

const TONE_LABEL: Record<string, { label: string; tone: BadgeTone }> = {
  good: { label: "On Track", tone: "good" },
  warn: { label: "Perlu Atensi", tone: "warn" },
  bad: { label: "Tertinggal", tone: "bad" },
};

const BAR_COLOR: Record<string, string> = {
  good: "bg-ptpn-green",
  warn: "bg-[#f5a524]",
  bad: "bg-[#ef4444]",
};

export function TopCapexVariance() {
  const { active, isFiltered, def } = useSubholding();
  // Nama proyek menyebut subholding (mis. "Replanting PalmCo Regional 4-5");
  // proyek lintas grup tanpa penyebutan subholding tetap tampil.
  const rows = filterBySubholding(topVariance, active, (p) => p.project);

  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-3 pt-3"
      style={{ "--d": "300ms" } as React.CSSProperties}
    >
      <SectionHead title="Top Capex Variance" action="Lihat Semua" />
      <p className="mt-[3px] text-[9px] text-ink-500">
        Proyek dengan Deviasi Progres Terbesar vs Plafon RKAP
        {isFiltered ? ` — ${def.label} & proyek lintas grup` : ""}
      </p>

      <div className="mt-2 grid grid-cols-[minmax(0,1fr)_100px_76px] gap-x-3 border-b border-[#f0f3f6] pb-1 text-[9px] font-bold uppercase tracking-[0.04em] text-ink-500">
        <span>Proyek</span>
        <span>Progress vs RKAP</span>
        <span className="text-right">Status</span>
      </div>

      <div className="scroll-thin min-h-0 flex-1 overflow-y-auto">
        {rows.map((p) => {
          const badge = TONE_LABEL[p.tone];
          return (
            <div
              key={p.project}
              className="grid grid-cols-[minmax(0,1fr)_100px_76px] items-center gap-x-3 border-b border-[#f5f8fa] py-[5px] last:border-0"
            >
              <div className="min-w-0">
                <div className="truncate text-[9px] font-bold text-ink-900" title={p.project}>
                  {p.project}
                </div>
                <div className="truncate text-[9px] text-ink-500" title={p.keterangan}>
                  {p.kategori} · {p.keterangan}
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between text-[9px] text-ink-500">
                  <span>
                    Rp {fmtId(p.actualRpT, 2)} / {fmtId(p.planRpT, 1)} T
                  </span>
                  <span className="font-bold text-ink-900">{fmtId(p.progressPct, 1)}%</span>
                </div>
                <div className="mt-[3px] h-[4px] w-full overflow-hidden rounded-full bg-[#eef2f6]">
                  <div
                    className={`h-full rounded-full ${BAR_COLOR[p.tone]}`}
                    style={{ width: `${Math.min(100, p.progressPct)}%` }}
                  />
                </div>
              </div>
              <div className="text-right">
                <ToneBadge label={badge.label} tone={badge.tone} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
