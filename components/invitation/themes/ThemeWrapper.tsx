"use client";

import type { EventData } from "@/types";
import ClassicTheme from "./ClassicTheme";
import ModernTheme from "./ModernTheme";
import MinimalTheme from "./MinimalTheme";
import ElegantTheme from "./ElegantTheme";
import PlayfulTheme from "./PlayfulTheme";
import OutonoTheme from "./OutonoTheme";

interface ThemeWrapperProps {
  event: EventData & { themeConfig?: any };
  guestName: string;
  token: string;
  maxAllowed: number;
  existingRsvp: any;
  existingCompanions: any;
}

export default function ThemeWrapper({
  event,
  guestName,
  token,
  maxAllowed,
  existingRsvp,
  existingCompanions,
}: ThemeWrapperProps) {
  const themeId = event.themeConfig?.id || "classic";

  const themeProps = {
    event,
    guestName,
    token,
    maxAllowed,
    existingRsvp,
    existingCompanions,
  };

  switch (themeId) {
    case "classic":
      return <ClassicTheme {...themeProps} />;
    case "modern":
      return <ModernTheme {...themeProps} />;
    case "minimal":
      return <MinimalTheme {...themeProps} />;
    case "elegant":
      return <ElegantTheme {...themeProps} />;
    case "playful":
      return <PlayfulTheme {...themeProps} />;
    case "outono":
      return <OutonoTheme {...themeProps} />;
    default:
      return <ClassicTheme {...themeProps} />;
  }
}