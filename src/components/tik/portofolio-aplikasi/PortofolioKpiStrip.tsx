"use client";

import { Boxes, Gauge, LifeBuoy, Radio, TrendingDown, Wrench } from "lucide-react";
import { portofolioKpi } from "@/lib/tik-data-detail";
import { TikKpiCards, type TikKpiCardItem } from "../TikKpiCards";
import { useSubholding } from "@/components/SubholdingProvider";
import { ScopeNote } from "@/components/ui/ScopeNote";

const ICONS = [Boxes, TrendingDown, Gauge, Radio, Wrench, LifeBuoy];

const items: TikKpiCardItem[] = portofolioKpi.map((k, i) => ({ ...k, icon: ICONS[i] }));

export function PortofolioKpiStrip() {
  const { isFiltered } = useSubholding();

  return (
    <>
      {isFiltered && (
        <div className="mb-1.5 flex justify-end">
          <ScopeNote />
        </div>
      )}
      <TikKpiCards items={items} cols="grid-cols-2 md:grid-cols-3 xl:grid-cols-6" />
    </>
  );
}
