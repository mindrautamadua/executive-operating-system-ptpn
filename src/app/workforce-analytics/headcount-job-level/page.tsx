import { Layers } from "lucide-react";
import { SdmSidebar } from "@/components/sdm/SdmSidebar";
import { DetailHeader } from "@/components/wa/detail/DetailHeader";
import { BarListCard, DetailKpiStrip, DetailTable, NotesPanel } from "@/components/wa/detail/parts";
import { LevelStructureChart } from "@/components/wa/detail/LevelStructureChart";
import {
  komposisiDefinitions,
  levelKpi,
  levelNotes,
  levelRows,
} from "@/lib/wa-detail-komposisi";

export const metadata = { title: "Headcount by Job Level — Workforce Analytics — PTPN Group" };

const num = (v: number) => v.toLocaleString("id-ID");
const dec = (v: number) => v.toString().replace(".", ",");

export default function HeadcountJobLevelPage() {
  return (
    <div className="flex h-dvh min-w-0 overflow-hidden bg-[var(--bg-app)]">
      <SdmSidebar active="Workforce Analytics" />

      <main className="scroll-thin min-w-0 flex-1 overflow-y-auto">
        <DetailHeader
          icon={<Layers size={19} strokeWidth={1.9} />}
          title="Headcount by Job Level"
          subtitle="Bentuk struktur organisasi — sebaran lapis jabatan, rentang kendali, biaya, dan kesiapan suksesor"
          stat="70.142 pekerja · 6 lapis · 575 posisi vakan"
          breadcrumb="Headcount by Job Level"
        />

        <div className="flex flex-col gap-3 px-5 pb-5 pt-3">
          <DetailKpiStrip items={levelKpi} />

          <div className="grid auto-rows-[260px] grid-cols-1 gap-3 lg:grid-cols-2 xl:grid-cols-[minmax(0,40fr)_minmax(0,30fr)_minmax(0,30fr)]">
            <LevelStructureChart />
            <BarListCard
              title="Perempuan per Lapis Jabatan"
              subtitle="Porsi perempuan (%) di tiap lapis"
              delay={80}
              max={35}
              rows={levelRows.map((l) => ({
                label: l.name,
                value: l.female,
                valueLabel: `${dec(l.female)}%`,
                color: l.female >= 25 ? "#1a9c5b" : l.female >= 18 ? "#f5a524" : "#ef4444",
              }))}
              footer="Porsi menyusut lebih dari separuh dari Staff (29,4%) ke Direktur & SVP (12,1%)."
            />
            <BarListCard
              title="Posisi Vakan per Lapis"
              subtitle="Jumlah posisi kosong per 31 Mei 2026"
              delay={120}
              rows={levelRows.map((l) => ({
                label: l.name,
                value: l.vacancy,
                note: l.readiness > 0 ? `siap ${l.readiness}%` : "—",
                color: l.readiness > 0 && l.readiness < 50 ? "#ef4444" : "#3b7ded",
              }))}
              footer="119 dari 575 vakansi berada di lapis Manager ke atas dan sudah lewat 90 hari."
            />
          </div>

          <div className="grid grid-cols-1 items-start gap-3 xl:grid-cols-[minmax(0,1fr)_248px]">
            <DetailTable
              title="Profil Lapis Jabatan"
              subtitle="Ukuran, demografi, biaya, dan kesiapan suksesor per lapis"
              columns={[
                { key: "name", label: "Lapis Jabatan", cellClass: "font-semibold text-ink-900" },
                { key: "headcount", label: "Headcount", align: "right" },
                { key: "pct", label: "% Grup", align: "right" },
                { key: "span", label: "Span of Control", align: "right" },
                { key: "age", label: "Usia Rata-rata", align: "right" },
                { key: "tenure", label: "Tenure", align: "right" },
                { key: "female", label: "Perempuan", align: "right" },
                { key: "cost", label: "Biaya/Bulan (Rp jt)", align: "right" },
                { key: "vacancy", label: "Vakan", align: "right" },
                { key: "readiness", label: "Kesiapan Suksesor", align: "right" },
              ]}
              rows={levelRows.map((l) => ({
                name: l.name,
                headcount: num(l.headcount),
                pct: `${dec(l.pct)}%`,
                span: l.span === 0 ? "—" : `${dec(l.span)}x`,
                age: `${dec(l.age)} thn`,
                tenure: `${dec(l.tenure)} thn`,
                female: `${dec(l.female)}%`,
                cost: dec(l.cost),
                vacancy: l.vacancy,
                readiness:
                  l.readiness === 0 ? (
                    "—"
                  ) : (
                    <span className={l.readiness < 50 ? "font-bold text-[#ef4444]" : "font-bold text-ptpn-green"}>
                      {l.readiness}%
                    </span>
                  ),
              }))}
              footerRow={{
                name: "Total Grup",
                headcount: num(levelRows.reduce((s, l) => s + l.headcount, 0)),
                pct: "100%",
                span: "7,1x",
                age: "38,4 thn",
                tenure: "9,8 thn",
                female: "27,0%",
                cost: "7,6",
                vacancy: levelRows.reduce((s, l) => s + l.vacancy, 0),
                readiness: "48%",
              }}
              note="Kesiapan suksesor hanya dihitung untuk posisi Supervisor ke atas yang masuk peta suksesi."
            />
            <NotesPanel notes={levelNotes} definitions={komposisiDefinitions} />
          </div>
        </div>
      </main>
    </div>
  );
}
