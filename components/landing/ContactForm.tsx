"use client";

import { useRef, useState } from "react";

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

function Spinner() {
  return (
    <span
      className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-current border-r-transparent align-[-2px]"
      aria-hidden="true"
    />
  );
}

function Button({
  children,
  loading,
  loadingText,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  loading?: boolean;
  loadingText?: string;
}) {
  return (
    <button
      {...props}
      disabled={props.disabled || loading}
      aria-busy={loading || undefined}
      className={`inline-flex items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-medium text-white transition ${
        props.disabled || loading
          ? "cursor-not-allowed bg-black/60"
          : "bg-black hover:bg-black/90"
      } ${props.className ?? ""}`}
    >
      {loading ? (
        <>
          <Spinner />
          <span>{loadingText}</span>
        </>
      ) : (
        children
      )}
    </button>
  );
}

export default function ContactForm({ locale, text }: ContactFormProps) {
  const [step, setStep] = useState<"form" | "otp" | "done">("form");
  const [sendingOtp, setSendingOtp] = useState(false);
  const [verifyingOtp, setVerifyingOtp] = useState(false);
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");
  const [contactLeadId, setContactLeadId] = useState("");
  const [otp, setOtp] = useState("");

  const formRef = useRef<HTMLFormElement | null>(null);

  async function handleSendOtp(formData: FormData) {
    setSendingOtp(true);
    setError("");
    setStatus("");

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
      setStatus(text.otpSent);
      formRef.current?.reset();
    } catch (err: any) {
      setError(err.message || text.error);
    } finally {
      setSendingOtp(false);
    }
  }

  async function handleVerifyOtp(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setVerifyingOtp(true);
    setError("");
    setStatus("");

    try {
      const res = await fetch("/api/contact/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contactLeadId, otp }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || text.error);

      setStep("done");
      setStatus(text.verified);
    } catch (err: any) {
      setError(err.message || text.error);
    } finally {
      setVerifyingOtp(false);
    }
  }

  if (step === "done") {
    return (
      <div className="mx-auto max-w-xl rounded-3xl border border-green-200 bg-green-50 p-6 shadow-sm">
        <p className="text-sm font-medium text-green-700">{text.success}</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-xl rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold tracking-tight text-zinc-900">
          {step === "form" ? text.sendOtp : text.enterOtp}
        </h2>
        <p className="mt-1 text-sm text-zinc-500">
          {step === "form"
            ? "We’ll send a one-time code to your email."
            : "Enter the code we sent to continue."}
        </p>
      </div>

      {step === "form" ? (
        <form
          ref={formRef}
          action={(formData) => handleSendOtp(formData)}
          className="space-y-5"
        >
          <div className="grid gap-5 sm:grid-cols-2">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-zinc-700">
                {text.name}
              </label>
              <input
                name="name"
                defaultValue=""
                className="w-full rounded-xl border border-zinc-300 px-3 py-3 outline-none transition placeholder:text-zinc-400 focus:border-zinc-900"
                placeholder={text.namePlaceholder}
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-zinc-700">
                {text.email}
              </label>
              <input
                name="email"
                type="email"
                defaultValue=""
                className="w-full rounded-xl border border-zinc-300 px-3 py-3 outline-none transition placeholder:text-zinc-400 focus:border-zinc-900"
                placeholder={text.emailPlaceholder}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-zinc-700">
              {text.message}
            </label>
            <textarea
              name="message"
              defaultValue=""
              rows={5}
              className="w-full rounded-xl border border-zinc-300 px-3 py-3 outline-none transition placeholder:text-zinc-400 focus:border-zinc-900"
              placeholder={text.messagePlaceholder}
            />
          </div>

          {error && (
            <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          )}

          {status && !error && (
            <div className="rounded-xl border border-blue-200 bg-blue-50 px-4 py-3 text-sm text-blue-700">
              {status}
            </div>
          )}

          <div className="flex items-center justify-end">
            <Button
              type="submit"
              loading={sendingOtp}
              loadingText={text.sending}
            >
              {text.sendOtp}
            </Button>
          </div>
        </form>
      ) : (
        <form onSubmit={handleVerifyOtp} className="space-y-5">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-zinc-700">
              {text.enterOtp}
            </label>
            <input
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full rounded-xl border border-zinc-300 px-3 py-3 text-center text-lg tracking-[0.35em] outline-none transition placeholder:text-zinc-400 focus:border-zinc-900"
              placeholder="123456"
              inputMode="numeric"
              maxLength={6}
              required
            />
          </div>

          <div className="rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm text-zinc-600">
            {text.otpSent}
          </div>

          {error && (
            <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          )}

          {status && !error && (
            <div className="rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
              {status}
            </div>
          )}

          <div className="flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={() => {
                setStep("form");
                setOtp("");
                setError("");
                setStatus("");
              }}
              className="rounded-xl border border-zinc-300 px-4 py-3 text-sm font-medium text-zinc-700 transition hover:bg-zinc-50"
            >
              Back
            </button>

            <Button
              type="submit"
              loading={verifyingOtp}
              loadingText={text.verifying}
            >
              {text.verifyOtp}
            </Button>
          </div>
        </form>
      )}
    </div>
  );
}
