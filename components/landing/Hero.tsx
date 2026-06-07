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

const CheckCircleIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="text-emerald-600"
  >
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <polyline points="22 4 12 14.01 9 11.01" />
  </svg>
);

export default function Hero() {
  const t = useTranslations("landing");

  return (
    <section
      id="hero"
      className="relative overflow-hidden bg-gradient-to-b from-amber-50/30 to-white"
    >
      <div className="max-w-7xl mx-auto px-6 pt-20 pb-24 md:pt-28 md:pb-32 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-12 lg:gap-16">
          <div className="flex-1 max-w-2xl lg:max-w-xl">
            <div className="inline-flex items-center gap-2 bg-amber-100/70 backdrop-blur-sm px-4 py-1.5 rounded-full text-amber-800 text-sm font-medium tracking-wide mb-6">
              <span className="w-1.5 h-1.5 bg-amber-600 rounded-full"></span>
              {t("hero.badge")}
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-light tracking-tight text-stone-900 leading-[1.1] mb-6">
              {t("hero.title1")}
              <span className="font-normal text-amber-600 block mt-2">
                {t("hero.titleHighlight")}
              </span>
            </h1>
            <p className="text-lg md:text-xl text-stone-600 leading-relaxed mb-8 max-w-lg">
              {t("hero.subtitle")}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="#solicitar-acesso"
                className="group inline-flex items-center justify-center gap-2 bg-stone-900 hover:bg-stone-800 text-white font-medium px-8 py-4 rounded-full text-lg transition-all"
              >
                {t("hero.ctaPrimary")} <ArrowRightIcon />
              </a>
              <a
                href="/convite"
                className="inline-flex items-center justify-center border-2 border-stone-300 hover:border-stone-400 text-stone-700 font-medium px-8 py-4 rounded-full text-lg transition-all"
              >
                {t("hero.ctaSecondary")}
              </a>
            </div>
            <div className="flex flex-wrap items-center gap-6 mt-8 pt-4">
              <div className="flex space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="w-10 h-10 rounded-full bg-stone-200 border-2 border-white flex items-center justify-center text-stone-600 text-sm font-medium"
                  >
                    {String.fromCharCode(64 + i)}
                  </div>
                ))}
              </div>
              <div className="text-sm text-stone-500">
                <span className="font-semibold text-stone-800">
                  +250 {t("hero.familiesWord")}
                </span>{" "}
                {t("hero.familiesText")}
              </div>
            </div>
          </div>

          <div className="flex-1 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-md">
              <div className="absolute -top-6 -right-6 w-72 h-72 bg-amber-200/30 rounded-full blur-3xl"></div>
              <div className="relative bg-white rounded-2xl shadow-2xl shadow-stone-200/50 overflow-hidden border border-stone-100">
                <div className="bg-gradient-to-r from-stone-50 to-white px-8 pt-8 pb-6 border-b border-stone-100">
                  <div className="text-center">
                    <div className="text-xs tracking-[0.3em] text-amber-600 uppercase mb-2">
                      {t("hero.invite.joy")}
                    </div>
                    <div className="text-2xl font-light tracking-wide text-stone-800">
                      Helena & Alberto
                    </div>
                    <div className="w-12 h-px bg-amber-200 mx-auto my-4"></div>
                    <div className="text-stone-500 text-sm">
                      {t("hero.invite.date")}
                    </div>
                    <div className="text-stone-400 text-xs mt-1">
                      {t("hero.invite.venue")}
                    </div>
                  </div>
                </div>
                <div className="p-8 space-y-5">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-stone-500">
                      {t("hero.invite.status")}
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full text-xs font-medium">
                      <CheckCircleIcon /> {t("hero.invite.open")}
                    </span>
                  </div>
                  <div className="bg-amber-50/40 rounded-xl p-4 text-center">
                    <p className="text-stone-600 text-sm leading-relaxed">
                      {t("hero.invite.message")}
                    </p>
                  </div>
                  <div className="flex gap-3 pt-2">
                    <div className="flex-1 bg-stone-800 text-white text-center py-2.5 rounded-lg text-sm font-medium">
                      {t("hero.invite.confirmBtn")}
                    </div>
                    <div className="flex-1 border border-stone-300 text-stone-600 text-center py-2.5 rounded-lg text-sm">
                      {t("hero.invite.detailsBtn")}
                    </div>
                  </div>
                </div>
                <div className="bg-stone-50 px-8 py-3 text-center border-t border-stone-100">
                  <span className="text-xs text-stone-400">
                    {t("hero.invite.footer")}
                  </span>
                </div>
              </div>
              <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-amber-100/50 rounded-full blur-2xl"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
