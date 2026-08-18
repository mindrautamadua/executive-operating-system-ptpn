"use client";

import { shareholdingMap } from "@/lib/hkm-data-detail";
import { SectionHead } from "@/components/hc/SectionHead";
import { useSubholding } from "@/components/SubholdingProvider";
import { toSubholdingId } from "@/lib/subholding";

const holding = shareholdingMap.find((n) => n.level === 1);
const subholding = shareholdingMap.filter((n) => n.level === 2);
const anak = shareholdingMap.filter((n) => n.level === 3);

const pct = (v?: number) =>
  v == null ? "" : `${v.toLocaleString("id-ID", { minimumFractionDigits: 2 })}%`;

/** Struktur kepemilikan bertingkat Holding → 3 Subholding → entitas anak. */
export function ShareholdingMap() {
  const { active, isFiltered, def } = useSubholding();
  // Node level 2 adalah ketiga subholding; kolom di luar cakupan aktif diredupkan
  // agar struktur bertingkat (Holding → Subholding → anak) tetap utuh terbaca.
  const dim = (nama: string) =>
    !isFiltered || toSubholdingId(nama) === active ? 1 : 0.25;

  return (
    <div
      className="card anim-rise flex h-full min-h-0 flex-col px-4 pb-2.5 pt-3"
      style={{ "--d": "120ms" } as React.CSSProperties}
    >
      <SectionHead title="Peta Struktur Kepemilikan" action="Lihat Detail" />
      <p className="mt-[3px] text-[9px] text-ink-500">
        {isFiltered ? (
          <>Holding → 3 Subholding → 24 Entitas · cabang {def.label} disorot</>
        ) : (
          <>Holding → 3 Subholding → 24 Entitas Anak &amp; Afiliasi</>
        )}
      </p>

      <div className="scroll-thin mt-2 min-h-0 flex-1 overflow-y-auto pr-1">
        {/* Level 1 — Holding */}
        <div className="rounded-xl border border-[#d9e4f5] bg-[#e8f1fd] px-3 py-2">
          <div className="text-[9.5px] font-extrabold text-[#1b3a6b]">{holding?.nama}</div>
          <div className="mt-[3px] text-[9px] leading-snug text-ink-500">
            {holding?.keterangan}
          </div>
        </div>

        {/* Garis penghubung vertikal ke baris subholding */}
        <div className="mx-auto h-3 w-px bg-[#d9e4f5]" />

        {/* Level 2 — Subholding + level 3 di bawah masing-masing */}
        <div className="grid grid-cols-3 gap-2">
          {subholding.map((s) => {
            const anakSub = anak.filter((a) => a.induk === s.nama);
            return (
              <div
                key={s.nama}
                className="flex flex-col transition-opacity"
                style={{ opacity: dim(s.nama) }}
              >
                <div className="relative rounded-lg border border-[#e3e9ef] bg-[var(--surface)] px-2 py-[6px]">
                  <span className="absolute -top-3 left-1/2 h-3 w-px bg-[#d9e4f5]" />
                  <div className="truncate text-[9px] font-bold text-ink-900" title={s.nama}>
                    {s.nama}
                  </div>
                  <div className="mt-[2px] text-[9px] font-semibold tabular-nums text-ptpn-green">
                    {pct(s.kepemilikanPct)}
                  </div>
                  <div className="mt-[3px] text-[9px] leading-snug text-ink-500">
                    {s.keterangan}
                  </div>
                </div>

                <div className="mx-auto h-2.5 w-px bg-[#eef2f6]" />

                {anakSub.map((a) => (
                  <div
                    key={a.nama}
                    className="rounded-lg border border-dashed border-[#e3e9ef] bg-[#f8fafc] px-2 py-[6px]"
                  >
                    <div className="text-[8.5px] font-bold text-ink-700">{a.nama}</div>
                    <div className="mt-[2px] text-[9px] leading-snug text-ink-500">
                      {a.keterangan}
                    </div>
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      </div>

      <p className="pt-1.5 text-[9px] leading-snug text-ink-500">
        Pemegang saham puncak: Negara RI melalui Danantara. Persentase menunjukkan kepemilikan
        holding atas masing-masing subholding.
      </p>
    </div>
  );
}
