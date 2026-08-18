import { ArrowLeftRight } from "lucide-react";
import { SdmSidebar } from "@/components/sdm/SdmSidebar";
import { SdmDetailHeader } from "@/components/sdm/SdmDetailHeader";
import { Pill } from "@/components/ti/detail/parts";
import { DetailKpiStrip, DetailTable, NotesPanel } from "@/components/wa/detail/parts";
import { mutasiDefs, mutasiKpi, mutasiNotes, mutasiRows } from "@/lib/profil-detail";

export const metadata = {
  title: "Mutasi & Penugasan — Rizky Putra — PTPN Group",
};

export default function ProfilMutasiPage() {
  return (
    <div className="flex h-dvh min-w-0 overflow-hidden bg-[var(--bg-app)]">
      <SdmSidebar active="Profil Karyawan" />

      <main className="scroll-thin min-w-0 flex-1 overflow-y-auto">
        <SdmDetailHeader
          icon={<ArrowLeftRight size={19} strokeWidth={1.9} />}
          title="Mutasi & Penugasan — Rizky Putra"
          subtitle="Registri lengkap SK mutasi penempatan dan penugasan khusus di luar tugas pokok jabatan"
          stat="3 mutasi · 4 penugasan khusus · 2 penugasan aktif"
          breadcrumb="Profil Karyawan / Mutasi & Penugasan"
          backHref="/sdm-talenta/profil-karyawan"
          backLabel="Profil Karyawan"
        />

        <div className="flex flex-col gap-3 px-5 pb-5 pt-3">
          <DetailKpiStrip items={mutasiKpi} />

          <div className="grid grid-cols-1 items-start gap-3 xl:grid-cols-[minmax(0,68fr)_minmax(0,32fr)]">
            <DetailTable
              title="Registri Mutasi & Penugasan"
              subtitle="7 entri — diurutkan dari terbaru, seluruhnya berbasis SK"
              columns={[
                { key: "jenisPill", label: "Jenis", align: "center" },
                { key: "deskripsi", label: "Deskripsi", cellClass: "font-bold" },
                { key: "peran", label: "Peran / Unit" },
                { key: "periode", label: "Periode", align: "right" },
                { key: "statusPill", label: "Status", align: "center" },
                { key: "sk", label: "No. SK" },
              ]}
              rows={mutasiRows.map((r) => ({
                ...r,
                jenisPill: (
                  <Pill label={r.jenis} tone={r.jenis === "Mutasi" ? "slate" : "green"} />
                ),
                statusPill: (
                  <Pill
                    label={r.status}
                    tone={r.status === "Berjalan" ? "amber" : "slate"}
                  />
                ),
              }))}
              note="Mutasi = perpindahan penempatan/jabatan; penugasan = tugas tambahan berbasis SK tim/proyek."
            />
            <NotesPanel notes={mutasiNotes} definitions={mutasiDefs} />
          </div>
        </div>
      </main>
    </div>
  );
}
