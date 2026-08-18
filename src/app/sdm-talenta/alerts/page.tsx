import { BellRing } from "lucide-react";
import { SdmSidebar } from "@/components/sdm/SdmSidebar";
import { SdmDetailHeader } from "@/components/sdm/SdmDetailHeader";
import { Pill } from "@/components/ti/detail/parts";
import { BarListCard, DetailKpiStrip, DetailTable, NotesPanel } from "@/components/wa/detail/parts";
import {
  alertByCategory,
  alertDefinitions,
  alertKpi,
  alertNotes,
  alertRows,
} from "@/lib/sdm-detail";

export const metadata = {
  title: "Alerts & Notifications — SDM & Talenta — PTPN Group",
};

const LEVEL_TONE = { Kritikal: "red", Perhatian: "amber", Informasi: "slate" } as const;

export default function AlertsPage() {
  return (
    <div className="flex h-dvh min-w-0 overflow-hidden bg-[var(--bg-app)]">
      <SdmSidebar active="Executive Overview" />

      <main className="scroll-thin min-w-0 flex-1 overflow-y-auto">
        <SdmDetailHeader
          icon={<BellRing size={19} strokeWidth={1.9} />}
          title="Alerts & Notifications"
          subtitle="Register seluruh alert people & talent yang aktif — setiap alert membawa ambang, nilai aktual, dan pemilik tindak lanjut"
          stat="12 alert aktif · 3 kritikal · median usia 2,4 hari"
          breadcrumb="Alerts & Notifications"
        />

        <div className="flex flex-col gap-3 px-5 pb-5 pt-3">
          <DetailKpiStrip items={alertKpi} />

          <div className="grid grid-cols-1 items-start gap-3 lg:grid-cols-2 xl:grid-cols-[minmax(0,68fr)_minmax(0,32fr)]">
            <DetailTable
              title="Register Alert Aktif"
              subtitle="12 alert — angka yang sama dengan lencana notifikasi di header"
              columns={[
                { key: "waktu", label: "Dipicu" },
                { key: "kategori", label: "Kategori" },
                { key: "judul", label: "Alert", cellClass: "font-bold" },
                { key: "detail", label: "Detail" },
                { key: "cakupan", label: "Cakupan" },
                { key: "ambang", label: "Ambang", align: "right" },
                { key: "aktual", label: "Aktual", align: "right", cellClass: "font-bold" },
                { key: "pemilik", label: "Pemilik" },
                { key: "tingkatPill", label: "Tingkat", align: "center" },
              ]}
              rows={alertRows.map((r) => ({
                ...r,
                tingkatPill: <Pill label={r.tingkat} tone={LEVEL_TONE[r.tingkat]} />,
              }))}
              note="Alert dipicu mesin ambang dari HRIS & Talent Management System; kolom ambang dan aktual membuat setiap alert bisa diverifikasi, bukan notifikasi naratif."
            />
            <div className="flex flex-col gap-3">
              <BarListCard
                title="Alert per Kategori"
                subtitle="12 alert aktif dikelompokkan"
                rows={alertByCategory}
                delay={80}
                footer="Empat alert bermuara pada suksesi & talenta — akar yang sama dengan item DC-26-014 di BOD Decision Center."
              />
            </div>
          </div>

          <div className="grid grid-cols-1 items-start gap-3 xl:grid-cols-[minmax(0,1fr)_330px]">
            <div className="card anim-rise px-4 pb-3.5 pt-3" style={{ "--d": "120ms" } as React.CSSProperties}>
              <h3 className="text-[10px] font-extrabold uppercase tracking-[0.05em] text-ink-900">
                Pembacaan Eksekutif
              </h3>
              <p className="mt-2 text-[9.5px] leading-[1.6] text-ink-700">
                Dua belas alert aktif, tetapi hanya satu klaster yang genting:{" "}
                <span className="font-bold text-[#ef4444]">suksesi</span>. Turnover Regional 2
                (7,8% vs ambang 6,5%), 12 posisi kritikal tanpa suksesor, dan 5 posisi yang
                kosong dalam 90 hari adalah satu cerita yang sama — kehilangan orang lebih
                cepat daripada menyiapkan penggantinya. Ketiganya sudah dieskalasi sebagai
                satu item keputusan (DC-26-014). Sisanya terkendali: median usia alert 2,4
                hari, jauh di bawah SLA 5 hari.
              </p>
            </div>
            <NotesPanel notes={alertNotes} definitions={alertDefinitions} />
          </div>
        </div>
      </main>
    </div>
  );
}
