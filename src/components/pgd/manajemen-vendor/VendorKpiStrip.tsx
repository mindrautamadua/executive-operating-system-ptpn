"use client";

import { Ban, Gauge, Handshake, ShieldAlert, Store, UserPlus, Users } from "lucide-react";
import { vendorKpi } from "@/lib/pgd-data-detail";
import { PgdKpiCards, type PgdKpiCardItem } from "../PgdKpiCards";

const ICONS = [Users, ShieldAlert, UserPlus, Gauge, Ban, Store];

const items: PgdKpiCardItem[] = vendorKpi.map((k, i) => ({ ...k, icon: ICONS[i] ?? Handshake }));

export function VendorKpiStrip() {
  return <PgdKpiCards items={items} cols="grid-cols-2 md:grid-cols-3 xl:grid-cols-6" />;
}
