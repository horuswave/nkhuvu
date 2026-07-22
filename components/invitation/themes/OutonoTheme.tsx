"use client";

import { useMemo, useState } from "react";
import InvitationHero from "../heroes/OutonoHero";
import EventDetails from "../EventDetails";
import ProgramSection from "../ProgramSection";
import GiftListSection from "../Giftlistsection";
import RsvpForm from "../RsvpForm";
import EnvelopeOpening from "../EnvelopeOpening";
import type { EventData } from "@/types";

interface ThemeProps {
  event: EventData & { themeConfig?: any };
  guestName: string;
  token: string;
  maxAllowed: number;
  existingRsvp: any;
  existingCompanions: any;
}

function formatWeddingDate(date: unknown) {
  if (!date) return "";

  if (date instanceof Date) {
    return new Intl.DateTimeFormat("pt-PT", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }).format(date);
  }

  if (typeof date === "string") {
    const parsed = new Date(date);
    if (!Number.isNaN(parsed.getTime())) {
      return new Intl.DateTimeFormat("pt-PT", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      }).format(parsed);
    }
    return date;
  }

  return String(date);
}

export default function OutonoTheme({
  event,
  guestName,
  token,
  maxAllowed,
  existingRsvp,
  existingCompanions,
}: ThemeProps) {
  const [envelopeOpened, setEnvelopeOpened] = useState(false);

  const weddingDate = useMemo(
    () => formatWeddingDate(event.date),
    [event.date],
  );

  // Enquanto o envelope não for aberto, mostramos apenas a animação de abertura.
  if (!envelopeOpened) {
    return (
      <EnvelopeOpening
        coupleNames={event.coupleNames}
        weddingDate={weddingDate}
        onOpen={() => setEnvelopeOpened(true)}
      />
    );
  }

  // Após abrir o envelope, exibimos o convite completo com todas as secções.
  return (
    <main className="outono-theme">
      <InvitationHero event={event} guestName={guestName} />
      <EventDetails event={event} />
      <ProgramSection event={event} />
      <GiftListSection event={event} />
      <RsvpForm
        token={token}
        maxAllowed={maxAllowed}
        event={event}
        existingRsvp={existingRsvp}
        existingCompanions={existingCompanions}
      />
    </main>
  );
}
