import { ScanSearch } from "lucide-react";
import { engagementMatrix, matrixThreshold } from "@/lib/engagement-data";
import { PALETTE } from "@/lib/chart-palette";

const X_MIN = 70;
const X_MAX = 92;
const Y_MIN = 62;
const Y_MAX = 96;

const KUADRAN_COLOR: Record<string, string> = {
  "reliable-strength": PALETTE.green,
  "quiet-strength": PALETTE.blue,
  "reliable-risk": PALETTE.amber,
  "hidden-risk": PALETTE.red,
};

/**
 * Engagement Risk Matrix: engagement score × response rate per unit.
 * Low engagement + low response = hidden risk (skor rendah DAN sinyalnya
 * kurang reliable) — prioritas investigasi, bukan sekadar ranking.
 */
export function EngagementRiskMatrix() {
  const xPct = (v: number) => ((v - X_MIN) / (X_MAX - X_MIN)) * 100;
  const yPct = (v: number) => (1 - (v - Y_MIN) / (Y_MAX - Y_MIN)) * 100;

  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-2.5 pt-3"
      style={{ "--d": "320ms" } as React.CSSProperties}
    >
      <div className="flex items-start justify-between gap-2">
        <h3 className="card-title-navy flex items-center gap-1.5">
          <ScanSearch size={13} className="text-[#1b3a6b]" />
          Engagement Risk Matrix
        </h3>
        <span className="shrink-0 text-[8.5px] text-ink-400">Engagement × response rate</span>
      </div>

      <div className="mt-2 flex min-h-0 flex-1 gap-2">
        {/* plot kuadran */}
        <div className="relative min-w-0 flex-1 rounded-xl border border-[#eef2f6] bg-[#fafcfe]">
          {/* garis threshold */}
          <span
            className="absolute bottom-0 top-0 w-[1px] bg-[#dbe3ec]"
            style={{ left: `${xPct(matrixThreshold.engagement)}%` }}
          />
          <span
            className="absolute left-0 right-0 h-[1px] bg-[#dbe3ec]"
            style={{ top: `${yPct(matrixThreshold.response)}%` }}
          />
          {/* label kuadran */}
          <span className="absolute left-1.5 top-1 text-[9px] font-bold text-[#dc2626]/70">
            HIDDEN RISK ZONE
          </span>
          <span className="absolute right-1.5 top-1 text-[9px] font-bold text-[#0f7a44]/70">
            RELIABLE STRENGTH
          </span>
          <span className="absolute bottom-1 left-1.5 text-[9px] font-semibold text-ink-500">
            ← Low engagement
          </span>
          <span className="absolute bottom-1 right-1.5 text-[9px] font-semibold text-ink-500">
            High engagement →
          </span>
          {/* titik unit */}
          {engagementMatrix.map((p, i) => (
            <span
              key={p.unit}
              className="anim-rise absolute z-10 flex -translate-x-1/2 -translate-y-1/2 items-center"
              style={
                {
                  left: `${xPct(p.x)}%`,
                  top: `${yPct(p.y)}%`,
                  "--d": `${60 * i}ms`,
                } as React.CSSProperties
              }
            >
              <span
                className="h-[8px] w-[8px] shrink-0 rounded-full border-[1.5px] border-white shadow-card"
                style={{ background: KUADRAN_COLOR[p.kuadran] }}
              />
              <span className="ml-[3px] whitespace-nowrap text-[9px] font-semibold text-ink-700">
                {p.unit}
              </span>
            </span>
          ))}
        </div>

        {/* interpretasi */}
        <div className="flex w-[148px] shrink-0 flex-col justify-between rounded-xl border border-[#eef2f6] px-2.5 py-2">
          <div>
            <span className="rounded px-1.5 py-[2px] text-[7.5px] font-bold leading-none tone-red">
              Hidden Risk · 4 unit
            </span>
            <p className="mt-1 text-[7.5px] leading-snug text-ink-600">
              Low engagement <span className="font-bold">+</span> low response: skor rendah dan
              sinyal survey kurang reliable — risiko bisa lebih besar dari yang terukur.
            </p>
          </div>
          <div>
            <span className="rounded px-1.5 py-[2px] text-[7.5px] font-bold leading-none tone-green">
              Reliable Strength · 5 unit
            </span>
            <p className="mt-1 text-[7.5px] leading-snug text-ink-600">
              High engagement + high response: sinyal kuat, praktiknya layak direplikasi.
            </p>
          </div>
          <p className="border-t border-[#eef2f6] pt-1 text-[7.5px] leading-snug text-ink-500">
            Prioritas: <span className="font-bold text-ink-700">Regional 3</span> — terendah di
            kedua sumbu.
          </p>
        </div>
      </div>
    </div>
  );
}
