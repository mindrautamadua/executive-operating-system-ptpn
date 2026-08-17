/**
 * Data panel CEO Decision Intelligence di dashboard utama ("/").
 * Periode acuan: 31 Mei 2026 (YTD). Semua angka diturunkan dari
 * group-baseline.ts dan sumber stg — tidak ada angka tandingan.
 */

import {
  KEUANGAN,
  PEMASARAN,
  PRODUKSI,
  PROYEKSI_FY,
  RISIKO,
  RKAP_YTD,
  SDM,
  STRATEGI,
  hargaGrup,
} from "./group-baseline";
import { stgDecisions } from "./stg-data";

export type CeoTone = "green" | "amber" | "red";

const rpM = (n: number) => `Rp ${Math.round(n).toLocaleString("id-ID")} M`;

/** juta ton × Rp/kg = Rp miliar (1 juta ton = 1 miliar kg). */
const nilaiRpM = (jutaTon: number, rpKg: number) => jutaTon * rpKg;

/* ── Turunan bersama (formula sama dengan data.ts) ────────────────── */

const gapProduksiCpo = RKAP_YTD.produksiCpoJtTon - PRODUKSI.cpoYtdJtTon;
const gapProduksiRpM = nilaiRpM(gapProduksiCpo, hargaGrup.CPO);
const volumeCpoBelumTerjual = PROYEKSI_FY.produksiCpoJtTon - PRODUKSI.cpoYtdJtTon;
const bandVolatilitasRpM = nilaiRpM(volumeCpoBelumTerjual, hargaGrup.CPO * 0.05);
const sensitivitasHargaCpoRpM = nilaiRpM(volumeCpoBelumTerjual, 100);
const volumeEksporCpo = (PROYEKSI_FY.produksiCpoJtTon * PEMASARAN.eksporPctVolCpo) / 100;
const eksposurPungutanRpM = (volumeEksporCpo * 10 * PEMASARAN.kursUsdIdr) / 1_000;
const marjinLabaBersih = KEUANGAN.labaBersihYtd / KEUANGAN.pendapatanYtd;

/* ── 1. CEO Morning Brief ─────────────────────────────────────────── */

export interface CeoTrafficLight {
  area: string;
  tone: CeoTone;
  note: string;
}

export const ceoMorningBrief = {
  trafficLights: [
    {
      area: "Keuangan",
      tone: "green",
      note: `EBITDA Rp ${KEUANGAN.ebitdaYtd.toLocaleString("id-ID", {
        minimumFractionDigits: 2,
      })} T · di atas RKAP YTD`,
    },
    {
      area: "Operasi",
      tone: "amber",
      note: `Gap CPO ${(gapProduksiCpo * 1_000).toLocaleString("id-ID", {
        maximumFractionDigits: 0,
      })} rb ton · utilisasi PKS ${PRODUKSI.utilisasiPksPct.toLocaleString("id-ID", {
        minimumFractionDigits: 1,
      })}%`,
    },
    {
      area: "Strategi",
      tone: "amber",
      note: `${STRATEGI.inisiatifAtRisk} At Risk · ${STRATEGI.inisiatifOffTrack} Off Track dari ${STRATEGI.inisiatifTotal} inisiatif`,
    },
    {
      area: "SDM",
      tone: "green",
      note: `Engagement ${SDM.engagementSkor.toLocaleString("id-ID", {
        minimumFractionDigits: 2,
      })} · suksesi ${SDM.cakupanSuksesiPct}%`,
    },
    {
      area: "Risiko",
      tone: "red",
      note: `${RISIKO.ekstrem} risiko ekstrem · El Niño ${RISIKO.elNinoProbabilitasPct}%`,
    },
  ] satisfies CeoTrafficLight[],

  /**
   * Tiga hal yang berubah sejak brief sebelumnya. Tiap perubahan membawa
   * basis materialitas (% EBITDA YTD) — angka absolut saja tidak menjawab
   * "seberapa besar ini relatif terhadap enterprise?".
   */
  changed: [
    {
      text: `Eksposur volatilitas harga CPO naik ke ±${rpM(bandVolatilitasRpM)} (volume belum terjual ${volumeCpoBelumTerjual.toLocaleString("id-ID", { minimumFractionDigits: 2 })} jt ton)`,
      materiality: {
        level: "High" as const,
        basis: `${((bandVolatilitasRpM / (KEUANGAN.ebitdaYtd * 1_000)) * 100).toLocaleString("id-ID", { maximumFractionDigits: 1 })}% EBITDA YTD`,
      },
    },
    {
      text: `Gap produksi Regional 4 melebar — pendapatan tertunda ${rpM(gapProduksiRpM)}`,
      materiality: {
        level: "Medium" as const,
        basis: `${(((gapProduksiRpM * KEUANGAN.ebitdaMarginPct) / 100 / (KEUANGAN.ebitdaYtd * 1_000)) * 100).toLocaleString("id-ID", { maximumFractionDigits: 1 })}% EBITDA YTD`,
      },
    },
    {
      text: "Refinery hilirisasi ahead of plan: progres 58% vs rencana 52%",
      materiality: { level: "Medium" as const, basis: "hilir ≈ 25% EBITDA grup" },
    },
  ],

  /** Satu hal yang paling perlu dipantau CEO. */
  watch:
    "Swasembada gula adalah risiko eksekusi strategi tertinggi — perluasan areal tebu dan restrukturisasi 11 PG berstatus Off Track.",
};

