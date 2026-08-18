import { ShieldAlert } from "lucide-react";
import { femalePipeline, femalePipelineRisk } from "@/lib/di-data";
import { PALETTE } from "@/lib/chart-palette";

const TONE_COLOR = {
  green: PALETTE.green,
  amber: PALETTE.amber,
  red: PALETTE.red,
} as const;

export function FemaleTalentPipeline() {
  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-2.5 pt-3"
      style={{ "--d": "180ms" } as React.CSSProperties}
    >
      <h3 className="card-title-navy">Female Talent Pipeline</h3>
      <p className="mt-[3px] text-[9px] text-ink-500">
        Koneksi ke Talent Intelligence & Succession Planning
      </p>

      <div className="mt-1 flex min-h-0 flex-1 flex-col justify-around">
        {femalePipeline.map((s, i) => (
          <div key={s.label} className="flex items-center gap-2.5">
            <span className="min-w-0 flex-1 leading-[1.25]">
              <span className="block truncate text-[9px] font-semibold text-ink-900">
                {s.label}
              </span>
              <span className="block truncate text-[8.5px] text-ink-500">{s.detail}</span>
            </span>
            <span className="w-[64px] shrink-0">
              <span className="block h-[6px] overflow-hidden rounded-full bg-[#f2f5f8]">
                <span
                  className="anim-grow-x block h-full rounded-full"
                  style={
                    {
                      width: `${s.pct}%`,
                      background: TONE_COLOR[s.tone],
                      "--d": `${i * 60}ms`,
                    } as React.CSSProperties
                  }
                />
              </span>
            </span>
            <span className="w-[44px] shrink-0 text-right text-[13px] font-extrabold tabular-nums text-ink-900">
              {s.nilai}
            </span>
          </div>
        ))}
      </div>

      <p className="mt-1 flex items-start gap-1.5 rounded-lg bg-[#fdf3f3] px-2 py-[5px] text-[8.5px] leading-[1.35] text-ink-700">
        <ShieldAlert size={11} className="mt-[1px] shrink-0 text-[#ef4444]" />
        <span>{femalePipelineRisk}</span>
      </p>
    </div>
  );
}
