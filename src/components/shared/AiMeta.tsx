/**
 * Metadata analitik untuk setiap insight/rekomendasi AI: jenis klaim,
 * keyakinan, dan bukti. Prinsipnya: korelasi, kausal, prediksi, dan
 * rekomendasi adalah klaim berbeda dan tidak boleh saling menyamar —
 * disiplin yang sama dengan disclaimer korelasional di HC alignment.
 */

export type AiClaimType = "Korelasi" | "Kausal" | "Prediksi" | "Rekomendasi";

export interface AiMetaInfo {
  jenis: AiClaimType;
  /** Keyakinan analis/model (0-100); tanpa angka = tidak diklaim. */
  confidencePct?: number;
  /** Sumber bukti utama, dipisah " · " bila lebih dari satu. */
  evidence?: string;
}

const JENIS_CLS: Record<AiClaimType, string> = {
  Korelasi: "bg-[#e8f1fd] text-[#2f6fe4]",
  Kausal: "bg-[#f1ecfe] text-[#8b5cf6]",
  Prediksi: "bg-[#fdf3e0] text-[#d98b06]",
  Rekomendasi: "bg-ptpn-greenLight text-ptpn-green",
};

export function AiMeta({ jenis, confidencePct, evidence }: AiMetaInfo) {
  return (
    <span className="mt-[4px] flex flex-wrap items-center gap-1.5">
      <span
        className={`rounded px-1 py-[1px] text-[7.5px] font-bold uppercase tracking-[0.04em] ${JENIS_CLS[jenis]}`}
      >
        {jenis}
      </span>
      {confidencePct !== undefined && (
        <span className="text-[9px] font-semibold text-ink-500">
          Keyakinan {confidencePct}%
        </span>
      )}
      {evidence && (
        <span className="min-w-0 truncate text-[9px] text-ink-500" title={evidence}>
          Bukti: {evidence}
        </span>
      )}
    </span>
  );
}

/**
 * Label mutu insight yang DITURUNKAN dari kelengkapan governance, bukan
 * branding: "(Decision-grade)" hanya bila SEMUA insight di kartu membawa
 * meta (jenis klaim + confidence/evidence); kurang dari itu label jujur
 * "(Analytical Insight)". Label tidak boleh menjanjikan mutu yang tidak
 * dibawa datanya.
 */
export function InsightGradeLabel({ decisionGrade }: { decisionGrade: boolean }) {
  return (
    <span
      className="cursor-help font-semibold normal-case tracking-normal text-ink-400"
      title={
        decisionGrade
          ? "Decision-grade: setiap insight membawa jenis klaim, confidence, dan evidence — memenuhi standar minimum untuk dipakai memutus."
          : "Analytical Insight: belum semua insight membawa jenis klaim + confidence + evidence; pakai sebagai bahan analisis, bukan dasar keputusan langsung."
      }
    >
      ({decisionGrade ? "Decision-grade" : "Analytical Insight"})
    </span>
  );
}
