import { RiskSidebar } from "@/components/risk/RiskSidebar";
import { DataTrustStrip } from "@/components/hc/DataTrustStrip";
import { AppetiteHeader } from "@/components/risk/risk-appetite/AppetiteHeader";
import { AppetiteKpiStrip } from "@/components/risk/risk-appetite/AppetiteKpiStrip";
import { AppetiteGaugeGrid } from "@/components/risk/risk-appetite/AppetiteGaugeGrid";
import { BreachLog } from "@/components/risk/risk-appetite/BreachLog";
import { LimitTrend } from "@/components/risk/risk-appetite/LimitTrend";
import { ToleranceMatrix } from "@/components/risk/risk-appetite/ToleranceMatrix";
import { EskalasiStatus } from "@/components/risk/risk-appetite/EskalasiStatus";
import { AppetiteInsight } from "@/components/risk/risk-appetite/AppetiteInsight";
import { riskDataTrust } from "@/lib/risk-data";

export const metadata = { title: "Risk Appetite & Limit — PTPN Group" };

export default function RiskAppetitePage() {
  return (
    <div className="flex h-dvh min-w-0 overflow-hidden bg-[var(--bg-app)]">
      <RiskSidebar active="Risk Appetite & Limit" />

      <main className="scroll-thin min-w-0 flex-1 overflow-y-auto">
        <AppetiteHeader />

        <div className="flex flex-col gap-3 px-5 pb-5">
          <div className="-mb-3">
            <DataTrustStrip data={riskDataTrust} />
          </div>

          <AppetiteKpiStrip />
          <AppetiteGaugeGrid />

          {/* Breach aktif & tren utilisasi */}
          <div className="grid auto-rows-[minmax(250px,auto)] grid-cols-1 gap-3 lg:grid-cols-2 xl:grid-cols-[minmax(0,60fr)_minmax(0,40fr)]">
            <BreachLog />
            <LimitTrend />
          </div>

          {/* Pernyataan appetite & jalur eskalasi */}
          <div className="grid auto-rows-[minmax(235px,auto)] grid-cols-1 gap-3 lg:grid-cols-2 xl:grid-cols-[minmax(0,58fr)_minmax(0,42fr)]">
            <ToleranceMatrix />
            <EskalasiStatus />
          </div>

          <AppetiteInsight />
        </div>
      </main>
    </div>
  );
}
