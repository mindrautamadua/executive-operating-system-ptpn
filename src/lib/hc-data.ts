import { BASELINE_TRUST, KEUANGAN, RKAP_YTD, SDM } from "./group-baseline";
import type { DimensionDataTrust } from "./dimension-menu";
/**
 * Data statis halaman HC Executive Operating System (/sdm-talenta).
 * Periode acuan: Mei 2026 (YTD). Metrik yang dikutip lintas halaman
 * (produktivitas, turnover, engagement) diturunkan dari group-baseline —
 * satu definisi, satu formula, satu angka di semua halaman.
 */

/** Format angka gaya Indonesia dengan 1 desimal. */
const id1 = (n: number) => n.toLocaleString("id-ID", { maximumFractionDigits: 1 });

/** Pendapatan per karyawan YTD (Rp juta) — formula sama dengan dashboard "/". */
const pendapatanPerKaryawanJt = (KEUANGAN.pendapatanYtd * 1_000_000) / SDM.karyawanAktif;
const rkapPendapatanPerKaryawanJt = (RKAP_YTD.pendapatanRpT * 1_000_000) / SDM.karyawanAktif;
const ebitdaPerKaryawanJt = (KEUANGAN.ebitdaYtd * 1_000_000) / SDM.karyawanAktif;
const rkapEbitdaPerKaryawanJt = (RKAP_YTD.ebitdaRpT * 1_000_000) / SDM.karyawanAktif;

/** Indeks engagement 0-100 = skor survei (skala 1-5) × 20 — satu instrumen. */
const engagementIndex = SDM.engagementSkor * 20;

/* ── 0a. Konteks Organisasi (drill-down) ──────────────────────────── */

export type OrgLevel = "Enterprise" | "Subholding" | "Region" | "Business Unit";

export interface OrgNode {
  label: string;
  level: OrgLevel;
  depth: 0 | 1 | 2 | 3;
}

export const orgNodes: OrgNode[] = [
  { label: "PTPN Group (Holding)", level: "Enterprise", depth: 0 },
  { label: "PalmCo — PTPN IV", level: "Subholding", depth: 1 },
  { label: "Regional 1 (Sumut)", level: "Region", depth: 2 },
  { label: "PKS Adolina", level: "Business Unit", depth: 3 },
  { label: "Kebun Dolok Ilir", level: "Business Unit", depth: 3 },
  { label: "Regional 2 (Sumut)", level: "Region", depth: 2 },
  { label: "Regional 3 (Riau)", level: "Region", depth: 2 },
  { label: "SupportingCo — PTPN I", level: "Subholding", depth: 1 },
  { label: "SugarCo — PTPN III", level: "Subholding", depth: 1 },
];

/* ── 0b. Data Trust ───────────────────────────────────────────────── */

export const dataTrust: DimensionDataTrust = {
  /** Periode bisnis yang direpresentasikan angka dashboard. */
  asOf: BASELINE_TRUST.asOf,
  /** Waktu sinkronisasi sistem terakhir (terpisah dari periode data). */
  lastRefresh: BASELINE_TRUST.lastRefresh,
  coverage: "97,8%",
  quality: "96,4%",
  sources: ["SAP HCM", "IHCMS", "Payroll", "LMS", "e-Rekrutmen"],
  domain: "Human Capital",
  qualityBreakdown: [
    { label: "Completeness", value: "98%" },
    { label: "Accuracy", value: "96%" },
    { label: "Timeliness", value: "95%" },
    { label: "Consistency", value: "97%" },
    { label: "Reconciliation", value: "98%" },
    { label: "Certification", value: "95%" },
    { label: "Lineage", value: "96%" },
  ],
};

/* ── 1. Key Strategic KPI ─────────────────────────────────────────── */

export interface HcKpi {
  label: string;
  value: string;
  sub: string;
  delta: string;
  trend: "up" | "down";
  deltaTone: "good" | "bad";
  compare: string;
  icon: "users" | "trend" | "heart" | "cycle" | "target" | "wallet";
  tone: "blue" | "green" | "pink" | "red" | "teal" | "amber";
  /** Nama kanonik metrik di Data Dictionary; dipakai tooltip definisi pada kartu KPI. */
  metric: string;
}

