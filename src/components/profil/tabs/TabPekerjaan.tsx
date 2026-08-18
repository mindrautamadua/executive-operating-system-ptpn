import {
  ArrowRight,
  Award,
  BadgeCheck,
  Briefcase,
  Building2,
  Calendar,
  CheckCircle2,
  Clock,
  Contact,
  HeartPulse,
  Layers,
  Map,
  MapPin,
  Network,
  Shield,
  Sun,
  Timer,
  User,
  Users,
  Wallet,
} from "lucide-react";
import {
  pekerjaanSaatIni,
  riwayatJabatanLengkap,
  kompensasiBenefit,
  strukturOrganisasi,
  ringkasanMasaKerja,
  pendidikanRelevan,
} from "@/lib/profil-data";

const ICONS: Record<string, typeof Briefcase> = {
  briefcase: Briefcase,
  building: Building2,
  network: Network,
  mapPin: MapPin,
  user: User,
  idCard: Contact,
  calendar: Calendar,
  clock: Clock,
  award: Award,
  layers: Layers,
  checkCircle: CheckCircle2,
  sun: Sun,
  timer: Timer,
  map: Map,
  wallet: Wallet,
  badgeCheck: BadgeCheck,
  heartPulse: HeartPulse,
  shield: Shield,
};

function CardTitle({
  title,
  action,
}: {
  title: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between gap-2">
      <h3 className="text-[11px] font-bold text-ink-900">{title}</h3>
      {action}
    </div>
  );
}

function LinkAction({ label }: { label: string }) {
  return (
    <button className="flex shrink-0 items-center gap-1 text-[9.5px] font-semibold text-ptpn-greenDark hover:underline">
      {label} <ArrowRight size={10} />
    </button>
  );
}

function IconRow({
  item,
}: {
  item: { label: string; value: string; sub?: string; icon: string };
}) {
  const Icon = ICONS[item.icon] ?? Briefcase;
  return (
    <div className="flex items-start justify-between gap-4">
      <span className="flex min-w-0 shrink-0 items-center gap-2">
        <span className="flex h-[20px] w-[20px] shrink-0 items-center justify-center rounded-md bg-[#f5f8fa]">
          <Icon size={10} className="text-ink-500" strokeWidth={1.8} />
        </span>
        <span className="text-[9.5px] text-ink-500">{item.label}</span>
      </span>
      <span className="min-w-0 flex-1 text-right text-[10px] font-bold leading-[1.4] text-ink-900">
        {item.value}
        {item.sub && (
          <span className="block text-[8.5px] font-medium text-ink-500">{item.sub}</span>
        )}
      </span>
    </div>
  );
}

function InformasiPekerjaan() {
  return (
    <div className="card flex flex-col px-4 pb-4 pt-3.5">
      <CardTitle title="Informasi Pekerjaan Saat Ini" />
      <div className="mt-2.5 flex min-h-0 flex-1 flex-col justify-around gap-[9px]">
        {pekerjaanSaatIni.map((it) => (
          <IconRow key={it.label} item={it} />
        ))}
      </div>
    </div>
  );
}

