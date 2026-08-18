import { ChevronDown, ChevronRight } from "lucide-react";
import { distribusiUnit } from "@/lib/org-data";

const max = Math.max(...distribusiUnit.map((d) => d.value));
const fmt = (n: number) => n.toLocaleString("id-ID");

export function DistribusiUnit() {
  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-2.5 pt-3"
      style={{ "--d": "60ms" } as React.CSSProperties}
    >
      <div className="flex items-start justify-between gap-2">
        <div>
          <h3 className="card-title-navy">Distribusi Karyawan Berdasarkan Unit</h3>
          <p className="mt-[3px] text-[9.5px] text-ink-500">
            Top 10 Unit dengan Jumlah Karyawan Terbanyak
          </p>
        </div>
        <button className="select-chip whitespace-nowrap px-2.5 py-[5px] text-[9.5px] transition-colors hover:bg-[#f7f9fb]">
          Semua Unit <ChevronDown size={11} />
        </button>
      </div>

      <div className="mt-2 flex min-h-0 flex-1 flex-col justify-between">
        {distribusiUnit.map((d, i) => (
          <div
            key={d.unit}
            className="flex items-center gap-2"
            title={`${d.unit}: ${fmt(d.value)} karyawan`}
          >
            <span className="w-[14px] shrink-0 text-right text-[9px] tabular-nums text-ink-500">
              {i + 1}.
            </span>
            <span className="w-[112px] shrink-0 truncate text-[9.5px] text-ink-700">{d.unit}</span>
            <span className="h-[7px] min-w-0 flex-1 overflow-hidden rounded-full bg-[#f2f5f8]">
              <span
                className="anim-grow-x block h-full rounded-full bg-gradient-to-r from-[#4ec98a] to-[#22a45d]"
                style={{ width: `${(d.value / max) * 100}%`, "--d": `${i * 45}ms` } as React.CSSProperties}
              />
            </span>
            <span className="w-[42px] shrink-0 text-right text-[9.5px] font-semibold tabular-nums text-ink-900">
              {fmt(d.value)}
            </span>
          </div>
        ))}
      </div>

      <button className="link-more mt-2 flex items-center gap-1 self-start">
        Lihat detail distribusi <ChevronRight size={11} />
      </button>
    </div>
  );
}
