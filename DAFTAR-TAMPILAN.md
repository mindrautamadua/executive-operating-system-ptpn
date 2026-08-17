# Daftar Tampilan Aplikasi Executive Command Center

Dokumen ini merangkum seluruh halaman aplikasi beserta card/section/chart yang ditampilkan di setiap halaman.

Pola umum yang berulang di hampir semua halaman:

- **Sidebar navigasi** (Sidebar utama, SdmSidebar untuk modul SDM, atau DimensionSidebar untuk dimensi non-SDM) — bisa diciutkan/diperlebar user (tombol Ciutkan Menu, tersimpan di localStorage); footer sidebar memuat panel data-trust (Data as-of, Last Refresh, Data Quality Score). Sidebar utama punya toggle dua mode navigasi (CEO vs Fungsional, tersimpan di localStorage).
- **Header halaman** — judul, subjudul, dan filter (Periode, Subholding/Level Organisasi).
- **Data Trust Strip** — strip tipis status kepercayaan data (data as-of, last refresh, cakupan, sumber); angka Quality dan Data as-of punya popover rincian (Completeness/Accuracy/Timeliness/Consistency dan effective date vs system synchronization).
- Seluruh halaman fluid-responsive (grid reflow 1 → 2 → komposisi penuh pada breakpoint `lg`/`xl`) dan mendukung mode dark.
- **KPI Strip** — deretan kartu metrik utama dengan nilai, delta, dan sparkline.
- Card **Insight & Rekomendasi** di bagian bawah halaman dimensi; insight utama (overview Strategi/Keuangan/Risiko + Executive Intelligence HC) membawa metadata analitik `AiMeta`: badge jenis klaim (Korelasi/Kausal/Prediksi/Rekomendasi), keyakinan %, dan sumber bukti. Pada grid Keuangan/Strategi/Risiko, label mutu **derived dari kelengkapan meta** (`InsightGradeLabel`): "(Decision-grade)" hanya bila SEMUA insight membawa meta, selain itu jujur "(Analytical Insight)" — dengan tooltip standar minimumnya; grid dimensi lain masih berlabel statis (kandidat migrasi bertahap).
- Halaman drill-down SDM memakai panel samping **Catatan Analitik** dan **Definisi & Sumber**.

---

# 1. Dashboard Utama (`/`)

Homepage punya **tiga arsitektur informasi** mengikuti toggle mode sidebar (`HomeViewSwitch`, persist localStorage; band navy menjelaskan mode aktif):
- **Mode CEO — Act & Decide** ("What should I know?"): kompresi sinyal — hanya Brief Eksekutif, grid Keputusan & Penciptaan Nilai, Performance Narrative, Executive Tension. Tanpa KPI grid/peta/kartu domain.
- **Mode Fungsional — Analyze & Execute** ("What should I analyze?"): arsitektur lengkap tiga layer di bawah.
- **Mode Komisaris (Dekom) — Oversight & Challenge** ("Did management deliver?"): Executive Tension → **Board Challenge Questions** (3 isu material: klaim manajemen + pertanyaan pengawasan yang mengujinya — "tugas Dekom bukan mengeksekusi, tetapi menguji") → grid Nilai/Risiko/Keputusan → Decision Portfolio + Impact Chain. Sidebar mode Dekom memakai `BOARD_NAV_SECTIONS` (Pengawasan Dekom, Strategi & RJPP, Risiko & Kontrol, Keputusan & Outcome, Alokasi Kapital, Hukum, ESG).

Urutan seksi mode Fungsional (tiga layer kognitif via pita **LayerBand** — badge navy "LAYER n" + nama + pertanyaan pemandu): Data Trust → **LAYER 1 · ACT** ("Apa yang butuh perhatian & keputusan saya sekarang?"): CEO Morning Brief + "Keputusan & Penciptaan Nilai" (kolom utama: Value Creation + Enterprise Risk-to-Value; rail kanan: Antrian Keputusan CEO) → **LAYER 2 · UNDERSTAND** ("Mengapa angka bergerak?"): Key Strategic KPI + Sebaran Operasi Grup + Kinerja Regional (full-width) → **LAYER 3 · EXPLORE** (intelijen mendalam per domain): kartu operasi/keuangan/produksi/forecast + rail kanan (Alert, Inisiatif, External Signals, AI Insight). Layer EXPLORE progressive disclosure (`ExploreDisclosure`): bisa dilipat via tombol Sembunyikan/Tampilkan, default terbuka, pilihan tersimpan di localStorage; saat terlipat tampil placeholder daftar konten tersembunyi.

- **Data Trust** — strip indikator kepercayaan data berlabel domain ("Data Trust · Korporat"; halaman lain: Strategi/Keuangan/Risiko/Human Capital dengan skor & rincian quality per domain); pill navy "Data Bisnis Per <tanggal>" dominan di posisi pertama, Refresh Sistem sekunder; popover memuat 5 lapisan waktu (data bisnis as-of, sinkronisasi sistem, pasar tersinkron/Market Pulse, sinyal eksternal terbaru, model forecast run — stempel terpusat di `STEMPEL_DATA`); rincian quality bergelar "Data Trust Index — <domain>" dengan 7 komponen (Completeness/Accuracy/Timeliness/Consistency/Reconciliation/Certification/Lineage) per domain; label strip "Trust"; status kanan derived dari threshold kontrol — komponen min ≥85% = "Trusted" (hijau), di bawahnya = "Trusted with Watch" (amber) — plus badge **Decision Eligibility** (Trust ≥90% = Decision Eligible · 80–90% = Analysis Only · <80% = Validate Before Decision; Trust ≥90% tapi status Watch = "Decision Eligible · with caution" amber, ambang dijelaskan di tooltip): Data Trust sebagai governance control, bukan sekadar informasi.
- **Brief Eksekutif Terkini** (sebelumnya "CEO Morning Brief" — nama menyatakan state, bukan jenis konten) — band full-width: lampu status 5 area (Keuangan/Operasi/Strategi/SDM/Risiko) dengan micro-note, "3 Hal yang Berubah" (tiap perubahan berbadge materialitas High/Medium + basis relatif, mis. "High · 14,1% EBITDA YTD"), "3 Keputusan Diperlukan" (sumber sama dengan Strategy Decision Center), dan satu hal yang dipantau; tanggal berlabel "Brief terakhir · <hari, tanggal>" agar tidak terbaca sebagai brief hari ini.
- **Key Strategic KPI (KPI Strip)** — 5 KPI enterprise inti (Pendapatan, EBITDA, Laba Bersih, ROA, Produksi CPO) selalu tampil; 2 KPI harga (CPO, Karet) di balik toggle "Lihat KPI harga lainnya" (progressive disclosure, bukan penghapusan); sparkline + delta vs RKAP; gap RKAP menampilkan % **dan nilai absolut** (mis. "+2,9% (+Rp 0,70 T)") supaya materialitas langsung terbaca.
- **Performance Narrative** — band sintesis di bawah KPI strip: chip story (Volume CPO ↓ · ASP ↑ · EBITDA ↑ · Laba ↑ vs RKAP, dihitung dari baseline) + satu kalimat executive synthesis ("profitabilitas di atas RKAP meski volume di bawah rencana; ASP/efisiensi/hilirisasi menutup gap; risiko terdekat Regional 4").
- **Executive Tension** — contradiction detection 4 domain (Strategi/Keuangan/SDM/Risiko): tiap tile menyandingkan headline bagus (✓) dengan underlying tertekan ("Tapi:") dan keputusan penjembatannya ("Keputusan:") — prinsip "jangan baca headline tanpa kontradiksinya" (mis. KPI 87,4 Baik TAPI milestone 40,8% vs plan 47,9%).
- **Value Creation** — headline Rp 1,86 T / target FY Rp 4,2 T (44%), mini area chart realisasi vs jalur target, dan dekomposisi 5 driver (hijau, termasuk Harga & bauran penjualan) vs 2 leakage (merah); caption "Bruto − leakage = netto" dihitung dari daftar driver dan guard rekonsiliasi di ceo-data memblok build bila netto ≠ headline baseline; tiap driver membawa tag sustainability (STR = Struktural / MKT = Market-driven / 1X = One-off) + caption "struktural X% bruto" — Rp 1,86 T netto ≠ seluruhnya sustainable run-rate.
- **Enterprise Risk-to-Value** — top 5 risiko enterprise dikonversi ke eksposur rupiah; taxonomy Board-level dengan tiga dimensi terpisah (Status: Emerging/Aktif/Terjadi/Terkendali · Likelihood: Pasti/Sangat Mungkin/Mungkin/Jarang, kosong bila status Terjadi · Velocity: Segera/Cepat/Sedang/Lambat) + badge jenis angka (Eksposur maksimum / Sensitivitas / Dampak terjadi / Dampak potensial / Kebutuhan pendanaan) supaya "Rp 4,2 T eksposur" tidak terbaca "akan hilang Rp 4,2 T"; tiap baris membawa pemilik dan tindakan.
- **Antrian Keputusan CEO** — rail kanan seksi Keputusan & Penciptaan Nilai; versi ringkas Strategy Decision Center (judul + pill eksposur + badge overdue + satu baris keputusan) dengan tautan ke `/strategi-kinerja/keputusan-bod`; tiap keputusan membawa badge **Decision Value at Risk** (konsekuensi ekonomi per bulan penundaan, mis. "± Rp 27 M/bulan tertahan" — juga tampil di Strategy Decision Center) dan baris aksi lifecycle (Approve/Reject/Delegasi/Analisis/Tunda) yang tercatat ke decision log lokal dengan stempel waktu (komponen shared `DecisionActions`, juga terpasang di Strategy & Risk BOD Decision Center); blok bawah "Outcome Keputusan Terakhir" menampilkan 2 outcome termutakhir (dot tone + variance) + badge cakupan "8/31 terukur" — loop keputusan sampai outcome tampil di homepage.
- **Impact Chain 2.0** — satu isu material sebagai satu rantai kausal **10 tahap**: Sinyal → Driver → Efek Bisnis → Efek Finansial → Risiko → Konsekuensi Strategis → Opsi → Keputusan → Owner → Outcome; tab per isu — **5 chain lintas domain**: Volatilitas harga CPO, Gap produksi Regional 4, El Niño H2 (iklim→produksi→EBITDA), Risiko talenta kritikal (people→operasi→keuangan), Perkara hukum & lahan HGU (legal→aset→strategi); menyatukan informasi yang tersebar di External Signals, Risk-to-Value, alert, AI Insight, dan People Capability.
- **Posisi Pasar CPO** — kartu decision-grade: ASP YTD vs Spot KPBN, badge premium %, volume belum terjual, eksposur ±5% harga, dan baris keputusan (hedge Q4 · owner); menyatukan Market Pulse + External Signals + Risk-to-Value sampai keputusan.
- **Sebaran Operasi Grup** — peta Indonesia interaktif dengan pewarnaan choropleth Pendapatan YTD per regional.
- **Kinerja Regional** — tabel/bar list peringkat kinerja per regional.
- **Operasional Grup** — kartu metrik operasional grup (produksi, utilisasi, dll.).
- **Komoditas Utama** — breakdown kinerja per komoditas (sawit, gula, karet, teh); caption "(Referensi regional · YTD 2026)" dengan tooltip pembeda vs ASP grup di KPI (rata-rata tertimbang 5 regional) agar dua harga CPO tidak terbaca bertentangan.
- **Kinerja SDM** — ringkasan metrik people (headcount, produktivitas, turnover) sebagai jembatan ke modul SDM; ditambah blok "Risiko Suksesi Posisi Kritikal" (3 posisi dengan tone merah/amber).
- **Trend Kinerja Keuangan** — line/composed chart tren pendapatan & laba bulanan.
- **Komposisi (YTD 2026)** — donut komposisi penjualan per segmen; label pusat "Penjualan Komoditas Rp 19,90 T" + baris jembatan "+ hilir/jasa & lain-lain Rp 4,70 T = konsolidasi Rp 24,60 T" (rekonsiliasi Penjualan vs Pendapatan, entri kamus "Total Penjualan Komoditas").
- **Kinerja Produksi** — bar chart realisasi produksi vs target.
- **KPI Strategis** — daftar progres KPI strategis korporat berbentuk progress bar.
- **Analitik Prediktif** — kartu proyeksi/forecast ringkas; tiap proyeksi membawa rentang P10–P90 dan keyakinan % (bukan single-point estimate); tooltip mendefinisikan confidence = kalibrasi historis (probabilitas realisasi jatuh dalam rentang, dari akurasi forecast periode sebelumnya) — bukan angka dekoratif.
- **Alert & Notifikasi Strategis** — rail kanan, daftar alert lintas fungsi berjenjang severitas.
- **Inisiatif Strategis** — daftar inisiatif korporat + status progres.
- **External Signals** — sinyal eksternal (Regulasi/Pasar/Iklim/Korporat) dengan chip kategori, angka dampak, dan baris implikasi "Artinya bagi PTPN: …" per item.
- **AI Insight / Dasar Perhitungan** — panel insight AI naratif dengan toggle penjelasan basis perhitungan; card depan memuat badge governance ringkas (Confidence 72% · Bukti N · Asumsi N) sesuai prinsip literasi AI di Executive Guide; view rincian memuat "Jembatan Ekonomi (Basis Disetahunkan)" dengan catatan pembeda vs alert YTD 5 bulan (waterfall eksplisit: volume → ASP → pendapatan → biaya variabel & kas operasi → EBITDA inkremental → depresiasi & bunga → pajak badan 22% → laba bersih; label dampak "disetahunkan"), blok Asumsi & Bukti, Sensitivitas & Alternatif (±10 rb ton, alternatif utilisasi PKS, reversibility), chip Owner/Tenggat/Status (masuk siklus aksi) + chip **validity** ("Dibuat 13 Agu · berlaku s.d. 29 Agu" + status Active/Needs Revalidation/Superseded — temporal integrity rekomendasi), blok Skenario (penuh/50%/tanpa intervensi), panel **Executive Challenge** collapsible (8 pertanyaan Question Engine konteks "Rekomendasi AI" — tanyakan dulu sebelum menerima, + link ke halaman guide), dan **confidence breakdown** 4 chip (Data 94% · Model 72% · Kausal 61% · Rekomendasi 58% — yakin pada data ≠ yakin pada kausal ≠ yakin pada rekomendasi) dengan angka gabungan 72%.

---

# 2. Modul SDM & Talenta

## `/sdm-talenta` — HC Executive Operating System

- **Data Trust** — strip kepercayaan data HC (as-of, cakupan, confidence).
- **HC KPI Strip** — kartu KPI people (Total Headcount, labor cost, turnover, produktivitas) dengan tren.
- **Executive Intelligence** — panel sintesis AI: hitungan sinyal kritis lintas seksi + satu rekomendasi utama.
- **People Risk Radar** — radar chart 6 dimensi risiko people + daftar top risks dengan severitas.
- **People Math & HPI BEM Summary** — ringkasan skor HPI-BEM dan dimensi People Math.
- **People Productivity** — metrik produktivitas per orang beserta tren.
- **Scenario Simulation (What-if)** — ringkasan skenario what-if beserta dampak headcount/biaya.
- **Skills Intelligence (Supply vs Demand 2028)** — perbandingan pasokan vs kebutuhan skill kritis.
- **Alerts & Notifications** — daftar alert people aktif, tautan ke halaman register alert.
- **Strategic Alignment** — rail kanan, rantai alignment workforce → capability → performance → outcome.
- **BOD Decision Center** — item keputusan people yang menunggu BOD (tab Decision Required / Opportunity / Information).
- **Talent Portfolio** — distribusi talenta 9-box ringkas.
- **Talent Action Intelligence** — daftar tindakan talenta yang direkomendasikan.
- **HC Intelligence Copilot (AI)** — panel chat/asisten AI HC.

## `/sdm-talenta/alerts` — Alerts & Notifications

- **Header detail** — statistik "12 alert aktif · 3 kritikal · median usia 2,4 hari" + **Detail KPI Strip** (jumlah aktif, kritikal, usia median, SLA).
- **Register Alert Aktif** — tabel 12 alert: waktu picu, kategori, judul, detail, cakupan, ambang, aktual, pemilik, pill tingkat.
- **Alert per Kategori** — bar list alert dikelompokkan per kategori.
- **Pembacaan Eksekutif** — kartu narasi interpretasi eksekutif atas klaster alert.
- **Catatan & Definisi** — panel catatan metodologi dan definisi istilah alert.

## `/sdm-talenta/decision-center` — BOD Decision Center

- **Header detail** — statistik "9 item aktif · 3 menunggu BOD · eksposur Rp 98,6 M" + **Detail KPI Strip**.
- **3 kartu item prioritas** — kartu bernada merah/amber/hijau berisi dampak, narasi, tenggat, dan tombol "Jadwalkan di Rapat BOD".
- **Register Keputusan** — tabel 9 item: kode, item, kategori, pill dampak, nilai, rekomendasi, pemilik, tenggat, status.
- **Komposisi Item** — bar list jumlah item per kategori register.
- **Pembacaan Eksekutif** — narasi prioritas keputusan.
- **Catatan & Definisi** — panel notes.

## `/sdm-talenta/strategic-alignment`

- **Header detail** + **Detail KPI Strip** — KPI alignment (pemenuhan, capability, performance, outcome).
- **Alignment Chain — PTPN Group** — diagram alur 4 tahap (workforce → capability → performance → outcome).
- **Rantai Alignment per Regional** — tabel per regional: kebutuhan, aktual, gap, capability, performance, produktivitas, pill risiko.
- **Capability Index per Fungsi** — bar list indeks kapabilitas per fungsi vs target 85%.
- **Pembacaan Eksekutif** — narasi diagnosis.
- **Catatan & Definisi** — panel notes.

## `/sdm-talenta/direktori-karyawan`

- **Header Direktori Karyawan** — judul + ringkasan.
- **Statistik Direktori (5 kartu)** — Total Karyawan, Karyawan Tetap, Karyawan Perempuan, Rising Star, Rata-rata Kinerja.
- **Pencarian & Tabel Karyawan** — panel pencarian + filter (Unit, Lokasi, Fungsi, Person Grade, Job Grade, Status, Kategori Talenta), pengurutan, dan tabel karyawan (Nama, NIK, Jabatan, Fungsi, Unit, Lokasi Kerja, Person Grade, Job Grade, dst.).

## `/sdm-talenta/profil-karyawan` — Talent Intelligence Profile

Hero **Executive Talent Card**: identitas + badge taxonomy 3 dimensi (Segmen Rising Star · Status High Potential · Suksesi Ready 1–2 Thn), data sensitif ter-masking, panel **Talent Signal** (8 sinyal termasuk Talent Confidence 87% & Succession Fit 92%), dan strip **Executive Assessment**. Topbar memuat tombol **Generate Talent Brief**. Navigasi 6 domain (decision layer + evidence layer):

- **01 Executive Overview** — Ringkasan Kinerja 2025, Informasi Jabatan Saat Ini, Talent & Potential (9-box dengan label koordinat "Box 9"), Performance Trajectory (chart 5 siklus + rata-rata kenaikan 3 thn), Talent Risk (5 indikator + Primary Risk), Perubahan Sejak Review (delta), Skenario Keputusan promosi (3 opsi + konsekuensi), Nilai Finansial Talenta (cost of loss vs retensi), People Intelligence (evidence → AI interpretation → pola talenta serupa 84% → rekomendasi), Recommended HC Actions (5 aksi + status).
- **02 Performance & Capability** — Business Impact FY 2025 (yield, biaya panen, produksi, zero accident), Capability Profile (strengths / development gap / critical gap / gap-to-role 84%), Umpan Balik 360° (3 tema anonim), lalu detail Kinerja & detail Kompetensi (eks tab lama).
- **03 People Intelligence** — People Math (Score Overall, CORE + People Math Positioning, People Factors radar + dimensi, Insight, Talent Decision) dan HPI BEM (Ringkasan Performance Gap, Diagnostic 6 sel BEM, Root Cause Analysis, Intervensi & Action Plan, Performance Projection).
- **04 Career & Succession** — Riwayat Jabatan, Career Velocity, Aspirasi & Mobilitas, Job Profile (akuntabilitas + syarat jabatan + Role Fit 94%), Riwayat Keputusan Komite Talenta (+ link perbandingan kandidat), Backfill Coverage, Kepatuhan & Disiplin (termasuk Fit-to-Work/MCU), Engagement & Wellbeing, Posisi Kompensasi (compa-ratio, tanpa nominal).
- **05 Development** — Pelatihan & Sertifikasi (dengan blok Dampak ke Kompetensi), Mentor & Sponsor, rencana & riwayat pengembangan (IDP, skills gap, jalur karier, catatan).
- **06 Records** — Riwayat Pendidikan, Penghargaan (dengan baris impact), Informasi Pribadi, Pekerjaan, Riwayat Kepegawaian, Dokumen. Kartu Ringkasan Masa Kerja (tab Pekerjaan) memuat horizon pensiun: Usia Pensiun Normal (56 tahun), TMT Pensiun perkiraan (1 April 2050, awal bulan setelah usia 56), dan Sisa Masa Kerja (23 tahun 10 bulan, dihitung dari tanggal potong 31 Mei 2026).

Halaman detail drill-down profil (semua pola SdmDetailHeader + Detail KPI Strip + tabel + Catatan Analitik/Definisi):

- `/sdm-talenta/profil-karyawan/kinerja` — rincian 9 KPI berbobot FY 2025 + tren skor.
- `/sdm-talenta/profil-karyawan/kompetensi` — peta 12 kompetensi vs standar Job Grade G7.
- `/sdm-talenta/profil-karyawan/pelatihan-sertifikasi` — riwayat pelatihan + registri sertifikasi & masa berlaku.
- `/sdm-talenta/profil-karyawan/penghargaan` — registri penghargaan + tingkat + dasar prestasi.
- `/sdm-talenta/profil-karyawan/riwayat-pendidikan` — pendidikan formal & non-gelar.
- `/sdm-talenta/profil-karyawan/riwayat-jabatan` — kronologi jabatan + durasi per jenjang.
- `/sdm-talenta/profil-karyawan/mutasi-penugasan` — registri SK mutasi & penugasan khusus.
- `/sdm-talenta/profil-karyawan/perubahan-data` — jejak audit perubahan data kepegawaian.
- `/sdm-talenta/profil-karyawan/rekomendasi-pengembangan` — rencana IDP pola 70:20:10 per gap.
- `/sdm-talenta/profil-karyawan/people-factors` — derivative scores People Math per faktor vs benchmark kohort (urut skor tertinggi).
- `/sdm-talenta/profil-karyawan/job-profile` — akuntabilitas jabatan saat ini + 8 syarat jabatan target.
- `/sdm-talenta/profil-karyawan/perbandingan-talenta` — matriks 3 kandidat succession pool pada 8 dimensi keputusan.
- `/sdm-talenta/profil-karyawan/talent-brief` — Executive Talent Brief 1 halaman printable (kop PTPN, talent signal, strengths/priorities, risk, rekomendasi suksesi, HC actions) + tombol Cetak/Simpan PDF.

