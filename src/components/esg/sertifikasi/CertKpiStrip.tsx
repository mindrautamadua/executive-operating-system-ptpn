"use client";

import { BadgeCheck, CalendarClock, Globe2, ShieldCheck } from "lucide-react";
import { certKpi } from "@/lib/esg-data";
import { EsgKpiCards, type EsgKpiCardItem } from "../EsgKpiCards";

const ICONS = [BadgeCheck, ShieldCheck, Globe2, CalendarClock];

const items: EsgKpiCardItem[] = certKpi.map((k, i) => ({ ...k, icon: ICONS[i] }));

export function CertKpiStrip() {
  return <EsgKpiCards items={items} cols="grid-cols-2 md:grid-cols-4" />;
}
