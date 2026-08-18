import { ChevronRight } from "lucide-react";
import { statusPengisian } from "@/lib/org-data";
import { SEMANTIC } from "@/lib/chart-palette";

const barColor = (pct: number) =>
  pct >= 95 ? SEMANTIC.good : pct >= 90 ? SEMANTIC.goodSoft : SEMANTIC.warn;

export function StatusPengisian() {
  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-2.5 pt-3"
      style={{ "--d": "120ms" } as React.CSSProperties}
    >
      <h3 className="card-title-navy">Status Pengisian Jabatan</h3>
      <p className="mt-[3px] text-[9.5px] text-ink-500">Keterisian Jabatan per Level (dari 1.256 posisi)</p>

      <div className="scroll-thin overflow-x-auto">
      <table className="mt-2 w-full">
        <thead>
          <tr className="border-b border-[#eef2f6] bg-[#f7f9fb]">
            <th className="px-2 py-[5px] text-left text-[9px] font-semibold text-ink-500">Level</th>
            <th className="px-2 py-[5px] text-left text-[9px] font-semibold text-ink-500">Terisi</th>
            <th className="px-2 py-[5px] text-left text-[9px] font-semibold text-ink-500">Kosong</th>
            <th className="px-2 py-[5px] text-left text-[9px] font-semibold text-ink-500">
              Tingkat Keterisian
            </th>
          </tr>
        </thead>
        <tbody>
          {statusPengisian.map((r, i) => (
            <tr
              key={r.level}
              className="border-b border-[#f4f7fa] transition-colors last:border-0 hover:bg-[#f7f9fb]"
            >
              <td className="whitespace-nowrap px-2 py-[6px] text-[9.5px] text-ink-900">
                {r.level}
              </td>
              <td className="px-2 text-[9.5px] tabular-nums text-ink-700">{r.terisi}</td>
              <td className="px-2 text-[9.5px] tabular-nums text-ink-700">{r.kosong}</td>
              <td className="px-2">
                <span
                  className="flex items-center gap-1.5"
                  title={`${r.level} — Terisi ${r.terisi} · Kosong ${r.kosong} (${r.label})`}
                >
                  <span className="h-[6px] min-w-0 flex-1 overflow-hidden rounded-full bg-[#eef2f6]">
                    <span
                      className="anim-grow-x block h-full rounded-full"
                      style={
                        {
                          width: `${r.pct}%`,
                          background: barColor(r.pct),
                          "--d": `${i * 60}ms`,
                        } as React.CSSProperties
                      }
                    />
                  </span>
                  <span className="w-[32px] shrink-0 text-right text-[9px] font-semibold tabular-nums text-ink-900">
                    {r.label}
                  </span>
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>

      <button className="link-more mt-auto flex items-center gap-1 self-start pt-2">
        Lihat analisis keterisian <ChevronRight size={11} />
      </button>
    </div>
  );
}
