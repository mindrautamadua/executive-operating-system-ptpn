import { ListChecks } from "lucide-react";
import { SdmSidebar } from "@/components/sdm/SdmSidebar";
import { SuksesiDetailHeader } from "@/components/succession/detail/SuksesiDetailHeader";
import { ProgressListCard } from "@/components/succession/detail/parts";
import { TiTrendCard } from "@/components/ti/detail/charts";
import { Pill } from "@/components/ti/detail/parts";
import { DetailKpiStrip, DetailTable, NotesPanel } from "@/components/wa/detail/parts";
import { PALETTE } from "@/lib/chart-palette";
import {
  aksiBars,
  aksiDefinitions,
  aksiKpi,
  aksiNotes,
  aksiRows,
  aksiTrend,
} from "@/lib/succession-detail";

export const metadata = { title: "Rencana Aksi Suksesi — Succession Planning — PTPN Group" };

export default function RencanaAksiDetailPage() {
  return (
    <div className="flex h-dvh min-w-0 overflow-hidden bg-[var(--bg-app)]">
      <SdmSidebar active="Succession" />

      <main className="scroll-thin min-w-0 flex-1 overflow-y-auto">
        <SuksesiDetailHeader
          icon={<ListChecks size={19} strokeWidth={1.9} />}
          title="Rencana Aksi Suksesi"
          subtitle="Lima inisiatif program suksesi 2026: progres terhadap target, efektivitas terhadap kesiapan kandidat, dan hambatan yang menahan eksekusi"
          stat="Rata-rata progres 75,4% · 2 inisiatif tersendat"
          breadcrumb="Rencana Aksi"
        />

        <div className="flex flex-col gap-3 px-5 pb-5 pt-3">
          <DetailKpiStrip items={aksiKpi} />

          <div className="grid auto-rows-[254px] grid-cols-1 gap-3 lg:grid-cols-2 xl:grid-cols-[minmax(0,38fr)_minmax(0,62fr)]">
            <ProgressListCard
              title="Progres Inisiatif terhadap Target"
              subtitle="Warna bar mengikuti kesehatan program"
              rows={aksiBars}
              footer="Hijau = on track, kuning = at risk, merah = behind. Job Rotation dan Mentoring sama-sama tertahan di 62%."
            />
            <TiTrendCard
              title="Kurva Progres Bulanan"
              subtitle="Persentase penyelesaian tiap inisiatif"
              data={aksiTrend}
              delay={80}
              domain={[20, 100]}
              unit="%"
              series={[
                { key: "identifikasi", label: "Identifikasi Talent Kritis", color: PALETTE.green },
                { key: "assessment", label: "Assessment Center", color: PALETTE.blue },
                { key: "pengembangan", label: "Pengembangan Talent", color: PALETTE.teal },
                { key: "rotasi", label: "Job Rotation", color: PALETTE.amber },
                { key: "mentoring", label: "Mentoring Program", color: PALETTE.red },
              ]}
              footer="Job Rotation dan Mentoring melandai sejak April; keduanya berbagi hambatan yang sama — ketersediaan orang, bukan anggaran."
            />
          </div>

          <div className="grid grid-cols-1 items-start gap-3 xl:grid-cols-[minmax(0,1fr)_248px]">
            <DetailTable
              title="Rincian Inisiatif Suksesi"
              subtitle="Target, realisasi, efektivitas, pemilik, dan hambatan eksekusi"
              columns={[
                { key: "inisiatif", label: "Inisiatif", cellClass: "font-semibold text-ink-900" },
                { key: "target", label: "Target" },
                { key: "realisasi", label: "Realisasi" },
                { key: "progress", label: "Progres", align: "right" },
                { key: "uplift", label: "Uplift Readiness", align: "right" },
                { key: "deltaWaktu", label: "Percepatan", align: "right" },
                { key: "pemilik", label: "Pemilik" },
                { key: "tenggat", label: "Tenggat" },
                { key: "status", label: "Status" },
                { key: "hambatan", label: "Hambatan Utama" },
              ]}
              rows={aksiRows.map((r) => ({
                inisiatif: r.inisiatif,
                target: r.target,
                realisasi: r.realisasi,
                progress: (
                  <span
                    className={
                      r.kesehatan === "on-track"
                        ? "font-bold text-ptpn-green"
                        : r.kesehatan === "at-risk"
                          ? "font-bold text-[#d98b06]"
                          : "font-bold text-[#ef4444]"
                    }
                  >
                    {r.progress}%
                  </span>
                ),
                uplift: <span className="font-bold text-ptpn-green">{r.uplift}</span>,
                deltaWaktu: r.deltaWaktu,
                pemilik: r.pemilik,
                tenggat: r.tenggat,
                status: (
                  <Pill
                    label={r.kesehatan === "on-track" ? "On Track" : r.kesehatan === "at-risk" ? "At Risk" : "Behind"}
                    tone={r.kesehatan === "on-track" ? "green" : r.kesehatan === "at-risk" ? "amber" : "red"}
                  />
                ),
                hambatan: r.hambatan,
              }))}
              footerRow={{
                inisiatif: "5 Inisiatif",
                target: "1.050 slot peserta",
                realisasi: "771 peserta",
                progress: "75,4%",
                uplift: "+7,5 pts",
                deltaWaktu: "−2,5 bln",
                pemilik: "Direktur SDM Holding",
                tenggat: "Des 2026",
                status: "3 On Track",
                hambatan: "Ketersediaan talenta & mentor, bukan anggaran",
              }}
              note="Uplift readiness dihitung hanya untuk peserta yang menyelesaikan program; inisiatif Identifikasi Talent Kritis tidak memiliki uplift karena sifatnya pemetaan, bukan pengembangan."
            />
            <NotesPanel notes={aksiNotes} definitions={aksiDefinitions} />
          </div>
        </div>
      </main>
    </div>
  );
}
