import Link from "next/link";
import { ArrowRight, MoveRight } from "lucide-react";
import { riskDrivers } from "@/lib/prr-data";
import { SectionHead } from "../hc/SectionHead";

function TrendArrow({ trend }: { trend: "up" | "down" | "flat" }) {
  if (trend === "flat") return <MoveRight size={11} className="text-ink-400" />;
  const up = trend === "up";
  return (
    <svg
      width={11}
      height={11}
      viewBox="0 0 24 24"
      className={`${up ? "text-[#ef4444]" : "text-[#16a34a] rotate-180"}`}
      fill="currentColor"
    >
      <path d="M12 5 4 15h16Z" />
    </svg>
  );
}

const MAX_PCT = 30;

export function TopRiskDrivers() {
  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-3 pt-3"
      style={{ "--d": "180ms" } as React.CSSProperties}
    >
      <SectionHead title="Top Risk Drivers" />
      <p className="mt-[3px] text-[9px] text-ink-500">Faktor Utama yang Mendorong Risiko</p>

      <div className="mt-2.5 flex items-center justify-between border-b border-[#eef2f6] pb-1.5 text-[9px] font-semibold uppercase tracking-[0.04em] text-ink-500">
        <span>Driver</span>
        <span className="flex items-center gap-3">
          <span>Pengaruh</span>
          <span>Trend</span>
        </span>
      </div>

      <ul className="scroll-thin flex min-h-0 flex-1 flex-col justify-around gap-y-1 overflow-y-auto py-1">
        {riskDrivers.map((d) => (
          <li key={d.name} className="flex shrink-0 items-center gap-2">
            <span className="w-[108px] shrink-0 truncate text-[8.5px] font-semibold text-ink-700">
              {d.name}
            </span>
            <span className="h-[7px] min-w-0 flex-1 overflow-hidden rounded-full bg-[#eef2f6]">
              <span
                className="anim-grow-x block h-full rounded-full"
                style={{ width: `${(d.pct / MAX_PCT) * 100}%`, background: d.color }}
              />
            </span>
            <span className="w-[26px] shrink-0 text-right text-[9px] font-extrabold text-ink-900">
              {d.pct}%
            </span>
            <span className="flex w-[14px] shrink-0 justify-center">
              <TrendArrow trend={d.trend} />
            </span>
          </li>
        ))}
      </ul>

      <Link
        href="/people-risk-radar/all-drivers"
        className="mt-1 flex w-full items-center justify-center gap-1 rounded-lg border border-[#e3e9ef] bg-[#f8fafc] py-[7px] text-[9.5px] font-semibold text-ptpn-greenDark transition-colors hover:bg-[#eef4f0]"
      >
        Lihat Semua Driver <ArrowRight size={11} />
      </Link>
    </div>
  );
}
