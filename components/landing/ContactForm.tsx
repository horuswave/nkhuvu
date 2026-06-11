"use client";

import {  useRef, useState } from "react";

type ContactText = {
  name: string;
  email: string;
  message: string;
  namePlaceholder: string;
  emailPlaceholder: string;
  messagePlaceholder: string;
  sendOtp: string;
  sending: string;
  enterOtp: string;
  verifyOtp: string;
  verifying: string;
  otpSent: string;
  verified: string;
  success: string;
  error: string;
};

type ContactFormProps = {
  locale: string;
  text: ContactText;
};

export default function ContactForm({ locale, text }: ContactFormProps) {
  const [step, setStep] = useState<"form" | "otp" | "done">("form");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [contactLeadId, setContactLeadId] = useState("");
  const [otp, setOtp] = useState("");

  const formRef = useRef<HTMLFormElement | null>(null);

  async function handleSendOtp(formData: FormData) {
    setLoading(true);
    setMessage("");

    try {
      const res = await fetch("/api/contact/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: String(formData.get("name") || ""),
          email: String(formData.get("email") || ""),
          message: String(formData.get("message") || ""),
          locale,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || text.error);

      setContactLeadId(data.contactLeadId);
      setStep("otp");
      setMessage(text.otpSent);
      formRef.current?.reset();
    } catch (err: any) {
      setMessage(err.message || text.error);
    } finally {
      setLoading(false);
    }
  }

  async function handleVerifyOtp(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await fetch("/api/contact/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contactLeadId, otp }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || text.error);

      setStep("done");
      setMessage(text.verified);
    } catch (err: any) {
      setMessage(err.message || text.error);
    } finally {
      setLoading(false);
    }
  }

  if (step === "done") {
    return <p className="text-green-600">{text.success}</p>;
  }

  return (
    <div className="mx-auto max-w-xl rounded-2xl border p-6">
      {step === "form" ? (
        <form
          ref={formRef}
          action={(formData) => handleSendOtp(formData)}
          className="space-y-4"
        >
          <div>
            <label className="mb-1 block">{text.name}</label>
            <input
              name="name"
              className="w-full rounded border px-3 py-2"
              placeholder={text.namePlaceholder}
            />
          </div>

          <div>
            <label className="mb-1 block">{text.email}</label>
            <input
              name="email"
              type="email"
              className="w-full rounded border px-3 py-2"
              placeholder={text.emailPlaceholder}
              required
            />
          </div>

          <div>
            <label className="mb-1 block">{text.message}</label>
            <textarea
              name="message"
              className="w-full rounded border px-3 py-2"
              rows={5}
              placeholder={text.messagePlaceholder}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="rounded bg-black px-4 py-2 text-white"
          >
            {loading ? text.sending : text.sendOtp}
          </button>
        </form>
      ) : (
        <form onSubmit={handleVerifyOtp} className="space-y-4">
          <p>{text.enterOtp}</p>

          <input
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="w-full rounded border px-3 py-2"
            placeholder="123456"
            maxLength={6}
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="rounded bg-black px-4 py-2 text-white"
          >
            {loading ? text.verifying : text.verifyOtp}
          </button>
        </form>
      )}

      {message && <p className="mt-4 text-sm">{message}</p>}
    </div>
  );
}
