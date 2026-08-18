"use client";

import { useMemo, useState } from "react";
import { byCategory, register } from "@/lib/sbd-data";
import { CATEGORICAL } from "@/lib/chart-palette";
import { DonutChart } from "@/components/ui/DonutChart";
import { SectionHead } from "@/components/hc/SectionHead";
import { useSubholding } from "@/components/SubholdingProvider";
import { filterBySubholding } from "@/lib/subholding";

/** Warna dikunci per klasifikasi agar tetap sama walau sebagian irisan hilang. */
const COLOR: Record<string, string> = Object.fromEntries(
  byCategory.map((c, i) => [c.category, CATEGORICAL[i % CATEGORICAL.length]]),
);

/** Komposisi 46 keputusan YTD menurut klasifikasi. */
export function DecisionByCategory() {
  const [active, setActive] = useState<number | null>(null);
  const { active: sub, isFiltered, def } = useSubholding();

  // Klasifikasi tidak menyimpan subholding, jadi saat filter aktif jumlahnya
  // dihitung ulang dari register (judul + PIC) supaya donat cocok dengan kartu
  // register. Tanpa filter, angka induk 46 keputusan YTD dipakai apa adanya.
  const rows = useMemo(() => {
    if (!isFiltered) return byCategory.map((c) => ({ ...c }));
    const filtered = filterBySubholding(register, sub, (d) => `${d.title} ${d.pic}`);
    return byCategory
      .map((c) => {
        const jumlah = filtered.filter((d) => d.category === c.category).length;
        return {
          category: c.category,
          jumlah,
          pct: filtered.length ? Math.round((jumlah / filtered.length) * 100) : 0,
        };
      })
      .filter((c) => c.jumlah > 0);
  }, [isFiltered, sub]);

  const total = rows.reduce((s, c) => s + c.jumlah, 0);
  const donutData = rows.map((c) => ({
    name: c.category,
    value: c.pct,
    color: COLOR[c.category],
  }));

  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-3 pt-3"
      style={{ "--d": "240ms" } as React.CSSProperties}
    >
      <SectionHead title="Keputusan per Klasifikasi" />
      <p className="mt-[3px] text-[9px] text-ink-500">
        {isFiltered
          ? `Porsi ${total} Keputusan Terkini · Cakupan ${def.label}`
          : "Porsi 46 Keputusan YTD · Investasi Dominan 35%"}
      </p>

      {total === 0 ? (
        <p className="mt-2 text-[9px] text-ink-500">Tidak ada keputusan untuk cakupan ini.</p>
      ) : (
        <div className="flex min-h-0 flex-1 items-center gap-3">
          <DonutChart
            data={donutData}
            size={138}
            thickness={23}
            centerValue={String(total)}
            centerCaption="Keputusan"
            valueFormatter={(v) => `${v}%`}
            onHover={setActive}
          />
          <div className="min-w-0 flex-1">
            {rows.map((c, i) => (
              <div
                key={c.category}
                className="flex items-center gap-1.5 py-[3px] transition-opacity"
                style={{ opacity: active === null || active === i ? 1 : 0.4 }}
              >
                <span
                  className="h-[8px] w-[8px] shrink-0 rounded-[2px]"
                  style={{ backgroundColor: COLOR[c.category] }}
                />
                <span className="min-w-0 flex-1 truncate text-[9px] font-medium text-ink-700">
                  {c.category}
                </span>
                <span className="shrink-0 text-[9.5px] font-bold tabular-nums text-ink-900">
                  {c.jumlah}
                </span>
                <span className="w-[30px] shrink-0 text-right text-[9px] tabular-nums text-ink-500">
                  {c.pct}%
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
