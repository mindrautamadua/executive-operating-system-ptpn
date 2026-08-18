import { RadioTower, RefreshCcw } from "lucide-react";
import { PLAN_STATUS_STYLE, planVsActual, reforecastNote } from "@/lib/wp-data";

/**
 * Workforce Plan Control Tower: Plan → Actual → Variance → Driver →
 * Corrective Action, plus catatan reforecast (continuous planning).
 */
export function WpControlTower() {
  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-3 pt-3"
      style={{ "--d": "540ms" } as React.CSSProperties}
    >
      <div className="flex items-start justify-between gap-2">
        <h3 className="card-title-navy flex items-center gap-1.5">
          <RadioTower size={13} className="text-[#1b3a6b]" />
          Workforce Plan Control Tower — YTD 2026
        </h3>
        <span className="shrink-0 text-[9px] font-semibold text-ink-500">
          Plan → Actual → Variance → Reforecast
        </span>
      </div>

      <div className="mt-2.5 grid min-h-0 flex-1 grid-cols-1 gap-2.5 sm:grid-cols-2 xl:grid-cols-4">
        {planVsActual.map((r) => {
          const st = PLAN_STATUS_STYLE[r.status];
          const negatif = r.varians.startsWith("-");
          return (
            <div
              key={r.metric}
              className="flex min-w-0 flex-col rounded-xl border border-[#eef2f6] px-3 py-2.5"
            >
              <div className="flex items-start justify-between gap-2">
                <span className="truncate text-[9.5px] font-bold text-ink-900">{r.metric}</span>
                <span
                  className={`inline-flex shrink-0 items-center rounded px-1.5 py-[2px] text-[7.5px] font-bold leading-none ${st.chip}`}
                >
                  {st.label}
                </span>
              </div>

              <div className="mt-2 grid grid-cols-2 md:grid-cols-3 gap-1 text-center">
                {[
                  { label: "Plan", value: r.plan, cls: "text-ink-500" },
                  { label: "Actual", value: r.actual, cls: "text-ink-900" },
                  {
                    label: "Var",
                    value: r.varians,
                    cls: negatif ? "text-[#ef4444]" : "text-ptpn-green",
                  },
                ].map((c) => (
                  <div key={c.label} className="rounded-md bg-[#f8fafc] px-1 py-[5px] leading-tight">
                    <div className="text-[7.5px] font-semibold uppercase text-ink-400">
                      {c.label}
                    </div>
                    <div className={`mt-[2px] text-[10px] font-extrabold ${c.cls}`}>{c.value}</div>
                  </div>
                ))}
              </div>

              <p className="mt-1.5 line-clamp-2 text-[9px] leading-[1.45] text-ink-500">
                {r.driver}
              </p>
              <p className="mt-auto pt-1 text-[9px] leading-[1.45] text-ink-700">
                <span className="font-bold text-ink-900">Aksi: </span>
                {r.aksi}
              </p>
            </div>
          );
        })}
      </div>

      <div className="mt-2 flex shrink-0 items-center gap-2 rounded-lg bg-[#eef4fd] px-3 py-[7px] text-[#2456a6]">
        <RefreshCcw size={12} className="shrink-0" />
        <p className="text-[8.5px] font-semibold leading-snug">{reforecastNote}</p>
      </div>
    </div>
  );
}
