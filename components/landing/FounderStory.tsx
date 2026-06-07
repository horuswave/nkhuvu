"use client";

import { useTranslations } from "@/i18n";

const HeartIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="text-amber-600"
  >
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </svg>
);

const QuoteIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="48"
    height="48"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="text-amber-200/50"
  >
    <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2-1 0-3 0-3 2 0 2 2 2 3 2z" />
    <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4-1 0-3 0-3 2 0 2 2 2 3 2z" />
  </svg>
);

export default function FounderStory() {
  const t = useTranslations("landing");

  return (
    <section className="py-24 px-6 bg-stone-50/60">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          <div className="flex-1">
            <div className="inline-flex items-center gap-2 bg-amber-100 px-4 py-1.5 rounded-full text-amber-800 text-sm font-medium tracking-wide mb-6">
              <HeartIcon /> {t("founderStory.badge")}
            </div>
            <h2 className="text-4xl md:text-5xl font-light tracking-tight text-stone-900 mb-6">
              {t("founderStory.title")}
            </h2>
            <p className="text-lg text-stone-600 leading-relaxed mb-5">
              {t("founderStory.p1")}
            </p>
            <p className="text-stone-600 leading-relaxed mb-5">
              {t("founderStory.p2")}
            </p>
            <p className="text-stone-600 leading-relaxed">
              {t("founderStory.p3")}
            </p>
            <div className="mt-8 pt-4 border-t border-stone-200">
              <p className="text-stone-500 text-sm">
                {t("founderStory.signature")}
              </p>
            </div>
          </div>
          <div className="flex-1 flex justify-center">
            <div className="relative">
              <div className="w-72 h-72 rounded-full bg-gradient-to-br from-amber-100 to-stone-200 flex items-center justify-center shadow-xl">
                <span className="text-7xl font-light text-stone-500">A.M.</span>
              </div>
              <div className="absolute -bottom-6 -right-6 bg-white rounded-xl shadow-lg p-4 max-w-[200px]">
                <QuoteIcon />
                <p className="text-stone-700 text-sm mt-2 italic">
                  {t("founderStory.quote")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