---

# 3. Modul Workforce Analytics

## `/workforce-analytics` (dashboard utama)

- **Data Trust Strip** — bar tipis status kepercayaan data: Data as-of, Last Refresh, sumber & cakupan.
- **KPI Strip Workforce (8 kartu)** — Total Headcount, Total FTE, New Hire (YTD), Turnover Rate (YTD), Average Tenure, Male/Female Ratio, Average Age, HC Cost to Revenue; tiap kartu berisi nilai + delta vs Des 2025.
- **Workforce Intelligence (AI)** — panel sintesis: 4 kartu sinyal kritis future readiness + counter Critical/Warning/Horizon + satu prioritas utama.
- **Workforce Demand vs Supply (Proyeksi 2026-2028)** — grouped bar chart demand vs supply plus rantai business driver dan rencana penutupan gap.
- **Workforce Capacity (Effective vs Theoretical)** — gauge kapasitas efektif vs FTE teoritis beserta daftar faktor pengurang.
- **Headcount Trend** — area chart pergerakan headcount bulanan (link ke halaman detail tren).
- **Headcount by Organization** — donut + legend distribusi headcount per holding/sub holding.
- **Headcount by Employment Type** — donut + legend komposisi berdasarkan jenis/status karyawan.
- **Headcount by Generation** — bar list horizontal komposisi per generasi dengan jumlah dan persentase.
- **Headcount by Age Group** — bar chart sebaran headcount per kelompok usia.
- **Diversity Snapshot** — 4 tile metrik keragaman workforce (gender, disabilitas, dll).
- **Headcount by Job Level** — piramida SVG 6 lapis jabatan.
- **Turnover Rate Trend** — area chart tren turnover rate.
- **Headcount Movement (YTD)** — bar chart arus masuk vs keluar year-to-date.
- **Workforce Productivity** — metrik produktivitas HC terpilih (revenue/FTE, output per pekerja).
- **Critical Skills Gap (Demand 2028)** — 4 skill dengan defisit terbesar, bar supply vs demand.
- **Workforce Risk Radar** — 6 tile risiko workforce + badge Risk Score dan kategori.
- **Workforce Scenarios (Horizon 2028)** — 4 kartu skenario workforce dengan penanda skenario rekomendasi.
- **Insight & Rekomendasi (Decision-grade)** — daftar insight berikon per kategori dengan rekomendasi tindak lanjut.

## `/workforce-analytics/headcount-trend`

- **Headcount Trend — Detail** (header) + **Trend KPI Strip** — KPI ringkas pergerakan headcount.
- **Headcount Aktual & Proyeksi** — line/area chart Jun 2023–Mei 2026 aktual + proyeksi Jun–Des 2026 dengan pita keyakinan 80%.
- **Pertumbuhan YoY** — bar chart pertumbuhan year-on-year vs rencana korporat 3,0%.
- **Komposisi Status Kerja** — stacked chart komposisi status kerja 12 bulan.
- **Arus Masuk & Keluar (12 Bulan)** — chart in/out bulanan beserta net.
- **Kontribusi Net Growth YTD** — bar list kontributor pertumbuhan bersih sejak Des 2025.
- **Rekonsiliasi Headcount Bulanan** — tabel rekonsiliasi bulanan.
- **Catatan Analitik** + **Definisi & Sumber** — panel samping.

## `/workforce-analytics/headcount-organisasi`

- **Header: Headcount by Organization** + **Detail KPI Strip** — KPI sebaran pekerja per entitas.
- **Tren Headcount per Subholding** — line chart 12 bulan, menandai lompatan Des 2025 (integrasi PTPN I).
- **Headcount per Entitas** — bar list porsi tiap entitas terhadap total grup.
- **Produktivitas per Entitas** — bar list ton TBS per pekerja per bulan.
- **Profil Headcount per Entitas** — tabel komposisi status kerja, biaya, indikator operasi per subholding.
- **Catatan Analitik** + **Definisi & Sumber**.

## `/workforce-analytics/headcount-status-kerja`

- **Header: Headcount by Employment Type** + **Detail KPI Strip**.
- **Komposisi Status Kerja** — chart tren komposisi tetap/PKWT/BHL/magang.
- **Status Kerja per Subholding** — stacked bar porsi status kerja tiap subholding.
- **Turnover per Status Kerja** — bar list tingkat keluar 12 bulan terakhir.
- **Profil Status Kerja** — tabel ukuran, biaya, dan dinamika tiap status kerja.
- **Catatan Analitik** + **Definisi & Sumber**.

## `/workforce-analytics/headcount-generasi`

- **Header: Headcount by Generation** + **Detail KPI Strip**.
- **Pergeseran Generasi (5 Tahun)** — stacked chart pergeseran komposisi kohort.
- **Turnover per Generasi** — bar list tingkat keluar 12 bulan.
- **Kemahiran Digital** — bar list indeks 1–5 hasil asesmen kapabilitas.
- **Profil Generasi** — tabel ukuran, masa kerja, kepemimpinan, mobilitas.
- **Catatan Analitik** + **Definisi & Sumber**.

## `/workforce-analytics/headcount-usia`

- **Header: Headcount by Age Group** + **Detail KPI Strip**.
- **Piramida Usia** — piramida gender per kelompok usia.
- **Proyeksi Pensiun 2026–2031** — bar/line proyeksi gelombang pensiun (puncak 2030).
- **Sebaran Kelompok Usia** — bar list porsi tiap kelompok terhadap total grup.
- **Profil Kelompok Usia** — tabel komposisi gender, masa kerja, porsi jabatan manajerial.
- **Catatan Analitik** + **Definisi & Sumber**.

## `/workforce-analytics/headcount-job-level`

- **Header: Headcount by Job Level** + **Detail KPI Strip**.
- **Piramida Struktur Jabatan** — piramida 6 lapis (55,8% di lapis Staff).
- **Perempuan per Lapis Jabatan** — bar list porsi perempuan (%) tiap lapis.
- **Posisi Vakan per Lapis** — bar list jumlah posisi kosong per 31 Mei 2026.
- **Profil Lapis Jabatan** — tabel ukuran, demografi, biaya, kesiapan suksesor.
- **Catatan Analitik** + **Definisi & Sumber**.

## `/workforce-analytics/diversity`

- **Header: Diversity Snapshot** + **Detail KPI Strip**.
- **Tren Keragaman (12 Bulan)** — line chart dengan garis target perempuan 30% (2027).
- **Perempuan per Lapis Jabatan** — bar list porsi perempuan tiap lapis.
- **Capaian vs Target** — bar list metrik terhadap target korporat 2027.
- **Keragaman per Entitas** — tabel capaian keragaman tujuh entitas grup.
- **Catatan Analitik** + **Definisi & Sumber**.

## `/workforce-analytics/turnover-trend`

- **Header: Turnover Rate Trend** + **Detail KPI Strip**.
- **Tren Turnover 36 Bulan** — line chart dengan ambang toleransi 7,5%.
- **Alasan Keluar** — bar list alasan keluar 12 bulan terakhir (4.643 pekerja).
- **Turnover per Masa Kerja** — bar list tingkat keluar menurut lama bekerja.
- **Turnover per Entitas** — tabel arus keluar, komposisi sukarela, posisi kritis, biaya.
- **Catatan Analitik** + **Definisi & Sumber**.

## `/workforce-analytics/headcount-movement`

- **Header: Headcount Movement (YTD)** + **Detail KPI Strip**.
- **Arus Headcount YTD** — waterfall 68.501 (Des 2025) → 70.142 (Mei 2026).
- **Arus Masuk & Keluar (12 Bulan)** — chart ritme in/out bulanan.
- **Sumber Pemenuhan Posisi** — bar list asal pekerja yang masuk YTD.
- **Arus Headcount per Entitas** — tabel rekonsiliasi Des 2025 → Mei 2026 per subholding.
- **Catatan Analitik** + **Definisi & Sumber**.

## `/workforce-analytics/insight`

- **Header: Insight & Rekomendasi** + **Detail KPI Strip**.
- **Eksposur per Kategori** — bar list dampak 12 bulan ke depan (Rp miliar).
- **Status Tindak Lanjut** — bar list jumlah insight dan eksposur per status.
- **Daftar Insight & Rekomendasi (Insight Explorer)** — tabel interaktif dengan pencarian dan filter temuan/rekomendasi/pemilik.
- **Catatan Analitik** + **Definisi & Sumber**.

# 4. Modul Kinerja Karyawan

## `/kinerja-karyawan` (dashboard utama)

- **KPI Strip Kinerja (6 kartu)** — Overall Score, Karyawan Dinilai, On Target & Above, High Performer, Below Target, Belum Dinilai; nilai + delta + sparkline.
- **Performance Intelligence (AI)** — panel sinyal kinerja kritis (counter + kartu sinyal beserta narasi).
- **Distribusi Kinerja** — donut chart komposisi kategori kinerja.
- **Trend Kinerja Overall Score** — area chart rata-rata score dari waktu ke waktu.
- **Kinerja Berdasarkan Dimensi** — radar chart rata-rata score per dimensi, Q2 vs Q1 2026.
- **Kinerja per Unit Organisasi** — bar list rata-rata overall score tiap unit.
- **Kinerja Berdasarkan Level Jabatan** — stacked bar distribusi kategori per level jabatan + rata-rata score.
- **Pencapaian Target Organisasi** — gauge pencapaian plus progress bar KPI Strategis.
- **Performance Calibration** — tabel pre vs post calibration per unit (Q2 2026) dan status kalibrasi.
- **Performance Fairness** — daftar indikator keadilan penilaian (variance, gender gap, bias) vs ambang.
- **Performance Risk Radar** — kartu risiko kinerja (mis. chronic underperformance) berbasis 68.142 karyawan dinilai.
- **Score Decomposition** — breakdown Job 45% + Behavior 25% + Corporate 30% = Overall.
- **High Performer → Talent Conversion** — funnel alur performance ke succession pipeline.
- **Strategy → Individual Alignment** — visual line of sight strategi ke individu + Strategy Alignment Index.
- **Continuous Performance** — ritme Goal → Check-in → Feedback → Coaching dengan progress vs target dan Feedback Frequency.
- **360° Performance Signal** — coverage 360°, Rater Alignment, self vs others gap.
- **Performance → Reward & Development** — dua blok konsekuensi rating: Reward (merit, bonus, promosi) dan Development.
- **Ringkasan Kinerja Tim** — bar segmen High / On Target / Below per tim.
- **Insight & Rekomendasi AI (Beta)** — daftar insight kinerja + link rekomendasi lengkap.
- **Performance Decision Center** — panel keputusan menunggu Direksi, bertab, kartu berimpact dan due date.
- **Coach Robot** — kartu asisten coaching pada sidebar.

## `/kinerja-karyawan/distribusi`

- **Header: Distribusi Kinerja** + **Detail KPI Strip**.
- **Komposisi Kategori Q2 2026** — donut jumlah karyawan per kategori kinerja.
- **Pergeseran Kurva (4 Kuartal)** — stacked bar porsi tiap kategori terhadap populasi dinilai.
- **Below Target + Poor per Entitas** — bar list porsi karyawan di bawah standar.
- **Distribusi Kategori per Entitas** — tabel komposisi kinerja dan skor rata-rata tiap entitas.
- **Catatan Analitik** + **Definisi & Sumber**.

## `/kinerja-karyawan/tren-score`

- **Header: Tren Overall Score** + **Detail KPI Strip**.
- **Tren Overall Score vs Target** — line chart skor grup, unit tertinggi & terendah per bulan.
- **Kenaikan Score per Entitas (YTD)** — bar list selisih poin Jan → Jun 2026.
- **Rekap Bulanan Overall Score** — tabel skor, pergerakan, posisi terhadap target.
- **Catatan Analitik** + **Definisi & Sumber**.

## `/kinerja-karyawan/dimensi`

- **Header: Kinerja per Dimensi** + **Detail KPI Strip**.
- **Profil Dimensi Q2 vs Q1 2026** — radar chart skor tiap dimensi (skala 70–92).
- **Tren Dimensi (4 Kuartal)** — line chart pergerakan skor tiap dimensi sejak Q3 2025.
- **Posisi Dimensi vs Rata-rata Grup** — bar list deviasi terhadap rata-rata 86,0.
- **Rincian Dimensi Penilaian** — tabel bobot, pergerakan kuartal, sebaran unit.
- **Catatan Analitik** + **Definisi & Sumber**.

## `/kinerja-karyawan/unit-organisasi`

- **Header: Kinerja per Unit Organisasi** + **Detail KPI Strip**.
- **Peringkat Overall Score Unit** — bar list rata-rata skor tiap entitas Q2 2026.
- **Tren Unit Ekstrem (Jan–Jun 2026)** — line chart dua unit teratas dan dua unit terbawah.
- **Rincian Kinerja per Unit Organisasi** — tabel skor, komposisi kategori, pencapaian KPI, status kalibrasi.
- **Catatan Analitik** + **Definisi & Sumber**.

## `/kinerja-karyawan/level-jabatan`

- **Header: Kinerja per Level Jabatan** + **Detail KPI Strip**.
- **Komposisi Kategori per Level Jabatan** — stacked bar porsi kategori per level + rata-rata skor.
- **Rata-rata Skor per Level** — bar list overall score tiap lapis jabatan Q2 2026.
- **Rincian Kinerja per Level Jabatan** — tabel populasi, skor, sebaran individu, gradien antar level.
- **Catatan Analitik** + **Definisi & Sumber**.

## `/kinerja-karyawan/kpi-strategis`

- **Header: KPI Strategis** + **Detail KPI Strip**.
- **Pencapaian per KPI Strategis** — bar list realisasi terhadap target RKAP 2026 (YTD).
- **Tren Pencapaian KPI (4 Kuartal)** — line chart persentase pencapaian tiap KPI.
- **Rincian KPI Strategis RKAP 2026** — tabel bobot, target, realisasi, pemilik akuntabilitas.
- **Catatan Analitik** + **Definisi & Sumber**.

---

# 5. Modul Talent Intelligence

## `/talent-intelligence` (dashboard utama)

- **Header** — judul + subjudul "Memahami, Mengembangkan, dan Menyiapkan Talenta Terbaik PTPN Group" dengan filter Periode dan Level Organisasi.
- **KPI Strip (7 kartu)** — Total Talenta Aktif (3.742), High Potential/HiPo (1.068), Critical Role Coverage (68%), Succession Ready Now (412), dan 3 KPI lain, dengan delta vs Mei 2025.
- **Executive Talent Intelligence** — panel sintesis eksekutif: strip hitungan sinyal + 4 kartu sinyal (temuan, eksposur, aksi) berwarna sesuai urgensi.
- **Talent Portfolio (9 Box Grid)** — matriks 3×3 kinerja vs potensi berisi jumlah talenta per kotak + legenda kategori.
- **Talent Pipeline by Readiness** — blok tahap kesiapan (Ready Now s/d Future Potential) plus panel fokus pengembangan pipeline.
- **Top Talent by Potential** — tabel ringkas talenta berpotensi tertinggi (nama, jabatan, skor, readiness).
- **Talent Risk Overview** — donut komposisi tingkat risiko + daftar talenta flight risk teratas.
- **Talent Attributes Insight** — tabel/bar per atribut kapabilitas: skor grup, benchmark, gap.
- **Critical Role Coverage** — donut coverage posisi kritikal beserta rincian kesiapan suksesor.
- **Role–Talent–Skill Match** — daftar posisi kritikal: skill wajib, kandidat terbaik, bar progres match score.
- **Talent Decisions** — kartu keputusan talenta yang menunggu/berjalan di BOD Decision Center.
- **Talent Development Focus** — 4 kartu fokus pengembangan + sparkline investasi dan rantai ROI development.
- **Talent Mobility Overview** — bar list jenis mobilitas (promosi, rotasi, dll) plus panel dampak mobilitas.
- **Tren Total Talenta Aktif** — grafik tren populasi talenta aktif.
- **Talent Intelligence Index** — skor komposit dengan bar progres tiap komponen penyusun.
- **Talent Density Map** — heatmap kepadatan talenta per unit kerja/region.

Semua halaman detail berikut memakai kerangka sama: header detail + KPI Strip + panel samping **Catatan Analitik** dan **Definisi & Sumber**.

## `/talent-intelligence/executive-signals`
- **KPI Strip** — 4 sinyal aktif, 2 kritis, status aksi.
- **4 Kartu Sinyal Eksekutif** — temuan, bukti, eksposur, aksi, pemilik, pill status.
- **Executive Recommendation** — banner rekomendasi eksekutif ringkas.
- **Register Sinyal & Tindak Lanjut** — tabel sinyal: kartu sumber, eksposur, aksi, pemilik, tenggat, status.
- **Angka yang Dipantau** — bar list metrik kunci di balik sinyal aktif.

## `/talent-intelligence/portfolio-9box`
- **KPI Strip** — 3.742 talenta dipetakan, 60,4% kuadran atas.
- **Grid 9 Box Detail** — matriks 9 kotak: jumlah, porsi, tindakan talenta per kotak.
- **Pergeseran Kuadran (6 Semester)** — line chart porsi populasi per kuadran.
- **Porsi Star per Entitas** — bar list persentase Star tiap entitas.
- **Zona Perbaikan per Entitas** — bar list jumlah talenta di Box 1–3.
- **Naik Kelas Kotak (YTD)** — bar list talenta yang naik ke kotak lebih tinggi.
- **Distribusi 9 Box per Entitas** — tabel sebaran talenta 7 entitas + baris Total Grup.

## `/talent-intelligence/pipeline-readiness`
- **KPI Strip** — 412 Ready Now, rasio pipeline 5,1x.
- **Pipeline Funnel** — funnel tahap kesiapan pool suksesi + konversi antar tahap.
- **Komposisi Readiness (6 Semester)** — line chart porsi populasi per tahap kesiapan.
- **Rasio Ready Now per Posisi** — bar list rasio kandidat siap vs posisi kritikal per job family.
- **Pipeline per Job Family** — tabel sebaran talenta 4 tahap kesiapan + beban posisi kritikal.

## `/talent-intelligence/top-talent`
- **KPI Strip** — 1.068 HiPo, skor rata-rata 8,4.
- **HiPo per Entitas** — bar list jumlah HiPo dan porsinya tiap entitas.
- **Sebaran Skor Potensi** — bar list jumlah HiPo per rentang skor komposit.
- **Status Kesiapan HiPo** — bar list distribusi HiPo pada 4 tahap kesiapan.
- **Peringkat Talenta Berpotensi Tertinggi** — tabel 18 talenta: skor, performance, potential, readiness, posisi target, flight risk.

## `/talent-intelligence/talent-risk`
- **KPI Strip** — 186 talenta berisiko, 86 high risk.
- **Komposisi Tingkat Risiko** — donut chart talenta berisiko per kategori skor.
- **Faktor Pendorong Risiko** — bar list frekuensi tiap faktor risiko.
- **Tren Risiko & Retensi (12 Bulan)** — line chart high risk, medium risk, retensi internal.
- **Register Talenta Berisiko** — tabel 12 talenta skor risiko tertinggi + backup suksesor, lead time, aksi retensi.

## `/talent-intelligence/atribut-talenta`
- **KPI Strip** — skor rata-rata 4,00, 3 dari 6 atribut di atas benchmark.
- **Profil Kapabilitas vs Benchmark** — radar chart skor atribut vs benchmark industri.
- **Gap terhadap Benchmark** — bar list selisih skor terhadap median industri.
- **Talenta dalam Program Penguatan** — bar list peserta program pengembangan per atribut.
- **Skor Atribut per Lapis Jabatan** — tabel skor atribut Direktur/SVP s/d Supervisor.
- **Kapabilitas per Entitas** — tabel 4 atribut kunci + rata-rata tiap entitas.

## `/talent-intelligence/critical-role`
- **KPI Strip** — coverage 68%, 27 posisi tanpa suksesor.
- **Coverage Stack Bars** — stacked bar kedalaman pipeline per kelompok posisi kritikal.
- **Tren Coverage (6 Semester)** — line chart coverage total, Ready Now coverage, posisi tanpa suksesor.
- **Coverage per Entitas** — bar list porsi posisi kritikal yang tercakup suksesor.
- **Coverage per Kelompok Posisi Kritikal** — tabel coverage, split kesiapan, lead time eksternal, prioritas.

## `/talent-intelligence/role-match`
- **KPI Strip** — match rata-rata 82%, 31 posisi di bawah 70%.
- **Sebaran Match Score** — bar list jumlah posisi kritikal per rentang kesesuaian.
- **Skill Gap Terbanyak** — bar list skill yang paling sering jadi gap terbesar.
- **Sumber Pengisian Posisi** — bar list rencana pengisian 208 posisi (internal siap, akselerasi, rotasi, eksternal).
- **Pemetaan Posisi, Kandidat Terbaik, dan Skill Gap** — tabel 12 posisi prioritas: skill wajib, kandidat teratas, match, readiness, flight risk, rekomendasi.

## `/talent-intelligence/decisions`
- **KPI Strip** — 6 keputusan aktif, 3 menunggu BOD, Rp 8,6 M.
- **3 Kartu Keputusan Prioritas** — konteks, rekomendasi, talenta terdampak, anggaran, tenggat, pemilik, status.
- **Register Keputusan Talenta** — tabel 6 keputusan aktif dengan dampak, anggaran, pemilik, status.
- **Talenta Terdampak per Kategori** — bar list cakupan keputusan per kategori dampak.

