"use client";

import { CloudRain, Droplets, ShieldCheck, TrendingDown, Wheat } from "lucide-react";
import { kiKpi } from "@/lib/risk-data";
import { RiskKpiCards, type RiskKpiCardItem } from "../RiskKpiCards";

const ICONS = [TrendingDown, CloudRain, Droplets, ShieldCheck, Wheat];

const items: RiskKpiCardItem[] = kiKpi.map((k, i) => ({ ...k, icon: ICONS[i] }));

export function KiKpiStrip() {
  return <RiskKpiCards items={items} cols="grid-cols-2 md:grid-cols-3 xl:grid-cols-5" />;
}
