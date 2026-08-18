import { ArrowRight } from "lucide-react";
import { tiRoleMatch, type RoleMatch, type Readiness } from "@/lib/ti-data";
import { SectionHead } from "../hc/SectionHead";

const READINESS_TONES: Record<Readiness, string> = {
  "Ready Now": "bg-[#d2ecd9] text-[#0f7a44]",
  "Ready in 1-2 Yrs": "bg-ptpn-greenLight text-ptpn-green",
  "Ready in 3-5 Yrs": "bg-[#fdf3e0] text-[#d98b06]",
};

const RISK_TONES: Record<RoleMatch["flightRisk"], string> = {
  Low: "text-ptpn-green",
  Medium: "text-[#d98b06]",
  High: "text-[#ef4444]",
};

/** Warna bar match: hijau ≥85, kuning ≥80, oranye di bawahnya. */
const matchColor = (m: number) => (m >= 85 ? "#1a9c5b" : m >= 80 ? "#f2c53d" : "#f2a93d");

export function RoleTalentMatch() {
  return (
    <section className="card anim-rise flex flex-col p-3.5">
      <SectionHead
        title="Role–Talent–Skill Match"
        action="Lihat Semua Posisi"
        href="/talent-intelligence/role-match"
      />
      <p className="mt-[3px] text-[9px] text-ink-500">
        Kecocokan kandidat suksesor terhadap requirement posisi kritikal
      </p>

      <div className="mt-2.5 flex flex-1 flex-col gap-2">
        {tiRoleMatch.map((r) => (
          <div
            key={`${r.posisi}-${r.unit}`}
            className="grid grid-cols-[minmax(0,30fr)_minmax(0,26fr)_minmax(0,24fr)_minmax(0,20fr)] items-center gap-3 rounded-lg border border-[#eef2f6] bg-[#fbfcfd] px-3 py-2"
          >
            {/* posisi + required skills */}
            <div className="min-w-0">
              <div className="truncate text-[10px] font-bold text-ink-900">
                {r.posisi} <span className="font-semibold text-ink-400">— {r.unit}</span>
              </div>
              <div className="mt-1 flex flex-wrap gap-1">
                {r.requiredSkills.map((s) => (
                  <span
                    key={s.label}
                    className="whitespace-nowrap rounded bg-[#eef2f6] px-1.5 py-[2px] text-[7.5px] font-semibold text-ink-500"
                  >
                    {s.label} ≥{s.level}
                  </span>
                ))}
              </div>
            </div>

            {/* kandidat + match bar */}
            <div className="min-w-0">
              <div className="flex items-baseline justify-between gap-2">
                <span className="truncate text-[9.5px] font-bold text-ink-900">{r.kandidat}</span>
                <span
                  className="shrink-0 text-[10px] font-extrabold"
                  style={{ color: matchColor(r.match) }}
                >
                  {r.match}%
                </span>
              </div>
              <div className="mt-1 h-[5px] w-full overflow-hidden rounded-full bg-[#eef2f6]">
                <div
                  className="h-full rounded-full"
                  style={{ width: `${r.match}%`, background: matchColor(r.match) }}
                />
              </div>
              <div className="mt-1 text-[9px] font-semibold text-[#b53d3d]">Gap: {r.gap}</div>
            </div>

            {/* readiness + flight risk */}
            <div className="flex min-w-0 flex-col items-start gap-1">
              <span
                className={`inline-block whitespace-nowrap rounded-full px-2 py-[2px] text-[9px] font-bold ${READINESS_TONES[r.readiness]}`}
              >
                {r.readiness}
              </span>
              <span className="text-[9px] font-semibold text-ink-500">
                Flight Risk: <span className={`font-bold ${RISK_TONES[r.flightRisk]}`}>{r.flightRisk}</span>
              </span>
            </div>

            {/* rekomendasi */}
            <div className="flex min-w-0 items-center gap-1 text-[8.5px] font-bold leading-[1.3] text-ink-700">
              <ArrowRight size={10} className="shrink-0 text-ptpn-green" />
              <span>{r.rekomendasi}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
