import { Users } from "lucide-react";
import { diversityPipeline, diversityTahap } from "@/lib/succession-data";
import { PALETTE, SEMANTIC } from "@/lib/chart-palette";

/** Opasitas bar per tahap funnel: pool → kandidat → ready now. */
const TAHAP_ALPHA = [0.35, 0.65, 1];

/**
 * Diversitas pipeline suksesi per tahap funnel — apakah diversitas
 * menyusut dari HiPo pool (1.245) → kandidat (400) → ready now (64)?
 */
export function DiversityPipeline() {
  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-3 pt-3"
      style={{ "--d": "1140ms" } as React.CSSProperties}
    >
      <div className="flex items-start justify-between gap-2">
        <h3 className="card-title-navy flex items-center gap-1.5">
          <Users size={13} className="text-[#1b3a6b]" />
          Diversitas Pipeline Suksesi
        </h3>
        <span className="flex shrink-0 items-center gap-2 text-[9px] font-medium text-ink-500">
          {diversityTahap.map((t, i) => (
            <span key={t} className="flex items-center gap-1">
              <span
                className="h-[7px] w-[7px] rounded-[2px]"
                style={{ background: PALETTE.blue, opacity: TAHAP_ALPHA[i] }}
              />
              {t}
            </span>
          ))}
        </span>
      </div>

      <div className="mt-2 flex min-h-0 flex-1 flex-col justify-around">
        {diversityPipeline.map((d) => (
          <div key={d.dimensi}>
            <div className="flex items-baseline gap-2">
              <span className="truncate text-[9px] font-semibold text-ink-900">
                {d.dimensi}
              </span>
              <span className="text-[9px] text-ink-500">target {d.target}%</span>
              <span
                className="ml-auto shrink-0 text-[8.5px] font-bold"
                style={{
                  color: d.status === "on-track" ? SEMANTIC.good : SEMANTIC.bad,
                }}
              >
                {d.status === "on-track" ? "On track" : "Di bawah target"}
              </span>
            </div>
            <div className="mt-[3px] space-y-[2px]">
              {d.funnel.map((v, i) => (
                <div
                  key={diversityTahap[i]}
                  className="relative h-[5px] w-full overflow-hidden rounded-full bg-[#f1f5f8]"
                  title={`${diversityTahap[i]}: ${v}%`}
                >
                  <span
                    className="absolute inset-y-0 left-0 rounded-full"
                    style={{
                      width: `${v}%`,
                      background: PALETTE.blue,
                      opacity: TAHAP_ALPHA[i],
                    }}
                  />
                  {/* penanda target */}
                  <span
                    className="absolute inset-y-0 w-[1.5px] bg-[#c3ccd8]"
                    style={{ left: `${d.target}%` }}
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
