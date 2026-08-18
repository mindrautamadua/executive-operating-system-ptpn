import { serviceDesk, serviceDeskSummary } from "@/lib/tik-data-detail";
import { SectionHead } from "@/components/hc/SectionHead";
import { ScopeNote } from "@/components/ui/ScopeNote";

const angka = (v: number) => v.toLocaleString("id-ID");
const desimal = (v: number) => v.toLocaleString("id-ID", { minimumFractionDigits: 1 });

const maxTiket = Math.max(...serviceDesk.map((s) => s.tiketPerBulan));

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg bg-[#eef2f6] px-2 py-[5px]">
      <div className="text-[9px] font-semibold text-ink-500">{label}</div>
      <div className="mt-[2px] text-[11px] font-extrabold leading-none text-ink-900">{value}</div>
    </div>
  );
}

export function ServiceDesk() {
  return (
    <div
      className="card anim-rise flex h-full min-h-0 flex-col px-4 pb-2.5 pt-3"
      style={{ "--d": "90ms" } as React.CSSProperties}
    >
      <SectionHead title="Service Desk" action="Lihat Detail" badge={<ScopeNote />} />
      <p className="mt-[3px] text-[9px] text-ink-500">
        Volume Tiket per Bulan, Kepatuhan SLA &amp; Kategori Teratas
      </p>

      <div className="mt-2 grid grid-cols-2 md:grid-cols-4 gap-1.5">
        <Stat label="Tiket/bln" value={angka(serviceDeskSummary.tiketPerBulan)} />
        <Stat label="SLA On-Time" value={`${desimal(serviceDeskSummary.slaOnTimePct)}%`} />
        <Stat label="FCR" value={`${desimal(serviceDeskSummary.firstCallResolutionPct)}%`} />
        <Stat label="CSAT" value={`${desimal(serviceDeskSummary.csatSkor)}/5`} />
      </div>

      <div className="scroll-thin mt-2 flex min-h-0 flex-1 flex-col gap-1 overflow-y-auto pr-1">
        {serviceDesk.map((s) => (
          <div key={s.kategori} className="rounded-lg border border-[#eef2f6] px-2 py-[5px]">
            <div className="flex items-center justify-between gap-2">
              <span className="truncate text-[9px] font-bold text-ink-900">{s.kategori}</span>
              <span className="shrink-0 text-[9px] font-extrabold text-ink-700">
                {angka(s.tiketPerBulan)}
              </span>
            </div>
            <div className="mt-1 flex items-center gap-1.5">
              <div className="h-[6px] min-w-0 flex-1 overflow-hidden rounded-full bg-[#eef2f6]">
                <div
                  className="h-full rounded-full"
                  style={{
                    width: `${(s.tiketPerBulan / maxTiket) * 100}%`,
                    backgroundColor: s.color,
                  }}
                />
              </div>
              <span className="shrink-0 text-[9px] font-semibold text-ink-500">
                SLA {desimal(s.slaPct)}% · {desimal(s.rataPenyelesaianJam)} jam
              </span>
            </div>
          </div>
        ))}
      </div>

      <p className="pt-1.5 text-[9px] leading-snug text-ink-500">
        {serviceDeskSummary.agen} agen menangani {angka(serviceDeskSummary.tiketPerBulan)} tiket per
        bulan; kategori jaringan adalah SLA terendah (78,4%).
      </p>
    </div>
  );
}
