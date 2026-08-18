import {
  AlertTriangle,
  Award,
  BarChart3,
  Clock3,
  Coins,
  Flag,
  Gauge,
  Gem,
  Grid3x3,
  Landmark,
  LayoutGrid,
  Leaf,
  Milestone,
  MonitorSmartphone,
  Percent,
  Rocket,
  Target,
  Wallet,
} from "lucide-react";
import type { StgKpi } from "@/lib/stg-core";
import { Delta } from "../ui/Delta";

const ICONS: Record<StgKpi["icon"], typeof Target> = {
  initiative: LayoutGrid,
  score: Award,
  milestone: Milestone,
  value: Gem,
  decision: Landmark,
  transform: Rocket,
  target: Target,
  invest: Wallet,
  rank: BarChart3,
  digital: MonitorSmartphone,
  late: AlertTriangle,
  critical: Flag,
  clock: Clock3,
  matrix: Grid3x3,
  red: Gauge,
  roic: Percent,
  yield: Leaf,
  cost: Coins,
};

const TONES: Record<StgKpi["tone"], string> = {
  blue: "bg-[#e8f1fd] text-[#2f6fe4]",
  green: "bg-ptpn-greenLight text-ptpn-green",
  teal: "bg-[#e6f6f5] text-[#0d9488]",
  amber: "bg-[#fdf3e0] text-[#d98b06]",
  red: "bg-[#fdecec] text-[#ef4444]",
  purple: "bg-[#f1ecfd] text-[#8b5cf6]",
};

/** Renderer KPI strip dimensi Strategi & Kinerja (mirror MktKpiCards/WaKpiStrip). */
export function StgKpiCards({
  items,
  cols,
  badge,
}: {
  items: StgKpi[];
  cols: string;
  /** Penanda kecil per kartu, mis. <ScopeNote /> untuk tile konsolidasi grup. */
  badge?: (item: StgKpi) => React.ReactNode;
}) {
  return (
    <div className={`grid gap-3 ${cols}`}>
      {items.map((k, i) => {
        const Icon = ICONS[k.icon];
        return (
          <div
            key={k.label}
            className="card anim-rise px-3 pb-3 pt-3"
            style={{ "--d": `${40 * i}ms` } as React.CSSProperties}
          >
            <div className="flex items-center gap-2">
              <span
                className={`flex h-[26px] w-[26px] shrink-0 items-center justify-center rounded-lg ${TONES[k.tone]}`}
              >
                <Icon size={14} strokeWidth={1.9} />
              </span>
              <span className="min-w-0 text-[9px] font-semibold leading-[1.25] text-ink-500">
                {k.label}
              </span>
              {badge?.(k)}
            </div>
            <div className="mt-2.5 flex items-baseline gap-[2px] whitespace-nowrap text-[19px] font-extrabold leading-none tracking-[-0.01em] text-ink-900">
              {k.value}
              {k.valueSuffix && (
                <span className="text-[10px] font-bold text-ink-500">{k.valueSuffix}</span>
              )}
            </div>
            <div
              className={`mt-[4px] truncate text-[8.5px] ${k.subDanger ? "text-[#ef4444]" : "text-ink-500"}`}
              title={k.sub}
            >
              {k.sub}
            </div>
            <div className="mt-2 flex items-center gap-1.5">
              {k.delta && k.trend ? (
                <>
                  <Delta value={k.delta} trend={k.trend} tone={k.deltaTone} size={10} />
                  <span className="truncate text-[8.5px] text-ink-400">{k.compare}</span>
                </>
              ) : (
                <span className="truncate text-[8.5px] font-semibold text-ink-400">
                  {k.compare}
                </span>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
