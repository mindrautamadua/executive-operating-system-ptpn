"use client";

import { Flame, LayoutList, Sun, Wallet, Wind } from "lucide-react";
import { dekarbKpi } from "@/lib/esg-data";
import { EsgKpiCards, type EsgKpiCardItem } from "../EsgKpiCards";

const ICONS = [Flame, Sun, Wind, Wallet, LayoutList];

const items: EsgKpiCardItem[] = dekarbKpi.map((k, i) => ({ ...k, icon: ICONS[i] }));

export function DekarbKpiStrip() {
  return <EsgKpiCards items={items} cols="grid-cols-2 md:grid-cols-3 xl:grid-cols-5" />;
}
