import { KEUANGAN, PEMASARAN, RKAP_YTD, STEMPEL_DATA } from "./group-baseline";
import {
  ceoValueBrutoRpT,
  ceoValueLeakageRpT,
  ceoValueSummary,
  enterpriseRiskValue,
} from "./ceo-data";
import { stgDecisions } from "./stg-data";
import { dataTrust as hcDataTrust } from "./hc-data";
import type { AiMetaInfo } from "@/components/shared/AiMeta";

/**
 * Konten Executive Guide — "Read the Enterprise. Understand the Signals.
 * Make the Decision." Semua angka contoh diturunkan dari lib data yang sama
 * dengan dashboard (group-baseline, ceo-data, stg-data) agar guide tidak
 * pernah menampilkan angka yang berbeda dari halaman yang diajarkannya.
 */

const id1 = (n: number) => n.toLocaleString("id-ID", { maximumFractionDigits: 1 });
const id2 = (n: number) =>
  n.toLocaleString("id-ID", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

/* ── Navigasi antar halaman guide ─────────────────────────────────── */

export interface GuidePage {
  label: string;
  href: string;
}

export const GUIDE_PAGES: GuidePage[] = [
  { label: "Start Here", href: "/executive-guide" },
  { label: "Baca 60 Detik", href: "/executive-guide/baca-60-detik" },
  { label: "Warna & Trust", href: "/executive-guide/warna-dan-trust" },
  { label: "Cara Memutuskan", href: "/executive-guide/cara-memutuskan" },
  { label: "Literasi AI", href: "/executive-guide/literasi-ai" },
  { label: "Pertanyaan Eksekutif", href: "/executive-guide/pertanyaan-eksekutif" },
  { label: "Kasus Eksekutif", href: "/executive-guide/kasus-eksekutif" },
];

export const GUIDE_TAGLINE =
  "Read the Enterprise. Understand the Signals. Make the Decision.";

export const GUIDE_INTRO =
  "Executive Guide bukan panduan memakai aplikasi, melainkan panduan membaca " +
  "perusahaan melalui Executive Operating System: cara membaca sinyal, memahami " +
  "dampak bisnis, dan mengambil keputusan yang lebih baik.";

/* ── Landing: empat kartu pintu masuk ─────────────────────────────── */

export interface GuideLandingCard {
  num: string;
  tag: string;
  title: string;
  desc: string;
  href: string;
}

export const guideLandingCards: GuideLandingCard[] = [
  {
    num: "01",
    tag: "START HERE",
    title: "Baca 60 Detik",
    desc: "Cara membaca Executive Operating System dalam 60 detik: urutan enam langkah dari Data Trust sampai keputusan.",
    href: "/executive-guide/baca-60-detik",
  },
  {
    num: "02",
    tag: "UNDERSTAND",
    title: "Warna, Status & Data Trust",
    desc: "Arti green/amber/red/extreme, mengapa red bukan berarti rugi, cara membaca Data Trust Index dan lapisan waktu.",
    href: "/executive-guide/warna-dan-trust",
  },
  {
    num: "03",
    tag: "DECIDE",
    title: "Cara Memutuskan",
    desc: "Issue → Evidence → Impact → Options → Recommendation → Decision → Owner → Deadline, dengan contoh keputusan nyata.",
    href: "/executive-guide/cara-memutuskan",
  },
  {
    num: "04",
    tag: "AI & LITERACY",
    title: "Literasi Keputusan & AI",
    desc: "Membedakan information, signal, insight, risk, recommendation, decision — dan cara membaca rekomendasi AI.",
    href: "/executive-guide/literasi-ai",
  },
  {
    num: "05",
    tag: "CHALLENGE",
    title: "Pertanyaan Eksekutif",
    desc: "Question Engine: 5 situasi × 8 pertanyaan yang harus diajukan sebelum menerima rekomendasi — dashboard menjawab, eksekutif bertanya.",
    href: "/executive-guide/pertanyaan-eksekutif",
  },
  {
    num: "06",
    tag: "PRACTICE",
    title: "Kasus Eksekutif",
    desc: "Learning mode: kasus dari data real dashboard, tulis reasoning Anda dulu, baru bandingkan dengan Executive Analysis.",
    href: "/executive-guide/kasus-eksekutif",
  },
];

/* ── Executive Reading Journey (9 langkah) ────────────────────────── */

export interface JourneyStep {
  q: string;
  desc: string;
  href: string;
  hrefLabel: string;
}

export const readingJourney: JourneyStep[] = [
  {
    q: "What changed?",
    desc: "Tiga perubahan terpenting sejak brief terakhir.",
    href: "/",
    hrefLabel: "Brief Eksekutif Terkini",
  },
  {
    q: "Why did it change?",
    desc: "Driver, variance, dan penyebab operasional di balik perubahan.",
    href: "/strategi-kinerja",
    hrefLabel: "Strategi & Kinerja",
  },
  {
    q: "How material?",
    desc: "Seberapa besar dampak finansial dan strategisnya.",
    href: "/",
    hrefLabel: "Key Strategic KPI",
  },
  {
    q: "What is at risk?",
    desc: "Risiko dengan eksposur rupiah terbesar terhadap enterprise value.",
    href: "/risiko-kepatuhan",
    hrefLabel: "Risiko & Kepatuhan",
  },
  {
    q: "What value is at stake?",
    desc: "Apa yang menciptakan nilai dan apa yang menggerusnya (leakage).",
    href: "/strategi-kinerja/value-creation",
    hrefLabel: "Value Creation",
  },
  {
    q: "What decision is needed?",
    desc: "Keputusan yang menunggu Direksi, lengkap dengan eksposurnya.",
    href: "/strategi-kinerja/keputusan-bod",
    hrefLabel: "BOD Decision Center",
  },
  {
    q: "Who owns it?",
    desc: "Direktorat/pemilik yang menjalankan keputusan.",
    href: "/strategi-kinerja/keputusan-bod",
    hrefLabel: "BOD Decision Center",
  },
  {
    q: "When is it due?",
    desc: "Tenggat dan umur keputusan (decision aging).",
    href: "/strategi-kinerja/keputusan-bod",
    hrefLabel: "Decision Aging",
  },
  {
    q: "What was the outcome?",
    desc: "Realisasi dampak vs janji saat keputusan diambil.",
    href: "/strategi-kinerja/keputusan-bod",
    hrefLabel: "Decision Outcome",
  },
];

/* ── Baca 60 detik (6 langkah) ────────────────────────────────────── */

export interface SixtySecondStep {
  num: string;
  title: string;
  question: string;
  where: string;
  href: string;
}

export const sixtySecondRead: SixtySecondStep[] = [
  {
    num: "①",
    title: "Data Trust",
    question: "Apakah data cukup andal untuk dipakai memutuskan?",
    where: "Strip Data Trust di bagian atas dashboard utama",
    href: "/",
  },
  {
    num: "②",
    title: "What Changed?",
    question: "Apa tiga perubahan paling penting?",
    where: "Brief Eksekutif Terkini · “3 Hal yang Berubah”",
    href: "/",
  },
  {
    num: "③",
    title: "What Matters?",
    question: "Apa dampak bisnisnya — material atau noise?",
    where: "Key Strategic KPI + Value Creation",
    href: "/",
  },
  {
    num: "④",
    title: "What Is at Risk?",
    question: "Risiko mana yang eksposurnya terbesar?",
    where: "Enterprise Risk-to-Value",
    href: "/",
  },
  {
    num: "⑤",
    title: "What Needs My Decision?",
    question: "Keputusan apa yang membutuhkan Direksi?",
    where: "Antrian Keputusan CEO · BOD Decision Center",
    href: "/strategi-kinerja/keputusan-bod",
  },
  {
    num: "⑥",
    title: "What Happens Next?",
    question: "Apa action-nya, siapa owner-nya, kapan due-nya?",
    where: "Baris owner & due di setiap kartu keputusan",
    href: "/strategi-kinerja/keputusan-bod",
  },
];

/* ── Pola baca universal: NUMBER → DELTA → DRIVER → IMPACT → ACTION ── */

export interface PatternStage {
  stage: string;
  value: string;
  note: string;
}

const ebitdaDeltaPct = ((KEUANGAN.ebitdaYtd - RKAP_YTD.ebitdaRpT) / RKAP_YTD.ebitdaRpT) * 100;

export const readingPattern: PatternStage[] = [
  {
    stage: "NUMBER",
    value: `EBITDA Rp ${id2(KEUANGAN.ebitdaYtd)} T`,
    note: "Jangan berhenti di angka.",
  },
  {
    stage: "DELTA",
    value: `+${id1(ebitdaDeltaPct)}% vs prorata RKAP (Rp ${id1(RKAP_YTD.ebitdaRpT)} T)`,
    note: "Bandingkan selalu terhadap target periode yang sama.",
  },
  {
    stage: "DRIVER",
    value: "Efisiensi biaya + hilirisasi",
    note: "Apa yang menggerakkan delta — lihat dekomposisi Value Creation.",
  },
  {
    stage: "IMPACT",
    value: `Value creation netto Rp ${id2(ceoValueSummary.ytdRpT)} T YTD`,
    note: `Bruto Rp ${id2(ceoValueBrutoRpT)} T − leakage Rp ${id2(Math.abs(ceoValueLeakageRpT))} T.`,
  },
  {
    stage: "ACTION",
    value: "Pertahankan program efisiensi, akselerasi hilirisasi",
    note: "Setiap bacaan berakhir pada tindakan atau keputusan.",
  },
];

/* ── Empat pertanyaan KPI ─────────────────────────────────────────── */

export const kpiQuestions: { q: string; desc: string }[] = [
  { q: "Actual", desc: "Di mana kita sekarang?" },
  { q: "Target", desc: "Ke mana kita harus pergi?" },
  { q: "Delta", desc: "Seberapa besar gap terhadap prorata target?" },
  { q: "Trend", desc: "Apakah gap membaik atau memburuk?" },
];

/* ── Ritual harian 5 menit ────────────────────────────────────────── */

export interface RoutineMinute {
  minute: string;
  focus: string;
  href: string;
}

export const dailyRoutine: RoutineMinute[] = [
  { minute: "Menit 1", focus: "Brief Eksekutif Terkini", href: "/" },
  { minute: "Menit 2", focus: "Key Strategic & Financial KPI", href: "/keuangan" },
  { minute: "Menit 3", focus: "Enterprise Risk-to-Value", href: "/risiko-kepatuhan" },
  { minute: "Menit 4", focus: "Antrian Keputusan (Decision Queue)", href: "/strategi-kinerja/keputusan-bod" },
  { minute: "Menit 5", focus: "External Signals + AI Insight", href: "/" },
];

export const routinePhilosophy = {
  do: "Scan → Identify → Drill → Decide",
  dont: "Browse → Browse → Browse → Browse",
};

/* ── What not to do ───────────────────────────────────────────────── */

export const dontList: string[] = [
  "Membaca semua KPI satu per satu — mulai dari yang berubah dan material.",
  "Menganggap green = tidak perlu perhatian; green strategis tetap perlu dibaca.",
  "Menganggap red = perusahaan gagal; red berarti deviasi/eksposur melewati threshold.",
  "Menganggap forecast sebagai actual.",
  "Menganggap rekomendasi AI sebagai keputusan.",
  "Membandingkan angka tanpa melihat as-of date.",
  "Menggunakan metrik tanpa memahami definisinya — cek Data Dictionary.",
  "Mengabaikan Data Trust sebelum mengambil keputusan material.",
];

/* ── Warna & status ───────────────────────────────────────────────── */

export interface StatusDef {
  code: "GREEN" | "AMBER" | "RED" | "EXTREME";
  dot: string;
  meaning: string;
  implication: string;
}

export const statusLegend: StatusDef[] = [
  {
    code: "GREEN",
    dot: "#16a34a",
    meaning: "Within tolerance / on track.",
    implication:
      "Tidak membutuhkan intervensi Direksi, kecuali ada strategic significance.",
  },
  {
    code: "AMBER",
    dot: "#d98b06",
    meaning: "Deviasi yang membutuhkan perhatian manajemen.",
    implication: "Direksi perlu memahami driver dan action yang sedang berjalan.",
  },
  {
    code: "RED",
    dot: "#ef4444",
    meaning: "Deviasi material / risiko yang membutuhkan intervensi.",
    implication: "Kemungkinan besar masuk Decision Center.",
  },
  {
    code: "EXTREME",
    dot: "#111827",
    meaning: "Potensi penggerusan enterprise value.",
    implication: "Eskalasi segera ke Direksi.",
  },
];

/** Contoh kontras: status mengikuti threshold, bukan “baik/buruk”. */
export interface RedNotBadExample {
  metric: string;
  reading: string;
  status: StatusDef["code"];
  why: string;
}

const capexProrataPct = (5 / 12) * 100;
const cpoRisk = enterpriseRiskValue.find((r) => r.risk.includes("CPO"));

export const redNotBad: RedNotBadExample[] = [
  {
    metric: "EBITDA YTD",
    reading: `Rp ${id2(KEUANGAN.ebitdaYtd)} T (+${id1(ebitdaDeltaPct)}% vs prorata RKAP)`,
    status: "GREEN",
    why: "Kinerja di atas jalur target — sehat, tapi tetap baca driver-nya.",
  },
  {
    metric: "Realisasi Capex",
    reading: `${id1(KEUANGAN.capexRealisasiPct)}% vs prorata ${id1(capexProrataPct)}%`,
    status: "AMBER",
    why: "Deviasi eksekusi, bukan kerugian — pertanyaannya: kenapa serapan lambat?",
  },
  {
    metric: "Eksposur harga CPO",
    reading: cpoRisk ? `${cpoRisk.exposure} (volume belum terjual)` : "Eksposur volume belum terjual",
    status: "RED",
    why: "Red bukan berarti rugi — eksposur melewati threshold sehingga butuh keputusan hedging.",
  },
];

/* ── Data Trust ───────────────────────────────────────────────────── */

export const trustHeadline = {
  example: hcDataTrust.quality,
  caption:
    `Trust ${hcDataTrust.quality} bukan berarti “${hcDataTrust.quality} data benar” — ` +
    "ini composite indicator dari tujuh komponen di bawah.",
};

export const trustComponents: { label: string; desc: string }[] = [
  { label: "Completeness", desc: "Seberapa lengkap data terisi dari seluruh unit pelapor." },
  { label: "Accuracy", desc: "Seberapa akurat nilai terhadap sumber transaksi." },
  { label: "Timeliness", desc: "Seberapa segar data terhadap jadwal pelaporan." },
  { label: "Consistency", desc: "Konsistensi definisi & angka lintas sistem/halaman." },
  { label: "Reconciliation", desc: "Kecocokan agregat dengan sumber resmi (mis. GL)." },
  { label: "Certification", desc: "Porsi data yang sudah disertifikasi pemilik data." },
  { label: "Lineage", desc: "Kejelasan jejak asal-usul data dari sumber ke dashboard." },
];

export const trustRules: { range: string; rule: string; tone: "green" | "amber" | "red" }[] = [
  { range: "95+", rule: "Normal — data layak dipakai untuk keputusan.", tone: "green" },
  { range: "90–95", rule: "Attention — baca komponen yang menurun sebelum memakai angka.", tone: "amber" },
  {
    range: "< 90",
    rule: "Validate — verifikasi ke pemilik data sebelum keputusan material.",
    tone: "red",
  },
];

/* ── Lapisan waktu (How to Read Time) ─────────────────────────────── */

export interface TimeLayer {
  label: string;
  value: string;
  desc: string;
}

export const timeLayers: TimeLayer[] = [
  {
    label: "Business As-of",
    value: STEMPEL_DATA.snapshot,
    desc: "Periode bisnis yang diwakili angka; angka tidak berubah setelah tanggal ini.",
  },
  {
    label: "System Refresh",
    value: STEMPEL_DATA.refresh,
    desc: "Kapan sistem terakhir sinkronisasi — tidak menambah periode data.",
  },
  {
    label: "Market As-of",
    value: "Live / harian",
    desc: "Kapan harga pasar & sinyal eksternal diperoleh; lebih baru dari data bisnis.",
  },
  {
    label: "Forecast Run",
    value: "Per model run",
    desc: "Kapan model forecast terakhir dijalankan; proyeksi, bukan actual.",
  },
  {
    label: "Decision Due Date",
    value: "Per keputusan",
    desc: "Kapan keputusan harus diambil — dasar perhitungan decision aging.",
  },
  {
    label: "Actual Event Date",
    value: "Per kejadian",
    desc: "Kapan peristiwa benar-benar terjadi (mis. insiden, transaksi).",
  },
];

export const timeWarning =
  `Jangan membaca data per ${STEMPEL_DATA.snapshot} sebagai kondisi perusahaan hari ini — ` +
  "selalu cek pill “Data Bisnis Per …” sebelum menyimpulkan.";

/* ── Decision Reading Framework ───────────────────────────────────── */

export interface FrameworkStep {
  step: string;
  question: string;
  example: string;
}

const contoh = stgDecisions[0];

/** Contoh diambil dari keputusan nyata pertama di BOD Decision Center. */
export const decisionFramework: FrameworkStep[] = [
  { step: "ISSUE", question: "Apa masalahnya?", example: contoh.title },
  { step: "EVIDENCE", question: "Apa datanya?", example: contoh.situation },
  {
    step: "IMPACT",
    question: "Apa dampaknya?",
    example: `Potensi nilai ${contoh.exposure} yang tertahan selama keputusan tertunda.`,
  },
  {
    step: "OPTIONS",
    question: "Apa pilihan kita?",
    example: "A. Pertahankan status quo · B. Restrukturisasi · C. Kemitraan strategis.",
  },
  {
    step: "RECOMMENDATION",
    question: "Apa yang direkomendasikan?",
    example: "B — restrukturisasi, skema per PG (konsolidasi giling vs cold shutdown).",
  },
  { step: "DECISION", question: "Apa yang diminta dari Direksi?", example: contoh.decision },
  { step: "OWNER", question: "Siapa yang menjalankan?", example: "SugarCo (SGN) — direktorat terkait." },
  { step: "DEADLINE", question: "Kapan harus selesai?", example: contoh.due },
];

export const agingGuide: { label: string; desc: string; tone: "green" | "amber" | "red" }[] = [
  {
    label: "Due bulan berjalan",
    desc: "Normal — keputusan masih di dalam jendela waktunya.",
    tone: "green",
  },
  {
    label: "Overdue",
    desc: "Umur keputusan melewati tenggat; setiap hari penundaan adalah opportunity cost.",
    tone: "amber",
  },
  {
    label: "Overdue + eksposur besar",
    desc: "Prioritas tertinggi antrian — nilai yang dipertaruhkan paling besar.",
    tone: "red",
  },
];

/* ── Decision Literacy ────────────────────────────────────────────── */

export interface LiteracyLevel {
  level: string;
  example: string;
  desc: string;
}

export const literacyLadder: LiteracyLevel[] = [
  {
    level: "INFORMATION",
    example: `Harga spot CPO KPBN Rp ${PEMASARAN.cpoKpbnSpotRpKg.toLocaleString("id-ID")}/kg`,
    desc: "Fakta mentah — belum berarti apa-apa tanpa pembanding.",
  },
  {
    level: "SIGNAL",
    example: `Di atas ASP YTD (Rp ${PEMASARAN.cpoAvgYtdRpKg.toLocaleString("id-ID")}/kg) dan asumsi RKAP (Rp ${RKAP_YTD.hargaCpoRpKg.toLocaleString("id-ID")}/kg)`,
    desc: "Fakta yang sudah dibandingkan terhadap acuan.",
  },
  {
    level: "INSIGHT",
    example: "Peluang marjin membesar bila volume terjual di harga berjalan",
    desc: "Makna bisnis dari sinyal — so what?",
  },
  {
    level: "RISK",
    example: cpoRisk
      ? `Volume belum terjual belum di-hedge — eksposur ${cpoRisk.exposure}`
      : "Volume belum terjual belum di-hedge",
    desc: "Sisi bawah dari insight yang sama.",
  },
  {
    level: "RECOMMENDATION",
    example: "Naikkan cakupan lindung nilai / percepat kontrak penjualan",
    desc: "Usulan tindakan dari analis atau AI — belum keputusan.",
  },
  {
    level: "DECISION",
    example: "Setujui strategi hedging (kewenangan Direksi)",
    desc: "Baru di sini nilai diciptakan atau dilindungi.",
  },
];

/* ── How to Read AI ───────────────────────────────────────────────── */

export const aiPrinciple = "AI adalah Decision Assistant, bukan Decision Maker.";

export const aiQuestions: { q: string; desc: string }[] = [
  { q: "Evidence", desc: "Apa dasar rekomendasinya — data apa yang dipakai?" },
  { q: "Assumption", desc: "Apa asumsi model — kondisi apa yang dianggap tetap?" },
  { q: "Confidence", desc: "Seberapa yakin — dan apakah keyakinan itu diklaim atau tidak?" },
  { q: "Consequence", desc: "Apa risikonya jika rekomendasi salah?" },
];

export const aiRules: { rule: string; desc: string }[] = [
  { rule: "AI Insight ≠ Fact", desc: "Insight adalah interpretasi, bukan fakta baru." },
  { rule: "Prediction ≠ Actual", desc: "Forecast bisa meleset; selalu cek confidence & asumsi." },
  {
    rule: "Correlation ≠ Causation",
    desc: "Badge Korelasi tidak boleh dibaca sebagai sebab-akibat.",
  },
  {
    rule: "Recommendation ≠ Decision",
    desc: "Keputusan tetap kewenangan dan tanggung jawab Direksi.",
  },
];

/**
 * Contoh badge AiMeta per jenis klaim — replika badge yang muncul di kartu
 * insight seluruh aplikasi, supaya Direksi mengenalinya di halaman mana pun.
 */
export const aiMetaExamples: { meta: AiMetaInfo; reading: string }[] = [
  {
    meta: { jenis: "Korelasi", confidencePct: 82, evidence: "Regresi panel 24 bulan" },
    reading: "Dua hal bergerak bersama — belum tentu sebab-akibat.",
  },
  {
    meta: { jenis: "Kausal", confidencePct: 74, evidence: "Uji intervensi program" },
    reading: "Ada bukti sebab-akibat — periksa kekuatan desain ujinya.",
  },
  {
    meta: { jenis: "Prediksi", confidencePct: 68, evidence: "Model forecast run terakhir" },
    reading: "Proyeksi ke depan — baca bersama asumsi & skenario.",
  },
  {
    meta: { jenis: "Rekomendasi", confidencePct: 80, evidence: "Simulasi skenario + benchmark" },
    reading: "Usulan tindakan — jawab empat pertanyaan di atas sebelum menyetujui.",
  },
];
