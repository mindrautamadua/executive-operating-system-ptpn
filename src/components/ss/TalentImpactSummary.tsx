"use client";

import Link from "next/link";
import {
  ArrowRight,
  BriefcaseBusiness,
  HeartHandshake,
  Puzzle,
  Shuffle,
  Star,
} from "lucide-react";
import { readinessDefinition, talentImpact, talentReadiness } from "@/lib/ss-data";
import { SectionHead } from "../hc/SectionHead";
import { DonutChart } from "../ui/DonutChart";

const ICONS = {
  coverage: { Icon: BriefcaseBusiness, cls: "bg-[#e8f1fd] text-[#2f6fe4]" },
  skill: { Icon: Puzzle, cls: "bg-[#e6f6f5] text-[#0d9488]" },
  hipo: { Icon: Star, cls: "bg-ptpn-greenLight text-ptpn-green" },
  mobility: { Icon: Shuffle, cls: "bg-[#f1ecfd] text-[#8b5cf6]" },
  engagement: { Icon: HeartHandshake, cls: "bg-ptpn-greenLight text-ptpn-green" },
};

export function TalentImpactSummary() {
  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-3 pt-3"
      style={{ "--d": "180ms" } as React.CSSProperties}
    >
      <SectionHead title="Dampak Talent Summary (2028)" />
      <p className="mt-[3px] text-[9px] text-ink-500">
        Ringkasan dampak terhadap talent organization
      </p>

      <div className="mt-2 flex min-h-0 flex-1 items-center gap-4">
        <ul className="scroll-thin flex h-full min-w-0 flex-1 flex-col justify-between gap-1.5 overflow-y-auto">
          {talentImpact.map((t) => {
            const { Icon, cls } = ICONS[t.icon];
            return (
              <li
                key={t.label}
                className="flex shrink-0 items-center gap-2 rounded-lg border border-[#eef2f6] bg-[#fbfcfd] px-2.5 py-1.5"
              >
                <span
                  className={`flex h-[20px] w-[20px] shrink-0 items-center justify-center rounded-md ${cls}`}
                >
                  <Icon size={11.5} strokeWidth={2} />
                </span>
                <span className="min-w-0 flex-1 truncate text-[9px] font-bold text-ink-900">
                  {t.label}
                </span>
                <span className="shrink-0 text-[10px] font-extrabold text-ink-900">{t.value}</span>
                <span className="w-[46px] shrink-0 text-right text-[8.5px] font-bold text-ptpn-green">
                  {t.delta}
                </span>
              </li>
            );
          })}
        </ul>

        <div className="flex shrink-0 flex-col items-center">
          <p
            className="cursor-help text-[8.5px] font-semibold text-ink-500 underline decoration-dotted underline-offset-2"
            title={readinessDefinition}
          >
            Distribusi Talent Berdasarkan Readiness
          </p>
          <div className="mt-1 flex items-center gap-3">
            <DonutChart
              data={talentReadiness}
              size={112}
              thickness={20}
              centerValue=""
              valueFormatter={(v) => `${v}%`}
            />
            <ul className="flex flex-col gap-[5px]">
              {talentReadiness.map((r) => (
                <li key={r.name} className="flex items-center gap-1.5 text-[9px] text-ink-600">
                  <span
                    className="h-[7px] w-[7px] shrink-0 rounded-[2px]"
                    style={{ background: r.color }}
                  />
                  <span className="font-semibold">{r.name}</span>
                  <span className="text-ink-400">
                    {r.value}% ({r.count})
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <Link
        href="/succession-planning"
        className="mt-2 flex w-full items-center justify-center gap-1 rounded-lg border border-[#e3e9ef] bg-[#f8fafc] py-[7px] text-[9.5px] font-semibold text-ptpn-greenDark transition-colors hover:bg-[#eef4f0]"
      >
        Lihat Critical Role di Succession Planning <ArrowRight size={11} />
      </Link>
    </div>
  );
}
