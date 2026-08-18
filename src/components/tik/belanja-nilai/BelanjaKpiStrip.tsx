"use client";

import { Banknote, Coins, Gauge, PieChart, Scale, UserCog } from "lucide-react";
import { belanjaKpi } from "@/lib/tik-data-detail";
import { TikKpiCards, type TikKpiCardItem } from "../TikKpiCards";
import { useSubholding } from "@/components/SubholdingProvider";
import { ScopeNote } from "@/components/ui/ScopeNote";

const ICONS = [Banknote, Gauge, Coins, PieChart, UserCog, Scale];

const items: TikKpiCardItem[] = belanjaKpi.map((k, i) => ({ ...k, icon: ICONS[i] }));

export function BelanjaKpiStrip() {
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
