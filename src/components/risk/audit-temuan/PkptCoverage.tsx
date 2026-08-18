import { pkptCoverage } from "@/lib/risk-data-detail";
import { SectionHead } from "@/components/hc/SectionHead";
import { ScopeNote } from "@/components/ui/ScopeNote";

const SISA = pkptCoverage.auditableUnits - pkptCoverage.audited;

function Tile({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex min-w-0 flex-col rounded-lg border border-[#eef2f6] bg-[#fbfcfd] px-2 py-1.5">
      <span className="text-[13px] font-extrabold leading-none text-ink-900">{value}</span>
      <span className="mt-1 truncate text-[7.5px] font-semibold uppercase tracking-[0.03em] text-ink-400">
        {label}
      </span>
    </div>
  );
}

/** Cakupan Program Kerja Pengawasan Tahunan (PKPT) SPI. */
export function PkptCoverage() {
  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-3 pt-3"
      style={{ "--d": "180ms" } as React.CSSProperties}
    >
      <SectionHead title="Cakupan PKPT" badge={<ScopeNote />} />
      <p className="mt-[3px] text-[9px] text-ink-500">Realisasi Program Kerja Pengawasan Tahunan</p>

      <div className="mt-3 flex items-baseline gap-1">
        <span className="text-[26px] font-extrabold leading-none tracking-[-0.01em] text-ink-900">
          {pkptCoverage.pct}%
        </span>
        <span className="text-[9px] font-semibold text-ink-500">dari 176 auditable unit</span>
      </div>

      <span className="mt-2 h-[10px] w-full overflow-hidden rounded-full bg-[#eef2f6]">
        <span
          className="anim-grow-x block h-full rounded-full bg-ptpn-green"
          style={{ width: `${pkptCoverage.pct}%` }}
        />
      </span>

      <div className="mt-2.5 grid grid-cols-2 gap-1.5">
        <Tile label="Unit Selesai" value={`${pkptCoverage.audited}`} />
        <Tile label="Sisa H2" value={`${SISA}`} />
      </div>

      <p className="mt-auto rounded-md bg-[#fdf3e0] px-2 py-[5px] text-[9px] leading-[1.4] text-[#a26a05]">
        {SISA} unit tersisa menumpuk di H2 bersamaan musim giling — prioritaskan unit risiko
        Ekstrem/Tinggi.
      </p>
    </div>
  );
}
