"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";
import {
  demografiData,
  demografiTabs,
  overallScore,
  type DemografiTab,
} from "@/lib/engagement-data";

const fmt = (n: number) => n.toLocaleString("id-ID", { minimumFractionDigits: 1 });

/**
 * Skor engagement per kohort sebagai bar horizontal — donat sebelumnya
 * meng-encode porsi populasi padahal judul kartu menjanjikan skor.
 */
export function EngagementDemografi() {
  const [tab, setTab] = useState<DemografiTab>("Generasi");
  const rows = demografiData[tab];

  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-2.5 pt-3"
      style={{ "--d": "340ms" } as React.CSSProperties}
    >
      <div className="flex items-baseline justify-between gap-2">
        <h3 className="card-title-navy">Engagement Score berdasarkan Demografi</h3>
        <span className="shrink-0 text-[9px] text-ink-500">
          Overall <span className="font-bold text-ink-900">{overallScore}</span>
        </span>
      </div>

      <div className="mt-2 flex shrink-0 gap-1.5 rounded-lg bg-[#f5f8fa] p-[3px]">
        {demografiTabs.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`flex-1 rounded-md px-2 py-[5px] text-[9.5px] transition-colors ${
              t === tab
                ? "bg-white font-semibold text-ink-900 shadow-card"
                : "font-medium text-ink-500 hover:text-ink-700"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="mt-1 flex min-h-0 flex-1 flex-col justify-around">
        {rows.map((g, i) => (
          <div key={`${tab}-${g.name}`} className="group relative flex items-center gap-2">
            <span className="w-[122px] shrink-0 truncate text-[9px] text-ink-700">{g.name}</span>
            <span className="h-[9px] min-w-0 flex-1 overflow-hidden rounded-full bg-[#eef2f6]">
              <span
                className="anim-grow-x block h-full rounded-full"
                style={
                  {
                    width: `${g.skor}%`,
                    background: g.color,
                    "--d": `${70 * i}ms`,
                  } as React.CSSProperties
                }
              />
            </span>
            <span className="w-[28px] shrink-0 text-right text-[9.5px] font-bold tabular-nums text-ink-900">
              {fmt(g.skor)}
            </span>

            {/* tooltip skor + porsi populasi */}
            <div className="pointer-events-none absolute bottom-full left-[128px] z-20 mb-0.5 hidden whitespace-nowrap rounded-lg border border-[#e3e9ef] bg-white px-2.5 py-1.5 shadow-cardHover group-hover:block">
              <div className="text-[9.5px] font-bold text-ink-900">{g.name}</div>
              <div className="mt-[2px] text-[9px] text-ink-500">
                Skor engagement{" "}
                <span className="font-bold tabular-nums text-ink-900">{fmt(g.skor)}</span>
                {" · "}Porsi responden{" "}
                <span className="font-semibold tabular-nums text-ink-700">{g.porsi}%</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <button className="link-more mt-1 flex items-center gap-1 self-start">
        Lihat detail demografi <ArrowRight size={11} />
      </button>
    </div>
  );
}
