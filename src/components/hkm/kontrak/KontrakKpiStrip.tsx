"use client";

import { AlertTriangle, CalendarClock, Clock3, FileCheck2, FileSignature, Wallet } from "lucide-react";
import { kontrakKpi } from "@/lib/hkm-data";
import { HkmKpiCards, type HkmKpiCardItem } from "../HkmKpiCards";
import { useSubholding } from "@/components/SubholdingProvider";
import { ScopeNote } from "@/components/ui/ScopeNote";

const ICONS = [FileSignature, Wallet, CalendarClock, AlertTriangle, Clock3, FileCheck2];

const items: HkmKpiCardItem[] = kontrakKpi.map((k, i) => ({ ...k, icon: ICONS[i] }));

export function KontrakKpiStrip() {
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
