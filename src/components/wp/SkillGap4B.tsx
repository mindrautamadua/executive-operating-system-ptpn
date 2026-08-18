import { Clock } from "lucide-react";
import { CRITICALITY_STYLE, gap4B, gap4BNote } from "@/lib/wp-data";
import { PALETTE } from "@/lib/chart-palette";
import { SectionHead } from "../hc/SectionHead";

const B4 = [
  { key: "build", label: "Build", color: PALETTE.green },
  { key: "buy", label: "Buy", color: PALETTE.blue },
  { key: "borrow", label: "Borrow", color: PALETTE.amber },
  { key: "bot", label: "Bot", color: PALETTE.purple },
] as const;

/**
 * Strategi 4B (Build/Buy/Borrow/Bot) per skill gap kritis,
 * dengan criticality dan target time-to-close.
 */
export function SkillGap4B() {
  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-3 pt-3"
      style={{ "--d": "300ms" } as React.CSSProperties}
    >
      <div className="flex items-start justify-between gap-2">
        <div>
          <SectionHead title="Strategi Penutupan Gap — 4B" />
          <p className="mt-[3px] text-[9px] text-ink-500">
            Build / Buy / Borrow / Bot per skill kritis + target time-to-close
          </p>
        </div>
        <div className="flex shrink-0 items-center gap-2.5">
          {B4.map((b) => (
            <span key={b.key} className="flex items-center gap-1 text-[9px] font-semibold text-ink-500">
              <span className="h-[7px] w-[7px] rounded-[2px]" style={{ background: b.color }} />
              {b.label}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-2 flex min-h-0 flex-1 flex-col justify-center gap-[8px]">
        {gap4B.map((r) => (
          <div key={r.skill} className="flex items-center gap-2.5">
            <div className="w-[148px] shrink-0 leading-tight">
              <div className="truncate text-[9px] font-bold text-ink-900">{r.skill}</div>
              <span
                className={`mt-[2px] inline-flex rounded px-1.5 py-[1px] text-[7.5px] font-bold leading-[1.4] ${CRITICALITY_STYLE[r.criticality]}`}
              >
                {r.criticality}
              </span>
            </div>

            <span className="w-[34px] shrink-0 text-right text-[9.5px] font-extrabold text-[#ef4444]">
              {r.gap}
            </span>

            <div className="flex h-[10px] min-w-0 flex-1 overflow-hidden rounded-full">
              {B4.map((b) => (
                <span
                  key={b.key}
                  style={{ width: `${(r[b.key] / r.gap) * 100}%`, background: b.color }}
                  title={`${b.label}: ${r[b.key]}`}
                />
              ))}
            </div>

            <span className="flex w-[52px] shrink-0 items-center justify-end gap-1 text-[8.5px] font-bold text-ink-700">
              <Clock size={10} className="text-ink-400" />
              {r.closure}
            </span>
          </div>
        ))}
      </div>

      <p className="mt-2 shrink-0 text-[9px] leading-[1.5] text-ink-500">{gap4BNote}</p>
    </div>
  );
}
