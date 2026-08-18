import { spendSnapshot } from "@/lib/tik-data";
import { SectionHead } from "@/components/hc/SectionHead";
import { ScopeNote } from "@/components/ui/ScopeNote";

const rp = (v: number) => `Rp ${v.toLocaleString("id-ID", { minimumFractionDigits: 2 })} T`;
const pct = (v: number) => `${v.toLocaleString("id-ID", { minimumFractionDigits: 1 })}%`;

const s = spendSnapshot;

/** Posisi belanja TI dalam band benchmark 1,2–2,0% pendapatan (0–2,6% skala). */
const SKALA_MAKS = 2.6;
const posisi = (v: number) => `${(v / SKALA_MAKS) * 100}%`;

export function SpendSnapshot() {
  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-3 pt-3"
      style={{ "--d": "120ms" } as React.CSSProperties}
    >
      <SectionHead title="Snapshot Belanja TI" action="Lihat Detail" badge={<ScopeNote />} />
      <p className="mt-[3px] text-[9px] text-ink-500">
        Capex vs Opex FY 2026 &amp; Posisi terhadap Benchmark Agribisnis 1,2–2,0% Pendapatan
      </p>

      <div className="mt-2.5 grid grid-cols-[minmax(0,42fr)_minmax(0,58fr)] gap-4">
        <div>
          <div className="flex items-end gap-2">
            <span className="whitespace-nowrap text-[22px] font-extrabold leading-none tracking-[-0.01em] text-ink-900">
              {rp(s.totalFyRpT)}
            </span>
            <span className="pb-[2px] text-[8.5px] font-semibold text-ink-400">Belanja TI FY</span>
          </div>

          <div className="mt-2.5 flex flex-col gap-2">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-[9px] font-bold text-ink-900">Capex</span>
                <span className="text-[8.5px] font-semibold text-ink-500">
                  {rp(s.capexFyRpT)} · realisasi {rp(s.capexRealisasiYtdRpT)} ({pct(s.capexRealisasiPct)})
                </span>
              </div>
              <div className="mt-1.5 h-[9px] w-full overflow-hidden rounded-full bg-[#eef2f6]">
                <div
                  className="h-full rounded-full bg-[#3b7ded]"
                  style={{ width: `${s.capexRealisasiPct}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <span className="text-[9px] font-bold text-ink-900">Opex</span>
                <span className="text-[8.5px] font-semibold text-ink-500">
                  {rp(s.opexFyRpT)} · run-rate berjalan
                </span>
              </div>
              <div className="mt-1.5 h-[9px] w-full overflow-hidden rounded-full bg-[#eef2f6]">
                <div className="h-full rounded-full bg-ptpn-green" style={{ width: "42%" }} />
              </div>
            </div>
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between">
            <span className="text-[9px] font-bold text-ink-900">
              Belanja TI terhadap Pendapatan
            </span>
            <span className="text-[8.5px] font-semibold text-ink-500">
              basis Rp {s.basisPendapatanFyRpT.toLocaleString("id-ID", { minimumFractionDigits: 1 })} T
            </span>
          </div>

          <div className="relative mt-3 h-[14px] w-full rounded-full bg-[#eef2f6]">
            {/* band benchmark */}
            <div
              className="absolute inset-y-0 rounded-full bg-ptpn-greenLight"
              style={{
                left: posisi(s.benchmarkBawahPct),
                width: posisi(s.benchmarkAtasPct - s.benchmarkBawahPct),
              }}
            />
            {/* penanda posisi aktual */}
            <div
              className="absolute -top-[3px] h-[20px] w-[3px] -translate-x-1/2 rounded-full bg-[#1b3a6b]"
              style={{ left: posisi(s.pctPendapatan) }}
            />
          </div>

          <div className="mt-1.5 flex items-center justify-between text-[9px] font-semibold text-ink-500">
            <span>0%</span>
            <span className="text-ptpn-green">
              Band {pct(s.benchmarkBawahPct)}–{pct(s.benchmarkAtasPct)}
            </span>
            <span>{pct(SKALA_MAKS)}</span>
          </div>

          <div className="mt-2 flex items-baseline gap-1.5">
            <span className="text-[19px] font-extrabold leading-none tracking-[-0.01em] text-ink-900">
              {pct(s.pctPendapatan)}
            </span>
            <span className="text-[8.5px] font-semibold text-ink-500">
              posisi aktual — di dalam band
            </span>
          </div>
        </div>
      </div>

      <p className="mt-auto pt-2 text-[9px] leading-snug text-ink-500">{s.catatan}</p>
    </div>
  );
}
