import { kursSensitivity, kursSensitivityNote } from "@/lib/harga-outlook-data";
import { SectionHead } from "@/components/hc/SectionHead";
import { ScopeNote } from "@/components/ui/ScopeNote";

/** Sensitivitas kurs ±5% & harga CPO ±10% terhadap pendapatan/EBITDA FY. */
export function KursSensitivity() {
  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-3 pt-3"
      style={{ "--d": "150ms" } as React.CSSProperties}
    >
      {/* Dampak pendapatan/EBITDA dihitung di level FY konsolidasi grup. */}
      <SectionHead title="Sensitivitas Kurs & Harga" action="Lihat Detail" badge={<ScopeNote />} />
      <p className="mt-[3px] text-[9px] text-ink-500">
        Dampak skenario terhadap Pendapatan &amp; EBITDA FY 2026
      </p>

      <div className="mt-2 grid grid-cols-[minmax(0,1.35fr)_78px_78px] items-center gap-x-2 text-[9px] font-semibold uppercase tracking-[0.04em] text-ink-500">
        <span>Skenario</span>
        <span className="text-right">Pendapatan</span>
        <span className="text-right">EBITDA</span>
      </div>

      <ul className="mt-1 flex min-h-0 flex-1 flex-col justify-between gap-1">
        {kursSensitivity.map((r) => (
          <li
            key={r.skenario}
            className="grid grid-cols-[minmax(0,1.35fr)_78px_78px] items-center gap-x-2 rounded-lg border border-[#eef2f6] bg-[#fbfcfd] px-2.5 py-1.5"
          >
            <span className="truncate text-[9.5px] font-extrabold text-ink-900">{r.skenario}</span>
            <span
              className={`text-right text-[9px] font-bold ${
                r.tone === "good" ? "text-ptpn-green" : "text-[#ef4444]"
              }`}
            >
              {r.pendapatan}
            </span>
            <span
              className={`text-right text-[9px] font-bold ${
                r.tone === "good" ? "text-ptpn-green" : "text-[#ef4444]"
              }`}
            >
              {r.ebitda}
            </span>
          </li>
        ))}
      </ul>

      <p className="mt-1.5 line-clamp-2 text-[9px] leading-snug text-ink-500" title={kursSensitivityNote}>
        {kursSensitivityNote}
      </p>
    </div>
  );
}
