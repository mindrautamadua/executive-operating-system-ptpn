import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { repeatCategories } from "@/lib/ir-intel-data";
import { SectionHead } from "../hc/SectionHead";

const RATE_TONE: Record<"bad" | "warn" | "good", string> = {
  bad: "bg-[#fdecec] text-[#ef4444]",
  warn: "bg-[#fdf3e0] text-[#d98b06]",
  good: "bg-ptpn-greenLight text-ptpn-green",
};

/**
 * Repeat Issue & Root Cause: apakah masalah benar-benar selesai atau terus
 * berulang, plus hipotesis akar masalah + tautan modul terkait.
 */
export function RepeatRootCause() {
  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-3 pt-3"
      style={{ "--d": "180ms" } as React.CSSProperties}
    >
      <div className="flex items-baseline gap-1.5">
        <SectionHead title="Repeat Issue & Root Cause" />
        <span className="shrink-0 text-[8.5px] text-ink-400">(12 Bulan)</span>
      </div>

      <ul className="mt-2 flex min-h-0 flex-1 flex-col justify-between gap-1.5">
        {repeatCategories.map((c) => (
          <li
            key={c.name}
            className="flex flex-col rounded-lg border border-[#eef2f6] bg-[#fbfcfe] px-2.5 py-1.5"
          >
            <div className="flex items-center gap-2">
              <span className="min-w-0 flex-1 truncate text-[9.5px] font-bold text-ink-900">
                {c.name}
              </span>
              <span className="shrink-0 text-[9px] text-ink-500">{c.cases} kasus</span>
              <span
                className={`shrink-0 rounded-md px-1.5 py-[2px] text-[9px] font-bold ${RATE_TONE[c.tone]}`}
              >
                Repeat {c.repeatRate}%
              </span>
            </div>
            <div className="mt-1 flex flex-wrap items-center gap-1">
              {c.rootCauses.map((rc) => (
                <span
                  key={rc}
                  className="rounded-md bg-white px-1.5 py-[2px] text-[7.5px] font-semibold text-ink-600 ring-1 ring-[#eef2f6]"
                >
                  {rc}
                </span>
              ))}
              <Link
                href={c.moduleHref}
                className="ml-auto flex shrink-0 items-center gap-[3px] text-[7.5px] font-bold text-ptpn-green hover:underline"
              >
                {c.moduleLabel} <ArrowRight size={9} />
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
