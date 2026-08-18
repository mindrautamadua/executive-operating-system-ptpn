import {
  UserRound,
  Contact,
  Users,
  BookOpen,
  Heart,
  Globe,
  Baby,
  MapPin,
  Calendar,
  Clock,
  Droplet,
  FileText,
  HeartPulse,
  ShieldCheck,
  Info,
  Linkedin,
  Instagram,
  Facebook,
  type LucideIcon,
} from "lucide-react";
import { InfoRows } from "./InfoRows";
import {
  dataPribadi,
  kontakAlamat,
  dokumenIdentitas,
  kontakDarurat,
  informasiTambahan,
  terakhirDiperbarui,
} from "@/lib/profil-data";

const ICONS: Record<string, LucideIcon> = {
  user: UserRound,
  contact: Contact,
  users: Users,
  book: BookOpen,
  heart: Heart,
  globe: Globe,
  baby: Baby,
  mapPin: MapPin,
  calendar: Calendar,
  clock: Clock,
  droplet: Droplet,
  file: FileText,
  heartPulse: HeartPulse,
  shield: ShieldCheck,
};

function CardHeader({ title }: { title: string }) {
  return (
    <div className="mb-3 flex items-center justify-between">
      <h3 className="text-[11px] font-bold text-ink-900">{title}</h3>
    </div>
  );
}

function IconRow({ icon, label, value }: { icon: string; label: string; value: string }) {
  const Icon = ICONS[icon] ?? UserRound;
  return (
    <div className="flex items-start gap-2">
      <Icon size={11} strokeWidth={1.8} className="mt-[1px] shrink-0 text-ink-400" />
      <span className="w-[100px] shrink-0 whitespace-pre-line text-[9.5px] leading-[1.4] text-ink-500">
        {label}
      </span>
      <span className="min-w-0 flex-1 text-[10px] font-bold leading-[1.4] text-ink-900">
        {value}
      </span>
    </div>
  );
}

function DataPribadi() {
  return (
    <div className="card flex flex-col px-4 pb-4 pt-3.5">
      <CardHeader title="Data Pribadi" />
      <div className="grid flex-1 grid-cols-2">
        <div className="flex flex-col justify-around gap-2.5 pr-4">
          {dataPribadi.kiri.map((r) => (
            <IconRow key={r.label} {...r} />
          ))}
        </div>
        <div className="flex flex-col justify-around gap-2.5 border-l border-[#eef2f6] pl-4">
          {dataPribadi.kanan.map((r) => (
            <IconRow key={r.label} {...r} />
          ))}
        </div>
      </div>
    </div>
  );
}

function KontakAlamat() {
  return (
    <div className="card flex flex-col px-4 pb-4 pt-3.5">
      <CardHeader title="Kontak & Alamat" />
      <div className="space-y-3">
        {kontakAlamat.alamat.map((a) => (
          <div key={a.judul}>
            <p className="mb-1 text-[9.5px] font-bold text-[#2563c9]">{a.judul}</p>
            {a.baris.map((b) => (
              <p key={b} className="text-[10px] font-bold leading-[1.5] text-ink-900">
                {b}
              </p>
            ))}
          </div>
        ))}
      </div>
      <div className="mt-3 space-y-2 border-t border-[#eef2f6] pt-3">
        {kontakAlamat.kontak.map((k) => (
          <div key={k.label} className="flex items-start justify-between gap-4">
            <span className="shrink-0 text-[9.5px] text-ink-500">{k.label}</span>
            <span className="min-w-0 text-right text-[10px] font-bold leading-[1.4] text-ink-900">
              {k.value}
              {k.badge && (
                <span className="ml-1.5 inline-block rounded-md bg-ptpn-greenLight px-1.5 py-[2px] text-[9px] font-semibold text-ptpn-greenDark">
                  {k.badge}
                </span>
              )}
            </span>
          </div>
        ))}
        <div className="flex items-center justify-between gap-4 pt-0.5">
          <span className="text-[9.5px] text-ink-500">Akun Media Sosial</span>
          <span className="flex items-center gap-2">
            <Linkedin size={13} className="text-[#0a66c2]" strokeWidth={1.8} />
            <Instagram size={13} className="text-[#e4405f]" strokeWidth={1.8} />
            <Facebook size={13} className="text-[#1877f2]" strokeWidth={1.8} />
          </span>
        </div>
      </div>
    </div>
  );
}

function InformasiTambahan() {
  return (
    <div className="card px-4 pb-4 pt-3.5">
      <CardHeader title="Informasi Tambahan" />
      <div className="grid grid-cols-2 gap-x-6">
        <div className="space-y-2">
          {informasiTambahan.kiri.map((it) => (
            <div key={it.label} className="flex items-start gap-4">
              <span className="w-[120px] shrink-0 text-[9.5px] text-ink-500">{it.label}</span>
              <span className="min-w-0 flex-1 whitespace-pre-line text-[10px] font-bold leading-[1.5] text-ink-900">
                {it.value}
              </span>
            </div>
          ))}
        </div>
        <div className="space-y-2">
          {informasiTambahan.kanan.map((it) => (
            <div key={it.label} className="flex items-start gap-4">
              <span className="w-[120px] shrink-0 text-[9.5px] text-ink-500">{it.label}</span>
              <span className="min-w-0 flex-1 text-[10px] font-bold leading-[1.5] text-ink-900">
                {it.value}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Catatan() {
  return (
    <div className="card px-4 pb-4 pt-3.5">
      <CardHeader title="Catatan" />
      <div className="flex items-center gap-2 rounded-lg bg-[#f5f8fa] px-3 py-2.5">
        <Info size={12} className="shrink-0 text-[#2563c9]" strokeWidth={1.8} />
        <p className="text-[9.5px] text-ink-500">Tidak ada catatan tambahan.</p>
      </div>
    </div>
  );
}

export function TabInformasiPribadi() {
  return (
    <div className="space-y-2">
      <div className="grid grid-cols-[minmax(0,620fr)_minmax(0,400fr)_minmax(0,440fr)] gap-3">
        <DataPribadi />
        <KontakAlamat />
        <div className="flex flex-col gap-3">
          <div className="card flex flex-1 flex-col px-4 pb-4 pt-3.5">
            <CardHeader title="Dokumen Identitas" />
            <InfoRows items={dokumenIdentitas} />
          </div>
          <div className="card flex flex-1 flex-col px-4 pb-4 pt-3.5">
            <CardHeader title="Kontak Darurat" />
            <InfoRows items={kontakDarurat} />
          </div>
        </div>
        <div className="col-span-2">
          <InformasiTambahan />
        </div>
        <Catatan />
      </div>
      <p className="text-[9px] text-ink-500">Data terakhir diperbarui: {terakhirDiperbarui}</p>
    </div>
  );
}
