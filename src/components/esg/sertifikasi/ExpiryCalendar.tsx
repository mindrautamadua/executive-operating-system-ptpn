"use client";

import { expiryCalendar } from "@/lib/esg-data";
import { SectionHead } from "@/components/hc/SectionHead";
import { ToneBadge, type BadgeTone } from "@/components/shared/ToneBadge";
import { useSubholding } from "@/components/SubholdingProvider";

const STATUS_TONE: Record<string, BadgeTone> = {
  "Audit terjadwal": "good",
  "Closing NC": "warn",
  "Perlu penjadwalan": "bad",
};

/** Warna sisa waktu: <=3 bulan mendesak, <=6 bulan waspada. */
function sisaCls(bulan: number) {
  if (bulan <= 3) return "text-[#ef4444]";
  if (bulan <= 6) return "text-[#d98b06]";
  return "text-ink-500";
}

export function ExpiryCalendar() {
  const { active, def } = useSubholding();
  // Seluruh sertifikat yang jatuh tempo melekat pada unit PKS & kebun sawit —
  // cakupan PalmCo.
  const outOfScope = active !== "all" && active !== "palmco";

  return (
    <div
      className="card anim-rise flex h-full min-h-0 flex-col px-4 pb-2.5 pt-3"
      style={{ "--d": "180ms" } as React.CSSProperties}
    >
      <SectionHead title="Kalender Kedaluwarsa Sertifikat" action="Lihat Semua" />
      <p className="mt-[3px] text-[9px] text-ink-500">
        {outOfScope
          ? `Sertifikat jatuh tempo berada di unit PKS & kebun sawit PalmCo — di luar cakupan ${def.label}`
          : "9 Sertifikat Habis ≤12 Bulan (s.d. Mei 2027)"}
      </p>

      <div
        className="scroll-thin mt-2 flex min-h-0 flex-1 flex-col gap-1.5 overflow-y-auto pr-1 transition-opacity"
        style={{ opacity: outOfScope ? 0.25 : 1 }}
      >
        {expiryCalendar.map((c) => (
          <div
            key={`${c.unit}-${c.skema}`}
            className="flex items-center gap-2 rounded-xl border border-[#eef2f6] px-2.5 py-[7px]"
          >
            <div className="min-w-0 flex-1">
              <div className="truncate text-[9.5px] font-bold text-ink-900">{c.unit}</div>
              <div className="mt-[2px] text-[9px] text-ink-500">
                {c.skema} · habis {c.habis}
              </div>
            </div>
            <span className={`shrink-0 text-[9px] font-extrabold ${sisaCls(c.sisaBulan)}`}>
              {c.sisaBulan} bln
            </span>
            <ToneBadge label={c.status} tone={STATUS_TONE[c.status]} />
          </div>
        ))}
      </div>

      <p className="pt-1.5 text-[9px] leading-snug text-ink-500">
        PKS Adolina (2 bulan, closing NC) paling mendesak; 4 sertifikat masih berstatus perlu
        penjadwalan.
      </p>
    </div>
  );
}
