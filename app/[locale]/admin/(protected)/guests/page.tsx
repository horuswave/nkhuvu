import { getGuests } from "@/actions/guests";
import { getMyEvent } from "@/actions/events";
import Link from "next/link";
import GuestList from "./GuestList";
import AdminPageShell from "@/components/admin/AdminPageShell";

export default async function GuestsPage() {
  const [guests, event] = await Promise.all([getGuests(), getMyEvent()]);
  const pendingCount = guests.filter((g) => g.rsvpStatus === "PENDING").length;
  const primaryColor = event?.primaryColor ?? "#c8890e";

  return (
    <AdminPageShell
      title="Guest List"
      description={`${guests.length} households · ${event?.title ?? ""}`}
      actions={
        <Link
          href="/admin/guests/new"
          className="btn-primary !text-sm !py-2.5"
          style={{ backgroundColor: primaryColor }}
        >
          + Add Guest
        </Link>
      }
    >
      <GuestList guests={guests} event={event} pendingCount={pendingCount} />
    </AdminPageShell>
  );
}
