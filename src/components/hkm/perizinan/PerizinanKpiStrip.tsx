"use client";

import { CalendarClock, CircleDollarSign, Loader2, ShieldAlert, Stamp, Timer } from "lucide-react";
import { perizinanKpi } from "@/lib/hkm-data";
import { HkmKpiCards, type HkmKpiCardItem } from "../HkmKpiCards";
import { useSubholding } from "@/components/SubholdingProvider";
import { ScopeNote } from "@/components/ui/ScopeNote";

const ICONS = [Stamp, CalendarClock, Loader2, Timer, ShieldAlert, CircleDollarSign];

const items: HkmKpiCardItem[] = perizinanKpi.map((k, i) => ({ ...k, icon: ICONS[i] }));

export function PerizinanKpiStrip() {
  const { isFiltered } = useSubholding();

  return (
    <>
      {isFiltered && (
        <div className="mb-1.5 flex justify-end">
          <ScopeNote />
        </div>
      )}
      <HkmKpiCards items={items} cols="grid-cols-2 md:grid-cols-3 xl:grid-cols-6" />
    </>
  );
}
