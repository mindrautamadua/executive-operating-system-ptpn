import { externalCounsel, externalCounselStats } from "@/lib/hkm-data-detail";
import { SectionHead } from "@/components/hc/SectionHead";
import { ScopeNote } from "@/components/ui/ScopeNote";
import { PALETTE } from "@/lib/chart-palette";

const skorColor = (s: number) => (s >= 88 ? PALETTE.green : s >= 80 ? PALETTE.amber : PALETTE.red);

const rp = (v: number) => `Rp ${v.toLocaleString("id-ID", { minimumFractionDigits: 1 })} M`;

/** Tabel kinerja firma hukum eksternal: beban perkara, biaya, dan skor. */
export function ExternalCounsel() {
  return (
    <div
      className="card anim-rise flex h-full min-h-0 flex-col px-4 pb-2.5 pt-3"
      style={{ "--d": "120ms" } as React.CSSProperties}
    >
      <SectionHead title="Firma Hukum Eksternal" action="Lihat Semua" badge={<ScopeNote />} />
      <p className="mt-[3px] text-[9px] text-ink-500">
        {externalCounselStats.jumlahFirma} Firma Retainer · {externalCounselStats.perkaraDitangani}{" "}
        Perkara Eksternal · {externalCounselStats.perkaraInHouse} In-House · Skor Rata-rata{" "}
        {externalCounselStats.skorRataRata.toLocaleString("id-ID", { minimumFractionDigits: 1 })}
      </p>

      <div className="scroll-thin mt-2 min-h-0 flex-1 overflow-y-auto">
        <div className="scroll-thin overflow-x-auto">
        <table className="w-full border-collapse">
          <thead className="sticky top-0 bg-[var(--surface)]">
            <tr className="border-b border-[#eef2f6] text-left">
              <th className="pb-1.5 text-[8.5px] font-bold uppercase tracking-[0.04em] text-ink-400">
                Firma
              </th>
              <th className="pb-1.5 text-[8.5px] font-bold uppercase tracking-[0.04em] text-ink-400">
                Spesialisasi
              </th>
              <th className="pb-1.5 text-right text-[8.5px] font-bold uppercase tracking-[0.04em] text-ink-400">
                Perkara
              </th>
              <th className="pb-1.5 text-right text-[8.5px] font-bold uppercase tracking-[0.04em] text-ink-400">
                Biaya YTD
              </th>
              <th className="pb-1.5 text-[8.5px] font-bold uppercase tracking-[0.04em] text-ink-400">
                Skor Kinerja
              </th>
              <th className="pb-1.5 text-[8.5px] font-bold uppercase tracking-[0.04em] text-ink-400">
                Hasil
              </th>
            </tr>
          </thead>
          <tbody>
            {externalCounsel.map((f) => (
              <tr key={f.firma} className="border-b border-[#f4f7fa]">
                <td className="py-[7px] pr-2 text-[9.5px] font-bold text-ink-900">{f.firma}</td>
                <td className="py-[7px] pr-2 text-[8.5px] text-ink-500">{f.spesialisasi}</td>
                <td className="py-[7px] pr-2 text-right text-[9px] font-semibold tabular-nums text-ink-700">
                  {f.perkaraDitangani}
                </td>
                <td className="whitespace-nowrap py-[7px] pr-2 text-right text-[9px] font-semibold tabular-nums text-ink-700">
                  {rp(f.biayaRpM)}
                </td>
                <td className="py-[7px] pr-2">
                  <div className="flex items-center gap-1.5">
                    <div className="h-[5px] w-[44px] shrink-0 overflow-hidden rounded-full bg-[#eef2f6]">
                      <div
                        className="h-full rounded-full"
                        style={{
                          width: `${f.skorKinerja}%`,
                          backgroundColor: skorColor(f.skorKinerja),
                        }}
                      />
                    </div>
                    <span className="text-[9px] font-bold tabular-nums text-ink-900">
                      {f.skorKinerja}
                    </span>
                  </div>
                </td>
                <td className="py-[7px] text-[8.5px] text-ink-500">{f.hasil}</td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      </div>

      <p className="pt-1.5 text-[9px] leading-snug text-ink-500">{externalCounselStats.note}</p>
    </div>
  );
}
