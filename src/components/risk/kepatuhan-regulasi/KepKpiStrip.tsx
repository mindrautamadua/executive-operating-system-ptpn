"use client";

import { BadgeCheck, Gavel, Receipt, ScrollText, Truck } from "lucide-react";
import { kepKpi } from "@/lib/risk-data-detail";
import { RiskKpiCards, type RiskKpiCardItem } from "../RiskKpiCards";

const ICONS = [ScrollText, BadgeCheck, Truck, Receipt, Gavel];

const items: RiskKpiCardItem[] = kepKpi.map((k, i) => ({ ...k, icon: ICONS[i] }));

export function KepKpiStrip() {
  return <RiskKpiCards items={items} cols="grid-cols-2 md:grid-cols-3 xl:grid-cols-5" />;
}
