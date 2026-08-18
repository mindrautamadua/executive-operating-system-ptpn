"use client";

import type { ProdKpi } from "@/lib/produksi-data";
import { ProdKpiCards } from "../ProdKpiCards";
import { useSubholding } from "@/components/SubholdingProvider";
import { ScopeEmpty, inScope } from "@/components/ui/CommodityScope";

const agroKpi: ProdKpi[] = [
  {
    label: "Replanting YTD",
    value: "4.180 ha",
    sub: "Target 2026: 12.500 ha",
    delta: "33,4%",
    trend: "down",
    deltaTone: "bad",
    compare: "vs run-rate linear 41,7%",
    icon: "tbs",
    tone: "green",
    metric: "Realisasi Replanting YTD",
  },
  {
    label: "Umur Rata-rata Tanaman",
    value: "14,5 thn",
    sub: "Prima 43% · Tua/Renta 27%",
    delta: "+0,4 thn",
    trend: "up",
    deltaTone: "bad",
    compare: "vs 2025 (menua)",
    icon: "karet",
    tone: "teal",
    metric: "Umur Rata-rata Tanaman",
  },
  {
    label: "Realisasi Pupuk S1 2026",
    value: "84,3%",
    sub: "361 dari 428 rb ton NPK",
    delta: "-12,5 ppt",
    trend: "down",
    deltaTone: "bad",
    compare: "vs S2 2025 (96,8%)",
    icon: "hpp",
    tone: "amber",
    metric: "Realisasi Pemupukan",
  },
  {
    label: "Anomali Curah Hujan",
    value: "-18%",
    sub: "2.074 vs normal 2.530 mm (12 bln)",
    delta: "ONI 1,1",
    trend: "up",
    deltaTone: "bad",
    compare: "Probabilitas El Nino H2 62%",
    icon: "oer",
    tone: "red",
    metric: "Anomali Curah Hujan 12 Bulan",
  },
];

export function AgroKpiStrip() {
  // Domain: replanting, umur tanaman & pemupukan kebun sawit → milik PalmCo.
  const { active, def } = useSubholding();
  if (!inScope(active, "kebun sawit")) {
    return (
      <div className="card anim-rise flex flex-col px-4 pb-3 pt-3">
        <ScopeEmpty label={def.fullLabel} />
      </div>
    );
  }
  return <ProdKpiCards items={agroKpi} cols="grid-cols-2 md:grid-cols-4" />;
}