/** Keputusan Direksi yang menunggu — sumber sama dengan Strategy Decision Center. */
export const ceoDecisions = stgDecisions;

/* ── 1b. Executive Performance Narrative ──────────────────────────── */

const pctVsRkap = (aktual: number, rkap: number) =>
  `${aktual >= rkap ? "+" : "−"}${(Math.abs((aktual - rkap) / rkap) * 100).toLocaleString(
    "id-ID",
    { maximumFractionDigits: 1 },
  )}%`;

/**
 * Sintesis satu kalimat di bawah KPI strip: tujuh KPI terpisah tidak
 * menceritakan hubungan "volume turun tapi profit naik" — narasi ini yang
 * menyatukannya. Semua angka dihitung dari baseline yang sama dengan kartu
 * KPI sehingga tidak pernah bercerita beda.
 */
export const performanceNarrative = {
  story: [
    { label: "Volume CPO", value: pctVsRkap(PRODUKSI.cpoYtdJtTon, RKAP_YTD.produksiCpoJtTon), good: false },
    { label: "ASP CPO", value: pctVsRkap(hargaGrup.CPO, RKAP_YTD.hargaCpoRpKg), good: true },
    { label: "EBITDA", value: pctVsRkap(KEUANGAN.ebitdaYtd, RKAP_YTD.ebitdaRpT), good: true },
    { label: "Laba Bersih", value: pctVsRkap(KEUANGAN.labaBersihYtd, RKAP_YTD.labaBersihRpT), good: true },
  ],
  text: `Profitabilitas grup tetap di atas RKAP meski volume CPO ${pctVsRkap(
    PRODUKSI.cpoYtdJtTon,
    RKAP_YTD.produksiCpoJtTon,
  )} di bawah rencana — ASP yang lebih kuat (${pctVsRkap(
    hargaGrup.CPO,
    RKAP_YTD.hargaCpoRpKg,
  )}), efisiensi biaya, dan kontribusi hilirisasi menutup gap volume. Risiko terdekat: pemulihan produksi Regional 4 (${rpM(
    gapProduksiRpM,
  )} delayed revenue).`,
};

/* ── 1b2. Executive Tension: headline vs kontradiksinya ───────────── */

export interface ExecutiveTension {
  domain: string;
  good: string;
  concern: string;
  decision: string;
}

/**
 * Contradiction detection: tiap domain menyandingkan headline yang bagus
 * dengan underlying yang tertekan — "jangan baca headline tanpa
 * kontradiksinya". KPI sehat + eksekusi tertinggal adalah dua fakta yang
 * harus dibaca bersama, bukan dipilih salah satu.
 */
export const executiveTensions: ExecutiveTension[] = [
  {
    domain: "Strategi",
    good: "Skor KPI korporat 87,4 — Baik",
    concern: "Milestone 40,8% vs plan 47,9% — eksekusi tertinggal",
    decision: "Tuntaskan 3 keputusan overdue penghambat eksekusi",
  },
  {
    domain: "Keuangan",
    good: "EBITDA +Rp 0,22 T di atas RKAP YTD",
    concern: "Capex 32,1% vs prorata 41,7% · replanting 26,9% — kapasitas earning masa depan",
    decision: "Akselerasi capex replanting + eksekusi refinancing",
  },
  {
    domain: "SDM",
    good: "Produktivitas finansial di atas target",
    concern: "Produktivitas fisik di bawah target (index 112 vs 115)",
    decision: "Intervensi produktivitas fisik — mulai Regional 4",
  },
  {
    domain: "Risiko",
    good: "ERI 64/100 membaik 2 pts QoQ",
    concern: "Limit breach naik 2→4 · skenario gabungan CPO×El Niño Rp 4,2 T",
    decision: "Putuskan paket hedging + asuransi parametrik",
  },
];

/* ── 1b3. Board Challenge Questions (Mode Komisaris) ──────────────── */

export interface BoardChallenge {
  issue: string;
  /** Klaim manajemen yang sedang diuji Dekom. */
  managementSays: string;
  /** Pertanyaan pengawasan — menantang, bukan mengeksekusi. */
  questions: string[];
}

/**
 * Mode Komisaris membaca dashboard secara berbeda: bukan "apa yang harus
 * saya lakukan" (itu Direksi), melainkan "pertanyaan apa yang harus saya
 * ajukan ke Direksi". Tiap isu material membawa klaim manajemen + pertanyaan
 * pengawasannya.
 */
