import Link from "next/link";
import { ArrowRight, Stethoscope } from "lucide-react";
import { capacityConclusion, capacityDiagnosis } from "@/lib/engagement-data";

/**
 * Diagnosis lintas modul: engagement × workforce adequacy × overtime ×
 * absenteeism. Menjawab "apakah low engagement adalah gejala workforce
 * capacity problem?" — bukan sekadar skor rendah.
 */
export function CapacityDiagnosis() {
  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-2.5 pt-3"
      style={{ "--d": "480ms" } as React.CSSProperties}
    >
      <div className="flex items-start justify-between gap-2">
        <h3 className="card-title-navy flex items-center gap-1.5">
          <Stethoscope size={13} className="text-[#1b3a6b]" />
          Engagement × Workforce Capacity
        </h3>
        <span className="shrink-0 rounded px-1.5 py-[2px] text-[7.5px] font-bold leading-none tone-blue">
          Cross-module
        </span>
      </div>
      <p className="mt-[3px] text-[9px] text-ink-500">
        Root-cause check: engagement rendah vs indikator tekanan kapasitas
      </p>

      <div className="mt-2 grid grid-cols-[minmax(0,1fr)_66px_70px_62px_54px] gap-x-2 text-[9px] font-bold text-ink-500">
        <span>Unit</span>
        <span className="text-right">Engagement</span>
        <span className="text-right">Adequacy</span>
        <span className="text-right">Overtime</span>
        <span className="text-right">Absen</span>
      </div>

      <div className="mt-1 flex min-h-0 flex-1 flex-col justify-around">
        {capacityDiagnosis.map((r) => (
          <div
            key={r.unit}
            className="grid grid-cols-[minmax(0,1fr)_66px_70px_62px_54px] items-center gap-x-2"
          >
            <span className="flex min-w-0 items-center gap-1.5">
              <span className={`tone-${r.tone} h-[7px] w-[7px] shrink-0 rounded-full`} />
              <span className="truncate text-[9.5px] font-semibold text-ink-900">{r.unit}</span>
            </span>
            <span className="text-right text-[9.5px] font-extrabold tabular-nums text-ink-900">
              {r.engagement.toFixed(1).replace(".", ",")}
            </span>
            <span className="text-right text-[9.5px] font-semibold tabular-nums text-ink-700">
              {r.adequacy}
            </span>
            <span className="text-right text-[9.5px] font-semibold tabular-nums text-ink-700">
              {r.overtime}
            </span>
            <span className="text-right text-[9.5px] font-semibold tabular-nums text-ink-700">
              {r.absen}
            </span>
          </div>
        ))}
      </div>

      <p className="mt-1.5 border-t border-[#eef2f6] pt-1.5 text-[8.5px] leading-snug text-ink-600">
        <span className="font-bold text-ink-900">Diagnosis:</span> {capacityConclusion}
      </p>

      <Link
        href="/workforce-planning"
        className="link-more mt-1.5 flex items-center gap-1 self-start"
      >
        Review kapasitas di Workforce Planning <ArrowRight size={11} />
      </Link>
    </div>
  );
}
