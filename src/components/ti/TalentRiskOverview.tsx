"use client";

import { useState } from "react";
import { AlertTriangle, ChevronDown, MoveDown, MoveUp } from "lucide-react";
import { tiRiskDonut, tiTopFlightRisk, tiRiskNote } from "@/lib/ti-data";
import { SectionHead } from "../hc/SectionHead";
import { DonutChart } from "../ui/DonutChart";

export function TalentRiskOverview() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="card anim-rise flex flex-col p-3.5">
      <SectionHead
        title="Talent Risk Overview"
        action="Lihat Detail"
        href="/talent-intelligence/talent-risk"
      />
      <p className="mt-[3px] text-[9px] text-ink-500">
        Identifikasi Risiko Kehilangan Talenta — klik nama untuk root cause
      </p>

      <div className="mt-2 flex flex-1 items-start gap-3">
        {/* donut + legend */}
        <div className="flex shrink-0 items-center gap-2.5 self-center">
          <DonutChart
            data={tiRiskDonut.map(({ name, value, color }) => ({ name, value, color }))}
            size={124}
            thickness={22}
            centerValue="186"
            centerCaption="Total"
          />
          <ul className="flex flex-col gap-2">
            {tiRiskDonut.map((d) => (
              <li key={d.name} className="flex items-start gap-1.5">
                <span
                  className="mt-[2px] h-[7px] w-[7px] shrink-0 rounded-[2px]"
                  style={{ background: d.color }}
                />
                <span className="text-[8.5px] leading-[1.3] text-ink-500">
                  <span className="font-bold text-ink-900">{d.name}</span>
                  <br />
                  {d.value} ({d.pctLabel})
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* top 5 flight risk + drill-down why */}
        <div className="min-w-0 flex-1 border-l border-[#eef2f6] pl-3">
          <div className="flex items-center justify-between">
            <span className="text-[8.5px] font-bold text-ink-700">Top 5 Flight Risk (High)</span>
            <span className="text-[9px] font-semibold text-ink-500">Risk Score</span>
          </div>
          <ul className="mt-1.5 flex flex-col gap-[5px]">
            {tiTopFlightRisk.map((r, i) => {
              const expanded = open === i;
              return (
                <li key={r.nama}>
                  <button
                    onClick={() => setOpen(expanded ? null : i)}
                    className={`flex w-full items-center gap-2 rounded-md px-1 py-[2px] text-left transition-colors ${
                      expanded ? "bg-[#fdf5f5]" : "hover:bg-[#f8fafc]"
                    }`}
                  >
                    <span className="w-3 shrink-0 text-[8.5px] font-semibold text-ink-400">
                      {i + 1}.
                    </span>
                    <span className="min-w-0 flex-1 leading-[1.2]">
                      <span className="block truncate text-[9px] font-bold text-ink-900">
                        {r.nama}
                      </span>
                      <span className="block truncate text-[9px] text-ink-500">{r.jabatan}</span>
                    </span>
                    <span className="shrink-0 rounded-md bg-[#fdecec] px-1.5 py-[2px] text-[9px] font-extrabold text-[#ef4444]">
                      {r.score}
                    </span>
                    <ChevronDown
                      size={11}
                      className={`shrink-0 text-ink-400 transition-transform ${
                        expanded ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {expanded && (
                    <div className="anim-fade mt-1 rounded-lg border border-[#f6d5d5] bg-[#fdf5f5] px-2.5 pb-2 pt-1.5">
                      <div className="text-[7.5px] font-extrabold uppercase tracking-[0.05em] text-ink-400">
                        Contributing Factors
                      </div>
                      <div className="mt-1 flex flex-wrap gap-1">
                        {r.factors.map((f) => (
                          <span
                            key={f.label}
                            className="flex items-center gap-[3px] whitespace-nowrap rounded bg-white px-1.5 py-[2px] text-[7.5px] font-semibold text-ink-700"
                          >
                            {f.label}
                            {f.arah === "down" ? (
                              <MoveDown size={8} className="text-[#ef4444]" />
                            ) : (
                              <MoveUp size={8} className="text-[#ef4444]" />
                            )}
                          </span>
                        ))}
                      </div>
                      <div className="mt-1.5 text-[9px] leading-[1.45] text-ink-500">
                        <span className="font-bold text-ink-700">Business exposure:</span>{" "}
                        {r.exposure.critical ? "Posisi kritikal" : "Posisi non-kritikal"} · lead time
                        pengganti {r.exposure.leadTime} · dampak{" "}
                        <span
                          className={`font-bold ${
                            r.exposure.impact === "High" ? "text-[#ef4444]" : "text-[#d98b06]"
                          }`}
                        >
                          {r.exposure.impact}
                        </span>
                      </div>
                      <div className="mt-1 text-[9px] leading-[1.45] text-ink-700">
                        <span className="font-bold text-ptpn-green">Rekomendasi:</span> {r.action}
                      </div>
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      <div className="mt-2.5 flex items-center gap-2 rounded-lg border border-[#f5e5c8] bg-[#fdf7ea] px-2.5 py-[7px]">
        <AlertTriangle size={12} className="shrink-0 text-[#d98b06]" />
        <span className="text-[8.5px] text-ink-700">
          <span className="font-bold text-[#d98b06]">Perhatian:</span> {tiRiskNote}
        </span>
      </div>
    </section>
  );
}
