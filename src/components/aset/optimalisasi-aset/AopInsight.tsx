import { ArrowRight, Lightbulb, ScrollText } from "lucide-react";
import { aopGovernanceFootnote, aopInsights } from "@/lib/aop-data";
import type { AstInsight } from "@/lib/ast-core";
import { ScopeNote } from "@/components/ui/ScopeNote";

const TONES: Record<AstInsight["tone"], { bg: string; icon: string; title: string }> = {
  green: { bg: "bg-ptpn-greenLight", icon: "text-ptpn-green", title: "text-ptpn-green" },
  amber: { bg: "bg-[#fdf3e0]", icon: "text-[#d98b06]", title: "text-[#d98b06]" },
  blue: { bg: "bg-[#e8f1fd]", icon: "text-[#2f6fe4]", title: "text-[#2f6fe4]" },
  red: { bg: "bg-[#fdecec]", icon: "text-[#ef4444]", title: "text-[#ef4444]" },
};

/** Insight halaman Optimalisasi Aset + footnote governance divestasi BUMN/Danantara. */
export function AopInsight() {
  return (
    <>
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
            <ScopeNote className="align-middle normal-case tracking-normal" />
          </h3>
          <button className="flex shrink-0 items-center gap-1.5 rounded-lg border border-[#e3e9ef] bg-white px-3 py-[6px] text-[9.5px] font-semibold text-ink-700 transition-colors hover:border-ptpn-green hover:text-ptpn-green">
            Lihat Semua Insight <ArrowRight size={11} />
          </button>
        </div>

        <div className="mt-2.5 grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-3">
          {aopInsights.map((ins) => {
            const tone = TONES[ins.tone];
            return (
              <div key={ins.title} className="flex items-start gap-2.5">
                <span
                  className={`flex h-[30px] w-[30px] shrink-0 items-center justify-center rounded-full ${tone.bg} ${tone.icon}`}
                >
                  <Lightbulb size={14} strokeWidth={1.9} />
                </span>
                <div className="min-w-0">
                  <div className={`text-[9.5px] font-bold leading-snug ${tone.title}`}>
                    {ins.title}
                  </div>
                  <p className="mt-[3px] text-[8.5px] leading-snug text-ink-500">{ins.text}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div
        className="anim-rise flex items-start gap-2.5 rounded-xl border border-[#eef2f6] bg-[#f8fafc] px-4 pb-3 pt-3"
        style={{ "--d": "160ms" } as React.CSSProperties}
      >
        <span className="flex h-[26px] w-[26px] shrink-0 items-center justify-center rounded-lg bg-[#eef2f6] text-ink-500">
          <ScrollText size={13} strokeWidth={1.9} />
        </span>
        <div className="min-w-0">
          <div className="text-[9px] font-extrabold uppercase tracking-[0.05em] text-ink-500">
            Catatan Governance Divestasi (BUMN / Danantara)
          </div>
          <p className="mt-[4px] text-[8.5px] leading-[1.5] text-ink-500">
            {aopGovernanceFootnote}
          </p>
        </div>
      </div>
    </>
  );
}