## `/talent-intelligence/development`
- **KPI Strip** — Rp 24,8 M, 3.228 peserta, completion 87%.
- **ROI Chain** — rantai langkah dampak investasi development sampai kinerja.
- **Realisasi Investasi Bulanan** — line chart investasi (Rp miliar) per bulan.
- **Peserta per Fokus Pengembangan** — bar list jumlah talenta per fokus program.
- **Investasi per Entitas** — bar list realisasi investasi YTD tiap entitas.
- **Efektivitas Fokus Pengembangan** — tabel serapan biaya, completion, capability uplift, naik kelas readiness.

## `/talent-intelligence/mobilitas`
- **KPI Strip** — 336 mobilitas YTD, 87% berdampak positif.
- **Mobilitas per Bulan (YTD 2026)** — stacked bar chart per jenis mobilitas.
- **Jenis Mobilitas & Dampaknya** — bar list jumlah perpindahan + uplift kinerja pasca mobilitas.
- **Pengisian Internal per Entitas** — bar list porsi lowongan yang diisi talenta internal.
- **Arus Talenta Antar Entitas** — tabel masuk/keluar/net, promosi, rotasi, pengisian internal.
- **Efektivitas per Jenis Mobilitas** — tabel uplift kinerja dan retensi 12 bulan tiap instrumen.

## `/talent-intelligence/tren-talenta`
- **KPI Strip** — 3.742 talenta, +238 orang (12 bulan).
- **Populasi Talenta (12 Bulan)** — line chart total talenta aktif, HiPo, Ready Now.
- **Arus Pool per Kuartal** — stacked bar talenta masuk vs keluar pool.
- **Rincian Arus Pool** — bar list penyebab masuk dan keluar pool 12 bulan.
- **Pertumbuhan Pool per Entitas** — tabel perbandingan Mei 2025 vs Mei 2026 + arus masuk/keluar.

## `/talent-intelligence/index-talenta`
- **KPI Strip** — Index 74/100, target 2027: 80.
- **Tren Index (6 Semester)** — line chart index dengan garis referensi target 80.
- **Skor per Komponen** — bar list 7 komponen penyusun index (0–100).
- **Index per Entitas** — bar list komposit per entitas.
- **Penyusun Tiap Komponen** — tabel metrik pembentuk skor, perubahan, target, selisih, kartu sumber.

## `/talent-intelligence/talent-density`
- **KPI Strip** — density grup 3,5%, 1.068 HiPo di 5 region.
- **Talent Density Map** — heatmap kepadatan talenta per unit kerja.
- **Density per Region** — bar list HiPo relatif terhadap workforce region.
- **Flight Risk per Region** — bar list porsi talenta berisiko keluar per region.
- **Profil Talenta per Region** — tabel HiPo, workforce, density, coverage, tanpa suksesor, flight risk.

---

# 6. Modul Succession Planning

## `/succession-planning` (dashboard utama)

- **Header** — judul + subjudul "Memastikan keberlanjutan kepemimpinan untuk masa depan organisasi".
- **KPI Strip** — kartu KPI dengan sparkline: Posisi Kritis (212), Posisi dengan Kandidat Siap (158 / 74,5%), Talent Pool High Potential (1.245), Bench Strength (1,6), dst.
- **Peta Suksesi – 9 Box Talent Grid** — matriks potensi vs kinerja dengan jumlah talenta per kotak.
- **Posisi Kritis dengan Risiko Kekosongan** — tabel posisi kritis (bench, kandidat, risiko); klik baris membuka panel **Role–Successor Fit** berisi kartu kandidat, skor fit, dan gap kompetensi.
- **Pipeline Kepemimpinan per Level** — matriks jumlah kandidat per level jabatan menurut tingkat kesiapan.
- **Talent Pool (High Potential)** — donut chart komposisi talenta HiPo per fungsi.
- **Tren Bench Strength (Rata-rata)** — area chart pergerakan bench strength grup.
- **Distribusi Kesiapan Kandidat** — bar segmen distribusi kandidat per tahap kesiapan.
- **Rencana Aksi Suksesi** — tabel inisiatif dengan bar progres, uplift readiness, percepatan time-to-readiness.
- **Kandidat Siap Sekarang (< 1 Tahun)** — daftar kandidat Ready Now beserta posisi targetnya.
- **Insight & Rekomendasi AI** — insight/rekomendasi otomatis atas kondisi suksesi.
- **Emergency Succession Coverage** — kesiapan pengganti darurat per kategori.
- **BOD Succession Decision Center** — 3 kartu keputusan suksesi yang memerlukan keputusan Direksi.
- **Knowledge Transfer Readiness** — daftar posisi dengan bar mini per dimensi kesiapan transfer pengetahuan.
- **Successor Concentration** — daftar talenta yang jadi suksesor di banyak posisi (risiko konsentrasi).
- **Diversitas Pipeline Suksesi** — funnel diversitas per tahap suksesi.
- **External Succession Bench** — 4 kartu ketersediaan kandidat pasar eksternal per posisi/level.
- **Tren Kesehatan Suksesi** — daftar indikator tren kesehatan suksesi dengan arah pergerakan.
- **Footnote Suksesi** — catatan kaki sumber data dan periode.

Semua halaman detail memakai KPI Strip + panel **Catatan Analitik** dan **Definisi & Sumber**.

## `/succession-planning/nine-box`
- **KPI Strip** — 1.245 talenta dinilai, 642 berpotensi tinggi.
- **9 Box Detail Grid** — matriks 9 kotak: jumlah, porsi populasi, tindakan hasil forum kalibrasi.
- **Pergeseran Baris Grid (4 Kuartal)** — line chart porsi populasi menurut tingkat potensi.
- **Porsi Star Talent per Fungsi** — bar list Box 9 terhadap pool tiap fungsi.
- **Rincian Kotak 9 Box** — tabel populasi, Δ kuartal, jadi kandidat, tindakan talenta, pemilik.

## `/succession-planning/posisi-kritis`
- **KPI Strip** — 212 posisi kritis, 54 tanpa kandidat.
- **Sebaran Posisi Kritis per Entitas** — bar list jumlah posisi kritis + coverage tiap entitas.
- **Tren Coverage & Eksposur** — line chart coverage, posisi tanpa kandidat, posisi risiko tinggi.
- **Posisi Tanpa Kandidat per Entitas** — bar list posisi kritis tanpa suksesor.
- **Posisi Kritis Prioritas Tertinggi** — tabel 10 posisi bench terendah: risiko, kandidat, Ready Now, pemicu transisi, pengganti darurat.

## `/succession-planning/pipeline`
- **KPI Strip** — 400 kandidat, rasio 1,89 per posisi kritis.
- **Kesiapan Kandidat per Level** — stacked bar kandidat per tingkat kesiapan tiap level.
- **Pertumbuhan Pipeline (Jan–Jun 2026)** — line chart jumlah kandidat per tingkat kesiapan.
- **Kandidat per Level** — bar list total kandidat suksesor tiap lapis jabatan.
- **Rincian Pipeline per Level Jabatan** — tabel posisi kritis, komposisi kesiapan (<1 s/d >3 thn), bench, status.

## `/succession-planning/talent-pool`
- **KPI Strip** — 1.245 talenta HiPo, konversi 32,1% ke kandidat.
- **Komposisi Pool per Fungsi** — donut chart jumlah talenta HiPo tiap fungsi.
- **Pertumbuhan Pool per Fungsi** — line chart HiPo per fungsi tiap kuartal.
- **Konversi Pool ke Kandidat** — bar list porsi HiPo yang dinominasikan jadi kandidat.
- **Rincian Talent Pool per Fungsi** — tabel pool, kandidat suksesi, Ready Now, konversi, bench, catatan mutu.

## `/succession-planning/bench-strength`
- **KPI Strip** — bench 1,6, 54 posisi di bawah target 1,0.
- **Tren Bench Strength vs Target** — line chart bench grup + Manager/VP/Board Level dengan ambang 1,0.
- **Bench per Level Jabatan** — bar list kandidat layak per posisi kritis tiap level.
- **Bench per Entitas** — bar list kekuatan bench tiap entitas grup.
- **Rekap Bulanan Bench Strength** — tabel pergerakan bench, kandidat, posisi kritis, coverage, Ready Now, penggerak utama.

## `/succession-planning/kesiapan`
- **KPI Strip** — 400 kandidat, time-to-readiness 10 bulan.
- **Komposisi Kesiapan Kandidat** — donut chart kandidat per tahap kesiapan.
- **Laju Kesiapan (Jan–Jun 2026)** — line chart time-to-readiness dan porsi Ready Now.
- **Porsi Ready Now per Fungsi** — bar list kandidat siap <1 tahun terhadap kandidat fungsi.
- **Rincian Tahap Kesiapan** — tabel populasi, Δ kuartal, rata-rata readiness & skill match, intervensi utama.

## `/succession-planning/kandidat-siap`
- **KPI Strip** — 64 kandidat Ready Now, 42 posisi tercakup.
- **Kandidat Ready Now per Level** — bar list sebaran 64 kandidat menurut level posisi target.
- **Pertumbuhan Kandidat Ready Now** — line chart porsi Ready Now dan time-to-readiness.
- **Mutu Kandidat Teratas** — bar list readiness score 6 kandidat tertinggi (warna = flight risk).
- **Daftar Kandidat Siap Sekarang** — tabel kandidat: readiness, skill match, kinerja, potensi, flight risk, rencana penempatan.

## `/succession-planning/rencana-aksi`
- **KPI Strip** — rata-rata progres 75,4%, 2 inisiatif tersendat.
- **Progres Inisiatif terhadap Target** — progress list per inisiatif dengan warna kesehatan program.
- **Kurva Progres Bulanan** — line chart persentase penyelesaian 5 inisiatif.
- **Rincian Inisiatif Suksesi** — tabel target, realisasi, progres, uplift readiness, percepatan, pemilik, status, hambatan.

## `/succession-planning/rekomendasi`
- **KPI Strip** — 12 rekomendasi, estimasi dampak +8,2 ppts coverage.
- **Estimasi Dampak per Rekomendasi Kunci** — bar list jumlah posisi kritis yang terbantu bila dieksekusi penuh.
- **Coverage Aktual dan Jalur Menuju Target** — line chart coverage Jan–Jun 2026 dengan target 80%.
- **Daftar Rekomendasi Suksesi** — tabel pemicu, prioritas, estimasi dampak, pemilik, tenggat, status keputusan.

---

# 7. Modul People Risk Radar

## `/people-risk-radar` (dashboard utama)

- **People Risk Radar** (header) — judul halaman + filter Periode (Mei 2026 YTD) dan Level Organisasi (PTPN Group), penanda data per 31 Mei 2026.
- **KPI Strip (7 kartu)** — Overall People Risk Score, Risiko Tinggi, Risiko Menengah, Risiko Rendah, Karyawan Terdampak, Potensi Dampak Finansial, Risiko Kritis; tiap kartu memuat nilai, delta, dan sub-teks.
- **People Risk Radar** ("Peta Risiko Manusia") — radar/spider chart skor risiko per dimensi dengan legenda band High (70-100) / Medium (40-69) / Low (0-39).
- **Ringkasan Risiko** — tabel ringkas: Risiko, Level, Skor, Trend (Improving/Accelerating), Karyawan Terdampak.
- **Top 5 Risks Requiring Attention** — daftar peringkat lima risiko teratas yang butuh perhatian segera.
- **People Risk Trend & Forecast** — line chart tren skor risiko dengan forecast + confidence band dan legenda pita Low/Medium/High.
- **Risk Heatmap by Organization** ("Peta Risiko per Sub Holding / Regional") — tabel heatmap per organisasi: jumlah High/Medium/Low, skor, arah pergerakan 3 bulan.
- **Top Risk Drivers** ("Faktor Utama yang Mendorong Risiko") — daftar driver dengan bar Pengaruh dan indikator Trend.
- **Early Warning Indicators** — daftar sinyal peringatan dini beserta status ambangnya.
- **Control Effectiveness** — tabel Risiko × Inherent → Residual × Efektivitas kontrol (%) dengan tooltip kontrol yang berjalan.
- **Rekomendasi Tindakan & Risk Treatment** — daftar tindakan mitigasi dengan deskripsi dan ekspektasi penurunan skor risiko.
- **Risk Interdependency** — diagram/graf keterkaitan antar risiko (rantai amplifikasi) beserta tautan detail.
- **Risk Exposure by Business** — tabel eksposur per lini bisnis: Skor, Exposure (Rp), Share (%).
- **Scenario Stress Test** — kartu preset skenario terburuk dengan metrik before → after (Financial Exposure, Overall Risk Score, Dampak Produktivitas, Kebutuhan Replacement) + tombol "Buka Scenario Simulation".
- **BOD People Risk Decision Center** — tiga kartu keputusan "Decision Required": situasi, keputusan yang diminta, eksposur, due date (total eksposur Rp 103,9 M).
- **Panel Metodologi** — tiga catatan metodologi tentang cara skor dan agregasi dihitung.

## `/people-risk-radar/all-risks`

- **All Risks** (header) — judul + filter Periode & Level Organisasi.
- **KPI Strip (6 kartu)** — Total Risks, Critical, High, Medium, Low, Average Risk Score.
- **Risk Heatmap (Inherent Risk)** — matriks Likelihood × Impact berwarna (Low→Critical) dengan jumlah risiko per sel.
- **Risk by Category** — donut chart komposisi risiko per kategori dengan angka Total di tengah.
- **Risk Trend (6 Months)** — chart jumlah risiko per level (Critical/High/Medium/Low) enam bulan.
- **Top Risk Drivers** — bar list driver dominan lintas registri beserta jumlah risiko terkait.
- **Tabel Risk Register** — tabel risiko lengkap dengan pencarian, checkbox seleksi, dan paginasi.
- **Filter Risiko** — panel filter: Risk Level, Category, Risk Owner, Status, Trend, Last Review + tombol Clear All.
- **Saved Views** — pintasan: Critical Only, Risiko Memburuk, Milik Group CHRO.
- **Quick Insight** — kartu merah jumlah risiko Critical pada hasil filter + tombol "Lihat Critical Risks".

## `/people-risk-radar/all-drivers`

- **All Risk Drivers** (header) — judul + filter Periode & Level Organisasi.
- **KPI Strip (6 kartu)** — Total Driver, Driver Dominan (≥5%), Driver Memburuk, Driver Membaik, Kontribusi 5 Teratas, Efektivitas Kontrol.
- **Pareto Driver (Top 10)** — bar + garis kumulatif (Kontribusi % dan Kumulatif %) sepuluh driver teratas.
- **Kontribusi per Family** — donut chart kontribusi per family driver, jumlah Driver di tengah.
- **Pergeseran Driver (6 Bulan)** — line chart pergeseran kontribusi tiap family driver.
- **Kontrol vs Kontribusi** — scatter/bubble chart efektivitas kontrol vs kontribusi driver; ukuran bulatan = jumlah risiko terhubung.
- **Tabel Registri Driver** — tabel driver dengan pencarian, filter cepat Family/Owner/Status/Kendali, dan paginasi.
- **Filter Driver** — panel filter: Family Driver, Owner, Status Mitigasi, Tingkat Kendali, Arah Tren, Periode Review.
- **Saved Views** — pintasan: Driver Memburuk, Quick Win (Kendali Tinggi), Milik Group CHRO.
- **Aksi Prioritas** — daftar aksi prioritas per driver.
- **Quick Insight** — kartu merah jumlah driver memburuk pada hasil filter.

## `/people-risk-radar/prioritas-risiko`

- **Prioritas Risiko** (header) — judul + filter Periode & Level Organisasi.
- **KPI Strip (6 kartu)** — Risiko Prioritas, Perlu Eskalasi BOD, Potensi Dampak, Pekerja Terdampak, Progres Mitigasi, Aksi Lewat Tenggat.
- **Matriks Urgensi vs Dampak** — scatter/bubble chart waktu ke dampak (minggu) vs potensi dampak (Rp M); ukuran bulatan = pekerja terdampak.
- **Potensi Dampak (Rp M)** — bar list peringkat risiko menurut nilai potensi dampak rupiah.
- **Progres Mitigasi (Top 6)** — stacked bar progres Selesai vs Sisa (%) enam risiko teratas.
- **SLA & Eskalasi** — visual jalur eskalasi (Komite Risiko, Direktorat, dst.) dan aging SLA.
- **Tabel Antrean Prioritas** — tabel risiko prioritas dengan pencarian, skor, dampak, paginasi.
- **Filter Antrean** — panel filter: Jalur Eskalasi, Velocity Risiko, Status SLA, Owner, Periode Tenggat.
- **Saved Views** — pintasan: Agenda Rapat Direksi, Lewat Tenggat, Risiko Bergerak Cepat.
- **Keputusan Menunggu** — daftar keputusan pending: judul, detail, risiko terkait, forum & due date.
- **Quick Insight** — kartu merah jumlah risiko yang perlu keputusan BOD dan total eksposurnya.

## `/people-risk-radar/profil-risiko`

- **Profil Risiko People** (header) — sepuluh risiko register people, stat "10 risiko · 7 di atas risk appetite 50".
- **KPI Strip (6 kartu)** — Risiko Terdaftar, Risiko Tinggi, Skor Tertinggi, Skor Terendah, Risiko Memburuk, Di Atas Appetite 50.
- **Skor Seluruh Risiko** — bar list skor seluruh register, urut dari tertinggi, warna per band risiko.
- **Pergerakan Empat Risiko Utama** — line chart skor bulanan Jan–Jun 2026 dengan garis referensi appetite 50.
- **Karyawan Terdampak per Risiko** — bar list estimasi populasi terdampak per risiko.
- **Register Risiko People** — tabel detail: Risiko, Skor, Level, Velocity, Karyawan Terdampak, Kategori, Risk Owner, Treatment Berjalan + baris total.
- **Catatan Analitik** — panel catatan interpretatif.
- **Definisi & Sumber** — panel definisi istilah dan sumber data.

## `/people-risk-radar/tren-risiko`

- **Tren & Forecast Risiko** (header) — stat "Skor 68 · proyeksi Des 2026: 57 (band 51–63)".
- **KPI Strip (6 kartu)** — Skor Saat Ini, Puncak 12 Bulan, Rata-rata 12 Bulan, Proyeksi Des 2026, Rentang Keyakinan, Estimasi Masuk Appetite.
- **Overall Risk Score — Aktual & Forecast** — line chart aktual Jun 2025–Mei 2026 + forecast Jun–Des 2026 dengan confidence band dan garis appetite 50.
- **Kontribusi Risiko Utama** — line chart skor empat risiko penggerak Jan–Jun 2026.
- **Skenario Akhir 2026** — bar list posisi skor tiap skenario (eksekusi penuh, titik tengah, tertunda, risk appetite).
- **Titik Belok Skor Risiko** — tabel periode kunci: Skor, Δ, Confidence Band, Penggerak Utama, Status (Aktual/Forecast).
- **Catatan Analitik** — panel catatan interpretatif.
- **Definisi & Sumber** — panel definisi istilah dan sumber data.

## `/people-risk-radar/heatmap-organisasi`

- **Risk Heatmap per Organisasi** (header) — stat "Overall risk score 68 · seluruh entitas di atas appetite 50".
- **KPI Strip (6 kartu)** — Overall Risk Score, Organisasi di Atas Appetite, Instans Risiko Tinggi, Skor Tertinggi, Skor Terendah, Organisasi Memburuk.
- **Trajektori Skor Risiko Entitas** — line chart skor empat entitas (PTPN I/III/IV/VI) dengan garis appetite 50.
- **Komposisi Instans Risiko per Entitas** — stacked bar chart jumlah risiko High/Medium/Low per entitas.
- **Skor Risiko per Entitas** — bar list skor terkini plus catatan pergerakan tiga bulan.
- **Rincian Risiko per Organisasi** — tabel: High/Medium/Low, Total Risiko, Skor, Δ 3 Bulan, Driver Dominan, Karyawan Terdampak, Eksposur, Status + baris Total Grup.
- **Catatan Analitik** — panel catatan interpretatif.
- **Definisi & Sumber** — panel definisi istilah dan sumber data.

## `/people-risk-radar/eksposur-bisnis`

- **Eksposur People Risk per Lini Bisnis** (header) — stat "Rp 128,6 M · 53% terkonsentrasi di Palm Oil".
- **KPI Strip (6 kartu)** — Total Eksposur, Lini Tertinggi, Skor Risiko Tertinggi, Skor Risiko Terendah, Eksposur per Karyawan, Konsentrasi Dua Teratas.
- **Komposisi Eksposur** — donut chart porsi tiap lini bisnis, nilai tengah "Rp 128,6 M / Total eksposur".
- **Pertumbuhan Eksposur per Lini** — line chart eksposur bulanan (miliar rupiah) untuk Palm Oil, Rubber, Sugar, Tea.
- **Eksposur per Lini Bisnis** — bar list nilai eksposur (Rp M) diwarnai skor risiko lini.
- **Rincian Eksposur per Lini Bisnis** — tabel: Skor Risiko, Eksposur, Share, Karyawan Terdampak, Eksposur/Karyawan, Driver Dominan, Kontribusi EBITDA, Status + baris Total Grup.
- **Catatan Analitik** — panel catatan interpretatif.
- **Definisi & Sumber** — panel definisi istilah dan sumber data.

## `/people-risk-radar/interdependensi`

- **Interdependensi Risiko** (header) — stat "3 rantai amplifikasi · efek berantai +11 pts ke skor grup".
- **KPI Strip (6 kartu)** — Rantai Amplifikasi, Simpul dalam Rantai Utama, Tingkat Amplifikasi, Risiko Simpul Ganda, Efek Berantai ke Skor, Titik Putus Terbaik.
- **Risk Interdependency** — diagram rantai kausal antar risiko.
- **Frekuensi Simpul di Rantai** — bar list berapa banyak rantai yang melewati tiap risiko.
- **Kontribusi Rantai ke Skor Grup** — bar list kontribusi poin tiap rantai terhadap overall risk score.
- **Rantai Amplifikasi Risiko** — tabel: Jalur Kausal, Pemicu, Dampak Akhir, Amplifikasi, Kontribusi Skor, Titik Putus, Kontrol Pemutus.
- **Catatan Analitik** — panel catatan interpretatif.
- **Definisi & Sumber** — panel definisi istilah dan sumber data.

## `/people-risk-radar/efektivitas-kontrol`

