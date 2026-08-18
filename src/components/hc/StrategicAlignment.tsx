"use client";

import { ArrowRight, Award, ChevronDown, ClipboardList, Factory, GraduationCap } from "lucide-react";
import { alignmentFlow, alignmentSignal, strategicObjective } from "@/lib/hc-data";
import { SectionHead } from "./SectionHead";
import { ScopeNote } from "../ui/ScopeNote";

const FLOW_ICONS = {
  workforce: { Icon: ClipboardList, cls: "bg-[#e8f1fd] text-[#2f6fe4]" },
  capability: { Icon: GraduationCap, cls: "bg-ptpn-greenLight text-ptpn-green" },
  performance: { Icon: Award, cls: "bg-[#f3eefd] text-[#8b5cf6]" },
  outcome: { Icon: Factory, cls: "bg-[#e6f6f5] text-[#0d9488]" },
} as const;

export function StrategicAlignment() {
  return (
    <div className="card anim-rise px-4 pb-4 pt-3" style={{ "--d": "60ms" } as React.CSSProperties}>
      <SectionHead title="Strategic Alignment" action="Lihat Detail" href="/sdm-talenta/strategic-alignment" badge={<ScopeNote />} />

      <button className="mt-3 flex w-full items-center justify-between rounded-lg border border-[#e3e9ef] bg-[#f8fafc] px-3 py-2 text-left">
        <span className="leading-tight">
          <span className="block text-[8.5px] font-medium text-ink-400">Strategic Objective</span>
          <span className="mt-[3px] block text-[10.5px] font-bold leading-[1.35] text-ink-900">
            {strategicObjective}
          </span>
        </span>
        <ChevronDown size={13} className="ml-2 shrink-0 text-ink-400" />
      </button>

      <div className="mt-4 flex items-start justify-between gap-1">
        {alignmentFlow.map((step, i) => {
          const { Icon, cls } = FLOW_ICONS[step.icon];
          return (
            <div key={step.label} className="flex min-w-0 flex-1 items-start">
              <div className="min-w-0 flex-1 text-center">
                <span
                  className={`mx-auto flex h-[34px] w-[34px] items-center justify-center rounded-full ${cls}`}
                >
                  <Icon size={16} strokeWidth={1.8} />
                </span>
                <div className="mt-1.5 text-[9px] font-semibold leading-[1.3] text-ink-700">
                  {step.label}
                </div>
                <div className="mt-1 text-[11px] font-extrabold leading-none text-ink-900">
                  {step.value}
                </div>
                <div className="mt-[3px] text-[7.5px] leading-[1.3] text-ink-400">{step.sub}</div>
              </div>
              {i < alignmentFlow.length - 1 && (
                <ArrowRight size={12} className="mt-[11px] shrink-0 text-ink-300" />
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-3 flex items-center justify-between rounded-lg bg-[#f8fafc] px-3 py-2">
        <span className="text-[8.5px] text-ink-500" title={alignmentSignal.note}>
          {alignmentSignal.label}
        </span>
        <span className="text-[9.5px] font-bold text-ptpn-green">{alignmentSignal.value}</span>
      </div>
      <div className="mt-1 text-[7.5px] leading-[1.3] text-ink-400">{alignmentSignal.note}</div>
    </div>
  );
}
