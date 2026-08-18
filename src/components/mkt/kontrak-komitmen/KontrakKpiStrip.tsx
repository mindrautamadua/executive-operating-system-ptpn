"use client";

import { CalendarCheck2, FileSignature, Gavel, TrendingUp, type LucideIcon } from "lucide-react";
import { kontrakKpi } from "@/lib/kontrak-buyer-data";
import { filterBySubholding } from "@/lib/subholding";
import { useSubholding } from "@/components/SubholdingProvider";
import { commodityScope } from "@/components/ui/CommodityScope";
import { ScopeNote } from "@/components/ui/ScopeNote";
import { MktKpiCards, type MktKpiCardItem } from "../MktKpiCards";

const ICONS: LucideIcon[] = [FileSignature, CalendarCheck2, Gavel, TrendingUp];

const ITEMS: MktKpiCardItem[] = kontrakKpi.map((k, i) => ({
  label: k.label,
  value: k.value,
  sub: k.sub,
  tone: k.tone,
  icon: ICONS[i],
}));

/** Lebar grid mengikuti jumlah tile yang tersisa setelah filter subholding. */
const COLS: Record<number, string> = {
  1: "grid-cols-1",
  2: "grid-cols-2",
  3: "grid-cols-2 md:grid-cols-3",
  4: "grid-cols-2 md:grid-cols-4",
};

export function KontrakKpiStrip() {
  const { active } = useSubholding();

  // Tile yang bersandar pada produksi CPO = PalmCo; tile lintas komoditas
  // (jumlah kontrak, tender, premium) tetap angka konsolidasi grup.
  const items = filterBySubholding(ITEMS, active, (k) => commodityScope(`${k.label} ${k.sub}`));

  return (
    <div className="flex flex-col gap-1.5">
      <ScopeNote className="self-start" />
      <MktKpiCards items={items} cols={COLS[items.length] ?? "grid-cols-2 md:grid-cols-4"} />
    </div>
  );
}
