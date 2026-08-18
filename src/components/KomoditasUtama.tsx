"use client";

import { useState } from "react";
import { komoditasTabs, hargaRegional, rupiahPerKg } from "@/lib/data";
import { DetailLink } from "./DetailLink";

export function KomoditasUtama() {
  const [tab, setTab] = useState(komoditasTabs[0]);
  const rows = hargaRegional[tab].slice(0, 2);

  return (
    <div className="card flex h-full flex-col overflow-hidden px-4 pb-2.5 pt-2">
      <div className="flex items-baseline justify-between">
        <h3 className="card-title whitespace-nowrap">KOMODITAS UTAMA</h3>
        <div className="flex shrink-0 items-baseline gap-2">
          {/* "Referensi regional" eksplisit: harga per regional ≠ ASP grup di KPI
              (rata-rata tertimbang 5 regional) — tanpa label ini keduanya
              terbaca bertentangan (mis. R1 Rp 12.744 vs ASP Rp 12.482). */}
          <span
            className="cursor-help text-[9px] text-ink-500 underline decoration-dotted decoration-[#c6cfd8] underline-offset-2"
            title="Harga referensi per regional, bukan ASP grup. ASP CPO di Key Strategic KPI adalah rata-rata tertimbang 5 regional — kedua angka tidak bertentangan."
          >
            (Referensi regional · YTD 2026)
          </span>
          <DetailLink href="/produksi-operasi" />
        </div>
      </div>

      <div className="relative mt-1 shrink-0">
        <div className="no-scrollbar flex gap-1 overflow-x-auto pr-6">
          {komoditasTabs.map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`shrink-0 rounded-md px-1.5 py-[3px] text-[9px] font-semibold leading-none transition-colors ${
                t === tab
                  ? "bg-ptpn-greenLight text-ptpn-green"
                  : "text-ink-500 hover:bg-[#f5f8fa]"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
        <span className="pointer-events-none absolute inset-y-0 right-0 w-6 bg-gradient-to-l from-white to-transparent" />
      </div>

      <div className="mt-0.5 flex min-h-0 flex-1 flex-col justify-center gap-1.5">
        {rows.map((r) => (
          <div key={r.name}>
            <div className="flex items-baseline gap-2">
              <span className="w-[30px] shrink-0 text-[10px] font-semibold text-ink-700">
                {r.name}
              </span>
              <span className="text-[11px] font-bold text-ink-900">
                {rupiahPerKg(r.price)}
              </span>
              <span className="text-[9px] text-ink-500">/kg</span>
            </div>
            <div className="mt-[3px] h-[3px] w-full overflow-hidden rounded-full bg-[#eef2f6]">
              <div
                className="h-full rounded-full transition-all"
                style={{ width: `${r.pct}%`, background: r.color }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
