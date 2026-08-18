"use client";

import { CalendarCheck, CalendarClock, ScrollText, Users, UsersRound, Handshake } from "lucide-react";
import { agendaKpi } from "@/lib/dek-data";
import { DekKpiCards, type DekKpiCardItem } from "../DekKpiCards";
import { useSubholding } from "@/components/SubholdingProvider";
import { ScopeNote } from "@/components/ui/ScopeNote";

const ICONS = [CalendarCheck, Handshake, UsersRound, Users, ScrollText, CalendarClock];

const items: DekKpiCardItem[] = agendaKpi.map((k, i) => ({ ...k, icon: ICONS[i] }));

export function AgendaKpiStrip() {
  const { isFiltered } = useSubholding();

  return (
    <>
      {isFiltered && (
        <div className="mb-1.5 flex justify-end">
          <ScopeNote />
        </div>
      )}
      <DekKpiCards items={items} cols="grid-cols-2 md:grid-cols-3 xl:grid-cols-6" />
    </>
  );
}
