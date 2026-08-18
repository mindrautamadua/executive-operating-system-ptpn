import { renewalPipeline } from "@/lib/hkm-data";
import { SectionHead } from "@/components/hc/SectionHead";
import { ScopeNote } from "@/components/ui/ScopeNote";

const awal = renewalPipeline[0].jumlah;

const rpT = (v: number) => v.toLocaleString("id-ID", { minimumFractionDigits: 1 });

/** Funnel perpanjangan 112 kontrak jatuh tempo: identifikasi → tanda tangan. */
export function RenewalPipeline() {
  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-2.5 pt-3"
      style={{ "--d": "90ms" } as React.CSSProperties}
    >
      <SectionHead title="Pipeline Perpanjangan" action="Lihat Detail" badge={<ScopeNote />} />
      <p className="mt-[3px] text-[9px] text-ink-500">
        {awal} Kontrak Jatuh Tempo ≤90 Hari · konversi ke tanda tangan 20,5%
      </p>

      <div className="mt-2 flex min-h-0 flex-1 flex-col justify-between gap-1.5">
        {renewalPipeline.map((s, i) => {
          const lebar = (s.jumlah / awal) * 100;
          const drop = i === 0 ? null : renewalPipeline[i - 1].jumlah - s.jumlah;
          return (
            <div key={s.tahap}>
              <div className="flex items-baseline justify-between gap-2">
                <span className="truncate text-[9.5px] font-semibold text-ink-900">{s.tahap}</span>
                <span className="shrink-0 text-[8.5px] font-bold tabular-nums text-ink-500">
                  {s.jumlah} · Rp {rpT(s.nilaiRpT)} T · ⌀ {s.rataHari} hari
                </span>
              </div>
              <div className="mt-[3px] flex items-center gap-1.5">
                <div className="h-[9px] flex-1 overflow-hidden rounded-full bg-[#eef2f6]">
                  <div
                    className="h-full rounded-full"
                    style={{ width: `${lebar}%`, backgroundColor: s.color }}
                  />
                </div>
                <span className="w-[42px] shrink-0 text-right text-[9px] font-semibold tabular-nums text-ink-500">
                  {drop === null ? "100%" : `−${drop}`}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      <p className="mt-1.5 border-t border-[#f5f8fa] pt-1.5 text-[9px] leading-snug text-ink-500">
        Penyempitan terbesar terjadi di persetujuan (41 berkas, rata-rata 17 hari) — hambatan
        kewenangan, bukan substansi negosiasi.
      </p>
    </div>
  );
}
