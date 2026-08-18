import { ChevronRight, Gavel } from "lucide-react";
import { bodDecisions, DECISION_STYLE } from "@/lib/succession-data";

/**
 * BOD Succession Decision Center: keputusan yang menunggu persetujuan
 * Direksi, dengan masalah + rekomendasi eksplisit per posisi.
 */
export function BodDecisionCenter() {
  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-3 pt-3"
      style={{ "--d": "960ms" } as React.CSSProperties}
    >
      <div className="flex items-start justify-between gap-2">
        <h3 className="card-title-navy flex items-center gap-1.5">
          <Gavel size={13} className="text-[#1b3a6b]" />
          BOD Succession Decision Center
        </h3>
        <span className="shrink-0 text-[9px] font-semibold text-ink-500">
          2 keputusan • 1 peluang
        </span>
      </div>

      <div className="mt-2.5 grid min-h-0 flex-1 grid-cols-3 gap-2.5">
        {bodDecisions.map((d) => {
          const style = DECISION_STYLE[d.prioritas];
          return (
            <div
              key={d.posisi}
              className="flex min-w-0 flex-col rounded-xl border border-[#eef2f6] px-3 py-2.5"
              style={{ borderTop: `3px solid ${style.border}` }}
            >
              <span
                className={`inline-flex w-fit items-center rounded px-1.5 py-[2px] text-[9px] font-bold leading-none ${style.chip}`}
              >
                {d.label}
              </span>
              <div className="mt-1.5 truncate text-[10.5px] font-bold leading-tight text-ink-900">
                {d.posisi}
              </div>
              <div className="truncate text-[8.5px] text-ink-500">{d.unit}</div>
              <p className="mt-1.5 line-clamp-2 text-[8.5px] leading-[1.45] text-ink-700">
                {d.masalah}
              </p>
              <p className="mt-auto pt-1.5 text-[8.5px] leading-[1.45] text-ink-700">
                <span className="font-bold text-ink-900">Rekomendasi: </span>
                {d.rekomendasi}
              </p>
              <button className="link-more mt-1.5 flex cursor-pointer items-center gap-0.5">
                Tinjau & putuskan <ChevronRight size={11} />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
