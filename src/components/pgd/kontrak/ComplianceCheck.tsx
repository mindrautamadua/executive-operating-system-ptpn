import { complianceCheck } from "@/lib/pgd-data-detail";
import type { PgdStatus } from "@/lib/pgd-data";
import { SectionHead } from "@/components/hc/SectionHead";
import { ToneBadge, type BadgeTone } from "@/components/shared/ToneBadge";
import { ScopeNote } from "@/components/ui/ScopeNote";

const STATUS_TONE: Record<PgdStatus, BadgeTone> = {
  "On Track": "good",
  "At Risk": "warn",
  "Off Track": "bad",
};

const BAR_COLOR: Record<PgdStatus, string> = {
  "On Track": "bg-ptpn-green",
  "At Risk": "bg-[#f5a524]",
  "Off Track": "bg-[#ef4444]",
};

/** Kelengkapan dokumen, jaminan, dan klausul denda pada kontrak aktif. */
export function ComplianceCheck() {
  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-3 pt-3"
      style={{ "--d": "180ms" } as React.CSSProperties}
    >
      <SectionHead title="Kepatuhan Administratif" badge={<ScopeNote />} />
      <p className="mt-[3px] text-[9px] text-ink-500">Basis 1.246 Kontrak Aktif</p>

      <ul className="scroll-thin mt-2 flex min-h-0 flex-1 flex-col gap-[7px] overflow-y-auto">
        {complianceCheck.map((c) => (
          <li key={c.aspek} className="shrink-0">
            <div className="flex items-center gap-1.5">
              <span
                className="min-w-0 flex-1 truncate text-[9px] font-semibold text-ink-700"
                title={c.catatan}
              >
                {c.aspek}
              </span>
              <span className="shrink-0 text-[9.5px] font-extrabold text-ink-900">
                {c.patuhPct.toLocaleString("id-ID", { minimumFractionDigits: 1 })}%
              </span>
              <ToneBadge label={c.status} tone={STATUS_TONE[c.status]} />
            </div>
            <span className="mt-[3px] block h-[6px] w-full overflow-hidden rounded-full bg-[#eef2f6]">
              <span
                className={`anim-grow-x block h-full rounded-full ${BAR_COLOR[c.status]}`}
                style={{ width: `${c.patuhPct}%` }}
              />
            </span>
            <div className="mt-[2px] text-[9px] text-ink-500">
              {c.patuh.toLocaleString("id-ID")} dari {c.basis.toLocaleString("id-ID")} kontrak
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
