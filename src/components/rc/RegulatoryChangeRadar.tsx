import { RadarIcon } from "lucide-react";
import { obligationRegister, regChanges } from "@/lib/rc-data";
import { SectionHead } from "../hc/SectionHead";

const readinessColor = (pct: number) =>
  pct >= 75 ? "#1a9c5b" : pct >= 60 ? "#f5a524" : "#ef4444";

const SEV_CLS: Record<string, string> = {
  Kritis: "bg-[#fdecec] text-[#ef4444]",
  Parsial: "bg-[#fdf3e0] text-[#d98b06]",
};

/**
 * Regulatory Intelligence: register 214 kewajiban + radar perubahan
 * regulasi yang akan berdampak — "will we still be compliant?"
 */
export function RegulatoryChangeRadar() {
  const o = obligationRegister;
  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-3 pt-3"
      style={{ "--d": "480ms" } as React.CSSProperties}
    >
      <div className="flex items-start justify-between gap-2">
        <div>
          <SectionHead title="Regulatory Change Radar" />
          <p className="mt-[3px] text-[9px] text-ink-500">
            Register {o.total} Kewajiban + Perubahan Regulasi Mendatang
          </p>
        </div>
        <span className="flex shrink-0 items-center gap-1 rounded-md bg-[#fdf3e0] px-2 py-[3px] text-[9px] font-extrabold text-[#d98b06]">
          <RadarIcon size={11} strokeWidth={2.2} />
          {o.changePending} Perubahan Dipantau
        </span>
      </div>

      <div
        className="mt-2 flex h-[9px] w-full overflow-hidden rounded-full bg-[#eef2f6]"
        title={`Patuh ${o.compliant} · Parsial ${o.partial} · Non-compliant ${o.nonCompliant}`}
      >
        <span className="h-full" style={{ width: `${(o.compliant / o.total) * 100}%`, background: "#1a9c5b" }} />
        <span className="h-full" style={{ width: `${(o.partial / o.total) * 100}%`, background: "#f5a524" }} />
        <span className="h-full" style={{ width: `${(o.nonCompliant / o.total) * 100}%`, background: "#ef4444" }} />
      </div>
      <div className="mt-1.5 flex items-center justify-between text-[9px] font-semibold text-ink-500">
        <span>
          <span className="text-ptpn-green">{o.compliant} Patuh</span> ·{" "}
          <span className="text-[#d98b06]">{o.partial} Parsial</span> ·{" "}
          <span className="text-[#ef4444]">{o.nonCompliant} Non-Compliant</span>
        </span>
        <span>
          Due 30 hr: <span className="font-extrabold text-ink-900">{o.dueNext30}</span> · 90 hr:{" "}
          <span className="font-extrabold text-ink-900">{o.dueNext90}</span>
        </span>
      </div>

      <ul className="scroll-thin mt-2 flex min-h-0 flex-1 flex-col justify-between gap-1.5 overflow-y-auto">
        {regChanges.map((r) => (
          <li
            key={r.name}
            className="flex shrink-0 items-center gap-2.5 rounded-lg border border-[#eef2f6] bg-[#fbfcfd] px-2.5 py-1.5"
          >
            <span className="min-w-0 flex-1 leading-[1.3]">
              <span className="flex items-center gap-1.5">
                <span className="truncate text-[9.5px] font-extrabold text-ink-900">
                  {r.name}
                </span>
                <span
                  className={`shrink-0 rounded px-1 py-[1px] text-[7.5px] font-bold ${SEV_CLS[r.severity]}`}
                >
                  {r.severity}
                </span>
              </span>
              <span className="mt-[1px] block truncate text-[9px] text-ink-500">
                {r.impact} · {r.affected} · {r.action}
              </span>
            </span>
            <span className="shrink-0 text-right leading-[1.3]">
              <span className="block text-[8.5px] font-bold text-ink-700">
                Efektif {r.effective}
              </span>
              <span className="mt-[3px] flex items-center justify-end gap-1">
                <span className="h-[5px] w-[38px] overflow-hidden rounded-full bg-[#eef2f6]">
                  <span
                    className="block h-full rounded-full"
                    style={{ width: `${r.readiness}%`, background: readinessColor(r.readiness) }}
                  />
                </span>
                <span
                  className="w-[26px] text-right text-[8.5px] font-extrabold"
                  style={{ color: readinessColor(r.readiness) }}
                >
                  {r.readiness}%
                </span>
              </span>
              <span className="block text-[7.5px] text-ink-400">readiness</span>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
