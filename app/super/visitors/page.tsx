import {
  getVisitorStats,
  getRecentVisitors,
  getDailyVisitorCounts,
} from "@/actions/landing-leads";
import AdminPageShell, {
  AdminSection,
} from "@/components/admin/AdminPageShell";
import { StatCard } from "@/components/ui/stat-card";
import {
  Eye,
  Smartphone,
  Clock,
  MousePointerClick,
  Globe,
  Monitor,
} from "lucide-react";

function formatDuration(seconds: number) {
  if (seconds < 60) return `${seconds}s`;
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return s > 0 ? `${m}m ${s}s` : `${m}m`;
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
  });
}

export default async function VisitorsPage() {
  const [stats, recent, daily] = await Promise.all([
    getVisitorStats(),
    getRecentVisitors(40),
    getDailyVisitorCounts(14),
  ]);

  const maxDaily = Math.max(...daily.map((d) => d.count), 1);

  return (
    <AdminPageShell
      title="Visitor Analytics"
      description="Landing page sessions, engagement, and traffic sources"
    >
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          label="Total Sessions"
          value={stats.totalVisitors}
          icon={<Eye className="w-5 h-5" />}
          accent="amber"
        />
        <StatCard
          label="Today"
          value={stats.todayVisitors}
          icon={<MousePointerClick className="w-5 h-5" />}
          trend={{ value: `${stats.weekVisitors} this week`, positive: true }}
        />
        <StatCard
          label="Avg. Time on Page"
          value={formatDuration(stats.avgTimeOnPage)}
          icon={<Clock className="w-5 h-5" />}
          accent="blue"
        />
        <StatCard
          label="Avg. Scroll Depth"
          value={`${stats.avgScrollDepth}%`}
          icon={<Globe className="w-5 h-5" />}
          accent="emerald"
        />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Traffic chart */}
        <div className="xl:col-span-2 card-elevated p-6">
          <AdminSection title="Sessions — Last 14 Days">
            <div className="flex items-end gap-1.5 h-40 mt-2">
              {daily.map((d) => (
                <div
                  key={d.date}
                  className="flex-1 flex flex-col items-center gap-2 group"
                >
                  <div className="w-full flex items-end justify-center h-32">
                    <div
                      className="w-full max-w-[2rem] rounded-t-lg bg-gradient-to-t from-amber-500 to-amber-300 transition-all group-hover:from-amber-600 group-hover:to-amber-400"
                      style={{
                        height: `${Math.max(4, (d.count / maxDaily) * 100)}%`,
                      }}
                      title={`${d.count} sessions`}
                    />
                  </div>
                  <span className="text-[10px] font-medium text-stone-400 rotate-0 truncate w-full text-center">
                    {formatDate(d.date)}
                  </span>
                </div>
              ))}
            </div>
          </AdminSection>
        </div>

        {/* Device split */}
        <div className="card-elevated p-6 space-y-6">
          <AdminSection title="Devices">
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="flex items-center gap-2 font-medium text-stone-700">
                    <Smartphone size={16} className="text-amber-600" /> Mobile
                  </span>
                  <span className="font-bold text-stone-900">
                    {stats.mobilePercent}%
                  </span>
                </div>
                <div className="h-2 bg-stone-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-amber-500 rounded-full"
                    style={{ width: `${stats.mobilePercent}%` }}
                  />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="flex items-center gap-2 font-medium text-stone-700">
                    <Monitor size={16} className="text-stone-500" /> Desktop
                  </span>
                  <span className="font-bold text-stone-900">
                    {stats.desktopPercent}%
                  </span>
                </div>
                <div className="h-2 bg-stone-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-stone-400 rounded-full"
                    style={{ width: `${stats.desktopPercent}%` }}
                  />
                </div>
              </div>
            </div>
          </AdminSection>

          {stats.devices.length > 0 && (
            <AdminSection title="Device Types">
              <div className="space-y-2">
                {stats.devices.map((d) => (
                  <div
                    key={d.name}
                    className="flex justify-between text-sm py-1.5 border-b border-stone-50 last:border-0"
                  >
                    <span className="text-stone-600 capitalize">{d.name}</span>
                    <span className="font-semibold text-stone-800">
                      {d.count}
                    </span>
                  </div>
                ))}
              </div>
            </AdminSection>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Countries */}
        <div className="card-elevated p-6">
          <AdminSection title="Top Countries">
            {stats.topCountries.length === 0 ? (
              <p className="text-sm text-stone-400">No geo data yet</p>
            ) : (
              <div className="space-y-3">
                {stats.topCountries.map((c) => (
                  <div key={c.name} className="flex items-center gap-3">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-stone-800 truncate">
                        {c.name}
                      </p>
                      <div className="h-1.5 bg-stone-100 rounded-full mt-1 overflow-hidden">
                        <div
                          className="h-full bg-emerald-400 rounded-full"
                          style={{
                            width: `${(c.count / stats.totalVisitors) * 100}%`,
                          }}
                        />
                      </div>
                    </div>
                    <span className="text-sm font-bold text-stone-600 tabular-nums">
                      {c.count}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </AdminSection>
        </div>

        {/* Browsers */}
        <div className="card-elevated p-6">
          <AdminSection title="Browsers">
            {stats.topBrowsers.length === 0 ? (
              <p className="text-sm text-stone-400">No browser data yet</p>
            ) : (
              <div className="space-y-2">
                {stats.topBrowsers.map((b) => (
                  <div
                    key={b.name}
                    className="flex justify-between text-sm py-2 border-b border-stone-50 last:border-0"
                  >
                    <span className="text-stone-600">{b.name}</span>
                    <span className="font-semibold text-stone-800">
                      {b.count}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </AdminSection>
        </div>

        {/* UTM Sources */}
        <div className="card-elevated p-6">
          <AdminSection title="Traffic Sources">
            {stats.utmSources.length === 0 ? (
              <p className="text-sm text-stone-400">No UTM data yet</p>
            ) : (
              <div className="space-y-2">
                {stats.utmSources.map((u) => (
                  <div
                    key={u.name}
                    className="flex justify-between text-sm py-2 border-b border-stone-50 last:border-0"
                  >
                    <span className="text-stone-600 truncate">{u.name}</span>
                    <span className="font-semibold text-stone-800 shrink-0 ml-2">
                      {u.count}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </AdminSection>
        </div>
      </div>

      {/* Recent sessions table */}
      <AdminSection title="Recent Sessions">
        <div className="card-elevated overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-stone-100 bg-stone-50/80">
                  <th className="text-left px-4 py-3 text-xs font-bold uppercase tracking-wider text-stone-400">
                    When
                  </th>
                  <th className="text-left px-4 py-3 text-xs font-bold uppercase tracking-wider text-stone-400">
                    Device
                  </th>
                  <th className="text-left px-4 py-3 text-xs font-bold uppercase tracking-wider text-stone-400 hidden sm:table-cell">
                    Location
                  </th>
                  <th className="text-left px-4 py-3 text-xs font-bold uppercase tracking-wider text-stone-400 hidden md:table-cell">
                    Source
                  </th>
                  <th className="text-right px-4 py-3 text-xs font-bold uppercase tracking-wider text-stone-400">
                    Engagement
                  </th>
                </tr>
              </thead>
              <tbody>
                {recent.length === 0 ? (
                  <tr>
                    <td
                      colSpan={5}
                      className="px-4 py-12 text-center text-stone-400"
                    >
                      No visitor sessions recorded yet
                    </td>
                  </tr>
                ) : (
                  recent.map((v) => (
                    <tr
                      key={v.id}
                      className="border-b border-stone-50 hover:bg-stone-50/50 transition-colors"
                    >
                      <td className="px-4 py-3 whitespace-nowrap">
                        <p className="font-medium text-stone-800">
                          {new Date(v.updatedAt).toLocaleDateString("en-GB", {
                            day: "numeric",
                            month: "short",
                          })}
                        </p>
                        <p className="text-xs text-stone-400">
                          {new Date(v.updatedAt).toLocaleTimeString("en-GB", {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </p>
                      </td>
                      <td className="px-4 py-3">
                        <p className="font-medium text-stone-700 capitalize">
                          {v.deviceType ?? "—"}
                        </p>
                        <p className="text-xs text-stone-400">
                          {[v.browser, v.os].filter(Boolean).join(" · ") || "—"}
                        </p>
                      </td>
                      <td className="px-4 py-3 hidden sm:table-cell">
                        <p className="text-stone-700">
                          {[v.city, v.country].filter(Boolean).join(", ") ||
                            "—"}
                        </p>
                      </td>
                      <td className="px-4 py-3 hidden md:table-cell max-w-[160px]">
                        <p className="text-stone-700 truncate">
                          {v.utmSource ?? (v.referrer ? "Referral" : "Direct")}
                        </p>
                        {v.utmCampaign && (
                          <p className="text-xs text-stone-400 truncate">
                            {v.utmCampaign}
                          </p>
                        )}
                      </td>
                      <td className="px-4 py-3 text-right whitespace-nowrap">
                        <p className="font-medium text-stone-700">
                          {v.timeOnPage
                            ? formatDuration(v.timeOnPage)
                            : "—"}
                        </p>
                        <p className="text-xs text-stone-400">
                          {v.scrolledPercent != null
                            ? `${v.scrolledPercent}% scroll`
                            : "—"}
                        </p>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </AdminSection>
    </AdminPageShell>
  );
}