export const hcKpi: HcKpi[] = [
  {
    label: "Total Headcount",
    value: "70.142",
    sub: "Orang",
    delta: "2,4%",
    trend: "up",
    deltaTone: "good",
    compare: "vs Des 2025",
    icon: "users",
    tone: "blue",
    metric: "Headcount",
  },
  {
    label: "People Productivity",
    value: id1(pendapatanPerKaryawanJt),
    sub: "Revenue / Employee YTD (Jt Rp)",
    delta: "7,0%",
    trend: "up",
    deltaTone: "good",
    compare: "vs Mei 2025",
    icon: "trend",
    tone: "green",
    metric: "Revenue per Employee",
  },
  {
    label: "Engagement Index",
    value: id1(engagementIndex),
    sub: "Indeks 0-100 · survei 4,21/5",
    delta: "2,6 pts",
    trend: "up",
    deltaTone: "good",
    compare: "vs Mei 2025",
    icon: "heart",
    tone: "pink",
    metric: "Engagement Score",
  },
  {
    label: "Turnover Rate",
    value: `${SDM.turnoverPct.toLocaleString("id-ID", { minimumFractionDigits: 2 })}%`,
    sub: "YTD",
    delta: "-0,4 pts",
    trend: "down",
    deltaTone: "good",
    compare: "vs Mei 2025",
    icon: "cycle",
    tone: "red",
    metric: "Turnover Rate",
  },
  {
    label: "Talent Readiness",
    value: "68%",
    sub: "Ready Now & Ready in 1-2 Yrs",
    delta: "4,5%",
    trend: "up",
    deltaTone: "good",
    compare: "vs Mei 2025",
    icon: "target",
    tone: "teal",
    metric: "Talent Readiness",
  },
  {
    label: "HC Cost to Revenue",
    value: "9,7%",
    sub: "YTD",
    delta: "-0,6 pts",
    trend: "down",
    deltaTone: "good",
    compare: "vs Mei 2025",
    icon: "wallet",
    tone: "amber",
    metric: "HC Cost to Revenue",
  },
];

/* ── 2. Executive Intelligence ────────────────────────────────────── */

export interface ExecSignal {
  no: string;
  title: string;
  text: string;
  impactLabel: string;
  impactValue: string;
  tone: "red" | "amber";
}

export const execIntelCounts = [
  { label: "Critical Signals", value: 3, tone: "red" },
  { label: "Opportunities", value: 2, tone: "green" },
  { label: "Decisions Pending", value: 3, tone: "amber" },
] as { label: string; value: number; tone: "red" | "green" | "amber" }[];

export const execSignals: ExecSignal[] = [
  {
    no: "01",
    title: "Succession Exposure",
    text: "12 posisi kritikal tanpa suksesor Ready Now; 5 di antaranya akan kosong dalam 90 hari.",
    impactLabel: "Business Impact",
    impactValue: "High",
    tone: "red",
  },
  {
    no: "02",
    title: "Productivity Gap",
    text: "Labor cost +8,2% sementara productivity hanya +2,1% di Palm Oil Operations.",
    impactLabel: "Potential Impact",
    impactValue: "Rp 48 M",
    tone: "amber",
  },
  {
    no: "03",
    title: "Critical Skill Shortage",
    text: "Proyeksi shortage 830 kapabilitas AI & Data pada 2028; reskilling rate 6% vs target 12%.",
    impactLabel: "Risk Horizon",
    impactValue: "12 bulan",
    tone: "amber",
  },
];

export const execRecommendation =
  "Prioritaskan internal mobility + accelerated leadership development sebelum external hiring. Potensi saving Rp 12,6 M.";

/** Metadata analitik rekomendasi eksekutif HC — lihat shared/AiMeta. */
export const execRecommendationMeta = {
  jenis: "Rekomendasi",
  confidencePct: 76,
  evidence: "127 kandidat internal eligible · 18 suksesor Ready Now · benchmark biaya external hiring",
} as const;

