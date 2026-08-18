import type { RiskDriver } from "@/lib/hc-data";

/** Panel explainability: daftar driver skor beserta kontribusinya (%). */
export function WhyDrivers({ drivers, tone = "red" }: { drivers: RiskDriver[]; tone?: "red" | "amber" }) {
  const barColor = tone === "red" ? "#ef4444" : "#f5a524";
  return (
    <div className="flex flex-col gap-[5px] rounded-lg bg-[#f8fafc] px-2.5 py-2">
      <div className="text-[9px] font-bold uppercase tracking-[0.05em] text-ink-500">
        Kenapa skor ini? — Top Drivers
      </div>
      {drivers.map((d) => (
        <div key={d.label} className="flex items-center gap-2">
          <span className="min-w-0 flex-1 truncate text-[8.5px] text-ink-700" title={d.label}>
            {d.label}
          </span>
          <div className="h-[4px] w-[52px] shrink-0 overflow-hidden rounded-full bg-[#e8edf2]">
            <div
              className="h-full rounded-full"
              style={{ width: `${d.weight}%`, backgroundColor: barColor }}
            />
          </div>
          <span className="w-[24px] shrink-0 text-right text-[8.5px] font-bold text-ink-900">
            {d.weight}%
          </span>
        </div>
      ))}
    </div>
  );
}
