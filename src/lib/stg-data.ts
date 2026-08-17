/**
 * Data statis halaman Executive Overview Strategi & Kinerja (/strategi-kinerja).
 * Periode acuan: 31 Mei 2026 (YTD). Angka induk: group-baseline.ts + stg-core.ts.
 */

import { STRATEGI } from "./group-baseline";
import {
  initiatives,
  scorecardScores,
  type InitiativeStatus,
  type InitiativeTheme,
  type StgInsight,
  type StgKpi,
} from "./stg-core";

/* ── 1. KPI Strip ─────────────────────────────────────────────────── */

export const stgKpi: StgKpi[] = [
  {
    label: "Inisiatif Strategis RJPP",
    value: "28",
    sub: "17 On Track · 8 At Risk · 3 Off Track",
    delta: "+2 on track",
    trend: "up",
    deltaTone: "good",
    compare: "vs Q1 2026",
    icon: "initiative",
    tone: "blue",
  },
  {
    label: "Skor KPI Korporat",
    value: "87,4",
    valueSuffix: "/100",
    sub: "Kategori: Baik",
    delta: "+0,6 pts",
    trend: "up",
    deltaTone: "good",
    compare: "vs Q1 2026",
    icon: "score",
    tone: "green",
  },
  {
    label: "Milestone Selesai",
    value: "40,8%",
    sub: "58 dari 142 Milestone 2026",
    subDanger: true,
    delta: "-5,1 pts vs rencana",
    trend: "down",
    deltaTone: "bad",
    compare: "Rencana s.d. Mei: 47,9%",
    icon: "milestone",
    tone: "amber",
  },
  {
    label: "Value Creation YTD",
    value: "Rp 1,86 T",
    sub: "44% dari Target FY Rp 4,2 T",
    delta: "+Rp 0,45 T",
    trend: "up",
    deltaTone: "good",
    compare: "vs Apr 2026",
    icon: "value",
    tone: "teal",
  },
  {
    label: "Keputusan BOD Overdue",
    value: "3",
    sub: "Dari 46 Keputusan YTD",
    subDanger: true,
    delta: "+1",
    trend: "up",
    deltaTone: "bad",
    compare: "vs Apr 2026",
    icon: "decision",
    tone: "red",
  },
  {
    label: "Program Transformasi On-Track",
    value: "4/6",
    sub: "Health Index 74/100",
    compare: "Stabil vs Apr 2026",
    icon: "transform",
    tone: "purple",
  },
];

/* ── 2. Strategy Intelligence (narasi eksekutif) ──────────────────── */

export interface StrategyIntelligence {
  headline: string;
  detail: string;
  tone: "good" | "warn" | "bad";
  /** Rute detail terkait. */
  href: string;
}

export const strategyIntelligence: StrategyIntelligence[] = [
  {
    headline: "Swasembada gula tertinggal 2 milestone kritis",
    detail:
      "Perluasan areal tebu 60 rb ha (progres 28%) dan restrukturisasi 11 PG (22%) berstatus Off Track; revitalisasi 5 PG masih At Risk. Tanpa akselerasi Q3, target 1,45 jt ton gula 2028 mundur ±1 musim giling.",
    tone: "bad",
    href: "/strategi-kinerja/transformasi",
  },
  {
    headline: "Hilirisasi berjalan lebih cepat dari rencana",
    detail:
      "5 dari 6 inisiatif hilirisasi On Track; refinery CPO terintegrasi progres 58% (rencana 52%) dan minyak goreng kemasan 64%. Porsi hilir 14,8% pendapatan — jalur ke target 25% pada 2030 tetap terbuka.",
    tone: "good",
    href: "/strategi-kinerja/portofolio-inisiatif",
  },
  {
    headline: "Adopsi digital 68%, di bawah ambang efektif",
    detail:
      "Adopsi tools digital baru 68% vs target 80%; ERP S/4HANA At Risk (progres 54%) karena kesiapan data master SGN. Benefit digital baru Rp 0,13 T dari potensi Rp 1,3 T pada 2029.",
    tone: "warn",
    href: "/strategi-kinerja/transformasi",
  },
];

/* ── 3. Initiative Portfolio Map (bubble) ─────────────────────────── */

export interface PortfolioBubble {
  name: string;
  theme: InitiativeTheme;
  /** Sumbu X: progres fisik (%). */
  progress: number;
  /** Sumbu Y: dampak = target EBITDA uplift 2029 (Rp T). */
  impactRpT: number;
  /** Ukuran bubble: kebutuhan investasi (Rp T). */
  investRpT: number;
  status: InitiativeStatus;
}