/* ── 3. Strategic Alignment ───────────────────────────────────────── */

export const strategicObjective = "Meningkatkan Produktivitas & Efisiensi Operasional";

export const alignmentFlow = [
  { label: "Workforce Requirement", value: "72.318", sub: "Orang", icon: "workforce" },
  { label: "People Capability", value: "82%", sub: "Capability Index", icon: "capability" },
  { label: "People Performance", value: "85%", sub: "Performance Index", icon: "performance" },
  { label: "Business Outcome", value: "+8,2%", sub: "Produktivitas (Ton/Ha)", icon: "outcome" },
] as const;

/** Sinyal korelasi (bukan klaim kausal) antara kapabilitas people dan outcome bisnis. */
export const alignmentSignal = {
  label: "People Contribution Signal",
  value: "High",
  note: "Korelasional — bukan hubungan kausal terverifikasi.",
};

/* ── 4. People Risk Radar ─────────────────────────────────────────── */

export interface RiskRadarAxis {
  axis: string;
  /** Tingkat risiko saat ini (0-100). */
  level: number;
  /** Ambang toleransi. */
  tolerance: number;
}

export const riskRadar: RiskRadarAxis[] = [
  { axis: "Vacancy", level: 82, tolerance: 55 },
  { axis: "Succession", level: 78, tolerance: 55 },
  { axis: "Turnover", level: 58, tolerance: 60 },
  { axis: "Leadership", level: 55, tolerance: 60 },
  { axis: "Skill Gap", level: 74, tolerance: 55 },
  { axis: "Compliance", level: 38, tolerance: 65 },
  { axis: "Engagement", level: 34, tolerance: 65 },
  { axis: "HC Cost", level: 47, tolerance: 60 },
];

export type RiskSeverity = "High" | "Medium" | "Low";

export interface RiskDriver {
  label: string;
  /** Kontribusi terhadap skor risiko (%), total per risiko = 100. */
  weight: number;
}

export interface TopRisk {
  label: string;
  severity: RiskSeverity;
  /** Skor risiko 0-100. */
  score: number;
  drivers: RiskDriver[];
  /** Aksi yang direkomendasikan untuk menurunkan risiko. */
  recommendation: string;
}

export const topRisks: TopRisk[] = [
  {
    label: "Critical Position Vacancy",
    severity: "High",
    score: 82,
    drivers: [
      { label: "Time-to-fill posisi kritikal > 90 hari", weight: 38 },
      { label: "Pipeline internal Ready Now tipis", weight: 34 },
      { label: "Pensiun BOD-2 dalam 12 bulan", weight: 28 },
    ],
    recommendation: "Prioritaskan internal mobility untuk 8 posisi + fast-track hiring 4 posisi.",
  },
  {
    label: "Succession Risk",
    severity: "High",
    score: 78,
    drivers: [
      { label: "12 posisi kritikal tanpa suksesor Ready Now", weight: 42 },
      { label: "Readiness suksesor rata-rata 1-2 tahun", weight: 33 },
      { label: "Konsentrasi suksesor di 3 regional", weight: 25 },
    ],
    recommendation: "Akselerasi 8 suksesor via accelerated leadership program (readiness < 12 bulan).",
  },
  {
    label: "Turnover Risk",
    severity: "Medium",
    score: 58,
    drivers: [
      { label: "Turnover tenure 2-4 tahun 4,8% (2× rata-rata grup)", weight: 40 },
      { label: "Compensation percentile < P50 pasar", weight: 35 },
      { label: "Manager effectiveness rendah di 8 unit", weight: 25 },
    ],
    recommendation: "Retention plan tenure 2-4 tahun: adjust kompensasi ke P50 + coaching manager 8 unit.",
  },
  {
    label: "Leadership Gap",
    severity: "Medium",
    score: 55,
    drivers: [
      { label: "Leadership readiness index 64 (target 75)", weight: 45 },
      { label: "Span of control melebar pasca-restrukturisasi", weight: 30 },
      { label: "Coverage program leadership 58%", weight: 25 },
    ],
    recommendation: "Perluas coverage program leadership ke 75% + review span of control pasca-restrukturisasi.",
  },
  {
    label: "Critical Skill Gap",
    severity: "High",
    score: 74,
    drivers: [
      { label: "Shortage AI & Data 830 orang (proyeksi 2028)", weight: 44 },
      { label: "Adopsi digital agriculture masih 31%", weight: 31 },
      { label: "Reskilling rate 6%/tahun (target 12%)", weight: 25 },
    ],
    recommendation: "Naikkan reskilling rate ke 12%/tahun + strategic hiring AI & Data mulai 2026.",
  },
];