function RiwayatJabatanCard() {
  return (
    <div className="card px-4 pb-3.5 pt-3.5">
      <CardTitle title="Riwayat Jabatan" action={<LinkAction label="Lihat Semua" />} />
      <div className="mt-3">
        {riwayatJabatanLengkap.map((r, i) => (
          <div key={r.jabatan} className="relative flex gap-3">
            <div className="flex w-[22px] shrink-0 flex-col items-center">
              <span
                className={`z-10 flex h-[22px] w-[22px] items-center justify-center rounded-full border ${
                  r.aktif
                    ? "border-ptpn-green bg-ptpn-greenLight"
                    : "border-[#e3e9ef] bg-white"
                }`}
              >
                <Briefcase
                  size={10}
                  className={r.aktif ? "text-ptpn-green" : "text-ink-400"}
                  strokeWidth={1.8}
                />
              </span>
              {i < riwayatJabatanLengkap.length - 1 && (
                <span className="w-px flex-1 bg-[#e9eef3]" />
              )}
            </div>

            <div
              className={`flex min-w-0 flex-1 items-start justify-between gap-3 pt-[2px] ${
                i < riwayatJabatanLengkap.length - 1
                  ? "mb-3 border-b border-[#f2f5f8] pb-3"
                  : ""
              }`}
            >
              <div className="min-w-0 leading-tight">
                <div className="text-[10.5px] font-bold text-ink-900">{r.jabatan}</div>
                <div className="mt-[3px] text-[9px] text-ink-500">{r.unit}</div>
              </div>
              <div className="shrink-0 text-right leading-tight">
                <div className="text-[9px] text-ink-500">{r.periode}</div>
                <div className="mt-[3px] text-[8.5px] font-semibold text-ptpn-greenDark">
                  {r.durasi}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function KompensasiBenefit() {
  return (
    <div className="card flex flex-1 flex-col px-4 pb-4 pt-3.5">
      <CardTitle title="Kompensasi & Benefit" action={<LinkAction label="Lihat Detail" />} />
      <div className="mt-2.5 flex min-h-0 flex-1 flex-col justify-around gap-[9px]">
        {kompensasiBenefit.map((it) => (
          <IconRow key={it.label} item={it} />
        ))}
      </div>
    </div>
  );
}

function StrukturOrganisasi() {
  return (
    <div className="card px-4 pb-4 pt-3.5">
      <CardTitle title="Struktur Organisasi" action={<LinkAction label="Lihat Struktur Lengkap" />} />
      <div className="mt-3 flex flex-col items-center">
        {strukturOrganisasi.map((s, i) => (
          <div key={s.jabatan} className="flex w-full max-w-[220px] flex-col items-center">
            <div
              className={`flex w-full items-center gap-2.5 rounded-lg border px-3 py-2 ${
                s.aktif
                  ? "border-[#f5c76f] bg-[#fef4e3]"
                  : "border-[#e9eef3] bg-[#f8fafc]"
              }`}
            >
              <span
                className={`flex h-[24px] w-[24px] shrink-0 items-center justify-center rounded-full ${
                  s.aktif ? "bg-[#fde8bd]" : "bg-[#e8f0fe]"
                }`}
              >
                {s.aktif ? (
                  <User size={11} className="text-[#d97706]" strokeWidth={1.8} />
                ) : (
                  <Users size={11} className="text-[#3b7ded]" strokeWidth={1.8} />
                )}
              </span>
              <div className="min-w-0 leading-tight">
                <div className="text-[9.5px] font-bold text-ink-900">{s.jabatan}</div>
                <div className="mt-[2px] text-[8.5px] text-ink-500">{s.nama}</div>
              </div>
            </div>
            {i < strukturOrganisasi.length - 1 && (
              <span className="h-[14px] w-px bg-[#d9e2ea]" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function DonutMasaKerja() {
  const { segmen } = ringkasanMasaKerja;
  const total = segmen.reduce((a, s) => a + s.bulan, 0);
  const R = 40;
  const C = 2 * Math.PI * R;
  let offset = 0;

  return (
    <svg viewBox="0 0 100 100" className="h-[110px] w-[110px] -rotate-90">
      {segmen.map((s) => {
        const len = (s.bulan / total) * C;
        const el = (
          <circle
            key={s.label}
            cx="50"
            cy="50"
            r={R}
            fill="none"
            stroke={s.warna}
            strokeWidth="11"
            strokeDasharray={`${len - 2} ${C - len + 2}`}
            strokeDashoffset={-offset}
            strokeLinecap="round"
          />
        );
        offset += len;
        return el;
      })}
    </svg>
  );
}

function RingkasanMasaKerja() {
  const d = ringkasanMasaKerja;
  return (
    <div className="card flex flex-1 flex-col px-4 pb-4 pt-3.5">
      <CardTitle title="Ringkasan Masa Kerja" />

      <div className="mt-3 flex items-center gap-4">
        <div className="relative shrink-0">
          <DonutMasaKerja />
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-[13px] font-bold leading-none text-ink-900">{d.total}</span>
            <span className="mt-[2px] text-[11px] font-bold leading-none text-ink-900">
              {d.totalSub}
            </span>
            <span className="mt-[3px] text-[9px] text-ink-500">Total Masa Kerja</span>
          </div>
        </div>

        <div className="flex min-w-0 flex-1 flex-col gap-2">
          {d.segmen.map((s) => (
            <div key={s.label} className="flex items-center justify-between gap-2">
              <span className="flex min-w-0 items-center gap-1.5">
                <span
                  className="h-[7px] w-[7px] shrink-0 rounded-full"
                  style={{ background: s.warna }}
                />
                <span className="truncate text-[8.5px] text-ink-500">{s.label}</span>
              </span>
              <span className="shrink-0 text-[9px] font-bold text-ink-900">{s.value}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-3 space-y-1.5 border-t border-[#f2f5f8] pt-2.5">
        <div className="flex items-center justify-between">
          <span className="text-[9px] text-ink-500">Tanggal Masuk Perusahaan</span>
          <span className="text-[9.5px] font-bold text-ink-900">{d.tanggalMasuk}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-[9px] text-ink-500">Masa Kerja di Perusahaan</span>
          <span className="text-[9.5px] font-bold text-ink-900">{d.masaPerusahaan}</span>
        </div>
        {/* Horizon pensiun: perencanaan suksesi butuh tahu kapan, bukan hanya berapa lama. */}
        <div className="flex items-center justify-between">
          <span className="text-[9px] text-ink-500">Usia Pensiun Normal</span>
          <span className="text-[9.5px] font-bold text-ink-900">{d.usiaPensiun}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-[9px] text-ink-500">TMT Pensiun (perkiraan)</span>
          <span className="text-[9.5px] font-bold text-ink-900">{d.tmtPensiun}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-[9px] text-ink-500">Sisa Masa Kerja</span>
          <span className="text-[9.5px] font-bold text-ptpn-green">{d.sisaMasaKerja}</span>
        </div>
      </div>
    </div>
  );
}

function PendidikanRelevan() {
  return (
    <div className="card px-4 pb-3.5 pt-3.5">
      <CardTitle title="Riwayat Pendidikan yang Relevan" action={<LinkAction label="Lihat Semua" />} />
      <table className="mt-2.5 w-full">
        <thead>
          <tr className="border-b border-[#eef2f6] text-left text-[8.5px] font-semibold uppercase tracking-[0.05em] text-ink-400">
            <th className="pb-1.5 pr-2 font-semibold">Jenjang</th>
            <th className="pb-1.5 pr-2 font-semibold">Institusi</th>
            <th className="pb-1.5 pr-2 font-semibold">Jurusan</th>
            <th className="pb-1.5 pr-2 font-semibold">Tahun Lulus</th>
            <th className="pb-1.5 pr-2 font-semibold">IPK</th>
            <th className="pb-1.5 font-semibold">Keterangan</th>
          </tr>
        </thead>
        <tbody>
          {pendidikanRelevan.map((p) => (
            <tr key={p.institusi} className="border-b border-[#f6f8fa] last:border-0">
              <td className="py-2 pr-2 text-[9.5px] font-bold text-ink-900">{p.jenjang}</td>
              <td className="py-2 pr-2 text-[9.5px] font-bold text-ink-900">{p.institusi}</td>
              <td className="py-2 pr-2 text-[9.5px] text-ink-500">{p.jurusan}</td>
              <td className="py-2 pr-2 text-[9.5px] text-ink-500">{p.tahunLulus}</td>
              <td className="py-2 pr-2 text-[9.5px] font-bold text-ink-900">{p.ipk}</td>
              <td className="py-2 text-[9.5px] text-ink-500">{p.keterangan}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function TabPekerjaan() {
  return (
    <div className="space-y-3">
      <div className="grid grid-cols-[minmax(0,370fr)_minmax(0,360fr)_minmax(0,330fr)] items-stretch gap-3">
        <InformasiPekerjaan />

        <div className="flex flex-col gap-3">
          <RiwayatJabatanCard />
          <KompensasiBenefit />
        </div>

        <div className="flex flex-col gap-3">
          <StrukturOrganisasi />
          <RingkasanMasaKerja />
        </div>
      </div>

      <PendidikanRelevan />
    </div>
  );
}
