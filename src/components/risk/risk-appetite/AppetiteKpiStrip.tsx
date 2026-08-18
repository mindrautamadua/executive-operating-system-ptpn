"use client";

import { CalendarCheck, Gauge, ShieldAlert, TriangleAlert } from "lucide-react";
import { appetiteKpi } from "@/lib/risk-data";
import { RiskKpiCards, type RiskKpiCardItem } from "../RiskKpiCards";

const ICONS = [Gauge, ShieldAlert, TriangleAlert, CalendarCheck];

const items: RiskKpiCardItem[] = appetiteKpi.map((k, i) => ({ ...k, icon: ICONS[i] }));

export function AppetiteKpiStrip() {
  return <RiskKpiCards items={items} cols="grid-cols-2 md:grid-cols-4" />;
}
