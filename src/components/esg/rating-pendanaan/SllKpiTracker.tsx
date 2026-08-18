import { sllKpis } from "@/lib/esg-data-detail";
import type { SllKpi } from "@/lib/esg-data-detail";
import { ToneBadge, type BadgeTone } from "@/components/shared/ToneBadge";
import { SectionHead } from "@/components/hc/SectionHead";
import { ScopeNote } from "@/components/ui/ScopeNote";

const STATUS_TONE: Record<SllKpi["status"], BadgeTone> = {
  Tercapai: "good",
  "On-track": "info",
  "At-risk": "warn",
};

/** Tracker 3 KPI sustainability-linked loan Rp 6,5 T + status step-down margin. */
export function SllKpiTracker() {
  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-3 pt-3"
      style={{ "--d": "60ms" } as React.CSSProperties}
    >
      <SectionHead title="SLL KPI Tracker" action="Lihat Detail" badge={<ScopeNote />} />
      <p className="mt-[3px] text-[9px] text-ink-500">
        Sustainability-Linked Loan Rp 6,5 T · 3 KPI Terverifikasi
      </p>

      <div className="mt-2 min-h-0 flex-1 overflow-hidden">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-[#eef2f6] text-[8.5px] font-semibold text-ink-500">
              <th className="pb-[6px] text-left font-semibold">KPI</th>
              <th className="pb-[6px] pl-3 text-left font-semibold">Target</th>
              <th className="pb-[6px] pl-3 text-left font-semibold">Realisasi</th>
              <th className="pb-[6px] pl-3 text-left font-semibold">Status</th>
            </tr>
          </thead>
          <tbody>
            {sllKpis.map((k) => (
              <tr
                key={k.kpi}
                className="border-b border-[#f5f8fa] transition-colors last:border-0 hover:bg-[#f5f8fa]"
              >
                <td className="py-[8px] text-[9.5px] font-bold text-ink-900">{k.kpi}</td>
                <td className="py-[8px] pl-3 text-[9px] text-ink-500">{k.target}</td>
                <td className="py-[8px] pl-3 text-[9px] font-semibold text-ink-700">{k.actual}</td>
                <td className="py-[8px] pl-3">
                  <ToneBadge label={k.status} tone={STATUS_TONE[k.status]} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-1 flex items-center justify-between gap-2 rounded-lg bg-[#f8fafc] px-2.5 py-[6px]">
        <span className="text-[8.5px] font-semibold text-ink-500">
          Step-down margin terverifikasi · efektif Juni 2026
        </span>
        <span className="text-[9px] tabular-nums text-ink-500">
          <span className="text-[12px] font-extrabold text-ptpn-green">-12,5 bps</span> · hemat ±Rp
          8 M/thn
        </span>
      </div>
    </div>
  );
}
