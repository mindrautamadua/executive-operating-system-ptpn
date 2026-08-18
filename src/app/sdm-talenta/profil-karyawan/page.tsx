import { SdmSidebar } from "@/components/sdm/SdmSidebar";
import { ProfilTopbar } from "@/components/profil/ProfilTopbar";
import { ProfilBody } from "@/components/profil/ProfilBody";

export const metadata = { title: "Talent Intelligence Profile — PTPN Group" };

export default function ProfilKaryawanPage() {
  return (
    <div className="flex h-dvh min-w-0 overflow-hidden bg-[var(--bg-app)]">
      <SdmSidebar
        spotlightCard
        updatedStamp
        back={{ href: "/sdm-talenta", label: "KEMBALI KE SDM & TALENTA" }}
      />

      <main className="scroll-thin min-w-0 flex-1 overflow-y-auto">
        <ProfilTopbar />
        <ProfilBody />
      </main>
    </div>
  );
}
