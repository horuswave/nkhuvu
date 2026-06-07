import { getGuests } from "@/actions/guests";
import { getMyEvent } from "@/actions/events";
import Link from "next/link";
import GuestList from "./GuestList";

export default async function GuestsPage() {
  const [guests, event] = await Promise.all([getGuests(), getMyEvent()]);
  const pendingCount = guests.filter((g) => g.rsvpStatus === "PENDING").length;

  return (
    <main className="px-4 sm:px-8 py-6 sm:py-10 w-full max-w-7xl mx-auto">
      {/* Page title + add button */}
      <div className="flex items-start justify-between mb-8">
        <div>
          <h1
            className="text-2xl text-stone-800"
            style={{
              fontFamily: event?.fontDisplay ?? "Georgia",
              fontWeight: 400,
            }}
          >
            Guest List
          </h1>
          <p
            className="text-stone-400 text-xs mt-0.5"
            style={{ fontFamily: event?.fontBody ?? "system-ui" }}
          >
            {guests.length} households · {event?.title}
          </p>
        </div>
        <Link
          href="/admin/guests/new"
          className="shrink-0 px-3 sm:px-4 py-2 rounded text-sm text-white transition-colors"
          style={{ backgroundColor: event?.primaryColor ?? "#c8890e" }}
        >
          <span className="hidden sm:inline">+ Add Guest</span>
          <span className="sm:hidden">+ Add</span>
        </Link>
      </div>

      <GuestList guests={guests} event={event} pendingCount={pendingCount} />
    </main>
  );
}
