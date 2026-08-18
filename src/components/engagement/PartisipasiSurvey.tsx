import { ArrowRight, ChevronDown } from "lucide-react";
import { partisipasiSurvey, partisipasiTarget } from "@/lib/engagement-data";
import { PALETTE } from "@/lib/chart-palette";

export function PartisipasiSurvey() {
  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-2.5 pt-3"
      style={{ "--d": "580ms" } as React.CSSProperties}
    >
      <div className="flex items-start justify-between gap-2">
        <div>
          <h3 className="card-title-navy">Partisipasi &amp; Data Confidence</h3>
          <p className="mt-[3px] text-[9.5px] text-ink-500">
            Response rate ·{" "}
            <span className="font-semibold" style={{ color: PALETTE.amber }}>
              Target {partisipasiTarget}%
            </span>{" "}
            · response rendah = confidence interpretasi turun
          </p>
        </div>
        <button className="select-chip whitespace-nowrap px-2.5 py-[5px] text-[9.5px]">
          Top 10 Unit <ChevronDown size={11} />
        </button>
      </div>

      <div className="mt-2 flex min-h-0 flex-1 flex-col justify-between">
        {partisipasiSurvey.map((u, i) => (
          <div key={u.unit} className="flex items-center gap-2">
            <span className="w-[112px] shrink-0 truncate text-[9px] text-ink-700">{u.unit}</span>
            <span className="relative h-[7px] min-w-0 flex-1 rounded-full bg-[#eef2f6]">
              <span
                className="anim-grow-x block h-full overflow-hidden rounded-full"
                style={
                  {
                    width: `${u.bar}%`,
                    background: u.color,
                    "--d": `${50 * i}ms`,
                  } as React.CSSProperties
                }
              />
              {/* penanda target */}
              <span
                className="absolute -bottom-[2px] -top-[2px] w-[1.5px] rounded-full"
                style={{ left: `${partisipasiTarget}%`, background: PALETTE.amber }}
              />
            </span>
            <span className="w-[26px] shrink-0 text-right text-[9px] font-semibold tabular-nums text-ink-900">
              {u.skor}
            </span>
            <span
              className={`${
                u.bar >= 80 ? "tone-green" : u.bar >= 70 ? "tone-amber" : "tone-red"
              } w-[42px] shrink-0 rounded px-1 py-[1px] text-center text-[9px] font-bold leading-none`}
            >
              {u.bar >= 80 ? "High" : u.bar >= 70 ? "Medium" : "Low"}
            </span>
          </div>
        ))}
      </div>

      <button className="link-more mt-2 flex items-center gap-1 self-start">
        Lihat partisipasi lengkap <ArrowRight size={11} />
      </button>
    </div>
  );
}