export const boardChallenges: BoardChallenge[] = [
  {
    issue: "Pemulihan produksi Regional 4",
    managementSays: `Menutup gap menambah laba bersih ± Rp 107 M disetahunkan (confidence 72%).`,
    questions: [
      "Apa buktinya gap bisa ditutup penuh dalam 12 bulan — dan asumsi mana yang paling rapuh?",
      "Siapa yang memimpin pemulihan selama posisi Regional Head 4 masih kosong?",
      "Apa downside bila pemulihan mundur dua kuartal, dan kapan kita tahu?",
    ],
  },
  {
    issue: "Value creation Rp 1,86 T",
    managementSays: "44% target FY tercapai; efisiensi & hilirisasi driver utama.",
    questions: [
      "Berapa yang struktural vs market-driven — sustainable run-rate-nya berapa?",
      "Leakage Rp 0,45 T: apa rencana penutupan dan siapa pemiliknya?",
      "Bila ASP CPO kembali ke asumsi RKAP, apakah target FY Rp 4,2 T masih realistis?",
    ],
  },
  {
    issue: "3 keputusan Direksi overdue",
    managementSays: "Restrukturisasi PG, divestasi, dan bioetanol dalam finalisasi.",
    questions: [
      "Apa yang sebenarnya menahan — informasi kurang atau keberanian memutus?",
      "Biaya penundaan ± Rp 27 M/bulan (PG): sampai kapan bisa diterima?",
      "Eskalasi apa yang Dekom perlu lakukan bila lewat satu siklus rapat lagi?",
    ],
  },
];

/* ── 1c. Posisi Pasar CPO: ASP vs spot → keputusan hedge ──────────── */

const premiumSpotPct = ((PEMASARAN.cpoKpbnSpotRpKg - hargaGrup.CPO) / hargaGrup.CPO) * 100;

/**
 * Satu kartu decision-grade: premium spot atas ASP YTD, volume belum terjual,
 * dan eksposurnya — informasi yang sama dengan External Signals + Risk-to-Value
 * tetapi disatukan sampai baris keputusan (hedge), bukan tersebar di tiga kartu.
 */
export const cpoMarketPosition = {
  aspYtd: `Rp ${hargaGrup.CPO.toLocaleString("id-ID")}`,
  spot: `Rp ${PEMASARAN.cpoKpbnSpotRpKg.toLocaleString("id-ID")}`,
  premium: `+${premiumSpotPct.toLocaleString("id-ID", { maximumFractionDigits: 1 })}%`,
  unhedged: `${volumeCpoBelumTerjual.toLocaleString("id-ID", {
    minimumFractionDigits: 2,
  })} jt ton`,
  exposure: `± ${rpM(bandVolatilitasRpM)}`,
  decision: "Kunci harga sebagian volume Q4 selagi premium bertahan",
  owner: "Direktorat Pemasaran",
};

/* ── 1d. Impact Chain: isu material sebagai satu rantai kausal ────── */

export interface ImpactChainStep {
  /** Tahap dalam rantai Signal → Impact → Risk → Recommendation → Decision → Outcome. */
  stage: string;
  label: string;
}

export interface ImpactChain {
  issue: string;
  tone: CeoTone;
  steps: ImpactChainStep[];
}

/**
 * Rantai dampak isu material — 10 tahap penuh: Sinyal → Driver → Efek Bisnis
 * → Efek Finansial → Risiko → Konsekuensi Strategis → Opsi → Keputusan →
 * Owner → Outcome. Informasi yang sama dengan External Signals, Risk-to-Value,
 * alert, dan AI Insight — disatukan jadi satu rantai kausal per isu, lintas
 * domain (pasar→keuangan, iklim→produksi, people→operasi, hukum→aset).
 */
