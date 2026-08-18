"use client";

import { useState } from "react";
import { ProfilHero } from "./ProfilHero";
import { ProfilTabs } from "./ProfilTabs";
import { RingkasanKinerja } from "./RingkasanKinerja";
import { InformasiJabatan } from "./InformasiJabatan";
import { TalentPotential } from "./TalentPotential";
import { KompetensiUtama } from "./KompetensiUtama";
import { PelatihanSertifikasi } from "./PelatihanSertifikasi";
import { RiwayatPendidikan } from "./RiwayatPendidikan";
import { RiwayatJabatan } from "./RiwayatJabatan";
import { Penghargaan } from "./Penghargaan";
import { TalentRiskCard } from "./TalentRiskCard";
import { RekomendasiHcCard } from "./RekomendasiHcCard";
import { PerformanceTrajectoryCard } from "./PerformanceTrajectoryCard";
import { CareerVelocityCard } from "./CareerVelocityCard";
import { PeopleIntelligenceCard } from "./PeopleIntelligenceCard";
import { JobProfileCard } from "./JobProfileCard";
import { BusinessImpactCard } from "./BusinessImpactCard";
import { AspirasiMobilitasCard } from "./AspirasiMobilitasCard";
import { BackfillCard } from "./BackfillCard";
import { KepatuhanCard } from "./KepatuhanCard";
import { EngagementWellbeingCard } from "./EngagementWellbeingCard";
import { KompensasiPosisiCard } from "./KompensasiPosisiCard";
import { TalentReviewCard } from "./TalentReviewCard";
import { MentorSponsorCard } from "./MentorSponsorCard";
import { Feedback360Card } from "./Feedback360Card";
import { DecisionScenarioCard } from "./DecisionScenarioCard";
import { DeltaReviewCard } from "./DeltaReviewCard";
import { CostOfLossCard } from "./CostOfLossCard";
import { TabInformasiPribadi } from "./tabs/TabInformasiPribadi";
import { TabPekerjaan } from "./tabs/TabPekerjaan";
import { TabKinerja } from "./tabs/TabKinerja";
import { TabKompetensi } from "./tabs/TabKompetensi";
import { TabPengembangan } from "./tabs/TabPengembangan";
import { TabPeopleMath } from "./tabs/TabPeopleMath";
import { TabHpiBem } from "./tabs/TabHpiBem";
import { TabRiwayat } from "./tabs/TabRiwayat";
import { TabDokumen } from "./tabs/TabDokumen";

/** Label seksi di dalam domain gabungan (evidence layer). */
function DomainSection({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mb-2 mt-4 text-[10px] font-extrabold uppercase tracking-[0.06em] text-ink-500 first:mt-0">
      {children}
    </h2>
  );
}

/* ── 01 Executive Overview — lapisan keputusan, ringkas ──── */

function ExecutiveOverview() {
  return (
    <div className="space-y-3">
      <div className="grid grid-cols-[minmax(0,320fr)_minmax(0,300fr)_minmax(0,440fr)] gap-3">
        <RingkasanKinerja />
        <InformasiJabatan />
        <TalentPotential />
      </div>
      <div className="grid grid-cols-[minmax(0,400fr)_minmax(0,340fr)_minmax(0,320fr)] gap-3">
        <PerformanceTrajectoryCard />
        <TalentRiskCard />
        <DeltaReviewCard />
      </div>
      <div className="grid grid-cols-[minmax(0,720fr)_minmax(0,340fr)] gap-3">
        <DecisionScenarioCard />
        <CostOfLossCard />
      </div>
      <div className="grid grid-cols-[minmax(0,560fr)_minmax(0,500fr)] gap-3">
        <PeopleIntelligenceCard />
        <RekomendasiHcCard />
      </div>
    </div>
  );
}

/* ── 02 Performance & Capability ─────────────────────────── */

function PerformanceCapability() {
  return (
    <div className="space-y-3">
      <div className="grid grid-cols-[minmax(0,640fr)_minmax(0,420fr)] gap-3">
        <BusinessImpactCard />
        <KompetensiUtama />
      </div>
      <Feedback360Card />
      <DomainSection>Detail Kinerja</DomainSection>
      <TabKinerja />
      <DomainSection>Detail Kompetensi</DomainSection>
      <TabKompetensi />
    </div>
  );
}

/* ── 03 People Intelligence ──────────────────────────────── */

function PeopleIntelligenceDomain() {
  return (
    <div className="space-y-3">
      <DomainSection>People Math</DomainSection>
      <TabPeopleMath />
      <DomainSection>HPI BEM</DomainSection>
      <TabHpiBem />
    </div>
  );
}

/* ── 04 Career & Succession ──────────────────────────────── */

function CareerSuccession() {
  return (
    <div className="space-y-3">
      <div className="grid grid-cols-[minmax(0,420fr)_minmax(0,320fr)_minmax(0,340fr)] gap-3">
        <RiwayatJabatan />
        <CareerVelocityCard />
        <AspirasiMobilitasCard />
      </div>
      <JobProfileCard />
      <div className="grid grid-cols-[minmax(0,600fr)_minmax(0,460fr)] gap-3">
        <TalentReviewCard />
        <BackfillCard />
      </div>
      <div className="grid grid-cols-[minmax(0,380fr)_minmax(0,340fr)_minmax(0,340fr)] gap-3">
        <KepatuhanCard />
        <EngagementWellbeingCard />
        <KompensasiPosisiCard />
      </div>
    </div>
  );
}

/* ── 05 Development ──────────────────────────────────────── */

function Development() {
  return (
    <div className="space-y-3">
      <div className="grid grid-cols-[minmax(0,540fr)_minmax(0,520fr)] gap-3">
        <PelatihanSertifikasi />
        <MentorSponsorCard />
      </div>
      <DomainSection>Rencana &amp; Riwayat Pengembangan</DomainSection>
      <TabPengembangan />
    </div>
  );
}

/* ── 06 Records — arsip administratif ────────────────────── */

function Records() {
  return (
    <div className="space-y-3">
      <div className="grid grid-cols-[minmax(0,540fr)_minmax(0,520fr)] gap-3">
        <RiwayatPendidikan />
        <Penghargaan />
      </div>
      <DomainSection>Informasi Pribadi</DomainSection>
      <TabInformasiPribadi />
      <DomainSection>Pekerjaan</DomainSection>
      <TabPekerjaan />
      <DomainSection>Riwayat Kepegawaian</DomainSection>
      <TabRiwayat />
      <DomainSection>Dokumen</DomainSection>
      <TabDokumen />
    </div>
  );
}

const CONTENT: Record<string, () => React.ReactElement> = {
  "Executive Overview": ExecutiveOverview,
  "Performance & Capability": PerformanceCapability,
  "People Intelligence": PeopleIntelligenceDomain,
  "Career & Succession": CareerSuccession,
  Development,
  Records,
};

export function ProfilBody() {
  const [active, setActive] = useState("Executive Overview");
  const Active = CONTENT[active] ?? ExecutiveOverview;

  return (
    <div className="mx-5 mb-4 space-y-3">
      <div className="card">
        <ProfilHero />
        <ProfilTabs active={active} onChange={setActive} />
      </div>
      {/* key memaksa re-mount agar konten tab masuk dengan fade */}
      <div key={active} className="anim-fade" style={{ "--d": "0ms" } as React.CSSProperties}>
        <Active />
      </div>
    </div>
  );
}
