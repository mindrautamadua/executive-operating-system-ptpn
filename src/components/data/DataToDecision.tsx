import { ArrowRight } from "lucide-react";
import { funnelFooter, funnelKeputusan } from "@/lib/data-analytics";

/**
 * Funnel data-to-decision: dari record mentah sampai aksi bisnis.
 * Menjawab "apakah data benar-benar dipakai mengambil keputusan?" —
 * bukan sekadar metrik penggunaan (query, dashboard, laporan).
 */
export function DataToDecision() {
  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-2.5 pt-3"
      style={{ "--d": "360ms" } as React.CSSProperties}
    >
      <h3 className="card-title-navy">
        Data-to-Decision Funnel{" "}
        <span className="text-[9.5px] font-medium normal-case tracking-normal text-ink-400">
          (Q2 2026)
        </span>
      </h3>

      <div className="mt-1.5 flex min-h-0 flex-1 flex-col justify-around">
        {funnelKeputusan.map((f, i) => (
          <div key={f.label} className="flex items-center gap-2">
            <span className="w-[62px] shrink-0 text-[9.5px] font-semibold text-ink-700">
              {f.label}
            </span>
            <div className="flex h-[15px] flex-1 justify-center">
              <div
                className="anim-grow-x flex h-full items-center justify-center rounded-[3px]"
                style={
                  {
                    width: `${f.width}%`,
                    background: f.color,
                    "--d": `${i * 70}ms`,
                  } as React.CSSProperties
                }
              >
                <span className="text-[9px] font-bold tabular-nums text-white">{f.value}</span>
              </div>
            </div>
            <span className="w-[118px] shrink-0 text-right text-[9px] text-ink-500">
              {f.caption}
            </span>
          </div>
        ))}
      </div>

      <div className="mt-1 border-t border-[#f0f3f6] pt-1.5 text-[9px] text-ink-500">
        {funnelFooter}
      </div>

      <button className="link-more mt-1 flex items-center gap-1">
        Lihat analitik penggunaan <ArrowRight size={11} />
      </button>
    </div>
  );
}
