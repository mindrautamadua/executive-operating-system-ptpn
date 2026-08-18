"use client";

import type { ProdKpi } from "@/lib/produksi-data";
import { useSubholding } from "@/components/SubholdingProvider";
import { inScope, ScopeEmpty } from "@/components/ui/CommodityScope";
import { ProdKpiCards } from "../ProdKpiCards";

/** KPI biaya — diturunkan dari hppKomponen, hppTrend, hppBenchmark & efisiensiInisiatif. */
const items: ProdKpi[] = [
  {
    label: "HPP CPO",
    value: "Rp 8.950",
    sub: "/kg · Target RKAP 8.700",
    delta: "+2,9%",
    trend: "up",
    deltaTone: "bad",
    compare: "vs Target RKAP",
    icon: "hpp",
    tone: "red",
    metric: "HPP CPO per Kg",
  },
  {
    label: "Deviasi vs Target",
    value: "Rp 250",
    sub: "/kg · terbesar: pupuk +160",
    delta: "+Rp 40",
    trend: "up",
    deltaTone: "bad",
    compare: "vs Apr 2026",
    icon: "oer",
    tone: "amber",
    metric: "Deviasi HPP vs Target",
  },
  {
    label: "Margin Kas CPO",
    value: "Rp 3.970",
    sub: "/kg · Harga jual Mei 12.920",
    delta: "+21,4%",
    trend: "up",
    deltaTone: "good",
    compare: "vs Jun 2025",
    icon: "cpo",
    tone: "green",
    metric: "Margin Kas CPO",
  },
  {
    label: "HPP 12 Bulan",
    value: "+4,3%",
    sub: "Jun 25 (8.580) → Mei 26 (8.950)",
    delta: "+Rp 370",
    trend: "up",
    deltaTone: "bad",
    compare: "inflasi biaya 12 bln",
    icon: "tbs",
    tone: "pink",
    metric: "Kenaikan HPP 12 Bulan",
  },
  {
    label: "Gap vs Peer Terbaik",
    value: "Rp 1.050",
    sub: "/kg · ≈ Rp 2,6 T/tahun FY",
    delta: "+13,3%",
    trend: "up",
    deltaTone: "bad",
    compare: "vs peer swasta 7.900",
    icon: "karet",
    tone: "blue",
    metric: "Gap HPP vs Peer",
  },
  {
    label: "Efisiensi YTD",
    value: "Rp 412 M",
    sub: "5 program · run-rate FY ± Rp 1,0 T",
    delta: "+Rp 96 M",
    trend: "up",
    deltaTone: "good",
    compare: "vs Q1 2026",
    icon: "gula",
    tone: "teal",
    metric: "Penghematan Efisiensi YTD",
  },
];

export function BppKpiStrip() {
  const { active, def } = useSubholding();
  // Seluruh KPI strip ini bertumpu pada HPP & margin CPO per kg — milik PalmCo.
  const dalamCakupan = inScope(active, "HPP CPO (sawit)");

  if (!dalamCakupan) return <ScopeEmpty label={def.fullLabel} />;

  return <ProdKpiCards items={items} cols="grid-cols-2 md:grid-cols-3 xl:grid-cols-6" />;
}
