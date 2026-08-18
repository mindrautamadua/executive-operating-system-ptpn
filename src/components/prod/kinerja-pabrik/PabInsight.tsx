"use client";

import { pabInsights } from "@/lib/pabrik-data";
import { useSubholding } from "@/components/SubholdingProvider";
import { ScopeNote } from "@/components/ui/ScopeNote";
import { ProdInsightGrid } from "../ProdInsightGrid";

export function PabInsight() {
  // Narasi rekomendasi disusun lintas komoditas — tetap konsolidasi grup.
  const { isFiltered } = useSubholding();

  return (
    <div>
      {isFiltered && (
        <div className="mb-1.5 flex justify-end">
          <ScopeNote />
        </div>
      )}
      <ProdInsightGrid items={pabInsights} cols="grid-cols-2 md:grid-cols-4" />
    </div>
  );
}
