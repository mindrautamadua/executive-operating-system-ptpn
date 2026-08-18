import { fatalityCases, fatalityFootnote } from "@/lib/hse-data";
import { SectionHead } from "@/components/hc/SectionHead";
import { ScopeNote } from "@/components/ui/ScopeNote";
import { ToneBadge } from "@/components/shared/ToneBadge";

/**
 * Dua insiden fatal YTD disajikan faktual untuk pembelajaran organisasi dan
 * pemantauan tindakan korektif — tanpa identitas dan tanpa detail yang tidak
 * diperlukan untuk pengambilan keputusan.
 */
export function FatalityCases() {
  return (
    <div
      className="card anim-rise flex h-full min-h-0 flex-col px-4 pb-2.5 pt-3"
      style={{ "--d": "60ms" } as React.CSSProperties}
    >
      <SectionHead title="Insiden Fatal: Pembelajaran & Tindakan Korektif" action="Lihat Detail" badge={<ScopeNote />} />
      <p className="mt-[3px] text-[9px] text-ink-500">
        2 Insiden Fatal YTD 2026 · investigasi tuntas · 7 dari 14 rekomendasi ditutup
      </p>

      <div className="mt-2 grid min-h-0 flex-1 grid-cols-2 gap-2.5">
        {fatalityCases.map((c) => (
          <div
            key={c.kode}
            className="flex min-h-0 flex-col rounded-xl border border-[#eef2f6] bg-[#f8fafc] px-3 pb-2.5 pt-2.5"
          >
            <div className="flex items-center justify-between gap-2">
              <div className="flex min-w-0 items-center gap-1.5">
                <span className="shrink-0 text-[9px] font-extrabold text-ink-500">{c.kode}</span>
                <span className="truncate text-[9.5px] font-bold text-ink-900">
                  {c.aktivitas} · {c.regional}
                </span>
              </div>
              <span className="shrink-0 text-[8.5px] font-semibold text-ink-400">{c.periode}</span>
            </div>

            <div className="mt-1.5 flex items-center gap-1.5">
              <ToneBadge label={`Investigasi ${c.statusInvestigasi}`} tone="good" />
              <ToneBadge
                label={`Rekomendasi ${c.statusRekomendasi}`}
                tone={c.statusRekomendasi === "Tuntas" ? "good" : "warn"}
              />
              <span className="text-[8.5px] font-semibold text-ink-500">
                {c.rekomendasiDitutup}/{c.rekomendasi} ditutup
              </span>
            </div>

            <div className="mt-1.5 h-[5px] overflow-hidden rounded-full bg-[#eef2f6]">
              <div
                className="h-full rounded-full bg-ptpn-green"
                style={{ width: `${(c.rekomendasiDitutup / c.rekomendasi) * 100}%` }}
              />
            </div>

            <div className="mt-2">
              <div className="text-[9px] font-bold uppercase tracking-[0.04em] text-ink-500">
                Kronologi Ringkas
              </div>
              <p className="mt-[3px] text-[8.5px] leading-[1.45] text-ink-700">{c.kronologi}</p>
            </div>

            <div className="mt-2 min-h-0 flex-1">
              <div className="text-[9px] font-bold uppercase tracking-[0.04em] text-ink-500">
                Akar Masalah
              </div>
              <ul className="mt-[3px] flex flex-col gap-[3px]">
                {c.akarMasalah.map((a) => (
                  <li key={a} className="flex items-start gap-1.5">
                    <span className="mt-[5px] h-[4px] w-[4px] shrink-0 rounded-full bg-[#f5a524]" />
                    <span className="text-[8.5px] leading-[1.4] text-ink-500">{a}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

      <p className="pt-2 text-[9px] leading-snug text-ink-500">{fatalityFootnote}</p>
    </div>
  );
}
