import type { BarRow, DetailKpi, DetailNote } from "@/components/wa/detail/parts";

/**
 * Data halaman detail kartu HC Executive Operating System (SDM & Talenta):
 * Strategic Alignment, BOD Decision Center, dan Alerts & Notifications.
 *
 * Seluruh angka konsisten dengan seed kartu di `hc-data.ts` (72.318 kebutuhan,
 * 70.142 aktif, capability 82%, turnover ambang 6,5%, 243 probation, 12 alert
 * pada lencana notifikasi, dst.) — halaman detail memperluas, tidak membantah.
 */

/* ══ 1. Strategic Alignment ═══════════════════════════════════════════ */

export const alignKpi: DetailKpi[] = [
  {
    label: "Workforce Requirement",
    value: "72.318",
    suffix: "org",
    delta: "-2.176",
    trend: "down",
    tone: "red",
    compare: "vs aktual 70.142 (gap -3,0%)",
  },
  {
    label: "People Capability Index",
    value: "82%",
    delta: "+3 ppts",
    trend: "up",
    tone: "green",
    compare: "vs 2025: 79% · target 85%",
  },
  {
    label: "People Performance Index",
    value: "85%",
    delta: "+2 ppts",
    trend: "up",
    tone: "green",
    compare: "vs 2025: 83% · target 88%",
  },
  {
    label: "Produktivitas (Ton/Ha)",
    value: "+8,2%",
    delta: "+2,1 ppts",
    trend: "up",
    tone: "green",
    compare: "vs 2025: +6,1%",
  },
  {
    label: "Contribution Signal",
    value: "High",
    delta: "r = 0,74",
    trend: "flat",
    tone: "neutral",
    compare: "korelasi capability ↔ outcome",
  },
];

/** Rantai alignment per regional: kebutuhan → kapabilitas → kinerja → outcome. */
export const alignRows = [
  { regional: "Regional 1", butuh: "18.240", aktual: "17.912", gap: "-328", capability: "85%", performance: "88%", outcome: "+9,8%", tone: "green" },
  { regional: "Regional 2", butuh: "15.180", aktual: "14.655", gap: "-525", capability: "83%", performance: "86%", outcome: "+8,7%", tone: "green" },
  { regional: "Regional 3", butuh: "12.640", aktual: "12.318", gap: "-322", capability: "82%", performance: "85%", outcome: "+7,9%", tone: "green" },
  { regional: "Regional 4", butuh: "13.890", aktual: "13.196", gap: "-694", capability: "77%", performance: "80%", outcome: "+4,6%", tone: "red" },
  { regional: "Regional 5", butuh: "12.368", aktual: "12.061", gap: "-307", capability: "81%", performance: "84%", outcome: "+7,4%", tone: "amber" },
] as const;

export const alignCapabilityByFunction: BarRow[] = [
  { label: "Agronomi & Produksi", value: 84, valueLabel: "84%", note: "target 85%" },
  { label: "Teknik & Pabrik", value: 81, valueLabel: "81%", note: "target 85%", color: "#f5a524" },
  { label: "Komersial & Pemasaran", value: 83, valueLabel: "83%", note: "target 85%" },
  { label: "Keuangan", value: 86, valueLabel: "86%", note: "di atas target" },
  { label: "SDM", value: 82, valueLabel: "82%", note: "target 85%", color: "#f5a524" },
  { label: "Teknologi Informasi", value: 74, valueLabel: "74%", note: "gap terbesar", color: "#ef4444" },
];

export const alignNotes: DetailNote[] = [
  {
    title: "Regional 4 melemah di seluruh rantai",
    detail:
      "Gap pemenuhan terbesar (-694 org), capability 77%, dan outcome hanya +4,6% — konsisten dengan penurunan pendapatan -2,3% di dashboard korporat. Prioritaskan replanting skill & rotasi panen.",
    tone: "red",
  },
  {
    title: "Kapabilitas TI jauh di bawah target",
    detail:
      "74% vs target 85%. Program digital PTPN 4.0 bergantung pada fungsi ini; gap ini prasyarat keputusan belanja TI di BOD Decision Center.",
    tone: "amber",
  },
  {
    title: "Sinyal kontribusi kuat tapi korelasional",
    detail:
      "r = 0,74 antara capability index dan produktivitas — cukup untuk prioritisasi investasi, belum untuk klaim kausal.",
    tone: "blue",
  },
];

export const alignDefinitions = [
  {
    term: "Workforce Requirement",
    text: "Kebutuhan tenaga kerja hasil workload analysis RKAP 2026, dihitung per unit lalu diagregasi.",
  },
  {
    term: "People Capability Index",
    text: "Komposit kompetensi teknis, sertifikasi wajib, dan assessment kepemimpinan (skala 0-100%).",
  },
  {
    term: "People Performance Index",
    text: "Persentase karyawan dengan skor kinerja On/Above Target pada siklus penilaian terakhir.",
  },
  {
    term: "Contribution Signal",
    text: "Korelasi Pearson capability index terhadap produktivitas ton/ha antar unit — indikatif, bukan kausal.",
  },
];

