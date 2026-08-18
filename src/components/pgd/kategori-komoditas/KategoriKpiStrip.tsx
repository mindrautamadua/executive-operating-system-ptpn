"use client";

import { FileSignature, Layers, ShieldCheck, TrendingUp } from "lucide-react";
import { kategoriKpi } from "@/lib/pgd-data";
import { PgdKpiCards, type PgdKpiCardItem } from "../PgdKpiCards";

const ICONS = [Layers, TrendingUp, FileSignature, ShieldCheck];

const items: PgdKpiCardItem[] = kategoriKpi.map((k, i) => ({ ...k, icon: ICONS[i] }));

export function KategoriKpiStrip() {
  return <PgdKpiCards items={items} cols="grid-cols-2 md:grid-cols-4" />;
}
