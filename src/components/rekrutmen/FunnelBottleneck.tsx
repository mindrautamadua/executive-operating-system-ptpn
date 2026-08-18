import { AlertTriangle } from "lucide-react";
import { funnelSla, slaSummary, type SlaTone } from "@/lib/rekrutmen-data";
import { PALETTE } from "@/lib/chart-palette";

const TONE_COLOR: Record<SlaTone, string> = {
  green: PALETTE.green,
  amber: PALETTE.amber,
  red: PALETTE.red,
};

const TONE_CHIP: Record<SlaTone, string> = {
  green: "tone-green",
  amber: "tone-amber",
  red: "tone-red",
};

const fmtHari = (n: number) => n.toFixed(1).replace(".", ",");

const maxActual = Math.max(...funnelSla.map((s) => Math.max(s.actual, s.target)));

/**
 * Bottleneck intelligence: median hari per tahap vs SLA — menjawab
 * "di mana waktu rekrutmen benar-benar hilang", bukan sekadar volume funnel.
 */
export function FunnelBottleneck() {
  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-3 pt-3"
      style={{ "--d": "60ms" } as React.CSSProperties}
    >
      <div className="flex items-start justify-between gap-2">
        <h3 className="card-title-navy">Bottleneck & SLA per Tahap</h3>
        <span className="shrink-0 text-[9px] text-ink-500">
          Time to Hire: <span className="font-bold text-ink-900">{slaSummary.timeToHire}</span>
        </span>
      </div>

      <div className="mt-2 flex min-h-0 flex-1 flex-col justify-between">
        {funnelSla.map((s, i) => (
          <div
            key={s.stage}
            title={`${s.stage}: median ${fmtHari(s.actual)} hari · SLA ${fmtHari(
              s.target,
            )} hari · ${s.share} siklus`}
          >
            <div className="flex items-center justify-between gap-2">
              <span className="truncate text-[9.5px] text-ink-700">{s.stage}</span>
              <span className="flex shrink-0 items-center gap-1.5">
                <span className="text-[9.5px] font-bold tabular-nums text-ink-900">
                  {fmtHari(s.actual)} hr
                </span>
                <span className="text-[8.5px] tabular-nums text-ink-500">
                  / SLA {fmtHari(s.target)}
                </span>
                <span
                  className={`${TONE_CHIP[s.tone]} rounded px-1.5 py-[1px] text-[9px] font-bold tabular-nums`}
                >
                  {s.share}
                </span>
              </span>
            </div>
            <div className="relative mt-[3px] h-[7px] overflow-hidden rounded-full bg-[#eef2f6]">
              <span
                className="anim-grow-x block h-full rounded-full"
                style={
                  {
                    width: `${(s.actual / maxActual) * 100}%`,
                    background: TONE_COLOR[s.tone],
                    "--d": `${i * 60}ms`,
                  } as React.CSSProperties
                }
              />
              {/* penanda posisi SLA */}
              <span
                className="absolute top-0 h-full w-[2px] rounded bg-ink-900/45"
                style={{ left: `${(s.target / maxActual) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-2 flex items-center justify-between border-t border-[#f2f5f8] pt-1.5">
        <span className="text-[9px] text-ink-700">SLA breach</span>
        <span className="text-[11px] font-extrabold tabular-nums text-[#ef4444]">
          {slaSummary.breach} requisition
        </span>
      </div>

      <p className="mt-1 flex items-start gap-1.5 text-[8.5px] leading-[1.45] text-ink-500">
        <AlertTriangle size={11} className="mt-[1px] shrink-0 text-[#f5a524]" />
        {slaSummary.bottleneck}
      </p>
    </div>
  );
}
