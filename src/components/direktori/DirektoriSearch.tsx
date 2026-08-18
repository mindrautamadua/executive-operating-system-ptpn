"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  RotateCcw,
  Search,
  Users,
} from "lucide-react";
import { PersonAvatar } from "@/components/ui/PersonAvatar";
import {
  FUNGSI_OPTIONS,
  JOB_GRADE_OPTIONS,
  PERSON_GRADE_OPTIONS,
  LOKASI_OPTIONS,
  STATUS_OPTIONS,
  TALENT_OPTIONS,
  TALENT_STYLE,
  UNIT_OPTIONS,
  karyawanList,
  type Karyawan,
} from "@/lib/direktori-karyawan";

const PAGE_SIZE = 10;

/** Semua profil masih mengarah ke halaman spotlight (data profil tunggal). */
const PROFIL_HREF = "/sdm-talenta/profil-karyawan";

type SortKey = "nama" | "kinerja" | "masaKerja" | "personGrade" | "jobGrade";

function Select({
  value,
  onChange,
  options,
  allLabel,
}: {
  value: string;
  onChange: (v: string) => void;
  options: readonly string[];
  allLabel: string;
}) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full cursor-pointer rounded-lg border border-[#e3e9ef] bg-white px-2.5 py-[7px] text-[9.5px] font-semibold text-ink-700 outline-none focus:border-ptpn-green"
    >
      <option value="">{allLabel}</option>
      {options.map((o) => (
        <option key={o} value={o}>
          {o}
        </option>
      ))}
    </select>
  );
}

