import { ChevronRight } from "lucide-react";
import {
  AKSI_BAR_COLOR,
  AKSI_STATUS_STYLE,
  deiActionTracker,
} from "@/lib/di-data";

const AT_RISK = deiActionTracker.filter((a) => a.status !== "On Track").length;

export function DeiActionTracker() {
  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-2.5 pt-3"
      style={{ "--d": "120ms" } as React.CSSProperties}
    >
      <div className="flex items-start justify-between gap-2">
        <h3 className="card-title-navy">DEI Action Tracker</h3>
        <span className="tone-amber shrink-0 whitespace-nowrap rounded px-1.5 py-[2px] text-[8.5px] font-bold">
          {AT_RISK} inisiatif perlu perhatian
        </span>
      </div>

      <div className="mt-1.5 min-h-0 flex-1">
        <div className="scroll-thin overflow-x-auto">
        <table className="w-full table-fixed border-collapse leading-none">
          <thead>
            <tr className="border-b border-[#eef2f6] text-[8.5px] font-semibold text-ink-500">
              <th className="w-[30%] pb-1 text-left">Inisiatif</th>
              <th className="w-[10%] pb-1 text-left">Owner</th>
              <th className="w-[16%] pb-1 text-left">Target</th>
              <th className="w-[11%] pb-1 text-right">Aktual</th>
              <th className="w-[18%] pb-1 pl-2 text-left">Progress</th>
              <th className="w-[15%] pb-1 pl-2 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {deiActionTracker.map((a, i) => (
              <tr
                key={a.inisiatif}
                className="h-[26px] border-b border-[#f4f7fa] transition-colors last:border-0 hover:bg-[#f7f9fb]"
              >
                <td className="truncate py-0 pr-1 text-[9px] font-semibold leading-[1.2] text-ink-900">
                  {a.inisiatif}
                </td>
                <td className="py-0 pr-1 text-[9px] text-ink-700">{a.owner}</td>
                <td className="truncate py-0 pr-1 text-[9px] tabular-nums text-ink-700">
                  {a.target}
                </td>
                <td className="py-0 text-right text-[9px] font-semibold tabular-nums text-ink-900">
                  {a.aktual}
                </td>
                <td className="py-0 pl-2">
                  <span className="flex items-center gap-1.5">
                    <span className="h-[6px] min-w-0 flex-1 overflow-hidden rounded-full bg-[#f2f5f8]">
                      <span
                        className="anim-grow-x block h-full rounded-full"
                        style={
                          {
                            width: `${a.progress}%`,
                            background: AKSI_BAR_COLOR[a.status],
                            "--d": `${i * 60}ms`,
                          } as React.CSSProperties
                        }
                      />
                    </span>
                    <span className="w-[24px] shrink-0 text-right text-[8.5px] font-semibold tabular-nums text-ink-700">
                      {a.progress}%
                    </span>
                  </span>
                </td>
                <td className="py-0 pl-2">
                  <span
                    className={`${AKSI_STATUS_STYLE[a.status]} inline-flex items-center whitespace-nowrap rounded px-1.5 py-[2px] text-[8.5px] font-semibold leading-none`}
                  >
                    {a.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      </div>

      <button className="link-more mt-1 flex items-center gap-0.5">
        Lihat semua inisiatif DEI <ChevronRight size={12} />
      </button>
    </div>
  );
}
