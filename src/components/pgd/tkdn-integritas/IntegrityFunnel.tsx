import { integrityByStage } from "@/lib/pgd-data-detail";
import { SectionHead } from "@/components/hc/SectionHead";
import { ScopeNote } from "@/components/ui/ScopeNote";

const TOTAL = integrityByStage.reduce((s, r) => s + r.jumlah, 0);
const MAX = Math.max(...integrityByStage.map((r) => r.jumlah));

/** Funnel tahap penanganan 14 laporan integritas pengadaan. */
export function IntegrityFunnel() {
  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-3 pt-3"
      style={{ "--d": "180ms" } as React.CSSProperties}
    >
      <SectionHead title="Funnel Penanganan Kasus" badge={<ScopeNote />} />
      <p className="mt-[3px] text-[9px] text-ink-500">
        {TOTAL} Laporan Integritas Pengadaan per Tahap
      </p>

      <ul className="mt-2.5 flex min-h-0 flex-1 flex-col justify-center gap-2">
        {integrityByStage.map((r) => (
          <li key={r.tahap} className="shrink-0">
            <div className="flex items-center gap-1.5">
              <span className="min-w-0 flex-1 truncate text-[9px] font-semibold text-ink-700">
                {r.tahap}
              </span>
              <span className="shrink-0 text-[10px] font-extrabold text-ink-900">{r.jumlah}</span>
            </div>
            <span className="mt-[3px] flex h-[14px] w-full items-center">
              <span
                className="anim-grow-x flex h-full items-center justify-end rounded-md px-1.5"
                style={{ width: `${(r.jumlah / MAX) * 100}%`, backgroundColor: r.color }}
              >
                <span className="text-[7.5px] font-extrabold text-white">
                  {((r.jumlah / TOTAL) * 100).toLocaleString("id-ID", {
                    maximumFractionDigits: 1,
                  })}
                  %
                </span>
              </span>
            </span>
          </li>
        ))}
      </ul>

      <p className="mt-auto rounded-md bg-[#fdecec] px-2 py-[5px] text-[9px] leading-[1.4] text-[#b91c1c]">
        4 kasus terbukti dan 2 telah diteruskan ke sanksi / APH — substantiation rate 28,6%.
      </p>
    </div>
  );
}
