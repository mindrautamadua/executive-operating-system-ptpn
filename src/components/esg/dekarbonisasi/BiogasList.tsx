"use client";

import { biogasList } from "@/lib/esg-data";
import { SectionHead } from "@/components/hc/SectionHead";
import { useSubholding } from "@/components/SubholdingProvider";

const angka = (v: number) => v.toLocaleString("id-ID", { minimumFractionDigits: 1 });

const totalMw = biogasList.reduce((s, r) => s + r.kapasitasMw, 0);
const maxMw = Math.max(...biogasList.map((r) => r.kapasitasMw));

export function BiogasList() {
  const { active, def } = useSubholding();
  // Biogas dibangun dari POME (limbah cair PKS) di Regional 1–7 — seluruhnya
  // aset sawit, jadi kartu ini berada di cakupan PalmCo.
  const outOfScope = active !== "all" && active !== "palmco";

  return (
    <div
      className="card anim-rise flex h-full min-h-0 flex-col px-4 pb-2.5 pt-3"
      style={{ "--d": "120ms" } as React.CSSProperties}
    >
      <SectionHead title="Sebaran Biogas per Regional" action="Lihat Detail" />
      <p className="mt-[3px] text-[9px] text-ink-500">
        {outOfScope
          ? `Biogas POME hanya di unit PKS PalmCo — di luar cakupan ${def.label}`
          : `21 Beroperasi · 9 Konstruksi · Total ${angka(totalMw)} MW`}
      </p>

      <div
        className="scroll-thin mt-2 flex min-h-0 flex-1 flex-col gap-1.5 overflow-y-auto pr-1 transition-opacity"
        style={{ opacity: outOfScope ? 0.25 : 1 }}
      >
        {biogasList.map((r) => (
          <div key={r.regional} className="rounded-xl border border-[#eef2f6] px-2.5 py-[7px]">
            <div className="flex items-center justify-between gap-2">
              <span className="truncate text-[9.5px] font-bold text-ink-900">{r.regional}</span>
              <span className="shrink-0 text-[9.5px] font-extrabold text-ptpn-green">
                {angka(r.kapasitasMw)} MW
              </span>
            </div>
            <div className="mt-1 flex items-center gap-2">
              <div className="h-[7px] min-w-0 flex-1 overflow-hidden rounded-full bg-[#eef2f6]">
                <div
                  className="h-full rounded-full bg-ptpn-green"
                  style={{ width: `${(r.kapasitasMw / maxMw) * 100}%` }}
                />
              </div>
              <span className="shrink-0 text-[9px] font-semibold text-ink-500">
                {r.beroperasi} operasi · {r.konstruksi} konstruksi
              </span>
            </div>
          </div>
        ))}
      </div>

      <p className="pt-1.5 text-[9px] leading-snug text-ink-500">
        {outOfScope
          ? "Regional 1–7 adalah pecahan internal PalmCo; program biogas belum berjalan di subholding ini."
          : "Regional 3 (Riau) memiliki 3 unit konstruksi terbanyak — fokus pengawasan COD."}
      </p>
    </div>
  );
}
