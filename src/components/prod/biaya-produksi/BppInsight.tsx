"use client";

import { bppInsights } from "@/lib/biaya-opex-data";
import { useSubholding } from "@/components/SubholdingProvider";
import { ScopeNote } from "@/components/ui/ScopeNote";
import { ProdInsightGrid } from "../ProdInsightGrid";

export function BppInsight() {
  // Narasi rekomendasi biaya bersifat grup — angka tidak ikut disaring.
  const { isFiltered } = useSubholding();

  return (
    <div>
      {isFiltered && (
        <div className="mb-1.5 flex justify-end">
          <ScopeNote />
        </div>
      )}
      <ProdInsightGrid items={bppInsights} cols="grid-cols-2 md:grid-cols-3" />
    </div>
  );
}