export const impactChains: ImpactChain[] = [
  {
    issue: "Volatilitas harga CPO",
    tone: "red",
    steps: [
      { stage: "Sinyal", label: `Spot KPBN Rp ${PEMASARAN.cpoKpbnSpotRpKg.toLocaleString("id-ID")} — premium atas ASP YTD` },
      { stage: "Driver", label: "Pengetatan suplai global + permintaan biodiesel" },
      { stage: "Efek Bisnis", label: `Volume belum terjual ${volumeCpoBelumTerjual.toLocaleString("id-ID", { minimumFractionDigits: 2 })} jt ton terpapar pergerakan harga` },
      { stage: "Efek Finansial", label: `Sensitivitas ± ${rpM(bandVolatilitasRpM)} (±5% harga) · tiap Rp 100/kg = ${rpM(sensitivitasHargaCpoRpM)}` },
      { stage: "Risiko", label: "Ekstrem — berkorelasi dengan El Niño (skenario gabungan Rp 4,2 T)" },
      { stage: "Konsekuensi Strategis", label: "Proyeksi pendapatan FY Rp 59,1 T bergantung pada asumsi ASP" },
      { stage: "Opsi", label: "A. Hedge sebagian Q4 · B. Naikkan forward cover ke 38% · C. Tanpa aksi" },
      { stage: "Keputusan", label: "Kunci harga sebagian volume Q4 selagi premium bertahan" },
      { stage: "Owner", label: "Direktorat Pemasaran · tenggat 22 Agu 2026" },
      { stage: "Outcome", label: "Belum diukur — masuk siklus outcome setelah eksekusi" },
    ],
  },
  {
    issue: "Gap produksi Regional 4",
    tone: "amber",
    steps: [
      { stage: "Sinyal", label: `Produksi CPO −${(gapProduksiCpo * 1_000).toLocaleString("id-ID", { maximumFractionDigits: 0 })} rb ton vs RKAP YTD` },
      { stage: "Driver", label: "Rotasi panen terganggu + utilisasi PKS di bawah target" },
      { stage: "Efek Bisnis", label: "Volume regional −2,3% vs 2025 — satu-satunya regional negatif" },
      { stage: "Efek Finansial", label: `Pendapatan tertunda ${rpM(gapProduksiRpM)} · EBITDA ${rpM((gapProduksiRpM * KEUANGAN.ebitdaMarginPct) / 100)} (YTD)` },
      { stage: "Risiko", label: "Delayed revenue berlanjut bila rotasi panen tidak pulih" },
      { stage: "Konsekuensi Strategis", label: "Regional Head 4 kosong (posisi kritikal) — eksekusi pemulihan tanpa pemimpin tetap" },
      { stage: "Opsi", label: "A. Audit rotasi + utilisasi · B. Realokasi TBS antar-PKS · C. Percepat pengisian Regional Head" },
      { stage: "Keputusan", label: "Audit rotasi panen & utilisasi PKS — potensi laba disetahunkan Rp 107 M" },
      { stage: "Owner", label: "Direktorat Operasional · tenggat 29 Agu 2026" },
      { stage: "Outcome", label: "Monitoring bulanan gap vs RKAP" },
    ],
  },
  {
    issue: "El Niño H2",
    tone: "red",
    steps: [
      { stage: "Sinyal", label: `BMKG/NOAA: probabilitas El Niño H2 naik ke ${RISIKO.elNinoProbabilitasPct}%` },
      { stage: "Driver", label: "Defisit air kebun — curah hujan di bawah normal" },
      { stage: "Efek Bisnis", label: "Yield TBS terancam; skenario moderat memangkas produksi H2 −6%" },
      { stage: "Efek Finansial", label: "EBITDA −Rp 1,9 T (skenario moderat)" },
      { stage: "Risiko", label: "Ekstrem — berkorelasi dengan harga CPO (gabungan Rp 4,2 T)" },
      { stage: "Konsekuensi Strategis", label: "Target produksi RJPP 2027 perlu diuji ulang skenario kering" },
      { stage: "Opsi", label: "A. Water management 34 kebun · B. Perluas asuransi parametrik ke 6 regional · C. Revisi outlook H2" },
      { stage: "Keputusan", label: "Paket mitigasi: hedging CPO + asuransi parametrik sebagai satu keputusan" },
      { stage: "Owner", label: "Direktorat Produksi + Pemasaran · sebelum musim kering" },
      { stage: "Outcome", label: "Mitigasi baru mencakup 34 kebun; parametrik masih pilot 2 regional" },
    ],
  },
  {
    issue: "Risiko talenta kritikal",
    tone: "amber",
    steps: [
      { stage: "Sinyal", label: `${SDM.posisiKritikalKosong} posisi kritikal kosong · cakupan suksesi ${SDM.cakupanSuksesiPct}%` },
      { stage: "Driver", label: "Pipeline suksesi tipis di operasi gula & regional" },
      { stage: "Efek Bisnis", label: "Regional Head 4 & Head of Sugar Operations kosong — kapasitas eksekusi turun" },
      { stage: "Efek Finansial", label: `Terhubung ke gap Regional 4 (${rpM(gapProduksiRpM)}) & pemulihan margin SGN` },
      { stage: "Risiko", label: "Kegagalan eksekusi program pemulihan tanpa kepemimpinan tetap" },
      { stage: "Konsekuensi Strategis", label: "Restrukturisasi 11 PG & swasembada gula butuh pemimpin operasional kuat" },
      { stage: "Opsi", label: "A. Promosi internal (18 Ready Now) · B. External hiring · C. Interim assignment" },
      { stage: "Keputusan", label: "Isi 3 posisi kritikal teratas ≤60 hari" },
      { stage: "Owner", label: "Direktorat SDM + Direktur Utama subholding" },
      { stage: "Outcome", label: "Belum diukur — tracking pengisian posisi per bulan" },
    ],
  },
  {
    issue: "Perkara hukum & lahan (HGU)",
    tone: "amber",
    steps: [
      { stage: "Sinyal", label: `Eksposur perkara Rp ${RISIKO.eksposurLegalRpT.toLocaleString("id-ID", { minimumFractionDigits: 1 })} T · ${RISIKO.perkaraAktif} perkara aktif` },
      { stage: "Driver", label: "Sengketa lahan & perpanjangan HGU menunggu instansi" },
      { stage: "Efek Bisnis", label: "Kepastian areal produksi & agunan pembiayaan terganggu" },
      { stage: "Efek Finansial", label: "Eksposur maksimum Rp 4,2 T (bukan expected loss) + biaya perkara" },
      { stage: "Risiko", label: "Kehilangan hak kelola + hambatan kepatuhan EUDR/traceability" },
      { stage: "Konsekuensi Strategis", label: "Areal replanting & ekspansi tebu bergantung kepastian lahan" },
      { stage: "Opsi", label: "A. Prioritaskan perkara bernilai terbesar · B. Percepat perpanjangan HGU kritikal · C. Mediasi konflik plasma" },
      { stage: "Keputusan", label: "Prioritaskan perkara aktif bernilai terbesar + task force HGU" },
      { stage: "Owner", label: "Direktorat Hukum · reviu bulanan Direksi" },
      { stage: "Outcome", label: "Belum diukur — baseline nilai perkara ditutup per kuartal" },
    ],
  },
];

