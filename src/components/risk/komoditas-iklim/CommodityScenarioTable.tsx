import { scenarioTable } from "@/lib/risk-data";
import { SectionHead } from "@/components/hc/SectionHead";
import { ScopeNote } from "@/components/ui/ScopeNote";

/** Sensitivitas EBITDA/pendapatan terhadap pergerakan variabel komoditas & kurs. */
export function CommodityScenarioTable() {
  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-3 pt-3"
      style={{ "--d": "240ms" } as React.CSSProperties}
    >
      <SectionHead title="Sensitivitas Skenario Komoditas" action="Simulasi Lanjut" badge={<ScopeNote />} />
      <p className="mt-[3px] text-[9px] text-ink-500">
        Dampak Tahunan per Pergerakan Variabel Utama
      </p>

      <div className="mt-2 grid grid-cols-[minmax(0,30fr)_74px_minmax(0,26fr)_minmax(0,44fr)] items-center gap-x-2 border-b border-[#eef2f6] pb-1.5 text-[9px] font-semibold uppercase tracking-[0.04em] text-ink-500">
        <span>Variabel</span>
        <span className="text-center">Pergerakan</span>
        <span>Dampak</span>
        <span>Catatan</span>
      </div>

      <ul className="scroll-thin flex min-h-0 flex-1 flex-col justify-between gap-y-1 overflow-y-auto py-1">
        {scenarioTable.map((r) => {
          const negatif = r.dampak.trim().startsWith("-");
          return (
            <li
              key={r.variabel}
              className="grid shrink-0 grid-cols-[minmax(0,30fr)_74px_minmax(0,26fr)_minmax(0,44fr)] items-center gap-x-2"
            >
              <span className="truncate text-[9.5px] font-bold text-ink-900">{r.variabel}</span>
              <span className="rounded-md bg-[#eef2f6] px-1.5 py-[2px] text-center text-[8.5px] font-extrabold text-ink-700">
                {r.pergerakan}
              </span>
              <span
                className={`text-[9px] font-extrabold ${negatif ? "text-[#ef4444]" : "text-ptpn-green"}`}
              >
                {r.dampak}
              </span>
              <span className="text-[8.5px] leading-snug text-ink-500">{r.catatan}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
