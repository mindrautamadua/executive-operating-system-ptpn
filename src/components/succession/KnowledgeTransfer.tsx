import { BookOpenCheck } from "lucide-react";
import { knowledgeTransfer, KT_DIMENSI } from "@/lib/succession-data";
import { SEMANTIC } from "@/lib/chart-palette";

function skorColor(v: number) {
  if (v >= 75) return SEMANTIC.good;
  if (v >= 55) return SEMANTIC.warn;
  return SEMANTIC.bad;
}

/**
 * Kesiapan transfer pengetahuan untuk posisi dengan transisi incumbent
 * terjadwal < 18 bulan: mapped → dokumentasi → shadowing → handover.
 */
export function KnowledgeTransfer() {
  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-3 pt-3"
      style={{ "--d": "1020ms" } as React.CSSProperties}
    >
      <div className="flex items-start justify-between gap-2">
        <h3 className="card-title-navy flex items-center gap-1.5">
          <BookOpenCheck size={13} className="text-[#1b3a6b]" />
          Knowledge Transfer Readiness
        </h3>
        <span className="shrink-0 text-[8.5px] font-medium text-ink-400">
          Transisi incumbent &lt; 18 bln
        </span>
      </div>

      <div className="mt-2 flex min-h-0 flex-1 flex-col justify-around">
        {knowledgeTransfer.map((k) => (
          <div key={k.posisi}>
            <div className="flex items-baseline gap-2">
              <span className="truncate text-[9.5px] font-semibold text-ink-900">
                {k.posisi}
              </span>
              <span className="truncate text-[8.5px] text-ink-500">
                {k.unit} • {k.pemicu}
              </span>
              <span
                className="ml-auto shrink-0 text-[10px] font-bold tabular-nums"
                style={{ color: skorColor(k.transisi) }}
              >
                {k.transisi}%
              </span>
            </div>
            <div className="mt-1 flex gap-1">
              {k.dimensi.map((v, i) => (
                <span
                  key={KT_DIMENSI[i]}
                  className="h-[6px] flex-1 overflow-hidden rounded-full bg-[#f1f5f8]"
                  title={`${KT_DIMENSI[i]}: ${v}%`}
                >
                  <span
                    className="block h-full rounded-full"
                    style={{ width: `${v}%`, background: skorColor(v) }}
                  />
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-1.5 flex items-center justify-between text-[9px] font-medium text-ink-500">
        {KT_DIMENSI.map((d) => (
          <span key={d}>{d}</span>
        ))}
      </div>
    </div>
  );
}
