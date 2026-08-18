import { ChevronRight, Gavel, TrendingUp } from "lucide-react";
import { exposureWaterfall, RC_DECISION_STYLE, rcDecisions } from "@/lib/rc-data";

/**
 * BOD Compliance Decision Center: keputusan yang menunggu Direksi,
 * lengkap dengan decision economics ("what happens if we do nothing").
 */
export function RcBodDecisionCenter() {
  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-3 pt-3"
      style={{ "--d": "540ms" } as React.CSSProperties}
    >
      <div className="flex items-start justify-between gap-2">
        <h3 className="card-title-navy flex items-center gap-1.5">
          <Gavel size={13} className="text-[#1b3a6b]" />
          BOD Compliance Decision Center
        </h3>
        <span className="shrink-0 text-[9px] font-semibold text-ink-500">
          2 keputusan • 1 tindakan manajemen
        </span>
      </div>

      <div className="mt-2 flex items-center gap-0 rounded-lg border border-[#eef2f6] bg-[#fbfcfd] px-2 py-1.5">
        {exposureWaterfall.map((w, i) => (
          <div key={w.label} className="flex min-w-0 flex-1 items-center">
            {i > 0 && <ChevronRight size={12} className="mx-1 shrink-0 text-ink-400" />}
            <div className="min-w-0 leading-[1.25]">
              <span
                className={`block text-[10.5px] font-extrabold ${
                  i === exposureWaterfall.length - 1 ? "text-ptpn-green" : "text-ink-900"
                }`}
              >
                {w.value}
              </span>
              <span className="block truncate text-[7.5px] font-semibold uppercase tracking-[0.03em] text-ink-400">
                {w.label}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-2 grid min-h-0 flex-1 grid-cols-3 gap-2.5">
        {rcDecisions.map((d) => {
          const style = RC_DECISION_STYLE[d.prioritas];
          return (
            <div
              key={d.title}
              className="flex min-w-0 flex-col rounded-xl border border-[#eef2f6] px-3 py-2"
              style={{ borderTop: `3px solid ${style.border}` }}
            >
              <div className="flex items-center justify-between gap-1.5">
                <span
                  className={`inline-flex w-fit items-center rounded px-1.5 py-[2px] text-[9px] font-bold leading-none ${style.chip}`}
                >
                  {d.label}
                </span>
                <span className="text-[9.5px] font-extrabold text-[#ef4444]">{d.exposure}</span>
              </div>
              <div className="mt-1.5 truncate text-[10.5px] font-bold leading-tight text-ink-900">
                {d.title}
              </div>
              <p className="mt-1 line-clamp-2 text-[9px] leading-[1.4] text-ink-700">
                {d.context}
              </p>
              <p
                className="mt-1 flex items-center gap-1 text-[9px] font-semibold text-[#b91c1c]"
                title={`Estimasi eksposur jika ditunda 3 bulan: ${d.ifDelayed[0]}, 6 bulan: ${d.ifDelayed[1]}`}
              >
                <TrendingUp size={10} className="shrink-0" />
                Jika ditunda: {d.ifDelayed[0]} (3 bln) · {d.ifDelayed[1]} (6 bln)
              </p>
              <p className="mt-auto pt-1 text-[9px] leading-[1.4] text-ink-700">
                <span className="font-bold text-ink-900">Rekomendasi: </span>
                {d.rekomendasi}
              </p>
              <button className="link-more mt-1 flex cursor-pointer items-center gap-0.5">
                Tinjau &amp; putuskan <ChevronRight size={11} />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
