"use client";

import { ArrowRight } from "lucide-react";
import { unitKompensasi } from "@/lib/comp-data";
import { PALETTE } from "@/lib/chart-palette";
import { useSubholding } from "@/components/SubholdingProvider";
import { orgDim } from "../ui/OrgScope";

const HEAD = [
  "Unit Organisasi",
  "Total Biaya (Rp)",
  "Rata-rata Gaji (Rp)",
  "Kenaikan Gaji Rata-rata",
  "Rasio Total Rewards",
  "Pay Equity Index",
];

/** Tone sel Pay Equity: makin jauh dari 1,00 makin perlu perhatian. */
function equityTone(v: number) {
  if (v >= 0.96) return "tone-green";
  if (v >= 0.94) return "tone-teal";
  return "tone-amber";
}

// rentang micro-bar rasio rewards (data 66,9–69,8%)
const RASIO_MIN = 60;
const RASIO_MAX = 75;

export function RingkasanUnitKompensasi() {
  const { active, isFiltered, def } = useSubholding();
  // Tabel pembanding antar entitas: baris di luar subholding aktif diredupkan
  // agar posisi relatif biaya, rata-rata gaji dan pay equity tetap terbaca.

  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-2.5 pt-3"
      style={{ "--d": "520ms" } as React.CSSProperties}
    >
      <h3 className="card-title-navy">Ringkasan Kompensasi per Unit Organisasi</h3>
      {isFiltered && (
        <p className="mt-[3px] text-[9px] text-ink-500">Unit {def.label} disorot</p>
      )}

      <div className="scroll-thin overflow-x-auto">
      <table className="mt-2 w-full">
        <thead>
          <tr className="border-b border-[#eef2f6] bg-[#f9fbfc]">
            {HEAD.map((h, i) => (
              <th
                key={h}
                className={`whitespace-nowrap px-2 pb-[6px] pt-[5px] text-[9px] font-semibold text-ink-500 ${
                  i === 0 ? "text-left" : "text-center"
                }`}
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {unitKompensasi.map((r, ri) => (
            <tr
              key={r.unit}
              className="border-b border-[#f4f7fa] transition-opacity last:border-0"
              style={{ opacity: orgDim(active, r.unit) }}
            >
              <td className="whitespace-nowrap px-2 py-[6px] text-[9.5px] text-ink-900">
                {r.unit}
              </td>
              <td className="px-2 text-center text-[9.5px] font-bold tabular-nums text-ink-900">
                {r.totalBiaya}
              </td>
              <td className="px-2 text-center text-[9.5px] tabular-nums text-ink-700">
                {r.rataGaji}
              </td>
              <td className="px-2 text-center text-[9.5px] tabular-nums text-ink-700">
                {r.kenaikan}
              </td>
              <td className="px-2">
                {/* micro-bar rasio rewards */}
                <div className="flex items-center justify-center gap-1.5">
                  <span className="h-[5px] w-[46px] overflow-hidden rounded-full bg-[#eef2f6]">
                    <span
                      className="anim-grow-x block h-full rounded-full"
                      style={
                        {
                          width: `${((r.rasioNum - RASIO_MIN) / (RASIO_MAX - RASIO_MIN)) * 100}%`,
                          background: PALETTE.green,
                          "--d": `${70 * ri}ms`,
                        } as React.CSSProperties
                      }
                    />
                  </span>
                  <span className="text-[9.5px] tabular-nums text-ink-700">{r.rasioRewards}</span>
                </div>
              </td>
              <td className="px-2 py-[3px] text-center">
                <span
                  className={`${equityTone(
                    r.payEquityNum
                  )} inline-block min-w-[38px] rounded-md px-1.5 py-[2px] text-[9.5px] font-bold tabular-nums`}
                >
                  {r.payEquity}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>

      <div className="min-h-0 flex-1" />

      <button className="link-more mt-1 flex items-center gap-1">
        Lihat semua unit organisasi <ArrowRight size={11} />
      </button>
    </div>
  );
}
