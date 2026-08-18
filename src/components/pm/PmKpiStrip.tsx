import {
  ClipboardCheck,
  Clock3,
  GitCompareArrows,
  HeartPulse,
  LayoutPanelTop,
  Lightbulb,
  Target,
  Users,
} from "lucide-react";
import { pmInsightUtama, pmKpi } from "@/lib/pm-data";
import { Delta } from "../ui/Delta";

const ICONS = {
  profiled: Users,
  assessed: ClipboardCheck,
  pmScore: HeartPulse,
  bemScore: LayoutPanelTop,
  gap: Clock3,
  opportunity: Target,
  alignment: GitCompareArrows,
};

const TONES: Record<string, string> = {
  purple: "bg-[#f1ecfd] text-[#8b5cf6]",
  green: "bg-ptpn-greenLight text-ptpn-green",
  pink: "bg-[#fdeef2] text-[#ec4899]",
  blue: "bg-[#e8f1fd] text-[#2f6fe4]",
  amber: "bg-[#fdf3e0] text-[#d98b06]",
  teal: "bg-[#e6f6f5] text-[#0d9488]",
  sky: "bg-[#e6f4fb] text-[#0ea5e9]",
};

export function PmKpiStrip() {
  return (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-[repeat(7,minmax(0,1fr))_minmax(0,1.35fr)]">
      {pmKpi.map((k, i) => {
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
            </div>
            <div className="mt-2.5 whitespace-nowrap text-[19px] font-extrabold leading-none tracking-[-0.01em] text-ink-900">
              {k.value}
              {k.unit && (
                <span className="ml-[3px] text-[10px] font-semibold text-ink-500">{k.unit}</span>
              )}
            </div>
            <div className="mt-[4px] truncate text-[8.5px] text-ink-500" title={k.sub}>
              {k.sub}
            </div>
            <div className="mt-2 flex items-center gap-1.5">
              <Delta value={k.delta} trend={k.trend} tone={k.deltaTone} size={10} />
              <span className="truncate text-[8.5px] text-ink-400">{k.compare}</span>
            </div>
          </div>
        );
      })}

      <div
        className="card anim-rise border-[#d9e6f8] bg-[#f2f7fe] px-3.5 pb-3 pt-3"
        style={{ "--d": "280ms" } as React.CSSProperties}
      >
        <div className="flex items-center gap-1.5 text-[10px] font-bold text-[#2f6fe4]">
          {pmInsightUtama.title}
          <Lightbulb size={12} strokeWidth={2} />
        </div>
        <p className="mt-2 text-[8.5px] leading-relaxed text-ink-700">{pmInsightUtama.text}</p>
      </div>
    </div>
  );
}
