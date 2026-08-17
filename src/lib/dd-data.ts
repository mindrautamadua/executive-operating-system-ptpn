/**
 * Data statis halaman Data Dictionary (/data-dictionary).
 * Katalog definisi metrik HC yang dipakai seluruh modul dashboard.
 *
 * Angka ringkasan pada ddStats diturunkan dari ddGovernance dan ddEntries agar
 * tidak pernah melenceng dari isi tabel saat entri ditambah atau statusnya berubah.
 */

/* ── Status governance katalog ────────────────────────────────────── */

/** Rekapitulasi sertifikasi seluruh katalog; total harus sama dengan jumlah ketiganya. */
export const ddGovernance = {
  // +5 metrik korporat (Value Creation, Pendapatan, EBITDA, ASP CPO, Penjualan).
  certified: 123,
  provisional: 7,
  deprecated: 3,
} as const;

export const ddTotalMetrics =
  ddGovernance.certified + ddGovernance.provisional + ddGovernance.deprecated;

/** Format angka desimal gaya Indonesia (koma sebagai pemisah desimal). */
const dec1 = (n: number) => n.toFixed(1).replace(".", ",");

/* ── Kategori ─────────────────────────────────────────────────────── */

export interface DdCategory {
  name: string;
  count: number;
  color: string;
}

export const ddCategories: DdCategory[] = [
  { name: "Korporat & Nilai", count: 5, color: "#1b3a6b" },
  { name: "Demografi & Headcount", count: 24, color: "#1a9c5b" },
  { name: "Produktivitas", count: 19, color: "#3b7ded" },
  { name: "Biaya SDM", count: 16, color: "#f5a524" },
  { name: "Talenta & Suksesi", count: 18, color: "#8b5cf6" },
  { name: "Risiko & Kepatuhan", count: 15, color: "#ef4444" },
  { name: "Rekrutmen", count: 13, color: "#0d9488" },
  { name: "Pembelajaran", count: 12, color: "#ec4899" },
  { name: "Hubungan Industrial", count: 11, color: "#94a3b8" },
];

/* ── Entri kamus (contoh 12 teratas) ──────────────────────────────── */

export type DdStatus = "Certified" | "Provisional" | "Deprecated";

export interface DdEntry {
  term: string;
  category: string;
  definition: string;
  formula: string;
  source: string;
  frequency: "Harian" | "Bulanan" | "Triwulanan";
  /** Unit HC yang accountable atas definisi dan angka metrik ini. */
  owner: string;
  status: DdStatus;
  /** Skor keyakinan gabungan definisi, sumber, kelengkapan, dan rekonsiliasi (0-100). */
  trust: number;
  /**
   * Mekanisme di balik label "Certified" — tanpa tiga field ini label hanya
   * hiasan UI. Sign-off oleh certifier pada tanggal tertentu atas hasil
   * validasi/rekonsiliasi yang disebut eksplisit.
   */
  certifiedBy?: string;
  certifiedAt?: string;
  validation?: string;
}

