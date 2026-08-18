import { evaluationCalendar, type DekEvaluationStage } from "@/lib/dek-data-detail";
import { SectionHead } from "@/components/hc/SectionHead";
import { ScopeNote } from "@/components/ui/ScopeNote";
import { ToneBadge, type BadgeTone } from "@/components/shared/ToneBadge";

const STATUS_TONE: Record<DekEvaluationStage["status"], BadgeTone> = {
  Selesai: "good",
  Berjalan: "warn",
  "Belum Mulai": "neutral",
};

const DOT: Record<DekEvaluationStage["status"], string> = {
  Selesai: "bg-ptpn-green",
  Berjalan: "bg-[#f5a524]",
  "Belum Mulai": "bg-[#94a3b8]",
};

/** Timeline lima tahap siklus evaluasi kinerja Direksi 2026. */
export function EvaluationCalendar() {
  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-2.5 pt-3"
      style={{ "--d": "360ms" } as React.CSSProperties}
    >
      <SectionHead title="Kalender Siklus Evaluasi" action="Lihat Pedoman" badge={<ScopeNote />} />
      <p className="mt-[3px] text-[9px] text-ink-500">
        Lima Tahap Siklus 2026 · Review Tengah Tahun Sedang Berjalan
      </p>

      <div className="scroll-thin mt-2 grid min-h-0 flex-1 grid-cols-5 gap-2 overflow-y-auto">
        {evaluationCalendar.map((s) => (
          <div
            key={s.tahap}
            className="flex flex-col rounded-xl border border-[#eef2f6] bg-[#f8fafc] px-2.5 pb-2 pt-2"
          >
            <div className="flex items-center gap-1.5">
              <span className={`h-[7px] w-[7px] shrink-0 rounded-full ${DOT[s.status]}`} />
              <span className="min-w-0 text-[9px] font-bold leading-snug text-ink-900">
                {s.tahap}
              </span>
            </div>
            <div className="mt-[3px] text-[9px] font-semibold text-ink-500">{s.periode}</div>
            <p className="mt-1.5 text-[9px] leading-snug text-ink-500">{s.keluaran}</p>
            <div className="mt-auto pt-1.5">
              <ToneBadge label={s.status} tone={STATUS_TONE[s.status]} />
              <div className="mt-[4px] truncate text-[7.5px] font-semibold text-ink-400">
                {s.penanggungJawab}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
