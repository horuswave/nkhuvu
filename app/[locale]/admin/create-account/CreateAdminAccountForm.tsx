"use client";

import { useState } from "react";

export default function CreateAdminAccountForm({
  token,
  email,
  name,
}: {
  token: string;
  email: string;
  name: string;
}) {
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    const password = String(formData.get("password") || "");
    const confirmPassword = String(formData.get("confirmPassword") || "");

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/admin-access/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, email, name, password }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed");

      setDone(true);
    } catch (err: any) {
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  if (done) {
    return (
      <div className="rounded-2xl bg-white p-8 shadow">
        Admin account created successfully.
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="w-full max-w-md rounded-2xl bg-white p-8 shadow space-y-4"
    >
      <h1 className="text-2xl font-semibold">Create admin account</h1>
      <p className="text-sm text-gray-600">{email}</p>

      <div>
        <label className="block text-sm font-medium">Name</label>
        <input
          value={name}
          readOnly
          className="mt-1 w-full rounded border px-3 py-2 bg-gray-100"
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Password</label>
        <input
          name="password"
          type="password"
          required
          className="mt-1 w-full rounded border px-3 py-2"
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Confirm password</label>
        <input
          name="confirmPassword"
          type="password"
          required
          className="mt-1 w-full rounded border px-3 py-2"
        />
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <button
        disabled={loading}
        className="w-full rounded bg-black px-4 py-2 text-white"
      >
        {loading ? "Creating..." : "Create account"}
      </button>
    </form>
  );
}
