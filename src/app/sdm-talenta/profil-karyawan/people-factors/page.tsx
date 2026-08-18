import { Sigma } from "lucide-react";
import { SdmSidebar } from "@/components/sdm/SdmSidebar";
import { SdmDetailHeader } from "@/components/sdm/SdmDetailHeader";
import { Pill } from "@/components/ti/detail/parts";
import { BarListCard, DetailKpiStrip, DetailTable, NotesPanel } from "@/components/wa/detail/parts";
import { peopleMathDimensi, peopleMathRadar } from "@/lib/profil-data";
import {
  peopleFactorsBenchmark,
  peopleFactorsDefs,
  peopleFactorsKpi,
  peopleFactorsNotes,
} from "@/lib/profil-detail";

export const metadata = {
  title: "People Factors — Rizky Putra — PTPN Group",
};

function statusFaktor(skor: number) {
  if (skor >= 88) return { label: "Kekuatan", tone: "green" as const };
  if (skor >= 85) return { label: "Solid", tone: "slate" as const };
  return { label: "Pantau", tone: "amber" as const };
}

/* Baris tabel diturunkan langsung dari data kartu People Factors
   supaya angka halaman detail selalu sama dengan kartunya. */
const rows = peopleMathDimensi
  .filter((d) => d.rincian.length > 0)
  .flatMap((d) =>
    d.rincian.map((r) => {
      const bench = peopleFactorsBenchmark[d.label] ?? 80;
      return { faktor: r.label, dimensi: d.label, skor: r.skor, bench, gap: r.skor - bench };
    })
  )
  .sort((a, b) => b.skor - a.skor);

export default function PeopleFactorsPage() {
  return (
    <div className="flex h-dvh min-w-0 overflow-hidden bg-[var(--bg-app)]">
      <SdmSidebar active="Profil Karyawan" />

      <main className="scroll-thin min-w-0 flex-1 overflow-y-auto">
        <SdmDetailHeader
          icon={<Sigma size={19} strokeWidth={1.9} />}
          title="People Factors — Rizky Putra"
          subtitle="Rincian seluruh derivative score People Math per dimensi, dibandingkan rata-rata kohort Person Grade G7"
          stat="People Math Score 87/100 · 7 faktor kekuatan · persentil P90"
          breadcrumb="Profil Karyawan / People Factors"
          backHref="/sdm-talenta/profil-karyawan"
          backLabel="Profil Karyawan"
        />

        <div className="flex flex-col gap-3 px-5 pb-5 pt-3">
          <DetailKpiStrip items={peopleFactorsKpi} />

          <div className="grid grid-cols-1 items-start gap-3 xl:grid-cols-[minmax(0,68fr)_minmax(0,32fr)]">
            <DetailTable
              title="Derivative Scores per Faktor"
              subtitle="Diurutkan dari skor tertinggi — angka identik dengan kartu People Factors"
              columns={[
                { key: "faktor", label: "Faktor", cellClass: "font-bold" },
                { key: "dimensi", label: "Dimensi" },
                { key: "skor", label: "Skor", align: "right", cellClass: "font-bold" },
                { key: "bench", label: "Rata-rata G7", align: "right" },
                { key: "gapCell", label: "Gap", align: "right" },
                { key: "statusPill", label: "Status", align: "center" },
              ]}
              rows={rows.map((r) => {
                const st = statusFaktor(r.skor);
                return {
                  ...r,
                  gapCell: (
                    <span className={r.gap >= 0 ? "font-bold text-ptpn-green" : "font-bold text-[#d98b06]"}>
                      {r.gap >= 0 ? `+${r.gap}` : r.gap}
                    </span>
                  ),
                  statusPill: <Pill label={st.label} tone={st.tone} />,
                };
              })}
              note="Skor 0–100 hasil agregasi mesin People Math; 6 dimensi pelengkap lainnya (avg 85) diringkas pada kartu profil dan tidak dirinci per faktor."
            />
            <div className="flex flex-col gap-3">
              <BarListCard
                title="Skor per Dimensi"
                subtitle="Delapan dimensi utama People Factors"
                rows={peopleMathRadar.map((d) => ({
                  label: d.label,
                  value: d.skor,
                  valueLabel: `${d.skor}`,
                  color: d.skor >= 88 ? "#1a9c5b" : d.skor >= 85 ? "#2f6fe4" : "#d98b06",
                }))}
                max={100}
                footer="Hijau ≥ 88 (kekuatan), biru 85–87 (solid), oranye < 85 (area pantau)."
              />
              <NotesPanel notes={peopleFactorsNotes} definitions={peopleFactorsDefs} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
