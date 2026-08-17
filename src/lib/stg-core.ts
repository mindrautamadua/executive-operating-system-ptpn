/**
 * Core dimensi Strategi & Kinerja — baseline turunan yang dipakai seluruh
 * file data /strategi-kinerja (stg-, spi-, stf-, sms-, skc-, svc-, sbm-,
 * sbd-data.ts). Angka induk mengutip src/lib/group-baseline.ts.
 * Periode acuan: 31 Mei 2026 (YTD).
 */

import type { DimensionDataTrust } from "./dimension-menu";
import { BASELINE_TRUST, STRATEGI } from "./group-baseline";
import { PALETTE } from "./chart-palette";

/* ── Data Trust dimensi ───────────────────────────────────────────── */

export const stgDataTrust: DimensionDataTrust = {
  asOf: BASELINE_TRUST.asOf,
  lastRefresh: BASELINE_TRUST.lastRefresh,
  coverage: "94,7%",
  quality: "93,8%",
  sources: ["e-RKAP", "PMO Tracker", "OKR System", "Notulen BOD"],
  domain: "Strategi",
  // Timeliness terendah: progres inisiatif dilaporkan manual per bulan oleh PMO.
  qualityBreakdown: [
    { label: "Completeness", value: "96%" },
    { label: "Accuracy", value: "94%" },
    { label: "Timeliness", value: "91%" },
    { label: "Consistency", value: "94%" },
    { label: "Reconciliation", value: "92%" },
    { label: "Certification", value: "88%" },
    { label: "Lineage", value: "86%" },
  ],
};

/* ── KPI strip (shape mengikuti HcKpi di hc-data.ts) ──────────────── */

export interface StgKpi {
  label: string;
  value: string;
  /** Sufiks kecil di samping nilai, mis. "/100". */
  valueSuffix?: string;
  sub: string;
  /** Sub berwarna merah (peringatan). */
  subDanger?: boolean;
  /** Kosong = tampilkan `compare` saja. */
  delta?: string;
  trend?: "up" | "down";
  deltaTone?: "good" | "bad";
  compare: string;
  icon:
    | "initiative"
    | "score"
    | "milestone"
    | "value"
    | "decision"
    | "transform"
    | "target"
    | "invest"
    | "rank"
    | "digital"
    | "late"
    | "critical"
    | "clock"
    | "matrix"
    | "red"
    | "roic"
    | "yield"
    | "cost";
  tone: "green" | "red" | "amber" | "teal" | "blue" | "purple";
}

/** Insight / rekomendasi naratif standar dimensi. */
export interface StgInsight {
  title: string;
  text: string;
  tone: "good" | "warn" | "bad" | "info";
  /** Metadata analitik (jenis klaim, keyakinan, bukti) — lihat shared/AiMeta. */
  meta?: import("@/components/shared/AiMeta").AiMetaInfo;
}

/* ── Status inisiatif ─────────────────────────────────────────────── */

export type InitiativeStatus = "On Track" | "At Risk" | "Off Track";

/** Warna kanonik status eksekusi. */
export const STATUS_COLOR: Record<InitiativeStatus, string> = {
  "On Track": PALETTE.green,
  "At Risk": PALETTE.amber,
  "Off Track": PALETTE.red,
};

export type InitiativeTheme =
  | "Operational Excellence"
  | "Hilirisasi"
  | "Swasembada Gula"
  | "Digital"
  | "EBT & Dekarbonisasi";

export type InitiativeOwner = "PalmCo" | "SGN" | "PTPN I" | "Holding";

/* ── Register 28 inisiatif strategis RJPP ─────────────────────────── */

export interface StrategicInitiative {
  id: string;
  name: string;
  theme: InitiativeTheme;
  owner: InitiativeOwner;
  /** Progres fisik (%). */
  progress: number;
  status: InitiativeStatus;
  /** Target EBITDA uplift kumulatif 2029 (Rp T). Total = 12,4 T. */
  valueTargetRpT: number;
  /** Kebutuhan investasi (Rp T). Total = 21,8 T. */
  investRpT: number;
}

/**
 * 28 inisiatif RJPP (17 On Track / 8 At Risk / 3 Off Track — selaras
 * STRATEGI di group-baseline). Tema: Operational Excellence 8, Hilirisasi 6,
 * Swasembada Gula 5, Digital 4, EBT & Dekarbonisasi 5.
 * Σ valueTargetRpT = 12,40 · Σ investRpT = 21,80.
 */