/** 28 bubble — diturunkan langsung dari register inisiatif stg-core. */
export const portfolioBubbles: PortfolioBubble[] = initiatives.map((i) => ({
  name: i.name,
  theme: i.theme,
  progress: i.progress,
  impactRpT: i.valueTargetRpT,
  investRpT: i.investRpT,
  status: i.status,
}));

/* ── 4. Scorecard Snapshot (bar vs target 85) ─────────────────────── */

export const scorecardSnapshot = scorecardScores;

/* ── 5. Execution Risk Radar (6 sumbu) ────────────────────────────── */

export interface ExecutionRiskAxis {
  axis: string;
  /** Skor eksposur 0-100 (semakin tinggi semakin berisiko). */
  score: number;
}

export const executionRiskRadar: ExecutionRiskAxis[] = [
  { axis: "Pendanaan", score: 62 },
  { axis: "SDM & Kapabilitas", score: 58 },
  { axis: "Perizinan & Lahan", score: 71 },
  { axis: "Teknologi", score: 45 },
  { axis: "Mitra Strategis", score: 52 },
  { axis: "Regulasi", score: 66 },
];

/* ── 6. Value Creation Trend 2026 (area kumulatif) ────────────────── */

export interface ValueTrendPoint {
  month: string;
  /** Realisasi kumulatif (Rp T); kosong setelah Mei. */
  realisasi?: number;
  /** Jalur target kumulatif menuju Rp 4,2 T. */
  target: number;
}

/** Realisasi Mei = 1,86 T (baseline); target Des = 4,2 T. */
export const valueCreationTrend: ValueTrendPoint[] = [
  { month: "Jan", realisasi: 0.28, target: 0.3 },
  { month: "Feb", realisasi: 0.61, target: 0.65 },
  { month: "Mar", realisasi: 0.98, target: 1.05 },
  { month: "Apr", realisasi: 1.41, target: 1.5 },
  { month: "Mei", realisasi: STRATEGI.valueCreationYtdRpT, target: 2.0 },
  { month: "Jun", target: 2.35 },
  { month: "Jul", target: 2.7 },
  { month: "Agu", target: 3.05 },
  { month: "Sep", target: 3.4 },
  { month: "Okt", target: 3.7 },
  { month: "Nov", target: 3.95 },
  { month: "Des", target: STRATEGI.valueCreationTargetFyRpT },
];

/* ── 7. Strategic Alignment — 5 sasaran RJPP 2025-2029 ────────────── */

export interface RjppGoal {
  goal: string;
  /** Ukuran keberhasilan sasaran. */
  measure: string;
  /** Progres menuju sasaran (%). */
  progress: number;
  status: InitiativeStatus;
}

export const stgAlignment: RjppGoal[] = [
  {
    goal: "EBITDA Group Rp 25 T pada 2029",
    measure: "Run-rate EBITDA 2026: Rp 16,4 T (annualized)",
    progress: 48,
    status: "On Track",
  },
  {
    goal: "Swasembada gula konsumsi 2028",
    measure: "Produksi 780 rb ton FY26 → target 1,45 jt ton 2028",
    progress: 42,
    status: "Off Track",
  },
  {
    goal: "Porsi hilir 25% pendapatan pada 2030",
    measure: "Porsi hilir saat ini 14,8%",
    progress: 59,
    status: "On Track",
  },
  {
    goal: "Penurunan intensitas emisi 30% pada 2030",
    measure: "Intensitas 1,82 tCO2e/ton CPO (baseline 2,10)",
    progress: 38,
    status: "At Risk",
  },
  {
    goal: "Yield CPO 5,5 ton/ha pada 2029",
    measure: "Yield CPO 4,69 ton/ha (basis areal tertanam)",
    progress: 53,
    status: "At Risk",
  },
];

/* ── 8. BOD Strategy Decision Center ──────────────────────────────── */

export interface StgDecision {
  title: string;
  situation: string;
  decision: string;
  exposure: string;
  due: string;
  /**
   * Decision Value at Risk: konsekuensi ekonomi per bulan penundaan —
   * mengubah "overdue 34 hari" dari umur administratif menjadi biaya.
   */
  delayCost: string;
  tone: "red" | "amber";
}

