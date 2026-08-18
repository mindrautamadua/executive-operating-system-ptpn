import {
  Briefcase,
  CreditCard,
  MapPin,
  Mail,
  Phone,
  Quote,
  ShieldCheck,
} from "lucide-react";
import { PersonAvatar } from "../ui/PersonAvatar";
import {
  executiveAssessment,
  heroRingkas,
  profil,
  talentSignal,
} from "@/lib/profil-data";

const META = [
  {
    icon: Briefcase,
    label: profil.meta.statusKaryawan,
    value: profil.meta.sejak,
    swap: true,
  },
  { icon: CreditCard, label: "NIK", value: profil.meta.nik },
  { icon: MapPin, label: "Tempat, Tgl Lahir", value: profil.meta.ttl },
  { icon: Mail, label: "Email", value: profil.meta.email },
  { icon: Phone, label: "Telepon", value: profil.meta.telepon },
];

const SIGNAL_TONE: Record<string, string> = {
  green: "text-ptpn-greenDark",
  amber: "text-[#d97706]",
  red: "text-[#dc2626]",
};

export function ProfilHero() {
  return (
    <div className="flex items-stretch gap-5 px-5 pb-4 pt-4">
      <div className="min-w-0 flex-1">
        <div className="flex items-start gap-5">
          <PersonAvatar
            seed={profil.seed}
            name={profil.nama}
            size={92}
            className="ring-4 ring-[#eef5f0]"
          />

          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2.5">
              <h2 className="text-[19px] font-extrabold tracking-tight text-ink-900">
                {profil.nama}
              </h2>
              {/* Tiga dimensi taxonomy berbeda — jangan dicampur jadi satu badge. */}
              <span className="flex items-center overflow-hidden rounded-full border border-[#c6e8d4] text-[9px] font-extrabold uppercase tracking-[0.04em]">
                <span className="bg-[#eef2f6] px-1.5 py-[3px] text-ink-400">Segmen</span>
                <span className="bg-ptpn-greenLight px-2 py-[3px] text-ptpn-greenDark">
                  {profil.badge}
                </span>
              </span>
              <span className="flex items-center overflow-hidden rounded-full border border-[#c6e8d4] text-[9px] font-extrabold uppercase tracking-[0.04em]">
                <span className="bg-[#eef2f6] px-1.5 py-[3px] text-ink-400">Status</span>
                <span className="bg-ptpn-green px-2 py-[3px] text-white">High Potential</span>
              </span>
              <span className="flex items-center overflow-hidden rounded-full border border-[#f6e2b4] text-[9px] font-extrabold uppercase tracking-[0.04em]">
                <span className="bg-[#eef2f6] px-1.5 py-[3px] text-ink-400">Suksesi</span>
                <span className="bg-[#fdf3e0] px-2 py-[3px] text-[#c07c05]">Ready 1–2 Thn</span>
              </span>
            </div>
            <div className="mt-1 text-[11.5px] font-medium text-ink-700">
              {profil.jabatan} <span className="mx-1 text-ink-300">•</span>
              <span className="text-ink-500">
                {profil.unit} — {profil.lokasi}
              </span>
            </div>
            <div className="mt-[3px] text-[10.5px] font-bold text-ink-900">
              {heroRingkas}
            </div>

            <div className="mt-3.5 flex flex-wrap gap-x-7 gap-y-2.5 border-t border-[#f0f3f6] pt-3">
              {META.map(({ icon: Icon, label, value, swap }) => (
                <div key={label} className="flex items-start gap-2">
                  <Icon
                    size={13}
                    className="mt-[2px] shrink-0 text-ink-400"
                    strokeWidth={1.8}
                  />
                  <div className="leading-tight">
                    <div
                      className={
                        swap
                          ? "text-[10px] font-semibold text-ink-700"
                          : "text-[9px] text-ink-500"
                      }
                    >
                      {label}
                    </div>
                    <div
                      className={
                        swap
                          ? "mt-[2px] text-[9px] text-ink-500"
                          : "mt-[2px] text-[10px] font-semibold text-ink-700"
                      }
                    >
                      {value}
                    </div>
                  </div>
                </div>
              ))}
              <div className="flex items-center gap-1.5 text-[8.5px] text-ink-400">
                <ShieldCheck size={12} strokeWidth={1.8} />
                Data sensitif disamarkan sesuai kebijakan privasi
              </div>
            </div>
          </div>
        </div>

        {/* Executive Assessment — kesimpulan 30 detik untuk pembaca BOD;
            mengisi ruang di samping bagian bawah panel Talent Signal. */}
        <div className="mt-3.5 flex items-start gap-2.5 rounded-xl border-l-[3px] border-ptpn-green bg-ptpn-greenLight/60 px-3.5 py-2.5">
          <Quote size={13} className="mt-[1px] shrink-0 text-ptpn-green" />
          <div className="min-w-0">
            <div className="text-[8.5px] font-extrabold uppercase tracking-[0.07em] text-ptpn-greenDark">
              Executive Assessment
            </div>
            <p className="mt-[3px] text-[10px] font-semibold leading-[1.5] text-ink-900">
              {executiveAssessment}
            </p>
          </div>
        </div>
      </div>

      {/* Talent Signal — sinyal keputusan utama untuk pembaca eksekutif. */}
      <div className="w-[240px] shrink-0 self-start overflow-hidden rounded-xl border border-[#e9eef3]">
        <div className="border-b border-[#e9eef3] bg-[#f7f9fb] px-3.5 py-2 text-[10px] font-bold text-ink-900">
          Talent Signal
        </div>
        <div className="space-y-2 px-3.5 py-2.5">
          {talentSignal.map((s) => (
            <div key={s.label} className="flex items-center justify-between">
              <span className="text-[9.5px] text-ink-500">{s.label}</span>
              <span
                className={`text-[9.5px] font-extrabold ${SIGNAL_TONE[s.tone]}`}
              >
                {s.value}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
