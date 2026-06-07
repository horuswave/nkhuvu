"use client";

import { useTranslations } from "@/i18n";

const MailIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="m22 7-10 7L2 7" />
  </svg>
);

const ArrowRightIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
);

export default function AccessRequest() {
  const t = useTranslations("landing");

  return (
    <section
      id="solicitar-acesso"
      className="py-16 px-6 bg-amber-50/60 border-b border-amber-100"
    >
      <div className="max-w-4xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 bg-amber-100 px-4 py-1.5 rounded-full text-amber-700 text-sm font-medium mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
          </svg>
          {t("access.badge")}
        </div>
        <h2 className="text-2xl md:text-3xl font-light text-stone-800 mb-3">
          {t("access.title")}
        </h2>
        <p className="text-stone-600 max-w-2xl mx-auto mb-6">
          {t("access.description")}
        </p>
        <a
          href="mailto:ola@nkhuvu.co.mz"
          className="inline-flex items-center gap-2 bg-white border border-amber-300 hover:border-amber-400 text-amber-700 font-medium px-6 py-3 rounded-full text-sm transition-all"
        >
          <MailIcon /> {t("access.button")} <ArrowRightIcon />
        </a>
        <p className="text-xs text-stone-400 mt-4">{t("access.note")}</p>
      </div>
    </section>
  );
}
