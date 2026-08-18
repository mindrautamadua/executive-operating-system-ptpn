"use client";

import { CalendarClock } from "lucide-react";
import { criticalPath } from "@/lib/sms-data";
import { SectionHead } from "@/components/hc/SectionHead";
import { ToneBadge } from "@/components/shared/ToneBadge";
import { useSubholding } from "@/components/SubholdingProvider";
import { filterBySubholding } from "@/lib/subholding";

/** 7 milestone kritis dengan jatuh tempo ≤30 hari. */
export function CriticalPath30Days() {
  const { active, isFiltered, def } = useSubholding();
  // `pic` menyebut subholding pemilik (mis. "Dir. Produksi SGN"); PIC tingkat
  // Holding tidak mengacu ke satu subholding sehingga selalu tampil.
  const rows = filterBySubholding(criticalPath, active, (c) => c.pic);

  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-3 pt-3"
      style={{ "--d": "240ms" } as React.CSSProperties}
    >
      <SectionHead title="Critical Path ≤30 Hari" action="Lihat Semua" />
      <p className="mt-[3px] text-[9px] text-ink-500">
        {isFiltered
          ? `${rows.length} Milestone Kritis — Cakupan ${def.label} & Holding`
          : "7 Milestone Kritis Jatuh Tempo s.d. 30 Juni 2026"}
      </p>

      <ul className="mt-2 flex min-h-0 flex-1 flex-col justify-between gap-1">
        {rows.length === 0 && (
          <li className="text-[8.5px] text-ink-400">
            Tidak ada milestone kritis untuk cakupan ini.
          </li>
        )}
        {rows.map((c) => (
          <li
            key={c.milestone}
            className={`rounded-lg border px-2.5 py-[6px] ${
              c.risk === "Tinggi"
                ? "border-[#f6d5d5] bg-[#fdf5f5]"
                : "border-[#f3e3c3] bg-[#fdf9f0]"
            }`}
          >
            <div className="flex items-center justify-between gap-2">
              <span className="flex min-w-0 items-center gap-1.5">
                <CalendarClock
                  size={11}
                  className={`shrink-0 ${c.risk === "Tinggi" ? "text-[#ef4444]" : "text-[#d98b06]"}`}
                />
                <span className="truncate text-[9.5px] font-bold text-ink-900" title={c.milestone}>
                  {c.milestone}
                </span>
              </span>
              <ToneBadge
                label={`${c.sisaHari} hari`}
                tone={c.risk === "Tinggi" ? "bad" : "warn"}
              />
            </div>
            <div className="mt-[3px] flex items-center justify-between gap-2 text-[9px] text-ink-500">
              <span className="truncate">
                {c.program} · {c.pic}
              </span>
              <span className="shrink-0 font-semibold">Due {c.due}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
