import { statusFunnel } from "@/lib/alb-data";
import { PALETTE } from "@/lib/chart-palette";
import { SectionHead } from "@/components/hc/SectionHead";
import { ScopeNote } from "@/components/ui/ScopeNote";

const COLORS = [PALETTE.blue, PALETTE.teal, PALETTE.greenSoft, PALETTE.green];
const BASIS_RB_HA = statusFunnel[0].luasRbHa;

/** Funnel proses perpanjangan & sertifikasi HGU (rb ha) dari 191 rb ha basis. */
export function HguStatusFunnel() {
  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-3 pt-3"
      style={{ "--d": "120ms" } as React.CSSProperties}
    >
      <SectionHead title="Funnel Perpanjangan HGU" action="Lihat Detail" badge={<ScopeNote />} />
      <p className="mt-[3px] text-[9px] text-ink-500">
        Tahap Proses di ATR/BPN (rb ha) · basis {BASIS_RB_HA} rb ha
      </p>

      <div className="mt-2 flex min-h-0 flex-1 flex-col justify-center gap-2">
        {statusFunnel.map((s, i) => {
          const pct = (s.luasRbHa / BASIS_RB_HA) * 100;
          const drop = i === 0 ? 0 : statusFunnel[i - 1].luasRbHa - s.luasRbHa;
          return (
            <div key={s.tahap}>
              <div className="flex items-center justify-between gap-2">
                <span className="min-w-0 truncate text-[9px] font-bold text-ink-900" title={s.tahap}>
                  {s.tahap}
                </span>
                <span className="shrink-0 text-[9px] font-extrabold text-ink-900">
                  {s.luasRbHa} <span className="font-semibold text-ink-400">rb ha</span>
                </span>
              </div>
              <div className="mt-1 h-[9px] w-full overflow-hidden rounded-full bg-[#eef2f6]">
                <div
                  className="h-full rounded-full"
                  style={{ width: `${pct}%`, background: COLORS[i] }}
                />
              </div>
              <div className="mt-[3px] flex items-center justify-between text-[7.5px] text-ink-400">
                <span>{pct.toLocaleString("id-ID", { maximumFractionDigits: 1 })}% dari basis</span>
                {drop > 0 && <span className="font-semibold text-[#d98b06]">-{drop} rb ha</span>}
              </div>
            </div>
          );
        })}
      </div>

      <p className="mt-1.5 text-[9px] leading-snug text-ink-500">
        Penyusutan terbesar terjadi antara pengukuran kadastral dan sidang Panitia B (-53 rb ha).
      </p>
    </div>
  );
}
