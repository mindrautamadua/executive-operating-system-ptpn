"use client";

import type { ProdKpi } from "@/lib/produksi-data";
import { ProdKpiCards } from "../ProdKpiCards";
import { useSubholding } from "@/components/SubholdingProvider";
import { ScopeEmpty, inScope } from "@/components/ui/CommodityScope";

const plasmaKpi: ProdKpi[] = [
  {
    label: "Kebun Plasma Binaan",
    value: "338",
    sub: "Koperasi & petani mitra 7 regional",
    delta: "+6",
    trend: "up",
    deltaTone: "good",
    compare: "vs Des 2025",
    icon: "tbs",
    tone: "blue",
    metric: "Jumlah Kebun Plasma Binaan",
  },
  {
    label: "Luas Plasma Binaan",
    value: "78,3",
    sub: "Rb Ha · Yield 16,4 vs inti 21,9 t/ha",
    delta: "+1,2 rb ha",
    trend: "up",
    deltaTone: "good",
    compare: "vs Des 2025",
    icon: "karet",
    tone: "green",
    metric: "Luas Plasma Binaan",
  },
  {
    label: "TBS Plasma YTD",
    value: "590",
    sub: "Rb Ton · Pihak III non-plasma 250",
    delta: "+14,3%",
    trend: "up",
    deltaTone: "good",
    compare: "Mei vs Jan (112→128 rb ton)",
    icon: "cpo",
    tone: "teal",
    metric: "TBS Plasma YTD",
  },
  {
    label: "PSR Target 2026",
    value: "6.200 ha",
    sub: "Realisasi YTD 2.140 ha (34,5%)",
    delta: "34,5%",
    trend: "down",
    deltaTone: "bad",
    compare: "vs run-rate linear 41,7%",
    icon: "gula",
    tone: "amber",
    metric: "Peremajaan Sawit Rakyat 2026",
  },
];

export function PlasmaKpiStrip() {
  // Domain: kebun plasma sawit, TBS plasma & PSR → milik PalmCo.
  const { active, def } = useSubholding();
  if (!inScope(active, "plasma TBS sawit")) {
    return (
      <div className="card anim-rise flex flex-col px-4 pb-3 pt-3">
        <ScopeEmpty label={def.fullLabel} />
      </div>
    );
  }
  return <ProdKpiCards items={plasmaKpi} cols="grid-cols-2 md:grid-cols-4" />;
}