/** Selaras 3 keputusan overdue di sbd-data.ts. */
export const stgDecisions: StgDecision[] = [
  {
    title: "Restrukturisasi 11 PG Non-Kompetitif",
    situation:
      "11 PG SGN beroperasi di bawah skala ekonomis; inisiatif Off Track (progres 22%), menahan perbaikan HPP gula.",
    decision: "Putuskan skema restrukturisasi (konsolidasi giling vs cold shutdown) per PG.",
    exposure: "Rp 0,32 T/thn",
    due: "Overdue 34 hari",
    // Rp 0,32 T/thn nilai tertahan ÷ 12 bulan.
    delayCost: "± Rp 27 M/bulan tertahan",
    tone: "red",
  },
  {
    title: "Divestasi Aset Non-Produktif PTPN I",
    situation:
      "Keputusan divestasi tahap I tertunda menunggu penilaian ulang KJPP; opportunity cost dana revitalisasi berjalan.",
    decision: "Setujui long-list aset divestasi tahap I dan mandat eksekusi.",
    exposure: "Rp 1,4 T",
    due: "Overdue 21 hari",
    // Opportunity cost dana revitalisasi: Rp 1,4 T × ~8%/thn ÷ 12.
    delayCost: "± Rp 9 M/bulan opportunity cost",
    tone: "red",
  },
  {
    title: "Kemitraan Bioetanol Tebu",
    situation:
      "Term sheet mitra strategis belum final; feedstock commitment memerlukan keputusan alokasi tetes 2027.",
    decision: "Setujui struktur kemitraan & alokasi feedstock bioetanol.",
    exposure: "Rp 1,1 T",
    due: "Overdue 12 hari",
    // Risiko jendela term sheet: tiap bulan tunda menggeser COD & alokasi tetes 2027.
    delayCost: "Risiko jendela mitra — COD mundur per bulan tunda",
    tone: "amber",
  },
];

/* ── 8b. Decision Outcome — closed loop ───────────────────────────── */

export interface DecisionOutcome {
  /** ID ledger permanen — keputusan adalah objek ber-ID, bukan baris teks. */
  id: string;
  title: string;
  /** Tanggal keputusan disahkan Direksi. */
  decided: string;
  /** Pemilik eksekusi — journal tanpa owner bukan akuntabilitas. */
  owner: string;
  /** Asumsi kunci saat keputusan diambil — diuji ulang saat outcome diukur. */
  assumption: string;
  /** Dampak yang dijanjikan saat keputusan diambil. */
  expected: string;
  /** Realisasi dampak sampai tanggal potong data. */
  actual: string;
  /** Selisih realisasi vs janji (label siap tampil, mis. "-18%"). */
  variance: string;
  tone: "good" | "warn" | "bad";
  /** Akar penyebab variance — menjawab "mengapa meleset/tercapai?". */
  why: string;
  lesson: string;
}

/**
 * Keputusan Direksi yang sudah dieksekusi, diukur ulang terhadap janjinya.
 * Menutup loop Sense → Decide → Execute → Measure → Learn; sampel dari
 * 31 keputusan selesai (STRATEGI.keputusanSelesai). Penghematan pengadaan
 * selaras PENGADAAN di group-baseline (realisasi 386 M vs target FY 850 M).
 */
