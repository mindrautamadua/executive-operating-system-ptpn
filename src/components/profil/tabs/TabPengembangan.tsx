import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  Briefcase,
  CalendarClock,
  ClipboardList,
  Clock3,
  Crown,
  FileBadge,
  GraduationCap,
  Info,
  LineChart,
  Presentation,
  Settings2,
  ShieldCheck,
  Sprout,
  TrendingUp,
  User,
  Users,
} from "lucide-react";
import {
  catatanPengembangan,
  fokusPengembangan,
  idpAktif,
  jalurKarier,
  rekomendasiPelatihan,
  ringkasanPengembangan,
  riwayatPelatihan,
  sertifikasiDimiliki,
  skillsGap,
} from "@/lib/profil-data";

const RINGKASAN_IKON: Record<string, typeof GraduationCap> = {
  graduation: GraduationCap,
  clock: Clock3,
  fileBadge: FileBadge,
  clipboard: ClipboardList,
  trendingUp: TrendingUp,
};

const IDP_IKON: Record<string, typeof Users> = {
  users: Users,
  chart: LineChart,
  settings: Settings2,
};

const REKOMENDASI_IKON: Record<string, typeof Presentation> = {
  presentation: Presentation,
  barChart: BarChart3,
  sprout: Sprout,
};

const KARIER_IKON: Record<string, typeof User> = {
  user: User,
  shield: ShieldCheck,
  briefcase: Briefcase,
  crown: Crown,
};

const STATUS_SERTIFIKASI: Record<string, string> = {
  Aktif: "tone-green",
  Kadaluarsa: "tone-red",
};

const LEVEL_REKOMENDASI: Record<string, string> = {
  Pemula: "tone-blue",
  Menengah: "tone-green",
  Lanjutan: "tone-amber",
};

/* Kelas kartu + warna teks aksen per tone jalur karier (pasangan gelap di globals.css). */
const KARIER_TONE: Record<string, { card: string; text: string }> = {
  blue: { card: "career-blue", text: "text-[#3b7ded]" },
  green: { card: "career-green", text: "text-[#16a34a]" },
  amber: { card: "career-amber", text: "text-[#d97706]" },
  purple: { card: "career-purple", text: "text-[#8b5cf6]" },
};

function warnaLevel(level: number) {
  if (level <= 2) return "#ef4444";
  if (level === 3) return "#f59e0b";
  return "#16a34a";
}

/* ── Ringkasan Pengembangan ─────────────────────────────── */

function DonutIndeks() {
  const size = 124;
  const stroke = 13;
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  return (
    <div className="relative shrink-0" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#e9ebfa" strokeWidth={stroke} />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="#6c72e8"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={`${(c * ringkasanPengembangan.indeks) / 100} ${c}`}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center leading-none">
        <span className="text-[24px] font-extrabold text-ink-900">
          {ringkasanPengembangan.indeks}
          <span className="text-[11px] font-bold text-ink-400">%</span>
        </span>
        <span className="mt-1.5 max-w-[80px] text-center text-[9px] leading-[1.3] text-ink-500">
          Indeks Pengembangan
        </span>
      </div>
    </div>
  );
}

function RingkasanCard() {
  return (
    <div className="card flex flex-col px-4 pb-4 pt-3.5">
      <h3 className="text-[11px] font-bold text-ink-900">Ringkasan Pengembangan</h3>
      <div className="flex min-h-0 flex-1 items-center gap-4 py-3">
        <DonutIndeks />
        <div className="min-w-0 flex-1 space-y-2.5">
          {ringkasanPengembangan.items.map((it) => {
            const Ikon = RINGKASAN_IKON[it.icon] ?? GraduationCap;
            return (
              <div key={it.label} className="flex items-center gap-2">
                <span className="flex h-[20px] w-[20px] shrink-0 items-center justify-center rounded-md bg-[#f2f6fa] text-ink-500">
                  <Ikon size={10.5} strokeWidth={1.9} />
                </span>
                <span className="min-w-0 flex-1 truncate text-[9.5px] text-ink-700">{it.label}</span>
                <span className="shrink-0 text-[10px] font-bold text-ink-900">{it.value}</span>
              </div>
            );
          })}
        </div>
      </div>
      <button className="w-full rounded-lg border border-[#e3e9ef] py-[7px] text-[10px] font-semibold text-ink-700 transition-colors hover:bg-[#f5f8fa]">
        Lihat Detail Pengembangan
      </button>
    </div>
  );
}

