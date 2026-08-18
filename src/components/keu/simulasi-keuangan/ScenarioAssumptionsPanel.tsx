"use client";

import { useState } from "react";
import { RotateCcw } from "lucide-react";
import { assumptions } from "@/lib/ksk-data";
import { SectionHead } from "@/components/hc/SectionHead";
import { ScopeNote } from "@/components/ui/ScopeNote";

const fmtVal = (v: number) =>
  v.toLocaleString("id-ID", { maximumFractionDigits: 2 });

export function ScenarioAssumptionsPanel() {
  const [values, setValues] = useState<number[]>(assumptions.map((a) => a.baseValue));

  const setAt = (i: number, v: number) =>
    setValues((prev) => prev.map((p, j) => (j === i ? v : p)));

  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-3 pt-3"
      style={{ "--d": "60ms" } as React.CSSProperties}
    >
      <div className="flex items-center justify-between gap-2">
        <SectionHead title="Panel Asumsi" className="flex-1" badge={<ScopeNote />} />
        <button
          onClick={() => setValues(assumptions.map((a) => a.baseValue))}
          className="flex shrink-0 items-center gap-1 text-[8.5px] font-semibold text-ink-500 transition-colors hover:text-ptpn-green"
        >
          <RotateCcw size={10} /> Reset Base
        </button>
      </div>
      <p className="mt-[3px] text-[9px] text-ink-500">
        Geser asumsi untuk mengeksplorasi skenario (ilustratif)
      </p>

      <div className="mt-1 flex min-h-0 flex-1 flex-col justify-evenly">
        {assumptions.map((a, i) => {
          const step = a.max - a.min <= 1 ? 0.01 : a.max - a.min <= 100 ? 1 : 50;
          return (
            <div key={a.label}>
              <div className="flex items-center justify-between">
                <span className="text-[9px] font-semibold text-ink-700">{a.label}</span>
                <span className="text-[9.5px] font-extrabold text-ink-900">
                  {fmtVal(values[i])}{" "}
                  <span className="text-[9px] font-semibold text-ink-500">{a.unit}</span>
                </span>
              </div>
              <input
                type="range"
                min={a.min}
                max={a.max}
                step={step}
                value={values[i]}
                onChange={(e) => setAt(i, Number(e.target.value))}
                className="mt-1 h-[4px] w-full cursor-pointer appearance-none rounded-full bg-[#e3e9ef] accent-[#1a9c5b]"
                aria-label={a.label}
              />
              <div className="mt-[2px] flex items-center justify-between text-[7.5px] text-ink-400">
                <span>{fmtVal(a.min)}</span>
                <span className="font-semibold">Base: {fmtVal(a.baseValue)}</span>
                <span>{fmtVal(a.max)}</span>
              </div>
            </div>
          );
        })}
      </div>

      <p className="pb-0.5 pt-1 text-[9px] leading-snug text-ink-500">
        Kalkulasi penuh dijalankan engine simulasi; panel ini menampilkan asumsi base case.
      </p>
    </div>
  );
}
