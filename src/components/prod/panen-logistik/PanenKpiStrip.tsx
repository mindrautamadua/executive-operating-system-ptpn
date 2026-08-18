"use client";

import type { ProdKpi } from "@/lib/produksi-data";
import { ProdKpiCards } from "../ProdKpiCards";
import { useSubholding } from "@/components/SubholdingProvider";
import { ScopeEmpty, inScope } from "@/components/ui/CommodityScope";

const panenKpi: ProdKpi[] = [
  {
    label: "Restan TBS",
    value: "1,8%",
    sub: "Norma <2% · rata-rata grup",
    delta: "-0,2 ppt",
    trend: "down",
    deltaTone: "good",
    compare: "vs Q1 2026 · 3 regional di atas norma",
    icon: "tbs",
    tone: "green",
    metric: "Restan TBS",
  },
  {
    label: "FFA TBS Masuk",
    value: "3,1%",
    sub: "Rata-rata 36 PKS · Target ≤3,0%",
    delta: "+0,1 ppt",
    trend: "up",
    deltaTone: "bad",
    compare: "vs Target",
    icon: "cpo",
    tone: "amber",
    metric: "Free Fatty Acid TBS Masuk",
  },
  {
    label: "Brondolan Terkutip",
    value: "92%",
    sub: "Target ≥95% · losses lapangan",
    delta: "-3 ppt",
    trend: "down",
    deltaTone: "bad",
    compare: "vs Target",
    icon: "oer",
    tone: "blue",
    metric: "Brondolan Terkutip",
  },
  {
    label: "Rotasi Panen",
    value: "7,8 hari",
    sub: "Standar 7 hari · rata-rata grup",
    delta: "+0,8 hari",
    trend: "up",
    deltaTone: "bad",
    compare: "5 dari 7 regional di atas standar",
    icon: "karet",
    tone: "red",
    metric: "Rotasi Panen",
  },
];

export function PanenKpiStrip() {
  // Domain: restan, FFA, brondolan & rotasi panen TBS sawit → milik PalmCo.
  const { active, def } = useSubholding();
  if (!inScope(active, "TBS")) {
    return (
      <div className="card anim-rise flex flex-col px-4 pb-3 pt-3">
        <ScopeEmpty label={def.fullLabel} />
      </div>
    );
  }
  return <ProdKpiCards items={panenKpi} cols="grid-cols-2 md:grid-cols-4" />;
}
