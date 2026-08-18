"use client";

import { useEffect, useState } from "react";
import { ArrowRight, Frown, Meh, Smile } from "lucide-react";
import { sentimenKomentar } from "@/lib/engagement-data";
import { Delta } from "../ui/Delta";

const ICONS = { positif: Smile, netral: Meh, negatif: Frown };

export function KomentarSentimen() {
  // rotasi kutipan — interval hanya berjalan di client (hydration-safe)
  const [quoteIdx, setQuoteIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setQuoteIdx((i) => i + 1), 5000);
    return () => clearInterval(t);
  }, []);

  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-2.5 pt-3"
      style={{ "--d": "520ms" } as React.CSSProperties}
    >
      <h3 className="card-title-navy">Komentar Karyawan (Sentimen Analysis)</h3>

      {/* bar proporsi sentimen 68 / 22 / 10 */}
      <div className="mt-2 flex h-[8px] w-full overflow-hidden rounded-full">
        {sentimenKomentar.map((s, i) => (
          <span
            key={s.label}
            title={`${s.label} ${s.value}`}
            className="anim-grow-x h-full"
            style={
              {
                width: `${s.share}%`,
                background: s.bar,
                "--d": `${110 * i}ms`,
              } as React.CSSProperties
            }
          />
        ))}
      </div>

      <div className="mt-2 grid min-h-0 flex-1 grid-cols-2 md:grid-cols-3 gap-2.5">
        {sentimenKomentar.map((s) => {
          const Icon = ICONS[s.icon];
          const kutipan = s.kutipan[quoteIdx % s.kutipan.length];
          return (
            <div
              key={s.label}
              className={`tone-${s.tone} flex flex-col rounded-xl px-3 pb-2.5 pt-2`}
            >
              <div className="text-center text-[9px] font-semibold">{s.label}</div>
              <div className="mt-1.5 flex items-center gap-2">
                <Icon size={20} strokeWidth={1.8} />
                <span className="text-[20px] font-extrabold leading-none text-ink-900">
                  {s.value}
                </span>
              </div>
              <div className="mt-1.5 flex items-center gap-1 whitespace-nowrap">
                {/* sentimen negatif yang turun justru bagus */}
                <Delta
                  value={s.delta}
                  trend={s.trend}
                  tone={s.icon === "negatif" && s.trend === "down" ? "good" : undefined}
                  size={9}
                />
                <span className="text-[9px] text-ink-500">{s.compare}</span>
              </div>
              <p
                key={kutipan}
                className="anim-fade mt-2 text-[9px] italic leading-[1.4] text-ink-500"
              >
                “{kutipan}”
              </p>
            </div>
          );
        })}
      </div>

      <button className="link-more mt-2 flex items-center gap-1 self-start">
        Lihat analisis sentiment lengkap <ArrowRight size={11} />
      </button>
    </div>
  );
}
