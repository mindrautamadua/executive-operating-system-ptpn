"use client";

import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { criticalSkills } from "@/lib/hc-data";
import { ScopeNote } from "../ui/ScopeNote";

const fmt = (n: number) => n.toLocaleString("id-ID");

/** 4 skill dengan defisit relatif terbesar (sumber tunggal: hc-data). */
const TOP = [...criticalSkills]
  .sort((a, b) => (a.supply - a.demand) / a.demand - (b.supply - b.demand) / b.demand)
  .slice(0, 4);

/** Cuplikan critical skills gap; tabel lengkap di Skills Intelligence /sdm-talenta. */
export function WaSkillsGap() {
  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-3 pt-3"
      style={{ "--d": "120ms" } as React.CSSProperties}
    >
      <div className="flex items-center justify-between gap-2">
        <h3 className="flex min-w-0 items-center gap-1.5 text-[10px] font-extrabold uppercase tracking-[0.05em] text-ink-900">
          <span>
            Critical Skills Gap{" "}
            <span className="font-semibold normal-case tracking-normal text-ink-400">
              (Demand 2028)
            </span>
          </span>
          <ScopeNote />
        </h3>
        <Link
          href="/sdm-talenta"
          className="flex shrink-0 items-center gap-1 text-[9.5px] font-semibold text-ptpn-green hover:underline"
        >
          Lihat Detail <ArrowRight size={11} />
        </Link>
      </div>

      <div className="mt-2 flex min-h-0 flex-1 flex-col justify-between">
        {TOP.map((s) => {
          const gap = s.supply - s.demand;
          const fill = Math.min((s.supply / s.demand) * 100, 100);
          const critical = (s.demand - s.supply) / s.demand >= 0.3;
          return (
            <div key={s.skill}>
              <div className="flex items-center justify-between gap-2">
                <span className="truncate text-[9px] font-semibold text-ink-700">{s.skill}</span>
                <span
                  className={`text-[9.5px] font-bold ${gap < 0 ? "text-[#ef4444]" : "text-ptpn-green"}`}
                >
                  {gap < 0 ? `-${fmt(-gap)}` : `+${fmt(gap)}`}
                </span>
              </div>
              <div className="mt-[3px] flex items-center gap-2">
                <div className="h-[5px] flex-1 overflow-hidden rounded-full bg-[#e8edf2]">
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: `${fill}%`,
                      backgroundColor: critical ? "#ef4444" : "#f5a524",
                    }}
                  />
                </div>
                <span className="shrink-0 text-[9px] text-ink-500">
                  {fmt(s.supply)} / {fmt(s.demand)}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-2 flex items-center gap-2 rounded-lg bg-[#f8fafc] px-3 py-[6px]">
        <Sparkles size={11} className="shrink-0 text-ptpn-green" strokeWidth={1.9} />
        <span className="text-[8.5px] font-medium text-ink-700">
          Reskilling 400 karyawan/tahun + strategic hiring untuk 3 skill teratas.
        </span>
      </div>
    </div>
  );
}
