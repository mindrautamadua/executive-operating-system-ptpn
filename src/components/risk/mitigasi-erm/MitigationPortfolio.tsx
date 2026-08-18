import { mitigationPortfolio } from "@/lib/risk-data-detail";
import { SectionHead } from "@/components/hc/SectionHead";
import { ScopeNote } from "@/components/ui/ScopeNote";

const TOTAL = mitigationPortfolio.reduce((s, r) => s + r.total, 0);
const ON = mitigationPortfolio.reduce((s, r) => s + r.onTrack, 0);
const AT = mitigationPortfolio.reduce((s, r) => s + r.atRisk, 0);
const LATE = mitigationPortfolio.reduce((s, r) => s + r.late, 0);

/** Portofolio 96 aksi mitigasi register dengan status RAG per kategori. */
export function MitigationPortfolio() {
  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-3 pt-3"
      style={{ "--d": "60ms" } as React.CSSProperties}
    >
      <SectionHead title="Portofolio Aksi Mitigasi" badge={<ScopeNote />} />
      <p className="mt-[3px] text-[9px] text-ink-500">
        {TOTAL} Aksi Register · On-Track {ON} · At-Risk {AT} · Terlambat {LATE}
      </p>

      <ul className="mt-2 flex min-h-0 flex-1 flex-col justify-around gap-y-1">
        {mitigationPortfolio.map((r) => (
          <li key={r.kategori} className="flex shrink-0 items-center gap-2">
            <span className="w-[64px] shrink-0 text-[8.5px] font-semibold text-ink-700">
              {r.kategori}
            </span>
            <span
              className="flex h-[10px] min-w-0 flex-1 overflow-hidden rounded-full bg-[#eef2f6]"
              title={`On-track ${r.onTrack} · At-risk ${r.atRisk} · Terlambat ${r.late}`}
            >
              <span
                className="h-full bg-ptpn-green"
                style={{ width: `${(r.onTrack / r.total) * 100}%` }}
              />
              <span
                className="h-full bg-[#f5a524]"
                style={{ width: `${(r.atRisk / r.total) * 100}%` }}
              />
              <span
                className="h-full bg-[#ef4444]"
                style={{ width: `${(r.late / r.total) * 100}%` }}
              />
            </span>
            <span className="w-[22px] shrink-0 text-right text-[10px] font-extrabold text-ink-900">
              {r.total}
            </span>
          </li>
        ))}
      </ul>

      <div className="mt-2 flex items-center gap-3 text-[9px] font-semibold text-ink-500">
        <span className="flex items-center gap-1">
          <span className="h-[7px] w-[7px] rounded-full bg-ptpn-green" />
          On-Track
        </span>
        <span className="flex items-center gap-1">
          <span className="h-[7px] w-[7px] rounded-full bg-[#f5a524]" />
          At-Risk
        </span>
        <span className="flex items-center gap-1">
          <span className="h-[7px] w-[7px] rounded-full bg-[#ef4444]" />
          Terlambat
        </span>
      </div>
    </div>
  );
}
