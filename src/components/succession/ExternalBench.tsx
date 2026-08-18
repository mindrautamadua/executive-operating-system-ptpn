import { Globe } from "lucide-react";
import { externalBench } from "@/lib/succession-data";
import { SEMANTIC } from "@/lib/chart-palette";

const KETERSEDIAAN_STYLE: Record<string, string> = {
  Tinggi: "tone-green",
  Sedang: "tone-amber",
  Rendah: "tone-red",
};

/**
 * External succession bench: market intelligence per posisi sulit diisi —
 * kekuatan internal vs ketersediaan kandidat benchmark eksternal (tanpa nama).
 */
export function ExternalBench() {
  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-3 pt-3"
      style={{ "--d": "1200ms" } as React.CSSProperties}
    >
      <div className="flex items-start justify-between gap-2">
        <h3 className="card-title-navy flex items-center gap-1.5">
          <Globe size={13} className="text-[#1b3a6b]" />
          External Succession Bench
        </h3>
        <span className="shrink-0 text-[8.5px] font-medium text-ink-400">
          Market intelligence — kandidat benchmark, bukan nominasi
        </span>
      </div>

      <div className="mt-2.5 grid min-h-0 flex-1 grid-cols-2 md:grid-cols-4 gap-2.5">
        {externalBench.map((e) => (
          <div
            key={e.posisi}
            className="flex min-w-0 flex-col rounded-xl border border-[#eef2f6] px-3 py-2.5"
          >
            <div className="flex items-start justify-between gap-1.5">
              <span className="truncate text-[9.5px] font-bold leading-tight text-ink-900">
                {e.posisi}
              </span>
              <span
                className={`inline-flex shrink-0 items-center rounded px-1.5 py-[2px] text-[9px] font-bold leading-none ${KETERSEDIAAN_STYLE[e.ketersediaan]}`}
                title="Ketersediaan kandidat di pasar eksternal"
              >
                {e.ketersediaan}
              </span>
            </div>

            <div className="mt-2 grid grid-cols-2 md:grid-cols-3 gap-1 leading-tight">
              <div>
                <div className="text-[7.5px] font-semibold uppercase text-ink-400">
                  Internal
                </div>
                <div className="text-[11px] font-bold tabular-nums text-ink-900">
                  {e.internal}
                </div>
              </div>
              <div>
                <div className="text-[7.5px] font-semibold uppercase text-ink-400">
                  Eksternal
                </div>
                <div className="text-[11px] font-bold tabular-nums text-ink-900">
                  {e.eksternal}
                </div>
              </div>
              <div>
                <div className="text-[7.5px] font-semibold uppercase text-ink-400">
                  Readiness
                </div>
                <div
                  className="text-[11px] font-bold tabular-nums"
                  style={{
                    color:
                      e.internalReadiness >= 85 ? SEMANTIC.good : SEMANTIC.warn,
                  }}
                >
                  {e.internalReadiness}%
                </div>
              </div>
            </div>

            <p className="mt-auto pt-1.5 text-[8.5px] leading-[1.4] text-ink-600">
              {e.rekomendasi}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
