"use client";

import Link from "next/link";
import { ArrowRight, CheckCircle2, ClipboardList, Gavel } from "lucide-react";
import { compDecision, compScenarios } from "@/lib/comp-data";
import { ScopeNote } from "@/components/ui/ScopeNote";

/**
 * Total Rewards Decision Center: perbandingan scenario kompensasi
 * (broad vs targeted vs market correction), rekomendasi + syarat approval,
 * dan decision log. Scenario dapat dikirim ke Scenario Simulation.
 */
export function CompDecisionCenter() {
  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-3 pt-3"
      style={{ "--d": "480ms" } as React.CSSProperties}
    >
      <div className="flex items-start justify-between gap-2">
        <h3 className="card-title-navy flex items-center gap-1.5">
          <Gavel size={13} className="text-[#1b3a6b]" />
          Total Rewards Decision Center
          <ScopeNote />
        </h3>
        <span className="shrink-0 text-[9px] font-semibold text-ink-500">
          Rekomendasi: {compDecision.rekomendasi}
        </span>
      </div>

      <div className="mt-2.5 grid min-h-0 flex-1 grid-cols-[minmax(0,44fr)_minmax(0,30fr)_minmax(0,26fr)] gap-2.5">
        {/* Scenario comparison */}
        <div className="grid min-w-0 grid-cols-2 md:grid-cols-3 gap-2">
          {compScenarios.map((s) => (
            <div
              key={s.nama}
              className="flex min-w-0 flex-col rounded-xl border border-[#eef2f6] px-2.5 py-2"
              style={{ borderTop: `3px solid ${s.color}` }}
            >
              <div className="flex items-center justify-between gap-1">
                <span className="truncate text-[9px] font-extrabold text-ink-900">{s.nama}</span>
                {s.rekomendasi && (
                  <span className="shrink-0 rounded px-1 py-[1px] text-[9px] font-bold leading-none tone-green">
                    ★
                  </span>
                )}
              </div>
              <p className="mt-[3px] text-[7.5px] leading-snug text-ink-500">{s.deskripsi}</p>
              <ul className="mt-auto flex flex-col gap-[2px] pt-1">
                <li className="flex justify-between text-[7.5px]">
                  <span className="font-semibold text-ink-500">Payroll</span>
                  <span className="font-extrabold text-ink-900">{s.payroll}</span>
                </li>
                <li className="flex justify-between text-[7.5px]">
                  <span className="font-semibold text-ink-500">Pay equity</span>
                  <span className="font-extrabold text-ink-900">{s.equity}</span>
                </li>
                <li className="flex justify-between gap-1 text-[7.5px]">
                  <span className="shrink-0 font-semibold text-ink-500">Retention</span>
                  <span className="min-w-0 truncate text-right font-extrabold text-ink-900">
                    {s.retention}
                  </span>
                </li>
              </ul>
            </div>
          ))}
        </div>

        {/* Approval conditions */}
        <div
          className="flex min-w-0 flex-col rounded-xl border border-[#eef2f6] px-3 py-2.5"
          style={{ borderTop: "3px solid #f59e0b" }}
        >
          <span className="inline-flex w-fit items-center rounded px-1.5 py-[2px] text-[9px] font-bold leading-none tone-amber">
            Approval Conditions
          </span>
          <p className="mt-1 text-[9px] leading-snug text-ink-600">{compDecision.alasan}</p>
          <ul className="mt-1.5 flex min-h-0 flex-1 flex-col justify-end gap-[3px]">
            {compDecision.syarat.map((c, i) => (
              <li key={c} className="flex shrink-0 items-start gap-1.5">
                <CheckCircle2 size={10} className="mt-[1px] shrink-0 text-[#d98b06]" />
                <span className="text-[9px] font-semibold leading-snug text-ink-700">
                  {i + 1}. {c}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Decision log */}
        <div
          className="flex min-w-0 flex-col rounded-xl border border-[#eef2f6] px-3 py-2.5"
          style={{ borderTop: "3px solid #3b7ded" }}
        >
          <div className="flex items-center gap-1 text-[9.5px] font-bold leading-tight text-ink-900">
            <ClipboardList size={11} className="text-[#2f6fe4]" /> Decision Log
          </div>
          <ul className="mt-1.5 flex flex-col gap-[4px]">
            {compDecision.log.map((d) => (
              <li key={d.label} className="flex items-center justify-between gap-2">
                <span className="shrink-0 text-[9px] font-semibold text-ink-500">{d.label}</span>
                <span className="min-w-0 truncate text-right text-[9px] font-extrabold text-ink-900">
                  {d.value}
                </span>
              </li>
            ))}
          </ul>
          <Link
            href="/scenario-simulation"
            className="mt-auto flex items-center justify-center gap-1 rounded-lg border border-[#e3e9ef] bg-[#f8fafc] py-[5px] text-[8.5px] font-semibold text-ptpn-greenDark transition-colors hover:bg-[#eef4f0]"
          >
            Kirim ke Scenario Simulation <ArrowRight size={10} />
          </Link>
        </div>
      </div>
    </div>
  );
}
