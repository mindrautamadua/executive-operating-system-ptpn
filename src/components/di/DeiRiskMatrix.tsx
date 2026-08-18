import { ArrowRight, MoveDownRight, MoveRight, MoveUpRight } from "lucide-react";
import { deiRiskMatrix, RISK_STYLE } from "@/lib/di-data";
import { PALETTE } from "@/lib/chart-palette";

const TREND = {
  up: { Icon: MoveUpRight, color: PALETTE.green },
  flat: { Icon: MoveRight, color: PALETTE.slate },
  down: { Icon: MoveDownRight, color: PALETTE.red },
} as const;

const RISK_LABEL = { rendah: "Rendah", sedang: "Sedang", tinggi: "Tinggi" } as const;

export function DeiRiskMatrix() {
  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-2.5 pt-3"
      style={{ "--d": "60ms" } as React.CSSProperties}
    >
      <div className="flex items-start justify-between gap-2">
        <div>
          <h3 className="card-title-navy">DEI Risk Matrix per Unit</h3>
          <p className="mt-[3px] text-[9px] text-ink-500">
            Diversity (0-100) · Equity (rasio) · Inclusion (survei)
          </p>
        </div>
      </div>

      <div className="mt-1.5 min-h-0 flex-1">
        <table className="w-full table-fixed border-collapse leading-none">
          <thead>
            <tr className="border-b border-[#eef2f6] text-[8.5px] font-semibold text-ink-500">
              <th className="w-[38%] pb-1 text-left">Unit</th>
              <th className="w-[13%] pb-1 text-right">Div</th>
              <th className="w-[13%] pb-1 text-right">Eq</th>
              <th className="w-[13%] pb-1 text-right">Inc</th>
              <th className="w-[9%] pb-1 text-center">Tren</th>
              <th className="w-[14%] pb-1 pl-1 text-left">Risk</th>
            </tr>
          </thead>
          <tbody>
            {deiRiskMatrix.map((u) => {
              const T = TREND[u.trend];
              return (
                <tr
                  key={u.unit}
                  className={`h-[26px] border-b border-[#f4f7fa] last:border-0 ${
                    u.rata ? "bg-[#eef9f2]" : "hover:bg-[#f7f9fb]"
                  }`}
                >
                  <td
                    className={`truncate py-0 pr-1 text-[9px] leading-[1.2] ${
                      u.rata ? "font-bold text-ink-900" : "text-ink-700"
                    }`}
                  >
                    {u.unit}
                  </td>
                  <td
                    className={`py-0 text-right text-[9.5px] tabular-nums ${
                      u.rata ? "font-bold text-ink-900" : "font-semibold text-ink-700"
                    }`}
                  >
                    {u.diversity}
                  </td>
                  <td
                    className={`py-0 text-right text-[9.5px] tabular-nums ${
                      u.rata ? "font-bold text-ink-900" : "font-semibold text-ink-700"
                    }`}
                  >
                    {u.equity}
                  </td>
                  <td
                    className={`py-0 text-right text-[9.5px] tabular-nums ${
                      u.rata ? "font-bold text-ink-900" : "font-semibold text-ink-700"
                    }`}
                  >
                    {u.inclusion}
                  </td>
                  <td className="py-0 text-center">
                    <T.Icon size={11} strokeWidth={2.2} style={{ color: T.color }} className="inline" />
                  </td>
                  <td className="py-0 pl-1">
                    <span
                      className={`${RISK_STYLE[u.risk]} inline-flex items-center rounded px-1.5 py-[2px] text-[8.5px] font-semibold leading-none`}
                    >
                      {RISK_LABEL[u.risk]}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <button className="link-more mt-1 flex items-center gap-1">
        Lihat semua unit <ArrowRight size={11} />
      </button>
    </div>
  );
}
