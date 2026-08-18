import { Scale } from "lucide-react";
import { decisionScenarios } from "@/lib/profil-data";

const TONE: Record<string, { border: string; chip: string; dot: string }> = {
  green: {
    border: "border-l-ptpn-green",
    chip: "bg-ptpn-greenLight text-ptpn-greenDark",
    dot: "text-ptpn-green",
  },
  amber: {
    border: "border-l-[#f59e0b]",
    chip: "bg-[#fdf3e0] text-[#c07c05]",
    dot: "text-[#f59e0b]",
  },
  red: {
    border: "border-l-[#ef4444]",
    chip: "bg-[#fdecec] text-[#dc2626]",
    dot: "text-[#ef4444]",
  },
};

/** Skenario keputusan promosi + konsekuensinya — alat deliberasi komite. */
export function DecisionScenarioCard() {
  return (
    <div className="card flex h-full flex-col px-4 pb-3.5 pt-3.5">
      <h3 className="flex items-center gap-1.5 text-[11px] font-bold text-ink-900">
        <Scale size={13} className="text-[#1b3a6b]" />
        Skenario Keputusan — Promosi Afdeling Manager
      </h3>

      <div className="mt-2.5 grid min-h-0 flex-1 grid-cols-1 gap-2.5 lg:grid-cols-3">
        {decisionScenarios.map((sc) => {
          const t = TONE[sc.tone];
          return (
            <div
              key={sc.label}
              className={`rounded-xl border border-[#eef2f6] border-l-[3px] px-3 py-2.5 ${t.border}`}
            >
              <div className="flex flex-wrap items-center justify-between gap-1.5">
                <span className="text-[9.5px] font-extrabold text-ink-900">{sc.label}</span>
                <span className={`rounded-full px-2 py-[2px] text-[7.5px] font-extrabold ${t.chip}`}>
                  {sc.tag}
                </span>
              </div>
              <ul className="mt-1.5 space-y-1">
                {sc.dampak.map((d) => (
                  <li key={d} className="flex items-start gap-1.5 text-[8.5px] leading-snug text-ink-700">
                    <span className={`mt-[1px] shrink-0 ${t.dot}`}>•</span>
                    {d}
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>

      <p className="mt-2 text-[9px] text-ink-500">
        Konsekuensi dirangkum dari data profil (syarat jabatan, backfill, tenure, kompensasi);
        keputusan final pada komite suksesi.
      </p>
    </div>
  );
}
