import { ArrowRight } from "lucide-react";
import { heatColor, unitEffCols, unitEffectiveness } from "@/lib/lnd-data";

const LEGEND = ["#eaf7ef", "#d6efe0", "#b6e3c8", "#8ed4ac", "#5ec18c"];

/**
 * Bukan lagi sekadar partisipasi: matriks effectiveness per unit —
 * partisipasi → skill gain → transfer → impact + composite index.
 * Partisipasi bulanan turun ke drill-down.
 */
export function EffectivenessUnit() {
  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-2.5 pt-3"
      style={{ "--d": "580ms" } as React.CSSProperties}
    >
      <h3 className="card-title-navy">Learning Effectiveness per Unit Organisasi</h3>

      <div className="mt-2 min-h-0 flex-1">
        <div className="scroll-thin overflow-x-auto">
        <table className="w-full border-separate border-spacing-x-[3px] border-spacing-y-[3px]">
          <thead>
            <tr>
              <th className="pb-1 text-left text-[9px] font-semibold text-ink-500">
                Unit Organisasi
              </th>
              {unitEffCols.map((c) => (
                <th
                  key={c}
                  className="whitespace-nowrap pb-1 text-center text-[9px] font-semibold text-ink-500"
                >
                  {c}
                </th>
              ))}
              <th className="pb-1 text-center text-[9px] font-semibold text-ink-500">Index</th>
            </tr>
          </thead>
          <tbody>
            {unitEffectiveness.map((r) => (
              <tr key={r.unit} className="group/row">
                <td className="whitespace-nowrap pr-2 text-[9.5px] text-ink-900 transition-colors group-hover/row:font-semibold">
                  {r.unit}
                </td>
                {r.nilai.map((v, i) => {
                  const c = heatColor(v);
                  return (
                    <td key={`${r.unit}-${i}`} className="p-0">
                      <div
                        className="anim-fade group relative cursor-default rounded-[3px] py-[5px] text-center text-[9.5px] font-semibold tabular-nums ring-[#1a9c5b] transition-shadow hover:ring-2"
                        style={
                          {
                            background: c.bg,
                            color: c.fg,
                            "--d": `${90 * i}ms`,
                          } as React.CSSProperties
                        }
                      >
                        {v}%
                        {/* tooltip sel */}
                        <div
                          className={`pointer-events-none absolute bottom-full z-20 mb-1 hidden whitespace-nowrap rounded-lg border border-[#e3e9ef] bg-white px-2.5 py-1.5 text-left shadow-cardHover group-hover:block ${
                            i < 3 ? "left-1/2 -translate-x-1/2" : "right-0"
                          }`}
                        >
                          <div className="text-[9.5px] font-bold text-ink-900">{r.unit}</div>
                          <div className="mt-[2px] text-[9px] font-normal text-ink-500">
                            {unitEffCols[i]}{" "}
                            <span className="font-bold tabular-nums text-ink-900">{v}%</span>
                            {" · "}
                            <span className="font-semibold tabular-nums text-ink-700">
                              {r.karyawan.toLocaleString("id-ID")}
                            </span>{" "}
                            karyawan
                          </div>
                        </div>
                      </div>
                    </td>
                  );
                })}
                <td className="pl-1 text-center text-[9.5px] font-bold tabular-nums text-ink-900">
                  {r.index.toLocaleString("id-ID", { minimumFractionDigits: 1 })}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      </div>

      <div className="mt-1.5 flex items-center justify-between gap-2">
        <button className="link-more flex items-center gap-1">
          Lihat partisipasi bulanan per unit <ArrowRight size={11} />
        </button>
        <span className="flex items-center gap-1.5 text-[9px] text-ink-500">
          Rendah
          <span className="flex overflow-hidden rounded-[3px]">
            {LEGEND.map((c) => (
              <span key={c} className="h-[9px] w-[16px]" style={{ background: c }} />
            ))}
          </span>
          Tinggi
        </span>
      </div>
    </div>
  );
}
