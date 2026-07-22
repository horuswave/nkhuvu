"use client";

import ThemeWrapper from "./themes/ThemeWrapper";
import type { EventData } from "@/types";

interface InvitationWrapperProps {
  event: EventData & { themeConfig?: any };
  guestName: string;
  token: string;
  maxAllowed: number;
  existingRsvp: any;
  existingCompanions: any;
}

export default function InvitationWrapper({
  event,
  guestName,
  token,
  maxAllowed,
  existingRsvp,
  existingCompanions,
}: InvitationWrapperProps) {
  return (
    <ThemeWrapper
      event={event}
      guestName={guestName}
      token={token}
      maxAllowed={maxAllowed}
      existingRsvp={existingRsvp}
      existingCompanions={existingCompanions}
    />
  );
}
