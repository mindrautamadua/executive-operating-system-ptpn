import { BASELINE_TRUST } from "@/lib/group-baseline";
import { ArrowRight } from "lucide-react";
import { konsistensiLintasSistem, rekonSistem } from "@/lib/data-analytics";

/** Tone selisih: 0 cocok (hijau), ≤10 varian kecil (amber), >10 varian besar (merah). */
const toneSelisih = (selisih: number) => {
  const abs = Math.abs(selisih);
  if (abs === 0) return "tone-green";
  if (abs <= 10) return "tone-amber";
  return "tone-red";
};

const labelSelisih = (selisih: number) =>
  selisih === 0 ? "Cocok" : selisih.toLocaleString("id-ID");

/**
 * Rekonsiliasi headcount lintas sistem vs SAP ERP sebagai source of truth —
 * menjawab "angka mana yang benar?" ketika dashboard antar sistem berbeda.
 */
export function DataReconciliation() {
  const varianTerbuka = rekonSistem.filter((s) => s.selisih !== 0).length;

  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-2.5 pt-3"
      style={{ "--d": "540ms" } as React.CSSProperties}
    >
      <div className="flex items-start justify-between gap-2">
        <h3 className="card-title-navy">Rekonsiliasi Lintas Sistem</h3>
        <div className="text-right leading-tight">
          <span className="block text-[15px] font-extrabold leading-none text-ink-900">
            {konsistensiLintasSistem}
          </span>
          <span className="text-[9px] text-ink-500">Konsistensi</span>
        </div>
      </div>

      <div className="mt-1.5 flex min-h-0 flex-1 flex-col justify-around">
        {rekonSistem.map((s) => (
          <div key={s.sistem} className="flex items-center gap-2 whitespace-nowrap">
            <span className="min-w-0 truncate text-[9.5px] text-ink-700">{s.sistem}</span>
            {s.sourceOfTruth && (
              <span className="tone-blue shrink-0 rounded-md px-1.5 py-[1px] text-[8.5px] font-bold">
                Source of Truth
              </span>
            )}
            <span className="ml-auto shrink-0 text-[9.5px] font-semibold tabular-nums text-ink-900">
              {s.records}
            </span>
            <span
              className={`${toneSelisih(
                s.selisih,
              )} inline-block w-[52px] shrink-0 rounded-md px-1.5 py-[2px] text-center text-[9px] font-bold tabular-nums`}
              title={
                s.selisih === 0
                  ? "Cocok dengan source of truth"
                  : `Selisih ${s.selisih.toLocaleString("id-ID")} record vs SAP ERP`
              }
            >
              {labelSelisih(s.selisih)}
            </span>
          </div>
        ))}
      </div>

      <div className="mt-1 border-t border-[#f0f3f6] pt-1.5 text-[9px] text-ink-500">
        Basis: headcount aktif per {BASELINE_TRUST.asOf} · {varianTerbuka} varian terbuka
      </div>

      <button className="link-more mt-1 flex items-center gap-1">
        Lihat detail rekonsiliasi <ArrowRight size={11} />
      </button>
    </div>
  );
}
