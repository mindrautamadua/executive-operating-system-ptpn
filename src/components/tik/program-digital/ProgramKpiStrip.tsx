"use client";

import { Boxes, Coins, Gauge, ListChecks, Users } from "lucide-react";
import { programKpi } from "@/lib/tik-data";
import { TikKpiCards, type TikKpiCardItem } from "../TikKpiCards";
import { useSubholding } from "@/components/SubholdingProvider";
import { ScopeNote } from "@/components/ui/ScopeNote";

const ICONS = [Gauge, Users, Boxes, Coins, ListChecks];

const items: TikKpiCardItem[] = programKpi.map((k, i) => ({ ...k, icon: ICONS[i] }));

export function ProgramKpiStrip() {
  const { isFiltered } = useSubholding();

  return (
    <>
      {isFiltered && (
        <div className="mb-1.5 flex justify-end">
          <ScopeNote />
        </div>
      )}
      <TikKpiCards items={items} cols="grid-cols-2 md:grid-cols-3 xl:grid-cols-5" />
    </>
  );
}
