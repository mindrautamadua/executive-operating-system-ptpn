import { insuranceLines } from "@/lib/risk-data-detail";
import { SectionHead } from "@/components/hc/SectionHead";
import { ScopeNote } from "@/components/ui/ScopeNote";
import { ToneBadge } from "@/components/shared/ToneBadge";

const TSI_TOTAL = insuranceLines.reduce((s, l) => s + l.tsiRpT, 0);
const PREMI_TOTAL = insuranceLines.reduce((s, l) => s + l.premiRpM, 0);
const MAX_TSI = Math.max(...insuranceLines.map((l) => l.tsiRpT));

const lrColor = (pct: number) => (pct >= 60 ? "#ef4444" : pct >= 45 ? "#f5a524" : "#1a9c5b");

const rp = (v: number) => v.toLocaleString("id-ID", { minimumFractionDigits: 1, maximumFractionDigits: 1 });

/** Peta cakupan asuransi korporat: TSI, premi, dan loss ratio per lini. */
export function InsuranceCoverageMap() {
  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-3 pt-3"
      style={{ "--d": "60ms" } as React.CSSProperties}
    >
      <SectionHead title="Peta Cakupan Asuransi Korporat" action="Lihat Polis" badge={<ScopeNote />} />
      <p className="mt-[3px] text-[9px] text-ink-500">
        TSI Rp {rp(TSI_TOTAL)} T · Premi Rp {PREMI_TOTAL} M/tahun · Loss Ratio Blended 42%
      </p>

      <div className="scroll-thin mt-2 min-h-0 flex-1 overflow-y-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-[#eef2f6] text-left">
              {["Lini Asuransi", "TSI (Rp T)", "Premi (Rp M)", "Loss Ratio"].map((h) => (
                <th
                  key={h}
                  className="py-[5px] text-[9px] font-extrabold uppercase tracking-[0.04em] text-ink-500"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {insuranceLines.map((l) => (
              <tr key={l.line} className="border-b border-[#f4f7f9] last:border-0">
                <td className="py-[7px] pr-2">
                  <span className="flex items-center gap-1.5">
                    <span className="truncate text-[9px] font-bold text-ink-900">{l.line}</span>
                    {l.catatan && <ToneBadge label="Baru 2026" tone="info" />}
                  </span>
                  {l.catatan && (
                    <span className="mt-[1px] block truncate text-[9px] text-ink-500">
                      {l.catatan}
                    </span>
                  )}
                </td>
                <td className="py-[7px] pr-2">
                  <span className="flex items-center gap-1.5">
                    <span className="h-[8px] w-[48px] shrink-0 overflow-hidden rounded-full bg-[#eef2f6]">
                      <span
                        className="anim-grow-x block h-full rounded-full bg-[#3b7ded]"
                        style={{ width: `${(l.tsiRpT / MAX_TSI) * 100}%` }}
                      />
                    </span>
                    <span className="text-[9.5px] font-extrabold text-ink-900">
                      {rp(l.tsiRpT)}
                    </span>
                  </span>
                </td>
                <td className="py-[7px] pr-2 text-[9.5px] font-semibold text-ink-700">
                  {l.premiRpM}
                </td>
                <td className="py-[7px]">
                  <span
                    className="text-[9.5px] font-extrabold"
                    style={{ color: lrColor(l.lossRatioPct) }}
                  >
                    {l.lossRatioPct}%
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="mt-1.5 rounded-md bg-[#fdf3e0] px-2 py-[5px] text-[9px] leading-[1.4] text-[#a26a05]">
        Loss ratio kendaraan &amp; alat berat 62% jauh di atas blended 42% — kandidat renegosiasi
        premi saat renewal 2027.
      </p>
    </div>
  );
}