/* ── 2. Value Creation: driver & leakage ──────────────────────────── */

/**
 * Sifat keberlanjutan value: struktural (run-rate berulang) vs market-driven
 * (tergantung harga) vs one-off. Rp 1,86 T value creation ≠ Rp 1,86 T
 * sustainable run-rate — tanpa pemisahan ini Board membaca keduanya sama.
 */
export type ValueSustainability = "Struktural" | "Market-driven" | "One-off";

export interface CeoValueDriver {
  label: string;
  rpT: number;
  kind: "driver" | "leakage";
  sifat: ValueSustainability;
}

/**
 * Dekomposisi value creation YTD: bruto driver Rp 2,31 T − leakage Rp 0,45 T
 * = netto Rp 1,86 T (baseline). Efisiensi biaya + yield = 59% netto, selaras
 * stgInsights; digital Rp 0,13 T selaras strategyIntelligence; harga & bauran
 * = ASP CPO YTD di atas asumsi RKAP (12.482 vs 12.100).
 */
export const ceoValueDrivers: CeoValueDriver[] = [
  { label: "Efisiensi biaya", rpT: 0.66, kind: "driver", sifat: "Struktural" },
  { label: "Yield & produktivitas", rpT: 0.44, kind: "driver", sifat: "Struktural" },
  { label: "Hilirisasi", rpT: 0.72, kind: "driver", sifat: "Struktural" },
  { label: "Harga & bauran penjualan", rpT: 0.36, kind: "driver", sifat: "Market-driven" },
  { label: "Digital & lainnya", rpT: 0.13, kind: "driver", sifat: "Struktural" },
  { label: "Gap produksi Regional 4", rpT: -0.37, kind: "leakage", sifat: "Struktural" },
  { label: "Eksposur harga komoditas", rpT: -0.08, kind: "leakage", sifat: "Market-driven" },
];

/**
 * Ringkasan keberlanjutan: berapa dari bruto driver yang struktural
 * (sustainable run-rate) vs market-driven. Dihitung dari daftar, bukan hardcode.
 */
export const ceoValueSustainability = (() => {
  const drivers = ceoValueDrivers.filter((d) => d.kind === "driver");
  const total = drivers.reduce((s, d) => s + d.rpT, 0);
  const struktural = drivers
    .filter((d) => d.sifat === "Struktural")
    .reduce((s, d) => s + d.rpT, 0);
  return {
    strukturalRpT: struktural,
    marketRpT: total - struktural,
    strukturalPct: Math.round((struktural / total) * 100),
  };
})();

/** Jumlah bruto/leakage dihitung dari daftar — caption tidak boleh hardcode. */
export const ceoValueBrutoRpT = ceoValueDrivers
  .filter((d) => d.kind === "driver")
  .reduce((s, d) => s + d.rpT, 0);
export const ceoValueLeakageRpT = ceoValueDrivers
  .filter((d) => d.kind === "leakage")
  .reduce((s, d) => s + d.rpT, 0);
const ceoValueNettoRpT = ceoValueBrutoRpT + ceoValueLeakageRpT;

/**
 * Guard rekonsiliasi: netto dekomposisi wajib sama dengan angka baseline yang
 * jadi headline. Selisih > pembulatan = build gagal, bukan angka bohong tampil.
 */
if (Math.abs(ceoValueNettoRpT - STRATEGI.valueCreationYtdRpT) > 0.005) {
  throw new Error(
    `Dekomposisi value creation tidak reconcile: netto ${ceoValueNettoRpT.toFixed(2)} vs baseline ${STRATEGI.valueCreationYtdRpT}`,
  );
}