/* ══ 2. BOD Decision Center ═══════════════════════════════════════════ */

export const decKpi: DetailKpi[] = [
  {
    label: "Item Aktif",
    value: "9",
    delta: "+2",
    trend: "up",
    tone: "neutral",
    compare: "vs bulan lalu: 7 item",
  },
  {
    label: "Decision Required",
    value: "3",
    delta: "1 overdue",
    trend: "flat",
    tone: "red",
    compare: "menunggu keputusan BOD",
  },
  {
    label: "Opportunity",
    value: "2",
    delta: "Rp 21,4 M",
    trend: "flat",
    tone: "green",
    compare: "potensi nilai teridentifikasi",
  },
  {
    label: "Eksposur Agregat",
    value: "Rp 98,6",
    suffix: "M",
    delta: "+Rp 12,2 M",
    trend: "up",
    tone: "red",
    compare: "dampak bila tidak diputuskan",
  },
  {
    label: "Rata-rata Umur Item",
    value: "18",
    suffix: "hari",
    delta: "SLA 30 hari",
    trend: "flat",
    tone: "amber",
    compare: "tertua 47 hari (overdue)",
  },
];

export interface DecisionRow {
  kode: string;
  judul: string;
  kategori: "Decision Required" | "Opportunity" | "Information";
  dampak: "High" | "Medium" | "Low";
  nilai: string;
  rekomendasi: string;
  pemilik: string;
  tenggat: string;
  status: "Menunggu BOD" | "Disetujui" | "Berjalan" | "Overdue" | "Selesai";
}

/** Register lengkap: 3 decision + 2 opportunity + 4 information = 9 item (sesuai bodTabs). */
export const decRows: DecisionRow[] = [
  { kode: "DC-26-014", judul: "Succession Risk – PTPN IV", kategori: "Decision Required", dampak: "High", nilai: "Rp 38,0 M", rekomendasi: "Approve accelerated leadership program", pemilik: "Direktur SDM", tenggat: "Q3 2026", status: "Menunggu BOD" },
  { kode: "DC-26-015", judul: "Labor Cost – Palm Oil Operations", kategori: "Decision Required", dampak: "Medium", nilai: "Rp 27,2 M", rekomendasi: "Review workforce productivity model", pemilik: "Direktur Operasional", tenggat: "Q3 2026", status: "Menunggu BOD" },
  { kode: "DC-26-009", judul: "Internal Talent Mobility", kategori: "Decision Required", dampak: "Low", nilai: "Rp 12,6 M", rekomendasi: "Mobilisasi 127 high potential ke projected vacancies", pemilik: "Direktur SDM", tenggat: "Q1 2026", status: "Overdue" },
  { kode: "DC-26-017", judul: "Retensi 32 Critical Talent Flight Risk", kategori: "Opportunity", dampak: "High", nilai: "Rp 8,6 M", rekomendasi: "Kompensasi ke P50 pasar + engagement plan", pemilik: "Direktur SDM", tenggat: "Q3 2026", status: "Disetujui" },
  { kode: "DC-26-018", judul: "Digital Academy Batch 3", kategori: "Opportunity", dampak: "Medium", nilai: "Rp 12,8 M", rekomendasi: "Perluas ke fungsi TI (capability 74%)", pemilik: "Direktur SDM", tenggat: "Q4 2026", status: "Berjalan" },
  { kode: "DC-26-011", judul: "Probation 243 karyawan berakhir ≤30 hari", kategori: "Information", dampak: "Medium", nilai: "—", rekomendasi: "Pastikan evaluasi selesai sebelum jatuh tempo", pemilik: "Kadiv HCM", tenggat: "Jun 2026", status: "Berjalan" },
  { kode: "DC-26-012", judul: "Kepatuhan HSSE di bawah 85%", kategori: "Information", dampak: "Medium", nilai: "—", rekomendasi: "Sprint pelatihan wajib regional 2 & 4", pemilik: "Kadiv HSSE", tenggat: "Agu 2026", status: "Berjalan" },
  { kode: "DC-26-013", judul: "5 posisi kritikal kosong ≤90 hari", kategori: "Information", dampak: "High", nilai: "—", rekomendasi: "Aktifkan pipeline suksesor Ready Now", pemilik: "Kadiv Talenta", tenggat: "Agu 2026", status: "Berjalan" },
  { kode: "DC-26-016", judul: "Engagement survey selesai (4,21/5)", kategori: "Information", dampak: "Low", nilai: "—", rekomendasi: "Distribusi hasil ke seluruh regional", pemilik: "Kadiv HCM", tenggat: "Jul 2026", status: "Selesai" },
];