- **Efektivitas Kontrol** (header) — stat "Efektivitas rata-rata 53% · target minimum 70%".
- **KPI Strip (6 kartu)** — Kontrol Terdaftar, Efektivitas Rata-rata, Kontrol Efektif (≥60%), Kontrol Lemah (<50%), Penurunan Inherent→Residual, Risiko Residual Tertinggi.
- **Efektivitas Kontrol per Risiko** — bar list persentase risiko inherent yang berhasil ditekan kontrol.
- **Tren Efektivitas Kontrol (4 Kuartal)** — line chart efektivitas (%) lima kontrol utama per kuartal dengan garis target 70%.
- **Penurunan Inherent → Residual** — bar list selisih poin skor inherent vs residual per risiko.
- **Rincian Kontrol per Risiko Utama** — tabel: Inherent, Residual, Penurunan, Kontrol Berjalan, Efektivitas, Uji Terakhir, Celah Kontrol, Status + baris total.
- **Catatan Analitik** — panel catatan interpretatif.
- **Definisi & Sumber** — panel definisi istilah dan sumber data.

## `/people-risk-radar/early-warning`

- **Early Warning Indicators** (header) — stat "6 sinyal merah · 47 talenta kritis berisiko".
- **KPI Strip (6 kartu)** — Sinyal Aktif, Sinyal Merah, Risiko Terpicu, Talenta Kritis Berisiko, Prediksi Attrition 12 Bln, Lead Time Rata-rata.
- **Komposisi Status Sinyal per Bulan** — stacked bar chart jumlah sinyal Merah/Kuning/Hijau tiap bulan.
- **Sinyal per Risiko Sasaran** — bar list jumlah sinyal aktif yang menunjuk risiko yang sama.
- **Lead Time Sinyal** — bar list jarak bulan dari sinyal melewati ambang hingga risiko terealisasi (6 sinyal teratas).
- **Daftar Early Warning Indicator** — tabel: Risiko Sasaran, Nilai Terkini, Ambang, Arah, Lead Time, Status, Tindakan Dipicu + baris ringkasan.
- **Catatan Analitik** — panel catatan interpretatif.
- **Definisi & Sumber** — panel definisi istilah dan sumber data.

## `/people-risk-radar/tindakan`

- **Rekomendasi Tindakan & Risk Treatment** (header) — stat "8 tindakan · estimasi skor grup 68 → 54".
- **KPI Strip (6 kartu)** — Tindakan Mitigasi, Sedang Berjalan, Menyasar Risiko Tinggi, Total Penurunan Skor, Estimasi Skor Grup, Anggaran Treatment.
- **Progres Tindakan Mitigasi** — progress list realisasi milestone tiap treatment (hijau on track, kuning at risk, merah belum bergerak).
- **Proyeksi Overall Risk Score** — line chart dua skenario (Realistis vs Eksekusi Penuh) dengan garis appetite 50.
- **Penurunan Skor per Tindakan** — bar list selisih poin skor sebelum vs sesudah tiap treatment.
- **Portofolio Risk Treatment** — tabel: Risiko Sasaran, Level, Owner, Before → After, Δ Skor, Progres, Target kuartal, Anggaran, Status, Ukuran Keberhasilan + baris total.
- **Catatan Analitik** — panel catatan interpretatif.
- **Definisi & Sumber** — panel definisi istilah dan sumber data.

---

# 8. Modul-Modul SDM Lainnya

## `/rekrutmen`

- **Header Rekrutmen** + **Rekrutmen KPI Strip** — requisition, time-to-fill, offer acceptance, cost per hire.
- **Workforce Plan → Recruitment** — rantai fulfillment kebutuhan 2026 → offer accepted → onboard, dengan progress bar Committed/Onboard.
- **Critical Role Hiring** — status pengisian posisi kritikal.
- **Requisition by Status** — donut/bar distribusi requisition per status.
- **Rekrutmen Pipeline** — funnel tahapan kandidat.
- **Bottleneck & SLA per Tahap** — analisis hambatan dan SLA tiap tahap funnel.
- **Tren Rekrutmen** — line chart tren hire bulanan.
- **Source Quality** — perbandingan kualitas sumber kandidat.
- **Rekrutmen by Unit Organisasi** — bar list hire per unit.
- **Time to Fill Trend** — tren waktu pengisian posisi.
- **Aktivitas Terbaru** — feed aktivitas rekrutmen terkini.
- **Requisition by Job Family** — distribusi requisition per job family.
- **Kualitas Hire (New Hire Performance)** — metrik performa karyawan baru.
- **Recruitment → Performance** — analisis kohort outcome hire terhadap kinerja.
- **Recruitment Intelligence & BOD Decision Center** — insight AI + item keputusan rekrutmen.

## `/absensi-kehadiran`

- **Header** + **Absensi KPI Strip** — attendance rate, absensi, lembur.
- **Ringkasan Kehadiran** — metrik presence rate dengan tooltip definisi.
- **Tren Tingkat Kehadiran (%)** — line chart tren kehadiran.
- **Kehadiran Berdasarkan Unit Organisasi** — bar list per unit.
- **Kehadiran Berdasarkan Lokasi** — kehadiran per lokasi kerja.
- **Pola Kehadiran per Hari** — pola menurut hari dalam minggu.
- **Keterlambatan (Terlambat Masuk)** — metrik & distribusi keterlambatan.
- **Status Kehadiran Hari Ini** — snapshot status hari berjalan.
- **Ekonomi Absensi & Lembur** — dampak biaya absensi dan lembur.
- **Early Warning Kehadiran** — sinyal peringatan dini unit berisiko.
- **Kapasitas Workforce Efektif** — perhitungan kapasitas tenaga kerja efektif.
- **Matriks Risiko Kehadiran per Unit** — matriks kehadiran × lembur untuk deteksi understaffed.
- **Insight & Rekomendasi AI** — narasi insight AI kehadiran.
- **Kalender Kehadiran** — kalender heatmap kehadiran.

## `/compensation-benefits`

- **Header** + **Comp KPI Strip**.
- **Komposisi Total Rewards** — donut komposisi total rewards.
- **Tren Biaya Kompensasi** — line/area tren biaya kompensasi.
- **Perbandingan Benchmark Gaji** — benchmark gaji internal vs pasar.
- **Analisis Kesenjangan Gaji (Pay Gap)** — analisis pay gap.
- **Distribusi Gaji (Posisi di Rentang Gaji)** — distribusi posisi gaji dalam range.
- **Realisasi Kenaikan Gaji** — realisasi merit increase.
- **Komposisi Employee Benefits** — breakdown benefit.
- **Compa-Ratio & Range Positioning** — panel compa-ratio & posisi dalam range.
- **Pay Equity → Remediation** — gap ekuitas gaji dan rencana remediasi.
- **Pay-for-Performance Effectiveness** — matriks efektivitas bayaran vs kinerja.
- **People Cost Efficiency** — metrik efisiensi biaya SDM.
- **Critical Talent Compensation Risk** — risiko kompensasi talenta kritikal.
- **Total Rewards Decision Center** — panel keputusan total rewards untuk BOD.
- **Ringkasan Kompensasi per Unit Organisasi** — tabel kompensasi per unit.
- **Rasio Kompensasi terhadap Kinerja** — rasio comp vs kinerja.
- **Insight & Rekomendasi AI** + strip catatan metodologi.

## `/learning-development`

- **Header** + **L&D KPI Strip**.
- **Distribusi Jam Pelatihan vs Demand Kompetensi** — perbandingan jam pelatihan dengan kebutuhan kompetensi.
- **Tren Jam Pelatihan Bulanan** — line chart jam pelatihan.
- **Learning Value Chain** — rantai nilai pembelajaran (input → output → outcome).
- **Skill Gap Closure — Learning-to-Skill Alignment** — progres penutupan gap skill.
- **Learning ROI & Efisiensi per Tier** — ROI pembelajaran per tier program.
- **Outcome per Modalitas Program** — perbandingan outcome per jenis program.
- **Top 5 Program Berdasarkan Business Impact** — peringkat program berdampak.
- **Personalized Learning — Populasi Skill Gap** — segmentasi populasi dengan gap skill.
- **Learning Effectiveness per Unit Organisasi** — efektivitas per unit.
- **Top 5 Instruktur — Effectiveness** — peringkat instruktur.
- **Insight & Rekomendasi AI** — narasi insight.
- **BOD Learning & Capability Decision Center** — panel keputusan kapabilitas untuk BOD.

## `/employee-engagement`

- **Header** + **Engagement KPI Strip**.
- **Engagement Score Overview** — gauge/ringkasan skor engagement.
- **Tren Engagement Score** — line chart tren skor.
- **eNPS Trend** — tren employee Net Promoter Score.
- **Engagement Score per Unit Organisasi** — bar list per unit.
- **Engagement Score berdasarkan Demografi** — breakdown demografi.
- **Faktor Engagement Tertinggi & Terendah** — faktor pendorong/penghambat.
- **Engagement Driver Model** — model driver engagement berbobot.
- **Manager Engagement Intelligence** — analisis engagement per manajer.
- **Engagement → Retention · Performa · Produktivitas** — keterkaitan engagement dengan outcome bisnis.
- **Engagement Risk Matrix** — matriks risiko engagement per unit.
- **Voice of Employee Intelligence** — analisis suara karyawan.
- **Engagement × Workforce Capacity** — diagnosis engagement terhadap kapasitas tenaga kerja.
- **Komentar Karyawan (Sentimen Analysis)** — analisis sentimen komentar survei.
- **Partisipasi & Data Confidence** — tingkat partisipasi survei & confidence data.
- **Insight & Rekomendasi AI** — narasi insight.
- **Engagement Action Engine** — daftar aksi perbaikan engagement + strip catatan metodologi.

## `/diversity-inclusion`

- **Header Diversity, Equity & Inclusion** + **DEI KPI Strip**.
- **Komposisi Karyawan berdasarkan Gender** — donut komposisi gender.
- **Tren Representasi Perempuan di Manajemen** — line tren representasi.
- **Piramida Populasi Gender × Generasi** — piramida populasi.
- **Gender Leadership Funnel** — funnel kebocoran perempuan di jenjang kepemimpinan.
- **Trajectory Target: Perempuan di Manajemen** — proyeksi pencapaian target.
- **Karyawan Disabilitas berdasarkan Jenis** — distribusi karyawan disabilitas.
- **Equity of Opportunity (Perempuan : Laki-laki)** — rasio kesempatan (promosi, pelatihan, dsb.).
- **Perbandingan Rata-rata Gaji (Gender Pay Gap)** — perbandingan gaji gender.
- **Female Talent Pipeline** — pipeline talenta perempuan.
- **DEI Risk Matrix per Unit** — matriks risiko DEI per unit.
- **DEI Action Tracker** — pelacak aksi DEI.
- **Insight & Rekomendasi AI** + strip catatan metodologi.

## `/industrial-relations`

- **Header** + **IR KPI Strip**.
- **IR Health — Dekomposisi Indeks** — dekomposisi 4 dimensi berbobot skor IR Health 82,6 plus KPI Disruption Risk (lokasi risiko naik, karyawan terpapar, eksposur pendapatan).
- **Sebaran Kasus Berdasarkan Kategori** — distribusi kasus per kategori.
- **Trend Kasus Industrial Relations** — line chart tren kasus.
- **IR Early Warning** — sinyal peringatan dini gangguan hubungan industrial.
- **Case Severity (24 Kasus Aktif)** — bar tingkat keparahan kasus.
- **Case Aging & Efektivitas** — usia kasus dan efektivitas penyelesaian.
- **Repeat Issue & Root Cause** — isu berulang dan akar masalah.
- **Penyelesaian Kasus** — statistik resolusi kasus.
- **Kepatuhan Hubungan Industrial** — status kepatuhan regulasi ketenagakerjaan.
- **Union Relations Health** — kesehatan hubungan dengan serikat pekerja.
- **IR Risk Heatmap per Region** — heatmap risiko IR per regional.
- **Top Isu Industrial Relations** — daftar isu teratas.
- **AI Industrial Relations Intelligence** — insight AI IR.
- **Business Impact Eksposur IR** — dampak bisnis dari eksposur IR.
- **IR Cost & Legal Exposure** — eksposur biaya dan legal.
- **Cross-Module Intelligence** — sinyal lintas modul terkait IR + strip metodologi 3 kolom.

## `/people-productivity`

- **Header** + **Produktivitas KPI Strip**.
- **Productivity Intelligence (AI)** — panel sintesis: headline delta, 4 tile driver/risiko, rekomendasi.
- **Produktivitas Utama (Trend)** — line chart tren produktivitas.
- **Produktivitas per Unit Kerja** — bar list produktivitas per unit.
- **Produktivitas Berdasarkan Jenis Usaha** — perbandingan per jenis usaha/komoditas.
- **Productivity Opportunity Map** — peta peluang produktivitas vs biaya.
- **Breakdown Produktivitas (Drill Down)** — dekomposisi drill-down produktivitas.
- **Drivers of Productivity (YTD)** — faktor pendorong produktivitas.
- **Insight & Rekomendasi** — narasi insight.
- **Benchmarking Eksternal** — perbandingan benchmark industri + strip definisi.

## `/people-math-hpi`

- **Header** + **PM KPI Strip** + strip cakupan data (Data as-of, Confidence).
- **People Performance Intelligence (AI)** — sintesis sinyal utama + satu rekomendasi prioritas.
- **People Math Dimension Score** — radar chart skor dimensi People Math.
- **PTPN HPI-BEM Score Overview** — ringkasan skor HPI-BEM grup.
- **Performance Opportunity Gap (Top Level)** — gap peluang kinerja tingkat atas.
- **People Math Profile Cluster** — pengelompokan profil karyawan.
- **HPI Root Cause Analysis** — analisis akar masalah gap kinerja.
- **Intervention Portfolio** — portofolio intervensi yang dijalankan.
- **Intervention Outcome Tracking (Closed Loop)** — pelacakan hasil intervensi.
- **Cluster Intelligence — Role Fit & Productivity Linkage** — keterkaitan kecocokan peran dan produktivitas.
- **Employee HPI Profile (Contoh)** — contoh profil HPI individu + catatan metodologi.

## `/workforce-planning`

- **Header** + **WP KPI Strip**.
- **Proyeksi Headcount 2026–2028** — composed chart proyeksi headcount.
- **Kebutuhan Talenta Berdasarkan Jenjang** — kebutuhan per jenjang jabatan.
- **Kebutuhan Talenta Berdasarkan Fungsi Utama** — kebutuhan per fungsi.
- **Business Demand Drivers** — pendorong permintaan tenaga kerja dari sisi bisnis.
- **Workforce Capacity** — kapasitas tenaga kerja saat ini.
- **Workforce Rebalancing** — rencana rebalancing antar unit.
- **Gap Talenta Kritis (Top 10 Skill)** — 10 skill dengan gap terbesar.
- **Sumber Pemenuhan Kebutuhan Talenta (2026–2028)** — komposisi build/buy/borrow/bot.
- **Workforce Supply & Demand Balance** — neraca pasokan vs permintaan.
- **Strategi Penutupan Gap — 4B** — strategi 4B penutupan gap skill.
- **Workforce Gap Waterfall 2026–2028** — waterfall chart perubahan gap.
- **Scenario Planning Overview** — ringkasan skenario perencanaan.
- **Rekomendasi Strategis** — daftar rekomendasi.
- **Scenario Decision Matrix** — matriks keputusan antar skenario.
- **Workforce Continuity Risk** — overlay risiko kontinuitas tenaga kerja.
- **Workforce Plan Control Tower — YTD 2026** — panel kontrol eksekusi rencana YTD + catatan metodologi & kutipan penutup.

## `/organisasi-jabatan`

- **Header** + **Ringkasan Organisasi** — strip metrik ringkas organisasi.
- **Struktur Organisasi** — visualisasi/tree struktur organisasi.
- **Distribusi Karyawan Berdasarkan Unit** — distribusi headcount per unit.
- **Analisis Jabatan** — metrik analisis jabatan.
- **Jabatan Kosong Kritis** — daftar posisi kritis yang kosong.
- **Span of Control** — metrik rentang kendali.
- **Tingkat Organisasi** — jumlah dan sebaran level organisasi.
- **Status Pengisian Jabatan** — status terisi/kosong jabatan.
- **Perubahan Organisasi (YOY)** — perubahan struktur tahun-ke-tahun.
- **Kesehatan Organisasi** — org health score.
- **Layer Manajemen & Densitas** — analisis layer dan densitas manajerial.
- **Efisiensi Biaya Organisasi** — metrik efisiensi biaya struktur.
- **Mapping Jabatan Kritis & Suksesi** — tabel pemetaan jabatan kritis dan kesiapan suksesor.
- **Insight AI** — narasi insight AI organisasi.

## `/ai-hr-assistant`

- **Header** — "Asisten cerdas Anda untuk semua kebutuhan Human Capital".
- **Panel Percakapan AI HR Assistant** — chat utama dengan AI berbasis data HC.
- **HC Intelligence Feed** — ringkasan insight HC terkini di rail kanan.
- **Akses Cepat** — daftar pintasan pertanyaan/modul.
- **Riwayat & Decision Memory** — riwayat percakapan dan memori keputusan.
- **Feature Strip** — 4 kartu fitur AI (judul + deskripsi).

## `/risk-compliance` (Risk & Compliance SDM)

- **Header** + **RC KPI Strip**.
- **Compliance Radar** — radar chart skor area kepatuhan.
- **Ringkasan Kepatuhan** — status kepatuhan per area.
- **Top 5 Compliance Issues** — isu kepatuhan teratas.
- **Compliance Trend (12 Bulan Terakhir)** — line chart tren kepatuhan.
- **Compliance Exposure Map** — heatmap eksposur kepatuhan per unit organisasi.
- **Breakdown Kasus Pelanggaran** — distribusi kasus pelanggaran.
- **Rekomendasi Tindakan Kepatuhan** — daftar rekomendasi tindakan.
- **Control Effectiveness** — efektivitas kontrol.
- **Audit Finding Aging** — usia temuan audit.
- **Speak-Up Intelligence** — analisis laporan whistleblowing/speak-up.
- **Regulatory Change Radar** — radar perubahan regulasi.
- **BOD Compliance Decision Center** — item keputusan kepatuhan untuk BOD + strip catatan.

---

# 9. Modul Keuangan

## `/keuangan` (Executive Overview)

- **KPI Strip Keuangan (6 kartu)** — Pendapatan YTD, EBITDA YTD, Laba Bersih YTD, Posisi Kas, Net Debt/EBITDA, Realisasi Capex.
- **Finance Intelligence (AI)** — panel sintesis: hitungan Critical Signals/Opportunities/Decisions Pending + 4 kartu sinyal + Executive Recommendation; sinyal EBITDA memakai basis **RKAP YTD phased** (+Rp 0,22 T, selaras KPI strip homepage) dengan prorata kalender hanya sebagai konteks — dua basis tidak boleh memakai label "vs RKAP YTD" yang sama.
- **Revenue & EBITDA Trend** — composed chart (bar Pendapatan + line EBITDA) 12 bulan terakhir dalam Rp T.
- **Segment Contribution** — bar chart kontribusi pendapatan/EBITDA per segmen (subholding).
- **Finance Risk Radar** — radar chart peta risiko keuangan vs ambang toleransi.
- **Cash Position** — area chart saldo kas mingguan 12 minggu terakhir vs garis minimum cash.
- **Alerts & Notifications** — grid 4 kartu peringatan keuangan.
- **Strategic Alignment** (rail kanan) — progress bar realisasi YTD vs target RKAP 2026.
- **BOD Decision Center** (rail kanan) — daftar keputusan pending bertab.
- **Insight & Rekomendasi (Decision-grade)** — 3 insight (Kualitas Laba, Likuiditas & Cash Pooling, Sensitivitas Harga CPO).

## `/keuangan/anggaran-realisasi`
- **KPI Strip (5 kartu)** — Achievement Pendapatan, EBITDA, Laba Bersih, Penyerapan Opex, Penyerapan Capex.
- **Budget Variance Waterfall** — bridge EBITDA RKAP prorata → realisasi YTD (Rp T), memecah efek volume/harga/biaya/mix.
- **Achievement RKAP per Subholding** — bar chart achievement YTD vs RKAP FY dengan garis prorata 41,7%.
- **Monthly Budget Track** — composed chart pendapatan bulanan plan vs aktual + kurva kumulatif 2026.
- **Variance Heatmap** — matriks deviasi achievement vs prorata (Subholding × Lini).
- **Proyeksi Full-Year 2026** — forecast FY (Pendapatan, EBITDA, Laba Bersih, Capex) vs RKAP berbasis run-rate + phasing H2.
- **Insight & Rekomendasi (Decision-grade)**.

## `/keuangan/arus-kas`
- **KPI Strip (6 kartu)** — Posisi Kas, Arus Kas Operasi (OCF), Free Cash Flow, Cash Conversion Cycle, DSO, DPO.
- **Cashflow Waterfall (YTD)** — pergerakan saldo kas Des'25 → Mei'26 (operasi, investasi, FCF, pendanaan).
- **Liquidity Runway 13 Minggu** — area chart proyeksi saldo kas mingguan vs garis minimum cash.
- **Working Capital Trend** — line chart DSO, DPO, DIO 12 bulan + ringkasan CCC.
- **Receivables Aging** — bucket umur piutang usaha (Rp 3,4 T) dengan porsi >90 hari.
- **Payables Maturity** — bar chart utang usaha & akrual per bucket jatuh tempo.
- **Insight & Rekomendasi (Decision-grade)**.

## `/keuangan/laba-rugi`
- **KPI Strip (6 kartu)** — Pendapatan, Laba Kotor, EBITDA, EBIT, Laba Bersih, Margin Bersih.
- **P&L Waterfall (YTD)** — alur Pendapatan → HPP → Laba Kotor → Opex → EBIT → bunga/pajak → Laba Bersih (Rp T).
- **EBITDA Bridge vs RKAP** — dekomposisi surplus EBITDA +Rp 0,52 T vs RKAP **prorata kalender** (6,30 → 6,82; basis berbeda dari RKAP YTD phased 6,60 yang dipakai KPI strip — keduanya sah karena label basisnya eksplisit).
- **Margin Trend 24 Bulan** — line chart GPM, EBITDA margin, NPM bulanan.
- **P&L per Segmen** — tabel mini P&L 3 subholding (Rp T, YTD).
- **Revenue by Commodity** — breakdown porsi pendapatan YTD per komoditas.
- **Insight & Rekomendasi (Decision-grade)**.

