import { ArrowRight, ChevronDown } from "lucide-react";
import { kelengkapanDomain, targetKelengkapan } from "@/lib/data-analytics";
import { PALETTE, SEMANTIC } from "@/lib/chart-palette";

/** Ambang warna: hijau ≥95, amber 90-95, merah <90. */
const warnaDomain = (pct: number) => {
  if (pct >= targetKelengkapan) return SEMANTIC.good;
  if (pct >= 90) return SEMANTIC.warn;
  return SEMANTIC.bad;
};

export function KelengkapanDomain() {
  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-2.5 pt-3"
      style={{ "--d": "120ms" } as React.CSSProperties}
    >
      <div className="flex items-start justify-between gap-2">
        <h3 className="card-title-navy">Kelengkapan Data Berdasarkan Domain</h3>
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1 whitespace-nowrap text-[9px] text-ink-500">
            <span className="h-[10px] w-[2px] rounded" style={{ background: PALETTE.navy }} />
            Target {targetKelengkapan}%
          </span>
          <button className="select-chip whitespace-nowrap px-2.5 py-[5px] text-[9.5px]">
            Semua Domain <ChevronDown size={11} />
          </button>
        </div>
      </div>

      <div className="mt-2 flex min-h-0 flex-1 flex-col justify-around">
        {kelengkapanDomain.map((d, i) => (
          <div key={d.name} className="flex items-center gap-2">
            <span className="w-[120px] shrink-0 whitespace-nowrap text-[9.5px] text-ink-700">
              {d.name}
            </span>
            <div className="relative h-[7px] flex-1 rounded-full bg-[#eef2f6]">
              <div
                className="anim-grow-x h-full rounded-full"
                style={
                  {
                    width: `${d.pct}%`,
                    background: warnaDomain(d.pct),
                    "--d": `${i * 50}ms`,
                  } as React.CSSProperties
                }
              />
              {/* garis target 95% */}
              <span
                className="absolute -bottom-[2px] -top-[2px] w-[2px] rounded"
                style={{ left: `${targetKelengkapan}%`, background: PALETTE.navy, opacity: 0.55 }}
                title={`Target ${targetKelengkapan}%`}
              />
            </div>
            <span className="w-[34px] shrink-0 text-right text-[9.5px] font-semibold tabular-nums text-ink-900">
              {d.pct.toFixed(1).replace(".", ",")}%
            </span>
          </div>
        ))}
      </div>

      <button className="link-more mt-1 flex items-center gap-1">
        Lihat detail domain <ArrowRight size={11} />
      </button>
    </div>
  );
}
