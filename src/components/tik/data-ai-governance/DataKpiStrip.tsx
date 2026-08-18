"use client";

import { BrainCircuit, Database, Layers, ShieldCheck, Target, UsersRound } from "lucide-react";
import { dataKpi } from "@/lib/tik-data-detail";
import { TikKpiCards, type TikKpiCardItem } from "../TikKpiCards";
import { useSubholding } from "@/components/SubholdingProvider";
import { ScopeNote } from "@/components/ui/ScopeNote";

const ICONS = [Database, Layers, BrainCircuit, UsersRound, ShieldCheck, Target];

const items: TikKpiCardItem[] = dataKpi.map((k, i) => ({ ...k, icon: ICONS[i] }));

export function DataKpiStrip() {
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
