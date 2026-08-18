import {
  confidenceBreakdown,
  modelConfidence,
  scenarioRiskScore,
  scenarioRisks,
} from "@/lib/ss-data";
import { SectionHead } from "../hc/SectionHead";

const ARC_LENGTH = Math.PI * 50;

function ConfidenceGauge() {
  const dash = (modelConfidence.value / 100) * ARC_LENGTH;
  return (
    <div className="relative w-[118px]">
      <svg viewBox="0 0 120 66" className="w-full">
        <path
          d="M 10 60 A 50 50 0 0 1 110 60"
          fill="none"
          stroke="var(--chart-grid)"
          strokeWidth="10"
          strokeLinecap="round"
        />
        <path
          d="M 10 60 A 50 50 0 0 1 110 60"
          fill="none"
          stroke="#1a9c5b"
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={`${dash} ${ARC_LENGTH}`}
        />
      </svg>
      <div className="absolute inset-x-0 bottom-0 flex flex-col items-center leading-none">
        <span className="text-[18px] font-extrabold tracking-[-0.01em] text-ink-900">
          {modelConfidence.value}%
        </span>
        <span className="mt-[2px] text-[9px] font-bold text-ink-500">
          {modelConfidence.caption}
        </span>
      </div>
    </div>
  );
}

const IMPACT_CLS: Record<string, string> = {
  High: "tone-red",
  Medium: "tone-amber",
  Low: "tone-green",
};

/**
 * Confidence bukan black box: composite 87% didekomposisi per komponen,
 * risk factor diperkaya probabilitas + dampak + eksposur finansial.
 */
export function ModelConfidenceRisk() {
  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-3 pt-3"
      style={{ "--d": "180ms" } as React.CSSProperties}
    >
      <div className="flex items-start justify-between gap-2">
        <SectionHead title="Model Confidence & Risk" />
        <span className="shrink-0 rounded-full bg-[#fdf3e0] px-2 py-[3px] text-[8.5px] font-extrabold text-[#b45309]">
          Risk Score {scenarioRiskScore.value}/100
        </span>
      </div>

      <div className="mt-2 flex min-h-0 flex-1 items-start gap-4">
        <div className="flex w-[128px] shrink-0 flex-col items-center">
          <ConfidenceGauge />
          <ul className="mt-1.5 w-full">
            {confidenceBreakdown.map((c) => (
              <li key={c.label} className="flex items-center justify-between gap-1 py-[1px]">
                <span className="truncate text-[7.5px] font-semibold text-ink-500">
                  {c.label}
                </span>
                <span className="shrink-0 text-[7.5px] font-extrabold text-ink-900">
                  {c.value}%
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between text-[7.5px] font-bold uppercase tracking-wide text-ink-400">
            <span>Risk Factor</span>
            <span className="flex gap-3">
              <span>Prob</span>
              <span className="w-[44px] text-right">Exposure</span>
            </span>
          </div>
          <ul className="mt-1 flex flex-col gap-[5px]">
            {scenarioRisks.map((f) => (
              <li key={f.name} className="flex items-center justify-between gap-1.5">
                <span className="flex min-w-0 items-center gap-1.5">
                  <span
                    className={`inline-flex w-[42px] shrink-0 items-center justify-center rounded-full px-1 py-[2px] text-[9px] font-bold ${IMPACT_CLS[f.impact]}`}
                  >
                    {f.impact}
                  </span>
                  <span className="truncate text-[8.5px] font-bold text-ink-900">{f.name}</span>
                </span>
                <span className="flex shrink-0 gap-3 text-[8.5px] font-extrabold">
                  <span className="text-ink-700">{f.prob}</span>
                  <span className="w-[44px] text-right text-[#dc2626]">{f.exposure}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
