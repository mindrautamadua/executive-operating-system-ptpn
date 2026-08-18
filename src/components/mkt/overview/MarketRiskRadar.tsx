import { marketRisks, type MktRiskLevel } from "@/lib/pemasaran-data";
import { SectionHead } from "@/components/hc/SectionHead";
import { ToneBadge, type BadgeTone } from "@/components/shared/ToneBadge";
import { ScopeNote } from "@/components/ui/ScopeNote";

const LEVEL_TONE: Record<MktRiskLevel, BadgeTone> = {
  High: "bad",
  Medium: "warn",
  Low: "good",
};

const LEVEL_DOT: Record<MktRiskLevel, string> = {
  High: "bg-[#ef4444]",
  Medium: "bg-[#f5a524]",
  Low: "bg-ptpn-green",
};

/** Warna sel matrix berdasarkan skor likelihood × impact. */
const cellCls = (score: number) =>
  score >= 15 ? "bg-[#fdecec]" : score >= 8 ? "bg-[#fdf3e0]" : "bg-ptpn-greenLight";

const IMPACTS = [5, 4, 3, 2, 1];
const LIKELIHOODS = [1, 2, 3, 4, 5];

/** Matrix risiko pasar 5×5 (likelihood × impact) + daftar risiko & mitigasi. */
export function MarketRiskRadar() {
  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-3.5 pt-3"
      style={{ "--d": "80ms" } as React.CSSProperties}
    >
      {/* Risiko pasar dinilai di level grup (enterprise), bukan per subholding. */}
      <SectionHead title="Market Risk Radar" action="Lihat Semua" badge={<ScopeNote />} />
      <p className="mt-[3px] text-[9px] text-ink-500">
        Matrix Kemungkinan × Dampak — 6 Risiko Utama Pasar &amp; Komersial
      </p>

      <div className="mt-2 flex min-h-0 flex-1 items-stretch gap-3">
        {/* matrix 5×5 */}
        <div className="flex min-w-0 flex-[46] flex-col">
          <div className="flex flex-1 items-stretch gap-1">
            <span className="flex shrink-0 items-center justify-center text-[7.5px] font-bold uppercase tracking-[0.05em] text-ink-400 [writing-mode:vertical-rl] rotate-180">
              Dampak →
            </span>
            <div className="grid min-w-0 flex-1 grid-cols-5 grid-rows-5 gap-[3px]">
              {IMPACTS.map((impact) =>
                LIKELIHOODS.map((likelihood) => {
                  const hits = marketRisks
                    .map((r, idx) => ({ ...r, idx }))
                    .filter((r) => r.likelihood === likelihood && r.impact === impact);
                  return (
                    <div
                      key={`${impact}-${likelihood}`}
                      className={`flex min-h-[26px] items-center justify-center gap-[3px] rounded-md ${cellCls(
                        likelihood * impact,
                      )}`}
                    >
                      {hits.map((r) => (
                        <span
                          key={r.name}
                          title={`${r.name} — ${r.level}`}
                          className={`flex h-[15px] w-[15px] items-center justify-center rounded-full text-[9px] font-extrabold text-white ${LEVEL_DOT[r.level]}`}
                        >
                          {r.idx + 1}
                        </span>
                      ))}
                    </div>
                  );
                }),
              )}
            </div>
          </div>
          <div className="mt-1 pl-4 text-center text-[7.5px] font-bold uppercase tracking-[0.05em] text-ink-400">
            Kemungkinan →
          </div>
          <div className="mt-1.5 flex items-center justify-center gap-3 text-[8.5px] text-ink-500">
            <span className="flex items-center gap-1">
              <span className="h-[7px] w-[7px] rounded-full bg-[#ef4444]" /> High
            </span>
            <span className="flex items-center gap-1">
              <span className="h-[7px] w-[7px] rounded-full bg-[#f5a524]" /> Medium
            </span>
            <span className="flex items-center gap-1">
              <span className="h-[7px] w-[7px] rounded-full bg-ptpn-green" /> Low
            </span>
          </div>
        </div>

        {/* daftar risiko + mitigasi */}
        <div className="flex min-w-0 flex-[54] flex-col">
          <div className="text-[9.5px] font-bold text-ink-700">Risiko &amp; Mitigasi</div>
          <ul className="mt-1.5 flex flex-col gap-[5px]">
            {marketRisks.map((r, i) => (
              <li key={r.name} className="rounded-lg border border-[#eef2f6] bg-white px-2.5 py-[6px]">
                <div className="flex items-center justify-between gap-2">
                  <span className="flex min-w-0 items-center gap-1.5">
                    <span
                      className={`flex h-[14px] w-[14px] shrink-0 items-center justify-center rounded-full text-[7.5px] font-extrabold text-white ${LEVEL_DOT[r.level]}`}
                    >
                      {i + 1}
                    </span>
                    <span className="truncate text-[9.5px] font-bold text-ink-900">{r.name}</span>
                  </span>
                  <ToneBadge label={r.level} tone={LEVEL_TONE[r.level]} />
                </div>
                <p className="mt-[3px] truncate text-[8.5px] text-ink-500" title={r.mitigasi}>
                  <span className="font-bold text-ink-400">Mitigasi:</span> {r.mitigasi}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
