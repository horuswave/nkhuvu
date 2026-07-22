"use client";

import { useState, useTransition } from "react";
import { createGuest, updateGuest } from "@/actions/guests";
import { useRouter } from "next/navigation";

interface GuestSnapshot {
  id: string;
  primaryName: string;
  email: string | null;
  phone: string | null;
  preferredContact: "EMAIL" | "WHATSAPP" | "SMS" | "MANUAL";
  maxAllowed: number;
  notes: string | null;
  isVip: boolean;
}

interface EventSnapshot {
  primaryColor: string;
  fontBody: string;
  fontDisplay: string;
}

export default function GuestForm({
  event,
  guest,
}: {
  event: EventSnapshot | null;
  guest?: GuestSnapshot;
}) {
  const router = useRouter();
  const isEdit = !!guest;
  const primary = event?.primaryColor ?? "#c8890e";
  const font = event?.fontBody ?? "system-ui";
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const [primaryName, setPrimaryName] = useState(guest?.primaryName ?? "");
  const [email, setEmail] = useState(guest?.email ?? "");
  const [phone, setPhone] = useState(guest?.phone ?? "");
  const [preferredContact, setPreferredContact] = useState<
    "EMAIL" | "WHATSAPP" | "SMS" | "MANUAL"
  >(guest?.preferredContact ?? "EMAIL");
  const [maxAllowed, setMaxAllowed] = useState(guest?.maxAllowed ?? 2);
  const [notes, setNotes] = useState(guest?.notes ?? "");
  const [isVip, setIsVip] = useState(guest?.isVip ?? false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    startTransition(async () => {
      try {
        if (isEdit) {
          await updateGuest(guest!.id, {
            primaryName,
            email: email || undefined,
            phone: phone || undefined,
            preferredContact,
            maxAllowed,
            notes: notes || undefined,
            isVip,
          });
        } else {
          await createGuest({
            primaryName,
            email: email || undefined,
            phone: phone || undefined,
            preferredContact,
            maxAllowed,
            notes: notes || undefined,
            isVip,
          });
        }
        router.push("/admin/guests");
        router.refresh();
      } catch (err: any) {
        setError(err.message ?? "Something went wrong.");
      }
    });
  }

  const inputCls =
    "w-full px-4 py-3.5 border-2 border-stone-100 rounded-xl text-sm transition-all focus:outline-none focus:border-stone-300 focus:bg-white bg-stone-50/50 font-medium placeholder:text-stone-400";

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white border border-stone-100 rounded-2xl p-8 space-y-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)]"
    >
      <div>
        <label
          className="block text-xs font-bold text-stone-500 uppercase tracking-widest mb-2"
          style={{ fontFamily: font }}
        >
          Full name / Household name *
        </label>
        <input
          required
          className={inputCls}
          value={primaryName}
          onChange={(e) => setPrimaryName(e.target.value)}
          placeholder="António & Sofia Silva"
          style={{ fontFamily: font }}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label
            className="block text-xs font-bold text-stone-500 uppercase tracking-widest mb-2"
            style={{ fontFamily: font }}
          >
            Email
          </label>
          <input
            type="email"
            className={inputCls}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="guest@email.com"
            style={{ fontFamily: font }}
          />
        </div>
        <div>
          <label
            className="block text-xs font-bold text-stone-500 uppercase tracking-widest mb-2"
            style={{ fontFamily: font }}
          >
            Phone
          </label>
          <input
            className={inputCls}
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="+351 912 345 678"
            style={{ fontFamily: font }}
          />
        </div>
      </div>

      <div>
        <label
          className="block text-xs font-bold text-stone-500 uppercase tracking-widest mb-2"
          style={{ fontFamily: font }}
        >
          Preferred contact
        </label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {(["EMAIL", "WHATSAPP", "SMS", "MANUAL"] as const).map((m) => (
            <button
              key={m}
              type="button"
              onClick={() => setPreferredContact(m)}
              className="py-3 px-4 rounded-xl border-2 text-xs font-bold tracking-wide transition-all duration-200"
              style={{
                fontFamily: font,
                borderColor: preferredContact === m ? primary : "#f5f5f4",
                backgroundColor:
                  preferredContact === m ? `${primary}10` : "white",
                color: preferredContact === m ? primary : "#78716c",
              }}
            >
              {m === "EMAIL"
                ? "✉️ Email"
                : m === "WHATSAPP"
                  ? "💬 WhatsApp"
                  : m === "SMS"
                    ? "📱 SMS"
                    : "👤 Manual"}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label
          className="block text-xs font-bold text-stone-500 uppercase tracking-widest mb-2"
          style={{ fontFamily: font }}
        >
          Max guests allowed (including primary)
        </label>
        <input
          type="number"
          min={1}
          max={20}
          className={inputCls}
          value={maxAllowed}
          onChange={(e) => setMaxAllowed(Number(e.target.value))}
          style={{ fontFamily: font }}
        />
      </div>

      <div>
        <label
          className="block text-xs font-bold text-stone-500 uppercase tracking-widest mb-2"
          style={{ fontFamily: font }}
        >
          Internal notes
        </label>
        <textarea
          rows={3}
          className={`${inputCls} resize-none`}
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Notes only visible to admins…"
          style={{ fontFamily: font }}
        />
      </div>

      <div className="flex items-center gap-3 pt-2">
        <button
          type="button"
          onClick={() => setIsVip(!isVip)}
          className="w-12 h-7 rounded-full transition-colors relative shadow-inner"
          style={{ backgroundColor: isVip ? primary : "#e7e5e4" }}
        >
          <span
            className="absolute top-1 w-5 h-5 bg-white rounded-full shadow-sm transition-all"
            style={{ left: isVip ? "1.5rem" : "0.25rem" }}
          />
        </button>
        <span className="text-sm font-semibold text-stone-700 tracking-wide" style={{ fontFamily: font }}>
          Mark as VIP guest
        </span>
      </div>

      {error && (
        <div
          className="text-rose-600 text-sm font-medium bg-rose-50 border border-rose-100 rounded-xl px-5 py-4 flex items-center gap-2"
          style={{ fontFamily: font }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
          {error}
        </div>
      )}

      <div className="flex gap-4 pt-4 border-t border-stone-100">
        <button
          type="submit"
          disabled={isPending}
          className="px-8 py-3.5 rounded-xl text-white text-sm font-bold tracking-widest uppercase transition-all shadow-md hover:-translate-y-0.5 disabled:opacity-50 disabled:hover:translate-y-0"
          style={{ backgroundColor: primary, fontFamily: font }}
        >
          {isPending ? "Saving…" : isEdit ? "Save Changes" : "Add Guest"}
        </button>
        <a
          href="/admin/guests"
          className="px-8 py-3.5 rounded-xl border-2 border-stone-200 text-stone-600 font-bold text-sm tracking-widest uppercase transition-colors hover:border-stone-300 hover:bg-stone-50 flex items-center justify-center"
          style={{ fontFamily: font }}
        >
          Cancel
        </a>
      </div>
    </form>
  );
}
