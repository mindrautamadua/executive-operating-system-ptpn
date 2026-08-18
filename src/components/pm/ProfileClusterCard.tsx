"use client";

import { useState } from "react";
import { Users } from "lucide-react";
import { DonutChart } from "../ui/DonutChart";
import { SectionHead } from "../hc/SectionHead";
import { pmCluster, pmClusterCatatan, pmClusterTotal } from "@/lib/pm-data";

export function ProfileClusterCard() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-3 pt-3"
      style={{ "--d": "60ms" } as React.CSSProperties}
    >
      <SectionHead title="People Math Profile Cluster" />
      <p className="mt-[3px] text-[9px] text-ink-500">Distribusi Klaster Pola Individu</p>

      <div className="flex min-h-0 flex-1 items-center gap-3">
        <DonutChart
          data={pmCluster.map((c) => ({ name: c.name, value: c.value, color: c.color }))}
          size={150}
          thickness={25}
          centerValue={pmClusterTotal.value}
          centerCaption={pmClusterTotal.caption}
          onHover={setActive}
        />
        <div className="min-w-0 flex-1">
          {pmCluster.map((c, i) => (
            <div
              key={c.name}
              className="flex items-center gap-1.5 py-[3px] transition-opacity"
              style={{ opacity: active === null || active === i ? 1 : 0.4 }}
            >
              <span className="h-[8px] w-[8px] shrink-0 rounded-[2px]" style={{ backgroundColor: c.color }} />
              <span className="min-w-0 flex-1 truncate text-[9.5px] font-medium text-ink-700">
                {c.name}
              </span>
              <span className="shrink-0 text-[9.5px] font-bold text-ink-900">{c.pct}</span>
              <span className="w-[44px] shrink-0 text-right text-[9px] text-ink-500">
                ({c.jumlah})
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-2 rounded-lg bg-ptpn-greenLight px-3 py-2">
        <Users size={12} className="shrink-0 text-ptpn-green" />
        <span className="text-[8.5px] font-medium leading-snug text-ink-700">{pmClusterCatatan}</span>
      </div>
    </div>
  );
}
