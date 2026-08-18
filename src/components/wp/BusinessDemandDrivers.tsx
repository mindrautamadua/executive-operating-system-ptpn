import { Factory, TrendingDown, TrendingUp } from "lucide-react";
import { demandDrivers, demandDriverNote } from "@/lib/wp-data";
import { SectionHead } from "../hc/SectionHead";
import { NotePill } from "./NotePill";

const ribuan = (v: number) => Math.abs(v).toLocaleString("id-ID");

/** Skala bar relatif terhadap driver terbesar. */
const MAX = Math.max(...demandDrivers.map((d) => Math.abs(d.dampak)));

/**
 * Business Demand Drivers: menghubungkan asumsi bisnis (produksi, mill,
 * otomasi, produktivitas) dengan kebutuhan tambahan workforce net 3.714.
 */
export function BusinessDemandDrivers() {
  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-3 pt-3"
      style={{ "--d": "120ms" } as React.CSSProperties}
    >
      <div className="flex items-start justify-between gap-2">
        <SectionHead title="Business Demand Drivers" />
        <span className="shrink-0 rounded-md bg-[#f1ecfd] px-2 py-[3px] text-[8.5px] font-bold text-[#8b5cf6]">
          Net Demand +3.714
        </span>
      </div>
      <p className="mt-[3px] text-[9px] text-ink-500">
        Mengapa demand 2028 menjadi 73.856 — driver bisnis, bukan asumsi HR
      </p>

      <div className="mt-2 flex min-h-0 flex-1 flex-col justify-center gap-[7px]">
        {demandDrivers.map((d) => {
          const up = d.arah === "up";
          const Icon = up ? TrendingUp : TrendingDown;
          return (
            <div key={d.name} className="flex items-center gap-2.5">
              <span
                className={`flex h-[20px] w-[20px] shrink-0 items-center justify-center rounded-md ${
                  up ? "bg-ptpn-greenLight text-ptpn-green" : "bg-[#e6f6f5] text-[#0d9488]"
                }`}
              >
                {d.name.includes("Mill") ? <Factory size={11} /> : <Icon size={11} />}
              </span>
              <div className="min-w-0 flex-1 leading-tight">
                <div className="flex items-baseline justify-between gap-2">
                  <span className="truncate text-[9px] font-bold text-ink-900">{d.name}</span>
                  <span
                    className={`shrink-0 text-[9.5px] font-extrabold ${
                      up ? "text-ink-900" : "text-[#0d9488]"
                    }`}
                  >
                    {up ? "+" : "-"}
                    {ribuan(d.dampak)}
                  </span>
                </div>
                <div className="mt-[2px] flex items-center gap-2">
                  <span className="truncate text-[9px] text-ink-500">{d.asumsi}</span>
                  <span className="ml-auto h-[4px] w-[88px] shrink-0 overflow-hidden rounded-full bg-[#eef2f6]">
                    <span
                      className={`block h-full rounded-full ${up ? "bg-ptpn-green" : "bg-[#0d9488]"}`}
                      style={{ width: `${(Math.abs(d.dampak) / MAX) * 100}%` }}
                    />
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-2 shrink-0">
        <NotePill icon={TrendingUp} text={demandDriverNote} />
      </div>
    </div>
  );
}
