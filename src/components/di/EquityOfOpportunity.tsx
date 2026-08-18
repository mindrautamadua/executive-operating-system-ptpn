import { equityIndex, equityOpportunity, equityScale } from "@/lib/di-data";
import { PALETTE } from "@/lib/chart-palette";

/** Posisi (%) sebuah rasio pada lintasan skala 0,6–1,1. */
const pos = (v: number) =>
  ((v - equityScale.min) / (equityScale.max - equityScale.min)) * 100;

const POS_PARITAS = pos(equityScale.paritas);

export function EquityOfOpportunity() {
  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-2.5 pt-3"
      style={{ "--d": "120ms" } as React.CSSProperties}
    >
      <div className="flex items-start justify-between gap-2">
        <div>
          <h3 className="card-title-navy">Equity of Opportunity (Perempuan : Laki-laki)</h3>
          <p className="mt-[3px] text-[9px] text-ink-500">
            8 rasio kesempatan lintas modul — 1,00 = paritas penuh
          </p>
        </div>
        <span className="shrink-0 whitespace-nowrap text-right leading-tight">
          <span className="block text-[8.5px] text-ink-400">Indeks Komposit</span>
          <span className="block text-[15px] font-extrabold tabular-nums text-ink-900">
            {equityIndex}
          </span>
        </span>
      </div>

      <div className="mt-1 flex min-h-0 flex-1 flex-col justify-around">
        {equityOpportunity.map((r, i) => {
          const jauh = r.nilai < 0.9; // jauh dari paritas = merah
          return (
            <div key={r.label} className="flex items-center gap-2">
              <span className="w-[86px] shrink-0 text-[9px] leading-[1.2] text-ink-700">
                {r.label}
              </span>
              <span className="relative block h-[7px] min-w-0 flex-1 rounded-full bg-[#f2f5f8]">
                <span
                  className="anim-grow-x block h-full rounded-full"
                  style={
                    {
                      width: `${pos(r.nilai)}%`,
                      background: jauh
                        ? PALETTE.red
                        : r.nilai < 0.97
                          ? PALETTE.amber
                          : PALETTE.green,
                      opacity: 0.85,
                      "--d": `${i * 40}ms`,
                    } as React.CSSProperties
                  }
                />
                {/* garis paritas 1,00 */}
                <span
                  className="absolute -bottom-[2px] -top-[2px] w-[2px] rounded bg-ink-400"
                  style={{ left: `${POS_PARITAS}%` }}
                  title="Paritas 1,00"
                />
              </span>
              <span className="w-[28px] shrink-0 text-right text-[9.5px] font-bold tabular-nums text-ink-900">
                {r.labelNilai}
              </span>
              <span className="w-[92px] shrink-0 truncate text-right text-[9px] text-ink-500">
                {r.sumber}
              </span>
            </div>
          );
        })}
      </div>

      <p className="mt-1 border-t border-[#eef2f6] pt-1 text-[9px] leading-[1.35] text-ink-500">
        Constraint utama: <strong className="font-bold text-ink-700">Suksesi VP+ (0,74)</strong> dan
        Mobilitas Internal (0,88) — kesempatan harian setara, akses ke jenjang senior belum.
      </p>
    </div>
  );
}
