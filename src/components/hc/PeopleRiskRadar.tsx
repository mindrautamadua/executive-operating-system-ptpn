"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { riskRadar, topRisks, type RiskSeverity } from "@/lib/hc-data";
import { PALETTE } from "@/lib/chart-palette";
import { SectionHead } from "./SectionHead";
import { ScopeNote } from "../ui/ScopeNote";
import { WhyDrivers } from "./WhyDrivers";

const SEVERITY: Record<RiskSeverity, string> = {
  High: "bg-[#fdecec] text-[#ef4444]",
  Medium: "bg-[#fdf3e0] text-[#d98b06]",
  Low: "bg-ptpn-greenLight text-ptpn-green",
};

const CX = 138;
const CY = 110;
const R = 78;

function point(i: number, value: number): [number, number] {
  const angle = -Math.PI / 2 + (i * 2 * Math.PI) / riskRadar.length;
  const r = (R * value) / 100;
  return [CX + r * Math.cos(angle), CY + r * Math.sin(angle)];
}

function polygon(values: number[]): string {
  return values.map((v, i) => point(i, v).join(",")).join(" ");
}

function RadarSvg() {
  const rings = [25, 50, 75, 100];
  return (
    <svg viewBox="0 0 276 220" className="h-full w-full">
      {rings.map((ring) => (
        <polygon
          key={ring}
          points={polygon(riskRadar.map(() => ring))}
          fill="none"
          stroke="var(--chart-grid, #e5eaf0)"
          strokeWidth="1"
        />
      ))}
      {riskRadar.map((_, i) => {
        const [x, y] = point(i, 100);
        return (
          <line
            key={i}
            x1={CX}
            y1={CY}
            x2={x}
            y2={y}
            stroke="var(--chart-grid, #e5eaf0)"
            strokeWidth="1"
          />
        );
      })}

      {/* ambang toleransi */}
      <polygon
        points={polygon(riskRadar.map((d) => d.tolerance))}
        fill={PALETTE.green}
        fillOpacity="0.12"
        stroke={PALETTE.green}
        strokeWidth="1.5"
      />
      {/* tingkat risiko saat ini */}
      <polygon
        points={polygon(riskRadar.map((d) => d.level))}
        fill={PALETTE.amber}
        fillOpacity="0.25"
        stroke={PALETTE.red}
        strokeWidth="1.5"
      />
      {riskRadar.map((d, i) => {
        const [x, y] = point(i, d.level);
        const hot = d.level > d.tolerance;
        return (
          <circle
            key={d.axis}
            cx={x}
            cy={y}
            r="2.6"
            fill={hot ? PALETTE.red : PALETTE.amber}
            stroke="#fff"
            strokeWidth="1"
          />
        );
      })}

      {riskRadar.map((d, i) => {
        const [x, y] = point(i, 117);
        const anchor = x < CX - 6 ? "end" : x > CX + 6 ? "start" : "middle";
        return (
          <text
            key={d.axis}
            x={x}
            y={y + 2.5}
            textAnchor={anchor}
            fontSize="7.5"
            fill="var(--chart-tick, #6b7280)"
          >
            {d.axis}
          </text>
        );
      })}
    </svg>
  );
}

export function PeopleRiskRadar() {
  const [openRisk, setOpenRisk] = useState<number | null>(null);

  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-3.5 pt-3"
      style={{ "--d": "80ms" } as React.CSSProperties}
    >
      <SectionHead title="People Risk Radar" action="Lihat Semua" href="/people-risk-radar" badge={<ScopeNote />} />

      <div className="mt-1 flex min-h-0 flex-1 items-stretch gap-3">
        <div className="flex min-w-0 flex-[54] flex-col">
          <div className="min-h-0 w-full flex-1">
            <RadarSvg />
          </div>
          <div className="mt-1 flex items-center justify-center gap-3 text-[8.5px] text-ink-500">
            <span className="flex items-center gap-1">
              <span className="h-[7px] w-[7px] rounded-full bg-[#ef4444]" /> High Risk
            </span>
            <span className="flex items-center gap-1">
              <span className="h-[7px] w-[7px] rounded-full bg-[#f5a524]" /> Medium Risk
            </span>
            <span className="flex items-center gap-1">
              <span className="h-[7px] w-[7px] rounded-full bg-ptpn-green" /> Low Risk
            </span>
          </div>
        </div>

        <div className="flex min-w-0 flex-[46] flex-col">
          <div className="text-[9.5px] font-bold text-ink-700">Top 5 People Risks</div>
          <div className="mt-1.5 flex flex-col gap-[5px]">
            {topRisks.map((r, i) => {
              const open = openRisk === i;
              return (
                <div key={r.label} className="rounded-lg border border-[#eef2f6] bg-white">
                  <button
                    onClick={() => setOpenRisk(open ? null : i)}
                    className="flex w-full items-center justify-between gap-2 px-2.5 py-[6px] text-left"
                  >
                    <span className="min-w-0 truncate text-[9.5px] font-medium text-ink-700">
                      {r.label}
                    </span>
                    <span className="flex shrink-0 items-center gap-1.5">
                      <span className="text-[9px] font-bold text-ink-500">{r.score}</span>
                      <span
                        className={`rounded px-1.5 py-[2px] text-[8.5px] font-bold ${SEVERITY[r.severity]}`}
                      >
                        {r.severity}
                      </span>
                      <ChevronDown
                        size={11}
                        className={`text-ink-400 transition-transform ${open ? "rotate-180" : ""}`}
                      />
                    </span>
                  </button>
                  {open && (
                    <div className="px-1.5 pb-1.5">
                      <WhyDrivers
                        drivers={r.drivers}
                        tone={r.severity === "High" ? "red" : "amber"}
                      />
                      <div className="mt-1 flex items-start gap-1.5 rounded-md bg-ptpn-greenLight px-2 py-[5px]">
                        <span className="mt-[1px] text-[9px] font-extrabold uppercase tracking-[0.04em] text-ptpn-green">
                          Aksi
                        </span>
                        <span className="text-[8.5px] leading-[1.4] text-ink-700">
                          {r.recommendation}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
          <div className="flex-1" />
          <Link
            href="/people-risk-radar/all-risks"
            className="mt-2 block w-full rounded-lg border border-[#e3e9ef] py-[6px] text-center text-[9.5px] font-semibold text-ink-700 transition-colors hover:bg-[#f5f8fa]"
          >
            Lihat Semua Risiko
          </Link>
        </div>
      </div>
    </div>
  );
}
