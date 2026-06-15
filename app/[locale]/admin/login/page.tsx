"use client";

import { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { signIn, getSession } from "next-auth/react";
import { useTranslations } from "@/i18n";

export default function AdminLoginPage() {
  const router = useRouter();
  const params = useParams();
  const locale = (params?.locale as string) || "en";
  const t = useTranslations("admin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
        redirectTo: `/${locale}/admin/dashboard`,
      });

      if (!result) {
        setError(t("errors.unable"));
        return;
      }

      if (result.error) {
        setError(t("errors.invalidCredentials"));
        return;
      }

      const session = await getSession();
      const destination = session?.user?.eventId
        ? `/${locale}/admin/dashboard`
        : `/${locale}/admin/onboarding`;

      router.push(result.url ?? destination);
      router.refresh();
    } catch {
      setError(t("errors.somethingWentWrong"));
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-stone-50 flex items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <div className="text-center mb-10">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="h-px w-10 bg-amber-300" />
            <div className="w-2 h-2 rounded-full bg-amber-400" />
            <div className="h-px w-10 bg-amber-300" />
          </div>
          <h1
            className="text-3xl text-stone-800 mb-1"
            style={{ fontFamily: "Georgia, serif" }}
          >
            {t("title")}
          </h1>
          <p className="text-stone-400 text-sm">{t("subtitle")}</p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white border border-stone-200 rounded p-8 space-y-5 shadow-sm"
        >
          <div>
            <label className="block text-stone-600 text-sm font-medium mb-2">
              {t("form.emailLabel")}
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoFocus
              className="w-full px-4 py-2.5 border border-stone-200 rounded text-sm focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-200"
              placeholder={t("form.emailPlaceholder")}
            />
          </div>

          <div>
            <label className="block text-stone-600 text-sm font-medium mb-2">
              {t("form.passwordLabel")}
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2.5 border border-stone-200 rounded text-sm focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-200"
              placeholder={t("form.passwordPlaceholder")}
            />
          </div>

          {error && (
            <p className="text-red-500 text-sm bg-red-50 border border-red-100 rounded px-4 py-3">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-amber-600 hover:bg-amber-700 disabled:bg-stone-200 disabled:text-stone-400 text-white text-sm tracking-widest uppercase transition-colors rounded"
          >
            {loading ? t("buttons.signingIn") : t("buttons.signIn")}
          </button>
        </form>
      </div>
    </main>
  );
}
