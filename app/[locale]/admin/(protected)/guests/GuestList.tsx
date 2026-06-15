"use client";
import SendInviteButton from "@/components/admin/SendInviteButton";
import BulkSendButton from "@/components/admin/BulkSendButton";
import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { deleteGuest } from "@/actions/guests";
import Link from "next/link";
import { Copy, Trash2, Pencil, Check } from "lucide-react";

type RsvpStatus = "PENDING" | "ATTENDING" | "DECLINED" | "MAYBE";

interface Guest {
  id: string;
  primaryName: string;
  email: string | null;
  phone: string | null;
  preferredContact: string;
  maxAllowed: number;
  rsvpStatus: RsvpStatus;
  rsvpSubmittedAt: Date | null;
  isVip: boolean;
  token: string;
  notes: string | null;
  rsvp: {
    attending: boolean;
    totalAttending: number;
  } | null;
  table: { name: string } | null;
}

interface Event {
  primaryColor: string;
  fontBody: string;
  fontDisplay: string;
}

const STATUS_LABEL: Record<RsvpStatus, string> = {
  PENDING: "Pending",
  ATTENDING: "Attending",
  DECLINED: "Declined",
  MAYBE: "Maybe",
};

const STATUS_STYLE: Record<RsvpStatus, string> = {
  ATTENDING: "bg-emerald-100/80 text-emerald-700 border border-emerald-200",
  DECLINED: "bg-red-100/80 text-red-600 border border-red-200",
  PENDING: "bg-amber-100/80 text-amber-700 border border-amber-200",
  MAYBE: "bg-blue-100/80 text-blue-700 border border-blue-200",
};

const CONTACT_ICON: Record<string, string> = {
  EMAIL: "✉️",
  WHATSAPP: "💬",
  SMS: "📱",
  MANUAL: "👤",
};

