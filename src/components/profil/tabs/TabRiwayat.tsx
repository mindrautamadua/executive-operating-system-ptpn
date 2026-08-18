import Link from "next/link";
import { ArrowRight, Briefcase, FileBadge, GraduationCap, Trophy } from "lucide-react";
import {
  informasiKepegawaianTambahan,
  penghargaan,
  riwayatJabatanLengkap,
  riwayatMutasiPenugasan,
  riwayatPelatihanSertifikasi,
  riwayatPendidikanLengkap,
  riwayatPenilaian,
  riwayatPerubahanData,
} from "@/lib/profil-data";

const RATING_TONE: Record<string, string> = {
  "Sangat Baik": "tone-green",
  Baik: "tone-lime",
  Cukup: "tone-amber",
};

function LinkMore({ label, href }: { label: string; href?: string }) {
  const cls = "link-more inline-flex items-center gap-1";
  return (
    <div className="mt-auto pt-2.5">
      {href ? (
        <Link href={href} className={cls}>
          {label} <ArrowRight size={11} />
        </Link>
      ) : (
        <button className={cls}>
          {label} <ArrowRight size={11} />
        </button>
      )}
    </div>
  );
}

/* ── Riwayat Jabatan ────────────────────────────────────── */

function RiwayatJabatanCard() {
  return (
    <div className="card flex flex-col px-4 pb-3.5 pt-3.5">
      <h3 className="text-[11px] font-bold text-ink-900">Riwayat Jabatan</h3>
      <div className="mt-2.5 min-h-0 flex-1">
        {riwayatJabatanLengkap.map((r, i) => (
          <div key={r.jabatan} className="relative flex gap-3">
            <div className="flex w-[22px] shrink-0 flex-col items-center">
              <span
                className={`z-10 flex h-[22px] w-[22px] items-center justify-center rounded-full border ${
                  r.aktif ? "border-ptpn-green bg-ptpn-greenLight" : "border-[#e3e9ef] bg-white"
                }`}
              >
                <Briefcase
                  size={10}
                  className={r.aktif ? "text-ptpn-green" : "text-ink-400"}
                  strokeWidth={1.8}
                />
              </span>
              {i < riwayatJabatanLengkap.length - 1 && <span className="w-px flex-1 bg-[#e9eef3]" />}
            </div>
            <div
              className={`flex min-w-0 flex-1 items-start justify-between gap-3 pt-[2px] ${
                i < riwayatJabatanLengkap.length - 1 ? "mb-3 border-b border-[#f2f5f8] pb-3" : ""
              }`}
            >
              <div className="min-w-0 leading-tight">
                <div className="text-[10.5px] font-bold text-ink-900">{r.jabatan}</div>
                <div className="mt-[3px] text-[9px] text-ink-500">{r.unit}</div>
              </div>
              <div className="shrink-0 text-right leading-tight">
                <div className="text-[9px] text-ink-500">{r.periode}</div>
                <div className="mt-[3px] text-[8.5px] font-semibold text-ptpn-greenDark">{r.durasi}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <LinkMore label="Lihat semua riwayat jabatan" href="/sdm-talenta/profil-karyawan/riwayat-jabatan" />
    </div>
  );
}

/* ── Riwayat Pendidikan ─────────────────────────────────── */

function RiwayatPendidikanCard() {
  return (
    <div className="card flex flex-col px-4 pb-3.5 pt-3.5">
      <h3 className="text-[11px] font-bold text-ink-900">Riwayat Pendidikan</h3>
      <div className="mt-2.5 min-h-0 flex-1">
        {riwayatPendidikanLengkap.map((p, i) => (
          <div key={p.jenjang} className="relative flex gap-3">
            <div className="flex w-[22px] shrink-0 flex-col items-center">
              {i === 0 ? (
                <span className="z-10 flex h-[22px] w-[22px] items-center justify-center rounded-full bg-[#e8f0fe]">
                  <GraduationCap size={11} className="text-[#3b7ded]" strokeWidth={1.8} />
                </span>
              ) : (
                <span className="z-10 my-[5px] flex h-[12px] w-[12px] items-center justify-center rounded-full border border-[#e3e9ef] bg-white">
                  <span className="h-[4px] w-[4px] rounded-full bg-[#c6cfd8]" />
                </span>
              )}
              {i < riwayatPendidikanLengkap.length - 1 && (
                <span className="w-px flex-1 bg-[#e9eef3]" />
              )}
            </div>
            <div
              className={`flex min-w-0 flex-1 items-start justify-between gap-3 pt-[2px] ${
                i < riwayatPendidikanLengkap.length - 1
                  ? "mb-3 border-b border-[#f2f5f8] pb-3"
                  : ""
              }`}
            >
              <div className="min-w-0 leading-tight">
                <div className="text-[10.5px] font-bold text-ink-900">{p.jenjang}</div>
                {p.institusi && <div className="mt-[3px] text-[9px] text-ink-500">{p.institusi}</div>}
                {p.ipk && (
                  <span className="mt-1.5 inline-block rounded-md border border-[#e3e9ef] bg-[#f7f9fb] px-2 py-[3px] text-[8.5px] font-semibold text-ink-700">
                    {p.ipk}
                  </span>
                )}
              </div>
              <div className="shrink-0 text-right leading-tight">
                <div className="text-[9px] text-ink-500">{p.periode}</div>
                <span className="mt-1 inline-block rounded-md bg-[#e8f7ef] px-2 py-[2px] text-[9px] font-semibold text-[#16a34a]">
                  Selesai
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
      <LinkMore label="Lihat semua riwayat pendidikan" href="/sdm-talenta/profil-karyawan/riwayat-pendidikan" />
    </div>
  );
}

/* ── Riwayat Pelatihan & Sertifikasi ────────────────────── */

function PelatihanSertifikasiCard() {
  return (
    <div className="card flex flex-col px-4 pb-3.5 pt-3.5">
      <h3 className="text-[11px] font-bold text-ink-900">Riwayat Pelatihan &amp; Sertifikasi</h3>
      <div className="min-h-0 flex-1 divide-y divide-[#f6f8fa] pt-1">
        {riwayatPelatihanSertifikasi.map((p) => (
          <div key={p.nama} className="flex items-center gap-2.5 py-[9px]">
            <span className="flex h-[28px] w-[28px] shrink-0 items-center justify-center rounded-lg bg-ptpn-greenLight text-ptpn-green">
              <FileBadge size={13} />
            </span>
            <div className="min-w-0 flex-1 leading-tight">
              <div className="text-[9.5px] font-bold text-ink-900">{p.nama}</div>
              <div className="mt-[2px] text-[8.5px] text-ink-500">{p.penyelenggara}</div>
            </div>
            <span className="shrink-0 text-[9px] text-ink-500">{p.tanggal}</span>
            <span className="shrink-0 rounded-md bg-[#e8f7ef] px-2 py-[3px] text-[8.5px] font-semibold text-[#16a34a]">
              Sertifikat
            </span>
          </div>
        ))}
      </div>
      <LinkMore label="Lihat semua pelatihan & sertifikasi" href="/sdm-talenta/profil-karyawan/pelatihan-sertifikasi" />
    </div>
  );
}

/* ── Riwayat Penilaian Kinerja ──────────────────────────── */

function PenilaianKinerjaCard() {
  return (
    <div className="card flex flex-col px-4 pb-3.5 pt-3.5">
      <h3 className="text-[11px] font-bold text-ink-900">Riwayat Penilaian Kinerja</h3>
      <table className="mt-2.5 w-full">
        <thead>
          <tr className="border-b border-[#eef2f6] text-left text-[8.5px] font-semibold uppercase tracking-[0.05em] text-ink-400">
            <th className="pb-1.5 pr-2 font-semibold">Tahun</th>
            <th className="pb-1.5 pr-2 font-semibold">Periode</th>
            <th className="pb-1.5 pr-2 font-semibold">Skor Akhir</th>
            <th className="pb-1.5 pr-2 font-semibold">Rating</th>
            <th className="pb-1.5 font-semibold">Atasan Penilai</th>
          </tr>
        </thead>
        <tbody>
          {riwayatPenilaian.map((r) => {
            const tone = RATING_TONE[r.rating] ?? RATING_TONE.Cukup;
            return (
              <tr key={r.tahun} className="border-b border-[#f6f8fa] last:border-0">
                <td className="py-2 pr-2 text-[9.5px] font-bold text-ink-900">{r.tahun}</td>
                <td className="py-2 pr-2 text-[9.5px] text-ink-700">{r.periode}</td>
                <td className="py-2 pr-2 text-[9.5px] font-bold text-ink-900">{r.skor}</td>
                <td className="py-2 pr-2">
                  <span
                    className={`whitespace-nowrap rounded-md px-2 py-[3px] text-[8.5px] font-semibold ${tone}`}
                  >
                    {r.rating}
                  </span>
                </td>
                <td className="py-2 text-[9.5px] text-ink-700">{r.atasan}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <LinkMore label="Lihat semua riwayat kinerja" href="/sdm-talenta/profil-karyawan/kinerja" />
    </div>
  );
}

/* ── Riwayat Penghargaan ────────────────────────────────── */

function PenghargaanCard() {
  return (
    <div className="card flex flex-col px-4 pb-3.5 pt-3.5">
      <h3 className="text-[11px] font-bold text-ink-900">Riwayat Penghargaan</h3>
      <div className="min-h-0 flex-1 divide-y divide-[#f6f8fa] pt-1">
        {penghargaan.map((p) => (
          <div key={p.nama} className="flex items-center gap-2.5 py-[9px]">
            <span className="flex h-[28px] w-[28px] shrink-0 items-center justify-center rounded-full bg-[#fef4e3] text-[#f5a524]">
              <Trophy size={13} strokeWidth={1.8} />
            </span>
            <div className="min-w-0 flex-1 leading-tight">
              <div className="text-[9.5px] font-bold text-ink-900">{p.nama}</div>
              <div className="mt-[2px] text-[8.5px] text-ink-500">{p.unit}</div>
            </div>
            <span className="shrink-0 text-[9px] text-ink-500">{p.tahun}</span>
          </div>
        ))}
      </div>
      <LinkMore label="Lihat semua penghargaan" href="/sdm-talenta/profil-karyawan/penghargaan" />
    </div>
  );
}

/* ── Riwayat Mutasi & Penugasan ─────────────────────────── */

function MutasiPenugasanCard() {
  return (
    <div className="card flex flex-col px-4 pb-3.5 pt-3.5">
      <h3 className="text-[11px] font-bold text-ink-900">Riwayat Mutasi &amp; Penugasan</h3>
      <table className="mt-2.5 w-full">
        <thead>
          <tr className="border-b border-[#eef2f6] text-left text-[8.5px] font-semibold uppercase tracking-[0.05em] text-ink-400">
            <th className="pb-1.5 pr-2 font-semibold">Jenis</th>
            <th className="pb-1.5 pr-2 font-semibold">Deskripsi</th>
            <th className="pb-1.5 text-right font-semibold">Tanggal</th>
          </tr>
        </thead>
        <tbody>
          {riwayatMutasiPenugasan.map((m) => (
            <tr key={m.deskripsi} className="border-b border-[#f6f8fa] last:border-0">
              <td className="py-2 pr-2 align-top text-[9.5px] font-semibold text-ink-900">{m.jenis}</td>
              <td className="py-2 pr-2 leading-tight">
                <div className="text-[9.5px] text-ink-700">{m.deskripsi}</div>
                {m.sub && <div className="mt-[2px] text-[9px] text-ink-500">{m.sub}</div>}
              </td>
              <td className="py-2 text-right align-top text-[9.5px] text-ink-700">{m.tanggal}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <LinkMore label="Lihat semua mutasi & penugasan" href="/sdm-talenta/profil-karyawan/mutasi-penugasan" />
    </div>
  );
}

/* ── Riwayat Perubahan Data Kepegawaian ─────────────────── */

function PerubahanDataCard() {
  return (
    <div className="card flex flex-col px-4 pb-3.5 pt-3.5">
      <h3 className="text-[11px] font-bold text-ink-900">Riwayat Perubahan Data Kepegawaian</h3>
      <table className="mt-2.5 w-full">
        <thead>
          <tr className="border-b border-[#eef2f6] text-left text-[8.5px] font-semibold uppercase tracking-[0.05em] text-ink-400">
            <th className="pb-1.5 pr-2 font-semibold">Perubahan</th>
            <th className="pb-1.5 pr-2 font-semibold">Dari</th>
            <th className="pb-1.5 pr-2 font-semibold">Menjadi</th>
            <th className="pb-1.5 pr-2 font-semibold">Tipe Perubahan</th>
            <th className="pb-1.5 pr-2 font-semibold">Tanggal Efektif</th>
            <th className="pb-1.5 font-semibold">Diubah Oleh</th>
          </tr>
        </thead>
        <tbody>
          {riwayatPerubahanData.map((r) => (
            <tr key={r.perubahan} className="border-b border-[#f6f8fa] last:border-0">
              <td className="py-2 pr-2 text-[9.5px] font-semibold text-ink-900">{r.perubahan}</td>
              <td className="py-2 pr-2 text-[9.5px] text-ink-700">{r.dari}</td>
              <td className="py-2 pr-2 text-[9.5px] text-ink-700">{r.menjadi}</td>
              <td className="py-2 pr-2 text-[9.5px] text-ink-700">{r.tipe}</td>
              <td className="py-2 pr-2 text-[9.5px] text-ink-700">{r.tanggal}</td>
              <td className="py-2 text-[9.5px] text-ink-700">{r.oleh}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <LinkMore label="Lihat semua perubahan data" href="/sdm-talenta/profil-karyawan/perubahan-data" />
    </div>
  );
}

/* ── Informasi Tambahan ─────────────────────────────────── */

function InformasiTambahanCard() {
  return (
    <div className="card flex flex-col px-4 pb-3.5 pt-3.5">
      <h3 className="text-[11px] font-bold text-ink-900">Informasi Tambahan</h3>
      <div className="min-h-0 flex-1 divide-y divide-[#f6f8fa] pt-1">
        {informasiKepegawaianTambahan.map((r) => (
          <div key={r.label} className="flex items-center justify-between gap-3 py-[9px]">
            <span className="text-[9.5px] text-ink-500">{r.label}</span>
            <span className="text-right text-[9.5px] font-semibold text-ink-900">{r.value}</span>
          </div>
        ))}
      </div>
      <LinkMore label="Lihat detail informasi pribadi" />
    </div>
  );
}

/* ── Layout ─────────────────────────────────────────────── */

export function TabRiwayat() {
  return (
    <div className="space-y-3">
      <div className="grid grid-cols-[minmax(0,500fr)_minmax(0,470fr)_minmax(0,560fr)] gap-3">
        <RiwayatJabatanCard />
        <RiwayatPendidikanCard />
        <PelatihanSertifikasiCard />
      </div>
      <div className="grid grid-cols-[minmax(0,600fr)_minmax(0,430fr)_minmax(0,500fr)] gap-3">
        <PenilaianKinerjaCard />
        <PenghargaanCard />
        <MutasiPenugasanCard />
      </div>
      <div className="grid grid-cols-[minmax(0,1020fr)_minmax(0,510fr)] gap-3">
        <PerubahanDataCard />
        <InformasiTambahanCard />
      </div>
    </div>
  );
}
