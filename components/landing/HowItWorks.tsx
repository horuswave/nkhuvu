"use client";

import { useTranslations } from "@/i18n";

export default function HowItWorks() {
  const t = useTranslations("landing");

  const steps = [
    { step: "1", key: "chooseTemplate" },
    { step: "2", key: "personalize" },
    { step: "3", key: "shareTrack" },
  ];

  return (
    <section id="how-it-works" className="py-24 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-light tracking-tight text-stone-900">
            {t("howItWorks.title")}
          </h2>
          <p className="text-stone-500 max-w-2xl mx-auto mt-4">
            {t("howItWorks.subtitle")}
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-12">
          {steps.map((step, idx) => (
            <div key={idx} className="text-center">
              <div className="w-16 h-16 mx-auto rounded-full bg-amber-100 flex items-center justify-center text-amber-700 text-2xl font-medium mb-6">
                {step.step}
              </div>
              <h3 className="text-xl font-medium text-stone-800 mb-3">
                {t(`howItWorks.${step.key}.title`)}
              </h3>
              <p className="text-stone-500">
                {t(`howItWorks.${step.key}.desc`)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
