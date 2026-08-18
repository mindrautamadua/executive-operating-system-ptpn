"use client";

import { Banknote, FileCheck2, Receipt, ShoppingCart, Target } from "lucide-react";
import { belanjaKpi } from "@/lib/pgd-data";
import { PgdKpiCards, type PgdKpiCardItem } from "../PgdKpiCards";

const ICONS = [Banknote, Target, FileCheck2, ShoppingCart, Receipt];

const items: PgdKpiCardItem[] = belanjaKpi.map((k, i) => ({ ...k, icon: ICONS[i] }));

export function BelanjaKpiStrip() {
  return <PgdKpiCards items={items} cols="grid-cols-2 md:grid-cols-3 xl:grid-cols-5" />;
}
