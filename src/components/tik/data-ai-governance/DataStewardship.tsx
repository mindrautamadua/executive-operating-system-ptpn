import { dataStewardship } from "@/lib/tik-data-detail";
import { SectionHead } from "@/components/hc/SectionHead";
import { ScopeNote } from "@/components/ui/ScopeNote";

const totalSteward = dataStewardship.reduce((s, r) => s + r.jumlah, 0);

export function DataStewardship() {
  return (
    <div
      className="card anim-rise flex h-full min-h-0 flex-col px-4 pb-2.5 pt-3"
      style={{ "--d": "120ms" } as React.CSSProperties}
    >
      <SectionHead title="Data Stewardship" action="Lihat Detail" badge={<ScopeNote />} />
      <p className="mt-[3px] text-[9px] text-ink-500">
        {totalSteward} Peran Pengelola Data · Cakupan Domain &amp; Entitas
      </p>

      <div className="scroll-thin mt-2 flex min-h-0 flex-1 flex-col gap-1 overflow-y-auto pr-1">
        {dataStewardship.map((r) => (
          <div key={r.peran} className="rounded-lg border border-[#eef2f6] px-2 py-[5px]">
            <div className="flex items-center justify-between gap-2">
              <span className="truncate text-[9px] font-bold text-ink-900">{r.peran}</span>
              <span className="flex h-[18px] min-w-[18px] shrink-0 items-center justify-center rounded-md bg-[#e8f1fd] px-1 text-[9px] font-extrabold text-[#2f6fe4]">
                {r.jumlah}
              </span>
            </div>
            <div className="mt-[3px] flex items-center gap-1.5">
              <span className="truncate text-[9px] font-semibold text-ink-500">
                {r.cakupanDomain}
              </span>
              <span className="shrink-0 text-[9px] text-ink-500">· {r.entitas}</span>
            </div>
            <p className="mt-[2px] text-[9px] leading-snug text-ink-500">{r.tanggungJawab}</p>
          </div>
        ))}
      </div>

      <p className="pt-1.5 text-[9px] leading-snug text-ink-500">
        1 posisi Data Protection Officer subholding masih kosong — celah akuntabilitas kepatuhan
        PDP.
      </p>
    </div>
  );
}
