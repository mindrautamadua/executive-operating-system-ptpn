"use client";

import { AlarmClock, CheckCircle2, ClipboardCheck, Hourglass, Timer } from "lucide-react";
import { rekomendasiKpi } from "@/lib/dek-data";
import { DekKpiCards, type DekKpiCardItem } from "../DekKpiCards";
import { useSubholding } from "@/components/SubholdingProvider";
import { ScopeNote } from "@/components/ui/ScopeNote";

const ICONS = [ClipboardCheck, CheckCircle2, Hourglass, AlarmClock, Timer];

const items: DekKpiCardItem[] = rekomendasiKpi.map((k, i) => ({ ...k, icon: ICONS[i] }));

export function RekomendasiKpiStrip() {
  const { isFiltered } = useSubholding();

  return (
    <>
      {isFiltered && (
        <div className="mb-1.5 flex justify-end">
          <ScopeNote />
        </div>
      )}
      <DekKpiCards items={items} cols="grid-cols-2 md:grid-cols-3 xl:grid-cols-5" />
    </>
  );
}