export const initiatives: StrategicInitiative[] = [
  /* — Operational Excellence (8) · value 3,60 · invest 3,40 — */
  {
    id: "STG-01",
    name: "Ekselensi Operasional PKS (Losses & Utilisasi)",
    theme: "Operational Excellence",
    owner: "PalmCo",
    progress: 72,
    status: "On Track",
    valueTargetRpT: 0.62,
    investRpT: 0.55,
  },
  {
    id: "STG-02",
    name: "Intensifikasi Pemupukan Presisi",
    theme: "Operational Excellence",
    owner: "PalmCo",
    progress: 68,
    status: "On Track",
    valueTargetRpT: 0.55,
    investRpT: 0.5,
  },
  {
    id: "STG-03",
    name: "Percepatan Replanting Sawit",
    theme: "Operational Excellence",
    owner: "PalmCo",
    progress: 61,
    status: "On Track",
    valueTargetRpT: 0.48,
    investRpT: 0.48,
  },
  {
    id: "STG-04",
    name: "Optimalisasi Rantai Panen–Angkut (Restan)",
    theme: "Operational Excellence",
    owner: "PalmCo",
    progress: 74,
    status: "On Track",
    valueTargetRpT: 0.45,
    investRpT: 0.45,
  },
  {
    id: "STG-05",
    name: "Revitalisasi Pabrik Karet & Teh",
    theme: "Operational Excellence",
    owner: "PTPN I",
    progress: 44,
    status: "At Risk",
    valueTargetRpT: 0.42,
    investRpT: 0.42,
  },
  {
    id: "STG-06",
    name: "Sentralisasi Pengadaan Group",
    theme: "Operational Excellence",
    owner: "Holding",
    progress: 78,
    status: "On Track",
    valueTargetRpT: 0.4,
    investRpT: 0.38,
  },
  {
    id: "STG-07",
    name: "Efisiensi Energi Pabrik",
    theme: "Operational Excellence",
    owner: "PalmCo",
    progress: 66,
    status: "On Track",
    valueTargetRpT: 0.36,
    investRpT: 0.34,
  },
  {
    id: "STG-08",
    name: "Perbaikan Tata Kelola Aset Kebun",
    theme: "Operational Excellence",
    owner: "PTPN I",
    progress: 41,
    status: "At Risk",
    valueTargetRpT: 0.32,
    investRpT: 0.28,
  },
  /* — Hilirisasi (6) · value 3,10 · invest 6,90 — */
  {
    id: "STG-09",
    name: "Refinery CPO Terintegrasi",
    theme: "Hilirisasi",
    owner: "PalmCo",
    progress: 58,
    status: "On Track",
    valueTargetRpT: 0.72,
    investRpT: 2.4,
  },
  {
    id: "STG-10",
    name: "Ekspansi Minyak Goreng Kemasan",
    theme: "Hilirisasi",
    owner: "PalmCo",
    progress: 64,
    status: "On Track",
    valueTargetRpT: 0.64,
    investRpT: 1.6,
  },
  {
    id: "STG-11",
    name: "Kemitraan Bioetanol Tebu",
    theme: "Hilirisasi",
    owner: "SGN",
    progress: 38,
    status: "At Risk",
    valueTargetRpT: 0.55,
    investRpT: 1.1,
  },
  {
    id: "STG-12",
    name: "Hilirisasi Oleokimia Dasar",
    theme: "Hilirisasi",
    owner: "PalmCo",
    progress: 52,
    status: "On Track",
    valueTargetRpT: 0.48,
    investRpT: 0.8,
  },
  {
    id: "STG-13",
    name: "Optimalisasi Produk Inti Sawit (PKO)",
    theme: "Hilirisasi",
    owner: "PalmCo",
    progress: 70,
    status: "On Track",
    valueTargetRpT: 0.39,
    investRpT: 0.6,
  },
  {
    id: "STG-14",
    name: "Branding & Ritel Gula Premium",
    theme: "Hilirisasi",
    owner: "SGN",
    progress: 66,
    status: "On Track",
    valueTargetRpT: 0.32,
    investRpT: 0.4,
  },
  /* — Swasembada Gula (5) · value 2,60 · invest 5,60 — */
  {
    id: "STG-15",
    name: "Revitalisasi 5 PG Prioritas",
    theme: "Swasembada Gula",
    owner: "SGN",
    progress: 46,
    status: "At Risk",
    valueTargetRpT: 0.78,
    investRpT: 3.1,
  },
  {
    id: "STG-16",
    name: "Perluasan Areal Tebu 60 Rb Ha",
    theme: "Swasembada Gula",
    owner: "SGN",
    progress: 28,
    status: "Off Track",
    valueTargetRpT: 0.62,
    investRpT: 1.2,
  },
  {
    id: "STG-17",
    name: "Peningkatan Rendemen ≥8,5%",
    theme: "Swasembada Gula",
    owner: "SGN",
    progress: 41,
    status: "At Risk",
    valueTargetRpT: 0.48,
    investRpT: 0.6,
  },
  {
    id: "STG-18",
    name: "Mekanisasi Tebang–Muat–Angkut Tebu",
    theme: "Swasembada Gula",
    owner: "SGN",
    progress: 63,
    status: "On Track",
    valueTargetRpT: 0.4,
    investRpT: 0.45,
  },
  {
    id: "STG-19",
    name: "Restrukturisasi 11 PG Non-Kompetitif",
    theme: "Swasembada Gula",
    owner: "SGN",
    progress: 22,
    status: "Off Track",
    valueTargetRpT: 0.32,
    investRpT: 0.25,
  },
  /* — Digital (4) · value 1,30 · invest 1,70 — */
  {
    id: "STG-20",
    name: "ERP Terintegrasi Group (S/4HANA)",
    theme: "Digital",
    owner: "Holding",
    progress: 54,
    status: "At Risk",
    valueTargetRpT: 0.45,
    investRpT: 0.65,
  },
  {
    id: "STG-21",
    name: "Digital Agriculture (Presisi & Drone)",
    theme: "Digital",
    owner: "PalmCo",
    progress: 62,
    status: "On Track",
    valueTargetRpT: 0.35,
    investRpT: 0.45,
  },
  {
    id: "STG-22",
    name: "Operating System & Analitik Eksekutif",
    theme: "Digital",
    owner: "Holding",
    progress: 76,
    status: "On Track",
    valueTargetRpT: 0.28,
    investRpT: 0.35,
  },
  {
    id: "STG-23",
    name: "Digitalisasi Rantai Pasok & Traceability",
    theme: "Digital",
    owner: "PalmCo",
    progress: 48,
    status: "At Risk",
    valueTargetRpT: 0.22,
    investRpT: 0.25,
  },
  /* — EBT & Dekarbonisasi (5) · value 1,80 · invest 4,20 — */
  {
    id: "STG-24",
    name: "Biogas 18 PKS (POME-to-Power)",
    theme: "EBT & Dekarbonisasi",
    owner: "PalmCo",
    progress: 57,
    status: "On Track",
    valueTargetRpT: 0.52,
    investRpT: 1.6,
  },
  {
    id: "STG-25",
    name: "Co-firing Cangkang & Biomassa",
    theme: "EBT & Dekarbonisasi",
    owner: "PalmCo",
    progress: 65,
    status: "On Track",
    valueTargetRpT: 0.42,
    investRpT: 1.1,
  },
  {
    id: "STG-26",
    name: "PLTS Atap & Ground-Mounted 30 MWp",
    theme: "EBT & Dekarbonisasi",
    owner: "Holding",
    progress: 39,
    status: "At Risk",
    valueTargetRpT: 0.35,
    investRpT: 0.75,
  },
  {
    id: "STG-27",
    name: "Elektrifikasi & Efisiensi Emisi Pabrik",
    theme: "EBT & Dekarbonisasi",
    owner: "PTPN I",
    progress: 24,
    status: "Off Track",
    valueTargetRpT: 0.28,
    investRpT: 0.45,
  },
  {
    id: "STG-28",
    name: "Kesiapan Perdagangan Karbon",
    theme: "EBT & Dekarbonisasi",
    owner: "Holding",
    progress: 60,
    status: "On Track",
    valueTargetRpT: 0.23,
    investRpT: 0.3,
  },
];

