import { Coins } from "lucide-react";
import { carbonPotential } from "@/lib/esg-data";
import { SectionHead } from "@/components/hc/SectionHead";
import { ScopeNote } from "@/components/ui/ScopeNote";

const angka = (v: number) => v.toLocaleString("id-ID");

export function CarbonPricePotential() {
  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-2.5 pt-3"
      style={{ "--d": "180ms" } as React.CSSProperties}
    >
      <SectionHead title="Potensi Monetisasi Karbon" action="Lihat Detail" badge={<ScopeNote />} />
      <p className="mt-[3px] text-[9px] text-ink-500">Kumulatif s.d. 2030 · SPE-GRK &amp; IDXCarbon</p>

      <div className="mt-2 flex items-center gap-2.5 rounded-xl bg-ptpn-greenLight px-3 py-2.5">
        <span className="flex h-[30px] w-[30px] shrink-0 items-center justify-center rounded-full bg-white text-ptpn-green">
          <Coins size={15} strokeWidth={1.9} />
        </span>
        <div className="min-w-0">
          <div className="whitespace-nowrap text-[20px] font-extrabold leading-none tracking-[-0.01em] text-ink-900">
            Rp {angka(carbonPotential.totalRpM)} M
          </div>
          <div className="mt-[3px] text-[8.5px] font-semibold text-ptpn-green">
            Potensi pendapatan kredit karbon
          </div>
        </div>
      </div>

      <div className="mt-2 flex flex-col gap-1.5">
        {carbonPotential.breakdown.map((b) => (
          <div key={b.mekanisme} className="flex items-center gap-2">
            <span className="min-w-0 flex-1 truncate text-[9px] text-ink-700" title={b.mekanisme}>
              {b.mekanisme}
            </span>
            <div className="h-[7px] w-[60px] shrink-0 overflow-hidden rounded-full bg-[#eef2f6]">
              <div
                className="h-full rounded-full bg-ptpn-green"
                style={{ width: `${(b.potensiRpM / carbonPotential.totalRpM) * 100}%` }}
              />
            </div>
            <span className="w-[46px] shrink-0 text-right text-[9px] font-bold text-ink-900">
              Rp {angka(b.potensiRpM)} M
            </span>
          </div>
        ))}
      </div>

      <p className="mt-auto pt-2 text-[9px] leading-snug text-ink-500">{carbonPotential.desc}</p>
    </div>
  );
}
