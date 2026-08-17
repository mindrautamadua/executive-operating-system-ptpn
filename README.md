# Executive Operating System — PTPN Group

Mockup dashboard BOD PTPN Group, dibangun ulang dari `referensi-mockup/dashboard-utama.png`.

## Teknologi

- Next.js 15 (App Router) + TypeScript
- Tailwind CSS
- Recharts (bar / line / donut)
- lucide-react (ikon)
- SVG buatan sendiri untuk logo PTPN, peta Indonesia, thumbnail berita, avatar, dan maskot AI

## Menjalankan

```bash
npm install
npm run dev      # http://localhost:3100
npm run build && npm start
```

Layout dirancang untuk viewport lebar (minimal 1360px), sesuai dengan mockup 1536×1050.

## Struktur

```
src/
  app/
    layout.tsx          # font Inter + metadata
    page.tsx            # komposisi grid seluruh dashboard
    globals.css         # token warna, kelas .card, scrollbar tipis
  components/
    Sidebar.tsx             # brand, navigasi 9 menu, kartu promo PTPN 4.0
    Header.tsx              # judul, refresh, fullscreen, tanggal, selector, profil
    TabBar.tsx              # 8 tab perspektif (Strategi & Kinerja s.d. Risiko)
    KpiStrip.tsx            # 7 KPI utama + sparkline, dapat digeser
    OperasionalCard.tsx     # metrik operasional real-time
    KomoditasUtama.tsx      # harga komoditas per regional
    IndonesiaMap.tsx        # peta sebaran aset + legenda + efek cahaya
    KinerjaRegional.tsx     # mini peta berwarna + tabel pendapatan regional
    AlertPanel.tsx          # alert & notifikasi strategis
    InisiatifStrategis.tsx  # progress bar inisiatif
    BeritaInformasi.tsx     # daftar berita
    TrendKeuangan.tsx       # bar bertumpuk + garis (Pendapatan/EBITDA/Laba Bersih)
    KomposisiPenjualan.tsx  # donut komposisi penjualan
    KinerjaProduksi.tsx     # KPI produksi + multi-line chart
    KinerjaSdm.tsx          # KPI SDM + donut komposisi karyawan
    KpiStrategis.tsx        # 5 KPI strategis
    AnalitikPrediktif.tsx   # 3 proyeksi + sparkline
    AiInsight.tsx           # rekomendasi AI + maskot
    LiveFeed.tsx            # ticker harga berjalan
    ui/Sparkline.tsx        # sparkline SVG (kurva Catmull-Rom)
    ui/Delta.tsx            # indikator naik/turun
  lib/
    data.ts             # seluruh data mockup
    indonesia.ts        # path SVG kepulauan Indonesia + titik fasilitas
```

## Catatan

Seluruh angka bersifat statis (mockup). Untuk menghubungkan ke data nyata, ganti isi
`src/lib/data.ts` dengan pemanggilan API atau server component yang mengambil data.
