import Link from "next/link";
import {
  ArrowRight,
  Check,
  Clock3,
  FileBadge,
  HeartHandshake,
  Lightbulb,
  MessageSquare,
  ShieldCheck,
  Sparkles,
  Target,
  ThumbsUp,
  TriangleAlert,
  Users,
} from "lucide-react";
import {
  kompetensiInti,
  kompetensiPerilaku,
  kompetensiTeknisFungsional,
  pemetaanKompetensi,
  rataRataKesesuaian,
  rekomendasiKompetensi,
  rencanaPengembanganKompetensi,
  ringkasanKompetensi,
  sertifikasiRelevan,
} from "@/lib/profil-data";

const LEVEL_TONE: Record<string, string> = {
  "Sangat Kuat": "tone-green",
  Kompeten: "tone-blue",
};

const STATUS_TONE: Record<string, string> = {
  "On Progress": "tone-green",
  Planned: "tone-slate",
};

const INTI_IKON: Record<string, typeof ShieldCheck> = {
  shield: ShieldCheck,
  target: Target,
  users: Users,
  lightbulb: Lightbulb,
  message: MessageSquare,
  clock: Clock3,
  heart: HeartHandshake,
};

function LevelBadge({ level }: { level: string }) {
  const tone = LEVEL_TONE[level] ?? LEVEL_TONE.Kompeten;
  return (
    <span className={`whitespace-nowrap rounded-md px-2 py-[3px] text-[8.5px] font-semibold ${tone}`}>
      {level}
    </span>
  );
}

/* ── Ringkasan Kompetensi ───────────────────────────────── */

function DonutKompetensi() {
  const size = 128;
  const stroke = 13;
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  let acc = 0;
  return (
    <div className="relative shrink-0" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#eef2f6" strokeWidth={stroke} />
        {ringkasanKompetensi.distribusi.map((d) => {
          const seg = (
            <circle
              key={d.label}
              cx={size / 2}
              cy={size / 2}
              r={r}
              fill="none"
              stroke={d.warna}
              strokeWidth={stroke}
              strokeDasharray={`${(c * d.pct) / 100 - 2} ${c}`}
              strokeDashoffset={-((c * acc) / 100)}
            />
          );
          acc += d.pct;
          return seg;
        })}
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center leading-none">
        <span className="text-[26px] font-extrabold text-ink-900">{ringkasanKompetensi.skor}</span>
        <span className="mt-1 text-[9px] text-ink-500">{ringkasanKompetensi.maks}</span>
        <span className="mt-[3px] text-[9px] text-ink-500">Skor Rata-rata</span>
      </div>
    </div>
  );
}

function RingkasanKompetensiCard() {
  return (
    <div className="card flex flex-col px-4 pb-4 pt-3.5">
      <h3 className="text-[11px] font-bold text-ink-900">Ringkasan Kompetensi</h3>
      <div className="flex min-h-0 flex-1 items-center gap-5 py-3">
        <DonutKompetensi />
        <div className="min-w-0 flex-1 space-y-2.5">
          {ringkasanKompetensi.distribusi.map((d) => (
            <div key={d.label} className="flex items-center gap-2">
              <span className="h-[8px] w-[8px] shrink-0 rounded-full" style={{ background: d.warna }} />
              <span className="min-w-0 flex-1 truncate text-[9.5px] text-ink-700">{d.label}</span>
              <span className="shrink-0 text-[10px] font-bold text-ink-900">{d.pct}%</span>
            </div>
          ))}
        </div>
      </div>
      <button className="w-full rounded-lg border border-[#e3e9ef] py-[7px] text-[10px] font-semibold text-ink-700 transition-colors hover:bg-[#f5f8fa]">
        Lihat Detail
      </button>
    </div>
  );
}

/* ── Kompetensi Inti Perusahaan ─────────────────────────── */