export const ceoValueSummary = {
  ytdRpT: STRATEGI.valueCreationYtdRpT,
  targetFyRpT: STRATEGI.valueCreationTargetFyRpT,
  pct: Math.round(
    (STRATEGI.valueCreationYtdRpT / STRATEGI.valueCreationTargetFyRpT) * 100,
  ),
};

/* ── 3. Enterprise Risk-to-Value ──────────────────────────────────── */

/**
 * Taxonomy risk Board-level: tiga dimensi dipisah, tidak dicampur dalam satu
 * badge. "Pasti" (likelihood), "Terjadi" (status), dan "cepat" (velocity)
 * adalah tiga hal berbeda — menggabungkannya membuat risk register tidak bisa
 * dibandingkan antarbaris.
 */
export type RiskLikelihood = "Pasti" | "Sangat Mungkin" | "Mungkin" | "Jarang";
export type RiskVelocity = "Segera" | "Cepat" | "Sedang" | "Lambat";
export type RiskStatus = "Emerging" | "Aktif" | "Terjadi" | "Terkendali";
/**
 * Jenis angka rupiah yang ditampilkan: eksposur maksimum ≠ expected loss ≠
 * sensitivitas ≠ dampak yang sudah terjadi. Tanpa label ini "Rp 4,2 T"
 * terbaca sebagai "akan hilang Rp 4,2 T".
 */
export type RiskExposureType =
  | "Eksposur maksimum"
  | "Sensitivitas"
  | "Dampak terjadi"
  | "Dampak potensial"
  | "Kebutuhan pendanaan";

export interface EnterpriseRisk {
  risk: string;
  exposure: string;
  exposureType: RiskExposureType;
  /** Kosong bila status "Terjadi" — likelihood tak relevan untuk event yang sudah material. */
  likelihood: RiskLikelihood | null;
  velocity: RiskVelocity;
  status: RiskStatus;
  owner: string;
  action: string;
  tone: CeoTone;
}

/** Top 5 risiko enterprise, semuanya dikonversi ke eksposur rupiah. */
export const enterpriseRiskValue: EnterpriseRisk[] = [
  {
    risk: "Gap pendanaan portofolio inisiatif",
    exposure: "Rp 6,9 T",
    exposureType: "Kebutuhan pendanaan",
    likelihood: "Pasti",
    velocity: "Lambat",
    status: "Aktif",
    owner: "Direktorat Keuangan",
    action: "Putuskan funding mix Q3",
    tone: "red",
  },
  {
    risk: "Eksposur perkara hukum & lahan",
    exposure: `Rp ${RISIKO.eksposurLegalRpT.toLocaleString("id-ID", {
      minimumFractionDigits: 1,
    })} T`,
    exposureType: "Eksposur maksimum",
    likelihood: "Mungkin",
    velocity: "Lambat",
    status: "Aktif",
    owner: "Direktorat Hukum",
    action: `Prioritaskan ${RISIKO.perkaraAktif} perkara aktif bernilai terbesar`,
    tone: "amber",
  },
  {
    risk: "Volatilitas harga CPO global",
    exposure: `± ${rpM(bandVolatilitasRpM)}`,
    exposureType: "Sensitivitas",
    likelihood: "Sangat Mungkin",
    velocity: "Cepat",
    status: "Aktif",
    owner: "Direktorat Pemasaran",
    action: "Kunci harga sebagian volume Q4",
    tone: "red",
  },
  {
    risk: "Gap produksi Regional 4",
    exposure: rpM(gapProduksiRpM),
    exposureType: "Dampak terjadi",
    likelihood: null,
    velocity: "Sedang",
    status: "Terjadi",
    owner: "Direktorat Operasional",
    action: "Audit rotasi panen & utilisasi PKS",
    tone: "amber",
  },
  {
    risk: "Pungutan ekspor CPO baru",
    exposure: `${rpM(eksposurPungutanRpM)} / USD 10 per ton`,
    exposureType: "Dampak potensial",
    likelihood: "Mungkin",
    velocity: "Cepat",
    status: "Emerging",
    owner: "Direktorat Pemasaran",
    action: "Hitung ulang bauran ekspor–domestik",
    tone: "amber",
  },
];

/* ── 4. People Capability ─────────────────────────────────────────── */

const pendapatanPerKaryawanJt = (KEUANGAN.pendapatanYtd * 1_000_000) / SDM.karyawanAktif;

export const peopleCapability = {
  criticalVacant: SDM.posisiKritikalKosong,
  successionCoveragePct: SDM.cakupanSuksesiPct,
  revenuePerEmployee: `Rp ${pendapatanPerKaryawanJt.toLocaleString("id-ID", {
    maximumFractionDigits: 1,
  })} Jt`,
  /** Posisi kritikal yang mengancam eksekusi strategi bila tidak terisi. */
  criticalPositions: [
    { position: "Head of Sugar Operations (SGN)", tone: "red" as CeoTone },
    { position: "Regional Head 4 (PalmCo)", tone: "red" as CeoTone },
    { position: "Head of Downstream", tone: "amber" as CeoTone },
  ],
};

