import { notFound } from "next/navigation";
import { getGuestByToken } from "@/actions/guests";
import { applyThemeToEvent } from "@/lib/themes";
import InvitationWrapper from "@/components/invitation/InvitationWrapper";
import type { RsvpFields } from "@/components/invitation/RsvpForm";
import type {
  ProgramItem,
} from "@/components/invitation/ProgramSection";
import type {
  GiftItem,
  GiftItemType,
} from "@/app/admin/(protected)/settings/GiftListEditor";

// ─── Parsers ────────────────────────────────────────────────────────────────

function parseRsvpFields(value: unknown): RsvpFields | undefined {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return undefined;
  }

  const obj = value as Record<string, unknown>;

  return {
    companions: typeof obj.companions === "boolean" ? obj.companions : true,
    dietary: typeof obj.dietary === "boolean" ? obj.dietary : true,
    transport: typeof obj.transport === "boolean" ? obj.transport : true,
    message: typeof obj.message === "boolean" ? obj.message : true,
  };
}

function parseProgramItems(value: unknown): ProgramItem[] | undefined {
  if (!Array.isArray(value)) return undefined;

  return value
    .filter(
      (item): item is Record<string, unknown> =>
        typeof item === "object" && item !== null,
    )
    .map((item) => ({
      id: typeof item.id === "string" ? item.id : crypto.randomUUID(),
      type:
        typeof item.type === "string"
          ? (item.type as ProgramItem["type"])
          : "CUSTOM",
      label: typeof item.label === "string" ? item.label : "",
      time: typeof item.time === "string" ? item.time : "",
      notes: typeof item.notes === "string" ? item.notes : undefined,
      // ✅ Location fields
      locationLabel:
        typeof item.locationLabel === "string" && item.locationLabel.trim()
          ? item.locationLabel.trim()
          : undefined,
      locationUrl:
        typeof item.locationUrl === "string" && item.locationUrl.trim()
          ? item.locationUrl.trim()
          : undefined,
    }))
    .filter((item) => item.label && item.time);
}

function parseGiftList(value: unknown): GiftItem[] | undefined {
  if (!Array.isArray(value)) return undefined;

  return value
    .filter(
      (item): item is Record<string, unknown> =>
        typeof item === "object" && item !== null,
    )
    .map((item) => {
      const type: GiftItemType = item.type === "MONETARY" ? "MONETARY" : "ITEM";

      return {
        id: typeof item.id === "string" ? item.id : crypto.randomUUID(),

        // name / title fallback
        name:
          typeof item.name === "string"
            ? item.name
            : typeof item.title === "string"
              ? item.title
              : "",

        type,

        // Physical
        store: typeof item.store === "string" ? item.store : undefined,
        storeUrl: typeof item.storeUrl === "string" ? item.storeUrl : undefined,
        note: typeof item.note === "string" ? item.note : undefined,

        // Monetary
        suggestedAmount:
          typeof item.suggestedAmount === "number"
            ? item.suggestedAmount
            : undefined,
        currency: typeof item.currency === "string" ? item.currency : undefined,

        // Bank
        bankName: typeof item.bankName === "string" ? item.bankName : undefined,
        bankAccountHolder:
          typeof item.bankAccountHolder === "string"
            ? item.bankAccountHolder
            : undefined,
        bankIban: typeof item.bankIban === "string" ? item.bankIban : undefined,
        bankReference:
          typeof item.bankReference === "string"
            ? item.bankReference
            : undefined,

        // Mobile wallet
        mobileWalletProvider:
          typeof item.mobileWalletProvider === "string"
            ? item.mobileWalletProvider
            : undefined,
        mobileWalletNumber:
          typeof item.mobileWalletNumber === "string"
            ? item.mobileWalletNumber
            : undefined,
        // ✅ Added mobile wallet holder name
        mobileWalletHolderName:
          typeof item.mobileWalletHolderName === "string"
            ? item.mobileWalletHolderName
            : undefined,
      };
    })
    .filter((item) => item.name || item.suggestedAmount);
}
// ─── Page ───────────────────────────────────────────────────────────────────

export default async function InvitationPage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = await params;
  const guest = await getGuestByToken(token);

  if (!guest || !guest.event) notFound();

  const event = {
    ...guest.event,
    themeId: (guest.event as any).themeId || "classic",
    backgroundImage: (guest.event as any).backgroundImage || null,
    rsvpFields: parseRsvpFields(guest.event.rsvpFields),
    programItems: parseProgramItems(guest.event.programItems),
    giftList: parseGiftList(guest.event.giftList),
    // Invitation text customizations
    heroSubtitle: (guest.event as any).heroSubtitle,
    anniversaryLabel: (guest.event as any).anniversaryLabel,
    heroFooterText: (guest.event as any).heroFooterText,
    // Section titles and descriptions
    programTitle: (guest.event as any).programTitle,
    programSubtitle: (guest.event as any).programSubtitle,
    programDescription: (guest.event as any).programDescription,
    giftListIntro: (guest.event as any).giftListIntro,
    giftListPhysicalTitle: (guest.event as any).giftListPhysicalTitle,
    giftListMonetaryTitle: (guest.event as any).giftListMonetaryTitle,
    // RSVP form text
    rsvpTitle: (guest.event as any).rsvpTitle,
    rsvpSubtitle: (guest.event as any).rsvpSubtitle,
    rsvpDescription: (guest.event as any).rsvpDescription,
    rsvpAttendingLabel: (guest.event as any).rsvpAttendingLabel,
    rsvpNotAttendingLabel: (guest.event as any).rsvpNotAttendingLabel,
    rsvpCompanionsLabel: (guest.event as any).rsvpCompanionsLabel,
    rsvpAddCompanionLabel: (guest.event as any).rsvpAddCompanionLabel,
    rsvpDietaryLabel: (guest.event as any).rsvpDietaryLabel,
    rsvpTransportLabel: (guest.event as any).rsvpTransportLabel,
    rsvpMessageLabel: (guest.event as any).rsvpMessageLabel,
    rsvpSubmitAttending: (guest.event as any).rsvpSubmitAttending,
    rsvpSubmitNotAttending: (guest.event as any).rsvpSubmitNotAttending,
    rsvpUpdateButton: (guest.event as any).rsvpUpdateButton,
    rsvpAlreadyResponded: (guest.event as any).rsvpAlreadyResponded,
    // Event details section
    detailsSectionTitle: (guest.event as any).detailsSectionTitle,
    detailsContactText: (guest.event as any).detailsContactText,
  };

  // Apply theme to event
  const themedEvent = applyThemeToEvent(event, event.themeId as any);

  return (
    <InvitationWrapper
      event={themedEvent}
      guestName={guest.primaryName}
      token={token}
      maxAllowed={guest.maxAllowed}
      existingRsvp={guest.rsvp}
      existingCompanions={guest.companions}
    />
  );
}
