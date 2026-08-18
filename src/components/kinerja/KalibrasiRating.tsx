"use client";

import { ArrowRight, Scale } from "lucide-react";
import { kalibrasiStatus, kalibrasiUnit } from "@/lib/kinerja-data";
import { useSubholding } from "@/components/SubholdingProvider";
import { orgDim } from "../ui/OrgScope";

const ADJ_TONE = {
  turun: "bg-[#fdf3e0] text-[#d98b06]",
  naik: "bg-ptpn-greenLight text-ptpn-green",
} as const;

/** Pre vs post calibration per unit — kontrol fairness rating antar-organisasi. */
export function KalibrasiRating() {
  const { active } = useSubholding();
  // Baris kalibrasi melekat pada unit organisasinya; unit di luar subholding
  // aktif diredupkan agar arah penyesuaian antar unit tetap dapat dibandingkan.

  return (
    <div className="card anim-rise flex h-full flex-col px-4 pb-2.5 pt-3">
      <div className="flex items-start justify-between gap-2">
        <div>
          <h3 className="card-title-navy">PERFORMANCE CALIBRATION</h3>
          <p className="mt-[3px] text-[9.5px] text-ink-500">
            Pre vs Post Calibration per Unit — Q2 2026
          </p>
        </div>
        <Scale size={14} className="shrink-0 text-ptpn-green" />
      </div>

      <div className="mt-2 flex min-h-0 flex-1 flex-col justify-around">
        {kalibrasiUnit.map((k) => (
          <div
            key={k.unit}
            className="flex items-center gap-2 transition-opacity"
            style={{ opacity: orgDim(active, k.unit) }}
          >
            <span className="w-[118px] shrink-0 truncate text-[9.5px] text-ink-700">
              {k.unit}
            </span>
            <span className="w-[28px] shrink-0 text-right text-[9.5px] tabular-nums text-ink-400">
              {k.pre}
            </span>
            <ArrowRight size={10} className="shrink-0 text-ink-400" />
            <span className="w-[28px] shrink-0 text-right text-[9.5px] font-bold tabular-nums text-ink-900">
              {k.post}
            </span>
            <span
              className={`ml-auto shrink-0 rounded px-1.5 py-[2px] text-[8.5px] font-bold tabular-nums ${ADJ_TONE[k.arah]}`}
            >
              {k.adj}
            </span>
          </div>
        ))}
      </div>

      <div className="mt-1.5 grid grid-cols-2 md:grid-cols-4 gap-1.5 border-t border-[#f0f3f6] pt-2">
        {kalibrasiStatus.map((s) => (
          <div key={s.label} className="leading-tight">
            <div className="text-[10.5px] font-extrabold tabular-nums text-ink-900">{s.value}</div>
            <div className="text-[9px] text-ink-500">{s.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