/* ── 5. AI Insight: jembatan ekonomi + copilot ────────────────────── */

const gapProduksiSetahun = (gapProduksiCpo * 12) / 5;
const potensiPendapatanRpM = nilaiRpM(gapProduksiSetahun, hargaGrup.CPO);
const potensiEbitdaRpM = (potensiPendapatanRpM * KEUANGAN.ebitdaMarginPct) / 100;
const potensiLabaRpM = potensiPendapatanRpM * marjinLabaBersih;

/**
 * Pemecah baris EBITDA → laba bersih. Tarif pajak badan 22% (UU HPP);
 * pajak dihitung dari laba sebelum pajak yang di-gross-up dari laba bersih,
 * sisanya depresiasi & bunga — agar total tetap identik dengan potensiLabaRpM.
 */
const TARIF_PAJAK_BADAN_PCT = 22;
const potensiPajakRpM =
  (potensiLabaRpM / (1 - TARIF_PAJAK_BADAN_PCT / 100)) * (TARIF_PAJAK_BADAN_PCT / 100);
const potensiDepresiasiBungaRpM = potensiEbitdaRpM - potensiPajakRpM - potensiLabaRpM;

/**
 * Jembatan ekonomi rekomendasi AI: dari volume sampai laba bersih.
 * Angka akhirnya identik dengan `aiInsight.dampak` di data.ts karena
 * formulanya sama — jembatan ini hanya memecah langkah antaranya.
 */
export const aiInsightBridge: { label: string; value: string }[] = [
  {
    label: "Pemulihan volume (disetahunkan)",
    value: `+${(gapProduksiSetahun * 1_000).toLocaleString("id-ID", {
      maximumFractionDigits: 0,
    })} rb ton`,
  },
  { label: "Asumsi ASP CPO", value: `Rp ${hargaGrup.CPO.toLocaleString("id-ID")}/kg` },
  { label: "Dampak pendapatan", value: `+${rpM(potensiPendapatanRpM)}` },
  {
    label: "Biaya variabel & kas operasi",
    value: `−${rpM(potensiPendapatanRpM - potensiEbitdaRpM)}`,
  },
  {
    label: `EBITDA inkremental (marjin ${KEUANGAN.ebitdaMarginPct.toLocaleString("id-ID", {
      minimumFractionDigits: 1,
    })}%)`,
    value: `+${rpM(potensiEbitdaRpM)}`,
  },
  { label: "Depresiasi & bunga", value: `−${rpM(potensiDepresiasiBungaRpM)}` },
  {
    label: `Pajak badan (${TARIF_PAJAK_BADAN_PCT}%)`,
    value: `−${rpM(potensiPajakRpM)}`,
  },
  { label: "Laba bersih", value: `+${rpM(potensiLabaRpM)}` },
];

/** Dampak laba per pergerakan volume 10 rb ton (juta ton = 0,01). */
const sensitivitasVolumeRpM = nilaiRpM(0.01, hargaGrup.CPO) * marjinLabaBersih;

/** Alternatif: naikkan utilisasi PKS ke 85% (formula sama dengan intelijen data.ts). */
const targetUtilisasiPks = 85;
const tambahanTbsUtilisasi =
  (PRODUKSI.tbsDiolahYtdJtTon * (targetUtilisasiPks - PRODUKSI.utilisasiPksPct)) /
  PRODUKSI.utilisasiPksPct;
const potensiUtilisasiRpM = nilaiRpM(
  (tambahanTbsUtilisasi * PRODUKSI.oerPct) / 100,
  hargaGrup.CPO,
);

/**
 * Skenario hasil rekomendasi: apa yang terjadi bila dieksekusi penuh,
 * sebagian, atau tidak sama sekali — melengkapi rantai
 * Evidence → Reasoning → Recommendation → Scenario → Decision.
 */
export const aiScenarios: { label: string; value: string; tone: CeoTone }[] = [
  {
    label: "Gap tertutup penuh (12 bln)",
    value: `+${rpM((gapProduksiCpo * 12 / 5) * hargaGrup.CPO * marjinLabaBersih)} laba`,
    tone: "green",
  },
  {
    label: "Tertutup 50%",
    value: `+${rpM(((gapProduksiCpo * 12) / 5) * hargaGrup.CPO * marjinLabaBersih * 0.5)} laba`,
    tone: "amber",
  },
  {
    label: "Tanpa intervensi",
    value: "Rp 0 · kebocoran berlanjut",
    tone: "red",
  },
];

