"use client";

import { ChevronDown, Cpu, RefreshCw, TrendingUp, Users } from "lucide-react";
import { scenarios, type Scenario } from "@/lib/wp-data";
import { SectionHead } from "../hc/SectionHead";

const ICONS = {
  bau: Users,
  growth: TrendingUp,
  automation: Cpu,
  reskill: RefreshCw,
};

const TONES: Record<Scenario["tone"], { head: string; icon: string }> = {
  blue: { head: "bg-[#eef4fd]", icon: "text-[#2f6fe4]" },
  amber: { head: "bg-[#fdf6e7]", icon: "text-[#d98b06]" },
  green: { head: "bg-ptpn-greenLight", icon: "text-ptpn-green" },
  teal: { head: "bg-[#e6f6f5]", icon: "text-[#0d9488]" },
};

const FOOTERS: Record<Scenario["footerTone"], string> = {
  neutral: "bg-[#eef2f6] text-ink-500",
  amber: "bg-[#fdf3e0] text-[#c07c05]",
};

function ScenarioCard({ s }: { s: Scenario }) {
  const Icon = ICONS[s.icon];
  const tone = TONES[s.tone];
  return (
    <div className="flex flex-col overflow-hidden rounded-xl border border-[#eef2f6]">
      <div className={`flex items-center gap-2 px-3 py-2.5 ${tone.head}`}>
        <span
          className={`flex h-[24px] w-[24px] shrink-0 items-center justify-center rounded-lg bg-white/70 ${tone.icon}`}
        >
          <Icon size={13} strokeWidth={1.9} />
        </span>
        <span className="min-w-0 leading-tight">
          <span className="block truncate text-[9.5px] font-extrabold text-ink-900">{s.code}</span>
          <span className={`block truncate text-[9px] font-semibold ${tone.icon}`}>
            {s.subtitle}
          </span>
        </span>
      </div>

      <div className="flex flex-1 flex-col justify-center gap-[7px] px-3 py-2.5">
        {[
          { label: "Headcount 2028", value: s.headcount },
          { label: "HC Cost 2028", value: s.cost },
          { label: "Produktivitas Index", value: s.index },
        ].map((row) => (
          <div key={row.label} className="flex items-center justify-between gap-2 text-[9px]">
            <span className="text-ink-500">{row.label}</span>
            <span className="font-extrabold text-ink-900">{row.value}</span>
          </div>
        ))}
      </div>

      <div className="px-3 pb-3">
        <div
          className={`rounded-md py-[5px] text-center text-[8.5px] font-bold ${FOOTERS[s.footerTone]}`}
        >
          {s.footer}
        </div>
      </div>
    </div>
  );
}

export function ScenarioPlanning() {
  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-3.5 pt-3"
      style={{ "--d": "60ms" } as React.CSSProperties}
    >
      <div className="flex items-start justify-between gap-2">
        <div>
          <SectionHead title="Scenario Planning Overview" />
          <p className="mt-[3px] text-[9px] text-ink-500">
            Simulasi dampak berbagai skenario terhadap kebutuhan tenaga kerja dan biaya
          </p>
        </div>
        <button className="flex shrink-0 items-center justify-between gap-2 rounded-lg border border-[#e3e9ef] bg-white px-3 py-1.5 text-left shadow-card">
          <span className="leading-tight">
            <span className="block text-[9px] font-medium text-ink-500">Pilih Skenario</span>
            <span className="mt-[1px] block text-[10px] font-bold text-ink-900">
              Semua Skenario
            </span>
          </span>
          <ChevronDown size={12} className="shrink-0 text-ink-400" />
        </button>
      </div>

      <div className="mt-2.5 grid min-h-0 flex-1 grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {scenarios.map((s) => (
          <ScenarioCard key={s.code} s={s} />
        ))}
      </div>
    </div>
  );
}
