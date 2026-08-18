import Link from "next/link";
import { ArrowRight, CloudRainWind, MoveRight } from "lucide-react";
import { stressScenario } from "@/lib/ss-data";
import { SectionHead } from "../hc/SectionHead";

/**
 * Downside stress test: apa yang terjadi pada Skenario C bila kondisi
 * memburuk — pelengkap wajib di luar Skenario A-E.
 */
export function StressScenario() {
  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-3 pt-3"
      style={{ "--d": "480ms" } as React.CSSProperties}
    >
      <SectionHead title="Stress Scenario" />

      <div className="mt-1.5 flex items-center gap-1.5 rounded-lg bg-[#fdecec] px-2.5 py-1.5">
        <CloudRainWind size={12} className="shrink-0 text-[#ef4444]" />
        <span className="truncate text-[9.5px] font-extrabold text-[#b91c1c]">
          {stressScenario.title}
        </span>
        <span className="ml-auto shrink-0 truncate text-[9px] font-semibold text-[#dc2626]">
          {stressScenario.assumptions.join(" · ")}
        </span>
      </div>

      <ul className="mt-1.5 flex min-h-0 flex-1 flex-col justify-between gap-1">
        {stressScenario.metrics.map((m) => (
          <li
            key={m.label}
            className="flex shrink-0 items-center justify-between gap-2 rounded-lg border border-[#eef2f6] bg-[#fbfcfd] px-2.5 py-1"
          >
            <span className="min-w-0 truncate text-[9px] font-semibold text-ink-700">
              {m.label}
            </span>
            <span className="flex shrink-0 items-center gap-1.5 text-[9.5px] font-extrabold">
              <span className="text-ink-500">{m.from}</span>
              <MoveRight size={10} className="text-ink-400" />
              <span className="text-[#ef4444]">{m.to}</span>
            </span>
          </li>
        ))}
      </ul>

      <p className="mt-1.5 shrink-0 text-[8.5px] font-semibold leading-snug text-ink-500">
        {stressScenario.exposure}
      </p>

      <Link
        href="/people-risk-radar"
        className="mt-1.5 flex w-full shrink-0 items-center justify-center gap-1 rounded-lg border border-[#e3e9ef] bg-[#f8fafc] py-[6px] text-[9.5px] font-semibold text-ptpn-greenDark transition-colors hover:bg-[#eef4f0]"
      >
        Lihat People Risk Radar <ArrowRight size={11} />
      </Link>
    </div>
  );
}
