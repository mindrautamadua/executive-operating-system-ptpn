"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { topRiskDetail, type RiskLevel } from "@/lib/risk-data";
import { decisionAging } from "@/lib/decision-aging";
import { SectionHead } from "@/components/hc/SectionHead";
import { ScopeNote } from "@/components/ui/ScopeNote";
import { ToneBadge, type BadgeTone } from "@/components/shared/ToneBadge";

const LEVEL_TONE: Record<RiskLevel, BadgeTone> = {
  Ekstrem: "bad",
  Tinggi: "warn",
  Menengah: "warn",
  Rendah: "good",
};

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div className="min-w-0">
      <div className="text-[7.5px] font-bold uppercase tracking-[0.04em] text-ink-400">{label}</div>
      <div className="mt-[2px] text-[8.5px] leading-snug text-ink-700">{value}</div>
    </div>
  );
}

/** Detail 8 risiko prioritas — klik baris untuk membuka deskripsi, KRI, dan mitigasi. */
export function TopRiskDetail() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div
      className="card anim-rise px-4 pb-3 pt-3"
      style={{ "--d": "300ms" } as React.CSSProperties}
    >
      <SectionHead title="Detail 8 Risiko Prioritas" action="Ekspor Register" badge={<ScopeNote />} />
      <p className="mt-[3px] text-[9px] text-ink-500">
        Deskripsi, Key Risk Indicator, Rencana Mitigasi, dan Tenggat per Risiko
      </p>

      <ul className="mt-2 flex flex-col gap-1.5">
        {topRiskDetail.map((r, i) => {
          const expanded = open === i;
          return (
            <li key={r.name} className="rounded-lg border border-[#eef2f6] bg-[#fbfcfd]">
              <button
                onClick={() => setOpen(expanded ? null : i)}
                className="flex w-full items-center gap-2 px-2.5 py-1.5 text-left"
                aria-expanded={expanded}
              >
                <span className="flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full bg-[#eef2f6] text-[8.5px] font-extrabold text-ink-500">
                  {i + 1}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="flex items-center gap-1.5">
                    <span className="truncate text-[9.5px] font-extrabold text-ink-900">
                      {r.name}
                    </span>
                    <ToneBadge label={r.level} tone={LEVEL_TONE[r.level]} />
                  </span>
                  <span className="block truncate text-[9px] text-ink-500">
                    {r.category} · {r.owner}
                  </span>
                </span>
                {(() => {
                  const aging = decisionAging(r.due);
                  return (
                    <span
                      className={`shrink-0 text-[8.5px] font-semibold ${
                        aging.overdue ? "text-[#ef4444]" : "text-ink-400"
                      }`}
                    >
                      {aging.label}
                    </span>
                  );
                })()}
                <ChevronDown
                  size={12}
                  className={`shrink-0 text-ink-400 transition-transform ${expanded ? "rotate-180" : ""}`}
                />
              </button>

              {expanded && (
                <div className="grid grid-cols-[minmax(0,44fr)_minmax(0,24fr)_minmax(0,32fr)] gap-3 border-t border-[#eef2f6] px-2.5 py-2">
                  <Field label="Deskripsi" value={r.deskripsi} />
                  <Field label="Key Risk Indicator" value={r.kri} />
                  <Field label="Mitigasi" value={r.mitigasi} />
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
