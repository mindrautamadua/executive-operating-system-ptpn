import { ArrowRight, Triangle } from "lucide-react";
import { impactComparison } from "@/lib/ss-data";
import { SectionHead } from "../hc/SectionHead";

export function ImpactComparison() {
  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-3 pt-3"
      style={{ "--d": "120ms" } as React.CSSProperties}
    >
      <SectionHead title="Perbandingan Dampak Utama" />
      <p className="mt-[3px] text-[9px] text-ink-500">
        Perbandingan baseline dengan skenario terpilih
      </p>

      <div className="mt-2 grid grid-cols-[minmax(0,1fr)_62px_62px_64px_58px] items-center gap-x-1.5 border-b border-[#eef2f6] pb-1.5 text-[9px] font-semibold uppercase tracking-[0.04em] text-ink-500">
        <span>Metrik</span>
        <span className="text-center leading-[1.3]">
          Baseline Plan
          <br />
          (2028)
        </span>
        <span className="text-center leading-[1.3]">
          Skenario C
          <br />
          (2028)
        </span>
        <span className="text-center">Selisih</span>
        <span className="text-right">Perubahan</span>
      </div>

      <ul className="scroll-thin flex min-h-0 flex-1 flex-col justify-between gap-y-1 overflow-y-auto py-1">
        {impactComparison.map((r) => (
          <li
            key={r.metric}
            className="grid shrink-0 grid-cols-[minmax(0,1fr)_62px_62px_64px_58px] items-center gap-x-1.5"
          >
            <span className="truncate text-[9.5px] font-bold text-ink-900">{r.metric}</span>
            <span className="text-center text-[9.5px] font-semibold text-ink-700">
              {r.baseline}
            </span>
            <span className="text-center text-[9.5px] font-extrabold text-ink-900">
              {r.scenario}
            </span>
            <span
              className={`text-center text-[9.5px] font-bold ${
                r.tone === "good" ? "text-ptpn-green" : "text-ink-500"
              }`}
            >
              {r.diff}
            </span>
            <span className="flex items-center justify-end gap-[3px]">
              <span
                className={`text-[9.5px] font-bold ${
                  r.tone === "good" ? "text-ptpn-green" : "text-ink-500"
                }`}
              >
                {r.change}
              </span>
              {r.trend && (
                <Triangle
                  size={8}
                  strokeWidth={0}
                  fill="currentColor"
                  className={`text-ptpn-green ${r.trend === "down" ? "rotate-180" : ""}`}
                />
              )}
            </span>
          </li>
        ))}
      </ul>

      <button className="mt-1.5 flex w-full items-center justify-center gap-1 rounded-lg border border-[#e3e9ef] bg-[#f8fafc] py-[7px] text-[9.5px] font-semibold text-ptpn-greenDark transition-colors hover:bg-[#eef4f0]">
        Lihat Detail Perbandingan <ArrowRight size={11} />
      </button>
    </div>
  );
}