export const decisionOutcomes: DecisionOutcome[] = [
  {
    id: "DEC-2026-004",
    title: "Sentralisasi Pengadaan Group",
    decided: "12 Jan 2026",
    owner: "Direktorat Pengadaan Holding",
    assumption: "Konsolidasi volume 4 kategori terbesar tercapai dalam 2 kuartal",
    expected: "Penghematan Rp 850 M FY26",
    actual: "Rp 386 M YTD Mei (45% target, run-rate on-track)",
    variance: "+2% vs prorata",
    tone: "good",
    why: "Konsolidasi volume 4 kategori spend terbesar tercapai lebih cepat dari rencana.",
    lesson: "Kategori spend terbesar dinegosiasi lebih dulu — front-load kategori strategis.",
  },
  {
    id: "DEC-2025-038",
    title: "Divestasi Aset Non-Core Tahap 0",
    decided: "28 Okt 2025",
    owner: "Direktorat Keuangan Holding",
    assumption: "Valuasi KJPP final untuk seluruh batch sebelum eksekusi",
    expected: "Cash release Rp 0,90 T",
    actual: "Rp 0,74 T terealisasi",
    variance: "-18%",
    tone: "warn",
    why: "Dua aset ditarik dari batch karena penilaian ulang KJPP setelah keputusan disahkan.",
    lesson: "Valuasi KJPP harus final sebelum keputusan — dua aset mundur karena penilaian ulang.",
  },
  {
    id: "DEC-2025-007",
    title: "Percepatan Replanting Sawit 2025",
    decided: "15 Feb 2025",
    owner: "Direktorat Produksi PalmCo",
    assumption: "Pasokan bibit tersertifikasi & jendela tanam basah normal",
    expected: "60 rb ha tertanam ulang",
    actual: "52 rb ha (87%)",
    variance: "-13%",
    tone: "warn",
    why: "Pasokan bibit tersertifikasi terlambat 2 bulan dan jendela tanam basah lebih pendek.",
    lesson: "Kesiapan bibit & jendela cuaca jadi critical path — amankan kontrak bibit H-6 bulan.",
  },
  {
    id: "DEC-2026-013",
    title: "Capex Revitalisasi PG Glenmore & Assembagoes",
    decided: "22 Apr 2026",
    owner: "Direktorat Produksi SGN",
    assumption: "EPC award ≤60 hari; commissioning sebelum giling 2027",
    expected: "Kontrak EPC terteken & mobilisasi mulai Jul 2026",
    actual: "EPC awarded 8 Jul; mobilisasi berjalan sesuai jadwal",
    variance: "On plan",
    tone: "good",
    why: "Paket lelang disiapkan paralel dengan persetujuan — tidak menunggu berurutan.",
    lesson: "Persiapan pengadaan paralel dengan sirkuler keputusan memangkas 1–2 bulan lead time.",
  },
  {
    id: "DEC-2026-002",
    title: "Fasilitas Modal Kerja Committed SGN Rp 2,4 T",
    decided: "5 Feb 2026",
    owner: "Direktorat Keuangan Holding",
    assumption: "Kebutuhan puncak musim giling ≤ Rp 2,4 T",
    expected: "Likuiditas musim giling aman; risiko likuiditas SGN turun dari Ekstrem",
    actual: "Fasilitas efektif; risiko turun Ekstrem → Tinggi (register risiko)",
    variance: "Sesuai janji",
    tone: "good",
    why: "Komitmen bank tuntas sebelum kebutuhan puncak — tidak ada penarikan darurat.",
    lesson: "Keputusan likuiditas musiman harus final satu kuartal sebelum musim, bukan saat musim.",
  },
  {
    id: "DEC-2026-009",
    title: "Task Force EUDR & Traceability Rantai Pasok",
    decided: "15 Apr 2026",
    owner: "Direktorat Pemasaran Holding",
    assumption: "Onboarding plasma ke sistem traceability 8 rb petani/bulan",
    expected: "Cakupan traceability ekspor EU 100% pada Q4 2026",
    actual: "Cakupan 74% per Mei — di bawah jalur menuju Q4",
    variance: "-26 pts vs jalur",
    tone: "warn",
    why: "Onboarding petani plasma lebih lambat dari asumsi (5 rb/bulan aktual).",
    lesson: "Target yang bergantung pihak ketiga (plasma) butuh insentif & buffer waktu, bukan hanya sistem.",
  },
  {
    id: "DEC-2025-029",
    title: "Cash Pooling Grup",
    decided: "18 Sep 2025",
    owner: "Direktorat Keuangan Holding",
    assumption: "Seluruh rekening operasional subholding tergabung ≤6 bulan",
    expected: "Penghematan bunga neto Rp 45 M/tahun",
    actual: "Run-rate Rp 38 M/tahun (84% rekening tergabung)",
    variance: "-16%",
    tone: "warn",
    why: "Sebagian rekening regional belum migrasi karena kendala perjanjian bank daerah.",
    lesson: "Sisa ekor migrasi (16%) menahan benefit — selesaikan penuh, jangan berhenti di 80%.",
  },
  {
    id: "DEC-2025-019",
    title: "ERP Rollout Wave 2 (SGN & PTPN I)",
    decided: "22 Jul 2025",
    owner: "Direktorat TI Holding",
    assumption: "Data migrasi & change management siap per jadwal go-live Q2 2026",
    expected: "Go-live Q2 2026; benefit efisiensi mulai terealisasi 2026",
    actual: "Go-live mundur 2 kuartal — benefit tertahan (estimasi Rp 1,17 T kumulatif)",
    variance: "Tertunda 2 kuartal",
    tone: "bad",
    why: "Kualitas data master di bawah ambang migrasi & resistensi perubahan proses di PG.",
    lesson: "Kesiapan data & manusia adalah critical path ERP — ukur readiness sebelum menetapkan tanggal go-live.",
  },
];