/* ── 5. People Math & HPI BEM ─────────────────────────────────────── */

export const peopleMath = {
  score: 79,
  kategori: "Strong",
  trend: [72, 74, 73, 76, 75, 78, 79],
};

/** 6 sel Behavior Engineering Model (Gilbert); rata-rata (76+73+81+88+89+86)/6 = 82. */
export const hpiBem = {
  score: 82,
  kategori: "Strong",
  dimensi: [
    { label: "Data", value: 76, tone: "green" },
    { label: "Instruments", value: 73, tone: "amber" },
    { label: "Incentives", value: 81, tone: "green" },
    { label: "Knowledge", value: 88, tone: "green" },
    { label: "Capacity", value: 89, tone: "green" },
    { label: "Motives", value: 86, tone: "green" },
  ] as { label: string; value: number; tone: "green" | "amber" }[],
  opportunity:
    "Opportunity terbesar ada pada Environmental Supports — sel Instruments (tools & sistem kerja).",
};

/* ── 6. BOD Decision Center ───────────────────────────────────────── */

export interface BodDecision {
  title: string;
  impact: "High Impact" | "Medium Impact" | "Low Impact";
  tone: "red" | "amber" | "green";
  text: string;
  due: string;
  /** Deadline sudah lewat relatif periode data (Mei 2026). */
  overdue?: boolean;
  /** Jumlah hari lewat deadline, dihitung terhadap tanggal data as-of. */
  overdueDays?: number;
}

export const bodTabs = [
  { label: "Decision Required", count: 3 },
  { label: "Opportunity", count: 2 },
  { label: "Information", count: 4 },
];

export const bodDecisions: BodDecision[] = [
  {
    title: "Succession Risk – PTPN IV",
    impact: "High Impact",
    tone: "red",
    text: "12 posisi kritikal tidak memiliki suksesor Ready Now. Rekomendasi: Approve accelerated leadership program.",
    due: "Q3 2026",
  },
  {
    title: "Labor Cost – Palm Oil Operations",
    impact: "Medium Impact",
    tone: "amber",
    text: "Labor cost +8,2% sementara productivity hanya +2,1%. Rekomendasi: Review workforce productivity model.",
    due: "Q3 2026",
  },
  {
    title: "Internal Talent Mobility",
    impact: "Low Impact",
    tone: "green",
    text: "127 karyawan high potential dapat mengisi projected vacancies. Potensi saving: Rp 12,6 M.",
    due: "Q1 2026",
    overdue: true,
    overdueDays: 61,
  },
];

/* ── 7. People Productivity ───────────────────────────────────────── */

export interface ProductivityRow {
  indikator: string;
  ytd: string;
  yoy: string;
  yoyTrend: "up" | "down";
  yoyTone: "good" | "bad";
  target: string;
}

