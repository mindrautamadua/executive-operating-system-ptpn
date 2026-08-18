"use client";

import { Clock, FileLock2, Gauge, MousePointerClick, ShieldAlert, ShieldCheck } from "lucide-react";
import { siberKpi } from "@/lib/tik-data";
import { TikKpiCards, type TikKpiCardItem } from "../TikKpiCards";
import { useSubholding } from "@/components/SubholdingProvider";
import { ScopeNote } from "@/components/ui/ScopeNote";

const ICONS = [ShieldAlert, ShieldCheck, Gauge, FileLock2, MousePointerClick, Clock];

const items: TikKpiCardItem[] = siberKpi.map((k, i) => ({ ...k, icon: ICONS[i] }));

export function SiberKpiStrip() {
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
