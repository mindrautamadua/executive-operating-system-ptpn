"use client";

import { Award, BookOpen } from "lucide-react";
import { developmentLinkage, rewardLinkage } from "@/lib/kinerja-data";
import { ScopeNote } from "@/components/ui/ScopeNote";

function Kolom({
  icon,
  title,
  rows,
}: {
  icon: React.ReactNode;
  title: string;
  rows: { label: string; value: string }[];
}) {
  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <div className="flex items-center gap-1.5">
        {icon}
        <span className="text-[9px] font-extrabold uppercase tracking-[0.04em] text-ink-900">
          {title}
        </span>
      </div>
      <div className="mt-1 flex min-h-0 flex-1 flex-col justify-around">
        {rows.map((r) => (
          <div key={r.label} className="flex items-center justify-between gap-2">
            <span className="min-w-0 truncate text-[9px] text-ink-700">{r.label}</span>
            <span className="shrink-0 text-[9.5px] font-bold tabular-nums text-ink-900">
              {r.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

/** Closed loop: Performance → Reward dan Performance → Development. */
export function RewardDevelopment() {
  return (
    <div className="card anim-rise flex h-full flex-col px-4 pb-2.5 pt-3">
      <div>
        <h3 className="card-title-navy flex min-w-0 items-center gap-1.5"><span>PERFORMANCE → REWARD & DEVELOPMENT</span><ScopeNote /></h3>
        <p className="mt-[3px] text-[9.5px] text-ink-500">
          Konsekuensi Rating: Merit, Bonus, Promosi, Pengembangan
        </p>
      </div>

      <div className="mt-2 flex min-h-0 flex-1 gap-4">
        <Kolom
          icon={<Award size={12} className="text-ptpn-green" />}
          title="Reward"
          rows={rewardLinkage}
        />
        <div className="w-px shrink-0 bg-[#f0f3f6]" />
        <Kolom
          icon={<BookOpen size={12} className="text-ptpn-green" />}
          title="Development"
          rows={developmentLinkage}
        />
      </div>

      <p className="mt-1.5 border-t border-[#f0f3f6] pt-1.5 text-[9px] leading-[1.4] text-ink-500">
        Loop tertutup: hasil learning dievaluasi ulang pada siklus Q3 2026 — target dimensi
        Inovasi naik dari 81,6 ke ≥ 85.
      </p>
    </div>
  );
}
