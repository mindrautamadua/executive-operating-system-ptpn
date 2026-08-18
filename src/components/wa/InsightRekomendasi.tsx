"use client";

import Link from "next/link";
import {
  Activity,
  ArrowRight,
  BrainCircuit,
  RefreshCw,
  Sparkles,
  TrendingUp,
  UsersRound,
} from "lucide-react";
import { waInsights } from "@/lib/wa-data";
import { ScopeNote } from "../ui/ScopeNote";

const ICONS = {
  growth: TrendingUp,
  turnover: RefreshCw,
  generation: UsersRound,
  skills: BrainCircuit,
  productivity: Activity,
};

const TONES: Record<string, { bg: string; icon: string; title: string }> = {
  green: { bg: "bg-ptpn-greenLight", icon: "text-ptpn-green", title: "text-ptpn-green" },
  amber: { bg: "bg-[#fdf3e0]", icon: "text-[#d98b06]", title: "text-[#d98b06]" },
  blue: { bg: "bg-[#e8f1fd]", icon: "text-[#2f6fe4]", title: "text-[#2f6fe4]" },
  pink: { bg: "bg-[#fdeef2]", icon: "text-[#ec4899]", title: "text-[#ec4899]" },
  teal: { bg: "bg-[#e6f6f5]", icon: "text-[#0d9488]", title: "text-[#0d9488]" },
};

export function InsightRekomendasi() {
  return (
    <div
      className="card anim-rise px-4 pb-3.5 pt-3"
      style={{ "--d": "120ms" } as React.CSSProperties}
    >
      <div className="flex items-center justify-between gap-2">
        <h3 className="flex min-w-0 items-center gap-1.5 text-[10px] font-extrabold uppercase tracking-[0.05em] text-ink-900">
          <span>
            Insight &amp; Rekomendasi{" "}
            <span className="font-semibold normal-case tracking-normal text-ink-400">
              (Decision-grade)
            </span>
          </span>
          <ScopeNote />
        </h3>
        <Link
          href="/workforce-analytics/insight"
          className="flex shrink-0 items-center gap-1.5 rounded-lg border border-[#e3e9ef] bg-white px-3 py-[6px] text-[9.5px] font-semibold text-ink-700 transition-colors hover:border-ptpn-green hover:text-ptpn-green"
        >
          Lihat Semua Insight <ArrowRight size={11} />
        </Link>
      </div>

      <div className="mt-2.5 grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-3">
        {waInsights.map((ins) => {
          const Icon = ICONS[ins.icon];
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
                <p className="mt-[3px] text-[8.5px] leading-snug text-ink-500">{ins.text}</p>
                <p className="mt-[4px] flex items-start gap-1 text-[8.5px] leading-snug text-ink-700">
                  <Sparkles size={9} className="mt-[1px] shrink-0 text-ptpn-green" />
                  <span>
                    <span className="font-bold text-ptpn-green">Rekomendasi:</span> {ins.rec}
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
