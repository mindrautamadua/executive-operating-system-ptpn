import { spendPareto } from "@/lib/pgd-data";
import { SectionHead } from "@/components/hc/SectionHead";
import { ToneBadge } from "@/components/shared/ToneBadge";
import { ScopeNote } from "@/components/ui/ScopeNote";

const pct = (v: number) => `${v.toLocaleString("id-ID", { minimumFractionDigits: 1 })}%`;

/** Kartu ringkas konsentrasi vendor: Top-20 menguasai 43% belanja grup. */
export function VendorConcentrationCompact() {
  const rows = spendPareto.filter((r) => r.vendor <= 100);

  return (
    <div className="card anim-rise px-4 pb-3.5 pt-3" style={{ "--d": "60ms" } as React.CSSProperties}>
      <SectionHead title="Konsentrasi Vendor" action="Lihat Detail" badge={<ScopeNote />} />

      <div className="mt-2 flex items-end justify-between gap-2">
        <div>
          <div className="text-[24px] font-extrabold leading-none tracking-[-0.01em] text-ink-900">
            43%
          </div>
          <div className="mt-1 text-[8.5px] text-ink-500">
            Belanja pada 20 vendor terbesar · Rp 5,33 T
          </div>
        </div>
        <ToneBadge label="Risiko Tinggi" tone="bad" />
      </div>

      <div className="mt-3 flex flex-col gap-2">
        {rows.map((r) => (
          <div key={r.label}>
            <div className="flex items-center justify-between">
              <span className="text-[9px] font-bold text-ink-900">{r.label}</span>
              <span className="text-[8.5px] font-semibold text-ink-500">
                Rp {r.spendRpT.toLocaleString("id-ID", { minimumFractionDigits: 2 })} T ·{" "}
                {pct(r.cumPct)}
              </span>
            </div>
            <div className="mt-1 h-[8px] overflow-hidden rounded-full bg-[#eef2f6]">
              <div
                className={`h-full rounded-full ${
                  r.vendor <= 20 ? "bg-[#ef4444]" : "bg-[#3b7ded]"
                }`}
                style={{ width: `${r.cumPct}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      <p className="mt-2.5 text-[9px] leading-snug text-ink-500">
        Top-20 vendor = 0,6% populasi (3.482 vendor) namun 43% nilai belanja, naik 2,4 pts vs FY
        2025 — dual sourcing wajib untuk seluruh kategori bottleneck.
      </p>
    </div>
  );
}
