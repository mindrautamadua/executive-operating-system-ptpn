import { ChevronRight } from "lucide-react";
import { rekrutmenUnit, unitTotal } from "@/lib/rekrutmen-data";
import { PALETTE } from "@/lib/chart-palette";

const maxReq = Math.max(...rekrutmenUnit.map((u) => u.requisition));

export function RekrutmenUnitOrganisasi() {
  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-2.5 pt-3"
      style={{ "--d": "60ms" } as React.CSSProperties}
    >
      <h3 className="card-title-navy">Rekrutmen by Unit Organisasi</h3>

      <div className="scroll-thin overflow-x-auto">
      <table className="mt-2 w-full">
        <thead>
          <tr className="border-b border-[#eef2f6] bg-[#f7f9fb]">
            <th className="px-2 py-[5px] text-left text-[9px] font-semibold text-ink-500">
              Unit Organisasi
            </th>
            <th className="px-2 py-[5px] text-left text-[9px] font-semibold text-ink-500">
              Requisition
            </th>
            <th className="px-2 py-[5px] text-left text-[9px] font-semibold text-ink-500">
              Onboard
            </th>
            <th className="px-2 py-[5px] text-left text-[9px] font-semibold text-ink-500">
              Time to Fill (Hari)
            </th>
          </tr>
        </thead>
        <tbody>
          {rekrutmenUnit.map((u, i) => (
            <tr
              key={u.unit}
              className="border-b border-[#f4f7fa] transition-colors last:border-0 hover:bg-[#f7f9fb]"
            >
              <td className="whitespace-nowrap px-2 py-[5px] text-[9.5px] text-ink-900">
                {u.unit}
              </td>
              <td className="px-2">
                <span className="flex items-center gap-1.5">
                  <span className="w-[14px] shrink-0 text-[9.5px] tabular-nums text-ink-700">
                    {u.requisition}
                  </span>
                  <span className="h-[6px] min-w-0 flex-1 overflow-hidden rounded-full bg-[#eef2f6]">
                    <span
                      className="anim-grow-x block h-full rounded-full"
                      style={
                        {
                          width: `${(u.requisition / maxReq) * 100}%`,
                          background: PALETTE.blue,
                          "--d": `${i * 50}ms`,
                        } as React.CSSProperties
                      }
                    />
                  </span>
                </span>
              </td>
              <td className="px-2 text-[9.5px] tabular-nums text-ink-700">{u.hire}</td>
              <td className="px-2 text-[9.5px] tabular-nums text-ink-700">{u.ttf}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr className="border-t border-[#eef2f6]">
            <td className="px-2 py-[5px] text-[9.5px] font-bold text-ink-900">Total</td>
            <td className="px-2 text-[9.5px] font-bold tabular-nums text-ink-900">
              {unitTotal.requisition}
            </td>
            <td className="px-2 text-[9.5px] font-bold tabular-nums text-ink-900">
              {unitTotal.hire}
            </td>
            <td className="px-2 text-[9.5px] text-ink-500">Sem I 2026</td>
          </tr>
        </tfoot>
      </table>
      </div>

      <button className="link-more mt-auto flex items-center gap-1 self-start pt-2">
        Lihat detail unit <ChevronRight size={11} />
      </button>
    </div>
  );
}
