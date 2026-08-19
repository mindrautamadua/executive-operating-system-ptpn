import { SdmSidebar } from "@/components/sdm/SdmSidebar";
import { OrgHeader } from "@/components/org/OrgHeader";
import { RingkasanOrganisasi } from "@/components/org/RingkasanOrganisasi";
import { StrukturOrganisasi } from "@/components/org/StrukturOrganisasi";
import { DistribusiUnit } from "@/components/org/DistribusiUnit";
import { AnalisisJabatan } from "@/components/org/AnalisisJabatan";
import { JabatanKosongKritis } from "@/components/org/JabatanKosongKritis";
import { SpanOfControl } from "@/components/org/SpanOfControl";
import { TingkatOrganisasi } from "@/components/org/TingkatOrganisasi";
import { StatusPengisian } from "@/components/org/StatusPengisian";
import { PerubahanOrganisasi } from "@/components/org/PerubahanOrganisasi";
import { MappingJabatanKritis } from "@/components/org/MappingJabatanKritis";
import { OrgInsightAi } from "@/components/org/OrgInsightAi";
import { OrgHealthScore } from "@/components/org/OrgHealthScore";
import { LayerDensitas } from "@/components/org/LayerDensitas";
import { EfisiensiBiaya } from "@/components/org/EfisiensiBiaya";

export const metadata = { title: "Organisasi & Jabatan — PTPN Group" };

export default function OrganisasiJabatanPage() {
  return (
    <div className="flex h-dvh min-w-0 overflow-hidden bg-[var(--bg-app)]">
      <SdmSidebar
        active="Organisasi & Jabatan"
        assistantPlaceholder="Tanya tentang struktur organisasi, span of control, atau analisis jabatan..."
      />

      <main className="scroll-thin min-w-0 flex-1 overflow-y-auto">
        <OrgHeader />

        <div className="mx-5 mb-4 flex flex-col gap-3">
          <RingkasanOrganisasi />

          <div className="grid auto-rows-[minmax(378px,auto)] grid-cols-1 gap-3 lg:grid-cols-2 xl:grid-cols-[minmax(0,532fr)_minmax(0,375fr)_minmax(0,372fr)]">
            <StrukturOrganisasi />
            <DistribusiUnit />
            <div className="flex min-h-0 flex-col gap-3">
              <AnalisisJabatan />
              <JabatanKosongKritis />
            </div>
          </div>

          <div className="grid auto-rows-[minmax(232px,auto)] grid-cols-1 gap-3 lg:grid-cols-2 xl:grid-cols-[minmax(0,302fr)_minmax(0,270fr)_minmax(0,330fr)_minmax(0,372fr)]">
            <SpanOfControl />
            <TingkatOrganisasi />
            <StatusPengisian />
            <PerubahanOrganisasi />
          </div>

          <div className="grid auto-rows-[minmax(248px,auto)] grid-cols-1 gap-3 lg:grid-cols-2 xl:grid-cols-[minmax(0,452fr)_minmax(0,417fr)_minmax(0,420fr)]">
            <OrgHealthScore />
            <LayerDensitas />
            <EfisiensiBiaya />
          </div>

          <div className="grid auto-rows-[minmax(195px,auto)] grid-cols-1 gap-3 lg:grid-cols-2 xl:grid-cols-[minmax(0,917fr)_minmax(0,372fr)]">
            <MappingJabatanKritis />
            <OrgInsightAi />
          </div>
        </div>
      </main>
    </div>
  );
}