export const productivityRows: ProductivityRow[] = [
  // Target = beban RKAP YTD per karyawan; aktual di atas target selaras pendapatan di atas RKAP.
  { indikator: "Revenue / Employee (Jt Rp)", ytd: id1(pendapatanPerKaryawanJt), yoy: "7,0%", yoyTrend: "up", yoyTone: "good", target: id1(rkapPendapatanPerKaryawanJt) },
  { indikator: "EBITDA / Employee (Jt Rp)", ytd: id1(ebitdaPerKaryawanJt), yoy: "5,3%", yoyTrend: "up", yoyTone: "good", target: id1(rkapEbitdaPerKaryawanJt) },
  { indikator: "Produksi CPO (Ton) / Employee", ytd: "14,1", yoy: "7,1%", yoyTrend: "up", yoyTone: "good", target: "14,5" },
  { indikator: "TBS (Ton) / Employee", ytd: "63,0", yoy: "6,5%", yoyTrend: "up", yoyTone: "good", target: "64,5" },
  { indikator: "Labor Cost / Ton (Rp)", ytd: "176.420", yoy: "-3,4%", yoyTrend: "down", yoyTone: "bad", target: "180.000" },
  { indikator: "Labor Cost / Revenue (%)", ytd: "9,7%", yoy: "-0,6 pts", yoyTrend: "down", yoyTone: "bad", target: "10,0%" },
  { indikator: "Productivity Index (Base 100)", ytd: "112", yoy: "5,2%", yoyTrend: "up", yoyTone: "good", target: "115" },
];

/**
 * Narasi wajib bisa ditelusuri ke tabel di atasnya: finansial (Revenue/EBITDA
 * per employee, labor cost) di atas target, tetapi fisik (CPO 14,1 vs 14,5;
 * TBS 63,0 vs 64,5; index 112 vs 115) masih di bawah — "produktivitas di atas
 * target" polos adalah overclaim yang tertolak di baris ketiga tabel sendiri.
 */
export const productivityNote =
  "Produktivitas finansial di atas target (revenue & EBITDA per employee, labor cost); produktivitas fisik masih di bawah target (CPO/TBS per employee, index 112 vs 115) — momentum ditopang harga & efisiensi biaya, bukan volume.";

/* ── 8. Scenario Simulation ───────────────────────────────────────── */

export interface ScenarioRow {
  skenario: string;
  headcount: string;
  cost: string;
  productivity: string;
  keterangan: string;
  recommended?: boolean;
}

export const scenarioRows: ScenarioRow[] = [
  {
    skenario: "A. No Intervention",
    headcount: "+8,0%",
    cost: "+11,1%",
    productivity: "+1,1%",
    keterangan: "Business as usual",
  },
  {
    skenario: "B. Automation",
    headcount: "+2,0%",
    cost: "+4,3%",
    productivity: "+8,4%",
    keterangan: "Investasi teknologi & automasi proses",
  },
  {
    skenario: "C. Reskill & Redeployment",
    headcount: "+1,2%",
    cost: "+3,2%",
    productivity: "+7,1%",
    keterangan: "Reskilling & mobilitas internal",
  },
  {
    skenario: "D. Optimized (Recommended)",
    headcount: "+1,5%",
    cost: "+3,8%",
    productivity: "+8,6%",
    keterangan: "Kombinasi B + C",
    recommended: true,
  },
];

export const scenarioNote =
  "Skenario D memberikan keseimbangan terbaik antara biaya dan peningkatan produktivitas.";

/* ── 9. Skills Intelligence ───────────────────────────────────────── */

export interface CriticalSkill {
  skill: string;
  /** Jumlah karyawan dengan proficiency memadai saat ini. */
  supply: number;
  /** Kebutuhan proyeksi 2028 (skills-first workforce model). */
  demand: number;
}

export const criticalSkills: CriticalSkill[] = [
  { skill: "AI & Data Analytics", supply: 420, demand: 1250 },
  { skill: "Digital / Precision Agriculture", supply: 380, demand: 740 },
  { skill: "Sustainability (ISPO / RSPO)", supply: 310, demand: 520 },
  { skill: "Teknik Pengolahan (PKS)", supply: 2140, demand: 2380 },
  { skill: "Agronomi", supply: 3420, demand: 3600 },
  { skill: "Finance & Risk", supply: 1280, demand: 1100 },
];

export const skillsNote =
  "Proyeksi shortage terbesar: 830 kapabilitas AI & Data pada 2028 bila tanpa intervensi. Rekomendasi: reskilling 400 karyawan/tahun + strategic hiring untuk 3 skill teratas.";

/* ── 10. Talent Portfolio (9-box) ─────────────────────────────────── */