export const decByCategory: BarRow[] = [
  { label: "Decision Required", value: 3, note: "1 overdue", color: "#ef4444" },
  { label: "Opportunity", value: 2, note: "Rp 21,4 M", color: "#1a9c5b" },
  { label: "Information", value: 4, note: "monitoring", color: "#2f6fe4" },
];

export const decNotes: DetailNote[] = [
  {
    title: "Satu keputusan lewat tenggat 47 hari",
    detail:
      "Internal Talent Mobility (DC-26-009) jatuh tempo Q1 2026. Setiap bulan tertunda menahan potensi saving Rp 12,6 M dan menambah risiko 12 posisi kritikal tanpa suksesor.",
    tone: "red",
  },
  {
    title: "Dua item SDM menunggu di rapat BOD yang sama",
    detail:
      "Succession risk dan labor cost saling terkait — accelerated leadership program menutup sebagian gap produktivitas. Usulkan diputuskan sebagai satu paket.",
    tone: "amber",
  },
  {
    title: "Eksposur dihitung dari baseline grup",
    detail:
      "Nilai rupiah tiap item diturunkan dari baseline keuangan dan volume yang sama dengan dashboard korporat, sehingga bisa diadu antar item.",
    tone: "blue",
  },
];

export const decDefinitions = [
  {
    term: "Decision Required",
    text: "Item yang berhenti tanpa keputusan BOD; membawa rekomendasi, nilai dampak, dan tenggat.",
  },
  {
    term: "Opportunity",
    text: "Potensi nilai yang bisa direalisasikan bila disetujui — bukan risiko, melainkan upside.",
  },
  {
    term: "Eksposur Agregat",
    text: "Jumlah nilai dampak seluruh item aktif bila tidak ada keputusan sampai tenggat masing-masing.",
  },
  {
    term: "SLA Item",
    text: "Target usia maksimum item di register: 30 hari sejak diajukan sampai diputuskan.",
  },
];

/* ══ 3. Alerts & Notifications ════════════════════════════════════════ */

export const alertKpi: DetailKpi[] = [
  {
    label: "Alert Aktif",
    value: "12",
    delta: "+3",
    trend: "up",
    tone: "neutral",
    compare: "vs minggu lalu: 9",
  },
  {
    label: "Kritikal",
    value: "3",
    delta: "+1",
    trend: "up",
    tone: "red",
    compare: "perlu aksi ≤7 hari",
  },
  {
    label: "Perhatian",
    value: "5",
    delta: "0",
    trend: "flat",
    tone: "amber",
    compare: "dipantau mingguan",
  },
  {
    label: "Informasi",
    value: "4",
    delta: "-2",
    trend: "down",
    tone: "green",
    compare: "2 alert ditutup minggu ini",
  },
  {
    label: "Median Usia Alert",
    value: "2,4",
    suffix: "hari",
    delta: "SLA 5 hari",
    trend: "flat",
    tone: "green",
    compare: "tertua 9 hari (HSSE)",
  },
];

export interface AlertRow {
  waktu: string;
  kategori: string;
  judul: string;
  detail: string;
  cakupan: string;
  ambang: string;
  aktual: string;
  pemilik: string;
  tingkat: "Kritikal" | "Perhatian" | "Informasi";
}

