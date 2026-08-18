"use client";

import { Activity, CalendarX2, Eye, Gauge, HardHat, HeartCrack } from "lucide-react";
import { kinerjaK3Kpi } from "@/lib/hse-data";
import { HseKpiCards, type HseKpiCardItem } from "../HseKpiCards";
import { useSubholding } from "@/components/SubholdingProvider";
import { ScopeNote } from "@/components/ui/ScopeNote";

const ICONS = [Activity, Gauge, HardHat, HeartCrack, Eye, CalendarX2];

const items: HseKpiCardItem[] = kinerjaK3Kpi.map((k, i) => ({ ...k, icon: ICONS[i] }));

export function KinerjaKpiStrip() {
  const { isFiltered } = useSubholding();

  return (
    <>
      {isFiltered && (
        <div className="mb-1.5 flex justify-end">
          <ScopeNote />
        </div>
      )}
      <HseKpiCards items={items} cols="grid-cols-2 md:grid-cols-3 xl:grid-cols-6" />
    </>
  );
}
