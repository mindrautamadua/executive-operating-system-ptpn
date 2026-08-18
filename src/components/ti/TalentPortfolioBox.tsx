import { tiNineBox, tiNineBoxLegend, type NineBoxCell } from "@/lib/ti-data";
import { SectionHead } from "../hc/SectionHead";

/** Tint sel 9-box: latar + warna angka. */
const CELL_TONES: Record<NineBoxCell["tone"], string> = {
  lavender: "bg-[#edeaf8] text-[#5b4a9e]",
  greenSoft: "bg-[#e4f3e0] text-[#2f7a3f]",
  green: "bg-[#d2ecd9] text-[#0f7a44]",
  amber: "bg-[#fdeccb] text-[#a06b08]",
  amberSoft: "bg-[#fdf3dc] text-[#a06b08]",
  red: "bg-[#fbe1e1] text-[#b53d3d]",
};

const POTENTIAL_LABELS = ["High", "Medium", "Low"];
const PERFORMANCE_LABELS = ["Low", "Medium", "High"];

export function TalentPortfolioBox() {
  return (
    <section className="card anim-rise flex flex-col p-3.5">
      <SectionHead
        title="Talent Portfolio (9 Box Grid)"
        action="Lihat Detail"
        href="/talent-intelligence/portfolio-9box"
      />
      <p className="mt-[3px] text-[9px] text-ink-500">Kombinasi Performance vs Potential</p>

      <div className="mt-3 flex flex-1 items-start gap-3">
        {/* grid + label sumbu */}
        <div className="flex min-w-0 flex-1 gap-1.5">
          <div
            className="flex shrink-0 items-center justify-center text-[9px] font-bold uppercase tracking-[0.12em] text-ink-500"
            style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
          >
            Potential
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex gap-1.5">
              {/* label baris potential */}
              <div className="flex w-[34px] shrink-0 flex-col gap-1.5">
                {POTENTIAL_LABELS.map((l) => (
                  <div
                    key={l}
                    className="flex h-[62px] items-center justify-end pr-1 text-[9px] font-semibold text-ink-500"
                  >
                    {l}
                  </div>
                ))}
              </div>

              <div className="grid min-w-0 flex-1 grid-cols-3 gap-1.5">
                {tiNineBox.flat().map((cell, i) => (
                  <div
                    key={i}
                    className={`flex h-[62px] flex-col items-center justify-center rounded-lg ${CELL_TONES[cell.tone]}`}
                  >
                    <span className="text-[15px] font-extrabold leading-none">{cell.value}</span>
                    <span className="mt-[3px] text-[8.5px] font-medium opacity-75">
                      ({cell.pct})
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="ml-[40px] mt-1.5 grid grid-cols-3 gap-1.5">
              {PERFORMANCE_LABELS.map((l) => (
                <div key={l} className="text-center text-[9px] font-semibold text-ink-500">
                  {l}
                </div>
              ))}
            </div>
            <div className="ml-[40px] mt-[3px] text-center text-[9px] font-bold uppercase tracking-[0.12em] text-ink-500">
              Performance
            </div>
          </div>
        </div>

        {/* legend */}
        <ul className="flex w-[128px] shrink-0 flex-col gap-[7px] pt-1">
          {tiNineBoxLegend.map((l) => (
            <li key={l.label} className="flex items-start gap-1.5">
              <span
                className="mt-[2px] h-[7px] w-[7px] shrink-0 rounded-[2px]"
                style={{ background: l.color }}
              />
              <span className="text-[9px] font-medium leading-[1.3] text-ink-500">{l.label}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