/* ── Rencana Pengembangan (IDP Aktif) ───────────────────── */

function IdpAktifCard() {
  return (
    <div className="card flex flex-col px-4 pb-4 pt-3.5">
      <div className="flex items-center justify-between">
        <h3 className="text-[11px] font-bold text-ink-900">Rencana Pengembangan (IDP Aktif)</h3>
        <button className="link-more inline-flex items-center gap-1">
          Lihat Semua <ArrowRight size={11} />
        </button>
      </div>
      <div className="flex min-h-0 flex-1 flex-col justify-around gap-3.5 pt-3">
        {idpAktif.map((p) => {
          const Ikon = IDP_IKON[p.icon] ?? Users;
          return (
            <div key={p.judul} className="flex gap-2.5">
              <span
                className={`flex h-[30px] w-[30px] shrink-0 items-center justify-center rounded-lg ${p.tone}`}
              >
                <Ikon size={14} strokeWidth={1.9} />
              </span>
              <div className="min-w-0 flex-1">
                <div className="truncate text-[9.5px] font-bold text-ink-900">{p.judul}</div>
                <div className="mt-[2px] text-[8.5px] text-ink-500">{p.kategori}</div>
                <div className="mt-1.5 flex items-center gap-2">
                  <span className="h-[5px] min-w-0 flex-1 overflow-hidden rounded-full bg-[#eef2f6]">
                    <span
                      className="block h-full rounded-full"
                      style={{ width: `${p.progress}%`, background: p.warna }}
                    />
                  </span>
                  <span className="shrink-0 text-[9px] font-bold text-ink-900">{p.progress}%</span>
                </div>
                <div className="mt-1 text-right text-[9px] text-ink-500">Target: {p.target}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ── Riwayat Pelatihan ──────────────────────────────────── */

function RiwayatPelatihanCard() {
  return (
    <div className="card flex flex-col px-4 pb-3.5 pt-3.5">
      <div className="flex items-center justify-between">
        <h3 className="text-[11px] font-bold text-ink-900">Riwayat Pelatihan</h3>
        <button className="link-more inline-flex items-center gap-1">
          Lihat Semua <ArrowRight size={11} />
        </button>
      </div>
      <div className="scroll-thin overflow-x-auto">
      <table className="mt-2.5 w-full">
        <thead>
          <tr className="border-b border-[#eef2f6] text-left text-[8.5px] font-semibold uppercase tracking-[0.05em] text-ink-400">
            <th className="pb-1.5 pr-2 font-semibold">Pelatihan</th>
            <th className="pb-1.5 pr-2 font-semibold">Penyelenggara</th>
            <th className="pb-1.5 pr-2 font-semibold">Tanggal</th>
            <th className="pb-1.5 pr-2 text-center font-semibold">Jam</th>
            <th className="pb-1.5 text-right font-semibold">Status</th>
          </tr>
        </thead>
        <tbody>
          {riwayatPelatihan.map((p) => (
            <tr key={p.nama} className="border-b border-[#f6f8fa] last:border-0">
              <td className="py-[7px] pr-2 text-[9px] font-bold leading-[1.35] text-ink-900">{p.nama}</td>
              <td className="py-[7px] pr-2 text-[8.5px] text-ink-500">{p.penyelenggara}</td>
              <td className="py-[7px] pr-2 whitespace-nowrap text-[8.5px] text-ink-500">{p.tanggal}</td>
              <td className="py-[7px] pr-2 text-center text-[9px] font-semibold text-ink-700">{p.jam}</td>
              <td className="py-[7px] text-right">
                <span className="rounded-md bg-[#e8f7ef] px-2 py-[3px] text-[8.5px] font-semibold text-[#16a34a]">
                  {p.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
      <div className="mt-auto pt-2">
        <button className="link-more inline-flex items-center gap-1">
          Lihat semua riwayat pelatihan <ArrowRight size={11} />
        </button>
      </div>
    </div>
  );
}

/* ── Kesenjangan Kompetensi (Skills Gap) ────────────────── */

function LevelDot({ level }: { level: number }) {
  return (
    <span className="inline-flex items-center gap-1.5">
      <span className="h-[8px] w-[8px] rounded-full" style={{ background: warnaLevel(level) }} />
      <span className="text-[9.5px] font-semibold text-ink-700">{level}</span>
    </span>
  );
}

function SkillsGapCard() {
  return (
    <div className="card flex flex-col px-4 pb-3.5 pt-3.5">
      <div className="flex items-center justify-between">
        <h3 className="text-[11px] font-bold text-ink-900">Kesenjangan Kompetensi (Skills Gap)</h3>
        <Link href="/sdm-talenta/profil-karyawan/kompetensi" className="link-more inline-flex items-center gap-1">
          Lihat Detail <ArrowRight size={11} />
        </Link>
      </div>
      <div className="scroll-thin overflow-x-auto">
      <table className="mt-2.5 w-full">
        <thead>
          <tr className="border-b border-[#eef2f6] text-left text-[8.5px] font-semibold uppercase tracking-[0.05em] text-ink-400">
            <th className="pb-1.5 pr-2 font-semibold">Kompetensi</th>
            <th className="pb-1.5 pr-2 font-semibold">Level Saat Ini</th>
            <th className="pb-1.5 pr-2 font-semibold">Level yang Diharapkan</th>
            <th className="pb-1.5 text-right font-semibold">Gap</th>
          </tr>
        </thead>
        <tbody>
          {skillsGap.map((s) => (
            <tr key={s.kompetensi} className="border-b border-[#f6f8fa] last:border-0">
              <td className="py-[8px] pr-2 text-[9.5px] font-bold text-ink-900">{s.kompetensi}</td>
              <td className="py-[8px] pr-2">
                <LevelDot level={s.saatIni} />
              </td>
              <td className="py-[8px] pr-2">
                <LevelDot level={s.diharapkan} />
              </td>
              <td className="py-[8px] text-right">
                <span className="inline-flex h-[18px] w-[18px] items-center justify-center rounded-md bg-[#fdecec] text-[8.5px] font-bold text-[#dc2626]">
                  {s.diharapkan - s.saatIni}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
      <div className="mt-auto pt-2">
        <Link href="/sdm-talenta/profil-karyawan/rekomendasi-pengembangan" className="link-more inline-flex items-center gap-1">
          Lihat rekomendasi pengembangan <ArrowRight size={11} />
        </Link>
      </div>
    </div>
  );
}

/* ── Rekomendasi Pelatihan & Learning ───────────────────── */

function RekomendasiCard() {
  return (
    <div className="card flex flex-col px-4 pb-3.5 pt-3.5">
      <div className="flex items-center justify-between">
        <h3 className="text-[11px] font-bold text-ink-900">Rekomendasi Pelatihan & Learning</h3>
        <button className="link-more inline-flex items-center gap-1">
          Lihat Semua <ArrowRight size={11} />
        </button>
      </div>
      <div className="flex min-h-0 flex-1 flex-col justify-around gap-3 pt-3">
        {rekomendasiPelatihan.map((r) => {
          const Ikon = REKOMENDASI_IKON[r.icon] ?? Presentation;
          const lv = LEVEL_REKOMENDASI[r.level] ?? LEVEL_REKOMENDASI.Pemula;
          return (
            <div key={r.nama} className="flex items-center gap-2.5">
              <span
                className={`flex h-[42px] w-[56px] shrink-0 items-center justify-center rounded-lg ${r.tone}`}
              >
                <Ikon size={18} strokeWidth={1.8} />
              </span>
              <div className="min-w-0 flex-1">
                <div className="truncate text-[9.5px] font-bold text-ink-900">{r.nama}</div>
                <div className="mt-[2px] text-[8.5px] text-ink-500">{r.penyelenggara}</div>
                <div className="mt-1 flex items-center gap-2">
                  <span className="inline-flex items-center gap-1 text-[9px] text-ink-500">
                    <Clock3 size={9} /> {r.jam}
                  </span>
                  <span className={`rounded-md px-1.5 py-[2px] text-[7.5px] font-semibold ${lv}`}>
                    {r.level}
                  </span>
                </div>
              </div>
              <button className="shrink-0 rounded-lg border border-[#e3e9ef] px-2.5 py-[6px] text-[8.5px] font-semibold text-ink-700 transition-colors hover:bg-[#f5f8fa]">
                Rekomendasikan
              </button>
            </div>
          );
        })}
      </div>
      <button className="link-more inline-flex items-center gap-1 pt-2">
        Lihat semua rekomendasi <ArrowRight size={11} />
      </button>
    </div>
  );
}

/* ── Sertifikasi yang Dimiliki ──────────────────────────── */

function SertifikasiCard() {
  return (
    <div className="card flex flex-col px-4 pb-3.5 pt-3.5">
      <div className="flex items-center justify-between">
        <h3 className="text-[11px] font-bold text-ink-900">Sertifikasi yang Dimiliki</h3>
        <button className="link-more inline-flex items-center gap-1">
          Lihat Semua <ArrowRight size={11} />
        </button>
      </div>
      <div className="scroll-thin overflow-x-auto">
      <table className="mt-2.5 w-full">
        <thead>
          <tr className="border-b border-[#eef2f6] text-left text-[8.5px] font-semibold uppercase tracking-[0.05em] text-ink-400">
            <th className="pb-1.5 pr-2 font-semibold">Sertifikasi</th>
            <th className="pb-1.5 pr-2 font-semibold">Penerbit</th>
            <th className="pb-1.5 pr-2 font-semibold">Tanggal</th>
            <th className="pb-1.5 pr-2 font-semibold">Berlaku Hingga</th>
            <th className="pb-1.5 text-right font-semibold">Status</th>
          </tr>
        </thead>
        <tbody>
          {sertifikasiDimiliki.map((s) => {
            const tone = STATUS_SERTIFIKASI[s.status] ?? STATUS_SERTIFIKASI.Aktif;
            return (
              <tr key={s.nama} className="border-b border-[#f6f8fa] last:border-0">
                <td className="py-[8px] pr-2 text-[9px] font-bold leading-[1.35] text-ink-900">{s.nama}</td>
                <td className="py-[8px] pr-2 text-[8.5px] text-ink-500">{s.penerbit}</td>
                <td className="py-[8px] pr-2 whitespace-nowrap text-[8.5px] text-ink-500">{s.tanggal}</td>
                <td className="py-[8px] pr-2 whitespace-nowrap text-[8.5px] text-ink-500">{s.berlaku}</td>
                <td className="py-[8px] text-right">
                  <span className={`rounded-md px-2 py-[3px] text-[8.5px] font-semibold ${tone}`}>
                    {s.status}
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      </div>
      <div className="mt-auto pt-2">
        <button className="link-more inline-flex items-center gap-1">
          Lihat semua sertifikasi <ArrowRight size={11} />
        </button>
      </div>
    </div>
  );
}

/* ── Jalur Karier & Pengembangan ────────────────────────── */

function JalurKarierCard() {
  return (
    <div className="card flex flex-col px-4 pb-4 pt-3.5">
      <h3 className="text-[11px] font-bold text-ink-900">Jalur Karier & Pengembangan</h3>
      <div className="mt-3.5 flex items-center gap-2.5">
        {jalurKarier.map((c, i) => {
          const Ikon = KARIER_IKON[c.icon] ?? User;
          const tone = KARIER_TONE[c.tone] ?? KARIER_TONE.blue;
          return (
            <div key={c.jabatan} className="flex min-w-0 flex-1 items-center gap-2.5">
              <div className={`min-w-0 flex-1 rounded-xl border px-3 py-3 leading-tight ${tone.card}`}>
                <span
                  className={`flex h-[26px] w-[26px] items-center justify-center rounded-lg bg-white ${tone.text}`}
                >
                  <Ikon size={13} strokeWidth={1.9} />
                </span>
                <div className="mt-2 text-[10px] font-bold text-ink-900">{c.jabatan}</div>
                <div className="text-[8.5px] font-semibold text-ink-700">{c.tag}</div>
                <div className="mt-1.5 text-[8.5px] text-ink-500">{c.unit}</div>
                <div className={`mt-[2px] text-[9px] font-semibold ${tone.text}`}>{c.waktu}</div>
              </div>
              {i < jalurKarier.length - 1 && (
                <ArrowRight size={15} className="shrink-0 text-ink-300" />
              )}
            </div>
          );
        })}
      </div>
      <div className="mt-3 flex items-center gap-2 rounded-lg bg-[#f2f6fa] px-3 py-2">
        <Info size={12} className="shrink-0 text-[#3b7ded]" />
        <span className="text-[8.5px] text-ink-700">{fokusPengembangan}</span>
      </div>
    </div>
  );
}

/* ── Catatan Pengembangan ───────────────────────────────── */

function CatatanCard() {
  return (
    <div className="card flex flex-col px-4 pb-4 pt-3.5">
      <h3 className="text-[11px] font-bold text-ink-900">Catatan Pengembangan</h3>
      <div className="mt-3 space-y-3">
        {catatanPengembangan.map((c) => (
          <div key={c.tanggal} className="rounded-xl bg-[#f8fafc] px-3.5 py-3">
            <div className="flex items-center gap-2.5">
              <span className="flex h-[28px] w-[28px] shrink-0 items-center justify-center rounded-full bg-[#e8f0fe] text-[9.5px] font-bold text-[#3b7ded]">
                {c.inisial}
              </span>
              <span className="min-w-0 flex-1 truncate text-[9px] text-ink-500">
                Catatan oleh <span className="font-bold text-ink-900">{c.nama}</span> ({c.jabatan})
              </span>
              <span className="shrink-0 text-[8.5px] text-ink-400">{c.tanggal}</span>
            </div>
            <p className="mt-2.5 text-[9px] leading-[1.6] text-ink-700">{c.isi}</p>
            <div className="mt-2.5 inline-flex items-center gap-1.5 text-[9px] font-bold text-[#3b7ded]">
              <CalendarClock size={11} /> Next Review: {c.nextReview}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Layout ─────────────────────────────────────────────── */

export function TabPengembangan() {
  return (
    <div className="space-y-3">
      <div className="grid grid-cols-[minmax(0,480fr)_minmax(0,455fr)_minmax(0,545fr)] gap-3">
        <RingkasanCard />
        <IdpAktifCard />
        <RiwayatPelatihanCard />
      </div>
      <div className="grid grid-cols-[minmax(0,480fr)_minmax(0,455fr)_minmax(0,545fr)] gap-3">
        <SkillsGapCard />
        <RekomendasiCard />
        <SertifikasiCard />
      </div>
      <div className="grid grid-cols-[minmax(0,920fr)_minmax(0,555fr)] gap-3">
        <JalurKarierCard />
        <CatatanCard />
      </div>
    </div>
  );
}
