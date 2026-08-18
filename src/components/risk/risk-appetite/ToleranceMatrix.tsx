import { toleranceMatrix, type ToleranceStatement } from "@/lib/risk-data";
import { SectionHead } from "@/components/hc/SectionHead";
import { ScopeNote } from "@/components/ui/ScopeNote";
import { ToneBadge, type BadgeTone } from "@/components/shared/ToneBadge";

const APPETITE_TONE: Record<ToleranceStatement["appetite"], BadgeTone> = {
  Rendah: "bad",
  Moderat: "warn",
  Tinggi: "good",
};

/** Pernyataan risk appetite per kategori beserta jumlah limit turunannya. */
export function ToleranceMatrix() {
  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-3 pt-3"
      style={{ "--d": "240ms" } as React.CSSProperties}
    >
      <SectionHead title="Tolerance Matrix" action="Unduh Pernyataan" badge={<ScopeNote />} />
      <p className="mt-[3px] text-[9px] text-ink-500">
        Pernyataan Risk Appetite per Kategori — Disetujui Dekom Feb 2026
      </p>

      <div className="mt-2 grid grid-cols-[92px_62px_minmax(0,1fr)_38px] items-center gap-x-2 border-b border-[#eef2f6] pb-1.5 text-[9px] font-semibold uppercase tracking-[0.04em] text-ink-500">
        <span>Kategori</span>
        <span>Appetite</span>
        <span>Pernyataan</span>
        <span className="text-center">Limit</span>
      </div>

      <ul className="scroll-thin flex min-h-0 flex-1 flex-col justify-between gap-y-1 overflow-y-auto py-1">
        {toleranceMatrix.map((t) => (
          <li
            key={t.kategori}
            className="grid shrink-0 grid-cols-[92px_62px_minmax(0,1fr)_38px] items-center gap-x-2"
          >
            <span className="truncate text-[9.5px] font-bold text-ink-900">{t.kategori}</span>
            <span>
              <ToneBadge label={t.appetite} tone={APPETITE_TONE[t.appetite]} />
            </span>
            <span className="text-[8.5px] leading-snug text-ink-500">{t.statement}</span>
            <span className="text-center text-[9.5px] font-extrabold text-ink-900">
              {t.jumlahLimit}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
