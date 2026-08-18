"use client";

import { Droplets, Gauge, Target, TrendingUp } from "lucide-react";
import { insightProduktivitas } from "@/lib/produktivitas-data";
import { ScopeNote } from "../ui/ScopeNote";

const TONE = {
  green: { chip: "tone-green", bg: "bg-[#f2faf5]", border: "border-[#dcf1e6]", Icon: TrendingUp },
  amber: { chip: "tone-amber", bg: "bg-[#fdf8ee]", border: "border-[#f7e8c8]", Icon: Droplets },
  blue: { chip: "tone-blue", bg: "bg-[#f4f8fe]", border: "border-[#dce9fb]", Icon: Gauge },
  purple: { chip: "tone-purple", bg: "bg-[#f9f6fe]", border: "border-[#eae0fb]", Icon: Target },
} as const;

export function InsightProduktivitas() {
  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-3 pt-3"
      style={{ "--d": "420ms" } as React.CSSProperties}
    >
      <h3 className="card-title-navy flex min-w-0 items-center gap-1.5">
        <span>7. Insight &amp; Rekomendasi</span>
        <ScopeNote />
      </h3>

      <div className="mt-2.5 grid min-h-0 flex-1 grid-cols-2 md:grid-cols-4 gap-2.5">
        {insightProduktivitas.map((it) => {
          const t = TONE[it.tone];
          return (
            <div
              key={it.judul}
              className={`flex flex-col rounded-lg border ${t.border} ${t.bg} px-3 py-2.5`}
            >
              <div className="flex items-center gap-1.5">
                <span
                  className={`${t.chip} flex h-[19px] w-[19px] shrink-0 items-center justify-center rounded-md`}
                >
                  <t.Icon size={11} strokeWidth={2} />
                </span>
                <span className="text-[9.5px] font-bold leading-tight text-ink-900">
                  {it.judul}
                </span>
              </div>
              <p className="mt-1.5 text-[8.5px] leading-[1.45] text-ink-600">{it.isi}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
