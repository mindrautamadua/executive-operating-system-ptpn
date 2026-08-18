import Link from "next/link";
import { ArrowRight, Lightbulb, Sparkles } from "lucide-react";
import { dataCrossLinks, dataInsights } from "@/lib/tik-data-detail";

/**
 * Insight & Rekomendasi Data & AI Governance — mirror TikInsightGrid, dengan
 * tautan pendalaman ke /data-analytics (lingkup SDM) dan modul terkait.
 */
export function DataInsight() {
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
        <Link
          href="/data-analytics"
          className="flex shrink-0 items-center gap-1.5 rounded-lg border border-[#e3e9ef] bg-white px-3 py-[6px] text-[9.5px] font-semibold text-ink-700 transition-colors hover:border-ptpn-green hover:text-ptpn-green"
        >
          Pendalaman Data &amp; Analytics SDM <ArrowRight size={11} />
        </Link>
      </div>

      <div className="mt-2.5 grid grid-cols-2 md:grid-cols-4 gap-3">
        {dataInsights.map((ins) => (
          <div key={ins.insight} className="flex items-start gap-2.5">
            <span className="flex h-[30px] w-[30px] shrink-0 items-center justify-center rounded-full bg-[#e8f1fd] text-[#2f6fe4]">
              <Lightbulb size={14} strokeWidth={1.9} />
            </span>
            <div className="min-w-0">
              <p className="text-[8.5px] leading-snug text-ink-700">{ins.insight}</p>
              <p className="mt-[4px] flex items-start gap-1 text-[8.5px] leading-snug text-ink-500">
                <Sparkles size={9} className="mt-[1px] shrink-0 text-ptpn-green" />
                <span>
                  <span className="font-bold text-ptpn-green">Rekomendasi:</span> {ins.rekomendasi}
                </span>
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-3 flex items-start gap-2 border-t border-[#eef2f6] pt-2.5">
        <span className="shrink-0 text-[8.5px] font-extrabold uppercase tracking-[0.05em] text-ink-400">
          Pendalaman
        </span>
        <div className="flex min-w-0 flex-1 flex-wrap items-start gap-x-4 gap-y-1.5">
          {dataCrossLinks.map((c) => (
            <Link
              key={c.href}
              href={c.href}
              className="group flex min-w-0 max-w-[32%] items-start gap-1.5"
            >
              <ArrowRight
                size={10}
                className="mt-[2px] shrink-0 text-ptpn-green"
                strokeWidth={2.2}
              />
              <span className="min-w-0">
                <span className="text-[9px] font-bold text-ptpn-green group-hover:underline">
                  {c.label}
                </span>
                <span className="mt-[2px] block text-[9px] leading-snug text-ink-500">
                  {c.catatan}
                </span>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
