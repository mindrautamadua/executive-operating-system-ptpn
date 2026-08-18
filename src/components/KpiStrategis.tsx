import { ArrowRight } from "lucide-react";
import { kpiStrategis } from "@/lib/data";
import { Delta } from "./ui/Delta";
import { DetailLink } from "./DetailLink";

export function KpiStrategis() {
  return (
    <div className="card flex h-full flex-col px-4 pb-2 pt-2">
      <div className="flex items-center justify-between gap-1">
        <h3 className="card-title">KPI STRATEGIS</h3>
        <DetailLink href="/strategi-kinerja" />
      </div>

      <div className="mt-1.5 grid min-h-0 flex-1 grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-2.5">
        {kpiStrategis.map((k) => (
          <div
            key={k.label}
            className="min-h-0 rounded-lg border border-[#eef2f6] bg-[#fbfdfe] px-2.5 py-1.5"
          >
            <div className="min-h-[20px] text-[9px] leading-[1.25] text-ink-500">
              {k.label}
            </div>
            <div className="mt-0.5 flex items-baseline gap-1 whitespace-nowrap">
              <span className="text-[15px] font-extrabold leading-none text-ink-900">
                {k.value}
              </span>
              {k.unit && (
                <span className="text-[9px] font-medium text-ink-500">{k.unit}</span>
              )}
            </div>
            <Delta
              value={k.delta}
              trend={k.trend}
              tone={"tone" in k ? k.tone : undefined}
              size={9.5}
              className="mt-1"
            />
          </div>
        ))}
      </div>

      <button className="mt-1 flex items-center gap-1 text-[10px] font-semibold text-ptpn-green hover:underline">
        Lihat semua KPI <ArrowRight size={11} />
      </button>
    </div>
  );
}
