import { Sparkles } from "lucide-react";
import { sourceQuality, sourceQualityNote } from "@/lib/rekrutmen-data";

const HEAD = ["Sumber", "Kandidat", "Onboard", "Hire Rate", "QoH"];

const maxQoh = 5;

/**
 * Source quality: nilai sumber diukur dari hire rate & Quality of Hire,
 * bukan volume kandidat. Diurutkan dari QoH tertinggi.
 */
export function SourceQuality() {
  return (
    <div className="card anim-rise flex h-full flex-col px-4 pb-2.5 pt-3">
      <h3 className="card-title-navy">Source Quality</h3>

      <div className="scroll-thin overflow-x-auto">
      <table className="mt-2 w-full">
        <thead>
          <tr className="border-b border-[#eef2f6] bg-[#f7f9fb]">
            {HEAD.map((h, i) => (
              <th
                key={h}
                className={`whitespace-nowrap px-1.5 py-[5px] text-[9px] font-semibold text-ink-500 ${
                  i === 0 ? "text-left" : "text-right"
                }`}
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sourceQuality.map((s) => (
            <tr
              key={s.sumber}
              className="border-b border-[#f4f7fa] transition-colors last:border-0 hover:bg-[#f7f9fb]"
            >
              <td className="whitespace-nowrap px-1.5 py-[6px] text-[9.5px] text-ink-900">
                <span className="flex items-center gap-1.5">
                  <span
                    className="h-[7px] w-[7px] shrink-0 rounded-full"
                    style={{ background: s.color }}
                  />
                  <span className="truncate">{s.sumber}</span>
                </span>
              </td>
              <td className="px-1.5 text-right text-[9.5px] tabular-nums text-ink-700">
                {s.kandidat}
              </td>
              <td className="px-1.5 text-right text-[9.5px] font-semibold tabular-nums text-ink-900">
                {s.hire}
              </td>
              <td className="px-1.5 text-right text-[9.5px] tabular-nums text-ink-700">
                {s.hireRate}
              </td>
              <td className="px-1.5 py-[6px]">
                <span
                  className="flex items-center justify-end gap-1.5"
                  title={`Quality of Hire ${s.qoh} / 5,00`}
                >
                  <span className="h-[6px] w-[42px] shrink-0 overflow-hidden rounded-full bg-[#eef2f6]">
                    <span
                      className="anim-grow-x block h-full rounded-full"
                      style={{ width: `${(s.qohN / maxQoh) * 100}%`, background: s.color }}
                    />
                  </span>
                  <span className="w-[20px] text-right text-[9.5px] font-bold tabular-nums text-ink-900">
                    {s.qoh}
                  </span>
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>

      <p className="mt-auto flex items-start gap-1.5 border-t border-[#f2f5f8] pt-1.5 text-[8.5px] leading-[1.45] text-ink-500">
        <Sparkles size={11} className="mt-[1px] shrink-0 text-ptpn-green" />
        {sourceQualityNote}
      </p>
    </div>
  );
}
