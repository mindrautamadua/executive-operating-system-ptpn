import { ArrowRight, CircleAlert, Info, Sparkles, TrendingUp, TriangleAlert } from "lucide-react";
import { sbmInsights, sbmSources } from "@/lib/sbm-data";
import type { StgInsight } from "@/lib/stg-core";
import { ScopeNote } from "@/components/ui/ScopeNote";

const TONES: Record<StgInsight["tone"], { bg: string; icon: string; title: string }> = {
  good: { bg: "bg-ptpn-greenLight", icon: "text-ptpn-green", title: "text-ptpn-green" },
  warn: { bg: "bg-[#fdf3e0]", icon: "text-[#d98b06]", title: "text-[#d98b06]" },
  bad: { bg: "bg-[#fdecec]", icon: "text-[#ef4444]", title: "text-[#ef4444]" },
  info: { bg: "bg-[#e8f1fd]", icon: "text-[#2f6fe4]", title: "text-[#2f6fe4]" },
};

const ICONS = {
  good: TrendingUp,
  warn: TriangleAlert,
  bad: CircleAlert,
  info: Info,
} as const;

/** Kartu Insight & Rekomendasi halaman Benchmark Industri + footnote sumber. */
export function SbmInsight() {
  return (
    <div
      className="card anim-rise px-4 pb-3.5 pt-3"
      style={{ "--d": "120ms" } as React.CSSProperties}
    >
      <div className="flex items-center justify-between gap-2">
        <h3 className="text-[10px] font-extrabold uppercase tracking-[0.05em] text-ink-900">
          Insight &amp; Rekomendasi{" "}
          <span className="font-semibold normal-case tracking-normal text-ink-400">
            (Decision-grade)
          </span>{" "}
          <ScopeNote />
        </h3>
        <button className="flex shrink-0 items-center gap-1.5 rounded-lg border border-[#e3e9ef] bg-white px-3 py-[6px] text-[9.5px] font-semibold text-ink-700 transition-colors hover:border-ptpn-green hover:text-ptpn-green">
          Lihat Semua Insight <ArrowRight size={11} />
        </button>
      </div>

      <div className="mt-2.5 grid grid-cols-2 md:grid-cols-3 gap-4">
        {sbmInsights.map((ins) => {
          const Icon = ICONS[ins.tone];
          const tone = TONES[ins.tone];
          return (
            <div key={ins.title} className="flex items-start gap-2.5">
              <span
                className={`flex h-[30px] w-[30px] shrink-0 items-center justify-center rounded-full ${tone.bg} ${tone.icon}`}
              >
                <Icon size={14} strokeWidth={1.9} />
              </span>
              <div className="min-w-0">
                <div className={`text-[9.5px] font-bold leading-snug ${tone.title}`}>
                  {ins.title}
                </div>
                <p className="mt-[3px] flex items-start gap-1 text-[8.5px] leading-snug text-ink-700">
                  <Sparkles size={9} className="mt-[1px] shrink-0 text-ptpn-green" />
                  <span>{ins.text}</span>
                </p>
              </div>
            </div>
          );
        })}
      </div>

      <p className="mt-3 border-t border-[#f5f8fa] pt-2 text-[9px] leading-snug text-ink-500">
        {sbmSources}
      </p>
    </div>
  );
}
