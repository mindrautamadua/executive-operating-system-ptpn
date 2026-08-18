"use client";

import Link from "next/link";
import { useState } from "react";
import { ChevronRight } from "lucide-react";
import { talentPoolFungsi } from "@/lib/succession-data";
import { DonutChart } from "../ui/DonutChart";

export function TalentPoolFungsi() {
  const [active, setActive] = useState<number | null>(null);
  const data = talentPoolFungsi.map((d) => ({
    name: d.name,
    value: d.jumlah,
    color: d.color,
  }));

  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-2.5 pt-3"
      style={{ "--d": "600ms" } as React.CSSProperties}
    >
      <h3 className="card-title-navy">Talent Pool (High Potential)</h3>
      <p className="mt-[3px] text-[9px] text-ink-500">Berdasarkan Fungsi</p>

      <div className="flex min-h-0 flex-1 items-center">
        {/* total di tengah diturunkan dari data */}
        <DonutChart
          data={data}
          size={136}
          thickness={24}
          centerCaption="Talent"
          onHover={setActive}
        />

        <div className="ml-1 flex flex-1 flex-col gap-[7px]">
          {talentPoolFungsi.map((d, i) => (
            <div
              key={d.name}
              className={`flex items-center gap-2 whitespace-nowrap transition-opacity duration-150 ${
                active !== null && active !== i ? "opacity-40" : ""
              }`}
            >
              <span
                className="h-[8px] w-[8px] shrink-0 rounded-[2px]"
                style={{ background: d.color }}
              />
              <span className="text-[9px] text-ink-700">{d.name}</span>
              <span className="ml-auto text-[9px] font-semibold tabular-nums text-ink-900">
                {d.pct}
              </span>
              <span className="w-[34px] text-right text-[9px] tabular-nums text-ink-500">
                ({d.jumlah})
              </span>
            </div>
          ))}
        </div>
      </div>

      <Link href="/succession-planning/talent-pool" className="link-more mt-1 flex cursor-pointer items-center gap-0.5">
        Lihat detail talent pool <ChevronRight size={12} />
      </Link>
    </div>
  );
}
