import { Delta } from "@/components/ui/Delta";
import { driversKpi } from "@/lib/prr-drivers";

const TONE: Record<string, string> = {
  neutral: "text-ink-500",
  red: "text-[#ef4444]",
  amber: "text-[#d98b06]",
  green: "text-ptpn-green",
};

/** Enam KPI ringkas registri driver: jumlah, arah, konsentrasi, dan kontrol. */
export function DriversKpiStrip() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-3">
      {driversKpi.map((k, i) => (
        <div
          key={k.label}
          className="card anim-rise px-3.5 pb-3 pt-3"
          style={{ "--d": `${40 * i}ms` } as React.CSSProperties}
        >
          <div className="text-[9.5px] font-semibold text-ink-500">
            <span className={k.label === "Total Driver" ? "" : TONE[k.tone]}>{k.label}</span>
          </div>
          <div className="mt-2 flex items-end justify-between gap-2">
            <span className="whitespace-nowrap text-[24px] font-extrabold leading-none tracking-[-0.02em] text-ink-900">
              {k.value}
              {k.suffix && (
                <span className="ml-1 text-[11px] font-bold text-ink-400">{k.suffix}</span>
              )}
            </span>
            {k.share && <span className={`text-[10px] font-bold ${TONE[k.tone]}`}>{k.share}</span>}
          </div>
          <div className="mt-2.5 flex items-center gap-1.5">
            {k.trend === "flat" ? (
              <span className="text-[10px] font-semibold text-ink-500">{k.delta}</span>
            ) : (
              <Delta
                value={k.delta.replace("-", "")}
                trend={k.trend === "up" ? "up" : "down"}
                tone={k.tone === "red" ? "bad" : k.tone === "green" ? "good" : undefined}
                size={10}
              />
            )}
            <span className="truncate text-[8.5px] text-ink-400">{k.compare}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
