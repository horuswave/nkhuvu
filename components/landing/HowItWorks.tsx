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
    <section id="how-it-works" className="py-24 lg:py-32 px-6 bg-[#fafaf9] relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/50 to-[#fafaf9] pointer-events-none"></div>
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-stone-900 mb-6">
            {t("howItWorks.title")}
          </h2>
          <p className="text-stone-500 max-w-2xl mx-auto text-lg font-medium">
            {t("howItWorks.subtitle")}
          </p>
        </div>
        
        <div className="relative">
          {/* Connecting line */}
          <div className="hidden md:block absolute top-12 left-[10%] right-[10%] h-0.5 bg-gradient-to-r from-transparent via-amber-200 to-transparent"></div>
          
          <div className="grid md:grid-cols-3 gap-12 lg:gap-16 relative">
            {steps.map((step, idx) => (
              <div key={idx} className="relative group text-center">
                <div className="w-24 h-24 mx-auto rounded-3xl bg-white border border-stone-100 shadow-[0_8px_30px_rgb(0,0,0,0.06)] flex items-center justify-center text-amber-600 text-3xl font-bold mb-8 group-hover:-translate-y-2 group-hover:shadow-[0_15px_40px_rgb(0,0,0,0.1)] transition-all duration-300 relative z-10">
                  <div className="absolute inset-0 bg-amber-50 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <span className="relative z-10">{step.step}</span>
                </div>
                <h3 className="text-xl font-bold text-stone-900 mb-3 tracking-tight">
                  {t(`howItWorks.${step.key}.title`)}
                </h3>
                <p className="text-stone-500 font-medium leading-relaxed">
                  {t(`howItWorks.${step.key}.desc`)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
