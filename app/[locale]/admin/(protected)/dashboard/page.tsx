import { getDashboardStats, getGuests } from "@/actions/guests";
import { getMyEvent } from "@/actions/events";
import DashboardStats from "@/components/admin/DashboardStats";

export default async function DashboardPage() {
  const [stats, guests, event] = await Promise.all([
    getDashboardStats(),
    getGuests(),
    getMyEvent(),
  ]);

  const recentRsvps = guests
    .filter((g) => g.rsvpSubmittedAt)
    .sort(
      (a, b) =>
        new Date(b.rsvpSubmittedAt!).getTime() -
        new Date(a.rsvpSubmittedAt!).getTime(),
    )
    .slice(0, 8);

  const statusColor: Record<string, string> = {
    ATTENDING: "bg-emerald-100 text-emerald-700",
    DECLINED: "bg-red-100 text-red-600",
    PENDING: "bg-amber-100 text-amber-700",
    MAYBE: "bg-blue-100 text-blue-700",
  };

  return (
    <main className="px-4 sm:px-8 py-6 sm:py-10 w-full max-w-7xl mx-auto space-y-8 sm:space-y-10">
      {/* Page title */}
      <div>
        <h1
          className="text-2xl text-stone-800"
          style={{
            fontFamily: event?.fontDisplay ?? "Georgia",
            fontWeight: 400,
          }}
        >
          Dashboard
        </h1>
        <p
          className="text-xs text-stone-400 mt-0.5"
          style={{ fontFamily: event?.fontBody ?? "system-ui" }}
        >
          {event?.coupleNames} · {event?.title}
        </p>
      </div>

      {/* Stats */}
      <section>
        <h2
          className="text-xs text-stone-400 uppercase tracking-widest mb-4"
          style={{ fontFamily: event?.fontBody ?? "system-ui" }}
        >
          Overview
        </h2>
        <DashboardStats stats={stats} />
      </section>

      {/* Response rate */}
      {stats.total > 0 && (
        <section>
          <h2
            className="text-xs text-stone-400 uppercase tracking-widest mb-3"
            style={{ fontFamily: event?.fontBody ?? "system-ui" }}
          >
            Response Rate
          </h2>
          <div className="bg-white border border-stone-200 rounded-sm p-4 sm:p-6">
            <div className="flex items-center justify-between mb-3">
              <span
                className="text-stone-600 text-sm"
                style={{ fontFamily: event?.fontBody ?? "system-ui" }}
              >
                {stats.total - stats.pending} of {stats.total} households
                responded
              </span>
              <span
                className="text-stone-800 text-sm font-medium"
                style={{ fontFamily: event?.fontBody ?? "system-ui" }}
              >
                {Math.round(
                  ((stats.total - stats.pending) / stats.total) * 100,
                )}
                %
              </span>
            </div>
            <div className="h-2 bg-stone-100 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all"
                style={{
                  width: `${((stats.total - stats.pending) / stats.total) * 100}%`,
                  backgroundColor: event?.primaryColor ?? "#c8890e",
                }}
              />
            </div>
          </div>
        </section>
      )}

      {/* Recent RSVPs */}
      {recentRsvps.length > 0 && (
        <section>
          <h2
            className="text-xs text-stone-400 uppercase tracking-widest mb-4"
            style={{ fontFamily: event?.fontBody ?? "system-ui" }}
          >
            Recent RSVPs
          </h2>

          {/* Mobile: card list */}
          <div className="sm:hidden space-y-2">
            {recentRsvps.map((g) => (
              <div
                key={g.id}
                className="bg-white border border-stone-200 rounded-sm px-4 py-3 flex items-center justify-between"
              >
                <div>
                  <p
                    className="text-stone-800 text-sm"
                    style={{ fontFamily: event?.fontBody ?? "system-ui" }}
                  >
                    {g.primaryName}
                  </p>
                  <p
                    className="text-stone-400 text-xs mt-0.5"
                    style={{ fontFamily: event?.fontBody ?? "system-ui" }}
                  >
                    {g.rsvpSubmittedAt
                      ? new Date(g.rsvpSubmittedAt).toLocaleDateString(
                          "en-GB",
                          {
                            day: "numeric",
                            month: "short",
                            hour: "2-digit",
                            minute: "2-digit",
                          },
                        )
                      : "—"}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <span
                    className="text-stone-400 text-xs"
                    style={{ fontFamily: event?.fontBody ?? "system-ui" }}
                  >
                    {g.rsvp?.totalAttending ?? "—"} guests
                  </span>
                  <span
                    className={`inline-block px-2 py-0.5 rounded-full text-xs ${statusColor[g.rsvpStatus]}`}
                    style={{ fontFamily: event?.fontBody ?? "system-ui" }}
                  >
                    {g.rsvpStatus}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop: full table */}
          <div className="hidden sm:block bg-white border border-stone-200 rounded-sm overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-stone-100">
                  {["Guest", "Status", "Guests", "Responded"].map((h) => (
                    <th
                      key={h}
                      className="text-left text-xs text-stone-400 uppercase tracking-widest px-6 py-4"
                      style={{ fontFamily: event?.fontBody ?? "system-ui" }}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {recentRsvps.map((g) => (
                  <tr
                    key={g.id}
                    className="border-b border-stone-50 hover:bg-stone-50 transition-colors"
                  >
                    <td
                      className="px-6 py-4 text-stone-800 text-sm"
                      style={{ fontFamily: event?.fontBody ?? "system-ui" }}
                    >
                      {g.primaryName}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-block px-2 py-0.5 rounded-full text-xs ${statusColor[g.rsvpStatus]}`}
                        style={{ fontFamily: event?.fontBody ?? "system-ui" }}
                      >
                        {g.rsvpStatus}
                      </span>
                    </td>
                    <td
                      className="px-6 py-4 text-stone-500 text-sm"
                      style={{ fontFamily: event?.fontBody ?? "system-ui" }}
                    >
                      {g.rsvp?.totalAttending ?? "—"}
                    </td>
                    <td
                      className="px-6 py-4 text-stone-400 text-xs"
                      style={{ fontFamily: event?.fontBody ?? "system-ui" }}
                    >
                      {g.rsvpSubmittedAt
                        ? new Date(g.rsvpSubmittedAt).toLocaleDateString(
                            "en-GB",
                            {
                              day: "numeric",
                              month: "short",
                              hour: "2-digit",
                              minute: "2-digit",
                            },
                          )
                        : "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}
    </main>
  );
}
