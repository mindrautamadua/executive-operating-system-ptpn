"use client";

import { Globe2, Radar, TrendingDown, TrendingUp } from "lucide-react";
import { miKpi } from "@/lib/hilir-stok-margin-data";
import { filterBySubholding } from "@/lib/subholding";
import { useSubholding } from "@/components/SubholdingProvider";
import { commodityScope } from "@/components/ui/CommodityScope";
import { ScopeNote } from "@/components/ui/ScopeNote";
import { MktKpiCards, type MktKpiCardItem } from "../MktKpiCards";

const ICONS = [Radar, TrendingUp, Globe2, TrendingDown] as const;

const ITEMS: MktKpiCardItem[] = miKpi.map((k, i) => ({
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

export function MiKpiStrip() {
  const { active } = useSubholding();

  // Tile sentimen CPO & stok global sawit = PalmCo; tile lain (jumlah sinyal
  // aktif) berlaku lintas komoditas.
  const items = filterBySubholding(ITEMS, active, (k) => commodityScope(`${k.label} ${k.sub}`));

  return (
    <div className="flex flex-col gap-1.5">
      <ScopeNote className="self-start" />
      <MktKpiCards items={items} cols={COLS[items.length] ?? "grid-cols-2 md:grid-cols-4"} />
    </div>
  );
}
