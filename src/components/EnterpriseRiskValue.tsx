import { enterpriseRiskValue, type CeoTone } from "@/lib/ceo-data";
import { SectionHead } from "@/components/hc/SectionHead";

const DOT: Record<CeoTone, string> = {
  green: "bg-[#22a45d]",
  amber: "bg-[#f5a524]",
  red: "bg-[#ef4444]",
};

/**
 * Risk intelligence, bukan risk register: lima risiko terbesar terhadap nilai
 * perusahaan, masing-masing dikonversi ke eksposur rupiah dan membawa
 * likelihood, pemilik, dan tindakan — sehingga bisa diprioritaskan.
 */
export function EnterpriseRiskValue() {
  return (
    <div className="card flex h-full flex-col px-4 pb-3 pt-3">
      <SectionHead title="Enterprise Risk-to-Value" action="Lihat Detail" href="/risiko-kepatuhan" />
      <p className="mt-[3px] text-[9px] text-ink-500">
        Top 5 risiko dikonversi ke eksposur nilai perusahaan
      </p>

      <div className="mt-1.5 flex min-h-0 flex-1 flex-col justify-around">
        {enterpriseRiskValue.map((r, i) => (
          <div
            key={r.risk}
            className={`py-[5px] ${i !== 0 ? "border-t border-[#f2f5f8]" : ""}`}
          >
            <div className="flex items-center gap-1.5">
              <span className={`h-[7px] w-[7px] shrink-0 rounded-full ${DOT[r.tone]}`} />
              <span className="min-w-0 flex-1 truncate text-[9.5px] font-semibold text-ink-900" title={r.risk}>
                {i + 1}. {r.risk}
              </span>
              {/* Jenis angka eksplisit: eksposur maksimum ≠ expected loss. */}
              <span className="shrink-0 rounded bg-[#eef2f6] px-1 py-[1px] text-[9px] font-bold uppercase tracking-[0.03em] text-ink-500">
                {r.exposureType}
              </span>
              <span className="shrink-0 text-[9.5px] font-extrabold tabular-nums text-ink-900">
                {r.exposure}
              </span>
            </div>
            {/* Tiga dimensi risiko dipisah: status ≠ likelihood ≠ velocity. */}
            <div className="mt-[2px] flex items-center gap-1.5 pl-[13px] text-[9px] text-ink-500">
              <span className="shrink-0 font-semibold text-ink-500">{r.status}</span>
              {r.likelihood && (
                <>
                  <span className="shrink-0">·</span>
                  <span className="shrink-0">{r.likelihood}</span>
                </>
              )}
              <span className="shrink-0">·</span>
              <span className="shrink-0">{r.velocity}</span>
              <span className="shrink-0">·</span>
              <span className="shrink-0 font-semibold text-ink-500">{r.owner}</span>
              <span className="shrink-0">·</span>
              <span className="truncate" title={r.action}>
                {r.action}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
