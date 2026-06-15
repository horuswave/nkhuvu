import { getDashboardStats, getGuests } from "@/actions/guests";
import { getMyEvent } from "@/actions/events";
import DashboardStats from "@/components/admin/DashboardStats";
import AdminPageShell, {
  AdminSection,
} from "@/components/admin/AdminPageShell";
import Link from "next/link";
import { UserPlus, Send, Settings, ArrowRight } from "lucide-react";

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
    ATTENDING: "bg-emerald-100/80 text-emerald-700 border border-emerald-200",
    DECLINED: "bg-rose-100/80 text-rose-700 border border-rose-200",
    PENDING: "bg-amber-100/80 text-amber-700 border border-amber-200",
    MAYBE: "bg-blue-100/80 text-blue-700 border border-blue-200",
  };

  const responseRate =
    stats.total > 0
      ? Math.round(((stats.total - stats.pending) / stats.total) * 100)
      : 0;

  const primaryColor = event?.primaryColor ?? "#c8890e";

  return (
    <AdminPageShell
      title="Dashboard"
      description={[event?.coupleNames, event?.title].filter(Boolean).join(" · ")}
    >
      {/* Quick actions */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {[
          {
            href: "/admin/guests/new",
            label: "Add Guest",
            icon: UserPlus,
            desc: "Invite a new household",
          },
          {
            href: "/admin/communications",
            label: "Send Invites",
            icon: Send,
            desc: `${stats.pending} awaiting reply`,
          },
          {
            href: "/admin/settings",
            label: "Event Settings",
            icon: Settings,
            desc: "Customize your event",
          },
        ].map((action) => (
          <Link
            key={action.href}
            href={action.href}
            className="card-interactive p-4 flex items-center gap-4 group"
          >
            <div
              className="p-2.5 rounded-xl shrink-0"
              style={{ backgroundColor: `${primaryColor}15`, color: primaryColor }}
            >
              <action.icon size={20} />
            </div>
            <div className="min-w-0 flex-1">
              <p className="font-semibold text-stone-900 text-sm">
                {action.label}
              </p>
              <p className="text-xs text-stone-500 truncate">{action.desc}</p>
            </div>
            <ArrowRight
              size={16}
              className="text-stone-300 group-hover:text-stone-600 shrink-0 transition-colors"
            />
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2 space-y-6">
          <AdminSection title="Overview">
            <DashboardStats stats={stats} />
          </AdminSection>

          {stats.total > 0 && (
            <AdminSection title="Response Rate">
              <div className="card-elevated p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-stone-500 text-sm font-medium">
                    <strong className="text-stone-900">
                      {stats.total - stats.pending}
                    </strong>{" "}
                    of {stats.total} households responded
                  </span>
                  <span className="text-2xl font-bold text-stone-800 tabular-nums">
                    {responseRate}%
                  </span>
                </div>
                <div className="h-3 bg-stone-100/80 rounded-full overflow-hidden shadow-inner relative">
                  <div
                    className="h-full rounded-full transition-all duration-1000 ease-out relative overflow-hidden"
                    style={{
                      width: `${responseRate}%`,
                      backgroundColor: primaryColor,
                    }}
                  >
                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full animate-[shimmer_2s_infinite]" />
                  </div>
                </div>
              </div>
            </AdminSection>
          )}
        </div>

        <div className="xl:col-span-1">
          <AdminSection
            title="Recent RSVPs"
            action={
              recentRsvps.length > 0 ? (
                <Link
                  href="/admin/guests"
                  className="text-xs font-semibold text-stone-500 hover:text-stone-900"
                >
                  View all
                </Link>
              ) : undefined
            }
          >
            <div className="card-elevated overflow-hidden flex flex-col min-h-[280px]">
              {recentRsvps.length === 0 ? (
                <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
                  <p className="text-sm text-stone-400 mb-3">No RSVPs yet</p>
                  <Link
                    href="/admin/guests/new"
                    className="text-xs font-semibold text-amber-700 hover:text-amber-800"
                  >
                    Add your first guest →
                  </Link>
                </div>
              ) : (
                <>
                  <div className="flex-1 overflow-y-auto p-2 max-h-[400px]">
                    <div className="space-y-0.5">
                      {recentRsvps.map((g) => (
                        <div
                          key={g.id}
                          className="group flex items-center justify-between p-3 rounded-xl hover:bg-stone-50 transition-colors"
                        >
                          <div className="min-w-0">
                            <span className="text-stone-800 text-sm font-semibold block truncate">
                              {g.primaryName}
                            </span>
                            <span className="text-stone-400 text-xs font-medium">
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
                            </span>
                          </div>
                          <div className="flex flex-col items-end gap-1 shrink-0 ml-3">
                            <span
                              className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wide uppercase ${statusColor[g.rsvpStatus]}`}
                            >
                              {g.rsvpStatus}
                            </span>
                            <span className="text-stone-400 text-xs font-medium">
                              {g.rsvp?.totalAttending ?? 0} guests
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="p-4 border-t border-stone-100 bg-stone-50/50 text-center">
                    <Link
                      href="/admin/guests"
                      className="text-xs font-semibold text-stone-500 hover:text-stone-900 transition-colors"
                    >
                      View all guests →
                    </Link>
                  </div>
                </>
              )}
            </div>
          </AdminSection>
        </div>
      </div>
    </AdminPageShell>
  );
}
