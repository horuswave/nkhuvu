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
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="transition-transform group-hover:translate-x-1"
    aria-hidden="true"
  >
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
);

export default function FinalCTA() {
  const t = useTranslations("landing");

  return (
    <section className="py-24 lg:py-32 px-6 bg-stone-950 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-[400px] bg-gradient-to-r from-amber-600/20 to-orange-600/20 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <h2 className="text-display-md text-white mb-5">{t("finalCTA.title")}</h2>
        <p className="text-stone-400 text-lg sm:text-xl font-medium mb-10 max-w-2xl mx-auto leading-relaxed">
          {t("finalCTA.subtitle")}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="#pricing" className="btn-accent group text-base !px-10 !py-4">
            {t("finalCTA.buttonPrimary")} <ArrowRightIcon />
          </a>
          <a
            href="/convite"
            className="inline-flex items-center justify-center border-2 border-white/20 text-white font-bold px-10 py-4 rounded-full text-base hover:bg-white hover:text-stone-900 transition-all duration-300"
          >
            {t("finalCTA.buttonSecondary")}
          </a>
        </div>
        <p className="text-stone-500 text-sm font-medium mt-8 tracking-wide">
          {t("finalCTA.footnote")}
        </p>
      </div>
    </section>
  );
}