/** Grid 9-box: baris dari Performance High → Low, kolom Potential Low → High. */
export const nineBox: { value: string; tone: "soft" | "mid" | "strong" }[][] = [
  [
    { value: "128", tone: "mid" },
    { value: "412", tone: "mid" },
    { value: "186", tone: "strong" },
  ],
  [
    { value: "1.235", tone: "soft" },
    { value: "3.742", tone: "mid" },
    { value: "1.068", tone: "mid" },
  ],
  [
    { value: "476", tone: "soft" },
    { value: "1.296", tone: "soft" },
    { value: "389", tone: "soft" },
  ],
];

export const talentStats = {
  star: { label: "High Performance High Potential", value: 186, unit: "Karyawan" },
  rows: [
    { label: "Flight Risk High", value: "32", tone: "red" },
    { label: "Critical Position", value: "54", tone: "red" },
    { label: "Ready Now", value: "41%", tone: "ink" },
  ] as { label: string; value: string; tone: "red" | "ink" }[],
};

/** Driver skor Flight Risk High pada Talent Portfolio (explainability). */
export const flightRiskDrivers: RiskDriver[] = [
  { label: "Compensation percentile < P50", weight: 34 },
  { label: "Engagement turun ≥ 10 pts", weight: 27 },
  { label: "External demand tinggi", weight: 22 },
  { label: "Manager effectiveness rendah", weight: 17 },
];

/* ── 11. Talent Action Intelligence ───────────────────────────────── */

export const talentActions = {
  headline: {
    value: 32,
    label: "Critical Talent berstatus Flight Risk",
    sub: "High Performer · High Potential · Critical Position",
  },
  exposure: { label: "Potential Business Exposure", value: "Rp 86 M" },
  rows: [
    { label: "Suksesor Ready Now siap dimobilisasi", value: "18" },
    { label: "High-Potential siap internal mobility", value: "47" },
    { label: "Posisi kritikal tanpa suksesor", value: "12" },
  ],
  recommendation:
    "Retention intervention: review kompensasi ke P50 pasar + engagement plan untuk 32 critical talent.",
};

/* ── 12. Alerts & Notifications ───────────────────────────────────── */

export interface HcAlert {
  title: string;
  text: string;
  time: string;
  tone: "red" | "amber" | "green" | "blue";
}

export const hcAlerts: HcAlert[] = [
  {
    title: "Risiko Turnover Tinggi",
    text: "Turnover di PTPN IV Regional 2 mencapai 4,2% — melebihi ambang batas regional 3,5% (rata-rata grup 2,45%).",
    time: "Today",
    tone: "red",
  },
  {
    title: "Probation Berakhir",
    text: "243 karyawan probation akan berakhir dalam 30 hari.",
    time: "1 hari yang lalu",
    tone: "amber",
  },
  {
    title: "Performance Below Target",
    text: "1.127 karyawan memiliki performance Below Target.",
    time: "2 hari yang lalu",
    tone: "amber",
  },
  {
    title: "Pelatihan Wajib",
    text: "Kepatuhan pelatihan HSSE masih di bawah target (85%).",
    time: "3 hari yang lalu",
    tone: "green",
  },
  {
    title: "Suksesi Mendekat",
    text: "5 posisi kritikal akan kosong dalam 90 hari.",
    time: "3 hari yang lalu",
    tone: "blue",
  },
];

/* ── 13. HC Intelligence Copilot ──────────────────────────────────── */

export const copilotGreeting =
  "Good morning, Pak Denaldy 👋 Tanyakan apa saja tentang People, Talent & Workforce.";

/** Quick command bergaya decision copilot: verb intelijen + pertanyaan konkret. */
export const copilotCommands = [
  { cmd: "WHY", label: "Mengapa turnover naik?" },
  { cmd: "PREDICT", label: "Proyeksi workforce cost 2027?" },
  { cmd: "SIMULATE", label: "Simulasi pengurangan 5% workforce" },
  { cmd: "FIND", label: "Critical talent berisiko flight" },
  { cmd: "EXPLAIN", label: "Kenapa produktivitas Regional 2 turun?" },
  { cmd: "RECOMMEND", label: "Aksi BOD untuk succession risk" },
];