export const ddEntries: DdEntry[] = [
  {
    term: "Headcount",
    category: "Demografi & Headcount",
    definition: "Jumlah karyawan aktif pada tanggal cut-off, semua status kepegawaian",
    formula: "Σ karyawan aktif per tanggal cut-off",
    source: "SAP HCM",
    frequency: "Harian",
    owner: "HC Operations",
    status: "Certified",
    trust: 99,
    certifiedBy: "HC Data Governance Council",
    certifiedAt: "30 Jun 2026",
    validation: "Rekonsiliasi SAP HCM vs IHCMS · variance 0,18% (toleransi 0,5%) · sign-off SVP HC",
  },
  {
    term: "FTE (Full-Time Equivalent)",
    category: "Demografi & Headcount",
    definition: "Headcount setara penuh waktu; paruh waktu dikonversi proporsional",
    formula: "Σ (jam kerja karyawan / jam kerja standar)",
    source: "SAP HCM",
    frequency: "Bulanan",
    owner: "HC Operations",
    status: "Certified",
    trust: 97,
  },
  {
    term: "Turnover Rate",
    category: "Demografi & Headcount",
    definition: "Laju karyawan keluar (semua sebab) terhadap rata-rata headcount",
    formula: "(Σ keluar YTD / rata-rata headcount) × 100%",
    source: "SAP HCM",
    frequency: "Bulanan",
    owner: "HC Performance & Reward",
    status: "Certified",
    trust: 97,
    certifiedBy: "HC Data Governance Council",
    certifiedAt: "30 Jun 2026",
    validation: "Uji ulang sampel 3 regional vs berita acara PHK/resign · match 100%",
  },
  {
    term: "Voluntary Attrition",
    category: "Demografi & Headcount",
    definition: "Turnover atas inisiatif karyawan (resign), di luar pensiun dan PHK",
    formula: "(Σ resign YTD / rata-rata headcount) × 100%",
    source: "SAP HCM",
    frequency: "Bulanan",
    owner: "HC Performance & Reward",
    status: "Certified",
    trust: 96,
  },
  {
    term: "HC Cost to Revenue",
    category: "Biaya SDM",
    definition: "Porsi total biaya SDM terhadap pendapatan perusahaan",
    formula: "(Total biaya SDM / pendapatan) × 100%",
    source: "SAP FI-CO",
    frequency: "Bulanan",
    owner: "HC Cost Control",
    status: "Certified",
    trust: 95,
    certifiedBy: "HC Data Governance Council",
    certifiedAt: "30 Jun 2026",
    validation: "Mapping GL biaya SDM direviu bersama Akuntansi · selisih klasifikasi < 0,1%",
  },
  {
    term: "Revenue per Employee",
    category: "Produktivitas",
    definition:
      "Pendapatan perusahaan per karyawan aktif pada tanggal cut-off, disajikan dalam Rp juta (bukan basis FTE)",
    formula: "Pendapatan YTD (Rp) / headcount aktif — angka grup dari group-baseline (Rp 24,6 T / 70.142)",
    source: "SAP FI-CO",
    frequency: "Bulanan",
    owner: "People Analytics",
    status: "Certified",
    trust: 95,
    certifiedBy: "HC Data Governance Council",
    certifiedAt: "30 Jun 2026",
    validation: "Numerator diikat ke pendapatan konsolidasi audited; denominator = Headcount Certified",
  },
  {
    term: "Human Productivity Index (HPI)",
    category: "Produktivitas",
    definition: "Indeks komposit output per karyawan relatif terhadap baseline dan target",
    formula: "Rata-rata tertimbang (revenue/FTE, output/FTE, kualitas)",
    source: "Data Warehouse HC",
    frequency: "Bulanan",
    owner: "People Analytics",
    status: "Certified",
    trust: 94,
  },
  {
    term: "Span of Control",
    category: "Produktivitas",
    definition: "Rata-rata jumlah bawahan langsung per atasan",
    formula: "Σ karyawan / Σ posisi atasan aktif",
    source: "SAP OM",
    frequency: "Bulanan",
    owner: "Organization Development",
    status: "Certified",
    trust: 96,
  },
  {
    term: "Bench Strength",
    category: "Talenta & Suksesi",
    definition: "Ketersediaan suksesor siap (Ready Now / 1-2 thn) untuk posisi kritis",
    formula: "(Posisi kritis dengan suksesor siap / total posisi kritis) × 100%",
    source: "SuccessFactors",
    frequency: "Triwulanan",
    owner: "Talent Management",
    status: "Certified",
    trust: 92,
  },
  {
    term: "Talent Readiness",
    category: "Talenta & Suksesi",
    definition:
      "Porsi talenta kunci berstatus siap promosi, yaitu Ready Now atau Ready in 1-2 Yrs",
    formula: "((Ready Now + Ready 1-2 thn) / total talenta kunci) × 100%",
    source: "SuccessFactors",
    frequency: "Triwulanan",
    owner: "Talent Management",
    status: "Certified",
    trust: 92,
    certifiedBy: "Talent Council",
    certifiedAt: "15 Jul 2026",
    validation: "Kalibrasi talent review Q2 · status kesiapan disahkan komite per subholding",
  },
  {
    term: "Time to Fill",
    category: "Rekrutmen",
    definition: "Rata-rata hari dari permintaan rekrutmen disetujui hingga kandidat diterima",
    formula: "Σ hari pengisian / Σ posisi terisi",
    source: "SuccessFactors RCM",
    frequency: "Bulanan",
    owner: "Talent Acquisition",
    status: "Certified",
    trust: 95,
  },
  {
    term: "Engagement Score",
    category: "Talenta & Suksesi",
    definition: "Skor survei keterikatan karyawan skala 0-100",
    formula: "Rata-rata tertimbang dimensi survei tahunan/pulse; indeks 0-100 = skor 1-5 × 20",
    source: "Survei Engagement",
    frequency: "Triwulanan",
    owner: "HC Culture & Engagement",
    status: "Certified",
    trust: 91,
    certifiedBy: "HC Data Governance Council",
    certifiedAt: "15 Jul 2026",
    validation: "Response rate 87% (ambang 70%) · konversi skala diverifikasi vendor survei",
  },
  {
    term: "Compliance Score",
    category: "Risiko & Kepatuhan",
    definition: "Indeks komposit kepatuhan regulasi ketenagakerjaan 0-100",
    formula: "Rata-rata tertimbang 8 area kepatuhan",
    source: "GRC System",
    frequency: "Bulanan",
    owner: "HC Risk & Compliance",
    status: "Certified",
    trust: 93,
  },
  {
    term: "Indeks Hubungan Industrial",
    category: "Hubungan Industrial",
    definition: "Indeks komposit iklim hubungan industrial 0-100",
    formula: "Komposit (kasus, aksi, PKB, aktivitas bipartit)",
    source: "Modul HI",
    frequency: "Bulanan",
    owner: "Industrial Relations",
    status: "Provisional",
    trust: 88,
  },
  /* — Metrik korporat lintas dimensi: setiap angka yang mengendalikan
       keputusan Direksi wajib punya definisi + formula + rekonsiliasi. — */
  {
    term: "Value Creation YTD",
    category: "Korporat & Nilai",
    definition:
      "Nilai tambah kumulatif inisiatif strategis + kinerja operasional YTD, netto setelah leakage",
    formula:
      "Σ driver (efisiensi, yield, hilirisasi, harga & bauran, digital) − Σ leakage (gap produksi, eksposur harga) = Rp 1,86 T; guard rekonsiliasi otomatis di ceo-data",
    source: "PMO Tracker + SAP FI-CO",
    frequency: "Bulanan",
    owner: "PMO Holding",
    status: "Certified",
    trust: 92,
    certifiedBy: "Komite Value Creation",
    certifiedAt: "30 Jun 2026",
    validation: "Dekomposisi driver−leakage rekonsil ke headline; selisih >Rp 5 M memblok rilis",
  },
  {
    term: "Pendapatan Konsolidasi",
    category: "Korporat & Nilai",
    definition: "Pendapatan konsolidasi grup YTD setelah eliminasi antar-entitas",
    formula: "Σ pendapatan subholding − eliminasi intercompany (group-baseline: Rp 24,6 T)",
    source: "SAP S/4HANA Konsolidasi",
    frequency: "Bulanan",
    owner: "Direktorat Keuangan",
    status: "Certified",
    trust: 98,
    certifiedBy: "Komite Audit",
    certifiedAt: "30 Jun 2026",
    validation: "Rekonsiliasi GL vs laporan konsolidasi reviu KAP · selisih nihil",
  },
  {
    term: "EBITDA",
    category: "Korporat & Nilai",
    definition: "Laba sebelum bunga, pajak, depresiasi & amortisasi, YTD konsolidasi",
    formula: "Laba usaha + depresiasi + amortisasi (group-baseline: Rp 6,82 T · marjin 27,7%)",
    source: "SAP FI-CO",
    frequency: "Bulanan",
    owner: "Direktorat Keuangan",
    status: "Certified",
    trust: 97,
    certifiedBy: "Komite Audit",
    certifiedAt: "30 Jun 2026",
    validation: "Marjin blended = rata-rata tertimbang marjin segmen (KOMPOSISI_SEGMEN)",
  },
  {
    term: "Total Penjualan Komoditas",
    category: "Korporat & Nilai",
    definition:
      "Nilai penjualan komoditas fisik YTD — subset pendapatan konsolidasi, TIDAK termasuk pendapatan hilir non-komoditas, jasa, dan lain-lain",
    formula:
      "Σ penjualan CPO/PK/gula/karet/teh (Rp 19,9 T); + pendapatan lain-lain Rp 4,7 T = Pendapatan Konsolidasi Rp 24,6 T",
    source: "SAP SD",
    frequency: "Bulanan",
    owner: "Direktorat Pemasaran",
    status: "Certified",
    trust: 96,
    certifiedBy: "Komite Pemasaran",
    certifiedAt: "30 Jun 2026",
    validation: "Jembatan penjualan → pendapatan konsolidasi rekonsil dengan eliminasi tercatat",
  },
  {
    term: "ASP CPO",
    category: "Korporat & Nilai",
    definition:
      "Harga jual rata-rata CPO YTD tertimbang 5 regional — BUKAN harga spot pasar",
    formula:
      "Rata-rata HARGA_REGIONAL_RP_KG lintas regional penghasil CPO = Rp 12.482/kg; spot KPBN dilaporkan terpisah (Rp 13.680)",
    source: "SAP SD + KPBN",
    frequency: "Harian",
    owner: "Direktorat Pemasaran",
    status: "Certified",
    trust: 96,
    certifiedBy: "Komite Pemasaran",
    certifiedAt: "30 Jun 2026",
    validation: "ASP grup dihitung dari registri harga regional — regional tak bisa melebihi rata-ratanya sendiri",
  },
];

