import {
  AlertTriangle,
  CheckCircle2,
  ChevronRight,
  RefreshCw,
  UserCheck,
  XCircle,
} from "lucide-react";
import { aktivitasTerbaru, AKTIVITAS_TONE } from "@/lib/rekrutmen-data";

const ICONS = {
  check: CheckCircle2,
  user: UserCheck,
  alert: AlertTriangle,
  refresh: RefreshCw,
  close: XCircle,
};

export function AktivitasTerbaru() {
  return (
    <div
      className="card anim-rise flex h-full flex-col px-4 pb-2.5 pt-3"
      style={{ "--d": "180ms" } as React.CSSProperties}
    >
      <h3 className="card-title-navy">Aktivitas Terbaru</h3>

      <div className="mt-1.5 flex min-h-0 flex-1 flex-col justify-between">
        {aktivitasTerbaru.map((a, i) => {
          const Icon = ICONS[a.icon];
          return (
            <div
              key={a.judul}
              className="anim-rise flex items-start gap-2 rounded-md py-[3px]"
              style={{ "--d": `${200 + i * 70}ms` } as React.CSSProperties}
            >
              <span
                className={`${AKTIVITAS_TONE[a.tone]} mt-[1px] flex h-[20px] w-[20px] shrink-0 items-center justify-center rounded-lg`}
              >
                <Icon size={11} strokeWidth={2} />
              </span>
              <div className="min-w-0 flex-1 leading-[1.35]">
                <div className="flex items-center gap-1.5 text-[9.5px] font-semibold text-ink-900">
                  <span className="truncate">{a.judul}</span>
                  {/* item terbaru diberi titik "live" berdenyut */}
                  {i === 0 && (
                    <span className="h-[6px] w-[6px] shrink-0 animate-pulseDot rounded-full bg-ptpn-green" />
                  )}
                </div>
                {a.detail && <div className="text-[9px] text-ink-500">{a.detail}</div>}
                {a.oleh && <div className="text-[9px] text-ink-500">{a.oleh}</div>}
              </div>
              <span className="shrink-0 text-[9px] tabular-nums text-ink-500">{a.jam}</span>
            </div>
          );
        })}
      </div>

      <button className="link-more mt-1.5 flex items-center gap-1 self-start">
        Lihat semua aktivitas <ChevronRight size={11} />
      </button>
    </div>
  );
}
