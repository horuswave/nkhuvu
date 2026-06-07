"use client";

import { useTranslations } from "@/i18n";

const ArrowRightIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
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

export default function FinalCTA() {
  const t = useTranslations("landing");

  return (
    <section className="py-24 px-6 bg-stone-900">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-light tracking-tight text-white mb-6">
          {t("finalCTA.title")}
        </h2>
        <p className="text-stone-300 text-lg mb-10 max-w-2xl mx-auto">
          {t("finalCTA.subtitle")}
        </p>
        <div className="flex flex-col sm:flex-row gap-5 justify-center">
          <a
            href="#solicitar-acesso"
            className="inline-flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-400 text-stone-900 font-medium px-10 py-4 rounded-full text-lg transition-all duration-200 shadow-lg shadow-amber-500/20 hover:shadow-xl hover:-translate-y-0.5"
          >
            {t("finalCTA.buttonPrimary")} <ArrowRightIcon />
          </a>
          <a
            href="/convite"
            className="inline-flex items-center justify-center border border-white/30 text-white font-medium px-10 py-4 rounded-full text-lg hover:bg-white/10 transition-all"
          >
            {t("finalCTA.buttonSecondary")}
          </a>
        </div>
        <p className="text-stone-400 text-sm mt-8">{t("finalCTA.footnote")}</p>
      </div>
    </section>
  );
}
