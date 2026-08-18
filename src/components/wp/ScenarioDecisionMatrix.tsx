import { Award } from "lucide-react";
import { scenarioMatrix, scenarioMatrixNote } from "@/lib/wp-data";
import { SectionHead } from "../hc/SectionHead";

/** Warna skor: hijau ≥85, biru ≥75, amber ≥65, merah < 65. */
function scoreClass(v: number) {
  if (v >= 85) return "bg-ptpn-greenLight text-ptpn-greenDark";
  if (v >= 75) return "bg-[#e8f1fd] text-[#2f6fe4]";
  if (v >= 65) return "bg-[#fdf3e0] text-[#c07c05]";
  return "bg-[#fdecec] text-[#ef4444]";
}

const DIMS = [
  { key: "cost", label: "Cost" },
  { key: "produktivitas", label: "Prod." },
  { key: "kapabilitas", label: "Capab." },
  { key: "risiko", label: "Risk" },
  { key: "feasibility", label: "Feas." },
] as const;

/**
 * Scenario Decision Matrix: skenario terbaik dinilai multi-dimensi
 * (bukan biaya terendah) + asumsi driver & trade-off eksplisit.
 */
export function ScenarioDecisionMatrix() {
  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-3 pt-3"
      style={{ "--d": "420ms" } as React.CSSProperties}
    >
      <div className="flex items-start justify-between gap-2">
        <SectionHead title="Scenario Decision Matrix" />
        <span className="flex shrink-0 items-center gap-1 rounded-md bg-ptpn-greenLight px-2 py-[3px] text-[8.5px] font-bold text-ptpn-greenDark">
          <Award size={10} />
          Rekomendasi: Reskill & Redeploy (88)
        </span>
      </div>

      <div className="scroll-thin mt-2 min-h-0 flex-1 overflow-x-auto xl:overflow-hidden">
        <table className="w-full min-w-[720px] table-fixed">
          <thead>
            <tr className="text-[9px] font-semibold uppercase tracking-[0.03em] text-ink-500">
              <th className="w-[13%] pb-1 text-left font-semibold">Skenario</th>
              <th className="w-[27%] pb-1 text-left font-semibold">Asumsi Driver</th>
              {DIMS.map((d) => (
                <th key={d.key} className="w-[6%] pb-1 text-center font-semibold">
                  {d.label}
                </th>
              ))}
              <th className="w-[7%] pb-1 text-center font-semibold">Overall</th>
              <th className="w-[23%] pb-1 text-left font-semibold">Trade-off</th>
            </tr>
          </thead>
          <tbody>
            {scenarioMatrix.map((r) => (
              <tr
                key={r.scenario}
                className={`border-t border-[#f0f3f6] text-[8.5px] ${
                  r.rekomendasi ? "bg-[#f2faf5]" : ""
                }`}
              >
                <td className="py-[5px] pr-2 font-bold leading-[1.35] text-ink-900">
                  {r.scenario}
                </td>
                <td className="py-[5px] pr-2 leading-[1.4] text-ink-500">{r.asumsi}</td>
                {DIMS.map((d) => (
                  <td key={d.key} className="py-[5px] text-center">
                    <span
                      className={`inline-block min-w-[26px] rounded px-1 py-[2px] font-bold ${scoreClass(r[d.key])}`}
                    >
                      {r[d.key]}
                    </span>
                  </td>
                ))}
                <td className="py-[5px] text-center">
                  <span
                    className={`inline-block min-w-[28px] rounded px-1 py-[2px] text-[9px] font-extrabold ${
                      r.rekomendasi
                        ? "bg-ptpn-green text-white"
                        : scoreClass(r.overall)
                    }`}
                  >
                    {r.overall}
                  </span>
                </td>
                <td className="py-[5px] leading-[1.4] text-ink-700">{r.tradeoff}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="mt-1.5 shrink-0 text-[9px] leading-[1.5] text-ink-500">{scenarioMatrixNote}</p>
    </div>
  );
}
