"use client";

import { CircleCheck, Layers, ShieldAlert, TriangleAlert } from "lucide-react";
import { registerKpi } from "@/lib/risk-data";
import { RiskKpiCards, type RiskKpiCardItem } from "../RiskKpiCards";

const ICONS = [Layers, ShieldAlert, TriangleAlert, CircleCheck];

const items: RiskKpiCardItem[] = registerKpi.map((k, i) => ({ ...k, icon: ICONS[i] }));

export function RegisterKpiStrip() {
  return <RiskKpiCards items={items} cols="grid-cols-2 md:grid-cols-4" />;
}
