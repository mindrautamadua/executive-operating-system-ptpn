import {
  Bot,
  BookText,
  BrainCircuit,
  CalendarCheck,
  Contact,
  CalendarClock,
  Database,
  Gauge,
  GitFork,
  GraduationCap,
  Handshake,
  HeartHandshake,
  LayoutDashboard,
  Network,
  Radar,
  Route,
  ShieldAlert,
  Sigma,
  TrendingUp,
  UserRoundSearch,
  Users,
  UsersRound,
  Wallet,
  type LucideIcon,
} from "lucide-react";

export interface SdmMenuItem {
  label: string;
  icon: LucideIcon;
  href?: string;
  /** Badge kecil di kanan label, mis. "AI". */
  badge?: string;
}

export interface SdmMenuSection {
  /** Judul section; kosong = tanpa judul (mis. Executive Overview). */
  title?: string;
  items: SdmMenuItem[];
}

/** Menu HC Executive Operating System — dikelompokkan per domain intelijen. */
export const SDM_MENU_SECTIONS: SdmMenuSection[] = [
  {
    items: [
      { label: "Executive Overview", icon: LayoutDashboard, href: "/sdm-talenta" },
      { label: "Direktori Karyawan", icon: Contact, href: "/sdm-talenta/direktori-karyawan" },
    ],
  },
  {
    title: "People Intelligence",
    items: [
      { label: "Workforce Analytics", icon: Users, href: "/workforce-analytics" },
      { label: "People Productivity", icon: TrendingUp, href: "/people-productivity" },
      { label: "Talent Intelligence", icon: BrainCircuit, href: "/talent-intelligence" },
      { label: "People Math & HPI", icon: Sigma, href: "/people-math-hpi" },
      { label: "Performance", icon: Gauge, href: "/kinerja-karyawan" },
      { label: "Succession", icon: GitFork, href: "/succession-planning" },
    ],
  },
  {
    title: "Risk Intelligence",
    items: [
      { label: "People Risk Radar", icon: Radar, href: "/people-risk-radar" },
      { label: "Risk & Compliance", icon: ShieldAlert, href: "/risk-compliance" },
    ],
  },
  {
    title: "Workforce Planning",
    items: [
      { label: "Workforce Planning", icon: CalendarCheck, href: "/workforce-planning" },
      { label: "Scenario Simulation", icon: Route, href: "/scenario-simulation" },
    ],
  },
  {
    title: "Operational",
    items: [
      { label: "Recruitment", icon: UserRoundSearch, href: "/rekrutmen" },
      { label: "Learning & Development", icon: GraduationCap, href: "/learning-development" },
      { label: "Compensation", icon: Wallet, href: "/compensation-benefits" },
      { label: "Employee Engagement", icon: HeartHandshake, href: "/employee-engagement" },
      { label: "Diversity & Inclusion", icon: UsersRound, href: "/diversity-inclusion" },
      { label: "Industrial Relations", icon: Handshake, href: "/industrial-relations" },
      { label: "Absensi & Kehadiran", icon: CalendarClock, href: "/absensi-kehadiran" },
      { label: "Organisasi & Jabatan", icon: Network, href: "/organisasi-jabatan" },
    ],
  },
  {
    title: "Support",
    items: [
      { label: "AI HR Assistant", icon: Bot, badge: "AI", href: "/ai-hr-assistant" },
      { label: "Data & Analytics", icon: Database, href: "/data-analytics" },
      { label: "Data Dictionary", icon: BookText, href: "/data-dictionary" },
    ],
  },
];

/** Daftar datar untuk pencocokan label/href aktif. */
export const SDM_MENU: SdmMenuItem[] = SDM_MENU_SECTIONS.flatMap((s) => s.items);
