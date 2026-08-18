import { ArrowRight } from "lucide-react";
import { komposisiGender, totalKaryawan } from "@/lib/di-data";
import { CountUp } from "../ui/CountUp";

/**
 * Split biner laki-laki/perempuan — satu bar dua segmen lebih jujur dan
 * mudah dibaca daripada donat untuk perbandingan dua kategori.
 */
export function KomposisiGender() {
  const [pria, wanita] = komposisiGender;

  return (
    <div className="card anim-rise flex h-full flex-col px-4 pb-2.5 pt-3">
      <h3 className="card-title-navy">Komposisi Karyawan berdasarkan Gender</h3>
      <p className="mt-[3px] text-[9px] text-ink-500">(Per 30 Jun 2026)</p>

      <div className="flex min-h-0 flex-1 flex-col justify-center gap-3">
        {/* dua blok statistik besar */}
        <div className="grid grid-cols-2 gap-3">
          {komposisiGender.map((g) => (
            <div key={g.name}>
              <span className="flex items-center gap-1.5 text-[9.5px] text-ink-500">
                <span
                  className="h-[8px] w-[8px] rounded-[2px]"
                  style={{ background: g.color }}
                />
                {g.name}
              </span>
              <div className="mt-1 flex items-baseline gap-1.5">
                <CountUp
                  value={g.jumlah}
                  className="text-[19px] font-extrabold leading-none text-ink-900"
                />
                <span className="text-[10px] font-bold tabular-nums" style={{ color: g.color }}>
                  {g.pct}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* bar split dua segmen dengan label % */}
        <div className="anim-grow-x flex h-9 w-full overflow-hidden rounded-lg">
          <div
            className="flex items-center justify-start pl-2"
            style={{ width: `${pria.share}%`, background: pria.color }}
          >
            <span className="text-[10px] font-bold text-white">{pria.pct}</span>
          </div>
          <div
            className="flex items-center justify-end pr-2"
            style={{ width: `${wanita.share}%`, background: wanita.color }}
          >
            <span className="text-[10px] font-bold text-white">{wanita.pct}</span>
          </div>
        </div>

        <div className="flex items-center justify-between rounded-lg bg-[#f6f9fc] px-3 py-[6px]">
          <span className="text-[9.5px] text-ink-500">Total Karyawan</span>
          <CountUp
            value={totalKaryawan}
            className="text-[11px] font-bold tabular-nums text-ink-900"
          />
        </div>
      </div>

      <button className="link-more mt-1 flex items-center gap-1">
        Lihat detail gender <ArrowRight size={11} />
      </button>
    </div>
  );
}
