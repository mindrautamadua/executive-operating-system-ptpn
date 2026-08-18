"use client";

import { Lightbulb } from "lucide-react";
import { Area, AreaChart, ResponsiveContainer } from "recharts";
import { hpiBem, peopleMath } from "@/lib/hc-data";
import { PALETTE } from "@/lib/chart-palette";
import { SectionHead } from "./SectionHead";
import { ScopeNote } from "../ui/ScopeNote";

function ScoreRing({ value }: { value: number }) {
  const r = 40;
  const c = 2 * Math.PI * r;
  return (
    <div className="relative h-[104px] w-[104px]">
      <svg viewBox="0 0 104 104" className="h-full w-full -rotate-90">
        <circle cx="52" cy="52" r={r} fill="none" stroke="#e6efe9" strokeWidth="10" />
        <circle
          cx="52"
          cy="52"
          r={r}
          fill="none"
          stroke={PALETTE.green}
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={`${(value / 100) * c} ${c}`}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center leading-none">
        <span className="text-[24px] font-extrabold text-ptpn-green">{value}</span>
        <span className="mt-[2px] text-[8.5px] text-ink-400">/100</span>
      </div>
    </div>
  );
}

const sparkData = peopleMath.trend.map((v, i) => ({ i, v }));

export function PeopleMathHpi() {
  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-3.5 pt-3"
      style={{ "--d": "100ms" } as React.CSSProperties}
    >
      <SectionHead title="People Math & HPI BEM Summary" action="Lihat Detail" href="/people-math-hpi" badge={<ScopeNote />} />

      <div className="mt-3 grid min-h-0 flex-1 grid-cols-2 md:grid-cols-3 gap-2.5">
        <div className="flex flex-col rounded-xl border border-[#eef2f6] px-3 pb-2 pt-2.5 text-center">
          <div className="text-[8.5px] font-semibold leading-[1.35] text-ink-500">
            People Math Score
            <br />
            (Rata-rata Group)
          </div>
          <div className="mt-2 text-[30px] font-extrabold leading-none text-ptpn-green">
            {peopleMath.score}
          </div>
          <div className="text-[8.5px] text-ink-400">/100</div>
          <div className="mt-1 text-[9px] font-semibold text-ink-700">
            Kategori: {peopleMath.kategori}
          </div>
          <div className="mt-auto h-[34px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={sparkData} margin={{ top: 4, right: 2, bottom: 0, left: 2 }}>
                <defs>
                  <linearGradient id="pm-fill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={PALETTE.green} stopOpacity="0.25" />
                    <stop offset="100%" stopColor={PALETTE.green} stopOpacity="0" />
                  </linearGradient>
                </defs>
                <Area isAnimationActive={false}
                  type="monotone"
                  dataKey="v"
                  stroke={PALETTE.green}
                  strokeWidth={1.5}
                  fill="url(#pm-fill)"
                  dot={{ r: 1.6, fill: PALETTE.green, strokeWidth: 0 }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="flex flex-col items-center rounded-xl border border-[#eef2f6] px-3 pb-2 pt-2.5 text-center">
          <div className="text-[8.5px] font-semibold leading-[1.35] text-ink-500">
            HPI BEM Score
            <br />
            (Rata-rata Group)
          </div>
          <div className="mt-1.5">
            <ScoreRing value={hpiBem.score} />
          </div>
          <div className="mt-auto text-[9px] font-semibold text-ink-700">
            Kategori: {hpiBem.kategori}
          </div>
        </div>

        <div className="flex flex-col rounded-xl border border-[#eef2f6] px-3 pb-2.5 pt-2.5">
          <div className="text-[9px] font-bold text-ink-700">6 Sel HPI BEM (Gilbert)</div>
          <div className="mt-1.5 flex flex-1 flex-col justify-center gap-[7px]">
            {hpiBem.dimensi.map((d) => (
              <div key={d.label}>
                <div className="flex items-center justify-between">
                  <span
                    className={`text-[9px] font-bold ${
                      d.tone === "amber" ? "text-[#d98b06]" : "text-ptpn-green"
                    }`}
                  >
                    {d.label}
                  </span>
                  <span className="text-[9px] font-bold text-ink-900">
                    {d.value} <span className="font-medium text-ink-400">/100</span>
                  </span>
                </div>
                <div className="mt-[3px] h-[4px] overflow-hidden rounded-full bg-[#eef2f6]">
                  <div
                    className={`h-full rounded-full ${
                      d.tone === "amber" ? "bg-[#f5a524]" : "bg-ptpn-green"
                    }`}
                    style={{ width: `${d.value}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-3 flex items-center gap-2 rounded-lg bg-ptpn-greenLight px-3 py-[7px]">
        <Lightbulb size={12} className="shrink-0 text-ptpn-green" />
        <span className="text-[9px] font-medium text-ink-700">{hpiBem.opportunity}</span>
      </div>
    </div>
  );
}
