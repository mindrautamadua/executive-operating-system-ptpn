import {
  ClipboardCheck,
  Gauge,
  ShieldAlert,
  Timer,
  UserCheck,
  UsersRound,
} from "lucide-react";
import { suksesiKpi } from "@/lib/succession-data";
import { PALETTE } from "@/lib/chart-palette";
import { KpiCard } from "../ui/KpiCard";

const ICONS = {
  kritis: ClipboardCheck,
  siap: UserCheck,
  pool: UsersRound,
  bench: Gauge,
  setahun: Timer,
  risiko: ShieldAlert,
};

/**
 * Gauge radial mini untuk Bench Strength: nilai 1,6 pada skala 0-2,
 * dengan penanda ambang 1,0. Arc memakai anim-draw (sweep saat mount).
 */
function BenchGauge() {
  // pusat (15,15), r 12; nilai 1,6/2,0 = busur 288°; ambang 1,0 = 144° dari awal
  return (
    <div className="flex items-center gap-2">
      <svg viewBox="0 0 30 30" className="h-[30px] w-[30px] shrink-0">
        <circle cx="15" cy="15" r="12" fill="none" stroke="#eef2f6" strokeWidth="3" />
        <path
          d="M 15 3 A 12 12 0 1 1 3.59 11.29"
          fill="none"
          stroke={PALETTE.amber}
          strokeWidth="3"
          strokeLinecap="round"
          pathLength={1}
          className="anim-draw"
        />
        {/* penanda ambang 1,0 */}
        <line
          x1="20.58"
          y1="22.69"
          x2="23.23"
          y2="26.33"
          stroke={PALETTE.navy}
          strokeWidth="1.6"
          strokeLinecap="round"
        />
        <text
          x="15"
          y="17.6"
          textAnchor="middle"
          fontSize="8"
          fontWeight="700"
          fill="currentColor"
          className="text-ink-900"
        >
          1,6
        </text>
      </svg>
      <span className="text-[9px] leading-[1.3] text-ink-500">
        Target
        <br />
        <span className="font-semibold text-ink-500">≥ 1,0</span>
      </span>
    </div>
  );
}

/** Pembungkus tipis: data KPI suksesi → anatomi KpiCard standar. */
export function SuksesiKpiStrip() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-3">
      {suksesiKpi.map((k, i) => {
        const Icon = ICONS[k.icon];
        return (
          <KpiCard
            key={k.label}
            icon={<Icon size={13} strokeWidth={1.9} />}
            tone={k.tone}
            label={k.label}
            value={k.value}
            delta={
              k.delta && k.trend
                ? { value: k.delta, trend: k.trend, tone: k.deltaTone }
                : undefined
            }
            compare={k.extra ? `${k.extra} • ${k.compare}` : k.compare}
            info={k.info}
            spark={k.icon === "bench" ? undefined : { data: k.series, color: k.line }}
            chart={k.icon === "bench" ? <BenchGauge /> : undefined}
            delay={60 * i}
          />
        );
      })}
    </div>
  );
}
