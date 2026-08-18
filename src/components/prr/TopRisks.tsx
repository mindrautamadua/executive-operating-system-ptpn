import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { topRisks } from "@/lib/prr-data";
import { SectionHead } from "../hc/SectionHead";
import { LevelBadge } from "./LevelBadge";

const RANK_BG = ["#ef4444", "#f0662d", "#f5a524", "#f5a524", "#f5c518"];

export function TopRisks() {
  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-3 pt-3"
      style={{ "--d": "180ms" } as React.CSSProperties}
    >
      <div className="flex items-start justify-between gap-2">
        <div>
          <SectionHead title="Top 5 Risks Requiring Attention" />
          <p className="mt-[3px] text-[9px] text-ink-500">
            Risiko Prioritas yang Memerlukan Tindakan
          </p>
        </div>
        <span className="mt-[2px] shrink-0 text-[9px] font-semibold uppercase tracking-[0.04em] text-ink-500">
          Potential Impact
        </span>
      </div>

      <ul className="scroll-thin mt-2 flex min-h-0 flex-1 flex-col justify-between gap-1.5 overflow-y-auto">
        {topRisks.map((r, i) => (
          <li
            key={r.name}
            className="flex shrink-0 items-center gap-2.5 rounded-lg border border-[#eef2f6] bg-[#fbfcfd] px-2.5 py-1.5"
          >
            <span
              className="flex h-[20px] w-[20px] shrink-0 items-center justify-center rounded-full text-[10px] font-extrabold text-white"
              style={{ background: RANK_BG[i] }}
            >
              {i + 1}
            </span>
            <span className="min-w-0 flex-1 leading-[1.3]">
              <span className="flex items-center gap-2">
                <span className="truncate text-[9.5px] font-extrabold text-ink-900">{r.name}</span>
                <LevelBadge level={r.level} />
              </span>
              <span className="mt-[1px] block truncate text-[8.5px] text-ink-500">{r.desc}</span>
              <span className="block truncate text-[9px] text-ink-500">{r.units}</span>
            </span>
            <span className="shrink-0 text-right leading-[1.35]">
              <span className="block text-[10px] font-extrabold text-[#ef4444]">{r.impact}</span>
              <span className="block text-[8.5px] text-ink-500">{r.impacted}</span>
            </span>
          </li>
        ))}
      </ul>

      <Link
        href="/people-risk-radar/prioritas-risiko"
        className="mt-2 flex w-full items-center justify-center gap-1 rounded-lg border border-[#e3e9ef] bg-[#f8fafc] py-[7px] text-[9.5px] font-semibold text-ptpn-greenDark transition-colors hover:bg-[#eef4f0]"
      >
        Lihat Semua Prioritas Risiko <ArrowRight size={11} />
      </Link>
    </div>
  );
}
