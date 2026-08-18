import { SectionHead } from "@/components/hc/SectionHead";
import { HEATMAP_IMPACT, HEATMAP_LIKELIHOOD, riskHeatmap } from "@/lib/prr-registry";

/** Warna sel mengikuti skor (likelihood x impact), bukan jumlah risiko di sel. */
function cellClass(score: number) {
  if (score >= 15) return "bg-[#ef4444] text-white";
  if (score >= 10) return "bg-[#f97316] text-white";
  if (score >= 5) return "bg-[#f5a524] text-white";
  if (score >= 3) return "bg-[#a3c94f] text-white";
  return "bg-[#1a9c5b] text-white";
}

const LEGEND = [
  { label: "Low", key: 1, cls: "bg-[#1a9c5b]" },
  { label: "Medium", key: 2, cls: "bg-[#f5a524]" },
  { label: "High", key: 3, cls: "bg-[#f97316]" },
  { label: "Critical", key: 4, cls: "bg-[#ef4444]" },
];

export function InherentHeatmap({
  counts,
}: {
  /** Jumlah per level untuk legenda. */
  counts: Record<string, number>;
}) {
  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-3 pt-3"
      style={{ "--d": "40ms" } as React.CSSProperties}
    >
      <SectionHead title="Risk Heatmap (Inherent Risk)" />

      <div className="mt-2 flex min-h-0 flex-1 gap-1.5">
        <div className="flex shrink-0 items-center">
          <span className="rotate-180 text-[9px] font-bold uppercase tracking-[0.06em] text-ink-500 [writing-mode:vertical-rl]">
            Likelihood
          </span>
        </div>

        <div className="flex min-w-0 flex-1 flex-col">
          <div className="flex min-h-0 flex-1 flex-col gap-[3px]">
            {riskHeatmap.map((row, r) => (
              <div key={HEATMAP_LIKELIHOOD[r]} className="flex min-h-0 flex-1 items-stretch gap-[3px]">
                <span className="flex w-[46px] shrink-0 items-center justify-end pr-1 text-[9px] font-semibold text-ink-500">
                  {HEATMAP_LIKELIHOOD[r]}
                </span>
                {row.map((cell) => (
                  <div
                    key={`${cell.likelihood}-${cell.impact}`}
                    title={`Likelihood ${cell.likelihood} x Impact ${cell.impact} — skor ${cell.score}, ${cell.count} risiko`}
                    className={`flex min-w-0 flex-1 items-center justify-center rounded-[5px] text-[9.5px] font-bold ${cellClass(
                      cell.score,
                    )}`}
                  >
                    {cell.count}
                  </div>
                ))}
              </div>
            ))}
          </div>

          <div className="mt-[3px] flex gap-[3px]">
            <span className="w-[46px] shrink-0" />
            {HEATMAP_IMPACT.map((label) => (
              <span
                key={label}
                className="min-w-0 flex-1 text-center text-[7.5px] font-semibold leading-[1.15] text-ink-500"
              >
                {label}
              </span>
            ))}
          </div>
          <div className="mt-[2px] text-center text-[9px] font-bold uppercase tracking-[0.06em] text-ink-500">
            Impact
          </div>
        </div>
      </div>

      <div className="mt-2 flex flex-wrap items-center justify-center gap-x-3 gap-y-1">
        {LEGEND.map((l) => (
          <span key={l.label} className="flex items-center gap-1 text-[8.5px] text-ink-500">
            <span className={`h-[7px] w-[7px] rounded-[2px] ${l.cls}`} />
            {l.label} ({counts[l.label] ?? 0})
          </span>
        ))}
      </div>
    </div>
  );
}
