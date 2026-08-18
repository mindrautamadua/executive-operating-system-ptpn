import { Info } from "lucide-react";
import { SectionHead } from "../hc/SectionHead";
import { clusterIntel, clusterIntelCatatan } from "@/lib/pm-data";

const FLIGHT_TONE: Record<string, string> = {
  red: "bg-[#fdecec] text-[#ef4444]",
  amber: "bg-[#fdf3e0] text-[#d98b06]",
  green: "bg-ptpn-greenLight text-ptpn-green",
};

const GRID =
  "grid grid-cols-[minmax(0,150px)_minmax(0,1fr)_82px_82px_72px_minmax(0,220px)] items-center";

/** Cluster Intelligence: role fit, linkage produktivitas/performance, flight risk, fokus pengembangan. */
export function ClusterIntelligenceCard() {
  return (
    <div
      className="card anim-rise px-4 pb-3 pt-3"
      style={{ "--d": "100ms" } as React.CSSProperties}
    >
      <SectionHead title="Cluster Intelligence — Role Fit & Productivity Linkage" />

      <div className="mt-2.5">
        <div
          className={`${GRID} border-b border-[#f0f3f6] pb-1.5 text-[8.5px] font-bold uppercase tracking-[0.04em] text-ink-400`}
        >
          <span>Cluster</span>
          <span>Best Fit</span>
          <span className="text-right" title="Index produktivitas relatif; 100 = rata-rata grup">
            Productivity
          </span>
          <span className="text-right">Performance</span>
          <span className="text-center">Flight Risk</span>
          <span>Fokus Pengembangan</span>
        </div>
        <div className="divide-y divide-[#f6f8fa]">
          {clusterIntel.map((c) => (
            <div key={c.name} className={`${GRID} py-[7px]`}>
              <span className="flex min-w-0 items-center gap-1.5">
                <span
                  className="h-[8px] w-[8px] shrink-0 rounded-[2px]"
                  style={{ backgroundColor: c.color }}
                />
                <span className="truncate text-[9.5px] font-bold text-ink-900">{c.name}</span>
                <span className="shrink-0 text-[8.5px] text-ink-400">{c.pct}</span>
              </span>
              <span className="flex min-w-0 flex-wrap gap-1 pr-2">
                {c.bestFit.map((f) => (
                  <span
                    key={f}
                    className="rounded bg-[#eef2f6] px-1.5 py-[2px] text-[9px] font-semibold text-ink-700"
                  >
                    {f}
                  </span>
                ))}
              </span>
              <span className="text-right text-[9.5px] font-extrabold text-ink-900">
                {c.produktivitas}
                <span className="ml-[2px] text-[9px] font-medium text-ink-500">idx</span>
              </span>
              <span className="text-right text-[9.5px] font-bold text-ink-900">
                {c.performance}
                <span className="ml-[2px] text-[9px] font-medium text-ink-500">/5</span>
              </span>
              <span className="flex justify-center">
                <span
                  className={`rounded-md px-1.5 py-[2px] text-[8.5px] font-bold ${FLIGHT_TONE[c.flightTone]}`}
                >
                  {c.flightRisk}
                </span>
              </span>
              <span className="truncate text-[9px] font-medium text-ink-700">{c.fokusDev}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-2 flex items-center gap-2 rounded-lg border border-[#eef2f6] bg-[#f8fafb] px-3 py-2">
        <Info size={12} className="shrink-0 text-ink-500" />
        <span className="text-[8.5px] font-medium text-ink-500">{clusterIntelCatatan}</span>
      </div>
    </div>
  );
}
