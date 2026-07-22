export type RsvpStatus = "PENDING" | "ATTENDING" | "DECLINED" | "MAYBE";
export type ContactMethod = "EMAIL" | "WHATSAPP" | "SMS" | "MANUAL";
export type DeliveryStatus = "SENT" | "DELIVERED" | "FAILED" | "PENDING";
export type MessageType = "INVITATION" | "REMINDER" | "CONFIRMATION" | "CUSTOM";

export interface EventData {
  id: string;
  title: string;
  coupleNames: string;
  date: Date;
  time: string;
  venue: string;
  address: string;
  mapUrl: string | null;
  dressCode: string | null;
  message: string | null;
  rules: string | null;
  supportEmail: string | null;
  supportPhone: string | null;
  primaryColor: string;
  accentColor: string;
  fontDisplay: string;
  fontBody: string;
  backgroundStyle: "DARK" | "LIGHT" | "IMAGE";
  themeId: string;
  backgroundImage: string | null;
  
  // Invitation text customizations
  heroSubtitle: string | null;
  anniversaryLabel: string | null;
  heroFooterText: string | null;
  
  // Section titles and descriptions
  programTitle: string | null;
  programSubtitle: string | null;
  programDescription: string | null;
  giftListIntro: string | null;
  giftListPhysicalTitle: string | null;
  giftListMonetaryTitle: string | null;
  
  // RSVP form text
  rsvpTitle: string | null;
  rsvpSubtitle: string | null;
  rsvpDescription: string | null;
  rsvpAttendingLabel: string | null;
  rsvpNotAttendingLabel: string | null;
  rsvpCompanionsLabel: string | null;
  rsvpAddCompanionLabel: string | null;
  rsvpDietaryLabel: string | null;
  rsvpTransportLabel: string | null;
  rsvpMessageLabel: string | null;
  rsvpSubmitAttending: string | null;
  rsvpSubmitNotAttending: string | null;
  rsvpUpdateButton: string | null;
  rsvpAlreadyResponded: string | null;
  
  // Event details section
  detailsSectionTitle: string | null;
  detailsContactText: string | null;
}