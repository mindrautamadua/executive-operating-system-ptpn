import { heatmapCells, levelOfScore, RISK_LEVEL_BAND, type RiskLevel } from "@/lib/risk-data";
import { SectionHead } from "@/components/hc/SectionHead";
import { ScopeNote } from "@/components/ui/ScopeNote";

const LIKELIHOOD = ["Jarang", "Kecil", "Sedang", "Besar", "Hampir Pasti"];
const IMPACT = ["Minor", "Rendah", "Sedang", "Mayor", "Katastropik"];

const LEVELS: RiskLevel[] = ["Ekstrem", "Tinggi", "Menengah", "Rendah"];

const countOf = (likelihood: number, impact: number) =>
  heatmapCells.find((c) => c.likelihood === likelihood && c.impact === impact)?.count ?? 0;

/** Diameter gelembung proporsional jumlah risiko pada sel (maks 14 risiko). */
const bubble = (count: number) => 16 + Math.round((count / 14) * 20);

/**
 * Matriks risiko enterprise 5×5 (likelihood × impact) — 142 risiko register
 * dipetakan sebagai gelembung; warna mengikuti band level skor.
 */
export function EnterpriseHeatmap() {
  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-3 pt-3"
      style={{ "--d": "60ms" } as React.CSSProperties}
    >
      <SectionHead title="Enterprise Risk Heatmap 5×5" action="Lihat Register" badge={<ScopeNote />} />
      <p className="mt-[3px] text-[9px] text-ink-500">
        Distribusi 142 Risiko Korporat — Kemungkinan × Dampak (Residual)
      </p>

      <div className="mt-2 flex min-h-0 flex-1 gap-1.5">
        <span className="flex w-[13px] shrink-0 items-center justify-center">
          <span className="-rotate-90 whitespace-nowrap text-[7.5px] font-bold uppercase tracking-[0.06em] text-ink-400">
            Kemungkinan
          </span>
        </span>

        <div className="grid min-w-0 flex-1 grid-cols-[46px_repeat(5,minmax(0,1fr))] grid-rows-[repeat(5,minmax(0,1fr))_14px] gap-[3px]">
          {[5, 4, 3, 2, 1].map((likelihood) => (
            <div key={`row-${likelihood}`} className="contents">
              <span className="flex items-center justify-end pr-1 text-[7.5px] font-semibold leading-tight text-ink-400">
                {LIKELIHOOD[likelihood - 1]}
              </span>
              {[1, 2, 3, 4, 5].map((impact) => {
                const count = countOf(likelihood, impact);
                const level = levelOfScore(likelihood * impact);
                const color = RISK_LEVEL_BAND[level];
                const d = bubble(count);
                return (
                  <div
                    key={`c-${likelihood}-${impact}`}
                    className="flex items-center justify-center rounded-md bg-[#f8fafc]"
                    title={`${LIKELIHOOD[likelihood - 1]} × ${IMPACT[impact - 1]} — ${count} risiko (${level})`}
                  >
                    {count > 0 && (
                      <span
                        className="flex items-center justify-center rounded-full text-[8.5px] font-extrabold text-white"
                        style={{ width: d, height: d, background: color }}
                      >
                        {count}
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          ))}

          <span />
          {IMPACT.map((label) => (
            <span
              key={label}
              className="flex items-start justify-center text-[7.5px] font-semibold text-ink-400"
            >
              {label}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-1 flex items-center justify-center gap-3">
        {LEVELS.map((l) => (
          <span key={l} className="flex items-center gap-1.5 text-[8.5px] text-ink-500">
            <span
              className="h-[7px] w-[7px] rounded-full"
              style={{ background: RISK_LEVEL_BAND[l] }}
            />
            {l}
          </span>
        ))}
        <span className="text-[9px] font-semibold text-ink-500">Dampak →</span>
      </div>
    </div>
  );
}
