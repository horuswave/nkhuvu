import { getAllEvents } from "@/actions/events";
import { getVisitorStats } from "@/actions/landing-leads";
import AdminPageShell, {
  AdminSection,
} from "@/components/admin/AdminPageShell";
import { StatCard } from "@/components/ui/stat-card";
import Link from "next/link";
import {
  CalendarDays,
  Users,
  UserCheck,
  Eye,
  ArrowRight,
  Plus,
} from "lucide-react";

export default async function SuperDashboardPage() {
  const [events, visitorStats] = await Promise.all([
    getAllEvents(),
    getVisitorStats(),
  ]);

  const totalGuests = events.reduce((s, e) => s + e._count.guests, 0);
  const totalAttending = events.reduce(
    (s, e) =>
      s +
      e.guests
        .filter((g) => g.rsvpStatus === "ATTENDING")
        .reduce((gs, g) => gs + (g.rsvp?.totalAttending ?? 1), 0),
    0,
  );

  return (
    <AdminPageShell
      title="Platform Overview"
      description="Events, guests, and landing page performance at a glance"
      actions={
        <Link href="/super/events/new" className="btn-primary !text-sm">
          <Plus size={16} />
          New Event
        </Link>
      }
    >
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        <StatCard
          label="Total Events"
          value={events.length}
          icon={<CalendarDays className="w-5 h-5" />}
          accent="amber"
        />
        <StatCard
          label="Total Households"
          value={totalGuests}
          icon={<Users className="w-5 h-5" />}
        />
        <StatCard
          label="Total Attending"
          value={totalAttending}
          icon={<UserCheck className="w-5 h-5" />}
          accent="emerald"
        />
        <StatCard
          label="Landing Sessions"
          value={visitorStats.totalVisitors}
          icon={<Eye className="w-5 h-5" />}
          accent="blue"
        />
        <StatCard
          label="Visitors Today"
          value={visitorStats.todayVisitors}
          icon={<Eye className="w-5 h-5" />}
          trend={{
            value: `${visitorStats.weekVisitors} / 7d`,
            positive: true,
          }}
          className="col-span-2 lg:col-span-1"
        />
      </div>

      {/* Quick links */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Link
          href="/super/visitors"
          className="card-interactive p-5 flex items-center justify-between group"
        >
          <div>
            <p className="font-semibold text-stone-900">Visitor Analytics</p>
            <p className="text-sm text-stone-500 mt-1">
              {visitorStats.avgTimeOnPage}s avg. time ·{" "}
              {visitorStats.avgScrollDepth}% scroll depth
            </p>
          </div>
          <ArrowRight
            size={20}
            className="text-stone-300 group-hover:text-amber-600 group-hover:translate-x-1 transition-all"
          />
        </Link>
        <Link
          href="/super/leads"
          className="card-interactive p-5 flex items-center justify-between group"
        >
          <div>
            <p className="font-semibold text-stone-900">Contact Leads</p>
            <p className="text-sm text-stone-500 mt-1">
              Review access requests and form submissions
            </p>
          </div>
          <ArrowRight
            size={20}
            className="text-stone-300 group-hover:text-amber-600 group-hover:translate-x-1 transition-all"
          />
        </Link>
      </div>

      <AdminSection
        title={`All Events (${events.length})`}
        action={
          events.length > 0 ? (
            <Link
              href="/super/events/new"
              className="text-xs font-semibold text-amber-700 hover:text-amber-800"
            >
              + Create new
            </Link>
          ) : undefined
        }
      >
        {events.length === 0 ? (
          <div className="card-elevated text-center py-16 px-6">
            <CalendarDays
              size={40}
              className="mx-auto text-stone-300 mb-4"
            />
            <p className="text-stone-500 font-medium mb-4">No events yet.</p>
            <Link href="/super/events/new" className="btn-primary !text-sm">
              Create your first event
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {events.map((event) => {
              const attending = event.guests.filter(
                (g) => g.rsvpStatus === "ATTENDING",
              ).length;
              const declined = event.guests.filter(
                (g) => g.rsvpStatus === "DECLINED",
              ).length;
              const pending = event.guests.filter(
                (g) => g.rsvpStatus === "PENDING",
              ).length;
              const headcount = event.guests
                .filter((g) => g.rsvpStatus === "ATTENDING")
                .reduce((s, g) => s + (g.rsvp?.totalAttending ?? 1), 0);
              const responded = attending + declined;
              const total = event._count.guests;
              const responsePct =
                total > 0 ? Math.round((responded / total) * 100) : 0;
              const admins = event.eventAdmins
                .map((ea) => ea.adminUser.email)
                .join(", ");

              return (
                <article
                  key={event.id}
                  className="card-elevated overflow-hidden hover:shadow-[var(--shadow-medium)] transition-shadow"
                >
                  <div className="p-5 sm:p-6 flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                    <div className="flex items-start gap-4 min-w-0">
                      <div
                        className="w-12 h-12 rounded-xl shrink-0 flex items-center justify-center"
                        style={{ backgroundColor: event.accentColor }}
                      >
                        <div
                          className="w-5 h-5 rounded-full"
                          style={{ backgroundColor: event.primaryColor }}
                        />
                      </div>
                      <div className="min-w-0">
                        <h3 className="font-semibold text-stone-900 truncate">
                          {event.title}
                        </h3>
                        <p className="text-sm text-stone-500 mt-0.5">
                          {event.coupleNames} ·{" "}
                          {new Date(event.date).toLocaleDateString("en-GB", {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                          })}
                        </p>
                        <p className="text-xs text-stone-400 mt-1 truncate">
                          {event.venue}
                          {admins ? ` · ${admins}` : ""}
                        </p>
                      </div>
                    </div>
                    <Link
                      href={`/super/events/${event.id}`}
                      className="btn-secondary !text-xs !py-2 !px-4 shrink-0 self-start"
                    >
                      Manage
                      <ArrowRight size={14} />
                    </Link>
                  </div>

                  <div className="border-t border-stone-100 px-5 sm:px-6 py-4 bg-stone-50/50">
                    <div className="flex flex-wrap items-center gap-x-6 gap-y-3 mb-3">
                      {[
                        { label: "Total", value: total, color: "text-stone-600" },
                        {
                          label: "Attending",
                          value: attending,
                          color: "text-emerald-600",
                        },
                        {
                          label: "Declined",
                          value: declined,
                          color: "text-rose-600",
                        },
                        {
                          label: "Pending",
                          value: pending,
                          color: "text-amber-600",
                        },
                        {
                          label: "Headcount",
                          value: headcount,
                          color: "text-amber-700",
                        },
                        {
                          label: "Tables",
                          value: event._count.tables,
                          color: "text-stone-500",
                        },
                      ].map((s) => (
                        <div key={s.label}>
                          <p
                            className={`text-sm font-bold tabular-nums ${s.color}`}
                          >
                            {s.value}
                          </p>
                          <p className="text-[10px] font-semibold uppercase tracking-wider text-stone-400">
                            {s.label}
                          </p>
                        </div>
                      ))}
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-xs text-stone-400 shrink-0">
                        Response {responsePct}%
                      </span>
                      <div className="flex-1 h-1.5 bg-stone-200 rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all"
                          style={{
                            width: `${responsePct}%`,
                            backgroundColor: event.primaryColor,
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </AdminSection>
    </AdminPageShell>
  );
}
