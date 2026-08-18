import { renewalFunnel } from "@/lib/hkm-data";
import { SectionHead } from "@/components/hc/SectionHead";
import { ScopeNote } from "@/components/ui/ScopeNote";

const awal = renewalFunnel[0].jumlah;
const totalHari = renewalFunnel.reduce((a, s) => a + s.rataHari, 0);

/** Funnel kumulatif perpanjangan 43 izin: teridentifikasi → terbit. */
export function RenewalFunnel() {
  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-2.5 pt-3"
      style={{ "--d": "120ms" } as React.CSSProperties}
    >
      <SectionHead title="Funnel Perpanjangan Izin" action="Lihat Detail" badge={<ScopeNote />} />
      <p className="mt-[3px] text-[9px] text-ink-500">
        {awal} Izin Berakhir ≤6 Bulan · siklus penuh ±{totalHari} hari · baru 5 terbit
      </p>

      <div className="mt-2 flex min-h-0 flex-1 flex-col justify-between gap-1.5">
        {renewalFunnel.map((s, i) => {
          const lebar = (s.jumlah / awal) * 100;
          const drop = i === 0 ? null : renewalFunnel[i - 1].jumlah - s.jumlah;
          return (
            <div key={s.tahap}>
              <div className="flex items-baseline justify-between gap-2">
                <span className="truncate text-[9.5px] font-semibold text-ink-900" title={s.tahap}>
                  {s.tahap}
                </span>
                <span className="shrink-0 text-[8.5px] font-bold tabular-nums text-ink-500">
                  {s.jumlah} · ⌀ {s.rataHari} hari
                </span>
              </div>
              <div className="mt-[3px] flex items-center gap-1.5">
                <div className="h-[9px] flex-1 overflow-hidden rounded-full bg-[#eef2f6]">
                  <div
                    className="h-full rounded-full"
                    style={{ width: `${lebar}%`, backgroundColor: s.color }}
                  />
                </div>
                <span className="w-[38px] shrink-0 text-right text-[9px] font-semibold tabular-nums text-ink-500">
                  {drop === null ? "100%" : `−${drop}`}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      <p className="mt-1.5 border-t border-[#f5f8fa] pt-1.5 text-[9px] leading-snug text-ink-500">
        Kebocoran terbesar bersifat teknis: kelengkapan dokumen (43 → 33, 22 hari) dan verifikasi
        lapangan (27 → 14, 31 hari).
      </p>
    </div>
  );
}
