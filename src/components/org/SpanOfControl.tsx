import { ChevronRight, TriangleAlert } from "lucide-react";
import { SEMANTIC } from "@/lib/chart-palette";
import { spanOfControl } from "@/lib/org-data";

const fmt = (n: number) => n.toFixed(1).replace(".", ",");

export function SpanOfControl() {
  const totalOver = spanOfControl.reduce((s, r) => s + r.over, 0);

  return (
    <div className="card anim-rise flex h-full flex-col px-4 pb-2.5 pt-3">
      <h3 className="card-title-navy">Span of Control</h3>
      <p className="mt-[3px] text-[9.5px] text-ink-500">
        Rasio Aktual vs Benchmark Kontekstual per Level
      </p>

      <div className="scroll-thin overflow-x-auto">
      <table className="mt-2 w-full">
        <thead>
          <tr className="border-b border-[#eef2f6] bg-[#f7f9fb]">
            <th className="px-2 py-[5px] text-left text-[9px] font-semibold text-ink-500">Level</th>
            <th className="px-2 py-[5px] text-right text-[9px] font-semibold text-ink-500">
              Rasio
            </th>
            <th className="px-2 py-[5px] text-right text-[9px] font-semibold text-ink-500">
              Benchmark
            </th>
            <th className="px-2 py-[5px] text-center text-[9px] font-semibold text-ink-500">
              Status
            </th>
          </tr>
        </thead>
        <tbody>
          {spanOfControl.map((r) => {
            const over = r.value > r.benchMax;
            return (
              <tr
                key={r.level}
                className="border-b border-[#f4f7fa] transition-colors last:border-0 hover:bg-[#f7f9fb]"
                title={
                  over
                    ? `${r.level}: ${r.over} atasan melebihi batas atas benchmark ${r.benchMax}`
                    : `${r.level}: dalam rentang optimal ${r.benchMin}–${r.benchMax}`
                }
              >
                <td className="whitespace-nowrap px-2 py-[6px] text-[9.5px] text-ink-900">
                  {r.level}
                </td>
                <td
                  className="px-2 text-right text-[9.5px] font-bold tabular-nums"
                  style={{ color: over ? SEMANTIC.bad : "var(--text-1)" }}
                >
                  {fmt(r.value)}
                </td>
                <td className="whitespace-nowrap px-2 text-right text-[9.5px] tabular-nums text-ink-500">
                  {r.benchMin}–{r.benchMax}
                </td>
                <td className="px-2 text-center">
                  <span
                    className={`${
                      over ? "tone-red" : "tone-green"
                    } inline-block whitespace-nowrap rounded-md px-2 py-[2px] text-[9px] font-semibold`}
                  >
                    {over ? "Di atas" : "Optimal"}
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      </div>

      <p className="mt-1.5 flex items-center gap-1.5 text-[9px] font-medium text-ink-700">
        <TriangleAlert size={11} style={{ color: SEMANTIC.warn }} />
        {totalOver} atasan melebihi rentang benchmark level masing-masing
      </p>

      <button className="link-more mt-auto flex items-center gap-1 self-start pt-1">
        Lihat analisis lengkap <ChevronRight size={11} />
      </button>
    </div>
  );
}
