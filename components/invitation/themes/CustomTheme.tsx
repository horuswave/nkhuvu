"use client";

import { useState } from "react";
import InvitationHero from "../InvitationHero";
import EventDetails from "../EventDetails";
import ProgramSection from "../ProgramSection";
import GiftListSection from "../Giftlistsection";
import RsvpForm from "../RsvpForm";
import EnvelopeOpening from "../EnvelopeOpening";
import type { EventData } from "@/types";

/**
 * CustomTheme - Example of a fully customized theme component
 * 
 * This demonstrates how you have complete control over:
 * - Layout structure and section ordering
 * - Custom animations and transitions
 * - Unique visual elements
 * - Conditional rendering based on event data
 * - Custom styling per section
 */
interface ThemeProps {
  event: EventData & { themeConfig?: any };
  guestName: string;
  token: string;
  maxAllowed: number;
  existingRsvp: any;
  existingCompanions: any;
}

export default function CustomTheme({
  event,
  guestName,
  token,
  maxAllowed,
  existingRsvp,
  existingCompanions,
}: ThemeProps) {
  const [envelopeOpened, setEnvelopeOpened] = useState(false);

  // Example: Custom envelope animation for this theme
  if (!envelopeOpened) {
    return (
      <EnvelopeOpening
        coupleNames={event.coupleNames}
        onOpen={() => setEnvelopeOpened(true)}
      />
    );
  }

  return (
    <main className="custom-theme">
      {/* Custom Hero with unique layout */}
      <section className="custom-hero">
        <InvitationHero event={event} guestName={guestName} />
        
        {/* Example: Add a custom announcement banner */}
        {event.dressCode && (
          <div className="dress-code-banner">
            <p>Dress Code: {event.dressCode}</p>
          </div>
        )}
      </section>

      {/* Custom section ordering - EventDetails first */}
      <EventDetails event={event} />

      {/* Example: Add a custom divider or separator */}
      <div className="custom-divider">
        <span>Celebration Program</span>
      </div>

      {/* Program section with custom wrapper */}
      <section className="program-section-custom">
        <ProgramSection event={event} />
      </section>

      {/* Example: Add a custom message between sections */}
      {event.message && (
        <div className="special-message">
          <p>{event.message}</p>
        </div>
      )}

      {/* Gift list section */}
      <GiftListSection event={event} />

      {/* Custom RSVP section with additional info */}
      <section className="rsvp-section-custom">
        <div className="rsvp-header">
          <h2>We hope you can join us!</h2>
        </div>
        <RsvpForm
          token={token}
          maxAllowed={maxAllowed}
          event={event}
          existingRsvp={existingRsvp}
          existingCompanions={existingCompanions}
        />
      </section>

      {/* Custom footer */}
      <footer className="custom-footer">
        <p>Thank you for being part of our special day</p>
      </footer>
    </main>
  );
}