/** Cari definisi resmi sebuah metrik untuk ditampilkan sebagai tooltip di dashboard lain. */
export const ddLookup = (term: string) => ddEntries.find((e) => e.term === term);

/* ── Ringkasan katalog (diturunkan dari data di atas) ─────────────── */

export interface DdStat {
  label: string;
  value: string;
  sub: string;
  icon: "terms" | "certified" | "trust" | "updated";
  tone: "green" | "blue" | "teal" | "amber";
}

const coverage = (ddGovernance.certified / ddTotalMetrics) * 100;
const avgTrust = ddEntries.reduce((s, e) => s + e.trust, 0) / ddEntries.length;

export const ddStats: DdStat[] = [
  {
    label: "Metrik Tergovernance",
    value: String(ddTotalMetrics),
    sub: `${ddGovernance.certified} certified · ${ddGovernance.provisional} provisional · ${ddGovernance.deprecated} deprecated`,
    icon: "terms",
    tone: "green",
  },
  {
    label: "Cakupan Sertifikasi",
    value: `${dec1(coverage)}%`,
    sub: `${ddGovernance.certified} dari ${ddTotalMetrics} metrik lolos sertifikasi definisi`,
    icon: "certified",
    tone: "blue",
  },
  {
    label: "Trust Score Metrik Inti",
    value: dec1(avgTrust),
    sub: `Rata-rata ${ddEntries.length} metrik inti eksekutif (skala 0-100)`,
    icon: "trust",
    tone: "teal",
  },
  {
    label: "Pembaruan Terakhir",
    value: "31 Mei 2026",
    sub: "Review triwulanan oleh Data Governance",
    icon: "updated",
    tone: "amber",
  },
];

export const ddFootnote =
  "Setiap angka di Executive Operating System memiliki satu definisi, satu formula, satu pemilik, dan satu sumber resmi. Status Certified berarti definisi disetujui, sumber terverifikasi, dan kualitas data tervalidasi; Provisional berarti definisi disetujui namun validasi data masih berjalan. Perubahan definisi dikelola Data Governance Committee melalui review triwulanan.";
