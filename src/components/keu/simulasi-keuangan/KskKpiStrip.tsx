import { Route, Scale, TrendingUp } from "lucide-react";
import { kskBaseline } from "@/lib/ksk-data";

const ICONS = [TrendingUp, Route, Scale];

const TONES = [
  "bg-ptpn-greenLight text-ptpn-green",
  "bg-[#e8f1fd] text-[#2f6fe4]",
  "bg-[#e6f6f5] text-[#0d9488]",
];

export function KskKpiStrip() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
      {kskBaseline.map((k, i) => {
        const Icon = ICONS[i % ICONS.length];
        return (
          <div
            key={k.label}
            className="card anim-rise px-3 pb-3 pt-3"
            style={{ "--d": `${40 * i}ms` } as React.CSSProperties}
          >
            <div className="flex items-center gap-2">
              <span
                className={`flex h-[26px] w-[26px] shrink-0 items-center justify-center rounded-lg ${TONES[i % TONES.length]}`}
              >
                <Icon size={14} strokeWidth={1.9} />
              </span>
              <span className="min-w-0 text-[9px] font-semibold leading-[1.25] text-ink-500">
                {k.label}
              </span>
            </div>
            <div className="mt-2.5 whitespace-nowrap text-[19px] font-extrabold leading-none tracking-[-0.01em] text-ink-900">
              {k.value}
            </div>
            <div className="mt-[4px] truncate text-[8.5px] text-ink-500" title={k.sub}>
              {k.sub}
            </div>
          </div>
        );
      })}
    </div>
  );
}
