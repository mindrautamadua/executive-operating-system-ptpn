"use client";

import type { ProdKpi } from "@/lib/produksi-data";
import { ProdKpiCards } from "../ProdKpiCards";
import { useSubholding } from "@/components/SubholdingProvider";
import { inScope, ScopeEmpty } from "@/components/ui/CommodityScope";

/** KPI kebun — diturunkan dari regionalYield, protasTrend & gapAnalysis (produksi-data). */
const items: ProdKpi[] = [
  {
    label: "Yield TBS Grup",
    value: "21,9",
    sub: "t/ha (annualized) · 2025: 21,4",
    delta: "+0,5 t/ha",
    trend: "up",
    deltaTone: "good",
    compare: "vs 2025",
    icon: "tbs",
    tone: "green",
    metric: "Yield TBS Grup",
  },
  {
    label: "Gap vs Benchmark",
    value: "2,1",
    sub: "t/ha vs benchmark swasta 24,0",
    delta: "-8,8%",
    trend: "down",
    deltaTone: "bad",
    compare: "vs benchmark swasta",
    icon: "oer",
    tone: "amber",
    metric: "Gap Yield vs Benchmark",
  },
  {
    label: "Luas Tertanam Inti",
    value: "508,7",
    sub: "Rb Ha · 7 Regional PalmCo",
    delta: "+1,2%",
    trend: "up",
    deltaTone: "good",
    compare: "vs 2025",
    icon: "karet",
    tone: "blue",
    metric: "Luas Tertanam Inti",
  },
  {
    label: "Areal Tua / Renta",
    value: "27%",
    sub: "Penyumbang 40% gap yield",
    delta: "-2 ppt",
    trend: "down",
    deltaTone: "good",
    compare: "vs 2025",
    icon: "gula",
    tone: "red",
    metric: "Porsi Areal Tua/Renta",
  },
  {
    label: "Replanting YTD",
    value: "4.180",
    sub: "Ha · 33,4% target FY 12.500 ha",
    delta: "-8,3 ppt",
    trend: "down",
    deltaTone: "bad",
    compare: "vs run-rate linear",
    icon: "hpp",
    tone: "teal",
    metric: "Realisasi Replanting",
  },
  {
    label: "Regional Terbaik",
    value: "23,8",
    sub: "t/ha · Regional 1 (Sumut)",
    delta: "+0,4 t/ha",
    trend: "up",
    deltaTone: "good",
    compare: "vs 2025",
    icon: "cpo",
    tone: "pink",
    metric: "Yield Regional Terbaik",
  },
];

export function KebunKpiStrip() {
  const { active, def } = useSubholding();
  // Seluruh KPI halaman ini soal kebun sawit (yield TBS, Regional 1-7) -> PalmCo.
  if (!inScope(active, "kebun sawit TBS Regional 1")) {
    return <ScopeEmpty label={def.fullLabel} />;
  }

  return <ProdKpiCards items={items} cols="grid-cols-2 md:grid-cols-3 xl:grid-cols-6" />;
}