/** Register 12 alert aktif — angka sama dengan lencana notifikasi header. */
export const alertRows: AlertRow[] = [
  { waktu: "Hari ini", kategori: "Turnover", judul: "Risiko turnover tinggi", detail: "Turnover PTPN IV Regional 2 melebihi ambang", cakupan: "Regional 2", ambang: "≤6,5%", aktual: "7,8%", pemilik: "Kadiv HCM", tingkat: "Kritikal" },
  { waktu: "Hari ini", kategori: "Suksesi", judul: "Posisi kritikal tanpa suksesor", detail: "12 posisi tanpa suksesor Ready Now", cakupan: "PTPN IV", ambang: "0 posisi", aktual: "12", pemilik: "Kadiv Talenta", tingkat: "Kritikal" },
  { waktu: "1 hari lalu", kategori: "Suksesi", judul: "Suksesi mendekat", detail: "5 posisi kritikal kosong dalam 90 hari", cakupan: "Grup", ambang: "≥1 suksesor/posisi", aktual: "2 tanpa suksesor", pemilik: "Kadiv Talenta", tingkat: "Kritikal" },
  { waktu: "1 hari lalu", kategori: "Kepegawaian", judul: "Probation berakhir", detail: "243 karyawan probation berakhir dalam 30 hari", cakupan: "Grup", ambang: "evaluasi H-14", aktual: "87 belum dievaluasi", pemilik: "Kadiv HCM", tingkat: "Perhatian" },
  { waktu: "2 hari lalu", kategori: "Kinerja", judul: "Performance below target", detail: "1.127 karyawan berkinerja Below Target", cakupan: "Grup", ambang: "≤1,2% populasi", aktual: "1,6%", pemilik: "Kadiv HCM", tingkat: "Perhatian" },
  { waktu: "3 hari lalu", kategori: "Kepatuhan", judul: "Pelatihan wajib HSSE", detail: "Kepatuhan pelatihan HSSE di bawah target", cakupan: "Regional 2 & 4", ambang: "≥85%", aktual: "81%", pemilik: "Kadiv HSSE", tingkat: "Perhatian" },
  { waktu: "3 hari lalu", kategori: "Kapasitas", judul: "Gap pemenuhan Regional 4", detail: "Gap kebutuhan vs aktual terbesar antar regional", cakupan: "Regional 4", ambang: "≤2%", aktual: "-5,0%", pemilik: "Kadiv Workforce Planning", tingkat: "Perhatian" },
  { waktu: "4 hari lalu", kategori: "Retensi", judul: "Critical talent flight risk", detail: "32 critical talent berstatus flight risk", cakupan: "Grup", ambang: "≤20 orang", aktual: "32", pemilik: "Kadiv Talenta", tingkat: "Perhatian" },
  { waktu: "5 hari lalu", kategori: "Engagement", judul: "Survey engagement selesai", detail: "Skor 4,21/5 — naik dari 4,08", cakupan: "Grup", ambang: "≥4,0", aktual: "4,21", pemilik: "Kadiv HCM", tingkat: "Informasi" },
  { waktu: "6 hari lalu", kategori: "Rekrutmen", judul: "SLA rekrutmen terjaga", detail: "Time-to-fill rata-rata 38 hari", cakupan: "Grup", ambang: "≤45 hari", aktual: "38 hari", pemilik: "Kadiv Rekrutmen", tingkat: "Informasi" },
  { waktu: "8 hari lalu", kategori: "Pembelajaran", judul: "Digital Academy batch 2 lulus", detail: "412 peserta lulus dengan skor rata-rata 86", cakupan: "Grup", ambang: "≥80", aktual: "86", pemilik: "Kadiv Learning", tingkat: "Informasi" },
  { waktu: "9 hari lalu", kategori: "Kepatuhan", judul: "Audit data HRIS", detail: "Kelengkapan data karyawan 96,4% — di atas ambang", cakupan: "Grup", ambang: "≥95%", aktual: "96,4%", pemilik: "Kadiv HCM", tingkat: "Informasi" },
];

export const alertByCategory: BarRow[] = [
  { label: "Suksesi & Talenta", value: 4, note: "2 kritikal", color: "#ef4444" },
  { label: "Kepatuhan", value: 2, note: "1 perhatian", color: "#f5a524" },
  { label: "Kinerja & Kapasitas", value: 2, note: "perhatian", color: "#f5a524" },
  { label: "Kepegawaian & Retensi", value: 2, note: "perhatian", color: "#f5a524" },
  { label: "Engagement & Lainnya", value: 2, note: "informasi", color: "#2f6fe4" },
];

export const alertNotes: DetailNote[] = [
  {
    title: "Tiga alert kritikal bermuara pada suksesi",
    detail:
      "Turnover Regional 2, 12 posisi tanpa suksesor, dan 5 posisi kosong ≤90 hari saling memperkuat — eskalasi ke BOD Decision Center sudah dibuka (DC-26-014).",
    tone: "red",
  },
  {
    title: "87 evaluasi probation belum berjalan",
    detail:
      "Dari 243 yang jatuh tempo ≤30 hari. Tanpa evaluasi, perpanjangan otomatis menimbulkan risiko kepegawaian.",
    tone: "amber",
  },
  {
    title: "Ambang alert dikelola terpusat",
    detail:
      "Setiap alert membawa ambang dan nilai aktual, jadi bisa diverifikasi — bukan notifikasi naratif tanpa angka.",
    tone: "blue",
  },
];

export const alertDefinitions = [
  {
    term: "Kritikal",
    text: "Melewati ambang dan berdampak langsung pada operasi/finansial; target aksi ≤7 hari.",
  },
  {
    term: "Perhatian",
    text: "Mendekati atau baru melewati ambang; dipantau mingguan sampai kembali normal.",
  },
  {
    term: "Informasi",
    text: "Perkembangan yang perlu diketahui BOD tanpa aksi; ditutup otomatis setelah 14 hari.",
  },
  {
    term: "Median Usia Alert",
    text: "Median lama alert terbuka sejak dipicu; SLA penutupan 5 hari untuk kritikal.",
  },
];
