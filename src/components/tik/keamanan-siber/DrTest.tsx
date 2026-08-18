import { drTest, type DrTestRow } from "@/lib/tik-data";
import { SectionHead } from "@/components/hc/SectionHead";
import { ScopeNote } from "@/components/ui/ScopeNote";
import { ToneBadge, type BadgeTone } from "@/components/shared/ToneBadge";

const STATUS_TONE: Record<DrTestRow["status"], BadgeTone> = {
  Lulus: "good",
  "Lulus Bersyarat": "warn",
  "Belum Diuji": "bad",
};

const jam = (v: number) => `${v.toLocaleString("id-ID", { minimumFractionDigits: 1 })} jam`;

/** Kartu uji DRP: RTO & RPO aktual vs target per sistem kritikal. */
export function DrTest() {
  return (
    <div
      className="card anim-rise flex h-full min-h-0 flex-col px-4 pb-2.5 pt-3"
      style={{ "--d": "240ms" } as React.CSSProperties}
    >
      <SectionHead title="Uji DRP & Kesiapan Pemulihan" action="Lihat Detail" badge={<ScopeNote />} />
      <p className="mt-[3px] text-[9px] text-ink-500">
        RTO &amp; RPO Aktual vs Target per Sistem Kritikal · 5 sistem dalam lingkup
      </p>

      <div className="scroll-thin mt-2 grid min-h-0 flex-1 grid-cols-2 content-start gap-2 overflow-y-auto">
        {drTest.map((d) => {
          const belum = d.status === "Belum Diuji";
          const rtoLewat = !belum && d.rtoAktualJam > d.rtoTargetJam;
          const rpoLewat = !belum && d.rpoAktualJam > d.rpoTargetJam;
          return (
            <div key={d.sistem} className="rounded-xl border border-[#eef2f6] px-3 pb-2.5 pt-2.5">
              <div className="flex items-start justify-between gap-2">
                <span className="min-w-0 truncate text-[9.5px] font-bold text-ink-900" title={d.sistem}>
                  {d.sistem}
                </span>
                <ToneBadge label={d.status} tone={STATUS_TONE[d.status]} />
              </div>

              <div className="mt-2 grid grid-cols-2 gap-2">
                <div>
                  <div className="text-[9px] font-bold uppercase tracking-[0.04em] text-ink-500">
                    RTO
                  </div>
                  <div
                    className={`mt-[2px] text-[12px] font-extrabold leading-none ${rtoLewat ? "text-[#ef4444]" : "text-ink-900"}`}
                  >
                    {belum ? "—" : jam(d.rtoAktualJam)}
                  </div>
                  <div className="mt-[3px] text-[9px] text-ink-500">target {jam(d.rtoTargetJam)}</div>
                </div>
                <div>
                  <div className="text-[9px] font-bold uppercase tracking-[0.04em] text-ink-500">
                    RPO
                  </div>
                  <div
                    className={`mt-[2px] text-[12px] font-extrabold leading-none ${rpoLewat ? "text-[#ef4444]" : "text-ink-900"}`}
                  >
                    {belum ? "—" : jam(d.rpoAktualJam)}
                  </div>
                  <div className="mt-[3px] text-[9px] text-ink-500">target {jam(d.rpoTargetJam)}</div>
                </div>
              </div>

              <div className="mt-1.5 text-[9px] font-semibold text-ink-500">
                Uji terakhir: {d.ujiTerakhir}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