## `/keuangan/neraca-leverage`
- **KPI Strip (6 kartu)** — Total Aset, Ekuitas, Utang Berbunga, Net Debt, DER, Net Debt/EBITDA.
- **Balance Sheet Composition** — stacked bar komposisi aset vs liabilitas & ekuitas.
- **Debt Maturity Profile** — bar chart pokok utang jatuh tempo per tahun (total Rp 28,4 T).
- **Leverage Trend** — line chart tren DER & Net Debt/EBITDA.
- **Covenant Monitor** — tabel 5 covenant kredit utama + status kepatuhan.
- **Debt by Lender & Currency** — breakdown utang berbunga per kreditur dan mata uang.
- **Insight & Rekomendasi (Decision-grade)**.

## `/keuangan/profitabilitas-segmen`
- **KPI Strip (6 kartu)** — EBITDA Grup, PalmCo, SGN, PTPN I, Kontribusi PalmCo, Spread ROIC.
- **Segment P&L Matrix** — tabel matriks P&L lengkap per segmen/subholding.
- **Regional Profitability (PalmCo)** — bar chart profitabilitas per regional PalmCo.
- **Profit per Hectare Map** — scatter chart laba per hektar antar unit/regional.
- **SGN Mill Profitability** — bar chart profitabilitas per pabrik gula SGN.
- **Catatan Antar-Segmen** — panel eliminasi, alokasi holding & pendanaan antar-perusahaan.
- **Insight & Rekomendasi (Decision-grade)**.

## `/keuangan/risiko-keuangan`
- **KPI Strip (5 kartu)** — Skor Risiko Keuangan, Eksposur FX Neto, Hedging Ratio, Sensitivitas Harga CPO, VaR Komoditas.
- **Financial Risk Radar** — radar tingkat risiko vs ambang toleransi.
- **Commodity Price Exposure** — line chart harga CPO & gula 24 bulan dengan garis asumsi RKAP.
- **FX Sensitivity** — bar chart dampak pergerakan IDR ±5% terhadap laba (eksposur neto USD 420 jt).
- **Interest Rate Exposure** — breakdown utang tetap vs mengambang + dampak perubahan suku bunga.
- **Top Financial Risks** — register risiko keuangan teratas dengan tingkat & pemilik risiko.
- **BOD Decision Center** — keputusan mitigasi risiko menunggu BOD.
- **Insight & Rekomendasi (Decision-grade)**.

## `/keuangan/simulasi-keuangan`
- **KPI Strip (3 kartu)** — EBITDA FY (Base), Laba Bersih FY (Base), Net Debt/EBITDA FY.
- **Panel Asumsi** — slider interaktif (harga CPO, kurs USD/IDR, volume CPO FY, indeks harga pupuk).
- **Scenario Comparison** — bar chart EBITDA & laba bersih FY 2026 per skenario + penanda outlook rekomendasi.
- **Sensitivity Tornado** — tornado chart dampak 6 driver terhadap EBITDA FY.
- **Stress Test Case** — kartu hasil stress test (EBITDA FY, laba bersih, Net Debt/EBITDA, posisi kas terendah).
- **EBITDA Outcome Range** — fan chart kumulatif 2026: realisasi Jan–Mei + rentang p10/p50/p90 Jun–Des.
- **BOD Decision Center** — keputusan berbasis skenario menunggu BOD.
- **Insight & Rekomendasi (Decision-grade)** + **Catatan Metodologi**.

## `/keuangan/struktur-biaya`
- **KPI Strip (4 kartu)** — HPP YTD, HPP/kg CPO, HPP/kg Gula, Cost Inflation.
- **Cost Structure Breakdown** — komposisi HPP YTD Rp 15,8 T per komponen biaya.
- **Unit Cost Trend 24 Bulan** — line chart HPP vs harga jual (Rp/kg), HPP gula hanya musim giling.
- **HPP per Regional** — bar chart HPP/kg CPO per regional vs garis target.
- **Eksposur Pupuk & BBM** — harga aktual YTD vs asumsi RKAP dan dampaknya ke biaya FY.
- **Cost Saving Programs** — program efisiensi dengan realisasi penghematan YTD vs target FY.
- **Insight & Rekomendasi (Decision-grade)**.

## `/keuangan/capex-pendanaan`
- **KPI Strip (4 kartu)** — RKAP Capex FY, Realisasi YTD, Komitmen Kontrak, Capex/EBITDA.
- **Capex per Kategori** — bar chart plafon RKAP FY vs realisasi YTD per kategori.
- **Capex per Subholding** — bar chart realisasi YTD & sisa plafon per subholding.
- **Funding Mix** — komposisi sumber pendanaan capex RKAP FY 2026.
- **S-Curve Capex 2026** — line chart kumulatif rencana vs realisasi dengan gap Mei Rp 0,92 T.
- **Top Capex Variance** — proyek dengan deviasi progres terbesar vs plafon RKAP.
- **Insight & Rekomendasi (Decision-grade)**.

---

# 10. Modul Produksi & Operasi

## `/produksi-operasi` (Executive Overview)

- **KPI Strip Produksi (6 kartu)** — TBS Diolah, Produksi CPO, OER (Rendemen CPO), Produksi Gula, Produksi Karet, HPP CPO.
- **Executive Intelligence (AI)** — Critical Signals/Opportunities/Decisions Pending + 3 kartu sinyal + Executive Recommendation.
- **Production Risk Radar** — matriks kemungkinan × dampak 6 risiko utama produksi.
- **Komoditas Scoreboard** — realisasi vs target YTD per komoditas dengan bar capaian.
- **Tren Produksi Bulanan** — composed chart TBS diolah & CPO (jt ton), 2026 Jan–Mei vs realisasi 2025.
- **Kinerja Giling Gula** — composed chart tebu digiling (bar, jt ton) & produksi gula (line, rb ton) Mei–Nov + baris statistik (Gula YTD, Capaian, Rendemen, Target FY); scope SugarCo.
- **BOD Decision Center** (rail kanan) — keputusan produksi menunggu persetujuan.
- **Regional Heat Strip** (rail kanan) — heat capaian TBS vs target YTD 7 regional.
- **Giling Gula — Kesiapan 17 PG** (rail kanan) — 3 tile ringkas (jam berhenti, recovery, PG merah) + 5 PG jam berhenti tertinggi; scope SugarCo.
- **Insight & Rekomendasi (Decision-grade)** — 4 insight produksi.

## `/produksi-operasi/produksi-komoditas`
- **KPI Strip Komoditas** — kartu per komoditas (TBS, CPO, Gula, Karet, Teh): capaian vs target YTD.
- **Sawit Production Waterfall** — alur TBS inti → plasma → diolah → CPO & palm kernel (jt ton, YTD).
- **Kurva Musim Giling Gula** — composed chart tebu digiling & rendemen Mei–Nov (Mei realisasi, sisanya proyeksi).
- **Target vs Realisasi YTD** — matriks capaian 5 komoditas terhadap target YTD Mei 2026.
- **Seasonality CPO 3 Tahun** — line chart produksi CPO bulanan (puncak Agu–Okt).
- **Karet & Teh Bulanan** — line chart produksi karet dan teh Jan–Mei 2026.
- **Insight & Rekomendasi (Decision-grade)**.

Semua tombol "Lihat Detail" kartu di halaman ini menaut ke anchor halaman detail di bawah.

