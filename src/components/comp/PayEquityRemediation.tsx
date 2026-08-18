"use client";

import { Scale } from "lucide-react";
import { equityBridge, equityRemediasi } from "@/lib/comp-data";
import { ScopeNote } from "@/components/ui/ScopeNote";

/**
 * Pay Equity Decision Intelligence: bridge unadjusted → adjusted →
 * unexplained gap, populasi terdampak + biaya remediasi, dan
 * statistical confidence supaya BOD tidak membaca angka sebagai kepastian absolut.
 */
export function PayEquityRemediation() {
  const maxVal = Math.max(...equityBridge.map((b) => Math.abs(b.value)));
  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-3 pt-3"
      style={{ "--d": "160ms" } as React.CSSProperties}
    >
      <div className="flex items-start justify-between gap-2">
        <h3 className="card-title-navy flex items-center gap-1.5">
          <Scale size={13} className="text-[#1b3a6b]" />
          Pay Equity → Remediation
          <ScopeNote />
        </h3>
        <span className="shrink-0 rounded px-1.5 py-[2px] text-[9px] font-bold leading-none tone-amber">
          Targeted review required
        </span>
      </div>

      <div className="mt-2.5 grid min-h-0 flex-1 grid-cols-[minmax(0,52fr)_minmax(0,48fr)] gap-2.5">
        {/* Bridge */}
        <div className="flex min-w-0 flex-col">
          <ul className="flex min-h-0 flex-1 flex-col justify-between gap-[3px]">
            {equityBridge.map((b) => {
              const negatif = b.value < 0;
              const kunci = b.label === "Within-Level Gap" || b.label === "Unexplained Gap";
              return (
                <li key={b.label} className="flex shrink-0 items-center gap-2">
                  <span
                    className={`w-[128px] shrink-0 truncate text-[9px] leading-snug ${kunci ? "font-extrabold text-ink-900" : "font-semibold text-ink-600"}`}
                    title={b.note}
                  >
                    {b.label}
                  </span>
                  <div className="h-[7px] min-w-0 flex-1 overflow-hidden rounded-full bg-[var(--chart-grid)]">
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: `${(Math.abs(b.value) / maxVal) * 100}%`,
                        background: negatif ? "#94a3b8" : kunci ? "#f5a524" : "#ef4444",
                      }}
                    />
                  </div>
                  <span
                    className={`w-[34px] shrink-0 text-right text-[9px] font-extrabold ${kunci ? "text-[#b45309]" : "text-ink-900"}`}
                  >
                    {negatif ? "−" : ""}
                    {Math.abs(b.value).toString().replace(".", ",")}%
                  </span>
                </li>
              );
            })}
          </ul>
          <p className="mt-1.5 border-t border-[#eef2f6] pt-1.5 text-[9px] leading-snug text-ink-500">
            {equityRemediasi.konsentrasi}
          </p>
        </div>

        {/* Actionable population + confidence */}
        <div className="flex min-w-0 flex-col gap-2">
          <div className="grid grid-cols-2 gap-2">
            <div className="rounded-xl border border-[#eef2f6] px-2.5 py-2" style={{ borderTop: "3px solid #ef4444" }}>
              <div className="text-[13px] font-extrabold leading-none text-ink-900">
                {equityRemediasi.affected}
              </div>
              <div className="mt-[3px] text-[7.5px] font-semibold leading-tight text-ink-500">
                {equityRemediasi.affectedNote}
              </div>
            </div>
            <div className="rounded-xl border border-[#eef2f6] px-2.5 py-2" style={{ borderTop: "3px solid #f5a524" }}>
              <div className="text-[13px] font-extrabold leading-none text-ink-900">
                {equityRemediasi.biaya}
              </div>
              <div className="mt-[3px] text-[7.5px] font-semibold leading-tight text-ink-500">
                {equityRemediasi.biayaNote}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="text-[9px] font-bold text-ink-500">Prioritas:</span>
            {equityRemediasi.prioritas.map((p) => (
              <span key={p} className="rounded px-1.5 py-[2px] text-[7.5px] font-bold leading-none tone-red">
                {p}
              </span>
            ))}
          </div>

          <ul className="mt-auto flex flex-col gap-[3px]">
            {equityRemediasi.confidence.map((c) => (
              <li key={c.label} className="flex items-center gap-2">
                <span className="w-[112px] shrink-0 truncate text-[9px] font-semibold text-ink-600">
                  {c.label}
                </span>
                <div className="h-[5px] min-w-0 flex-1 overflow-hidden rounded-full bg-[var(--chart-grid)]">
                  <div
                    className="h-full rounded-full bg-[#0d9488]"
                    style={{ width: `${c.value}%` }}
                  />
                </div>
                <span className="w-[26px] shrink-0 text-right text-[8.5px] font-extrabold text-ink-900">
                  {c.value}%
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
