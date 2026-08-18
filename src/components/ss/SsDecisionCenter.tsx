import Link from "next/link";
import { ArrowRight, CheckCircle2, ClipboardList, Gavel } from "lucide-react";
import {
  approvalConditions,
  decisionLog,
  scenarioRiskScore,
  strategicScore,
} from "@/lib/ss-data";

function scoreColor(v: number) {
  if (v >= 90) return "#1a9c5b";
  if (v >= 80) return "#3b7ded";
  return "#f5a524";
}

/**
 * BOD Scenario Decision Center: rekomendasi berbasis Strategic Score
 * (value + risk + feasibility + alignment, bukan hanya ROI), syarat
 * approval eksplisit, dan decision log sebagai audit trail.
 */
export function SsDecisionCenter() {
  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-3 pt-3"
      style={{ "--d": "600ms" } as React.CSSProperties}
    >
      <div className="flex items-start justify-between gap-2">
        <h3 className="card-title-navy flex items-center gap-1.5">
          <Gavel size={13} className="text-[#1b3a6b]" />
          BOD Scenario Decision Center
        </h3>
        <span className="shrink-0 text-[9px] font-semibold text-ink-500">
          Rekomendasi: {strategicScore.scenario} • Risk Score {scenarioRiskScore.value}/100
        </span>
      </div>

      <div className="mt-2.5 grid min-h-0 flex-1 grid-cols-[minmax(0,36fr)_minmax(0,34fr)_minmax(0,30fr)] gap-2.5">
        <div
          className="flex min-w-0 flex-col rounded-xl border border-[#eef2f6] px-3 py-2.5"
          style={{ borderTop: "3px solid #16a34a" }}
        >
          <div className="flex items-center justify-between">
            <span className="inline-flex w-fit items-center rounded px-1.5 py-[2px] text-[9px] font-bold leading-none tone-green">
              Recommended
            </span>
            <span className="text-[13px] font-extrabold leading-none text-ink-900">
              {strategicScore.total}
              <span className="text-[8.5px] font-bold text-ink-400">/100</span>
            </span>
          </div>
          <div className="mt-1 text-[10.5px] font-bold leading-tight text-ink-900">
            Strategic Score — {strategicScore.scenario}
          </div>
          <ul className="mt-1.5 flex min-h-0 flex-1 flex-col justify-between gap-[3px]">
            {strategicScore.breakdown.map((d) => (
              <li key={d.label} className="flex shrink-0 items-center gap-2">
                <span className="w-[104px] shrink-0 truncate text-[9px] font-semibold text-ink-600">
                  {d.label}
                </span>
                <div className="h-[6px] min-w-0 flex-1 overflow-hidden rounded-full bg-[var(--chart-grid)]">
                  <div
                    className="h-full rounded-full"
                    style={{ width: `${d.value}%`, background: scoreColor(d.value) }}
                  />
                </div>
                <span className="w-[20px] shrink-0 text-right text-[8.5px] font-extrabold text-ink-900">
                  {d.value}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div
          className="flex min-w-0 flex-col rounded-xl border border-[#eef2f6] px-3 py-2.5"
          style={{ borderTop: "3px solid #f59e0b" }}
        >
          <span className="inline-flex w-fit items-center rounded px-1.5 py-[2px] text-[9px] font-bold leading-none tone-amber">
            Approval Conditions
          </span>
          <div className="mt-1 text-[10.5px] font-bold leading-tight text-ink-900">
            Approve {strategicScore.scenario} subject to:
          </div>
          <ul className="mt-1.5 flex min-h-0 flex-1 flex-col justify-between gap-[3px]">
            {approvalConditions.map((c, i) => (
              <li key={c} className="flex shrink-0 items-start gap-1.5">
                <CheckCircle2 size={10} className="mt-[2px] shrink-0 text-[#d98b06]" />
                <span className="text-[8.5px] font-semibold leading-snug text-ink-700">
                  {i + 1}. {c}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div
          className="flex min-w-0 flex-col rounded-xl border border-[#eef2f6] px-3 py-2.5"
          style={{ borderTop: "3px solid #3b7ded" }}
        >
          <span className="inline-flex w-fit items-center rounded bg-[#e8f1fd] px-1.5 py-[2px] text-[9px] font-bold leading-none text-[#1d4ed8]">
            Decision Log
          </span>
          <div className="mt-1 flex items-center gap-1 text-[10.5px] font-bold leading-tight text-ink-900">
            <ClipboardList size={11} className="text-[#2f6fe4]" /> Audit Trail Keputusan
          </div>
          <ul className="mt-1.5 flex flex-col gap-[5px]">
            {decisionLog.map((d) => (
              <li key={d.label} className="flex items-center justify-between gap-2">
                <span className="shrink-0 text-[8.5px] font-semibold text-ink-500">{d.label}</span>
                <span className="min-w-0 truncate text-right text-[8.5px] font-extrabold text-ink-900">
                  {d.value}
                </span>
              </li>
            ))}
          </ul>
          <div className="mt-auto flex gap-1.5 pt-1.5">
            <Link
              href="/succession-planning"
              className="flex flex-1 items-center justify-center gap-1 rounded-lg border border-[#e3e9ef] bg-[#f8fafc] py-[5px] text-[8.5px] font-semibold text-ptpn-greenDark transition-colors hover:bg-[#eef4f0]"
            >
              Succession <ArrowRight size={10} />
            </Link>
            <Link
              href="/people-productivity"
              className="flex flex-1 items-center justify-center gap-1 rounded-lg border border-[#e3e9ef] bg-[#f8fafc] py-[5px] text-[8.5px] font-semibold text-ptpn-greenDark transition-colors hover:bg-[#eef4f0]"
            >
              Productivity <ArrowRight size={10} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
