"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { DonutChart } from "../ui/DonutChart";
import { ringkasanKehadiran, subStatusKehadiran, totalKaryawan } from "@/lib/absensi-data";

export function RingkasanKehadiran() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <div className="card anim-rise flex h-full flex-col px-4 pb-2.5 pt-3">
      <h3 className="card-title-navy">Ringkasan Kehadiran</h3>
      <p
        className="mt-[3px] cursor-help text-[9.5px] text-ink-500"
        title="Presence Rate = karyawan hadir ÷ total populasi (snapshot orang). Berbeda dari Attendance Rate 96,2% yang dihitung dari hari kerja hadir ÷ hari kerja terjadwal."
      >
        Berdasarkan Status Karyawan · Presence Rate 92,1% ⓘ
      </p>

      <div className="flex min-h-0 flex-1 items-center">
        <DonutChart
          data={ringkasanKehadiran.map((d) => ({
            name: d.name,
            value: d.jumlah,
            color: d.color,
          }))}
          size={150}
          centerValue={totalKaryawan.toLocaleString("id-ID")}
          centerCaption="Total Karyawan"
          onHover={setActive}
        />

        <div className="ml-2 flex min-w-0 flex-1 flex-col gap-[7px]">
          {ringkasanKehadiran.map((d, i) => (
            <div
              key={d.name}
              className="flex items-center gap-2 whitespace-nowrap transition-opacity"
              style={{ opacity: active === null || active === i ? 1 : 0.35 }}
            >
              <span
                className="h-[8px] w-[8px] shrink-0 rounded-[2px]"
                style={{ background: d.color }}
              />
              <span className="w-[46px] text-[9.5px] text-ink-700">{d.name}</span>
              <span className="ml-auto text-[9.5px] tabular-nums text-ink-900">{d.label}</span>
              <span className="w-[40px] text-right text-[9.5px] tabular-nums text-ink-400">
                {d.pct}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Terlambat & WFH adalah subset "Hadir" — bukan irisan donat */}
      <div className="flex gap-1.5">
        {subStatusKehadiran.map((s) => (
          <div
            key={s.name}
            className="flex flex-1 items-center gap-1.5 rounded-lg bg-[#f6f9fc] px-2 py-[4px]"
          >
            <span
              className="h-[7px] w-[7px] shrink-0 rounded-full"
              style={{ background: s.color }}
            />
            <span className="text-[9px] text-ink-700">{s.name}</span>
            <span className="ml-auto text-[9.5px] font-bold tabular-nums text-ink-900">
              {s.label}
            </span>
            <span className="text-[9px] tabular-nums text-ink-500">{s.pct}</span>
          </div>
        ))}
      </div>

      <button className="link-more mt-1.5 flex items-center gap-1">
        Lihat detail kehadiran <ArrowRight size={11} />
      </button>
    </div>
  );
}
