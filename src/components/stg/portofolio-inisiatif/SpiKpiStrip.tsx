"use client";

import { spiKpi } from "@/lib/spi-data";
import { initiatives } from "@/lib/stg-core";
import { filterBySubholding } from "@/lib/subholding";
import { useSubholding } from "@/components/SubholdingProvider";
import { StgKpiCards } from "../StgKpiCards";

const rpT = (v: number) =>
  `Rp ${v.toLocaleString("id-ID", { minimumFractionDigits: 1, maximumFractionDigits: 1 })} T`;

/** KPI strip halaman Portofolio Inisiatif — 4 kartu. */
export function SpiKpiStrip() {
  const { active, isFiltered, def } = useSubholding();
  // `owner` (PalmCo / SGN / PTPN I / Holding) adalah dimensi subholding register.
  const rows = filterBySubholding(initiatives, active, (i) => i.owner);

  const items = spiKpi.map((k) => {
    if (!isFiltered) return k;
    const onTrack = rows.filter((i) => i.status === "On Track").length;
    const cakupan = `${def.label} + inisiatif Holding`;

    switch (k.label) {
      case "Inisiatif Strategis":
        return { ...k, value: `${rows.length}`, compare: cakupan };
      case "Nilai Target 2029":
        return {
          ...k,
          value: rpT(rows.reduce((a, i) => a + i.valueTargetRpT, 0)),
          compare: cakupan,
        };
      case "Kebutuhan Investasi":
        return {
          ...k,
          value: rpT(rows.reduce((a, i) => a + i.investRpT, 0)),
          sub: "Alokasi disetujui hanya tersedia di tingkat grup",
          delta: undefined,
          trend: undefined,
          deltaTone: undefined,
          compare: cakupan,
        };
      case "Inisiatif On Track":
        return {
          ...k,
          value: rows.length ? `${Math.round((onTrack / rows.length) * 100)}%` : "0%",
          sub: `${onTrack} dari ${rows.length} Inisiatif`,
          delta: undefined,
          trend: undefined,
          deltaTone: undefined,
          compare: cakupan,
        };
      default:
        return k;
    }
  });

  return <StgKpiCards items={items} cols="grid-cols-2 md:grid-cols-4" />;
}
