import { getContactLeads } from "@/actions/landing-leads";
import AdminPageShell, {
  AdminSection,
} from "@/components/admin/AdminPageShell";
import { StatCard } from "@/components/ui/stat-card";
import { Mail, CheckCircle, Clock, Inbox } from "lucide-react";

export default async function ContactLeadsPage() {
  const { leads, total, verified, pending } = await getContactLeads();

  return (
    <AdminPageShell
      title="Contact Leads"
      description="Access requests and contact form submissions"
    >
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          label="Total Leads"
          value={total}
          icon={<Inbox className="w-5 h-5" />}
        />
        <StatCard
          label="Verified"
          value={verified}
          icon={<CheckCircle className="w-5 h-5" />}
          accent="emerald"
        />
        <StatCard
          label="Pending"
          value={pending}
          icon={<Clock className="w-5 h-5" />}
          accent="amber"
        />
        <StatCard
          label="Admin Requests"
          value={leads.filter((l) => l.isAdminRequest).length}
          icon={<Mail className="w-5 h-5" />}
          accent="blue"
        />
      </div>

      <AdminSection title="All Submissions">
        <div className="card-elevated overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-stone-100 bg-stone-50/80">
                  <th className="text-left px-4 py-3 text-xs font-bold uppercase tracking-wider text-stone-400">
                    Contact
                  </th>
                  <th className="text-left px-4 py-3 text-xs font-bold uppercase tracking-wider text-stone-400 hidden md:table-cell">
                    Message
                  </th>
                  <th className="text-left px-4 py-3 text-xs font-bold uppercase tracking-wider text-stone-400">
                    Status
                  </th>
                  <th className="text-right px-4 py-3 text-xs font-bold uppercase tracking-wider text-stone-400">
                    Date
                  </th>
                </tr>
              </thead>
              <tbody>
                {leads.length === 0 ? (
                  <tr>
                    <td
                      colSpan={4}
                      className="px-4 py-12 text-center text-stone-400"
                    >
                      No contact leads yet
                    </td>
                  </tr>
                ) : (
                  leads.map((lead) => (
                    <tr
                      key={lead.id}
                      className="border-b border-stone-50 hover:bg-stone-50/50 transition-colors"
                    >
                      <td className="px-4 py-3">
                        <p className="font-semibold text-stone-800">
                          {lead.name ?? "—"}
                        </p>
                        <a
                          href={`mailto:${lead.email}`}
                          className="text-xs text-amber-700 hover:underline"
                        >
                          {lead.email}
                        </a>
                      </td>
                      <td className="px-4 py-3 hidden md:table-cell max-w-xs">
                        <p className="text-stone-600 truncate">
                          {lead.message ?? "—"}
                        </p>
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`inline-flex px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide ${
                            lead.isVerified
                              ? "bg-emerald-100 text-emerald-700 border border-emerald-200"
                              : "bg-amber-100 text-amber-700 border border-amber-200"
                          }`}
                        >
                          {lead.isVerified ? "Verified" : "Pending"}
                        </span>
                        {lead.isAdminRequest && (
                          <span className="block text-[10px] text-stone-400 mt-1 font-medium">
                            Admin request
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-3 text-right whitespace-nowrap">
                        <p className="text-stone-700 font-medium">
                          {new Date(lead.createdAt).toLocaleDateString("en-GB", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          })}
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
