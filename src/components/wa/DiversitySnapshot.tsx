"use client";

import { Accessibility, Handshake, Hourglass, PersonStanding, UserRound } from "lucide-react";
import { diversityNote, diversityTiles } from "@/lib/wa-data";
import { Delta } from "../ui/Delta";
import { SectionHead } from "../hc/SectionHead";
import { ScopeNote } from "../ui/ScopeNote";

const ICONS = {
  female: PersonStanding,
  disability: Accessibility,
  senior: UserRound,
  tenure: Hourglass,
};

const TONES: Record<string, { bg: string; icon: string; value: string }> = {
  purple: { bg: "bg-[#f7f4fe]", icon: "text-[#8b5cf6]", value: "text-[#8b5cf6]" },
  blue: { bg: "bg-[#eef5fe]", icon: "text-[#2f6fe4]", value: "text-[#2f6fe4]" },
  green: { bg: "bg-ptpn-greenLight", icon: "text-ptpn-green", value: "text-ptpn-green" },
  teal: { bg: "bg-[#e6f6f5]", icon: "text-[#0d9488]", value: "text-[#0d9488]" },
};

export function DiversitySnapshot() {
  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-3 pt-3"
      style={{ "--d": "180ms" } as React.CSSProperties}
    >
      <SectionHead
        title="Diversity Snapshot"
        action="Lihat Detail"
        href="/workforce-analytics/diversity"
        badge={<ScopeNote />}
      />
      <p className="mt-[3px] text-[9px] text-ink-500">Keragaman Workforce</p>

      <div className="mt-2.5 grid min-h-0 flex-1 grid-cols-4 gap-2">
        {diversityTiles.map((t) => {
          const Icon = ICONS[t.icon];
          const tone = TONES[t.tone];
          return (
            <div
              key={t.label}
              className={`flex flex-col justify-center rounded-lg px-2.5 py-2 ${tone.bg}`}
            >
              <div className="flex items-center gap-1">
                <Icon size={12} strokeWidth={2} className={tone.icon} />
                <span className="truncate text-[8.5px] font-semibold text-ink-700">{t.label}</span>
              </div>
              <div className={`mt-1.5 text-[17px] font-extrabold leading-none ${tone.value}`}>
                {t.value}
              </div>
              <div className="mt-[3px] text-[9px] text-ink-500">{t.sub}</div>
              <div className="mt-1.5 flex items-center gap-1">
                <Delta value={t.delta} trend="up" tone="good" size={8.5} />
                <span className="truncate text-[7.5px] text-ink-400">{t.compare}</span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-2.5 flex shrink-0 items-center gap-2 rounded-lg bg-[#f6f8fa] px-3 py-2">
        <Handshake size={13} className="shrink-0 text-ink-400" />
        <p className="text-[8.5px] leading-snug text-ink-500">{diversityNote}</p>
      </div>
    </div>
  );
}
