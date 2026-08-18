import { Sparkles } from "lucide-react";
import { kontrakInsights } from "@/lib/pgd-data-detail";
import { ScopeNote } from "@/components/ui/ScopeNote";

/** Insight & rekomendasi halaman Kontrak Pengadaan. */
export function KontrakInsight() {
  return (
    <div
      className="card anim-rise px-4 pb-3.5 pt-3"
      style={{ "--d": "120ms" } as React.CSSProperties}
    >
      <h3 className="text-[10px] font-extrabold uppercase tracking-[0.05em] text-ink-900">
        Insight &amp; Rekomendasi{" "}
        <span className="font-semibold normal-case tracking-normal text-ink-400">
          (Decision-grade)
        </span>{" "}
        <ScopeNote className="align-middle normal-case tracking-normal" />
      </h3>

      <div className="mt-2.5 grid grid-cols-2 md:grid-cols-3 gap-3">
        {kontrakInsights.map((ins, i) => (
          <div key={ins.insight} className="flex items-start gap-2.5">
            <span className="flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded-full bg-[#e8f1fd] text-[9.5px] font-extrabold text-[#2f6fe4]">
              {i + 1}
            </span>
            <div className="min-w-0">
              <p className="text-[9px] leading-snug text-ink-700">{ins.insight}</p>
              <p className="mt-[4px] flex items-start gap-1 text-[8.5px] leading-snug text-ink-700">
                <Sparkles size={9} className="mt-[1px] shrink-0 text-ptpn-green" />
                <span>
                  <span className="font-bold text-ptpn-green">Rekomendasi:</span> {ins.rekomendasi}
                </span>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
