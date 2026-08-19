import { AppShell } from "@/components/AppShell";
import { DataTrustStrip } from "@/components/hc/DataTrustStrip";
import { coreDataTrust } from "@/lib/data";
import { KpiStrip } from "@/components/KpiStrip";
import { OperasionalCard } from "@/components/OperasionalCard";
import { KomoditasUtama } from "@/components/KomoditasUtama";
import { IndonesiaMap } from "@/components/IndonesiaMap";
import { KinerjaRegional } from "@/components/KinerjaRegional";
import { AlertPanel } from "@/components/AlertPanel";
import { InisiatifStrategis } from "@/components/InisiatifStrategis";
import { BeritaInformasi } from "@/components/BeritaInformasi";
import { TrendKeuangan } from "@/components/TrendKeuangan";
import { KomposisiPenjualan } from "@/components/KomposisiPenjualan";
import { KinerjaProduksi } from "@/components/KinerjaProduksi";
import { KinerjaSdm } from "@/components/KinerjaSdm";
import { KpiStrategis } from "@/components/KpiStrategis";
import { AnalitikPrediktif } from "@/components/AnalitikPrediktif";
import { AiInsight } from "@/components/AiInsight";
import { CeoMorningBrief } from "@/components/CeoMorningBrief";
import { CeoDecisionQueue } from "@/components/CeoDecisionQueue";
import { CeoValueCreation } from "@/components/CeoValueCreation";
import { EnterpriseRiskValue } from "@/components/EnterpriseRiskValue";
import { ExploreDisclosure } from "@/components/ExploreDisclosure";
import { PerformanceNarrative } from "@/components/PerformanceNarrative";
import { CpoMarketCard } from "@/components/CpoMarketCard";
import { ImpactChainCard } from "@/components/ImpactChainCard";
import { ExecutiveTension } from "@/components/ExecutiveTension";
import { BoardChallengeCard } from "@/components/BoardChallengeCard";
import { HomeViewSwitch } from "@/components/HomeViewSwitch";
import { DecisionPortfolioCard } from "@/components/stg/keputusan-bod/DecisionPortfolioCard";

/** Kepala seksi kecil bergaya HC ECC, memisahkan kelompok kartu. */
function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mb-2 mt-3 text-[10px] font-extrabold uppercase tracking-[0.05em] text-ink-900">
      {children}
    </h2>
  );
}

/**
 * Pita layer kognitif: menjawab "apa yang harus saya lihat dalam 30 detik
 * pertama?" secara eksplisit. Tiga layer — ACT (butuh keputusan/perhatian),
 * UNDERSTAND (mengapa angka bergerak), EXPLORE (intelijen mendalam) — supaya
 * kekayaan informasi homepage tidak berubah menjadi cognitive load.
 */
function LayerBand({
  n,
  code,
  question,
}: {
  n: number;
  code: string;
  question: string;
}) {
  return (
    <div className="mb-2 mt-4 flex items-center gap-2">
      <span className="rounded bg-[#1b3a6b] px-1.5 py-[2px] text-[9px] font-extrabold tracking-[0.06em] text-white">
        LAYER {n}
      </span>
      <h2 className="text-[10px] font-extrabold uppercase tracking-[0.05em] text-ink-900">
        {code}
      </h2>
      <span className="text-[9px] italic text-ink-500">{question}</span>
      <span className="h-px flex-1 bg-[#e3e9ef]" />
    </div>
  );
}

/** Grid Keputusan & Penciptaan Nilai — dipakai bersama view CEO & Fungsional. */
function DecisionValueGrid() {
  return (
    <div className="grid grid-cols-1 items-stretch gap-3 xl:grid-cols-[minmax(0,1fr)_330px]">
      <div
        className="anim-rise grid min-w-0 grid-cols-1 items-stretch gap-3 lg:grid-cols-2"
        style={{ "--d": "40ms" } as React.CSSProperties}
      >
        <CeoValueCreation />
        <EnterpriseRiskValue />
      </div>
      <div className="anim-rise min-w-0" style={{ "--d": "70ms" } as React.CSSProperties}>
        <CeoDecisionQueue />
      </div>
    </div>
  );
}

/**
 * MODE CEO — Act & Decide. Kompresi sinyal, bukan dashboard yang dikurangi:
 * hanya brief, keputusan/nilai/risiko, narasi, dan kontradiksi. Tidak ada
 * KPI grid, peta, atau kartu domain — itu pekerjaan mode Fungsional.
 */
function CeoHomeView() {
  return (
    <>
      <CeoMorningBrief />
      <SectionLabel>Keputusan &amp; Penciptaan Nilai</SectionLabel>
      <DecisionValueGrid />
      <PerformanceNarrative />
      <ExecutiveTension />
    </>
  );
}

/**
 * MODE KOMISARIS — Oversight & Challenge. Bukan daftar tugas melainkan
 * daftar ujian: kontradiksi, pertanyaan pengawasan per isu, risiko, antrian
 * keputusan (dengan biaya delay), dan portofolio keputusan (janji vs
 * realisasi manajemen).
 */
