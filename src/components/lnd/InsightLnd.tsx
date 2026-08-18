import { ArrowRight, CircleCheck, Clock, TriangleAlert, TrendingUp } from "lucide-react";
import { lndInsight } from "@/lib/lnd-data";
import { CoachRobot } from "../kinerja/CoachRobot";

const TONE = {
  info: { chip: "tone-blue", Icon: TrendingUp },
  success: { chip: "tone-green", Icon: CircleCheck },
  warning: { chip: "tone-amber", Icon: TriangleAlert },
  neutral: { chip: "tone-teal", Icon: Clock },
} as const;

export function InsightLnd() {
  return (
    <div
      className="card anim-rise relative flex h-full flex-col overflow-hidden px-4 pb-2.5 pt-3"
      style={{ "--d": "700ms" } as React.CSSProperties}
    >
      <div className="flex items-center gap-1.5">
        <h3 className="card-title-navy">Insight &amp; Rekomendasi AI</h3>
        <span className="rounded bg-[#dbe9fb] px-1.5 py-[1px] text-[9px] font-bold leading-none text-[#2f6fe4]">
          Beta
        </span>
      </div>
      <p className="mt-[3px] text-[9px] text-ink-500">
        Diagnostik lintas modul: learning, workforce planning, risiko &amp; suksesi (Q2 2026).
      </p>

      <div className="relative z-10 mt-2 flex min-h-0 flex-1 flex-col justify-around pr-[86px]">
        {lndInsight.map((it) => {
          const t = TONE[it.tone];
          return (
            <div key={it.isi} className="flex gap-2">
              <span
                className={`${t.chip} mt-[1px] flex h-[19px] w-[19px] shrink-0 items-center justify-center rounded-md`}
              >
                <t.Icon size={11} strokeWidth={2} />
              </span>
              <p className="min-w-0 text-[9px] leading-[1.4] text-ink-700">{it.isi}</p>
            </div>
          );
        })}
      </div>

      <button className="relative z-10 mt-2 flex w-[196px] items-center justify-between rounded-lg bg-gradient-to-r from-[#3fae63] to-[#1a9c5b] px-3 py-[7px] text-[10px] font-semibold text-white shadow-pill transition-opacity hover:opacity-90">
        Lihat Rekomendasi Lengkap
        <ArrowRight size={12} />
      </button>

      {/* maskot */}
      <div className="pointer-events-none absolute -bottom-1 right-1 h-[124px] w-[112px] animate-floaty">
        <CoachRobot waving className="h-full w-full" />
      </div>
    </div>
  );
}
