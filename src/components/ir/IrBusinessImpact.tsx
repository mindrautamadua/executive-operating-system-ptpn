import { Factory } from "lucide-react";
import { businessImpact, businessImpactTotal } from "@/lib/ir-intel-data";
import { SectionHead } from "../hc/SectionHead";

/**
 * IR → Business Impact: konflik industrial diterjemahkan ke eksposur operasi
 * (karyawan, hari disrupsi, produksi) dan finansial per lokasi.
 */
export function IrBusinessImpact() {
  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-3 pt-3"
      style={{ "--d": "120ms" } as React.CSSProperties}
    >
      <div className="flex items-baseline gap-1.5">
        <SectionHead title="Business Impact Eksposur IR" />
        <span className="shrink-0 text-[8.5px] text-ink-400">(Lokasi Terpapar)</span>
      </div>

      <div className="mt-2 grid grid-cols-[minmax(0,1fr)_48px_50px_84px_58px] items-center gap-x-2 border-b border-[#eef2f6] pb-1.5 text-[9px] font-semibold uppercase tracking-[0.04em] text-ink-500">
        <span>Lokasi</span>
        <span className="text-right">Karyawan</span>
        <span className="text-center">Disrupsi</span>
        <span className="text-right">Produksi Berisiko</span>
        <span className="text-right">Eksposur</span>
      </div>

      <ul className="flex min-h-0 flex-1 flex-col justify-around">
        {businessImpact.map((b) => (
          <li
            key={b.lokasi}
            className="grid grid-cols-[minmax(0,1fr)_48px_50px_84px_58px] items-center gap-x-2 border-b border-[#f4f7fa] py-1 last:border-0"
          >
            <span className="flex min-w-0 items-center gap-1.5">
              <span
                className={`inline-block h-[7px] w-[7px] shrink-0 rounded-full ${
                  b.risk === "Tinggi" ? "bg-[#ef4444]" : "bg-[#f5a524]"
                }`}
              />
              <span className="truncate text-[9px] font-semibold text-ink-800" title={b.lokasi}>
                {b.lokasi}
              </span>
            </span>
            <span className="text-right text-[9px] font-bold tabular-nums text-ink-900">
              {b.karyawan}
            </span>
            <span className="text-center text-[8.5px] font-semibold text-ink-600">{b.disrupsi}</span>
            <span className="truncate text-right text-[8.5px] text-ink-600">{b.produksi}</span>
            <span className="text-right text-[9px] font-extrabold text-ink-900">{b.eksposur}</span>
          </li>
        ))}
      </ul>

      <div className="mt-1.5 flex items-center gap-2 rounded-lg border border-[#f3e3c3] bg-[#fdf9f0] px-2.5 py-1.5">
        <Factory size={11} className="shrink-0 text-[#d98b06]" />
        <span className="min-w-0 flex-1 truncate text-[9px] text-ink-700">
          {businessImpactTotal.note}
        </span>
        <span className="shrink-0 text-[8.5px] font-extrabold text-ink-900">
          Total {businessImpactTotal.karyawan} karyawan · {businessImpactTotal.eksposur}
        </span>
      </div>
    </div>
  );
}
