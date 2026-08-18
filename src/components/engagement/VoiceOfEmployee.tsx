import { MessageSquareText, TrendingDown, TrendingUp } from "lucide-react";
import { voiceTopics } from "@/lib/engagement-data";
import { PALETTE } from "@/lib/chart-palette";

/**
 * Voice of Employee Intelligence: topic analysis komentar survey (NLP).
 * Naik level dari sentimen — apa yang dibicarakan, trennya ke mana,
 * dan di mana akar keluhannya.
 */
export function VoiceOfEmployee() {
  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-2.5 pt-3"
      style={{ "--d": "400ms" } as React.CSSProperties}
    >
      <div className="flex items-start justify-between gap-2">
        <h3 className="card-title-navy flex items-center gap-1.5">
          <MessageSquareText size={13} className="text-[#1b3a6b]" />
          Voice of Employee Intelligence
        </h3>
        <span className="shrink-0 text-[8.5px] text-ink-400">Topic analysis · vs Q1 2026</span>
      </div>
      <p className="mt-[3px] text-[9px] text-ink-500">
        Distribusi topik komentar &amp; tren mention — delta naik = topik makin sering dikeluhkan
      </p>

      <div className="mt-2 flex min-h-0 flex-1 flex-col justify-between">
        {voiceTopics.map((t, i) => {
          const TrendIcon = t.trend === "up" ? TrendingUp : TrendingDown;
          const memburuk = t.trend === "up" && t.delta !== "0%";
          return (
            <div key={t.topik} className="flex items-center gap-2">
              <span className="w-[118px] shrink-0 truncate text-[9px] font-semibold text-ink-900">
                {t.topik}
              </span>
              <span className="relative h-[7px] min-w-0 flex-1 overflow-hidden rounded-full bg-[#eef2f6]">
                <span
                  className="anim-grow-x block h-full rounded-full"
                  style={
                    {
                      width: `${(t.share / 28) * 100}%`,
                      background: memburuk ? PALETTE.red : PALETTE.blue,
                      "--d": `${60 * i}ms`,
                    } as React.CSSProperties
                  }
                />
              </span>
              <span className="w-[28px] shrink-0 text-right text-[9px] font-extrabold tabular-nums text-ink-900">
                {t.share}%
              </span>
              <span
                className={`flex w-[46px] shrink-0 items-center justify-end gap-[2px] text-[9px] font-bold tabular-nums ${
                  memburuk ? "text-[#dc2626]" : "text-[#0f7a44]"
                }`}
              >
                <TrendIcon size={9} strokeWidth={2.5} />
                {t.delta}
              </span>
            </div>
          );
        })}
      </div>

      <p className="mt-1.5 border-t border-[#eef2f6] pt-1.5 text-[8.5px] leading-snug text-ink-500">
        Mention <span className="font-bold text-ink-700">workload naik +24%</span> — konsisten
        dengan Work-life Balance sebagai driver terlemah; kaitkan dengan review kapasitas
        workforce.
      </p>
    </div>
  );
}
