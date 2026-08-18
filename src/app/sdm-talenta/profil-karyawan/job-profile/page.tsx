import { BriefcaseBusiness } from "lucide-react";
import { SdmSidebar } from "@/components/sdm/SdmSidebar";
import { SdmDetailHeader } from "@/components/sdm/SdmDetailHeader";
import { Pill } from "@/components/ti/detail/parts";
import { DetailKpiStrip, DetailTable, NotesPanel } from "@/components/wa/detail/parts";
import { jobProfile } from "@/lib/profil-data";
import {
  jobProfileDefs,
  jobProfileKpi,
  jobProfileNotes,
  targetRoleRows,
} from "@/lib/profil-detail";

export const metadata = {
  title: "Job Profile — Rizky Putra — PTPN Group",
};

const STATUS_TONE = { Terpenuhi: "green", Proses: "amber", Belum: "red" } as const;

export default function JobProfilePage() {
  return (
    <div className="flex h-dvh min-w-0 overflow-hidden bg-[var(--bg-app)]">
      <SdmSidebar active="Profil Karyawan" />

      <main className="scroll-thin min-w-0 flex-1 overflow-y-auto">
        <SdmDetailHeader
          icon={<BriefcaseBusiness size={19} strokeWidth={1.9} />}
          title="Job Profile — Rizky Putra"
          subtitle="Tuntutan jabatan saat ini (Asisten Afdeling) dan kesiapan terhadap syarat jabatan target (Afdeling Manager)"
          stat="Role Fit 94% · Fit jabatan target 92% · 5 dari 8 syarat target terpenuhi"
          breadcrumb="Profil Karyawan / Job Profile"
          backHref="/sdm-talenta/profil-karyawan"
          backLabel="Profil Karyawan"
        />

        <div className="flex flex-col gap-3 px-5 pb-5 pt-3">
          <DetailKpiStrip items={jobProfileKpi} />

          <div className="grid grid-cols-1 items-start gap-3 xl:grid-cols-[minmax(0,68fr)_minmax(0,32fr)]">
            <div className="flex min-w-0 flex-col gap-3">
              <DetailTable
                title="Jabatan Saat Ini — Akuntabilitas & Penguasaan"
                subtitle={`${jobProfile.peran} · ${jobProfile.tujuan}`}
                columns={[
                  { key: "label", label: "Akuntabilitas Utama", cellClass: "font-bold" },
                  { key: "statusPill", label: "Penguasaan", align: "center" },
                ]}
                rows={jobProfile.akuntabilitas.map((a) => ({
                  label: a.label,
                  statusPill: (
                    <Pill
                      label={a.status}
                      tone={a.status === "Dikuasai" ? "green" : "amber"}
                    />
                  ),
                }))}
                note="Akuntabilitas dari kamus jabatan PTPN; penguasaan dinilai atasan langsung pada siklus 2025."
              />
              <DetailTable
                title="Jabatan Target — Syarat Afdeling Manager"
                subtitle="8 syarat profil suksesi, dasar angka Succession Fit 92%"
                columns={[
                  { key: "syarat", label: "Syarat", cellClass: "font-bold" },
                  { key: "kategori", label: "Kategori" },
                  { key: "statusPill", label: "Status", align: "center" },
                  { key: "keterangan", label: "Keterangan" },
                ]}
                rows={targetRoleRows.map((r) => ({
                  ...r,
                  statusPill: (
                    <Pill
                      label={r.status}
                      tone={STATUS_TONE[r.status as keyof typeof STATUS_TONE]}
                    />
                  ),
                }))}
                note="Syarat berstatus Proses/Belum seluruhnya sudah punya rencana tindak lanjut pada IDP dan rencana suksesi."
              />
            </div>
            <NotesPanel notes={jobProfileNotes} definitions={jobProfileDefs} />
          </div>
        </div>
      </main>
    </div>
  );
}