export default function GuestList({
  guests,
  event, pendingCount
}: {
  guests: Guest[];
  event: Event | null;
  pendingCount: number;
}) {
  const router = useRouter();
  const primary = event?.primaryColor ?? "#c8890e";
  const font = event?.fontBody ?? "system-ui";

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"ALL" | RsvpStatus>("ALL");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const filtered = useMemo(() => {
    return guests.filter((g) => {
      const matchSearch =
        g.primaryName.toLowerCase().includes(search.toLowerCase()) ||
        g.email?.toLowerCase().includes(search.toLowerCase()) ||
        g.phone?.includes(search);
      const matchFilter = filter === "ALL" || g.rsvpStatus === filter;
      return matchSearch && matchFilter;
    });
  }, [guests, search, filter]);

  const counts = useMemo(
    () => ({
      ALL: guests.length,
      ATTENDING: guests.filter((g) => g.rsvpStatus === "ATTENDING").length,
      PENDING: guests.filter((g) => g.rsvpStatus === "PENDING").length,
      DECLINED: guests.filter((g) => g.rsvpStatus === "DECLINED").length,
      MAYBE: guests.filter((g) => g.rsvpStatus === "MAYBE").length,
    }),
    [guests],
  );

  async function handleCopy(token: string, id: string) {
    const url = `${window.location.origin}/invite/${token}`;
    await navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  }

  async function handleDelete(id: string, name: string) {
    if (!confirm(`Delete ${name}? This cannot be undone.`)) return;
    setDeletingId(id);
    try {
      await deleteGuest(id);
      router.refresh();
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <p className="text-sm font-semibold text-stone-500 uppercase tracking-widest" style={{ fontFamily: font }}>
          {filtered.length} guest{filtered.length !== 1 ? "s" : ""}
        </p>
        <BulkSendButton
          pendingCount={pendingCount}
          primaryColor={primary}
          fontBody={font}
        />
      </div>

      {/* Search + filter bar */}
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="relative flex-1">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400">
            <circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          <input
            type="text"
            placeholder="Search by name, email or phone…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-11 pr-4 py-3 bg-white border-2 border-stone-100 rounded-2xl text-sm font-medium transition-all focus:outline-none focus:border-stone-300 placeholder:text-stone-400 shadow-sm"
            style={{ fontFamily: font }}
          />
        </div>
        <div className="flex flex-wrap gap-2 bg-white border border-stone-100 rounded-2xl p-1.5 shadow-[0_4px_20px_rgb(0,0,0,0.02)]">
          {(["ALL", "ATTENDING", "PENDING", "DECLINED", "MAYBE"] as const).map(
            (s) => (
              <button
                key={s}
                onClick={() => setFilter(s)}
                className="px-4 py-2 rounded-xl text-xs font-bold tracking-wide transition-all"
                style={{
                  fontFamily: font,
                  backgroundColor: filter === s ? primary : "transparent",
                  color: filter === s ? "white" : "#78716c",
                  boxShadow: filter === s ? `0 4px 12px ${primary}40` : "none"
                }}
              >
                {s === "ALL" ? "All" : STATUS_LABEL[s]} <span className="opacity-70 ml-1">({counts[s]})</span>
              </button>
            ),
          )}
        </div>
      </div>

      {/* Table Container */}
      <div className="bg-white border border-stone-100 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden">
        {filtered.length === 0 ? (
          <div className="text-center py-24 px-6">
            <div className="w-16 h-16 rounded-2xl bg-stone-50 flex items-center justify-center mx-auto mb-4 border border-stone-100">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-stone-300"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
            </div>
            <p className="text-base font-medium text-stone-500 mb-2" style={{ fontFamily: font }}>
              {search || filter !== "ALL"
                ? "No guests match your filters."
                : "No guests added yet."}
            </p>
            {!search && filter === "ALL" && (
              <Link
                href="/admin/guests/new"
                className="text-sm font-bold hover:underline underline-offset-4 inline-flex items-center gap-2 mt-2"
                style={{ color: primary }}
              >
                Add your first guest <span aria-hidden="true">→</span>
              </Link>
            )}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full whitespace-nowrap">
              <thead>
                <tr className="border-b border-stone-100 bg-[#fafaf9]">
                  {["Guest", "Contact", "Status", "Count", "Table", ""].map(
                    (h, i) => (
                      <th
                        key={h}
                        className={`text-left text-xs font-bold text-stone-400 uppercase tracking-widest px-6 py-4 ${i === 0 ? "pl-6" : ""}`}
                        style={{ fontFamily: font }}
                      >
                        {h}
                      </th>
                    ),
                  )}
                </tr>
              </thead>
              <tbody>
                {filtered.map((g) => (
                  <tr
                    key={g.id}
                    className="border-b border-stone-50 hover:bg-stone-50/80 transition-colors group"
                  >
                    {/* Name */}
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-3">
                        {g.isVip && (
                          <span
                            className="text-[10px] px-2 py-1 rounded-md font-bold uppercase tracking-widest shadow-sm border"
                            style={{
                              backgroundColor: `${primary}10`,
                              borderColor: `${primary}20`,
                              color: primary,
                              fontFamily: font,
                            }}
                          >
                            VIP
                          </span>
                        )}
                        <div>
                          <p
                            className="text-stone-900 text-sm font-semibold"
                            style={{ fontFamily: font }}
                          >
                            {g.primaryName}
                          </p>
                          {g.notes && (
                            <p
                              className="text-stone-400 text-xs mt-1 max-w-[200px] truncate font-medium"
                              style={{ fontFamily: font }}
                              title={g.notes}
                            >
                              {g.notes}
                            </p>
                          )}
                        </div>
                      </div>
                    </td>

                    {/* Contact */}
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-2">
                        <span className="text-sm bg-white border border-stone-100 rounded-md p-1 shadow-sm">{CONTACT_ICON[g.preferredContact]}</span>
                        <div>
                          <p
                            className="text-stone-700 text-sm font-medium"
                            style={{ fontFamily: font }}
                          >
                            {g.email ?? g.phone ?? "—"}
                          </p>
                          {g.email && g.phone && (
                            <p
                              className="text-stone-400 text-xs font-medium mt-0.5"
                              style={{ fontFamily: font }}
                            >
                              {g.phone}
                            </p>
                          )}
                        </div>
                      </div>
                    </td>

                    {/* Status */}
                    <td className="px-6 py-5">
                      <div className="flex flex-col items-start">
                        <span
                          className={`inline-block px-2.5 py-1 rounded-full text-xs font-bold tracking-wide ${STATUS_STYLE[g.rsvpStatus]}`}
                          style={{ fontFamily: font }}
                        >
                          {STATUS_LABEL[g.rsvpStatus]}
                        </span>
                        {g.rsvpSubmittedAt && (
                          <p
                            className="text-stone-400 text-xs mt-1.5 font-medium flex items-center gap-1"
                            style={{ fontFamily: font }}
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                            {new Date(g.rsvpSubmittedAt).toLocaleDateString(
                              "en-GB",
                              {
                                day: "numeric",
                                month: "short",
                              },
                            )}
                          </p>
                        )}
                      </div>
                    </td>

                    {/* Guest count */}
                    <td
                      className="px-6 py-5"
                      style={{ fontFamily: font }}
                    >
                      <div className="flex items-center gap-1">
                         <span className="text-stone-900 font-bold">
                           {g.rsvp?.attending ? g.rsvp.totalAttending : "—"}
                         </span>
                         <span className="text-stone-400 font-medium">/ {g.maxAllowed}</span>
                      </div>
                    </td>

                    {/* Table */}
                    <td
                      className="px-6 py-5 text-stone-500 font-medium text-sm"
                      style={{ fontFamily: font }}
                    >
                      {g.table?.name ? (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-stone-100 border border-stone-200 text-xs text-stone-600 font-bold">
                          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"></path><path d="M3 12h18"></path><path d="M3 18h18"></path><path d="M8 6v12"></path><path d="M16 6v12"></path></svg>
                          {g.table.name}
                        </span>
                      ) : "—"}
                    </td>

                    {/* Actions */}
                    <td className="px-6 py-5 text-right">
                      <div className="flex items-center justify-end gap-2 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity">
                        <SendInviteButton
                          guestName={g.primaryName}
                          guestPhone={g.phone ?? ""}
                          inviteToken={g.token}
                          primaryColor={primary}
                          fontBody={font}
                          compact
                        />

                        <button
                          onClick={() => handleCopy(g.token, g.id)}
                          title="Copy invite link"
                          className="w-8 h-8 rounded-lg flex items-center justify-center text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-all border border-transparent hover:border-stone-200"
                        >
                          {copiedId === g.id ? (
                            <Check className="w-4 h-4 text-emerald-500" />
                          ) : (
                            <Copy className="w-4 h-4" />
                          )}
                        </button>
                        <Link
                          href={`/admin/guests/${g.id}`}
                          title="Edit guest"
                          className="w-8 h-8 rounded-lg flex items-center justify-center text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-all border border-transparent hover:border-stone-200"
                        >
                          <Pencil className="w-4 h-4" />
                        </Link>
                        <button
                          onClick={() => handleDelete(g.id, g.primaryName)}
                          disabled={deletingId === g.id}
                          title="Delete guest"
                          className="w-8 h-8 rounded-lg flex items-center justify-center text-stone-400 hover:text-rose-600 hover:bg-rose-50 transition-all border border-transparent hover:border-rose-100 disabled:opacity-40"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {filtered.length > 0 && (
          <div className="px-6 py-4 border-t border-stone-100 bg-[#fafaf9]">
            <p className="text-xs font-bold uppercase tracking-widest text-stone-400" style={{ fontFamily: font }}>
              Showing {filtered.length} of {guests.length} guests
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
