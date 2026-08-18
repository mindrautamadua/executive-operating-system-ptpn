import { provisionAdequacy, provisionStats, winRate } from "@/lib/risk-data-detail";
import { SectionHead } from "@/components/hc/SectionHead";
import { ScopeNote } from "@/components/ui/ScopeNote";

const rpM = (v: number) => `Rp ${v.toLocaleString("id-ID")} M`;

const adqColor = (pct: number) => (pct >= 100 ? "#1a9c5b" : pct >= 90 ? "#f5a524" : "#ef4444");

/** Kecukupan provisi (PSAK 57) terhadap expected loss per jenis perkara. */
export function ProvisionAdequacy() {
  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-3 pt-3"
      style={{ "--d": "60ms" } as React.CSSProperties}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <SectionHead title="Kecukupan Provisi Litigasi" badge={<ScopeNote />} />
          <p className="mt-[3px] text-[9px] text-ink-500">
            Provisi {provisionStats.provisiTotal} vs Expected Loss {provisionStats.expectedLoss} ·
            Kecukupan{" "}
            <span
              className="font-extrabold"
              style={{ color: adqColor(provisionStats.adequacyPct) }}
            >
              {String(provisionStats.adequacyPct).replace(".", ",")}%
            </span>
          </p>
        </div>
        <span className="shrink-0 rounded-lg border border-[#eef2f6] bg-[#fbfcfd] px-2.5 py-1.5 text-right">
          <span className="block text-[13px] font-extrabold leading-none text-ptpn-green">
            {winRate.pct}%
          </span>
          <span className="mt-1 block text-[7.5px] font-semibold uppercase tracking-[0.03em] text-ink-400">
            Win Rate ({winRate.menang}/{winRate.putusan})
          </span>
        </span>
      </div>

      <div className="scroll-thin mt-2 min-h-0 flex-1 overflow-y-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-[#eef2f6] text-left">
              {["Jenis Perkara", "Eksposur Bruto", "Expected Loss", "Provisi", "Kecukupan"].map(
                (h) => (
                  <th
                    key={h}
                    className="py-[5px] text-[9px] font-extrabold uppercase tracking-[0.04em] text-ink-500"
                  >
                    {h}
                  </th>
                ),
              )}
            </tr>
          </thead>
          <tbody>
            {provisionAdequacy.map((r) => {
              const adq = Math.round((r.provisiRpM / r.expectedLossRpM) * 100);
              return (
                <tr key={r.jenis} className="border-b border-[#f4f7f9] last:border-0">
                  <td className="py-[6px] pr-2 text-[9px] font-bold text-ink-900">{r.jenis}</td>
                  <td className="py-[6px] pr-2 text-[8.5px] text-ink-500">
                    {rpM(r.eksposurRpM)}
                  </td>
                  <td className="py-[6px] pr-2 text-[9px] font-semibold text-ink-700">
                    {rpM(r.expectedLossRpM)}
                  </td>
                  <td className="py-[6px] pr-2 text-[9px] font-semibold text-ink-700">
                    {rpM(r.provisiRpM)}
                  </td>
                  <td className="py-[6px]">
                    <span className="flex items-center gap-1.5">
                      <span className="h-[7px] w-[54px] shrink-0 overflow-hidden rounded-full bg-[#eef2f6]">
                        <span
                          className="anim-grow-x block h-full rounded-full"
                          style={{ width: `${Math.min(adq, 100)}%`, background: adqColor(adq) }}
                        />
                      </span>
                      <span
                        className="text-[9.5px] font-extrabold"
                        style={{ color: adqColor(adq) }}
                      >
                        {adq}%
                      </span>
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <p className="mt-1.5 rounded-md bg-[#fdf3e0] px-2 py-[5px] text-[9px] leading-[1.4] text-[#a26a05]">
        {provisionStats.note}
      </p>
    </div>
  );
}