/** Guard konsistensi: jumlah per status harus sama dengan baseline. */
export const initiativeCounts = {
  total: STRATEGI.inisiatifTotal,
  onTrack: STRATEGI.inisiatifOnTrack,
  atRisk: STRATEGI.inisiatifAtRisk,
  offTrack: STRATEGI.inisiatifOffTrack,
} as const;

/* ── Scorecard KPI korporat per subholding ────────────────────────── */

export interface ScorecardScore {
  entity: string;
  /** Skor komposit KPI korporat (0-100). */
  score: number;
  /** Target skor RKAP. */
  target: number;
  /** Kategori penilaian (Permen BUMN). */
  category: "Sangat Baik" | "Baik" | "Cukup";
}

/** Skor dari STRATEGI (group-baseline) — target seragam 85. */
export const scorecardScores: ScorecardScore[] = [
  { entity: "PTPN Group", score: STRATEGI.skorKpiKorporat, target: 85, category: "Baik" },
  { entity: "PalmCo", score: STRATEGI.skorPalmco, target: 85, category: "Sangat Baik" },
  { entity: "SGN", score: STRATEGI.skorSgn, target: 85, category: "Cukup" },
  { entity: "PTPN I", score: STRATEGI.skorPtpn1, target: 85, category: "Baik" },
];
