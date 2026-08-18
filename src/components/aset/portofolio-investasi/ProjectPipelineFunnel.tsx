import {
  INV_PIPELINE_RP_T,
  INV_PROYEK_AKTIF,
  pipelineFunnel,
  pipelineFunnelNote,
} from "@/lib/inv-data";
import { SectionHead } from "@/components/hc/SectionHead";
import { ScopeNote } from "@/components/ui/ScopeNote";
import { PALETTE } from "@/lib/chart-palette";

const num = (v: number) =>
  v.toLocaleString("id-ID", { minimumFractionDigits: 1, maximumFractionDigits: 1 });

const MAX = Math.max(...pipelineFunnel.map((s) => s.nilaiRpT));

const COLORS = [PALETTE.slate, PALETTE.teal, PALETTE.amber, PALETTE.blue, PALETTE.green];

/** Corong pipeline investasi: 5 tahap dari kajian awal hingga onstream. */
export function ProjectPipelineFunnel() {
  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-2.5 pt-3"
      style={{ "--d": "60ms" } as React.CSSProperties}
    >
      <SectionHead title="Pipeline Proyek Investasi" action="Lihat Detail" badge={<ScopeNote />} />
      <p className="mt-[3px] text-[9px] text-ink-500">
        {INV_PROYEK_AKTIF} Proyek · Rp {num(INV_PIPELINE_RP_T)} T per Tahap Pipeline
      </p>

      <ul className="mt-2 flex min-h-0 flex-1 flex-col justify-around gap-y-1">
        {pipelineFunnel.map((s, i) => (
          <li key={s.tahap} className="shrink-0">
            <div className="flex items-center gap-2">
              <span className="w-[112px] shrink-0 text-[8.5px] font-semibold leading-tight text-ink-700">
                {s.tahap}
              </span>
              <span className="h-[11px] min-w-0 flex-1 overflow-hidden rounded-full bg-[#eef2f6]">
                <span
                  className="anim-grow-x block h-full rounded-full"
                  style={{ width: `${(s.nilaiRpT / MAX) * 100}%`, background: COLORS[i] }}
                />
              </span>
              <span className="w-[52px] shrink-0 text-right text-[9.5px] font-extrabold text-ink-900">
                Rp {num(s.nilaiRpT)} T
              </span>
              <span className="w-[46px] shrink-0 text-right text-[9px] font-semibold text-ink-500">
                {s.jumlahProyek} proyek
              </span>
            </div>
            <div className="mt-[2px] pl-[120px] text-[9px] text-ink-500">
              Lead time {s.leadTime}
              {s.note ? ` · ${s.note}` : ""}
            </div>
          </li>
        ))}
      </ul>

      <p className="mt-1 rounded-md bg-[#f8fafc] px-2 py-[5px] text-[9px] leading-[1.4] text-ink-500">
        {pipelineFunnelNote}
      </p>
    </div>
  );
}
