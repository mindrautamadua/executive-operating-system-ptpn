import { Star } from "lucide-react";
import { nineBox } from "@/lib/profil-data";

const ROWS = ["Tinggi", "Menengah", "Rendah"];
const COLS = ["Rendah", "Menengah", "Tinggi"];

export function TalentPotential() {
  return (
    <div className="card flex h-full flex-col px-4 pb-3.5 pt-3.5">
      <h3 className="text-[11px] font-bold text-ink-900">Talent &amp; Potential</h3>

      <div className="flex min-h-0 flex-1 items-center gap-5 pt-2">
        {/* Nine-box */}
        <div className="flex shrink-0 items-center gap-1.5">
          <span
            className="text-[7.5px] font-semibold tracking-[0.1em] text-ink-400"
            style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
          >
            POTENSIAL
          </span>
          <div>
            <div className="flex items-start gap-1.5">
              <div className="flex flex-col gap-[6px]">
                {ROWS.map((r) => (
                  <div key={r} className="flex h-[46px] items-center justify-end">
                    <span className="text-[9px] text-ink-500">{r}</span>
                  </div>
                ))}
              </div>
              <div className="flex flex-col gap-[6px]">
                {nineBox.warna.map((row, ri) => (
                  <div key={ri} className="flex gap-[6px]">
                    {row.map((tone, ci) => {
                      const on = nineBox.posisi.row === ri && nineBox.posisi.col === ci;
                      return (
                        <div
                          key={ci}
                          className={`flex h-[46px] w-[46px] items-center justify-center rounded-md ${tone}`}
                        >
                          {on && <Star size={15} fill="#f5a524" strokeWidth={0} />}
                        </div>
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>
            <div className="ml-[52px] mt-1 flex gap-[6px]">
              {COLS.map((c) => (
                <span key={c} className="w-[46px] text-center text-[9px] text-ink-500">
                  {c}
                </span>
              ))}
            </div>
            <div className="ml-[52px] mt-0.5 text-center text-[7.5px] font-semibold tracking-[0.1em] text-ink-400">
              KINERJA
            </div>
          </div>
        </div>

        {/* Ringkasan kategori */}
        <div className="min-w-0 space-y-3 leading-tight">
          <div>
            <div className="text-[9px] text-ink-500">Posisi 9-Box</div>
            <div className="mt-[2px] text-[11px] font-bold text-[#16a34a]">
              Box 9 — High Potential / High Performer
            </div>
            <div className="mt-[3px] text-[8.5px] font-semibold text-ink-500">
              Performance 4,8 / 5,0 × Potential High
            </div>
          </div>
          <div>
            <div className="text-[9px] text-ink-500">Kandidat Siap</div>
            <div className="mt-[2px] text-[10px] font-bold text-ink-900">{nineBox.kandidatSiap}</div>
          </div>
          <div>
            <div className="text-[9px] text-ink-500">Rekomendasi</div>
            <div className="mt-[2px] text-[9.5px] font-medium leading-[1.45] text-ink-700">
              {nineBox.rekomendasi}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
