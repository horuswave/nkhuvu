"use client";

import { useState } from "react";

export default function ContactForm({
  text,
  locale,
}: {
  text: {
    name: string;
    email: string;
    message: string;
    namePlaceholder: string;
    emailPlaceholder: string;
    messagePlaceholder: string;
    sendOtp: string;
    sending: string;
    success: string;
    error: string;
  };
  locale: string;
}) {
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    const payload = {
      name: String(formData.get("name") || ""),
      email: String(formData.get("email") || ""),
      message: String(formData.get("message") || ""),
      locale,
    };

    try {
      const res = await fetch("/api/admin-access/request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || text.error);

      setDone(true);
    } catch (err: any) {
      setError(err.message || text.error);
    } finally {
      setLoading(false);
    }
  }

  if (done) {
    return <div className="rounded-2xl border p-6">{text.success}</div>;
  }

  return (
    <form onSubmit={onSubmit} className="rounded-2xl border p-6 space-y-4">
      <div>
        <label>{text.name}</label>
        <input
          name="name"
          className="w-full rounded border px-3 py-2"
          placeholder={text.namePlaceholder}
        />
      </div>
      <div>
        <label>{text.email}</label>
        <input
          name="email"
          type="email"
          className="w-full rounded border px-3 py-2"
          placeholder={text.emailPlaceholder}
          required
        />
      </div>
      <div>
        <label>{text.message}</label>
        <textarea
          name="message"
          className="w-full rounded border px-3 py-2"
          placeholder={text.messagePlaceholder}
        />
      </div>
      {error && <p className="text-sm text-red-600">{error}</p>}
      <button
        disabled={loading}
        className="rounded bg-black px-4 py-2 text-white"
      >
        {loading ? text.sending : text.sendOtp}
      </button>
    </form>
  );
}
