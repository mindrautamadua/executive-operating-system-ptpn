"use client";

import { hseByRegional, HSE_RISK_COLOR } from "@/lib/hse-data";
import { SectionHead } from "@/components/hc/SectionHead";
import { useSubholding } from "@/components/SubholdingProvider";

const num = (v: number) => v.toLocaleString("id-ID");
const ltifrLabel = (v: number) => v.toLocaleString("id-ID", { minimumFractionDigits: 2 });

const maxKecelakaan = Math.max(...hseByRegional.map((r) => r.kecelakaan));
const maxPencurian = Math.max(...hseByRegional.map((r) => r.pencurian));
const totalKecelakaan = hseByRegional.reduce((a, r) => a + r.kecelakaan, 0);
const totalTitikApi = hseByRegional.reduce((a, r) => a + r.titikApi, 0);
const totalPencurian = hseByRegional.reduce((a, r) => a + r.pencurian, 0);

/** Heat strip eksposur K3 & keamanan 7 regional: kecelakaan, LTIFR, titik api, pencurian. */
export function HseRegionalStrip() {
  const { active, isFiltered, def } = useSubholding();
  // Regional 1–7 adalah wilayah kebun & PKS PalmCo (PTPN IV) — lih. catatan pada
  // hse-data.ts. Eksposur ini tidak punya pecahan untuk SugarCo/SupportingCo,
  // jadi tabelnya diredupkan (bukan dikosongkan) di luar cakupan PalmCo.
  const luarCakupan = isFiltered && active !== "palmco";

  return (
    <div
      className="card anim-rise flex h-full min-h-0 flex-col px-4 pb-2.5 pt-3"
      style={{ "--d": "120ms" } as React.CSSProperties}
    >
      <SectionHead title="Heat Strip Regional" action="Lihat Detail" />
      <p className="mt-[3px] text-[9px] text-ink-500">
        {luarCakupan ? (
          <>7 Regional adalah wilayah operasi PalmCo — di luar cakupan {def.label}</>
        ) : (
          <>
            Eksposur K3 &amp; Keamanan 7 Regional YTD · {num(totalKecelakaan)} kecelakaan ·{" "}
            {num(totalTitikApi)} titik api · {num(totalPencurian)} kasus pencurian
          </>
        )}
      </p>

      <div
        className="mt-2 min-h-0 flex-1 overflow-hidden transition-opacity"
        style={luarCakupan ? { opacity: 0.25 } : undefined}
      >
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-[#eef2f6] text-left">
              <th className="pb-1.5 text-[8.5px] font-bold uppercase tracking-[0.04em] text-ink-400">
                Regional
              </th>
              <th className="pb-1.5 text-[8.5px] font-bold uppercase tracking-[0.04em] text-ink-400">
                Kecelakaan
              </th>
              <th className="pb-1.5 text-right text-[8.5px] font-bold uppercase tracking-[0.04em] text-ink-400">
                LTIFR
              </th>
              <th className="pb-1.5 text-right text-[8.5px] font-bold uppercase tracking-[0.04em] text-ink-400">
                Titik Api
              </th>
              <th className="pb-1.5 text-[8.5px] font-bold uppercase tracking-[0.04em] text-ink-400">
                Pencurian TBS
              </th>
              <th className="pb-1.5 text-right text-[8.5px] font-bold uppercase tracking-[0.04em] text-ink-400">
                Risiko
              </th>
            </tr>
          </thead>
          <tbody>
            {hseByRegional.map((r) => (
              <tr key={r.regional} className="border-b border-[#f4f7fa]">
                <td className="py-[6px] pr-2 text-[9.5px] font-bold text-ink-900">{r.regional}</td>
                <td className="py-[6px] pr-3">
                  <div className="flex items-center gap-1.5">
                    <div className="h-[5px] w-full overflow-hidden rounded-full bg-[#eef2f6]">
                      <div
                        className="h-full rounded-full bg-[#3b7ded]"
                        style={{ width: `${(r.kecelakaan / maxKecelakaan) * 100}%` }}
                      />
                    </div>
                    <span className="w-[16px] shrink-0 text-right text-[9px] font-bold text-ink-900">
                      {num(r.kecelakaan)}
                    </span>
                  </div>
                </td>
                <td className="py-[6px] pr-2 text-right text-[9px] font-semibold text-ink-700">
                  {ltifrLabel(r.ltifr)}
                </td>
                <td className="py-[6px] pr-2 text-right text-[9px] font-semibold text-ink-700">
                  {num(r.titikApi)}
                </td>
                <td className="py-[6px] pr-3">
                  <div className="flex items-center gap-1.5">
                    <div className="h-[5px] w-full overflow-hidden rounded-full bg-[#eef2f6]">
                      <div
                        className="h-full rounded-full bg-[#f5a524]"
                        style={{ width: `${(r.pencurian / maxPencurian) * 100}%` }}
                      />
                    </div>
                    <span className="w-[20px] shrink-0 text-right text-[9px] font-bold text-ink-900">
                      {num(r.pencurian)}
                    </span>
                  </div>
                </td>
                <td className="py-[6px] text-right">
                  <span
                    className="inline-flex shrink-0 items-center gap-1 whitespace-nowrap text-[8.5px] font-extrabold"
                    style={{ color: HSE_RISK_COLOR[r.risiko] }}
                  >
                    <span
                      className="h-[7px] w-[7px] rounded-full"
                      style={{ backgroundColor: HSE_RISK_COLOR[r.risiko] }}
                    />
                    {r.risiko}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="pt-1.5 text-[9px] leading-snug text-ink-500">
        Regional 3, 5, dan 6 memikul 13 dari 18 titik api dan 204 dari 312 kasus pencurian — tiga
        regional yang sama menjadi sasaran prioritas satgas pengamanan dan kesiapan karhutla.
      </p>
    </div>
  );
}
