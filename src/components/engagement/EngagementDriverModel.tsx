import { Target } from "lucide-react";
import { driverModel } from "@/lib/engagement-data";
import { PALETTE } from "@/lib/chart-palette";

const IMPACT_CHIP: Record<string, string> = {
  "Very High": "tone-red",
  High: "tone-amber",
  Medium: "tone-slate",
};

const GAP_LABEL: Record<string, { text: string; chip: string }> = {
  prioritas: { text: "Prioritas", chip: "tone-red" },
  jaga: { text: "Jaga", chip: "tone-green" },
  pantau: { text: "Pantau", chip: "tone-slate" },
};

/**
 * Engagement Driver Model: skor per driver + kontribusi relatif terhadap
 * engagement (relative weight analysis). Membedakan "skor rendah" dari
 * "dampak tinggi" — driver prioritas = skor rendah × impact tinggi.
 */
export function EngagementDriverModel() {
  const maxImpact = Math.max(...driverModel.map((d) => d.impactPct));

  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-2.5 pt-3"
      style={{ "--d": "80ms" } as React.CSSProperties}
    >
      <div className="flex items-start justify-between gap-2">
        <h3 className="card-title-navy flex items-center gap-1.5">
          <Target size={13} className="text-[#1b3a6b]" />
          Engagement Driver Model
        </h3>
        <span className="shrink-0 text-[8.5px] text-ink-400">Relative weight analysis</span>
      </div>
      <p className="mt-[3px] text-[9px] text-ink-500">
        Skor driver vs kontribusi terhadap engagement — skor rendah × impact tinggi = prioritas
      </p>

      <div className="mt-2 grid grid-cols-[minmax(0,1fr)_54px_92px_60px_54px] items-center gap-x-2 gap-y-0 text-[9px] font-bold text-ink-500">
        <span>Driver</span>
        <span className="text-right">Skor</span>
        <span>Impact</span>
        <span className="text-center">Bobot</span>
        <span className="text-center">Aksi</span>
      </div>

      <div className="mt-1 flex min-h-0 flex-1 flex-col justify-between">
        {driverModel.map((d, i) => {
          const gap = GAP_LABEL[d.gap];
          return (
            <div
              key={d.driver}
              className="grid grid-cols-[minmax(0,1fr)_54px_92px_60px_54px] items-center gap-x-2"
            >
              <span className="truncate text-[9.5px] text-ink-900">{d.driver}</span>
              <span
                className="text-right text-[9.5px] font-extrabold tabular-nums"
                style={{ color: d.skor < 75 ? PALETTE.red : "inherit" }}
              >
                {d.skor}
              </span>
              <span className="relative h-[7px] w-full overflow-hidden rounded-full bg-[#eef2f6]">
                <span
                  className="anim-grow-x block h-full rounded-full"
                  style={
                    {
                      width: `${(d.impactPct / maxImpact) * 100}%`,
                      background: d.impact === "Very High" ? PALETTE.red : d.impact === "High" ? PALETTE.amber : "#94a3b8",
                      "--d": `${70 * i}ms`,
                    } as React.CSSProperties
                  }
                />
              </span>
              <span
                className={`${IMPACT_CHIP[d.impact]} justify-self-center rounded px-1.5 py-[2px] text-center text-[7.5px] font-bold leading-none`}
              >
                +{d.impactPct}%
              </span>
              <span
                className={`${gap.chip} justify-self-center rounded px-1.5 py-[2px] text-[7.5px] font-bold leading-none`}
              >
                {gap.text}
              </span>
            </div>
          );
        })}
      </div>

      <p className="mt-1.5 border-t border-[#eef2f6] pt-1.5 text-[8.5px] leading-snug text-ink-500">
        <span className="font-bold text-ink-700">Work-life Balance &amp; Karier</span> = skor
        terendah sekaligus impact terbesar (+18% / +15%) — perbaikan di sini paling menggerakkan
        engagement.
      </p>
    </div>
  );
}