/**
 * Cakupan pengukuran outcome vs keputusan selesai. Dibuat eksplisit supaya
 * "3 kartu outcome" tidak terbaca sebagai "hanya 3 keputusan yang dieksekusi"
 * — dan supaya gap pengukuran (28 keputusan belum diukur ulang) terlihat
 * sebagai pekerjaan governance, bukan disembunyikan.
 */
export const outcomeCoverage = {
  measured: decisionOutcomes.length,
  totalDone: STRATEGI.keputusanSelesai,
};

/**
 * Decision Portfolio: kualitas pengambilan keputusan Direksi sebagai
 * portofolio, bukan antrian. Hitungan status selaras sbdKpi (46 = 31 selesai
 * + 12 berjalan + 3 overdue); nilai finansial dihitung hanya dari keputusan
 * yang punya angka — tidak menyamaratakan yang belum diukur.
 */
export const decisionPortfolio = {
  total: 46,
  done: STRATEGI.keputusanSelesai,
  running: 12,
  overdue: 3,
  /** Nilai menunggu keputusan: 3 antrian CEO (0,32 T/thn + 1,4 T + 1,1 T). */
  valueAtStakeRpT: 2.82,
  /**
   * Expected vs realized dari keputusan terukur yang bernilai finansial:
   * pengadaan (target FY Rp 0,85 T · realisasi Rp 0,386 T YTD) + divestasi
   * tahap 0 (Rp 0,90 T · Rp 0,74 T) + cash pooling (Rp 0,045 T/thn · run-rate
   * Rp 0,038 T). Keputusan non-finansial (replanting, capex PG, EUDR) dan
   * benefit ERP yang tertahan (diukur setelah go-live) tidak dihitung.
   */
  expectedMeasuredRpT: 1.8,
  realizedRpT: 1.16,
  realizationPct: Math.round((1.164 / 1.795) * 100),
};

/* ── 9. Alerts ────────────────────────────────────────────────────── */

export interface StgAlert {
  title: string;
  desc: string;
  tone: "red" | "amber" | "blue";
}

export const stgAlerts: StgAlert[] = [
  {
    title: "3 inisiatif Off Track",
    desc: "Perluasan areal tebu, restrukturisasi 11 PG, elektrifikasi pabrik — perlu keputusan Direksi Q3.",
    tone: "red",
  },
  {
    title: "19 milestone terlambat",
    desc: "8 di antaranya pada program Swasembada Gula; 7 milestone kritis jatuh tempo ≤30 hari.",
    tone: "red",
  },
  {
    title: "Gap pendanaan portofolio Rp 6,9 T",
    desc: "Alokasi baru Rp 14,9 T dari kebutuhan Rp 21,8 T — menunggu keputusan funding mix.",
    tone: "amber",
  },
  {
    title: "Skor SGN turun 2 kuartal beruntun",
    desc: "82,6 (Q2) dari 83,4 (Q4-25); driver: rendemen & HPP gula.",
    tone: "amber",
  },
];

/* ── 10. Insight & rekomendasi ────────────────────────────────────── */

export const stgInsights: StgInsight[] = [
  {
    title: "Prioritaskan unblocking Swasembada Gula",
    text: "3 keputusan struktural (restrukturisasi PG, perluasan areal, kemitraan bioetanol) menahan 5 inisiatif senilai Rp 2,6 T uplift. Jadikan agenda tunggal Radirsus Q3.",
    tone: "bad",
    meta: {
      jenis: "Rekomendasi",
      confidencePct: 80,
      evidence: "Register 28 inisiatif · aging keputusan BOD · milestone tracker",
    },
  },
  {
    title: "Realokasi pendanaan ke inisiatif ber-run-rate tinggi",
    text: "Efisiensi biaya & yield menyumbang 59% value creation YTD dengan investasi terkecil — layak menyerap gap alokasi sebelum capex hilirisasi tahap II.",
    tone: "info",
    meta: {
      jenis: "Rekomendasi",
      confidencePct: 74,
      evidence: "Dekomposisi value creation YTD · alokasi investasi per tema",
    },
  },
  {
    title: "Kunci momentum hilirisasi",
    text: "Refinery & minyak goreng ahead of plan; amankan komitmen offtake dan jadwal komisioning agar benefit masuk sebelum musim harga lemah Q4.",
    tone: "good",
    meta: {
      jenis: "Prediksi",
      confidencePct: 68,
      evidence: "Progres fisik vs rencana · pola musiman harga CPO Q4",
    },
  },
];
