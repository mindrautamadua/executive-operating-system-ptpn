"use client";

import { unitProduktivitas } from "@/lib/produktivitas-data";
import { PALETTE, SEMANTIC } from "@/lib/chart-palette";
import { useSubholding } from "@/components/SubholdingProvider";
import { orgDim } from "../ui/OrgScope";

const INDEX_MAX = 130;

function toneIndex(index: number) {
  if (index >= 110) return SEMANTIC.good;
  if (index >= 100) return SEMANTIC.goodSoft;
  if (index >= 95) return SEMANTIC.warn;
  return SEMANTIC.bad;
}

export function ProduktivitasUnitKerja() {
  const { active, isFiltered, def } = useSubholding();
  // Tabel liga antar entitas: baris di luar subholding aktif diredupkan (bukan
  // dibuang) agar posisi relatif dan gap produktivitasnya tetap terbaca; baris
  // total grup selalu penuh sebagai garis acuan.

  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-3 pt-3"
      style={{ "--d": "120ms" } as React.CSSProperties}
    >
      <h3 className="card-title-navy">2. Produktivitas per Unit Kerja</h3>
      <p className="mt-[3px] text-[9.5px] text-ink-500">
        {isFiltered
          ? `Perbandingan Antar Sub Holding / Regional — ${def.label} disorot`
          : "Perbandingan Antar Sub Holding / Regional"}
      </p>

      <div className="mt-2 min-h-0 flex-1">
        <div className="scroll-thin overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-[#eef2f6] text-[8.5px] font-semibold text-ink-500">
              <th className="pb-[6px] text-left font-semibold">Unit Kerja</th>
              <th className="pb-[6px] text-right font-semibold">
                Revenue /<br />Employee (Rp)
              </th>
              <th className="pb-[6px] text-right font-semibold">
                Production /<br />Employee (Ton)
              </th>
              <th className="pb-[6px] pl-3 text-left font-semibold">
                Productivity Index<br />(Base 100)
              </th>
            </tr>
          </thead>
          <tbody>
            {unitProduktivitas.map((u) => (
              <tr
                key={u.unit}
                className={`border-b border-[#f5f8fa] transition-[background-color,opacity] last:border-0 hover:bg-[#f5f8fa] ${
                  u.total ? "bg-[#f7f9fb]" : ""
                }`}
                style={{ opacity: orgDim(active, u.unit, u.total) }}
              >
                <td
                  className={`whitespace-nowrap py-[6px] text-[9.5px] text-ink-900 ${
                    u.total ? "font-bold" : "font-semibold"
                  }`}
                >
                  {u.unit}
                </td>
                <td
                  className={`py-[6px] text-right text-[9.5px] tabular-nums text-ink-700 ${
                    u.total ? "font-bold text-ink-900" : "font-medium"
                  }`}
                >
                  {u.revenue}
                </td>
                <td
                  className={`py-[6px] text-right text-[9.5px] tabular-nums text-ink-700 ${
                    u.total ? "font-bold text-ink-900" : "font-medium"
                  }`}
                >
                  {u.produksi}
                </td>
                <td className="py-[6px] pl-3">
                  <div className="flex items-center gap-2">
                    <span
                      className={`w-7 shrink-0 text-[9.5px] tabular-nums text-ink-900 ${
                        u.total ? "font-bold" : "font-semibold"
                      }`}
                    >
                      {u.index}
                    </span>
                    <span className="h-[6px] w-full max-w-[72px] overflow-hidden rounded-full bg-[#eef2f6]">
                      <span
                        className="block h-full rounded-full"
                        style={{
                          width: `${(u.index / INDEX_MAX) * 100}%`,
                          background: u.total ? PALETTE.slate : toneIndex(u.index),
                        }}
                      />
                    </span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      </div>
    </div>
  );
}
