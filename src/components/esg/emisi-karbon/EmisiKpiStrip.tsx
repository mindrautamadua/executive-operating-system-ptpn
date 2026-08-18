"use client";

import { Droplets, Factory, Gauge, Plug, Truck } from "lucide-react";
import { emisiKpi } from "@/lib/esg-data";
import { EsgKpiCards, type EsgKpiCardItem } from "../EsgKpiCards";

const ICONS = [Factory, Plug, Truck, Gauge, Droplets];

const items: EsgKpiCardItem[] = emisiKpi.map((k, i) => ({ ...k, icon: ICONS[i] }));

export function EmisiKpiStrip() {
  return <EsgKpiCards items={items} cols="grid-cols-2 md:grid-cols-3 xl:grid-cols-5" />;
}
