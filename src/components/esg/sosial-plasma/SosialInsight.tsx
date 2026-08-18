import { ArrowRight, ShieldCheck, Sparkles, TrendingUp, TriangleAlert } from "lucide-react";
import { sosialInsights } from "@/lib/esg-data-detail";

const ICONS = [TrendingUp, TriangleAlert, ShieldCheck];

const TONES: { bg: string; icon: string }[] = [
  { bg: "bg-ptpn-greenLight", icon: "text-ptpn-green" },
  { bg: "bg-[#fdf3e0]", icon: "text-[#d98b06]" },
  { bg: "bg-[#e8f1fd]", icon: "text-[#2f6fe4]" },
];

export function SosialInsight() {
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
          </span>
        </h3>
        <button className="flex shrink-0 items-center gap-1.5 rounded-lg border border-[#e3e9ef] bg-white px-3 py-[6px] text-[9.5px] font-semibold text-ink-700 transition-colors hover:border-ptpn-green hover:text-ptpn-green">
          Lihat Semua Insight <ArrowRight size={11} />
        </button>
      </div>

      <div className="mt-2.5 grid grid-cols-2 md:grid-cols-3 gap-4">
        {sosialInsights.map((ins, i) => {
          const Icon = ICONS[i % ICONS.length];
          const tone = TONES[i % TONES.length];
          return (
            <div key={ins.insight} className="flex items-start gap-2.5">
              <span
                className={`flex h-[30px] w-[30px] shrink-0 items-center justify-center rounded-full ${tone.bg} ${tone.icon}`}
              >
                <Icon size={14} strokeWidth={1.9} />
              </span>
              <div className="min-w-0">
                <p className="text-[8.5px] leading-snug text-ink-700">{ins.insight}</p>
                <p className="mt-[4px] flex items-start gap-1 text-[8.5px] leading-snug text-ink-700">
                  <Sparkles size={9} className="mt-[1px] shrink-0 text-ptpn-green" />
                  <span>
                    <span className="font-bold text-ptpn-green">Rekomendasi:</span>{" "}
                    {ins.rekomendasi}
                  </span>
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
