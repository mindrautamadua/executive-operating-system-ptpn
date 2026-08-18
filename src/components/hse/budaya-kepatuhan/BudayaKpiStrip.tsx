"use client";

import {
  BadgeCheck,
  ClipboardList,
  FileWarning,
  GraduationCap,
  HeartHandshake,
  SearchCheck,
} from "lucide-react";
import { budayaKpi } from "@/lib/hse-data";
import { HseKpiCards, type HseKpiCardItem } from "../HseKpiCards";
import { useSubholding } from "@/components/SubholdingProvider";
import { ScopeNote } from "@/components/ui/ScopeNote";

const ICONS = [
  BadgeCheck,
  GraduationCap,
  SearchCheck,
  FileWarning,
  ClipboardList,
  HeartHandshake,
];

const items: HseKpiCardItem[] = budayaKpi.map((k, i) => ({ ...k, icon: ICONS[i] }));

export function BudayaKpiStrip() {
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
