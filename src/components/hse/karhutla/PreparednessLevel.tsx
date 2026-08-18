"use client";

import { SIAGA_COLOR, preparednessLevel } from "@/lib/hse-data-detail";
import { SectionHead } from "@/components/hc/SectionHead";
import { useSubholding } from "@/components/SubholdingProvider";

/** Status kesiapsiagaan karhutla per regional (skor komposit grup 76). */
export function PreparednessLevel() {
  const { active, isFiltered, def } = useSubholding();
  // Regional 1–7 = wilayah operasi PalmCo (PTPN IV); tidak ada pecahan
  // kesiapsiagaan untuk SugarCo/SupportingCo.
  const luarCakupan = isFiltered && active !== "palmco";

  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-3 pt-3"
      style={{ "--d": "180ms" } as React.CSSProperties}
    >
      <SectionHead title="Tingkat Kesiapsiagaan" />
      <p className="mt-[3px] text-[9px] text-ink-500">
        {luarCakupan
          ? `Regional PalmCo — di luar cakupan ${def.label}`
          : "Skor Komposit Grup 76 · Status Siaga per Regional"}
      </p>

      <div
        className="mt-2 flex min-h-0 flex-1 flex-col justify-between transition-opacity"
        style={luarCakupan ? { opacity: 0.25 } : undefined}
      >
        {preparednessLevel.map((p) => (
          <div
            key={p.regional}
            className="flex items-center gap-2 rounded-lg px-1.5 py-[3px] transition-colors hover:bg-[#f5f8fa]"
          >
            <span
              className="h-[7px] w-[7px] shrink-0 rounded-full"
              style={{ backgroundColor: SIAGA_COLOR[p.status] }}
            />
            <span className="min-w-0 flex-1 truncate text-[9px] font-bold text-ink-900">
              {p.regional}
            </span>
            <span
              className="shrink-0 rounded-md px-1.5 py-[2px] text-[9px] font-extrabold text-white"
              style={{ backgroundColor: SIAGA_COLOR[p.status] }}
            >
              {p.status}
            </span>
            <span className="w-[22px] shrink-0 text-right text-[11px] font-extrabold tabular-nums text-ink-900">
              {p.skor}
            </span>
          </div>
        ))}
      </div>

      <p className="mt-1 border-t border-[#f5f8fa] pt-1.5 text-[8.5px] leading-snug text-ink-500">
        Simulasi terakhir Feb–Mei 2026; tiga regional berstatus Siaga menjelang puncak kering.
      </p>
    </div>
  );
}
