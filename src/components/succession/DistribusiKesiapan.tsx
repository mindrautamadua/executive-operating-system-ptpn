import Link from "next/link";
import { ArrowRight, ChevronRight } from "lucide-react";
import { distribusiKesiapan, totalKandidat } from "@/lib/succession-data";

/**
 * Bar ordinal horizontal (garis waktu kesiapan) — menggantikan donut yang
 * menduplikasi total pipeline. Urutan tetap: paling siap → paling lama.
 */
export function DistribusiKesiapan() {
  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-2.5 pt-3"
      style={{ "--d": "720ms" } as React.CSSProperties}
    >
      <div className="flex items-baseline justify-between gap-2">
        <div>
          <h3 className="card-title-navy">Distribusi Kesiapan Kandidat</h3>
          <p className="mt-[3px] text-[9px] text-ink-500">Seluruh Level</p>
        </div>
        <span className="whitespace-nowrap text-[9.5px] text-ink-500">
          Total:{" "}
          <strong className="text-[12px] font-extrabold text-ink-900">
            {totalKandidat}
          </strong>{" "}
          kandidat
        </span>
      </div>

      <div className="flex min-h-0 flex-1 flex-col justify-center gap-2.5">
        {/* bar bertumpuk — sumbu waktu kesiapan */}
        <div>
          <div className="flex h-[18px] overflow-hidden rounded-full">
            {distribusiKesiapan.map((d, i) => (
              <div
                key={d.name}
                className="anim-grow-x flex items-center justify-center"
                style={
                  {
                    width: `${d.share}%`,
                    background: d.color,
                    "--d": `${720 + i * 90}ms`,
                  } as React.CSSProperties
                }
              >
                <span className="text-[9px] font-bold text-white">{d.pct}</span>
              </div>
            ))}
          </div>
          <div className="mt-1 flex items-center justify-between text-[9px] text-ink-500">
            <span>Paling siap</span>
            <span className="flex items-center gap-1">
              Butuh waktu <ArrowRight size={10} />
            </span>
          </div>
        </div>

        {/* rincian per horizon */}
        <div className="flex flex-col gap-[7px]">
          {distribusiKesiapan.map((d) => (
            <div key={d.name} className="flex items-center gap-2 whitespace-nowrap">
              <span
                className="h-[8px] w-[8px] shrink-0 rounded-[2px]"
                style={{ background: d.color }}
              />
              <span className="text-[9.5px] text-ink-700">{d.name}</span>
              <span className="ml-auto text-[9.5px] font-bold tabular-nums text-ink-900">
                {d.jumlah}
              </span>
              <span className="w-[40px] text-right text-[9.5px] tabular-nums text-ink-400">
                {d.pct}
              </span>
            </div>
          ))}
        </div>
      </div>

      <Link href="/succession-planning/kesiapan" className="link-more mt-1 flex cursor-pointer items-center gap-0.5">
        Lihat detail kesiapan <ChevronRight size={12} />
      </Link>
    </div>
  );
}
