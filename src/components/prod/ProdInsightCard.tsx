"use client";

import { AlertTriangle, ArrowRight, Info, ShieldAlert, TrendingUp } from "lucide-react";
import type { ProdInsight } from "@/lib/produksi-data";

const TONES: Record<
  ProdInsight["tone"],
  { bg: string; icon: string; title: string; Icon: typeof Info }
> = {
  red: { bg: "bg-[#fdecec]", icon: "text-[#ef4444]", title: "text-[#ef4444]", Icon: ShieldAlert },
  amber: {
    bg: "bg-[#fdf3e0]",
    icon: "text-[#d98b06]",
    title: "text-[#d98b06]",
    Icon: AlertTriangle,
  },
  green: {
    bg: "bg-ptpn-greenLight",
    icon: "text-ptpn-green",
    title: "text-ptpn-green",
    Icon: TrendingUp,
  },
  blue: { bg: "bg-[#e8f1fd]", icon: "text-[#2f6fe4]", title: "text-[#2f6fe4]", Icon: Info },
};

/** Kartu Insight & Rekomendasi standar halaman Produksi (mirror InsightRekomendasi wa/). */
export function ProdInsightCard({
  insights,
  cols = 3,
}: {
  insights: ProdInsight[];
  cols?: 3 | 4;
}) {
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

      <div className={`mt-2.5 grid gap-3 ${cols === 4 ? "grid-cols-2 md:grid-cols-4" : "grid-cols-2 md:grid-cols-3"}`}>
        {insights.map((ins) => {
          const tone = TONES[ins.tone];
          const Icon = tone.Icon;
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
                <p className="mt-[3px] text-[8.5px] leading-snug text-ink-500">{ins.text}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
