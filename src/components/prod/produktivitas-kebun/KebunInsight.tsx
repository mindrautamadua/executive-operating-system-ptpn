import type { ProdInsight } from "@/lib/produksi-data";
import { ProdInsightGrid } from "../ProdInsightGrid";
import { ScopeNote } from "@/components/ui/ScopeNote";

/** Insight kebun — narasi dari protasTrend, gapAnalysis, regionalYield & topKebun. */
const items: ProdInsight[] = [
  {
    title: "Yield Naik 5 Tahun Beruntun",
    text: "Protas naik dari 19,6 (2022) ke 21,9 t/ha (2026 annualized, CAGR +2,8%/tahun), tetapi masih 2,1 t/ha di bawah benchmark swasta 24,0.",
    tone: "blue",
  },
  {
    title: "40% Gap dari Profil Umur",
    text: "Areal tua/renta 27% menyumbang 0,84 t/ha gap yield — replanting YTD baru 4.180 ha (33,4% target 12.500 ha); akselerasi H2 menentukan.",
    tone: "red",
  },
  {
    title: "Regional 6–7 Prioritas",
    text: "Yield 20,2 & 18,4 t/ha dengan umur rata-rata 16,4–17,2 tahun — kuadran tua & rendah; realokasi kontraktor replanting ke dua regional ini.",
    tone: "amber",
  },
  {
    title: "Replikasi Best Practice Top 5",
    text: "Dolok Ilir 28,4 t/ha ditopang rotasi panen 6,5 hari & pemupukan presisi — playbook yang sama dapat mengangkat 5 kebun terbawah (12,8–15,0 t/ha).",
    tone: "green",
  },
];

export function KebunInsight() {
  // Narasi insight disusun di level grup - tandai konsolidasi.
  return (
    <div className="flex flex-col gap-1">
      <ScopeNote className="self-end" />
      <ProdInsightGrid items={items} cols="grid-cols-2 md:grid-cols-4" />
    </div>
  );
}