/** Direktori karyawan: pencarian teks bebas + filter + tabel hasil berhalaman. */
export function DirektoriSearch() {
  const [query, setQuery] = useState("");
  const [unit, setUnit] = useState("");
  const [lokasi, setLokasi] = useState("");
  const [fungsi, setFungsi] = useState("");
  const [personGrade, setPersonGrade] = useState("");
  const [jobGrade, setJobGrade] = useState("");
  const [status, setStatus] = useState("");
  const [talent, setTalent] = useState("");
  const [sort, setSort] = useState<SortKey>("nama");
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const hasil = karyawanList.filter((k) => {
      if (
        q &&
        ![k.nama, k.nik, k.id, k.jabatan, k.unit, k.lokasi, k.fungsi, k.email].some((f) =>
          f.toLowerCase().includes(q),
        )
      )
        return false;
      if (unit && k.unit !== unit) return false;
      if (lokasi && k.lokasi !== lokasi) return false;
      if (fungsi && k.fungsi !== fungsi) return false;
      if (personGrade && k.personGrade !== personGrade) return false;
      if (jobGrade && k.jobGrade !== jobGrade) return false;
      if (status && k.status !== status) return false;
      if (talent && k.talent !== talent) return false;
      return true;
    });

    return [...hasil].sort((a, b) => {
      if (sort === "kinerja") return b.kinerja - a.kinerja;
      if (sort === "masaKerja") return b.masaKerja - a.masaKerja;
      if (sort === "personGrade")
        return b.personGrade.localeCompare(a.personGrade) || a.nama.localeCompare(b.nama);
      if (sort === "jobGrade")
        return b.jobGrade.localeCompare(a.jobGrade) || a.nama.localeCompare(b.nama);
      return a.nama.localeCompare(b.nama);
    });
  }, [query, unit, lokasi, fungsi, personGrade, jobGrade, status, talent, sort]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const current = Math.min(page, totalPages);
  const rows = filtered.slice((current - 1) * PAGE_SIZE, current * PAGE_SIZE);

  /** Setiap perubahan filter mengembalikan tampilan ke halaman pertama. */
  function ubah<T>(setter: (v: T) => void) {
    return (v: T) => {
      setter(v);
      setPage(1);
    };
  }

  function reset() {
    setQuery("");
    setUnit("");
    setLokasi("");
    setFungsi("");
    setPersonGrade("");
    setJobGrade("");
    setStatus("");
    setTalent("");
    setSort("nama");
    setPage(1);
  }

  return (
    <div className="card anim-rise flex min-w-0 flex-col px-4 pb-3 pt-3">
      {/* baris pencarian utama */}
      <div className="grid grid-cols-[minmax(0,1fr)_170px_150px_auto] items-center gap-2">
        <label className="flex items-center gap-1.5 rounded-lg border border-[#e3e9ef] bg-white px-2.5 py-[7px] focus-within:border-ptpn-green">
          <Search size={12} className="shrink-0 text-ink-400" />
          <input
            value={query}
            onChange={(e) => ubah(setQuery)(e.target.value)}
            placeholder="Cari nama, NIK, jabatan, unit, lokasi, atau email..."
            className="min-w-0 flex-1 bg-transparent text-[9.5px] text-ink-700 outline-none placeholder:text-ink-400"
          />
        </label>
        <Select
          value={unit}
          onChange={ubah(setUnit)}
          options={UNIT_OPTIONS}
          allLabel="Semua Unit"
        />
        <Select
          value={lokasi}
          onChange={ubah(setLokasi)}
          options={LOKASI_OPTIONS}
          allLabel="Semua Lokasi"
        />
        <button
          onClick={reset}
          className="flex items-center gap-1.5 rounded-lg border border-[#e3e9ef] px-3 py-[7px] text-[9.5px] font-semibold text-ink-700 transition-colors hover:bg-[#f5f8fa]"
        >
          <RotateCcw size={11} />
          Reset
        </button>
      </div>

      {/* filter lanjutan */}
      <div className="mt-2 grid grid-cols-[minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)] gap-2">
        <Select
          value={fungsi}
          onChange={ubah(setFungsi)}
          options={FUNGSI_OPTIONS}
          allLabel="Semua Fungsi"
        />
        <Select
          value={personGrade}
          onChange={ubah(setPersonGrade)}
          options={PERSON_GRADE_OPTIONS}
          allLabel="Semua Person Grade"
        />
        <Select
          value={jobGrade}
          onChange={ubah(setJobGrade)}
          options={JOB_GRADE_OPTIONS}
          allLabel="Semua Job Grade"
        />
        <Select
          value={status}
          onChange={ubah(setStatus)}
          options={STATUS_OPTIONS}
          allLabel="Semua Status"
        />
        <Select
          value={talent}
          onChange={ubah(setTalent)}
          options={TALENT_OPTIONS}
          allLabel="Semua Kategori Talenta"
        />
        <select
          value={sort}
          onChange={(e) => ubah(setSort)(e.target.value as SortKey)}
          className="w-full cursor-pointer rounded-lg border border-[#e3e9ef] bg-white px-2.5 py-[7px] text-[9.5px] font-semibold text-ink-700 outline-none focus:border-ptpn-green"
        >
          <option value="nama">Urut: Nama (A–Z)</option>
          <option value="kinerja">Urut: Kinerja Tertinggi</option>
          <option value="masaKerja">Urut: Masa Kerja Terlama</option>
          <option value="personGrade">Urut: Person Grade Tertinggi</option>
          <option value="jobGrade">Urut: Job Grade Tertinggi</option>
        </select>
      </div>

      {/* tabel hasil */}
      <div className="scroll-thin mt-2.5 min-w-0 overflow-x-auto">
        <table className="w-full min-w-[1160px] border-collapse">
          <thead>
            <tr className="border-b border-[#eef2f6] text-ink-500">
              {[
                ["Karyawan", "left"],
                ["NIK", "left"],
                ["Jabatan", "left"],
                ["Fungsi", "left"],
                ["Unit", "left"],
                ["Lokasi Kerja", "left"],
                ["Person Grade", "center"],
                ["Job Grade", "center"],
                ["Status", "left"],
                ["Masa Kerja", "right"],
                ["Kinerja", "center"],
                ["Kategori Talenta", "left"],
                ["Profil", "center"],
              ].map(([h, align]) => (
                <th
                  key={h}
                  className={`px-2 pb-1.5 text-[9px] font-bold ${
                    align === "center" ? "text-center" : align === "right" ? "text-right" : "text-left"
                  }`}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((k: Karyawan) => (
              <tr key={k.id} className="border-b border-[#f3f6f9] hover:bg-[#f8fbfd]">
                <td className="max-w-[210px] px-2 py-[7px]">
                  <div className="flex items-center gap-2">
                    <PersonAvatar seed={k.seed} size={26} name={k.nama} />
                    <span className="min-w-0">
                      <span className="block truncate text-[9.5px] font-semibold text-ink-900" title={k.nama}>
                        {k.nama}
                      </span>
                      <span className="block truncate text-[9px] text-ink-500" title={k.email}>
                        {k.id} · {k.email}
                      </span>
                    </span>
                  </div>
                </td>
                <td className="whitespace-nowrap px-2 py-[7px] text-[9px] text-ink-500">{k.nik}</td>
                <td className="max-w-[160px] px-2 py-[7px]">
                  <span className="block truncate text-[9.5px] font-semibold text-ink-700" title={k.jabatan}>
                    {k.jabatan}
                  </span>
                </td>
                <td className="whitespace-nowrap px-2 py-[7px] text-[9px] text-ink-500">{k.fungsi}</td>
                <td className="whitespace-nowrap px-2 py-[7px] text-[9px] text-ink-500">{k.unit}</td>
                <td className="whitespace-nowrap px-2 py-[7px] text-[9px] text-ink-500">{k.lokasi}</td>
                <td className="px-2 py-[7px] text-center text-[9.5px] font-bold text-ink-900">
                  {k.personGrade}
                </td>
                <td className="px-2 py-[7px] text-center text-[9.5px] font-bold text-ink-700">
                  {k.jobGrade}
                </td>
                <td className="whitespace-nowrap px-2 py-[7px] text-[9px] text-ink-500">{k.status}</td>
                <td className="whitespace-nowrap px-2 py-[7px] text-right text-[9px] text-ink-700">
                  {k.masaKerja} thn
                </td>
                <td className="px-2 py-[7px] text-center text-[10px] font-extrabold text-ink-900">
                  {k.kinerja.toFixed(1)}
                </td>
                <td className="whitespace-nowrap px-2 py-[7px]">
                  <span
                    className={`inline-flex rounded-md px-1.5 py-[2px] text-[8.5px] font-bold ${TALENT_STYLE[k.talent]}`}
                  >
                    {k.talent}
                  </span>
                </td>
                <td className="px-2 py-[7px] text-center">
                  <Link
                    href={PROFIL_HREF}
                    className="inline-flex items-center gap-1 rounded-lg border border-[#e3e9ef] px-2 py-[3px] text-[9px] font-semibold text-ptpn-green transition-colors hover:bg-ptpn-greenLight"
                  >
                    Buka
                    <ArrowRight size={10} />
                  </Link>
                </td>
              </tr>
            ))}

            {rows.length === 0 && (
              <tr>
                <td colSpan={13} className="px-2 py-8 text-center">
                  <Users size={20} className="mx-auto text-ink-300" />
                  <div className="mt-2 text-[10px] font-semibold text-ink-700">
                    Tidak ada karyawan yang cocok
                  </div>
                  <div className="mt-[2px] text-[9px] text-ink-500">
                    Ubah kata kunci pencarian atau bersihkan filter.
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* navigasi halaman */}
      <div className="mt-2.5 flex items-center justify-between border-t border-[#f0f3f6] pt-2.5">
        <span className="text-[9px] text-ink-500">
          Menampilkan{" "}
          <span className="font-bold text-ink-900">
            {filtered.length === 0 ? 0 : (current - 1) * PAGE_SIZE + 1}–
            {Math.min(current * PAGE_SIZE, filtered.length)}
          </span>{" "}
          dari <span className="font-bold text-ink-900">{filtered.length}</span> karyawan
        </span>

        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setPage(Math.max(1, current - 1))}
            disabled={current === 1}
            className="flex h-[24px] w-[24px] items-center justify-center rounded-lg border border-[#e3e9ef] text-ink-500 transition-colors hover:bg-[#f5f8fa] disabled:opacity-40"
            aria-label="Halaman sebelumnya"
          >
            <ChevronLeft size={12} />
          </button>
          <span className="text-[9px] font-semibold text-ink-700">
            {current} / {totalPages}
          </span>
          <button
            onClick={() => setPage(Math.min(totalPages, current + 1))}
            disabled={current === totalPages}
            className="flex h-[24px] w-[24px] items-center justify-center rounded-lg border border-[#e3e9ef] text-ink-500 transition-colors hover:bg-[#f5f8fa] disabled:opacity-40"
            aria-label="Halaman berikutnya"
          >
            <ChevronRight size={12} />
          </button>
        </div>
      </div>
    </div>
  );
}