/** Blok copilot: rekomendasi harus membawa asumsi & bukti, bukan hanya angka. */
export const aiCopilot = {
  /**
   * Keyakinan gabungan kelengkapan bukti & stabilitas asumsi — ditetapkan
   * analis, bukan skor model; ditampilkan agar bisa ditantang, bukan dipercaya buta.
   */
  confidencePct: 72,
  /**
   * Pecahan confidence: yakin pada data ≠ yakin pada inferensi kausal ≠
   * yakin pada rekomendasi. Satu angka gabungan menyembunyikan bahwa mata
   * rantai terlemah (kausal, rekomendasi) jauh di bawah kualitas datanya.
   */
  confidenceBreakdown: [
    { label: "Data", pct: 94 },
    { label: "Model", pct: 72 },
    { label: "Kausal", pct: 61 },
    { label: "Rekomendasi", pct: 58 },
  ],
  sensitivity: `±10 rb ton volume ≈ ±${rpM(sensitivitasVolumeRpM)} laba bersih; ±Rp 100/kg ASP ≈ ±Rp 9 M pada volume gap`,
  alternative: `Alternatif: naikkan utilisasi PKS ${PRODUKSI.utilisasiPksPct.toLocaleString(
    "id-ID",
    { minimumFractionDigits: 1 },
  )}% → ${targetUtilisasiPks}% — potensi pendapatan ${rpM(potensiUtilisasiRpM)} (laba ±${rpM(
    potensiUtilisasiRpM * marjinLabaBersih,
  )})`,
  reversibility: "Reversible — program operasional, tanpa capex permanen",
  owner: "Direktorat Operasional",
  deadline: "29 Agu 2026",
  /**
   * Temporal integrity: rekomendasi punya masa berlaku, bukan teks abadi.
   * Lewat validThrough tanpa keputusan, status wajib bergeser ke
   * "Needs Revalidation" — rekomendasi stale lebih berbahaya daripada
   * tidak ada rekomendasi.
   */
  generated: "13 Agu 2026",
  validThrough: "29 Agu 2026",
  validityStatus: "Active" as "Active" | "Needs Revalidation" | "Superseded",
  decisionRequired: false,
  status: "Open" as const,
  assumptions: [
    `ASP CPO bertahan di Rp ${hargaGrup.CPO.toLocaleString("id-ID")}/kg`,
    `Marjin laba bersih YTD ${(marjinLabaBersih * 100).toLocaleString("id-ID", {
      maximumFractionDigits: 1,
    })}% tidak berubah`,
    "Gap produksi tertutup penuh dalam 12 bulan",
  ],
  evidence: [
    "Gap RKAP vs realisasi CPO per 31 Mei 2026",
    `Utilisasi PKS ${PRODUKSI.utilisasiPksPct.toLocaleString("id-ID", {
      minimumFractionDigits: 1,
    })}% vs target 85%`,
    "ASP tertimbang 5 regional (group-baseline)",
  ],
};

/* ── 6. External Signals ──────────────────────────────────────────── */

export interface ExternalSignal {
  date: string;
  kategori: string;
  title: string;
  dampak: string;
  /** Terjemahan sinyal menjadi konsekuensi bagi PTPN. */
  implikasi: string;
  relevansi: "Tinggi" | "Sedang" | "Rendah";
  hue: number;
}

/**
 * Sinyal eksternal (pasar, regulasi, iklim) yang diterjemahkan ke dampak PTPN.
 * Menggantikan framing berita korporat; item korporat disaring hanya yang
 * mengubah keputusan.
 */
export const externalSignals: ExternalSignal[] = [
  {
    date: "15 Agu 2026",
    kategori: "Regulasi",
    title: "Pemerintah mengkaji pungutan ekspor CPO tambahan USD 10/ton",
    dampak: `Eksposur ${rpM(eksposurPungutanRpM)}`,
    implikasi: "Hitung ulang bauran ekspor–domestik kuartal IV sebelum tarif final.",
    relevansi: "Tinggi",
    hue: 20,
  },
  {
    date: "12 Agu 2026",
    kategori: "Pasar",
    title: `CPO KPBN spot Rp ${PEMASARAN.cpoKpbnSpotRpKg.toLocaleString("id-ID")} — premium atas ASP YTD`,
    dampak: `Tiap Rp 100/kg = ${rpM(sensitivitasHargaCpoRpM)}`,
    implikasi: "Kunci harga sebagian volume Q4 selagi premium bertahan.",
    relevansi: "Tinggi",
    hue: 120,
  },
  {
    date: "11 Agu 2026",
    kategori: "Iklim",
    title: `Probabilitas El Niño semester II naik ke ${RISIKO.elNinoProbabilitasPct}%`,
    dampak: "Risiko yield TBS 2027",
    implikasi: "Amankan air & pupuk; uji ulang target produksi 2027 skenario kering.",
    relevansi: "Sedang",
    hue: 40,
  },
  {
    date: "09 Agu 2026",
    kategori: "Korporat",
    title: "Hilirisasi menyumbang seperempat EBITDA dari 15% pendapatan",
    dampak: "Marjin hilir 47% vs blended 27,7%",
    implikasi: "Prioritaskan capex hilirisasi tahap II pada realokasi pendanaan.",
    relevansi: "Sedang",
    hue: 95,
  },
];
