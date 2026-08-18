import { Factory, Sparkles } from "lucide-react";
import { businessImpact } from "@/lib/profil-data";

/**
 * Bukti dampak bisnis di lapangan — melengkapi asesmen HC dengan outcome
 * operasional terukur (yield, biaya, produksi, K3).
 */
export function BusinessImpactCard() {
  return (
    <div className="card flex h-full flex-col px-4 pb-3.5 pt-3.5">
      <h3 className="flex items-center gap-1.5 text-[11px] font-bold text-ink-900">
        <Factory size={13} className="text-[#0d9488]" />
        Business Impact — FY 2025
      </h3>

      <div className="mt-2.5 grid grid-cols-2 gap-2 lg:grid-cols-4">
        {businessImpact.items.map((it) => (
          <div key={it.label} className="rounded-xl border border-[#eef2f6] px-3 py-2.5">
            <div className="truncate text-[8.5px] font-semibold text-ink-500" title={it.label}>
              {it.label}
            </div>
            <div className="mt-1.5 text-[17px] font-extrabold leading-none text-ink-900">
              {it.value}
              <span className="ml-1 text-[9px] font-bold text-ink-500">{it.satuan}</span>
            </div>
            <div className="mt-1.5 text-[8.5px] font-bold text-ptpn-greenDark">{it.vsTarget}</div>
            <div className="text-[9px] text-ink-500">{it.peer}</div>
          </div>
        ))}
      </div>

      <div className="mt-2 flex items-start gap-2 rounded-lg bg-[#e6f6f5] px-3 py-2">
        <Sparkles size={12} className="mt-[1px] shrink-0 text-[#0d9488]" />
        <p className="text-[9px] leading-snug text-ink-700">{businessImpact.highlight}</p>
      </div>

      <p className="mt-auto pt-1.5 text-[9px] text-ink-500">Sumber: {businessImpact.sumber}</p>
    </div>
  );
}
