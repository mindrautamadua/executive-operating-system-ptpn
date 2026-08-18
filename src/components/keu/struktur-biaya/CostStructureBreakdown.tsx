import { costComponents } from "@/lib/ksb-data";
import { fmtId } from "@/lib/keu-core";
import { SectionHead } from "../../hc/SectionHead";
import { ScopeNote } from "@/components/ui/ScopeNote";

/** Komposisi HPP YTD Rp 15,8 T: bar tersegmentasi + rincian per komponen. */
export function CostStructureBreakdown() {
  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-3 pt-3"
      style={{ "--d": "60ms" } as React.CSSProperties}
    >
      <SectionHead title="Cost Structure Breakdown" badge={<ScopeNote />} />
      <p className="mt-[3px] text-[9px] text-ink-500">Komposisi HPP YTD Rp 15,8 T per Komponen Biaya</p>

      <div className="mt-3 flex h-[18px] w-full overflow-hidden rounded-lg">
        {costComponents.map((c) => (
          <div
            key={c.name}
            className="h-full"
            style={{ width: `${c.pct}%`, backgroundColor: c.color }}
            title={`${c.name} · ${c.pct}%`}
          />
        ))}
      </div>

      <div className="mt-2.5 flex min-h-0 flex-1 flex-col justify-between">
        {costComponents.map((c) => (
          <div key={c.name} className="flex items-center gap-2 py-[3px]">
            <span
              className="h-[8px] w-[8px] shrink-0 rounded-[2px]"
              style={{ backgroundColor: c.color }}
            />
            <span className="min-w-0 flex-1 truncate text-[9.5px] font-medium text-ink-700">
              {c.name}
            </span>
            <div className="flex w-[110px] shrink-0 items-center gap-1.5">
              <span className="h-[5px] w-full overflow-hidden rounded-full bg-[#eef2f6]">
                <span
                  className="block h-full rounded-full"
                  style={{ width: `${(c.pct / 30) * 100}%`, backgroundColor: c.color }}
                />
              </span>
            </div>
            <span className="w-[48px] shrink-0 text-right text-[9.5px] font-bold tabular-nums text-ink-900">
              {fmtId(c.valueRpT, 2)} T
            </span>
            <span className="w-[30px] shrink-0 text-right text-[9px] tabular-nums text-ink-500">
              {c.pct}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
