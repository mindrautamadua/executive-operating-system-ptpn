"use client";

import Link from "next/link";
import { ChevronDown, ChevronRight } from "lucide-react";
import { unitOrganisasi } from "@/lib/kinerja-data";
import { useSubholding } from "@/components/SubholdingProvider";
import { orgDim } from "../ui/OrgScope";

export function KinerjaUnitOrganisasi() {
  const { active, isFiltered, def } = useSubholding();
  // Ranking pembanding antar unit: bar di luar subholding aktif diredupkan agar
  // posisi unit yang dilihat terhadap unit lain tetap terbaca.

  return (
    <div className="card anim-rise flex h-full flex-col px-4 pb-2.5 pt-3">
      <div className="flex items-start justify-between gap-2">
        <div>
          <h3 className="card-title-navy">KINERJA PER UNIT ORGANISASI</h3>
          <p className="mt-[3px] text-[9.5px] text-ink-500">
            {isFiltered ? `Rata-rata Overall Score — unit ${def.label} disorot` : "Rata-rata Overall Score"}
          </p>
        </div>
        <button className="select-chip whitespace-nowrap px-2.5 py-[5px] text-[9.5px] transition-colors hover:bg-[#f7f9fb]">
          Top 10 Unit <ChevronDown size={11} />
        </button>
      </div>

      <div className="mt-2 flex min-h-0 flex-1 flex-col justify-around">
        {unitOrganisasi.map((u, i) => (
          <div
            key={u.nama}
            className="flex items-center gap-1.5 transition-opacity"
            style={{ opacity: orgDim(active, u.nama) }}
            title={`${u.nama}: ${u.score}`}
          >
            <span className="w-[16px] shrink-0 text-right text-[9px] text-ink-500">
              {i + 1}.
            </span>
            <span className="w-[104px] shrink-0 whitespace-nowrap text-[9.5px] text-ink-700">
              {u.nama}
            </span>
            <div className="h-[7px] flex-1 overflow-hidden rounded-full bg-[#f1f5f8]">
              <div
                className="anim-grow-x h-full rounded-full bg-gradient-to-r from-[#7ed957] to-[#22a45d]"
                style={{ width: `${u.pct}%`, "--d": `${i * 45}ms` } as React.CSSProperties}
              />
            </div>
            <span className="w-[26px] shrink-0 text-right text-[9.5px] font-bold tabular-nums text-ink-900">
              {u.score}
            </span>
          </div>
        ))}
      </div>

      <Link href="/kinerja-karyawan/unit-organisasi" className="link-more mt-1 flex items-center gap-1">
        Lihat ranking lengkap <ChevronRight size={11} />
      </Link>
    </div>
  );
}
