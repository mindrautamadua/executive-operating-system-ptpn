import { Network } from "lucide-react";
import { Sidebar } from "@/components/Sidebar";
import { ModuleHeader } from "@/components/ui/ModuleHeader";
import { EnterpriseMapCanvas } from "@/components/em/EnterpriseMapCanvas";
import { STEMPEL_DATA } from "@/lib/group-baseline";

export const metadata = { title: "Enterprise Map — PTPN Group" };

/**
 * Enterprise Map: PTPN sebagai satu sistem penciptaan nilai. Bukan daftar
 * dashboard per fungsi, melainkan "how the enterprise works" — lingkungan
 * eksternal → strategi → kapital → operasi → produksi → pasar → pendapatan →
 * EBITDA → kas → value creation, dengan enabler dan control layer di
 * sepanjang rantai. Semua angka dari group-baseline; tiap node menaut ke
 * modul terkait.
 */
export default function EnterpriseMapPage() {
  return (
    <div className="flex h-dvh min-w-0 overflow-hidden bg-[var(--bg-app)]">
      <Sidebar />

      <main className="scroll-thin min-w-0 flex-1 overflow-y-auto">
        <ModuleHeader
          icon={<Network size={19} strokeWidth={1.9} />}
          title="Enterprise Map"
          subtitle="How the Enterprise Works — PTPN sebagai satu sistem penciptaan nilai"
          dataAsOf={`Data per ${STEMPEL_DATA.snapshot} (YTD)`}
        />

        <div className="px-5 pb-5 pt-3">
          <EnterpriseMapCanvas />
        </div>
      </main>
    </div>
  );
}
