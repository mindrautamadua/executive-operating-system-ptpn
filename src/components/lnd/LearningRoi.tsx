import { ArrowRight } from "lucide-react";
import { costEfficiency, perfAssociation, roiTiers } from "@/lib/lnd-data";

/**
 * ROI bertingkat: hanya program strategis dinilai ROI finansial;
 * tier lain dinilai skill gain / risk reduction / compliance rate.
 */
export function LearningRoi() {
  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-2.5 pt-3"
      style={{ "--d": "340ms" } as React.CSSProperties}
    >
      <h3 className="card-title-navy">Learning ROI &amp; Efisiensi per Tier</h3>

      <div className="mt-1.5 flex min-h-0 flex-1 flex-col justify-around">
        {roiTiers.map((t) => (
          <div key={t.tier} className="flex items-center gap-2.5">
            <span
              className="h-[26px] w-[3px] shrink-0 rounded-full"
              style={{ background: t.color }}
            />
            <div className="min-w-0 flex-1 leading-[1.25]">
              <div className="flex items-baseline gap-1.5">
                <span className="text-[10px] font-bold text-ink-900">{t.tier}</span>
                <span className="text-[8.5px] tabular-nums text-ink-400">
                  {t.programs} program · {t.inv}
                </span>
              </div>
              <div className="truncate text-[8.5px] text-ink-500">{t.note}</div>
            </div>
            <div className="w-[64px] shrink-0 text-right leading-[1.2]">
              <div className="text-[12px] font-extrabold tabular-nums text-ink-900">
                {t.metric}
              </div>
              <div className="whitespace-nowrap text-[9px] text-ink-500">{t.metricLabel}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-1.5 grid grid-cols-2 gap-2">
        {costEfficiency.map((c) => (
          <div
            key={c.label}
            className="rounded-lg border border-[#e3e9ef] bg-[#f8fafc] px-2 py-[5px] leading-[1.2]"
          >
            <span className="block text-[9px] font-semibold uppercase tracking-[0.03em] text-ink-500">
              {c.label}
            </span>
            <span className="text-[10.5px] font-extrabold tabular-nums text-ink-900">
              {c.value}
            </span>
            <span className="ml-1 text-[8.5px] font-bold tabular-nums text-[#1a9c5b]">
              {c.delta} vs Q1
            </span>
          </div>
        ))}
      </div>

      <p className="mt-1.5 text-[8.5px] leading-[1.35] text-ink-400">
        Skor kinerja peserta {perfAssociation.trained} vs non-peserta {perfAssociation.untrained}{" "}
        (<span className="font-semibold text-ink-700">{perfAssociation.diff}</span>) — asosiasi,
        bukan klaim kausal.
      </p>

      <button className="link-more mt-1 flex items-center gap-1">
        Lihat detail value model <ArrowRight size={11} />
      </button>
    </div>
  );
}
