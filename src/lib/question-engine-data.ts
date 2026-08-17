/**
 * Executive Question Engine: sistem tidak hanya memberi jawaban — ia melatih
 * penggunanya bertanya. Tiap konteks sinyal punya set pertanyaan eksekutif
 * yang harus diajukan SEBELUM menerima rekomendasi. Pola dasar mengikuti
 * Executive Management Loop (guide-data) dan Executive Challenge 8 pertanyaan.
 */

export interface QuestionSet {
  /** Konteks pemicu: apa yang sedang dilihat pengguna. */
  context: string;
  /** Contoh nyata dari dashboard supaya tidak abstrak. */
  example: string;
  questions: string[];
}

export const questionSets: QuestionSet[] = [
  {
    context: "KPI bergerak (naik atau turun)",
    example: "EBITDA Rp 6,82 T · +3,3% vs RKAP YTD — sementara volume CPO −2,9%",
    questions: [
      "Apa yang berubah, dan sejak kapan?",
      "Apakah pergerakannya material? (bandingkan dengan EBITDA/nilai enterprise, bukan angka absolut)",
      "Apa driver utamanya — volume, harga, biaya, atau bauran?",
      "Apakah driver itu struktural atau temporer (market-driven)?",
      "Apakah bisa dikendalikan manajemen, atau eksternal?",
      "Apa konsekuensi finansialnya 12 bulan ke depan?",
      "Apa risikonya bila tidak melakukan apa-apa?",
      "Keputusan apa yang dibutuhkan, siapa pemiliknya, kapan tenggatnya?",
    ],
  },
  {
    context: "Risiko baru muncul atau naik",
    example: "El Niño H2 62% · eksposur gabungan dengan harga CPO Rp 4,2 T",
    questions: [
      "Ini eksposur maksimum, expected loss, atau sensitivitas? (tiga hal berbeda)",
      "Berapa cepat risiko ini bisa terealisasi (velocity)?",
      "Risiko lain apa yang berkorelasi dengannya — dan apa efek gabungannya?",
      "Node mana di rantai nilai yang terkena lebih dulu? (lihat Enterprise Map)",
      "Apa mitigasi yang sudah berjalan, dan berapa residual risk-nya?",
      "Apakah appetite kita masih dilampaui setelah mitigasi?",
      "Siapa pemilik risiko, dan apa keputusan yang menunggu Direksi?",
      "Bagaimana kita tahu mitigasinya bekerja — metrik dan tenggatnya apa?",
    ],
  },
  {
    context: "Rekomendasi AI muncul",
    example: "\"Menutup gap Regional 4 menambah laba Rp 107 M\" · Confidence 72%",
    questions: [
      "Apa jenis klaimnya — korelasi, kausal, prediksi, atau rekomendasi?",
      "Apa buktinya, dan dari data as-of kapan?",
      "Asumsi mana yang bila salah membatalkan rekomendasi ini?",
      "Pecah confidence-nya: yakin pada data ≠ yakin pada hubungan kausal ≠ yakin pada rekomendasi.",
      "Apakah rekomendasi masih berlaku? (cek tanggal dibuat & masa berlaku)",
      "Apa alternatif selain rekomendasi ini — dan mengapa AI tidak memilihnya?",
      "Apa downside bila rekomendasi dijalankan dan asumsinya meleset?",
      "Keputusan tetap milik Direksi — apa yang perlu divalidasi sebelum menyetujui?",
    ],
  },
  {
    context: "Keputusan overdue di antrian",
    example: "Restrukturisasi 11 PG · overdue 34 hari · ± Rp 27 M/bulan tertahan",
    questions: [
      "Berapa biaya ekonomi per bulan penundaan ini?",
      "Apa yang sebenarnya menahan keputusan — informasi kurang, atau keberanian?",
      "Informasi tambahan apa yang akan mengubah keputusan? Bila tidak ada: putuskan.",
      "Inisiatif dan target apa saja yang bergantung pada keputusan ini?",
      "Apa opsi-opsinya, dan apa trade-off tiap opsi (EBITDA, kas, orang, waktu)?",
      "Apakah keputusan ini reversible? Reversible = putuskan cepat, irreversible = validasi dalam.",
      "Siapa yang akan mengeksekusi, dan apakah kapasitasnya ada? (cek posisi kritikal)",
      "Bagaimana keberhasilannya diukur — expected value yang mana yang dijanjikan?",
    ],
  },
  {
    context: "Forecast atau proyeksi berubah",
    example: "Proyeksi laba FY Rp 6,3 T · rentang Rp 5,7–6,8 T · confidence 76%",
    questions: [
      "Apa yang menggerakkan revisi — asumsi mana yang berubah?",
      "Seberapa lebar rentangnya, dan apa yang terjadi pada keputusan kita di P10?",
      "Confidence ini kalibrasi historis atau opini analis?",
      "Driver mana yang menyumbang paling besar pada ketidakpastian (harga, volume, kurs)?",
      "Keputusan apa yang sebaiknya menunggu, dan mana yang justru tidak boleh menunggu?",
      "Skenario buruk gabungan (harga turun + El Niño) sudah dihitung atau baru standalone?",
      "Kapan run forecast berikutnya, dan sinyal apa yang memicu revisi antar-run?",
      "Apakah RKAP/target perlu direvisi, atau cukup rencana mitigasinya?",
    ],
  },
];

/**
 * Prinsip Question Engine — ditampilkan di halaman guide sebagai pembuka.
 */
export const QUESTION_ENGINE_INTRO =
  "Dashboard menjawab; eksekutif bertanya. Kualitas keputusan Direksi ditentukan " +
  "oleh kualitas pertanyaannya — bukan kelengkapan datanya. Halaman ini melatih " +
  "refleks bertanya untuk lima situasi yang paling sering muncul di Executive " +
  "Operating System. Jawab dulu pertanyaannya sendiri, baru baca rekomendasi sistem.";
