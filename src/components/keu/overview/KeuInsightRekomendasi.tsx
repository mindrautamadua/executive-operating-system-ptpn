import { ArrowRight, Sparkles, TrendingUp, Wallet, Activity } from "lucide-react";
import { keuInsights } from "@/lib/keu-data";
import { ScopeNote } from "@/components/ui/ScopeNote";

/** Judul, ikon & tone presentasional per insight (urutan mengikuti keuInsights). */
const META = [
  { title: "Kualitas Laba", Icon: TrendingUp, bg: "bg-ptpn-greenLight", cls: "text-ptpn-green" },
  { title: "Likuiditas & Cash Pooling", Icon: Wallet, bg: "bg-[#e8f1fd]", cls: "text-[#2f6fe4]" },
  { title: "Sensitivitas Harga CPO", Icon: Activity, bg: "bg-[#fdf3e0]", cls: "text-[#d98b06]" },
];

export function KeuInsightRekomendasi() {
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
          <ScopeNote className="ml-1.5 align-middle" />
        </h3>
        <button className="flex shrink-0 items-center gap-1.5 rounded-lg border border-[#e3e9ef] bg-white px-3 py-[6px] text-[9.5px] font-semibold text-ink-700 transition-colors hover:border-ptpn-green hover:text-ptpn-green">
          Lihat Semua Insight <ArrowRight size={11} />
        </button>
      </div>

      <div className="mt-2.5 grid grid-cols-2 md:grid-cols-3 gap-3">
        {keuInsights.map((ins, i) => {
          const meta = META[i % META.length];
          const Icon = meta.Icon;
          return (
            <div key={ins.insight} className="flex items-start gap-2.5">
              <span
                className={`flex h-[30px] w-[30px] shrink-0 items-center justify-center rounded-full ${meta.bg} ${meta.cls}`}
              >
                <Icon size={14} strokeWidth={1.9} />
              </span>
              <div className="min-w-0">
                <div className={`text-[9.5px] font-bold leading-snug ${meta.cls}`}>{meta.title}</div>
                <p className="mt-[3px] text-[8.5px] leading-snug text-ink-500">{ins.insight}</p>
                <p className="mt-[4px] flex items-start gap-1 text-[8.5px] leading-snug text-ink-700">
                  <Sparkles size={9} className="mt-[1px] shrink-0 text-ptpn-green" />
                  <span>
                    <span className="font-bold text-ptpn-green">Rekomendasi:</span> {ins.rekomendasi}
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