function BoardHomeView() {
  return (
    <>
      <ExecutiveTension />
      <div className="mt-3">
        <BoardChallengeCard />
      </div>
      <SectionLabel>Nilai, Risiko &amp; Keputusan yang Diawasi</SectionLabel>
      <DecisionValueGrid />
      <div className="mt-3 grid grid-cols-1 items-stretch gap-3 lg:grid-cols-2 xl:grid-cols-[minmax(0,40fr)_minmax(0,60fr)]">
        <div className="anim-rise min-h-[280px]" style={{ "--d": "120ms" } as React.CSSProperties}>
          <DecisionPortfolioCard />
        </div>
        <div className="anim-rise min-h-[280px]" style={{ "--d": "150ms" } as React.CSSProperties}>
          <ImpactChainCard />
        </div>
      </div>
    </>
  );
}

/**
 * MODE FUNGSIONAL — Analyze & Execute. Arsitektur lengkap tiga layer
 * kognitif (ACT → UNDERSTAND → EXPLORE) dengan seluruh kartu domain.
 */
function FullHomeView() {
  return (
    <>
      <LayerBand n={1} code="Act" question="Apa yang butuh perhatian & keputusan saya sekarang?" />
      <CeoMorningBrief />

      <SectionLabel>Keputusan &amp; Penciptaan Nilai</SectionLabel>
      <DecisionValueGrid />

      <LayerBand n={2} code="Understand" question="Mengapa angka bergerak?" />
      <SectionLabel>Key Strategic KPI</SectionLabel>
      <KpiStrip />
      <PerformanceNarrative />
      <ExecutiveTension />
      <div
        className="anim-rise mt-3 grid grid-cols-1 items-stretch gap-3 lg:grid-cols-2 xl:grid-cols-[minmax(0,58fr)_minmax(0,42fr)]"
        style={{ "--d": "60ms" } as React.CSSProperties}
      >
        <IndonesiaMap />
        <KinerjaRegional />
      </div>

      <ExploreDisclosure>
        <div className="grid grid-cols-1 items-start gap-3 xl:grid-cols-[minmax(0,1fr)_330px]">
          {/* kolom utama */}
          <div className="flex min-w-0 flex-col gap-3">
            <div className="anim-rise min-h-[92px]" style={{ "--d": "100ms" } as React.CSSProperties}>
              <ImpactChainCard />
            </div>

            <div
              className="anim-rise grid grid-cols-1 items-stretch gap-3 md:grid-cols-2 xl:grid-cols-3"
              style={{ "--d": "120ms" } as React.CSSProperties}
            >
              <OperasionalCard />
              <KomoditasUtama />
              <KinerjaSdm />
            </div>

            <div
              className="anim-rise grid auto-rows-[minmax(248px,auto)] grid-cols-1 gap-3 lg:grid-cols-2 xl:grid-cols-[minmax(0,40fr)_minmax(0,30fr)_minmax(0,30fr)]"
              style={{ "--d": "180ms" } as React.CSSProperties}
            >
              <TrendKeuangan />
              <KomposisiPenjualan />
              <KinerjaProduksi />
            </div>

            <div
              className="anim-rise grid auto-rows-[minmax(150px,auto)] grid-cols-1 gap-3 lg:grid-cols-2 xl:grid-cols-[minmax(0,40fr)_minmax(0,34fr)_minmax(0,26fr)]"
              style={{ "--d": "240ms" } as React.CSSProperties}
            >
              <KpiStrategis />
              <AnalitikPrediktif />
              <CpoMarketCard />
            </div>
          </div>

          {/* rail kanan */}
          <div className="flex min-w-0 flex-col gap-3">
            <div className="anim-rise" style={{ "--d": "90ms" } as React.CSSProperties}>
              <AlertPanel />
            </div>
            <div className="anim-rise" style={{ "--d": "150ms" } as React.CSSProperties}>
              <InisiatifStrategis />
            </div>
            <div className="anim-rise" style={{ "--d": "210ms" } as React.CSSProperties}>
              <BeritaInformasi />
            </div>
            <div
              className="anim-rise min-h-[170px] flex-1"
              style={{ "--d": "270ms" } as React.CSSProperties}
            >
              <AiInsight />
            </div>
          </div>
        </div>
      </ExploreDisclosure>
    </>
  );
}

/**
 * Dashboard utama dengan tiga arsitektur informasi mengikuti mode navigasi
 * sidebar: CEO (kompresi sinyal — what should I know), Fungsional (tiga layer
 * kognitif lengkap — what should I analyze), Komisaris (oversight & challenge
 * — did management deliver). Ketiga view dirender server-side; pemilihan di
 * client via HomeViewSwitch, kerangka tetap Tipe A (HC ECC).
 */
export default function Page() {
  return (
    <AppShell>
      <div className="px-5 pb-5">
        <DataTrustStrip data={coreDataTrust} />
        <HomeViewSwitch
          ceo={<CeoHomeView />}
          fungsional={<FullHomeView />}
          komisaris={<BoardHomeView />}
        />
      </div>
    </AppShell>
  );
}
