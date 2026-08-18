import { investigationFunnel } from "@/lib/risk-data-detail";
import { SectionHead } from "@/components/hc/SectionHead";
import { ScopeNote } from "@/components/ui/ScopeNote";
import { PALETTE } from "@/lib/chart-palette";

const START = investigationFunnel[0].count;

const COLORS = [PALETTE.blue, PALETTE.teal, PALETTE.amber, "#f0662d", PALETTE.red];

/** Funnel penanganan laporan: masuk → telaah → investigasi → terbukti → sanksi. */
export function InvestigationFunnel() {
  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-3 pt-3"
      style={{ "--d": "120ms" } as React.CSSProperties}
    >
      <SectionHead title="Funnel Investigasi" badge={<ScopeNote />} />
      <p className="mt-[3px] text-[9px] text-ink-500">
        Konversi Laporan Masuk hingga Sanksi / Penyerahan ke APH
      </p>

      <ul className="mt-2 flex min-h-0 flex-1 flex-col justify-around gap-y-1">
        {investigationFunnel.map((s, i) => {
          const pct = Math.round((s.count / START) * 100);
          return (
            <li key={s.stage} className="shrink-0">
              <div className="flex items-center gap-2">
                <span className="w-[112px] shrink-0 text-[8.5px] font-semibold text-ink-700">
                  {s.stage}
                </span>
                <span className="h-[13px] min-w-0 flex-1 overflow-hidden rounded-md bg-[#eef2f6]">
                  <span
                    className="anim-grow-x block h-full rounded-md"
                    style={{ width: `${pct}%`, background: COLORS[i] }}
                  />
                </span>
                <span className="w-[22px] shrink-0 text-right text-[10px] font-extrabold text-ink-900">
                  {s.count}
                </span>
                <span className="w-[28px] shrink-0 text-right text-[9px] font-semibold text-ink-500">
                  {pct}%
                </span>
              </div>
            </li>
          );
        })}
      </ul>

      <p className="mt-1.5 rounded-md bg-[#f8fafc] px-2 py-[5px] text-[9px] leading-[1.4] text-ink-500">
        Konversi laporan → terbukti 38%; 3 kasus terbukti masih menunggu penetapan sanksi final.
      </p>
    </div>
  );
}