function KompetensiIntiCard() {
  return (
    <div className="card flex flex-col px-4 pb-3.5 pt-3.5">
      <h3 className="text-[11px] font-bold text-ink-900">Kompetensi Inti Perusahaan</h3>
      <div className="scroll-thin overflow-x-auto">
      <table className="mt-2.5 w-full">
        <thead>
          <tr className="border-b border-[#eef2f6] text-left text-[8.5px] font-semibold uppercase tracking-[0.05em] text-ink-400">
            <th className="pb-1.5 pr-2 font-semibold">Kompetensi</th>
            <th className="pb-1.5 pr-2 text-center font-semibold">Skor (1-5)</th>
            <th className="pb-1.5 pr-2 font-semibold">Level</th>
            <th className="pb-1.5 text-right font-semibold">Gap</th>
          </tr>
        </thead>
        <tbody>
          {kompetensiInti.map((k) => {
            const Ikon = INTI_IKON[k.ikon] ?? ShieldCheck;
            return (
              <tr key={k.label} className="border-b border-[#f6f8fa] last:border-0">
                <td className="py-[6px] pr-2">
                  <div className="flex items-center gap-2">
                    <span className="flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded-md bg-[#f2f6fa] text-ink-500">
                      <Ikon size={11} strokeWidth={1.9} />
                    </span>
                    <span className="text-[9.5px] font-bold text-ink-900">{k.label}</span>
                  </div>
                </td>
                <td className="py-[6px] pr-2 text-center text-[10px] font-bold text-ink-900">
                  {k.skor.toFixed(1)}
                </td>
                <td className="py-[6px] pr-2">
                  <LevelBadge level={k.level} />
                </td>
                <td className="py-[6px] text-right text-[9.5px] font-semibold text-ink-500">
                  {k.gap.toFixed(1)}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      </div>
      <div className="mt-auto pt-2">
        <button className="link-more inline-flex items-center gap-1">
          Lihat semua kompetensi inti <ArrowRight size={11} />
        </button>
      </div>
    </div>
  );
}

/* ── Kompetensi Teknis (Fungsional) ─────────────────────── */

function KompetensiTeknisCard() {
  return (
    <div className="card flex flex-col px-4 pb-3.5 pt-3.5">
      <h3 className="text-[11px] font-bold text-ink-900">Kompetensi Teknis (Fungsional)</h3>
      <div className="scroll-thin overflow-x-auto">
      <table className="mt-2.5 w-full">
        <thead>
          <tr className="border-b border-[#eef2f6] text-left text-[8.5px] font-semibold uppercase tracking-[0.05em] text-ink-400">
            <th className="pb-1.5 pr-2 font-semibold">Kompetensi Teknis</th>
            <th className="pb-1.5 pr-2 text-center font-semibold">Skor (1-5)</th>
            <th className="pb-1.5 pr-2 font-semibold">Level</th>
            <th className="pb-1.5 text-right font-semibold">Terakhir Dinilai</th>
          </tr>
        </thead>
        <tbody>
          {kompetensiTeknisFungsional.map((k) => (
            <tr key={k.label} className="border-b border-[#f6f8fa] last:border-0">
              <td className="py-[7px] pr-2 text-[9.5px] font-bold text-ink-900">{k.label}</td>
              <td className="py-[7px] pr-2 text-center text-[10px] font-bold text-ink-900">
                {k.skor.toFixed(1)}
              </td>
              <td className="py-[7px] pr-2">
                <LevelBadge level={k.level} />
              </td>
              <td className="py-[7px] text-right text-[9px] text-ink-500">{k.dinilai}</td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
      <div className="mt-auto pt-2">
        <button className="link-more inline-flex items-center gap-1">
          Lihat semua kompetensi teknis <ArrowRight size={11} />
        </button>
      </div>
    </div>
  );
}

/* ── Pemetaan Kompetensi (Role Mapping) ─────────────────── */

function PemetaanKompetensiCard() {
  return (
    <div className="card flex flex-col px-4 pb-3.5 pt-3.5">
      <h3 className="text-[11px] font-bold text-ink-900">Pemetaan Kompetensi (Role Mapping)</h3>
      <p className="mt-[3px] text-[9px] text-ink-500">
        Perbandingan kompetensi terhadap standar jabatan saat ini
      </p>
      <div className="mt-2 flex items-center justify-between border-b border-[#eef2f6] pb-1.5 text-[8.5px] font-semibold uppercase tracking-[0.05em] text-ink-400">
        <span>Kategori</span>
        <span>Kesesuaian</span>
      </div>
      <div className="flex min-h-0 flex-1 flex-col justify-around gap-2.5 py-2.5">
        {pemetaanKompetensi.map((p) => (
          <div key={p.label} className="flex items-center gap-3">
            <span className="w-[150px] shrink-0 text-[9.5px] text-ink-700">{p.label}</span>
            <span className="h-[7px] min-w-0 flex-1 overflow-hidden rounded-full bg-[#eef2f6]">
              <span
                className="block h-full rounded-full bg-ptpn-green"
                style={{ width: `${p.pct}%` }}
              />
            </span>
            <span className="w-8 shrink-0 text-right text-[10px] font-bold text-ink-900">{p.pct}%</span>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-between border-t border-[#eef2f6] pt-2">
        <span className="text-[9.5px] font-bold text-ink-900">Rata-rata Kesesuaian</span>
        <span className="text-[11px] font-extrabold text-ink-900">{rataRataKesesuaian}</span>
      </div>
      <button className="link-more mt-2 inline-flex items-center gap-1 self-start">
        Lihat pemetaan lengkap <ArrowRight size={11} />
      </button>
    </div>
  );
}

/* ── Kompetensi Perilaku yang Menonjol ──────────────────── */

function PerilakuMenonjolCard() {
  return (
    <div className="card flex flex-col px-4 pb-3.5 pt-3.5">
      <h3 className="text-[11px] font-bold text-ink-900">Kompetensi Perilaku yang Menonjol</h3>
      <div className="min-h-0 flex-1 space-y-4 pt-3">
        <div className="flex gap-2.5">
          <span className="flex h-[30px] w-[30px] shrink-0 items-center justify-center rounded-full bg-ptpn-greenLight text-ptpn-green">
            <ThumbsUp size={14} />
          </span>
          <div className="min-w-0 flex-1">
            <div className="text-[10px] font-bold text-ink-900">Kekuatan Utama</div>
            <div className="mt-1.5 space-y-1.5">
              {kompetensiPerilaku.kekuatan.map((t) => (
                <div key={t} className="flex items-start gap-1.5">
                  <Check size={11} className="mt-[1px] shrink-0 text-[#16a34a]" strokeWidth={2.5} />
                  <span className="text-[9px] leading-snug text-ink-700">{t}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="flex gap-2.5">
          <span className="flex h-[30px] w-[30px] shrink-0 items-center justify-center rounded-full bg-[#fef4e3] text-[#d97706]">
            <TriangleAlert size={14} />
          </span>
          <div className="min-w-0 flex-1">
            <div className="text-[10px] font-bold text-ink-900">Area Pengembangan</div>
            <div className="mt-1.5 space-y-1.5">
              {kompetensiPerilaku.pengembangan.map((t) => (
                <div key={t} className="flex items-start gap-1.5">
                  <Check size={11} className="mt-[1px] shrink-0 text-[#d97706]" strokeWidth={2.5} />
                  <span className="text-[9px] leading-snug text-ink-700">{t}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Link href="/sdm-talenta/profil-karyawan/rekomendasi-pengembangan" className="link-more inline-flex items-center gap-1 pt-2">
        Lihat rekomendasi pengembangan <ArrowRight size={11} />
      </Link>
    </div>
  );
}

/* ── Sertifikasi & Pelatihan Relevan ────────────────────── */

function SertifikasiRelevanCard() {
  return (
    <div className="card flex flex-col px-4 pb-3.5 pt-3.5">
      <h3 className="text-[11px] font-bold text-ink-900">Sertifikasi & Pelatihan Relevan</h3>
      <div className="mt-2 grid grid-cols-[minmax(0,1fr)_auto_auto] items-center gap-x-3 border-b border-[#eef2f6] pb-1.5 text-[8.5px] font-semibold uppercase tracking-[0.05em] text-ink-400">
        <span>Nama Sertifikasi / Pelatihan</span>
        <span>Penyelenggara</span>
        <span className="text-right">Tahun</span>
      </div>
      <div className="min-h-0 flex-1 divide-y divide-[#f6f8fa]">
        {sertifikasiRelevan.map((s) => (
          <div key={s.nama} className="grid grid-cols-[minmax(0,1fr)_auto_auto] items-center gap-x-3 py-[9px]">
            <div className="flex min-w-0 items-center gap-2">
              <span className="flex h-[24px] w-[24px] shrink-0 items-center justify-center rounded-md bg-ptpn-greenLight">
                <FileBadge size={12} className="text-ptpn-green" strokeWidth={1.8} />
              </span>
              <span className="truncate text-[9.5px] font-bold text-ink-900">{s.nama}</span>
            </div>
            <span className="text-[9px] text-ink-500">{s.penyelenggara}</span>
            <span className="text-right text-[9px] font-semibold text-ink-700">{s.tahun}</span>
          </div>
        ))}
      </div>
      <button className="link-more inline-flex items-center gap-1 pt-1.5">
        Lihat semua sertifikasi <ArrowRight size={11} />
      </button>
    </div>
  );
}

/* ── Rencana Pengembangan Kompetensi ────────────────────── */

function RencanaPengembanganCard() {
  return (
    <div className="card flex flex-col px-4 pb-3.5 pt-3.5">
      <h3 className="text-[11px] font-bold text-ink-900">Rencana Pengembangan Kompetensi</h3>
      <div className="scroll-thin overflow-x-auto">
      <table className="mt-2.5 w-full">
        <thead>
          <tr className="border-b border-[#eef2f6] text-left text-[8.5px] font-semibold uppercase tracking-[0.05em] text-ink-400">
            <th className="pb-1.5 pr-2 font-semibold">Kompetensi yang Dikembangkan</th>
            <th className="pb-1.5 pr-2 font-semibold">Tujuan Pengembangan</th>
            <th className="pb-1.5 pr-2 font-semibold">Metode</th>
            <th className="pb-1.5 pr-2 text-center font-semibold">Target Level</th>
            <th className="pb-1.5 pr-2 text-center font-semibold">Target Waktu</th>
            <th className="pb-1.5 text-right font-semibold">Status</th>
          </tr>
        </thead>
        <tbody>
          {rencanaPengembanganKompetensi.map((r) => {
            const tone = STATUS_TONE[r.status] ?? STATUS_TONE.Planned;
            return (
              <tr key={r.kompetensi} className="border-b border-[#f6f8fa] last:border-0">
                <td className="py-2 pr-2 text-[9.5px] font-bold text-ink-900">{r.kompetensi}</td>
                <td className="py-2 pr-2 text-[9px] text-ink-700">{r.tujuan}</td>
                <td className="py-2 pr-2 text-[9px] text-ink-700">{r.metode}</td>
                <td className="py-2 pr-2 text-center text-[10px] font-bold text-ink-900">{r.targetLevel}</td>
                <td className="py-2 pr-2 text-center text-[9px] text-ink-500">{r.targetWaktu}</td>
                <td className="py-2 text-right">
                  <span
                    className={`whitespace-nowrap rounded-md px-2 py-[3px] text-[8.5px] font-semibold ${tone}`}
                  >
                    {r.status}
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      </div>
      <div className="mt-auto pt-2.5">
        <button className="link-more inline-flex items-center gap-1">
          Lihat rencana pengembangan lengkap <ArrowRight size={11} />
        </button>
      </div>
    </div>
  );
}

/* ── Rekomendasi Pengembangan ───────────────────────────── */

function RekomendasiCard() {
  return (
    <div className="card flex flex-col px-4 pb-3.5 pt-3.5">
      <h3 className="text-[11px] font-bold text-ink-900">Rekomendasi Pengembangan</h3>
      <div className="mt-2.5 flex flex-1 gap-2.5 rounded-lg bg-ptpn-greenLight p-3">
        <span className="flex h-[26px] w-[26px] shrink-0 items-center justify-center rounded-full bg-ptpn-green text-white">
          <Sparkles size={13} />
        </span>
        <p className="text-[9.5px] leading-relaxed text-ink-700">
          <span className="font-bold text-ink-900">Rizky</span>{" "}
          {rekomendasiKompetensi.replace(/^Rizky\s*/, "")}
        </p>
      </div>
      <button className="link-more mt-3 inline-flex items-center gap-1 self-start">
        Lihat Career Path <ArrowRight size={11} />
      </button>
    </div>
  );
}

/* ── Layout ─────────────────────────────────────────────── */

export function TabKompetensi() {
  return (
    <div className="space-y-3">
      <div className="grid grid-cols-[minmax(0,440fr)_minmax(0,490fr)_minmax(0,600fr)] gap-3">
        <RingkasanKompetensiCard />
        <KompetensiIntiCard />
        <KompetensiTeknisCard />
      </div>
      <div className="grid grid-cols-[minmax(0,490fr)_minmax(0,470fr)_minmax(0,570fr)] gap-3">
        <PemetaanKompetensiCard />
        <PerilakuMenonjolCard />
        <SertifikasiRelevanCard />
      </div>
      <div className="grid grid-cols-[minmax(0,1080fr)_minmax(0,450fr)] gap-3">
        <RencanaPengembanganCard />
        <RekomendasiCard />
      </div>
    </div>
  );
}
