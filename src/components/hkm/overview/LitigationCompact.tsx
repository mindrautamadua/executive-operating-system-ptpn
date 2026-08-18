import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { caseSummaryByType, caseSummaryNote, LEGAL_PORTFOLIO_HREF } from "@/lib/hkm-data-detail";

const totalPerkara = caseSummaryByType.reduce((a, c) => a + c.count, 0);
const totalEksposur = caseSummaryByType.reduce((a, c) => a + c.eksposurRpM, 0);
const maxEksposur = Math.max(...caseSummaryByType.map((c) => c.eksposurRpM));

const rpT = (rpM: number) =>
  (rpM / 1000).toLocaleString("id-ID", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

/** Ringkasan kompak eksposur litigasi; pendalaman ada di Legal Case Portfolio. */
export function LitigationCompact() {
  return (
    <div className="card anim-rise px-4 pb-3.5 pt-3" style={{ "--d": "60ms" } as React.CSSProperties}>
      <div className="flex items-center justify-between gap-2">
        <h3 className="text-[10px] font-extrabold uppercase tracking-[0.05em] text-ink-900">
          Eksposur Litigasi
        </h3>
        <Link
          href={LEGAL_PORTFOLIO_HREF}
          className="flex shrink-0 items-center gap-1 text-[9.5px] font-semibold text-ptpn-green hover:underline"
        >
          Portofolio Legal <ArrowRight size={11} />
        </Link>
      </div>

      <div className="mt-2.5 flex items-end justify-between gap-2">
        <div>
          <div className="whitespace-nowrap text-[26px] font-extrabold leading-none tracking-[-0.01em] text-ink-900">
            Rp {rpT(totalEksposur)} T
          </div>
          <div className="mt-1.5 text-[8.5px] font-semibold text-ink-500">
            {totalPerkara} perkara aktif · seluruh forum
          </div>
        </div>
        <span className="shrink-0 rounded bg-[#fdecec] px-1.5 py-[2px] text-[9px] font-extrabold text-[#ef4444]">
          ±70% Lahan/HGU
        </span>
      </div>

      <div className="mt-2.5 flex flex-col gap-1.5">
        {caseSummaryByType.map((c) => (
          <div key={c.tipe} className="flex items-center gap-2">
            <div className="min-w-0 flex-1">
              <div className="flex items-baseline justify-between gap-2">
                {c.href ? (
                  <Link
                    href={c.href}
                    className="truncate text-[9px] font-semibold text-ink-900 hover:text-ptpn-green hover:underline"
                    title={c.hrefLabel ?? c.tipe}
                  >
                    {c.tipe}
                  </Link>
                ) : (
                  <span className="truncate text-[9px] font-semibold text-ink-900">{c.tipe}</span>
                )}
                <span className="shrink-0 text-[8.5px] font-bold tabular-nums text-ink-500">
                  {c.count} · Rp {rpT(c.eksposurRpM)} T
                </span>
              </div>
              <div className="mt-[3px] h-[5px] w-full overflow-hidden rounded-full bg-[#eef2f6]">
                <div
                  className="h-full rounded-full"
                  style={{
                    width: `${(c.eksposurRpM / maxEksposur) * 100}%`,
                    backgroundColor: c.color,
                  }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      <p className="mt-2 border-t border-[#f5f8fa] pt-1.5 text-[9px] leading-snug text-ink-500">
        {caseSummaryNote}
      </p>
    </div>
  );
}
