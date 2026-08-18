"use client";

import { Globe2, Ship, ShieldCheck, UsersRound, type LucideIcon } from "lucide-react";
import { buyerKpi } from "@/lib/kontrak-buyer-data";
import { filterBySubholding } from "@/lib/subholding";
import { useSubholding } from "@/components/SubholdingProvider";
import { commodityScope } from "@/components/ui/CommodityScope";
import { ScopeNote } from "@/components/ui/ScopeNote";
import { MktKpiCards, type MktKpiCardItem } from "../MktKpiCards";

const ICONS: LucideIcon[] = [Ship, UsersRound, Globe2, ShieldCheck];

const ITEMS: MktKpiCardItem[] = buyerKpi.map((k, i) => ({
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

export function BuyerKpiStrip() {
  const { active } = useSubholding();

  // Tile berbasis CPO/turunan & DMO minyak goreng = PalmCo; tile lain (jumlah
  // negara tujuan) tetap angka konsolidasi grup.
  const items = filterBySubholding(ITEMS, active, (k) => commodityScope(`${k.label} ${k.sub}`));

  return (
    <div className="flex flex-col gap-1.5">
      <ScopeNote className="self-start" />
      <MktKpiCards items={items} cols={COLS[items.length] ?? "grid-cols-2 md:grid-cols-4"} />
    </div>
  );
}
