"use client";

import InvitationHero from "../heroes/MinimalHero";
import EventDetails from "../EventDetails";
import ProgramSection from "../ProgramSection";
import GiftListSection from "../Giftlistsection";
import RsvpForm from "../RsvpForm";
import type { EventData } from "@/types";

interface ThemeProps {
  event: EventData & { themeConfig?: any };
  guestName: string;
  token: string;
  maxAllowed: number;
  existingRsvp: any;
  existingCompanions: any;
}

export default function MinimalTheme({
  event,
  guestName,
  token,
  maxAllowed,
  existingRsvp,
  existingCompanions,
}: ThemeProps) {
  return (
    <main className="minimal-theme">
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