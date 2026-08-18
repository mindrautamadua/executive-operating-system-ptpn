import { ChevronDown, ChevronRight } from "lucide-react";
import { jobFamilyTotal, requisitionJobFamily } from "@/lib/rekrutmen-data";
import { PALETTE } from "@/lib/chart-palette";

const HEAD = ["Job Family", "Requisition", "%", "Onboard", "%", "Open Position", "Req vs Onboard"];

/* skala bar mini disamakan terhadap persentase terbesar di tabel */
const maxPct = Math.max(
  ...requisitionJobFamily.flatMap((r) => [r.reqPctN, r.hirePctN]),
);

function TwinBars({ req, hire, delay }: { req: number; hire: number; delay: number }) {
  return (
    <span
      className="flex w-[64px] flex-col gap-[3px]"
      title={`Requisition ${req.toFixed(1).replace(".", ",")}% · Hire ${hire
        .toFixed(1)
        .replace(".", ",")}%`}
    >
      <span className="h-[4px] overflow-hidden rounded-full bg-[#eef2f6]">
        <span
          className="anim-grow-x block h-full rounded-full"
          style={
            {
              width: `${(req / maxPct) * 100}%`,
              background: PALETTE.blue,
              "--d": `${delay}ms`,
            } as React.CSSProperties
          }
        />
      </span>
      <span className="h-[4px] overflow-hidden rounded-full bg-[#eef2f6]">
        <span
          className="anim-grow-x block h-full rounded-full"
          style={
            {
              width: `${(hire / maxPct) * 100}%`,
              background: PALETTE.green,
              "--d": `${delay + 60}ms`,
            } as React.CSSProperties
          }
        />
      </span>
    </span>
  );
}

export function RequisitionJobFamily() {
  return (
    <div className="card anim-rise flex h-full flex-col px-4 pb-2.5 pt-3">
      <div className="flex items-start justify-between gap-2">
        <h3 className="card-title-navy">Requisition by Job Family</h3>
        <button className="select-chip whitespace-nowrap px-2.5 py-[5px] text-[9.5px] transition-colors hover:bg-[#f7f9fb]">
          Semua Job Family <ChevronDown size={11} />
        </button>
      </div>

      <div className="scroll-thin overflow-x-auto">
      <table className="mt-2 w-full">
        <thead>
          <tr className="border-b border-[#eef2f6] bg-[#f7f9fb]">
            {HEAD.map((h, i) => (
              <th
                key={h + i}
                className={`whitespace-nowrap px-2 py-[5px] text-[9px] font-semibold text-ink-500 ${
                  i === 0 || i === HEAD.length - 1 ? "text-left" : "text-right"
                }`}
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {requisitionJobFamily.map((r, i) => (
            <tr
              key={r.family}
              className="border-b border-[#f4f7fa] transition-colors last:border-0 hover:bg-[#f7f9fb]"
            >
              <td className="whitespace-nowrap px-2 py-[5px] text-[9.5px] text-ink-900">
                {r.family}
              </td>
              <td className="px-2 text-right text-[9.5px] tabular-nums text-ink-700">
                {r.requisition}
              </td>
              <td className="px-2 text-right text-[9.5px] tabular-nums text-ink-500">{r.reqPct}</td>
              <td className="px-2 text-right text-[9.5px] tabular-nums text-ink-700">{r.hire}</td>
              <td className="px-2 text-right text-[9.5px] tabular-nums text-ink-500">
                {r.hirePct}
              </td>
              <td className="px-2 text-right text-[9.5px] tabular-nums text-ink-700">{r.open}</td>
              <td className="px-2">
                <TwinBars req={r.reqPctN} hire={r.hirePctN} delay={i * 50} />
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr className="border-t border-[#eef2f6]">
            <td className="px-2 py-[5px] text-[9.5px] font-bold text-ink-900">Total</td>
            <td className="px-2 text-right text-[9.5px] font-bold tabular-nums text-ink-900">
              {jobFamilyTotal.requisition}
            </td>
            <td className="px-2 text-right text-[9.5px] tabular-nums text-ink-500">100%</td>
            <td className="px-2 text-right text-[9.5px] font-bold tabular-nums text-ink-900">
              {jobFamilyTotal.hire}
            </td>
            <td className="px-2 text-right text-[9.5px] tabular-nums text-ink-500">100%</td>
            <td className="px-2 text-right text-[9.5px] font-bold tabular-nums text-ink-900">
              {jobFamilyTotal.open}
            </td>
            <td className="px-2 text-[9px] text-ink-500">Sem I 2026</td>
          </tr>
        </tfoot>
      </table>
      </div>

      <div className="mt-auto flex items-center justify-between pt-2">
        <span className="flex items-center gap-3 text-[9px] text-ink-500">
          <span className="flex items-center gap-1">
            <span className="h-[6px] w-[10px] rounded-full" style={{ background: PALETTE.blue }} />
            Requisition %
          </span>
          <span className="flex items-center gap-1">
            <span className="h-[6px] w-[10px] rounded-full" style={{ background: PALETTE.green }} />
            Onboard %
          </span>
        </span>
        <button className="link-more flex items-center gap-1">
          Lihat semua job family <ChevronRight size={11} />
        </button>
      </div>
    </div>
  );
}
