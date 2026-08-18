import { ArrowRight } from "lucide-react";
import { gapClosure, gapClosureTotal, skillsForecastNote } from "@/lib/lnd-data";
import { PALETTE } from "@/lib/chart-palette";

const DEMAND_CLS: Record<string, string> = {
  Critical: "bg-[#fdecec] text-[#ef4444]",
  High: "bg-[#fdf3e0] text-[#d98b06]",
  Medium: "bg-[#e8eef5] text-[#5b7391]",
};

const ALIGN: Record<string, { label: string; cls: string }> = {
  under: { label: "Under-invested", cls: "bg-[#fdecec] text-[#ef4444]" },
  match: { label: "Aligned", cls: "bg-[#eaf7ef] text-[#1a9c5b]" },
  over: { label: "Over-weighted", cls: "bg-[#fdf3e0] text-[#d98b06]" },
};

const closureColor = (pct: number) =>
  pct >= 60 ? PALETTE.green : pct >= 40 ? PALETTE.amber : PALETTE.red;

/**
 * Linkage inti L&D ↔ Workforce Planning: berapa gap skill kritis yang
 * benar-benar tertutup learning, dan apakah investasi searah demand.
 */
export function SkillGapClosure() {
  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-2.5 pt-3"
      style={{ "--d": "280ms" } as React.CSSProperties}
    >
      <div className="flex items-start justify-between gap-2">
        <h3 className="card-title-navy">Skill Gap Closure — Learning-to-Skill Alignment</h3>
        <span className="whitespace-nowrap rounded bg-[#eaf7ef] px-2 py-[3px] text-[9px] font-bold text-[#0f7a44]">
          {gapClosureTotal.tertutup} / {gapClosureTotal.total.toLocaleString("id-ID")} gap tertutup ·{" "}
          {gapClosureTotal.pct} YTD
        </span>
      </div>
      <p className="mt-[3px] text-[9px] text-ink-500">{gapClosureTotal.note}</p>

      <div className="mt-1.5 min-h-0 flex-1">
        <table className="w-full border-separate border-spacing-y-[2px]">
          <thead>
            <tr className="text-[8.5px] font-semibold uppercase tracking-[0.03em] text-ink-500">
              <th className="pb-[3px] text-left">Skill Kritis · Academy</th>
              <th className="pb-[3px] text-right">Gap Awal</th>
              <th className="w-[26%] px-2 pb-[3px] text-left">Closure YTD</th>
              <th className="pb-[3px] text-right">Sisa</th>
              <th className="pb-[3px] text-center">Coverage</th>
              <th className="pb-[3px] text-center">Demand</th>
              <th className="pb-[3px] text-right">Alignment</th>
            </tr>
          </thead>
          <tbody>
            {gapClosure.map((r, i) => {
              const a = ALIGN[r.align];
              return (
                <tr key={r.skill} className="group/row">
                  <td className="whitespace-nowrap pr-2 leading-[1.2]">
                    <span className="block text-[9.5px] font-semibold text-ink-900">{r.skill}</span>
                    <span className="block text-[8.5px] text-ink-400">{r.program}</span>
                  </td>
                  <td className="pr-1 text-right text-[9.5px] font-bold tabular-nums text-ink-900">
                    {r.gapAwal}
                  </td>
                  <td className="px-2">
                    <div className="flex items-center gap-1.5">
                      <span className="h-[8px] min-w-0 flex-1 overflow-hidden rounded-full bg-[#f2f5f8]">
                        <span
                          className="anim-grow-x block h-full rounded-full"
                          style={
                            {
                              width: `${r.closure}%`,
                              background: closureColor(r.closure),
                              "--d": `${80 * i}ms`,
                            } as React.CSSProperties
                          }
                        />
                      </span>
                      <span className="w-[28px] shrink-0 text-right text-[9.5px] font-bold tabular-nums text-ink-900">
                        {r.closure}%
                      </span>
                    </div>
                  </td>
                  <td className="pr-1 text-right text-[9.5px] font-semibold tabular-nums text-ink-700">
                    {r.sisa}
                  </td>
                  <td className="text-center text-[9.5px] tabular-nums text-ink-700">
                    {r.coverage}%
                  </td>
                  <td className="text-center">
                    <span
                      className={`inline-block rounded px-1.5 py-[2px] text-[9px] font-extrabold ${DEMAND_CLS[r.demand]}`}
                    >
                      {r.demand}
                    </span>
                  </td>
                  <td className="text-right">
                    <span
                      className={`inline-block whitespace-nowrap rounded px-1.5 py-[2px] text-[9px] font-extrabold ${a.cls}`}
                    >
                      {a.label}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="mt-1 flex items-center justify-between gap-3">
        <p className="min-w-0 truncate text-[8.5px] text-ink-400">{skillsForecastNote}</p>
        <button className="link-more flex shrink-0 items-center gap-1">
          Lihat 10 skill kritis <ArrowRight size={11} />
        </button>
      </div>
    </div>
  );
}