## `/produksi-operasi/produksi-komoditas/detail` (mockup)
- **Header detail** — tautan kembali, judul, penanda "Mockup — angka ilustratif" + Data Trust Strip.
- **Target vs Realisasi YTD** (#target) — tabel 5 komoditas: target FY/YTD, realisasi, capaian %, status pill, catatan.
- **Sawit Production Waterfall** (#sawit) — tabel langkah alur volume: TBS inti + plasma − restan → TBS diolah → CPO & PK, tipe Masukan/Keluaran/Total.
- **Kurva Musim Giling Gula** (#gula) — tabel per bulan giling Mei–Nov: tebu, rendemen, gula, status Realisasi/Proyeksi + baris Total FY.
- **Seasonality CPO 3 Tahun** (#seasonality) — tabel 12 bulan CPO 2024–2026 + kolom YoY (pill).
- **Karet & Teh Bulanan** (#karet-teh) — tabel produksi karet & teh Jan–Mei + baris Total YTD.
- **Catatan Analitik** + **Definisi & Sumber** — dua panel catatan penutup.

## `/produksi-operasi/produktivitas-kebun`
- **KPI Strip (6 kartu)** — Yield TBS Grup, Gap vs Benchmark, Luas Tertanam Inti, Areal Tua/Renta, Replanting YTD, Regional Terbaik.
- **Yield TBS per Regional** — bar chart t/ha annualized, garis rata-rata grup 21,9 & benchmark swasta 24,0.
- **Quadrant Yield × Umur** — scatter yield vs umur rata-rata tanaman 7 regional.
- **Protas Trend 5 Tahun** — line chart yield TBS grup 2022–2026.
- **Top & Bottom 5 Kebun** — peringkat kebun terbaik vs tertinggal + faktor dominan.
- **Gap Analysis vs Benchmark** — dekomposisi gap yield 2,1 t/ha per penyebab.
- **Insight & Rekomendasi (Decision-grade)**.

## `/produksi-operasi/kinerja-pabrik`
- **KPI Strip (6 kartu)** — Pabrik Aktif, Utilisasi PKS, Losses CPO, Downtime Tak Terencana, Throughput PKS, Recovery PG.
- **Utilisasi per Jenis Pabrik** — bar chart utilisasi vs target RKAP (36 PKS, 17 PG, 9 karet, 5 teh).
- **Downtime Pareto** — Pareto jam downtime tak terencana YTD per penyebab + kurva kumulatif.
- **Losses Breakdown CPO** — losses aktual vs norma per komponen (% terhadap TBS).
- **PKS League Table** — Top 5 & Bottom 5 PKS berdasarkan OER dan utilisasi.
- **Kesiapan 17 Pabrik Gula** — jam berhenti giling (target ≤10%) & overall recovery (target ≥80%) per PG.
- **Capex Revitalisasi** — progress 6 pabrik prioritas, total capex Rp 2,2 T.
- **PG League Table** — Top 5 & Bottom 5 PG berdasarkan overall recovery & jam berhenti giling (spread 9,8 ppt); scope SugarCo.
- **Downtime Pareto PG** — Pareto jam berhenti giling per penyebab (bulan pertama giling, total 1.870 jam) + kurva kumulatif; scope SugarCo.
- **Losses Breakdown Gula** — kehilangan gula % pol tebu aktual vs norma per komponen (tetes, ampas, blotong, tak terhitung; total 2,24% vs 2,09%); scope SugarCo.
- **Insight & Rekomendasi (Decision-grade)**.

Semua tombol "Lihat Detail" kartu di halaman ini menaut ke anchor halaman detail di bawah.

## `/produksi-operasi/kinerja-pabrik/detail` (mockup)
- **Header detail** — tautan kembali, judul, penanda "Mockup — angka ilustratif" + Data Trust Strip.
- **Utilisasi per Jenis Pabrik** (#utilisasi) — tabel 4 jenis pabrik: unit, kapasitas terpasang, utilisasi vs target, gap (pill), catatan.
- **Register PKS — Top & Bottom 5** (#pks) — tabel peringkat OER & utilisasi 10 dari 36 PKS dengan pill status.
- **Register 17 Pabrik Gula** (#pg) — tabel lengkap 17 PG: jam berhenti, overall recovery, status Merah/Waspada/Sehat, urut jam berhenti.
- **Rincian Downtime** (#downtime) — dua tabel Pareto berdampingan: konsolidasi PKS+PG (6.400 jam YTD) & giling 17 PG (1.870 jam).
- **Rincian Losses** (#losses) — dua tabel berdampingan: losses CPO (% TBS) & kehilangan gula (% pol tebu), aktual vs norma + status.
- **Program Capex Revitalisasi** (#capex) — tabel 6 pabrik prioritas: lingkup, capex, progress bar, target, status.
- **Catatan Analitik** + **Definisi & Sumber** — dua panel catatan penutup.

## `/produksi-operasi/panen-logistik`
- **KPI Strip (4 kartu)** — Restan TBS, FFA TBS Masuk, Brondolan Terkutip, Rotasi Panen.
- **Restan TBS per Regional** — line chart % TBS tidak terangkut <24 jam vs norma.
- **FFA vs OER per PKS** — scatter kadar FFA TBS masuk × rendemen CPO untuk 12 PKS sampel.
- **Armada & Logistik TBS** — utilisasi armada angkut dan biaya per ton.
- **Rotasi Panen per Regional** — bar chart interval panen aktual vs standar hari.
- **Insight & Rekomendasi (Decision-grade)**.

## `/produksi-operasi/agronomi-replanting`
- **KPI Strip (4 kartu)** — Replanting YTD, Umur Rata-rata Tanaman, Realisasi Pupuk S1 2026, Anomali Curah Hujan.
- **Profil Umur Tanaman Sawit** — distribusi luas 508,7 rb ha inti + kurva yield per kelompok umur.
- **Replanting Roadmap 2026–2030** — bar chart target tanam ulang per regional (total 88.000 ha).
- **Pemupukan: Realisasi vs Rencana** — area chart aplikasi NPK per semester.
- **Curah Hujan & Sinyal El Nino** — bar curah hujan aktual vs normal 12 bulan + line anomali/indeks ENSO.
- **Simulasi Dampak Iklim H2 2026** — skenario dampak iklim terhadap produksi & EBITDA (sumber BMKG/NOAA).
- **Insight & Rekomendasi (Decision-grade)**.

## `/produksi-operasi/plasma-kemitraan`
- **KPI Strip (4 kartu)** — Kebun Plasma Binaan, Luas Plasma Binaan, TBS Plasma YTD, PSR Target 2026.
- **Komposisi TBS: Inti vs Plasma** — area chart TBS diolah per sumber (plasma 13,3% dari total).
- **Yield Gap Plasma vs Inti** — bar chart yield per regional (plasma 16,4 vs inti 21,9 t/ha).
- **Progress PSR 2026** — progress Peremajaan Sawit Rakyat (realisasi vs target ha).
- **Risiko Kemitraan** — tabel 5 risiko utama kemitraan plasma + mitigasi.
- **Insight & Rekomendasi (Decision-grade)**.

## `/produksi-operasi/biaya-produksi`
- **KPI Strip (6 kartu)** — HPP CPO, Deviasi vs Target, Margin Kas CPO, HPP 12 Bulan, Gap vs Peer Terbaik, Efisiensi YTD.
- **HPP Waterfall CPO** — komponen HPP (Rp/kg) vs alokasi target RKAP; komponen di atas target ditandai merah.
- **HPP vs Harga Jual (Jaws)** — composed chart HPP vs harga jual 12 bulan dengan area margin kas.
- **HPP Benchmark** — bar chart HPP CPO PTPN vs industri vs peer terbaik.
- **HPP per Regional** — HPP CPO 7 regional dengan penanda outlier deviasi >5%.
- **Inisiatif Efisiensi Biaya** — kontribusi penghematan YTD per inisiatif (total Rp 412 M).
- **Insight & Rekomendasi (Decision-grade)**.

## `/produksi-operasi/operational-excellence`
- **KPI Strip (4 kartu)** — Inisiatif Aktif, Dampak EBITDA, Inisiatif On-Track, Maturity Rata-rata.
- **Portofolio Inisiatif OPEX** — tabel 12 inisiatif terbesar (dampak Rp 680 M YTD) dengan status RAG.
- **Impact Waterfall EBITDA** — dampak YTD per workstream: efisiensi biaya + uplift volume.
- **Maturity OPEX per Regional** — radar skor maturitas 1–5 vs target 2026.
- **Milestone Kuartalan 2026** — timeline tonggak utama program OPEX.
- **Insight & Rekomendasi (Decision-grade)**.

---

# 11. Modul Pemasaran & Penjualan

Semua halaman diawali Data Trust Strip dan diakhiri card Insight & Rekomendasi (Decision-grade).

## `/pemasaran-penjualan` (Executive Overview)
- **KPI Strip (4 kartu)** — Nilai Penjualan, Harga CPO (ASP YTD), Volume CPO Terjual, Porsi Ekspor.
- **Executive Intelligence (AI)** — sintesis kondisi komersial + poin kunci.
- **Price Ticker Board** — papan ticker harga komoditas berjalan (spot, delta, rata-rata YTD).
- **Revenue by Komoditas** — kontribusi pendapatan per komoditas.
- **Market Risk Radar** — risiko pasar berlevel dengan mitigasi.
- **Sales vs Target RKAP** — gauge capaian penjualan terhadap target RKAP.
- **BOD Decision Center** — keputusan menunggu aksi Direksi.
- **Insight & Rekomendasi (Decision-grade)**.

## `/pemasaran-penjualan/penjualan-komoditas`
- **KPI Strip** — Nilai Penjualan, Capaian RKAP YTD, Volume CPO Terjual, ASP CPO YTD, Margin Bruto Blended.
- **Tren Penjualan Bulanan** — combo chart nilai & volume 2026 vs 2025.
- **Price-Volume Bridge YoY** — waterfall dekomposisi pertumbuhan efek harga vs volume.
- **Penjualan per Komoditas** — tabel realisasi volume/nilai per komoditas.
- **ASP vs Benchmark KPBN** — bar perbandingan ASP internal vs harga KPBN plus premium.
- **Penjualan per Subholding** — share penjualan tiap subholding + komoditas utama.

## `/pemasaran-penjualan/harga-pasar`
- **KPI Strip** — CPO CIF Rotterdam, CPO KPBN (Spot), Gula (Lelang), Karet SIR-20, Kurs USD/IDR.
- **Harga CPO 24 Bulan** — line chart Rotterdam, KPBN, HPP CPO.
- **Price Drivers CPO** — faktor pendorong harga dengan arah dampak.
- **Harga Gula & Karet 12 Bulan** — dua panel line chart berdampingan.
- **Outlook Konsensus Q3-Q4 2026** — tabel proyeksi harga beberapa lembaga.
- **Sensitivitas Kurs & Harga** — dampak perubahan kurs & harga terhadap pendapatan.

## `/pemasaran-penjualan/margin-komoditas`
- **KPI Strip** — Margin Blended, CPO, Gula, Karet, Teh, Produk Hilir.
- **Margin Waterfall per Komoditas** — struktur ASP − HPP hingga margin.
- **Tren Margin Bruto Bulanan** — line chart margin bruto.
- **Margin Matrix: Volume × Margin** — scatter/bubble posisi komoditas.
- **Margin by Subholding** — bar margin tiap subholding.
- **Diagnosis Komoditas Merugi & Margin Tipis** — diagnosis komoditas rugi + opsi aksi.

## `/pemasaran-penjualan/ekspor-buyer`
- **KPI Strip** — Porsi Ekspor, Konsentrasi Top-5 Buyer, Negara Tujuan Ekspor, Kepatuhan DMO.
- **Tren Ekspor vs Domestik** — komposisi pasar ekspor vs domestik.
- **Konsentrasi Buyer (HHI)** — gauge indeks HHI konsentrasi buyer.
- **Top 10 Buyer** — tabel 10 buyer terbesar dengan nilai dan tren.
- **Destinasi Ekspor** — breakdown negara/kawasan tujuan ekspor.
- **Regulasi Pasar & Kepatuhan** — daftar regulasi (DMO, EUDR, dll) dengan status & dampak.

## `/pemasaran-penjualan/kontrak-komitmen`
- **KPI Strip** — Kontrak Aktif, Committed H2 2026, metrik komitmen lain.
- **Forward Coverage H2 2026** — bar chart Committed vs Uncommitted terhadap proyeksi produksi.
- **Maturity Kontrak** — ladder jatuh tempo kontrak per periode.
- **Tender KPBN Terakhir** — kartu hasil tender KPBN terkini.
- **Counterparty Exposure** — eksposur nilai per counterparty + catatan risiko.
- **Kebijakan Forward & Hedging** — parameter kebijakan hedging dan instruksi kunci.

## `/pemasaran-penjualan/stok-inventori`
- **KPI Strip** — Stok CPO, Stok Gula, Stok Karet, Nilai Total Inventori.
- **Tren Stok CPO vs Band Kebijakan** — line chart stok terhadap batas atas/bawah kebijakan.
- **Stok CPO by Lokasi** — stok per regional.
- **Aging Inventory Gula & Karet** — stacked bar bucket umur inventori.
- **Stok vs Harga: Tahan / Lepas** — rekomendasi keputusan tahan atau lepas stok.
- **Dampak Modal Kerja** — dampak inventori terhadap working capital.

## `/pemasaran-penjualan/hilirisasi`
- **KPI Strip** — Porsi Pendapatan Hilir, Minyak Goreng Nusakita, Alokasi FAME B40, Utilisasi Refinery.
- **Porsi Pendapatan Hilir vs Jalur Target** — realisasi porsi hilir terhadap target trajectory.
- **Margin Uplift Rantai Nilai** — kenaikan margin tiap tahap rantai nilai hulu→hilir.
- **Produk Turunan (YTD)** — tabel volume/nilai produk turunan.
- **Mandat Biodiesel B40** — status pemenuhan alokasi mandat B40.
- **Pipeline Refinery & Hilirisasi** — daftar/timeline proyek refinery.

## `/pemasaran-penjualan/market-intelligence`
- **KPI Strip** — Sinyal Aktif, Sentimen CPO, Stok Global Sawit, Produksi Malaysia.
- **Signal Feed** — feed sinyal pasar terbaru (sumber, waktu, urgensi).
- **MI Synthesis (AI)** — sintesis AI atas kumpulan sinyal pasar.
- **Competitor Benchmark** — tabel benchmark metrik vs kompetitor.
- **Global Supply-Demand Sawit** — neraca pasokan-permintaan sawit global.
- **Policy Watch** — kebijakan/regulasi yang dipantau beserta status.

---

# 12. Modul Pengadaan

## `/pengadaan` (Executive Overview)
- **KPI Strip (4 kartu)** — Total Belanja YTD, Penghematan Pengadaan, TKDN Belanja, Vendor Aktif.
- **Procurement Intelligence (AI)** — naratif AI kondisi pengadaan.
- **Procurement Risk Radar** — risiko pengadaan berlevel.
- **Tren Belanja Bulanan** — tren nilai belanja bulanan.
- **Penghematan Kumulatif** — akumulasi savings terhadap target.
- **Alerts & Notifications** — peringatan operasional pengadaan.
- **Konsentrasi Vendor** — konsentrasi belanja pada vendor teratas (ringkas).
- **BOD Decision Center** — antrean keputusan Direksi.
- **Insight & Rekomendasi (Decision-grade)**.

## `/pengadaan/analitik-belanja`
- **KPI Strip** — Belanja YTD, Addressable Spend, Belanja Terkelola Kontrak, Maverick Spend, Rata-rata Nilai PO.
- **Belanja per Kategori** — bar nilai belanja per kategori.
- **Belanja per Subholding** — belanja tiap subholding.
- **Belanja per Jenis** — komposisi barang/jasa/capex.
- **Pareto Konsentrasi Vendor** — kurva Pareto konsentrasi belanja.
- **Maverick Spend per Unit** — belanja di luar kontrak per unit kerja.
- **Profil Termin Pembayaran** — distribusi termin pembayaran vendor.

## `/pengadaan/kategori-komoditas`
- **KPI Strip** — Kategori Strategis, Indeks Harga Input, Kontrak Payung Aktif, Cakupan Kategori Strategis.
- **Matriks Kraljic Kategori** — matriks 2×2 dampak profit × risiko pasokan.
- **Indeks Harga Komoditas** — line chart indeks harga input utama.
- **Risiko Pasokan per Kategori** — level risiko pasokan tiap kategori.
- **Rencana Strategi Sourcing** — strategi sourcing per kategori.
- **Penghematan per Kategori** — penghematan yang dihasilkan tiap kategori.

## `/pengadaan/manajemen-vendor`
- **KPI Strip** — Vendor Aktif, Vendor Kritikal, Vendor Baru YTD, Skor Kinerja Rata-rata, Vendor Bersanksi.
- **Segmentasi Vendor** — komposisi vendor per segmen/tier.
- **Kinerja Vendor** — tabel skor kinerja (kualitas, ketepatan waktu, dsb).
- **Konsentrasi 10 Vendor Terbesar** — share belanja 10 vendor terbesar.
- **Vendor Risk Watchlist** — vendor berisiko dengan alasan pemantauan.
- **Funnel Onboarding Vendor** — tahapan registrasi hingga vendor aktif.
- **Komposisi Vendor Lokal & UMKM** — proporsi belanja ke vendor lokal/UMKM.

## `/pengadaan/proses-tender`
- **KPI Strip** — Siklus Pengadaan, Tender Berjalan, Tingkat Kompetisi, Tender Gagal/Ulang, Cakupan e-Procurement.
- **Waktu Siklus per Tahap** — durasi tiap tahap proses vs standar.
- **Pipeline Tender Aktif** — tender berjalan beserta status/tahap.
- **Tingkat Kompetisi Paket** — distribusi jumlah peserta per paket.
- **Penyebab Tender Gagal / Ulang** — breakdown kategori penyebab.
- **Adopsi e-Procurement per Unit** — tingkat adopsi e-proc tiap unit.

## `/pengadaan/kontrak`
- **KPI Strip** — Kontrak Aktif, Nilai Kontrak Agregat, Jatuh Tempo ≤90 Hari, Kontrak Berisiko Tinggi, Rata-rata Waktu Review.
- **Kontrak per Jenis & Status** — stacked bar jumlah/nilai kontrak.
- **Timeline Jatuh Tempo Kontrak** — kontrak berakhir per periode.
- **Kepatuhan Administratif** — skor kelengkapan dokumen kontrak.
- **10 Kontrak Bernilai Terbesar** — tabel kontrak nilai tertinggi.
- **Kontrak Payung per Kategori** — framework agreement per kategori.
- **Analisis Addendum** — frekuensi dan nilai addendum kontrak.

## `/pengadaan/tkdn-integritas`
- **KPI Strip** — TKDN Belanja, Nilai Belanja TKDN, Laporan Integritas Pengadaan, Vendor Bersanksi, Cakupan Pakta Integritas.
- **TKDN per Kategori Belanja** — capaian TKDN tiap kategori vs target.
- **Tren TKDN 8 Kuartal** — line chart pergerakan TKDN.
- **Funnel Penanganan Kasus** — laporan → verifikasi → sanksi.
- **Kasus Integritas Pengadaan** — tabel kasus dengan status penanganan.
- **Efektivitas Kontrol Pengadaan** — skor efektivitas kontrol/mitigasi fraud.

---

# 13. Modul Aset & Investasi

## `/aset-investasi` (Executive Overview)
- **KPI Strip (4 kartu)** — Land Bank, Areal Sengketa, HGU Habis < 5 Thn, Nilai Aset Tetap.
- **Asset Intelligence (AI)** — naratif AI kondisi portofolio aset.
- **Komposisi Land Bank** — komposisi penggunaan land bank.
- **Asset Risk Radar** — risiko aset berlevel.
- **Tren Nilai Aset Tetap** — line chart nilai aset tetap antarperiode.
- **Utilization Snapshot** — ringkasan tingkat utilisasi aset utama.
- **Alerts & Notifications** — peringatan terkait aset & lahan.
- **Strategic Alignment** — keselarasan portofolio aset dengan prioritas strategis.
- **BOD Decision Center** — antrean keputusan Direksi.
- **Insight & Rekomendasi (Decision-grade)**.

## `/aset-investasi/land-bank`
- **KPI Strip** — Total Land Bank, Bersertifikat Aktif, Proses Perpanjangan, Habis < 5 Tahun.
- **Land Bank per Subholding** — luas lahan tiap subholding.
- **Timeline Berakhirnya HGU** — HGU jatuh tempo per tahun.
- **Funnel Perpanjangan HGU** — tahapan proses perpanjangan.
- **Utilisasi Lahan** — proporsi lahan tertanam/idle/non-produktif.
- **Lahan per Wilayah** — tabel luas dan status lahan per wilayah.

## `/aset-investasi/produktivitas-aset`
- **KPI Strip** — Yield TBS, OER (Rendemen CPO), CPO per Hektar, Rendemen Gula.
- **Yield TBS per Regional** — produktivitas TBS tiap regional vs target.
- **Tren Produktivitas 5 Tahun** — line chart yield/rendemen.
- **Profil Umur Tanaman × Yield** — hubungan kelas umur tanaman dengan yield.
- **Produktivitas Gula per Klaster PG** — produktivitas gula tiap klaster pabrik gula.
- **Kuadran Imbal Hasil Aset** — scatter aset berdasar imbal hasil vs produktivitas.
- **Nilai Gap Produktivitas** — kuantifikasi nilai rupiah gap produktivitas.

## `/aset-investasi/fasilitas-produksi`
- **KPI Strip** — Kapasitas Olah PKS, Kapasitas Giling PG, Utilisasi Rata-Rata, Availability Pabrik.
- **Kapasitas & Utilisasi PKS** — kapasitas vs utilisasi tiap PKS.
- **Kesehatan 17 Pabrik Gula** — grid/heatmap skor kesehatan 17 PG.
- **Umur vs Kondisi Pabrik** — scatter umur pabrik terhadap skor kondisi.
- **Analisis Downtime** — penyebab dan durasi downtime.
- **Kapasitas vs Proyeksi Pasokan** — kapasitas olah terhadap proyeksi pasokan bahan baku.

## `/aset-investasi/replanting` (scope PalmCo)
- **KPI Strip** — Target Replanting 2026, Realisasi YTD, Biaya Replanting, Areal TBM.
- **Progress Replanting per Regional** — realisasi vs target tiap regional.
- **Kurva-S Replanting 2024–2030** — rencana vs realisasi program replanting.
- **Proyeksi Profil Umur 2026–2035** — stacked area proyeksi komposisi umur tanaman.
- **Backlog Pemeliharaan** — backlog pekerjaan pemeliharaan.
- **Sumber Pendanaan Replanting 2026** — komposisi sumber dana.

## `/aset-investasi/portofolio-investasi`
- **KPI Strip** — Proyek Aktif, Nilai Pipeline, Proyek Strategis Nasional, On Schedule.
- **Pipeline Proyek Investasi** — funnel tahapan proyek dari studi hingga eksekusi.
- **8 Proyek Terbesar** — tabel proyek bernilai terbesar dengan status (judul menyesuaikan filter subholding).
- **Matriks Risiko Proyek** — matriks probabilitas × dampak.
- **Investasi per Sektor** — komposisi nilai investasi per sektor.
- **Kurva-S Proyek Kritis** — rencana vs realisasi proyek kritis.
- **BOD Decision Center** — keputusan Direksi terkait investasi.

## `/aset-investasi/optimalisasi-aset`
- **KPI Strip** — Lahan Idle, Bangunan Non-Inti, Potensi Monetisasi, Pendapatan Kemitraan.
- **Inventarisasi Aset Idle** — tabel aset idle: luas/nilai dan status.
- **Corong Monetisasi Aset** — funnel proses monetisasi.
- **Kemitraan Aset (KSO/BOT)** — skema kemitraan aset berjalan.
- **Jembatan Nilai Optimalisasi** — waterfall kontribusi tiap inisiatif.
- **Matriks Hold – Optimize – Divest** — klasifikasi aset untuk keputusan.
- **BOD Decision Center** — keputusan Direksi terkait optimalisasi aset.

## `/aset-investasi/sengketa-lahan`
- **KPI Strip** — Areal Sengketa, Jumlah Kasus, Eksposur Ekonomi, Diselesaikan YTD.
- **Sengketa per Tipe** — jumlah dan luas sengketa per tipe konflik.
- **Sengketa per Subholding** — sebaran kasus tiap subholding.
- **Tren Penyelesaian Sengketa** — kasus masuk vs terselesaikan antarperiode.
- **Kasus Sengketa Terbesar** — tabel kasus eksposur terbesar dan statusnya.
- **Matriks Risiko Sengketa** — matriks probabilitas × dampak.
- **BOD Decision Center** — keputusan Direksi terkait sengketa lahan.

---

# 14. Modul Strategi & Kinerja

## `/strategi-kinerja` (Executive Overview)
- **KPI Strip (6 kartu)** — Inisiatif Strategis RJPP, Skor KPI Korporat, Milestone Selesai, Value Creation YTD, Keputusan BOD Overdue, Program Transformasi On-Track.
- **Strategy Intelligence (AI)** — sintesis eksekutif: 3 sinyal (On Track / At Risk / Off Track) + Executive Recommendation.
- **Initiative Portfolio Map** — bubble chart 28 inisiatif: progres × dampak EBITDA 2029, ukuran = investasi.
- **Scorecard Snapshot** — bar skor KPI korporat per entitas vs target RKAP 85.
- **Execution Risk Radar** — radar 6 sumbu eksposur risiko eksekusi strategi.
- **Value Creation Trend 2026** — area chart realisasi kumulatif YTD vs jalur target Rp 4,2 T.
- **Strategic Alignment** — 5 sasaran strategis RJPP 2025–2029 + progress bar.
- **Strategy Decision Center** — keputusan Direksi tertunda beserta eksposur nilai.
- **Alerts & Notifications** — peringatan eksekusi strategi.
- **Insight & Rekomendasi (Decision-grade)**.

## `/strategi-kinerja/benchmark`
- **KPI Strip** — Peringkat EBITDA Margin, Yield CPO, HPP CPO vs Median Peers, Gap Rendemen Gula.
- **Benchmark EBITDA Margin** — bar chart margin PTPN vs 8 peer industri.
- **Benchmark Yield & OER** — bar chart yield TBS & OER vs pembanding.
- **Kurva Posisi Biaya (HPP CPO)** — cost curve dengan marker posisi PTPN.
- **Benchmark Rendemen Gula** — bar chart rendemen gula vs pembanding.
- **Gap ke Best-in-Class** — tabel gap metrik kunci.
- **Insight & Rekomendasi** + footnote sumber data benchmark.

## `/strategi-kinerja/keputusan-bod`
- **KPI Strip** — Keputusan BOD YTD, Selesai Ditindaklanjuti, Sedang Berjalan, Overdue, Rata-rata Umur Tindak Lanjut.
- **Pipeline Keputusan** — stacked bar keputusan per bulan menurut status tindak lanjut.
- **Keputusan Overdue** — 3 keputusan overdue: hambatan, PIC, nilai tertahan.
- **Register Keputusan** — tabel 14 keputusan terkini (PIC, batas waktu, status).
- **Keputusan per Klasifikasi** — komposisi 46 keputusan YTD.
- **Agenda Rapat Mendatang** — agenda rapat Direksi & Komisaris + kesiapan materi.
- **Decision Outcome (Executive Decision Journal)** — closed loop keputusan yang sudah dieksekusi: chip **Decision ID** (DEC-YYYY-NNN, keputusan sebagai objek ledger ber-ID), tanggal diputus, **Owner**, **Asumsi kunci** (diuji ulang saat outcome diukur), expected vs actual impact, pill variance, baris **Why** (akar penyebab variance), dan lesson learned — memori institusional cara Direksi memutus; badge cakupan "8 dari 31 keputusan selesai terukur" membuat gap pengukuran outcome eksplisit; **8 entri journal** (pengadaan, divestasi, replanting, capex PG Glenmore, fasilitas modal kerja SGN, task force EUDR, cash pooling, ERP wave 2) dengan campuran tone good/warn/bad supaya pola belajarnya terlihat — angka selaras group-baseline, register sbd-data, risk trajectory, dan klaim TI (benefit ERP tertahan Rp 1,17 T).
- **Decision Portfolio** — kualitas pengambilan keputusan sebagai portofolio: stat status (46 total YTD / 31 selesai / 12 berjalan / 3 overdue, selaras SbdKpiStrip), nilai menunggu keputusan (Rp 2,82 T dari 3 antrian CEO), expected vs realized value keputusan terukur (Rp 1,75 T vs Rp 1,13 T) + bar realization rate 65%; footnote menyebut basis hitung dan bahwa keputusan non-finansial tidak dihitung.
- **Insight & Rekomendasi (Decision-grade)**.

## `/strategi-kinerja/kpi-korporat`
- **KPI Strip** — Skor KPI Group, PalmCo, SGN, PTPN I, KPI Merah.
- **Scorecard per Perspektif** — bar skor 4 perspektif balanced scorecard vs ambang 85.
- **Tren Skor Komposit** — line chart 8 kuartal: Group vs 3 subholding.
- **Matriks 32 KPI Korporat** — tabel target, aktual, skor, status RAG per perspektif.
- **Fokus KPI Merah** — 4 KPI merah: gap, akar masalah, aksi, owner.
- **Peta Cascade KPI Holding → Subholding** — cascade KPI holding ke target turunan.
- **Insight & Rekomendasi (Decision-grade)**.

## `/strategi-kinerja/milestone`
- **KPI Strip** — Total Milestone 2026, Selesai, Terlambat, Kritis ≤30 Hari, On-Time Rate.
- **Milestone Timeline 2026** — gantt Q1–Q4 per program transformasi.
- **Milestone Terlambat** — tabel 19 milestone: hari keterlambatan, dampak, PIC.
- **Milestone per Owner** — stacked bar status per owner.
- **Critical Path ≤30 Hari** — 7 milestone kritis jatuh tempo ≤30 hari.
- **Completion Trend 2026** — line chart tren penyelesaian milestone.
- **Insight & Rekomendasi (Decision-grade)**.

## `/strategi-kinerja/portofolio-inisiatif`
- **KPI Strip** — Inisiatif Strategis, Nilai Target 2029, Kebutuhan Investasi, Inisiatif On Track.
- **Inisiatif per Tema** — stacked bar distribusi status pada 5 tema RJPP.
- **Initiative Status Board** — 10 inisiatif prioritas: progres, status, milestone berikutnya.
- **Impact vs Effort** — scatter kuadran dampak 2029 × effort (investasi) 28 inisiatif.
- **Pendanaan Portofolio** — kebutuhan investasi vs alokasi disetujui per tema.
- **Inisiatif At Risk** — 8 inisiatif At Risk: akar masalah & rencana pemulihan.
- **Insight & Rekomendasi (Decision-grade)**.

## `/strategi-kinerja/transformasi`
- **KPI Strip** — Program Transformasi, Transformation Health Index, Benefit Realized YTD, Adopsi Digital.
- **Transformation Health** — grid 6 program: health score, progres, benefit, sponsor.
- **Swasembada Gula 2028** — line chart trajektori produksi gula menuju swasembada.
- **Progres Hilirisasi** — progress bar proyek hilirisasi/downstream.
- **Digital Maturity** — adopsi digital per subholding vs target 80% (maturitas 1–5).
- **Transformation Benefits** — realisasi benefit transformasi vs target.
- **Insight & Rekomendasi (Decision-grade)**.

## `/strategi-kinerja/value-creation`
- **KPI Strip** — Value Creation YTD, Target FY 2026, Target Kumulatif 2029, Run-Rate vs Target.
- **Value Bridge — Sumber Nilai** — waterfall 6 pengungkit nilai.
- **Nilai per Subholding** — stacked bar realisasi nilai per subholding per pengungkit.
- **Trajektori Nilai 2029** — area chart jalur nilai kumulatif ke 2029.
- **Kontributor Nilai Terbesar** — tabel 8 inisiatif: target 2029 vs realisasi YTD.
- **Economic Profit (ROIC vs WACC)** — ROIC vs WACC Group dan spread EVA per subholding.
- **Insight & Rekomendasi (Decision-grade)**.

---

# 15. Modul Risiko & Kepatuhan

## `/risiko-kepatuhan` (Executive Overview)
- **KPI Strip (7 kartu)** — Enterprise Risk Index, Risiko Ekstrem & Tinggi, Limit Breach, Skor Kepatuhan Grup, Temuan Audit Overdue, ERM Maturity, Eksposur Legal.
- **Risk Intelligence (AI)** — sintesis: 4 Risiko Ekstrem / 13 Tinggi / ERI 64 + Executive Recommendation.
- **Enterprise Risk Heatmap 5×5** — heatmap likelihood × impact, bubble = jumlah risiko per sel.
- **Top 10 Risiko Korporat** — tabel skor inherent → residual, arah tren, pemilik risiko.
- **Profil Risiko per Kategori** — radar skor residual vs ambang risk appetite.
- **Early Warning Indicators (KRI)** — 6 KRI leading + ambang eskalasi dan statusnya.
- **BOD Decision Center** — keputusan mitigasi risiko menunggu BOD; umur keputusan dihitung otomatis terhadap tanggal acuan dashboard (tenggat lewat tampil badge merah "Overdue X hari" via `decision-aging.ts`, berlaku juga di Top Risk detail & ERM Decision Center).
- **Compliance Snapshot** — ringkasan kepatuhan regulasi enterprise + tautan detail.
- **Insight & Rekomendasi (Decision-grade)**.

## `/risiko-kepatuhan/risk-register`
- **KPI Strip** — Total Risiko Register, Ekstrem & Tinggi, Menengah, Rendah.
- **Register per Kategori & Subholding** — stacked bar komposisi register.
- **Inherent vs Residual — Top 15** — bar track dual skala 0–25.
- **Pergerakan Risiko QoQ** — visual naik/turun/baru/ditutup antar kuartal.
- **Matriks Pemilik Risiko** — heat-table sebaran level risiko per direktorat.
- **Detail 8 Risiko Prioritas** — tabel interaktif (klik baris → deskripsi, KRI, mitigasi).
- **Taksonomi & Dasar Regulasi** — catatan kaki dasar taksonomi register.
- **Insight & Rekomendasi (Decision-grade)**.

## `/risiko-kepatuhan/risk-appetite`
- **KPI Strip** — Limit Risk Appetite, Limit Breach, Near-Limit, Review Terakhir.
- **Utilisasi Limit per Kategori** — grid gauge radial 8 limit (skala 0–120%).
- **Breach Log** — 4 limit breach aktif: deviasi, tindak lanjut, eskalasi.
- **Tren Utilisasi Limit** — line chart 6 bulan jumlah breach & near-limit.
- **Tolerance Matrix** — pernyataan appetite per kategori + jumlah limit turunan.
- **Jalur Eskalasi Komite Risiko** — alur eskalasi breach hingga Komite Pemantau Risiko Dekom.
- **Insight & Rekomendasi (Decision-grade)**.

## `/risiko-kepatuhan/kepatuhan-regulasi`
- **KPI Strip** — Kewajiban Regulasi Enterprise, Tingkat Kepatuhan, DMO CPO, Export Levy YTD, Sanksi Berjalan.
- **Kewajiban per Domain Regulasi** — stacked bar status 386 kewajiban per domain.
- **Regulatory Change Radar** — regulasi baru dalam pipeline + kesiapan grup.
- **DMO/DPO Tracker CPO** — alokasi vs realisasi kewajiban pasar domestik bulanan.
- **Portofolio HGU** — sertifikat HGU, perpanjangan berjalan, sengketa administratif.
- **Kepatuhan per Subholding** — heat-table skor kepatuhan.
- **Log Sanksi Regulator** — sanksi administratif berjalan + target pemenuhan.
- **Insight & Rekomendasi (Decision-grade)**.

## `/risiko-kepatuhan/audit-temuan`
- **KPI Strip** — Temuan BPK, Temuan SPI YTD, Temuan KAP, Temuan Overdue, Cakupan PKPT.
- **Temuan per Sumber Audit** — komposisi temuan (BPK/SPI/KAP).
- **Aging Temuan Terbuka** — bucket umur temuan belum ditutup.
- **Temuan per Kategori** — temuan menurut kategori.
- **Tren Tindak Lanjut** — line chart tren penutupan tindak lanjut.
- **Temuan Berulang** — temuan berulang lintas periode/entitas.
- **Cakupan PKPT** — cakupan Program Kerja Pengawasan Tahunan SPI.
- **Temuan Bernilai Terbesar** — tabel temuan eksposur terbesar.
- **Insight & Rekomendasi (Decision-grade)**.

## `/risiko-kepatuhan/fraud-wbs`
- **KPI Strip** — Laporan WBS Enterprise, Substantiated, Kerugian Fraud Teridentifikasi, Rata-rata Investigasi, Retaliasi Pelapor.
- **Tren Laporan & Kanal Pelaporan** — line chart tren laporan + komposisi kanal.
- **Laporan per Tipe Kasus** — laporan menurut tipe kasus.
- **Konsentrasi Fraud per Subholding** — heat-table laporan & kerugian per subholding/regional.
- **Funnel Investigasi** — masuk → telaah → investigasi → terbukti → sanksi.
- **Penegakan Sanksi** — jenis & jumlah sanksi yang dijatuhkan.
- **Gratifikasi & LHKPN (UPG)** — kepatuhan LHKPN & penanganan gratifikasi.
- **Catatan konsistensi** — footnote relasi dengan modul Risk & Compliance SDM.
- **Insight & Rekomendasi (Decision-grade)**.

## `/risiko-kepatuhan/komoditas-iklim`
- **KPI Strip** — Harga CPO Avg YTD, Probabilitas El Nino H2, Potensi Dampak TBS, Hedging Coverage, Harga Gula Lelang.
- **Harga CPO — Aktual, Forward Curve & Band RKAP** — composed chart.
- **Skenario El Nino H2 2026** — 3 skenario: dampak produksi & EBITDA + probabilitas.
- **Anomali Curah Hujan per Regional** — line chart anomali 3 bulan terakhir vs normal.
- **Sensitivitas Skenario Komoditas** — sensitivitas EBITDA/pendapatan terhadap harga & kurs.
- **Risiko Impor Gula** — dampak kebijakan impor terhadap harga lelang.
- **Program Adaptasi Iklim** — program: cakupan, status, investasi.
- **BOD Decision Center** — keputusan kebijakan hedging & transfer risiko iklim.
- **Insight & Rekomendasi (Decision-grade)**.

## `/risiko-kepatuhan/mitigasi-erm`
- **KPI Strip** — Total Sum Insured (TSI), Premi Tahunan, Aksi Mitigasi On-Track, ERM Maturity.
- **Peta Cakupan Asuransi Korporat** — tabel TSI, premi, loss ratio per lini asuransi.
- **Riwayat Klaim & Premi** — bar chart klaim vs premi antar periode.
- **Portofolio Aksi Mitigasi** — status RAG 96 aksi mitigasi per kategori risiko.
- **Maturitas ERM — 8 Dimensi** — radar skor maturitas ERM.
- **Efektivitas Kontrol** — area chart tren efektivitas kontrol.
- **Pilot Asuransi Parametrik Iklim** — skema pilot asuransi indeks curah hujan.
- **ERM Decision Center** — keputusan mitigasi/transfer risiko menunggu persetujuan.
- **Insight & Rekomendasi (Decision-grade)**.

## `/risiko-kepatuhan/legal-portfolio`
- **KPI Strip** — Perkara Aktif, Sengketa Lahan / HGU, Eksposur Legal, Win Rate 3 Tahun, Perkara Baru YTD.
- **Perkara per Jenis** — komposisi perkara (tautan ke modul Industrial Relations).
- **Top 10 Eksposur Perkara** — bar horizontal nilai eksposur terbesar.
- **Tahapan Perkara** — sebaran perkara aktif per tahapan proses hukum.
- **Konsentrasi Geografis** — konsentrasi perkara per wilayah.
- **Okupasi Lahan Berperkara** — tren penyelesaian okupasi lahan (ribu ha).
- **Kecukupan Provisi Litigasi** — provisi (PSAK 57) vs expected loss per jenis perkara.
- **Insight & Rekomendasi (Decision-grade)**.

---

# 16. Modul Hukum

## `/hukum` (Executive Overview)
- **KPI Strip (7 kartu)** — Kontrak Aktif, Kontrak Jatuh Tempo ≤90 Hari, Izin & Lisensi Aktif, Perkara Aktif, Entitas Anak & Afiliasi, Permintaan Legal, Legal Spend.
- **Legal Intelligence (AI)** — sintesis: 1 Kritis / 2 Perhatian / 3 Sinyal + Executive Recommendation.
- **Radar Risiko Hukum** — radar eksposur risiko hukum multi-dimensi.
- **Heatmap Kedaluwarsa Gabungan** — heat-table kedaluwarsa kontrak + izin 6 bulan ke depan.
- **Beban Kerja Legal 12 Bulan** — composed chart permintaan masuk vs selesai + backlog bulanan.
- **Alerts & Notifications** — peringatan hukum prioritas.
- **Eksposur Litigasi** — ringkasan eksposur litigasi + tautan Legal Case Portfolio.
- **BOD Decision Center** — keputusan hukum menunggu Direksi.
- **Insight & Rekomendasi (Decision-grade)**.

## `/hukum/kontrak`
- **KPI Strip (6 kartu)** — Kontrak Aktif, Nilai Kontrak Agregat, Jatuh Tempo ≤90 Hari, Kontrak Berisiko Tinggi, Rata-rata Waktu Review, Kepatuhan Template.
- **Kontrak per Kategori** — distribusi 1.842 kontrak aktif per kategori.
- **10 Kontrak Bernilai Terbesar** — bar horizontal nilai terbesar.
- **Timeline Kedaluwarsa 12 Bulan** — jatuh tempo, sorot jendela ≤90 hari (112 kontrak).
- **Pipeline Perpanjangan** — funnel identifikasi → tanda tangan.
- **Risk Clause Watch** — klausul bermasalah + jumlah kontrak terdampak.
- **Tren SLA Review Kontrak** — line chart waktu review vs SLA.
- **Insight & Rekomendasi (Decision-grade)**.

## `/hukum/perizinan`
- **KPI Strip (6 kartu)** — Izin & Lisensi Aktif, Berakhir ≤6 Bulan, Izin dalam Proses, Ketepatan Waktu Perpanjangan, Izin Kritikal Operasi, Denda & Sanksi.
- **Izin per Domain** — distribusi 612 izin aktif per domain.
- **Kalender Kedaluwarsa Izin** — tabel 43 izin berakhir ≤6 bulan.
- **Funnel Perpanjangan Izin** — teridentifikasi → terbit.
- **Matriks Risiko Perizinan** — scatter bubble dampak operasi × sisa waktu.
- **Kepatuhan Perizinan per Regional** — bar skor kepatuhan per regional.
- **Log Sanksi & Denda Perizinan** — 6 sanksi administratif YTD (Rp 2,4 M).
- **Insight & Rekomendasi (Decision-grade)**.

## `/hukum/litigasi`
- **KPI Strip (6 kartu)** — Perkara Aktif, Sengketa Lahan Berperkara, Eksposur Legal, Provisi Perkara, Win Rate 3 Tahun, Legal Spend.
- **Ringkasan Perkara per Tipe** — 87 perkara aktif (compact, pendalaman di Legal Case Portfolio).
- **Jalur Hukum Sengketa Lahan** — jalur hukum 52 kasus sengketa lahan berperkara.
- **Rincian Legal Spend** — realisasi legal spend YTD Rp 96 M vs pagu FY Rp 216 M.
- **Firma Hukum Eksternal** — tabel kinerja firma: beban perkara, biaya, skor.
- **Pustaka Preseden & Pelajaran** — putusan penting + pelajaran untuk perkara berjalan.
- **Agenda Advokasi Kebijakan** — agenda (EUDR, DMO, pertanahan) + dampak & kanal.
- **Insight & Rekomendasi (Decision-grade)**.

## `/hukum/korporasi`
- **KPI Strip (6 kartu)** — Entitas Anak & Afiliasi, Entitas Aktif vs Non-Operasional, RUPS Terselenggara, Aksi Korporasi Berjalan, Skor GCG, Kepatuhan Pelaporan Korporat.
- **Portofolio Entitas Anak & Afiliasi** — tabel 24 entitas.
- **Peta Struktur Kepemilikan** — diagram kepemilikan Holding → 3 Subholding → entitas anak.
- **Aksi Korporasi 2026** — aksi korporasi + tahap hukum dan progres.
- **Kalender RUPS 2026** — timeline RUPS tahunan & luar biasa beserta agenda.
- **Dokumen Tata Kelola** — dokumen GCG + status pemutakhiran.
- **Kewajiban Pelaporan Korporat** — progres pelaporan ke Kementerian BUMN/Danantara & regulator.
- **Corporate Decision Center** — keputusan korporat menunggu persetujuan.
- **Insight & Rekomendasi (Decision-grade)**.

---

# 17. Modul ESG & Sustainability

## `/esg-sustainability` (Executive Overview)
- **KPI Strip ESG (7 kartu)** — Skor ESG Komposit, Sertifikasi ISPO, Intensitas Emisi, EUDR Readiness, Insiden Lingkungan Signifikan, Petani Plasma Binaan, Penyaluran TJSL.
- **ESG Intelligence (AI)** — sintesis 3 sinyal lintas pilar (Kritis/Perhatian/Positif) + Executive Recommendation.
- **Skor 6 Pilar ESG** — radar chart skor 2026 vs Target 2027 (komposit 72,4).
- **Jalur Dekarbonisasi menuju -30%** — composed chart intensitas emisi tCO2e/ton CPO, aktual vs jalur target 2019–2030.
- **Cakupan Sertifikasi per Subholding** — progress bar cakupan skema sertifikasi tiap subholding.
- **Alerts & Notifications** — peringatan ESG berprioritas.
- **Rating ESG Eksternal** — skor agensi rating + sparkline tren.
- **BOD Decision Center** — keputusan Direksi menunggu, nilai & tenggat.
- **Insight & Rekomendasi (Decision-grade)**.

## `/esg-sustainability/emisi-karbon`
- **KPI Strip** — Emisi Scope 1, Scope 2, Scope 3 (Estimasi), Intensitas Emisi, Metana POME.
- **Emisi per Scope** — donut komposisi Scope 1/2/3.
- **Emisi per Sumber** — kontribusi sumber emisi.
- **Intensitas Emisi vs Benchmark** — line chart tren vs benchmark industri.
- **Emisi per Subholding** — kontribusi terhadap Scope 1+2 grup.
- **Potensi Monetisasi Karbon** — potensi kredit karbon kumulatif s.d. 2030 (SPE-GRK & IDXCarbon).
- **Metodologi** — catatan inventarisasi GRK ISO 14064-1 / GHG Protocol.
- **Insight & Rekomendasi**.

## `/esg-sustainability/dekarbonisasi`
- **KPI Strip** — Biogas Beroperasi, Solar PV Terpasang, Avoided Emission, Capex Dekarbonisasi, Program Aktif.
- **Abatement Waterfall menuju -30%** — kontribusi tiap lever ke target penurunan.
- **Portofolio Program Dekarbonisasi** — tabel program: status, capex, potensi abatement.
- **Sebaran Biogas per Regional** — jumlah/kapasitas unit biogas per regional.
- **Marginal Abatement Cost per Lever** — MAC curve biaya abatement per lever.
- **Rollout Solar PV Kumulatif** — kapasitas terpasang (MWp) vs jalur target 30 MWp 2028.
- **BOD Decision Center** — keputusan investasi dekarbonisasi.
- **Insight & Rekomendasi**.

## `/esg-sustainability/sertifikasi`
- **KPI Strip** — Sertifikasi ISPO, RSPO, ISCC EU, Sertifikat Habis ≤12 Bulan.
- **Matriks Sertifikasi Subholding × Skema** — heat-table cakupan atas basis 76 unit kebun/PKS.
- **Pipeline Sertifikasi per Kuartal** — unit masuk pipeline audit per kuartal.
- **Non-Conformity per Prinsip ISPO** — jumlah ketidaksesuaian per prinsip.
- **Nilai Premi Sertifikasi (CSPO)** — line chart nilai premi produk tersertifikasi.
- **Kalender Kedaluwarsa Sertifikat** — sertifikat mendekati masa berakhir dengan countdown.
- **Insight & Rekomendasi**.

## `/esg-sustainability/lingkungan-hayati`
- **KPI Strip** — Intensitas Air, Kepatuhan Effluent, Limbah B3 Terkelola, Kawasan HCV Dikelola, Spesies Dilindungi.
- **Tren Intensitas Air** — line chart per subholding.
- **Kepatuhan Effluent per Regional** — kepatuhan baku mutu vs ambang internal 95%.
- **Sirkularitas Limbah** — tingkat pemanfaatan tankos, cangkang, POME.
- **Pengelolaan Kawasan HCV** — tabel kawasan High Conservation Value: luas, patroli, temuan.
- **Insiden Lingkungan Signifikan** — 2 insiden YTD + status penanganan.
- **PROPER KLHK** — ringkasan peringkat Hijau/Biru/Merah siklus 2025/2026 (76 unit).
- **Insight & Rekomendasi**.

## `/esg-sustainability/deforestasi-eudr`
- **KPI Strip (6 kartu)** — EUDR Readiness, Traceability to Plantation, Polygon Geolokasi, Alert Satelit Aktif, Grievance NDPE Terbuka, Ekspor Terpapar EU.
- **EUDR Readiness per Pilar** — gauge/progress 4 pilar kesiapan (komposit 78/100).
- **Traceability Funnel** — funnel TTB (ke PKS) → TTP (ke kebun) per sumber pasokan.
- **Eksposur Ekspor per Destinasi** — donut destinasi CPO, eksposur Uni Eropa Rp 4,1 T.
- **Log Alert Satelit** — tabel 5 alert deforestasi terkini dari 14 YTD.
- **Grievance NDPE** — status grievance per kategori.
- **Timeline Tenggat EUDR** — milestone regulasi EUDR & target internal PTPN.
- **Insight & Rekomendasi**.

## `/esg-sustainability/sosial-plasma` (scope PalmCo)
- **KPI Strip** — Petani Plasma Binaan, Pendapatan Rata-rata Plasma, PSR Plasma Terealisasi, Penyaluran TJSL, UMK Binaan.
- **Kesejahteraan Plasma vs UMP** — pendapatan bersih petani plasma vs UMP tertimbang.
- **Progres PSR per Regional** — realisasi kumulatif PSR plasma terhadap target.
- **Alokasi TJSL per Pilar** — donut penyaluran TJSL YTD per pilar TJSL BUMN.
- **Community Grievance** — grievance komunitas per kategori + capaian SLA 21 hari vs target 30 hari.
- **Human Rights Scorecard** — scorecard HAM: tiga indikator sorotan + status seluruh indikator.
- **Konflik Lahan (ringkas)** — ringkas konflik lahan komunitas + tautan ke dimensi Risiko & Kepatuhan.
- **Insight & Rekomendasi**.

## `/esg-sustainability/rating-pendanaan`
- **KPI Strip** — Skor GCG (SK-16 BUMN), Sustainalytics ESG Risk, S&P Global CSA, SLL Outstanding, Step-down Margin.
- **Tren Rating Multi-Agensi** — line chart tiga seri rating.
- **Benchmark Peer ESG Risk** — Sustainalytics ESG Risk vs peer sawit regional.
- **SLL KPI Tracker** — 3 KPI sustainability-linked loan Rp 6,5 T + status step-down margin.
- **Green Finance Pipeline** — instrumen pendanaan hijau (green bond, KUR plasma, refinancing SLL).
- **Disclosure Calendar** — kalender pelaporan GRI, POJK 51, CDP, kesiapan CSRD.
- **Decision Center** — keputusan rating & sustainable finance menunggu.
- **Insight & Rekomendasi**.

---

# 18. Modul K3 & Keamanan

## `/k3-keamanan` (Executive Overview)
- **KPI Strip K3 (7 kartu)** — LTIFR, Kecelakaan Kerja, Insiden Fatal (dengan pita komitmen zero fatality), Jam Kerja Aman, Titik Kebakaran Lahan, Pencurian TBS, SMK3 Tersertifikasi.
- **HSE Intelligence (AI)** — 3 sinyal lintas domain + rekomendasi eksekutif.
- **Risk Radar K3 & Keamanan** — radar 6 sumbu eksposur HSE vs target internal 2027.
- **Tren Insiden & LTIFR** — bar bertumpuk kecelakaan per severity + garis LTIFR rolling 12 bulan.
- **Heat Strip Regional** — heat-table 7 regional: kecelakaan, LTIFR, titik api, pencurian.
- **Alerts & Notifications** — peringatan K3/keamanan berprioritas.
- **BOD Decision Center** — keputusan Direksi menunggu.
- **Pendalaman Lintas Dimensi** — tautan silang ke dimensi lain.
- **Insight & Rekomendasi**.

## `/k3-keamanan/kinerja-k3`
- **KPI Strip (6 kartu)** — LTIFR, Severity Rate, Kecelakaan Kerja, Insiden Fatal, Near-Miss Dilaporkan, Hari Kerja Hilang.
- **Tren LTIFR 24 Bulan** — line chart rolling 12 bulan vs target internal & benchmark industri.
- **Insiden per Tingkat Keparahan** — distribusi 84 kecelakaan YTD.
- **Insiden per Aktivitas Kerja** — distribusi per aktivitas (panen & angkut TBS terbesar).
- **Insiden per Penyebab Akar** — klasifikasi penyebab akar hasil investigasi.
- **Insiden Fatal: Pembelajaran & Tindakan Korektif** — 2 insiden fatal YTD + status tindakan korektif.
- **Pelaporan Near-Miss** — pelaporan bulanan vs target budaya pelaporan 140/bulan.
- **Hari Kerja Hilang per Regional** — regional dengan severity rate >40 disorot merah.
- **Insight & Rekomendasi**.

## `/k3-keamanan/karhutla`
- **KPI Strip (6 kartu)** — Hotspot Terdeteksi, Kejadian Kebakaran, Luas Terbakar, Waktu Respons Rata-rata, Regu Pemadam Kebakaran, Menara Pantau.
- **Tren Hotspot & Kejadian Kebakaran** — hotspot satelit vs kejadian terverifikasi 12 bulan.
- **Kebakaran per Regional** — sebaran hotspot dengan warna tingkat risiko.
- **Penyebab Kebakaran** — komposisi penyebab; konflik lahan menaut ke Sengketa Lahan.
- **Kapabilitas Respons per Regional** — kesiapan sumber daya pemadaman.
- **Tingkat Kesiapsiagaan** — status per regional (skor komposit grup 76).
- **Simulasi Tanggap Darurat** — jumlah drill YTD & cakupan unit (basis 76 unit).
- **Masyarakat Peduli Api** — kemitraan MPA: kelompok binaan & desa per regional.
- **Decision Center — Karhutla** — keputusan BOD + rute pendalaman lintas dimensi.
- **Insight & Rekomendasi**.

## `/k3-keamanan/keamanan-aset`
- **KPI Strip (6 kartu)** — Pencurian TBS, Nilai Kerugian, Personel Pengamanan, Kasus Terselesaikan, Gangguan Keamanan Lain, Area Rawan.
- **Tren Pencurian TBS & Kerugian** — kasus & nilai kerugian 12 bulan.
- **Pencurian per Regional** — korelasi restan panen ditautkan ke dimensi Produksi.
- **Jenis Gangguan Keamanan** — komposisi 408 insiden; penyerobotan lahan menaut ke Sengketa Lahan.
- **Cakupan Pengamanan per Regional** — personel, rasio, pos jaga, CCTV.
- **Funnel Penyelesaian Kasus** — laporan → penyelidikan → penyelesaian → tuntas.
- **Kerugian & Pemulihan** — nilai kerugian vs pemulihan per kategori insiden.
- **Kerja Sama Aparat & Pemda** — MoU, patroli bersama, kasus ditangani.
- **Decision Center — Keamanan Aset** — keputusan BOD + pendalaman lintas dimensi.
- **Insight & Rekomendasi**.

## `/k3-keamanan/budaya-kepatuhan`
- **KPI Strip (6 kartu)** — SMK3 Tersertifikasi, Peserta Pelatihan K3, Inspeksi K3, Temuan Terbuka, Penutupan Temuan, Indeks Budaya Keselamatan.
- **Sertifikasi SMK3 per Jenis Unit** — stacked bar tersertifikasi vs belum (basis 76 unit).
- **Temuan Audit K3 per Kategori** — temuan terbuka, tertutup, overdue SLA 60 hari.
- **Program Pelatihan K3** — peserta YTD per jenis program (total 12.400).
- **Cakupan Inspeksi K3 per Regional** — inspeksi terjadwal vs mendadak (total 1.860).
- **Indeks Budaya Keselamatan** — radar 5 dimensi vs target 4,0.
- **Surveilans Kesehatan Kerja** — indikator MCU, penyakit akibat kerja, fasilitas klinik kebun.
- **Insight & Rekomendasi**.

---

# 19. Modul Teknologi Informasi

## `/teknologi-informasi` (Executive Overview)
- **KPI Strip TI (7 kartu)** — Belanja TI FY, Adopsi Digital, Health Program ERP, Ketersediaan Sistem, Insiden Siber, Kepatuhan Patch SLA, Maturitas Siber.
- **TIK Intelligence (AI)** — 3 sinyal lintas domain + rekomendasi eksekutif.
- **Risk Radar Teknologi Informasi** — radar 6 sumbu risiko TI: residual vs ambang toleransi.
- **Ketersediaan Sistem Kritikal** — line chart uptime 12 bulan vs target SLA 99,5%.
- **Snapshot Belanja TI** — posisi belanja TI dalam band benchmark 1,2–2,0% pendapatan.
- **Alerts & Notifications** — peringatan TI berprioritas.
- **Health Program ERP** — kartu ringkas kesehatan program ERP.
- **BOD Decision Center** — keputusan Direksi terkait TI.
- **Insight & Rekomendasi**.

## `/teknologi-informasi/program-digital`
- **KPI Strip** — Health Program ERP, Adopsi Digital, Modul Go-Live, Benefit Terealisasi, Proyek Digital Aktif.
- **Status Modul ERP** — tabel 7 modul: cakupan sub-modul, adopsi, status RAG.
- **Timeline Rollout per Gelombang** — gantt gelombang rollout ERP per subholding Q1 2026 – Q1 2027.
- **Adopsi Digital per Subholding** — adopsi terhadap target grup 80%.
- **Waterfall Benefit ERP** — realisasi YTD menjembatani gap ke potensi penuh.
- **Risiko Delivery & Mitigasi** — risiko delivery beserta mitigasi & owner.
- **Portofolio Proyek Digital** — tabel 9 proyek aktif dengan progres dan status RAG.
- **Insight & Rekomendasi**.

## `/teknologi-informasi/portofolio-aplikasi`
- **KPI Strip (6 kartu)** — Aplikasi Inti, Aplikasi Legacy, Ketersediaan Layanan, Konektivitas Memadai, Skor Utang Teknis, Tiket Layanan.
- **Portofolio Aplikasi Inti (TIME)** — tabel aplikasi: kritikalitas, umur, status TIME.
- **Kuadran Siklus Hidup Aplikasi** — scatter Nilai Bisnis × Kondisi Teknis, warna = status TIME.
- **Konektivitas per Regional** — kualitas/kecukupan konektivitas.
- **Ketersediaan Layanan Kritikal** — uptime YTD 8 layanan vs target SLA.
- **Jejak Infrastruktur** — data center, cloud & edge: utilisasi kapasitas, porsi beban kerja.
- **Service Desk** — volume tiket per bulan, kepatuhan SLA, kategori teratas.
- **Utang Teknis per Kategori** — skor beban 1–5 (rata-rata grup 3,4) terhadap target.
- **Insight & Rekomendasi**.

## `/teknologi-informasi/keamanan-siber`
- **KPI Strip (6 kartu)** — Insiden Siber YTD, Kepatuhan Patch SLA, Maturitas Siber, Kesiapan PDP, Phishing Click Rate, MTTR Insiden.
- **Tren Insiden Siber per Severity** — stacked bar 12 bulan per severity.
- **Insiden per Vektor Serangan** — distribusi insiden YTD menurut vektor.
- **Umur Kerentanan Terbuka** — heat-table severity × bucket umur.
- **Kesiapan Pelindungan Data Pribadi** — skor 5 pilar UU PDP vs target.
- **Maturitas Siber NIST CSF** — radar 6 domain vs target 4,0.
- **Program Awareness & Simulasi Phishing** — cakupan pelatihan + hasil simulasi.
- **Uji DRP & Kesiapan Pemulihan** — RTO & RPO aktual vs target per sistem kritikal.
- **BOD Decision Center — Keamanan Siber** — keputusan Direksi terkait siber.
- **Insight & Rekomendasi**.

## `/teknologi-informasi/data-ai-governance`
- **KPI Strip (6 kartu)** — Kualitas Data Grup, Domain Data Terkelola, AI Use Case Produksi, Data Steward, Kepatuhan PDP, Cakupan Single Source of Truth.
- **Kualitas Data per Domain** — tabel 6 domain: kelengkapan, akurasi, ketepatan waktu (rata-rata 93,1%).
- **Portofolio AI Use Case** — tabel 7 use case (3 produksi, 2 pilot, 2 pengembangan) dengan dampak & risiko model.
- **Maturitas Tata Kelola Data** — radar 5 dimensi DAMA (rata-rata 2,9 vs target 2027: 4,0).
- **Lanskap Integrasi Data** — alur sistem sumber → platform data, jumlah interface aktif & real-time API.
- **Data Stewardship** — peran pengelola data + cakupan domain & entitas.
- **Guardrail Risiko AI** — status kebijakan AI, review etik & perlindungan data pribadi.
- **Insight & Rekomendasi** — dengan tautan ke /data-analytics.

## `/teknologi-informasi/belanja-nilai`
- **KPI Strip (6 kartu)** — Belanja TI FY, Realisasi Capex TI, Opex TI FY, Belanja TI / Pendapatan, Biaya per Pengguna, Benchmark Industri.
- **Rincian Belanja TI** — 5 komponen, total Rp 0,92 T (Capex Rp 0,50 T + Opex Rp 0,42 T).
- **Tren Capex vs Opex TI** — belanja 5 tahun + kurva belanja terhadap pendapatan.
- **Benchmark Belanja TI** — belanja TI terhadap pendapatan vs band target agribisnis.
- **Bauran Run vs Grow** — porsi belanja aktual 62/38 vs target 55/45.
- **Realisasi Nilai Program Digital** — benefit terealisasi vs belanja kumulatif & potensi penuh, plus ROI.
- **Optimasi Lisensi** — lisensi tidak terpakai & potensi penghematan per tahun.
- **Insight & Rekomendasi**.

---

# 20. Modul Dewan Komisaris

## `/dewan-komisaris` (Executive Overview)
- **KPI Strip Dekom (7 kartu)** — Rapat Dewan Komisaris, Kehadiran Anggota, Rekomendasi Diterbitkan, Tindak Lanjut Tepat Waktu, Skor Evaluasi Direksi, Persetujuan Menunggu, Skor GCG.
- **Dekom Intelligence** — sintesis 3 narasi pengawasan (Perlu Eskalasi / Dipantau / Rekomendasi YTD).
- **Fokus Pengawasan per Bidang** — radar 6 bidang: bobot perhatian vs intensitas pembahasan.
- **Rekomendasi Terbit vs Ditindaklanjuti** — composed chart 12 bulan terakhir.
- **Kehadiran per Anggota Dewan Komisaris** — tabel kehadiran 6 anggota pada rapat Dekom dan komite.
- **Alerts Pengawasan** — peringatan SLA tanggapan, tenggat rekomendasi, risalah.
- **Agenda Pengawasan Terdekat** — agenda + materi yang diminta dari Direksi.
- **Sumber Pemantauan Lintas Dimensi** — tautan silang ke dimensi lain.
- **Insight & Tindak Pengawasan** — temuan pengawasan + langkah lanjutan.

## `/dewan-komisaris/agenda-risalah`
- **KPI Strip (6 kartu)** — Rapat Dewan Komisaris, Rapat Gabungan dengan Direksi, Rapat Komite, Kehadiran Rata-rata, Risalah Terbit ≤14 Hari, Agenda Mendatang.
- **Kalender Rapat 2026** — sampel rapat lintas jenis forum dari 41 rapat YTD.
- **Distribusi Tema Agenda** — 96 butir agenda YTD menurut tema pengawasan.
- **Status Penerbitan Risalah** — status 41 risalah + kepatuhan SLA 14 hari kerja.
- **Butir Tindak Lanjut dari Risalah** — butir tindak lanjut per triwulan.
- **Agenda Mendatang & Materi yang Diminta** — lima agenda terdekat + materi diminta.
- **Tren Kehadiran Rapat** — line chart 12 bulan.
- **Insight & Tindak Pengawasan**.

## `/dewan-komisaris/evaluasi-direksi`
- **KPI Strip (5 kartu)** — Skor Kolektif Direksi, KPI Berstatus Merah, Skor Direktorat Terendah, Capaian RKAP YTD, Kepatuhan Pelaporan Direksi.
- **Sumber Angka Penilaian** — catatan sumber data + tautan "Buka KPI Korporat & Scorecard".
- **Scorecard Kolektif Direksi** — skor 4 perspektif + skor kolektif 87,4.
- **Penilaian per Direktorat** — tabel enam direktorat: skor, beban KPI, KPI merah, catatan.
- **Pertanyaan Pengawasan atas 4 KPI Merah** — 4 KPI merah sebagai pertanyaan pengawasan Dekom.
- **Tren Skor Kolektif** — line chart 8 kuartal terhadap ambang kategori Baik.
- **Kepatuhan Pelaporan Direksi** — ketepatan waktu laporan wajib ke Dekom.
- **Kalender Siklus Evaluasi** — timeline lima tahap siklus evaluasi 2026.
- **Insight & Tindak Pengawasan**.

## `/dewan-komisaris/rekomendasi`
- **KPI Strip (5 kartu)** — Rekomendasi Diterbitkan, Selesai Ditindaklanjuti, Sedang Berjalan, Melewati Tenggat, Rata Umur Penyelesaian.
- **Register Rekomendasi** — tabel 15 rekomendasi terkini dari 68 YTD + PIC dan tenggat.
- **Tindak Lanjut per Direktorat** — sebaran 68 rekomendasi per direktorat PIC menurut status.
- **Rincian Rekomendasi Overdue** — 9 rekomendasi melewati tenggat + dampak & langkah eskalasi.
- **Rekomendasi per Tema** — komposisi 68 rekomendasi YTD per tema pengawasan.
- **Umur Rekomendasi Terbuka** — aging 17 rekomendasi terbuka per rentang hari.
- **Tren Penyelesaian Kumulatif** — kumulatif terbit vs selesai per tahun buku.
- **Insight & Tindak Pengawasan**.

## `/dewan-komisaris/persetujuan`
- **KPI Strip (5 kartu)** — Permohonan Masuk, Disetujui, Menunggu Tanggapan, Ditolak / Dikembalikan, Rata Waktu Tanggapan.
- **Register Permohonan Persetujuan** — tabel 22 permohonan YTD + status tanggapan Dekom.
- **Menunggu Tanggapan Dewan Komisaris** — detail 4 permohonan menunggu tanggapan tertulis.
- **Matriks Ambang Kewenangan** — ambang kewenangan Direksi / Dekom / RUPS menurut Anggaran Dasar.
- **Tren Waktu Tanggapan** — rata-rata waktu tanggapan 12 bulan vs SLA 14 hari.
- **Permohonan per Kategori** — komposisi 22 permohonan per kategori aksi korporasi.
- **Insight & Tindak Pengawasan**.

## `/dewan-komisaris/komite`
- **KPI Strip (5 kartu)** — Komite Dewan Komisaris, Rapat Komite, Kursi Keanggotaan, Rekomendasi dari Komite, Penyelesaian Program Kerja.
- **Profil Tiga Komite** — profil komite penunjang: ketua, anggota, rapat, fokus, keluaran.
- **Progres Program Kerja** — rencana vs realisasi program kerja tiap komite (gabungan 78%).
- **Temuan & Permintaan Komite** — temuan & permintaan penjelasan kepada Direksi.
- **Kadensi Rapat Komite** — kadensi rapat 12 bulan (Jan–Mei 2026 = 24 rapat).
- **Insight & Tindak Pengawasan**.

---

# 21. Executive Guide (`/executive-guide`)

Menu khusus di sidebar utama (kedua mode navigasi, tepat di bawah Overview). Bukan user manual aplikasi — panduan membaca perusahaan melalui Executive Command Center ("Read the Enterprise. Understand the Signals. Make the Decision."). Semua halaman memakai kerangka `GuideShell` (Sidebar utama + ModuleHeader Tipe A + pill navigasi antar bab); tombol aksi header menaut ke Data Dictionary. Angka contoh diimpor dari lib data yang sama dengan dashboard (group-baseline, ceo-data, stg-data, hc-data) — tidak ada angka hardcoded yang bisa basi.

## `/executive-guide` (Start Here)
- **Hero** — tagline + intro filosofi guide (gradient navy).
- **Empat kartu pintu masuk** — 01 Start Here (Baca 60 Detik), 02 Understand (Warna & Trust), 03 Decide (Cara Memutuskan), 04 AI & Literacy (Literasi AI).
- **Executive Management Loop** (sebelumnya "Executive Reading Journey") — alur vertikal 9 pertanyaan (What changed → What was the outcome), tiap langkah menaut ke bagian dashboard terkait; deskripsi menegaskan relasi dengan **Executive Scan** (Baca 60 Detik = 6 langkah pertama, berhenti di keputusan & aksi; loop penuh lanjut sampai outcome).
- **Strip catatan** — definisi metrik tidak diulang; menaut ke Data Dictionary sebagai satu-satunya sumber definisi.

## `/executive-guide/baca-60-detik`
- **Enam Langkah, 60 Detik** — urutan baca homepage: Data Trust → What Changed → What Matters → What Is at Risk → What Needs My Decision → What Happens Next, tiap langkah menaut ke bagiannya.
- **Pola Baca Universal** — NUMBER → DELTA → DRIVER → IMPACT → ACTION dengan contoh EBITDA hidup (delta vs prorata RKAP dihitung dari group-baseline).
- **Empat Pertanyaan KPI** — Actual/Target/Delta/Trend.
- **Ritual Harian 5 Menit** — menit 1–5 dengan tautan per menit; filosofi Scan → Identify → Drill → Decide.
- **What Not to Do** — 8 kebiasaan salah baca yang harus dihindari.

## `/executive-guide/warna-dan-trust`
- **Arti Warna — Sebagai Aturan Keputusan** — GREEN/AMBER/RED/EXTREME dengan makna + implikasi intervensi Direksi.
- **Red Bukan Berarti Rugi** — 3 contoh kontras dari data berjalan (EBITDA green, serapan capex amber, eksposur CPO red).
- **Membaca Data Trust Index** — composite 7 komponen (Completeness…Lineage, selaras popover Data Trust) + aturan keputusan Trust 95+/90–95/<90.
- **Enam Lapisan Waktu** — Business As-of, System Refresh, Market As-of, Forecast Run, Decision Due Date, Actual Event Date + peringatan salah baca as-of.

## `/executive-guide/cara-memutuskan`
- **Delapan Pertanyaan untuk Setiap Keputusan** — ISSUE → EVIDENCE → IMPACT → OPTIONS → RECOMMENDATION → DECISION → OWNER → DEADLINE, kolom contoh diambil dari keputusan nyata pertama di BOD Decision Center (stgDecisions).
- **Membaca Umur Keputusan (Decision Aging)** — due bulan berjalan / overdue / overdue + eksposur besar.
- **Mana yang Didahulukan?** — prinsip prioritas eksposur finansial × urgensi.

## `/executive-guide/literasi-ai`
- **Tangga dari Informasi ke Keputusan** — INFORMATION → SIGNAL → INSIGHT → RISK → RECOMMENDATION → DECISION dengan contoh harga CPO (spot KPBN vs ASP YTD vs asumsi RKAP).
- **AI adalah Decision Assistant, bukan Decision Maker** — 4 pertanyaan wajib (Evidence/Assumption/Confidence/Consequence).
- **Empat Ketidaksamaan** — AI Insight ≠ Fact, Prediction ≠ Actual, Correlation ≠ Causation, Recommendation ≠ Decision.
- **Membaca Badge Klaim Analitik (AiMeta)** — replika badge AiMeta hidup per jenis klaim (Korelasi/Kausal/Prediksi/Rekomendasi) + cara membacanya.

## `/executive-guide/pertanyaan-eksekutif`
- Hero navy "Dashboard menjawab. Eksekutif bertanya." + intro Question Engine.
- **5 kartu situasi × 8 pertanyaan** — KPI bergerak, Risiko baru/naik, Rekomendasi AI muncul, Keputusan overdue, Forecast berubah; tiap kartu membawa contoh nyata dari dashboard (mis. "EBITDA +3,3% sementara volume −2,9%") supaya tidak abstrak; sumber `question-engine-data.ts`. Set "Rekomendasi AI" juga di-embed sebagai panel Executive Challenge di kartu AI Insight homepage.

## `/executive-guide/kasus-eksekutif`
- Hero navy "Today's Executive Case" — kasus dari data real dashboard (gap produksi Regional 4), bukan hipotetis.
- **Jawab Dulu, Baru Bandingkan** (`ExecutiveCase`, client) — learning mode: 5 pertanyaan reasoning (fakta → penyebab → dampak ekonomi → risiko terbesar → tindakan) dengan textarea per pertanyaan, jawaban tersimpan di localStorage, counter "N/5 dijawab"; tombol "Bandingkan dengan Executive Analysis" membuka analisis pembanding per pertanyaan (dirangkum dari alert, AI Insight, Impact Chain, People Capability); peringatan bila membuka jawaban sebelum semua terisi.
- **Aturan Mainnya** — 4 aturan latihan (buka bukti di dashboard dulu, tulis pendek, bandingkan, jawaban tersimpan untuk dibandingkan lintas waktu) + rujukan ke Executive Management Loop & Pertanyaan Eksekutif.

---

# 21b. Enterprise Map (`/enterprise-map`)

Menu di sidebar utama, kedua mode navigasi (grup atas, di bawah Executive Guide). "How the Enterprise Works" — PTPN sebagai satu sistem penciptaan nilai, bukan kumpulan dashboard per fungsi. Kerangka: Sidebar utama + ModuleHeader Tipe A. Semua angka node ditarik dari `group-baseline` (via `enterprise-map-data.ts`) sehingga tidak pernah beda dari modul yang dirujuk; tiap node klik menaut ke modulnya — map sekaligus navigasi alternatif.

- **Lingkungan Eksternal** — 4 chip kekuatan yang tidak dikendalikan PTPN tetapi menggerakkan rantai: Pasar (CPO spot vs ASP YTD), Regulasi (pungutan ekspor), Iklim (El Niño 62%), Kurs (USD/IDR spot).
- **Rantai Nilai Inti** — 9 node vertikal berpanah: Strategi (28 inisiatif · KPI 87,4) → Alokasi Kapital (capex 32,1% RKAP) → Operasi (64/67 pabrik · utilisasi PKS) → Produksi (CPO 0,99 jt ton · OER) → Penjualan & Pasar (Rp 19,9 T · ASP) → Pendapatan (Rp 24,6 T) → EBITDA (Rp 6,82 T · 27,7%) → Kas (Rp 7,9 T · leverage) → **Value Creation** (Rp 1,86 T netto, node aksen hijau); tiap node memuat metrik + satu kalimat peran sistemiknya.
- **Rail Enabler** (kiri) — People (70.142 · suksesi 68%) & Teknologi (68 aplikasi inti): memperkuat seluruh rantai.
- **Rail Control** (kanan) — Risiko (4 ekstrem), Tata Kelola (3 keputusan overdue), Hukum (eksposur Rp 4,2 T), ESG: menjaga nilai tidak bocor.
- **Cara Membaca Map Ini** — 3 catatan sistemik: gangguan hulu merambat ke hilir (contoh Regional 4 → Rp 374 M), enabler bekerja di semua node sekaligus (12 posisi kritikal kosong = risiko eksekusi lintas node), control layer menentukan nilai yang selamat (3 keputusan overdue menahan ± Rp 2,82 T).

---

# 22. Halaman Pendukung

## `/data-analytics`
- **Header** + **Data KPI Strip**.
- **Data Trust Index** — gauge/ringkasan indeks kepercayaan data.
- **Tren Data Trust Index** — line chart tren indeks.
- **Kelengkapan Data Berdasarkan Domain** — kelengkapan per domain data.
- **Sumber Data Terhubung (8 dari 18 sumber utama)** — status koneksi sumber data.
- **Data Anomaly Detection (30 Hari Terakhir)** — deteksi anomali data.
- **Perbandingan Kualitas Data per Unit Organisasi** — kualitas data per unit.
- **Rekonsiliasi Lintas Sistem** — status rekonsiliasi antar sistem.
- **Cakupan Elemen Data Kritis** — cakupan critical data elements.
- **DQ Incident Management** — pengelolaan insiden kualitas data.
- **Data-to-Decision Funnel (Q2 2026)** — funnel dari data ke keputusan.
- **Top 5 Insight dari Data** — insight teratas beserta confidence.
- **Data Governance Status** — status tata kelola data.

## `/data-dictionary`
- **Header Data Dictionary**.
- **Statistik Kamus Data (4 kartu)** — jumlah istilah, certified, trust index, terakhir diperbarui.
- **Kategori "Korporat & Nilai"** — 4 metrik korporat lintas dimensi masuk kamus: Value Creation YTD (formula driver−leakage + guard rekonsiliasi), Pendapatan Konsolidasi, EBITDA, ASP CPO (eksplisit "bukan harga spot"; spot KPBN dilaporkan terpisah) — semuanya dengan certifier, sign-off, dan catatan validasi.
- **Katalog Istilah & Metrik** — tabel katalog istilah/metrik dengan badge status Certified; entri Certified membawa mekanisme sertifikasi (certifier, tanggal sign-off, catatan validasi/rekonsiliasi) yang juga tampil di popover ⓘ MetricInfo.
- **Kategori Metrik** — daftar kategori metrik di rail kanan + strip catatan.

## `/scenario-simulation`
- **Header Strategic Scenario Simulator** + **SS KPI Strip**.
- **Pilih & Kelola Skenario** — daftar skenario dengan badge Aktif/Draft dan tombol tambah.
- **Perbandingan Dampak Utama** — perbandingan dampak antar skenario.
- **Proyeksi Headcount (2026–2028)** — chart proyeksi headcount per skenario.
- **Asumsi Skenario Terpilih** — daftar asumsi skenario aktif.
- **Dampak Finansial (2026–2028)** — proyeksi dampak finansial.
- **Dampak Talent Summary (2028)** — ringkasan dampak terhadap talenta.
- **Value Creation Bridge** — waterfall penciptaan nilai.
- **ROI Sensitivity (Tornado)** — tornado chart sensitivitas ROI.
- **Range of Outcomes (P10-P90)** — rentang hasil probabilistik.
- **Execution Feasibility** — penilaian kelayakan eksekusi.
- **Stress Scenario** — hasil uji skenario tekanan.
- **Goal Seek — Reverse Scenario** — panel goal seek/reverse simulation.
- **BOD Scenario Decision Center** — item keputusan skenario untuk BOD.
- **Insight & Rekomendasi** — narasi insight skenario.
- **Next Best Action** — rekomendasi aksi berikutnya.
- **Model Confidence & Risk** — tingkat keyakinan model dan risikonya + strip catatan metodologi.

---

# Elemen UI Global

- Sidebar navigasi (utama, SdmSidebar, DimensionSidebar per dimensi); sidebar utama punya toggle dua mode: **CEO** (tujuh pintu: Overview, Keputusan, Nilai, Risiko, Strategi, Talenta, Pasar — menunjuk halaman eksisting) vs **Fungsional** (struktur dimensi lengkap), tersimpan di localStorage.
- Header standar modul (ModuleHeader) dengan filter Periode dan Subholding/Level Organisasi; identitas pengguna = Denaldy Mulino Mauna, Direktur Utama, dengan foto resmi dari ptpn.id (aset lokal `public/direktur-utama-avatar.png`, crop dari `public/direktur-utama.png`).
- Live Feed / marquee informasi berjalan — label "MARKET PULSE · PER 14 AGU"; tiap instrumen berlabel basis harga (YTD Avg / Spot); marquee, maskot, dan ukuran bar tetap.
- Maskot robot.
- Avatar karyawan (PersonAvatar) — pasfoto profesional gaya kantoran berwajah Indonesia/Asia, AI-generated (bukan orang nyata, sumber dataset 100k-faces/generated.photos), dari pool lokal `public/avatars/` (13 pria + 13 wanita, 256px); gender foto diturunkan dari nama via heuristik nama Indonesia (`avatar-gender.ts`); indeks foto = (seed × 7) mod 13 — 13 prima & coprima siklus 24 nama depan direktori sehingga karyawan bernama depan sama selalu dapat foto berbeda; gender direktori juga diturunkan dari nama; fallback ilustrasi SVG.
- Toggle tema (terang/gelap).
- Logo PTPN.
- Dukungan PWA (service worker).
